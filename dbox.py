import dropbox
from tkinter import Tk, filedialog
import os

TOKEN = ""
dbx = dropbox.Dropbox(TOKEN)

print("1. Upload")
print("2. Download")

ch = input("Enter choice: ")

if ch == "1":
    Tk().withdraw()
    file = filedialog.askopenfilename()

    if file:
        name = os.path.basename(file)

        with open(file, "rb") as f:
            dbx.files_upload(f.read(), "/" + name)

        print("File uploaded successfully!")

elif ch == "2":
    name = input("Enter Dropbox file name: ")

    metadata, res = dbx.files_download("/" + name)

    with open("downloaded_" + name, "wb") as f:
        f.write(res.content)

    print("File downloaded successfully!")

else:
    print("Invalid choice")


    python -m pip install dropbox
    python dropb.py