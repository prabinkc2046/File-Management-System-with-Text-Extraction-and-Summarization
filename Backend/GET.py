from pydantic import BaseModel
from typing import List
from mongodb import FileInfo


# model Response
class FilesResponse(BaseModel):
    files: List[FileInfo]

# model  file summary response
class FileSummary(BaseModel):
    filename: str
    summary: str
