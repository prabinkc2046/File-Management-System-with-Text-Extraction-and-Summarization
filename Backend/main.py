from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import Depends
from typing import Annotated
import os
from fastapi.middleware.cors import CORSMiddleware

"""import all helper here"""
from helper import is_allowed, create_storage_directory, save_file, load_env_variable

"""import all mongo details here"""
from mongodb import add_file, find_file_byname, file_collection, FileInfo

"""import from auth"""
from auth import verify_credential, security

"""import from read_file_summary"""
from read_file_summary import extract_text

"""import from generate """
from generate_summary_with_llm import generate_summary_with_predibase

"""import from GET"""
from GET import FilesResponse, FileSummary

# load environment variable from .config file
load_env_variable()

app = FastAPI()

# Set up CORS
origins = [
	"http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory where files will be stored
UPLOAD_DIRECTORY = "./storage"

# create storage directory
create_storage_directory(UPLOAD_DIRECTORY)


# API end point to handle very basic login
@app.post('/login')
async def authenticate(credentials: HTTPBasicCredentials = Depends(security)):
    # verify the user is authenticated
    verify_credential(credentials)
    
    # return success message
    return JSONResponse(
        status_code=201,
        content={'message':'login successfull'}
    )


# end point to upload a file
@app.post('/v1/files')
async def upload_file(
    file: UploadFile = File(...),
    credentials: HTTPBasicCredentials = Depends(security)
):
    
    # verify the user is authenticated
    verify_credential(credentials)
    
    # check if the file has right extension
    if not is_allowed(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file type. Only .docx, .pptx, and .pdf files are allowed.")

    # check if the filename already exits in the file collection
    existing_file = await find_file_byname(file.filename.lower())

    # if already exits, send a message
    if existing_file:
        return JSONResponse(
            status_code=409,
            content={'message':'File already exists'}
        )

    # if the filename already does not exit
    #extract text from the file
    extracted_text = await extract_text(file)
    
    # formatting the request for LLM
    request_for_summary = f"Can you please give me 3 lines summary out of this text: {extracted_text}"

    # generate file summary using LLM model
    summary_by_llm = await generate_summary_with_predibase(request_for_summary)
    
    # use the summary return my LLM 
    # when  summary return is empty, use extracted text 
    try:

        fileName = file.filename.lower()
        fileInfo = {
        "filename":fileName,
        "summary":summary_by_llm if summary_by_llm else extracted_text[:100]
        }
        
        # write new record in the collection
        await add_file(fileInfo)
        
        # and upload the file
        save_file(UPLOAD_DIRECTORY, file)

        # response with success message
        return JSONResponse(
            status_code=201,
            content={"message":f"File '{file.filename}' uploaded successfully", "fileInfo":f"{fileInfo}"},
        )
    except Exception as e:
        print(f"An error occurped: {e}")

    
# API endpoint to list files
@app.get("/v1/files", response_model=FilesResponse)
async def get_files(
    credentials: HTTPBasicCredentials = Depends(security)
):
    
    # verify the user is authenticated
    verify_credential(credentials)

    # query mongodb
    files_cursor = file_collection.find({}, {"_id": 0, "fileid":1, "filename":1, "summary":1})
    files_list = await files_cursor.to_list(length=100)
    files_info = [FileInfo(**file) for file in files_list]
    return FilesResponse(files=files_info)

# API endpoint to retrieve the file summary of the given fileid
@app.get("/v1/files/{fileid}", response_model=FileSummary)
async def get_file_summary(fileid:str,credentials: HTTPBasicCredentials = Depends(security)):
    
    # verify the user is authenticated
    verify_credential(credentials)

    file = await file_collection.find_one({"fileid":fileid},{"_id":0, "filename":1, "summary":1})

    if file is None:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    # Return file summary
    return FileSummary(**file)
    
    

    

