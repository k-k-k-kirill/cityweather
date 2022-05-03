import { UploadedFile } from "express-fileupload";

class Upload {
  convertToJSON = (file: UploadedFile) => {
    return JSON.parse(file.data.toString());
  };
}

export default Upload;
