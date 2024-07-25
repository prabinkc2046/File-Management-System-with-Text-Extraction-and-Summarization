from  fastapi import HTTPException
import httpx
from helper import load_env_variable
import os

# load the env variable
load_env_variable()


async  def generate_summary_with_predibase(text: str):
    # get the env variable
    PREDIBASE_TENANT_ID = os.getenv("PREDIBASE_TENANT_ID")
    PREDIBASE_DEPLOYMENT = os.getenv("PREDIBASE_DEPLOYMENT")
    predibase_url = f"https://serving.app.predibase.com/{PREDIBASE_TENANT_ID}/deployments/v2/llms/{PREDIBASE_DEPLOYMENT}/generate"
    API_KEY = os.getenv("PREDIBASE_API_TOKEN")
    timeout = httpx.Timeout(60.0, connect=10.0)

    async with httpx.AsyncClient(timeout=timeout) as client:
        try:
            response = await client.post(
            url=predibase_url,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type":'application/json'
            },
            json={
                "inputs": text,
                "parameters": {"max_new_tokens": 20, "temperature": 0.1}
            }
            )
    
            response.raise_for_status()

            generated_text:str = response.json().get("generated_text", "")
            # return cleaned response
            return generated_text.replace(",","").replace(".","").replace("\\n","").strip()
            
        
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=exc.response.status_code,
                detail=f"Error communicating with Predibase API. {str(exc)}"

            )
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=500,
                detail=f"An error occured while requesting the Predibase API: {str(exc)}"

            )
    
   