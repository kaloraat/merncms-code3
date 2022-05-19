import Resizer from "react-image-file-resizer";
import axios from "axios";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      720,
      400,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const uploadImage = async (file) => {
  // console.log(file);
  try {
    const image = await resizeFile(file);
    // console.log("IMAGE BASE64 => ", image);
    const { data } = await axios.post("/upload-image", { image });
    // console.log("UPLOAD FILE RESPONSE => ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
