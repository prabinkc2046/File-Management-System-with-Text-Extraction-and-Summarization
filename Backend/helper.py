import os, shutil
from dotenv import load_dotenv
# list allowed extensions
ALLOWED_EXTENSIONS = {'.docx', '.pptx', '.pdf'}

# this function  returns true if extension is found
# returns false if extenion is not found
# this accept file as a parameter
def is_allowed(fileName: str) -> bool:
    ext = os.path.splitext(fileName)[1]
    return ext.lower() in ALLOWED_EXTENSIONS



"""create storage directory"""
# # creating a storage folder
# os.makedirs('storage',exist_ok=True)

def create_storage_directory(directory_path):
    if not os.path.exists(directory_path):
        os.mkdir(directory_path)

"""upload file"""
def save_file(upload_directory, file):
    file_path = os.path.join(upload_directory, file.filename)
    with open(file_path, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)

"""load env variable"""
def load_env_variable():
    load_dotenv("./config.env")



