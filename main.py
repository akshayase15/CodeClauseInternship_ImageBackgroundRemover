from fastapi import FastAPI, File, UploadFile
import os
import shutil
from fastapi.responses import JSONResponse, FileResponse
import requests
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

path = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict origins for security in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def start():
    return {"message":"hello world"}

@app.post("/uploadimagefile")
async def upload_image_file(file: UploadFile = File(..., description="Upload Image File:")):
    if not os.path.exists("uploads"):
        os.mkdir("uploads")

    file_path = os.path.join("uploads", file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    global path
    path.append(file_path)

    return JSONResponse(content={"message": "File uploaded successfully"})

@app.post("/removebg")
def removebg():
    
    try:
        file_path = path[0]
        print(file_path)
        
        url = "https://api.remove.bg/v1.0/removebg"
        headers = {'X-Api-Key': "dH3EH3G5fU7sX764e4MFYJjh"}

        global response
        with open(file_path, 'rb') as img_file:
            response = requests.post(url, headers=headers, files={'image_file': img_file})
        
        if not os.path.exists("results"):
            os.mkdir("results")

        global loc
        loc = os.path.join("results", "final.jpg")

        with open(loc, 'wb') as output_file:
            output_file.write(response.content)
            print("Background removed image saved:", loc)

        path.clear()
        return {"message":"done"}
    except:
        return {"message":"not done"}
    
@app.get("/showimage")
async def show_image():
    return FileResponse(loc, media_type="image/jpeg")

@app.get("/downloadfile")
async def download():
    with open(loc, 'wb') as output_file:
        output_file.write(response.content)
        print("Background removed image saved:", loc)
    return {"message": "Done", "location": loc}