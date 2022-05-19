import { Row, Col } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import UploadFile from "../../../components/media/UploadFile";

function NewMedia() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <div
            style={{
              padding: 100,
              textAlign: "center",
            }}
          >
            <UploadFile redirectToLibrary={true} />
          </div>
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default NewMedia;
