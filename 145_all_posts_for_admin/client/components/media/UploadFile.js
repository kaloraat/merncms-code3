import React, { useContext } from "react";
import { Upload, message, Button } from "antd";
import { AuthContext } from "../../context/auth";
import { UploadOutlined } from "@ant-design/icons";
import { MediaContext } from "../../context/media";
import { useRouter } from "next/router";

const UploadFile = ({ redirectToLibrary = false, page = "admin" }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  // hook
  const router = useRouter();

  const props = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log("info.file => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
        if (redirectToLibrary) {
          router.push(`/${page}/media/library`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...props} maxCount={1}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
