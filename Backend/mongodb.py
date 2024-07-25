from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from uuid import uuid4
import os
from helper import load_env_variable

#  load env variable
load_env_variable()

# connection to mongodb server
host = os.getenv("MONGO_HOST")

# initialise the mongo client
connection = AsyncIOMotorClient(host)

# create a database  
db = connection.file_database

# create collection
file_collection = db.files


# define the shape of the table
class FileInfo(BaseModel):
    fileid: str
    filename: str
    summary: str

# add record into database
async def add_file(file_info: dict):
    file_info['fileid'] = str(uuid4())
    return await file_collection.insert_one(file_info)

# find file by its name
async def find_file_byname(filename: str):
    return await file_collection.find_one({"filename": filename})



