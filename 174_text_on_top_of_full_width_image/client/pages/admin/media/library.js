import { Row, Col } from "antd";
import AdminLayout from "../../../components/layout/AdminLayout";
import MediaLibrary from "../../../components/media/MediaLibrary";

function AdminMediaLibrary() {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary />
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default AdminMediaLibrary;
