import { useState, useContext } from "react";
import { Row, Col, Input, Button, Image, Divider } from "antd";
import Media from "../../components/Media";
import { MediaContext } from "../../context/media";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../../components/layout/AdminLayout";

const Customize = () => {
  // context
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState("");
  const [fullWidthImage, setFullWidthImage] = useState("");

  const handleSave = async () => {
    //
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Customize home page</h1>
            <p>Set full width image title and subtitle</p>
          </Divider>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Customize;
