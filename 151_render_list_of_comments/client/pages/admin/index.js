import { Layout } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";

const { Content, Sider } = Layout;

function Admin() {
  return (
    <AdminLayout>
      <h1>This is admin page props...</h1>
      <p>More content...</p>
    </AdminLayout>
  );
}

export default Admin;
