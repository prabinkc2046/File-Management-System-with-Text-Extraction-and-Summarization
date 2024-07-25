from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi import HTTPException
import os

# instantiate HTTPBasic
# create a security guard here
security = HTTPBasic()

def verify_credential(credentials: HTTPBasicCredentials):
    username = os.getenv("BASIC_AUTH_USERNAME")
    password = os.getenv("BASIC_AUTH_PASSWORD")
    # print({username: credentials.username, password: credentials.password})
    # print(username)
    # print(password)
    if credentials.username != username or credentials.password != password:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={'www-Authenticate':'Basic'}
        )
