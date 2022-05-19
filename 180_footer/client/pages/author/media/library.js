import { Row, Col } from "antd";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import MediaLibrary from "../../../components/media/MediaLibrary";

function AuthorMediaLibrary() {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary page="author" />
        </Col>
      </Row>
    </AuthorLayout>
  );
}

export default AuthorMediaLibrary;
