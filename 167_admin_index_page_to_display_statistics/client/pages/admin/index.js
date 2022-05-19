import { useEffect, useState } from "react";
import { Row, Col, Divider } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import Link from "next/link";
import axios from "axios";

function Admin() {
  // state
  const [numbers, setNumbers] = useState({});

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = async () => {
    try {
      const { data } = await axios.get("/numbers");
      setNumbers(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Statistics</h1>
          </Divider>
        </Col>
      </Row>

      <Row>
        <Col
          span={12}
          style={{ marginTop: 100, textAlign: "center", fontSize: 20 }}
        >
          {numbers.posts}
        </Col>
      </Row>
    </AdminLayout>
  );
}

export default Admin;
