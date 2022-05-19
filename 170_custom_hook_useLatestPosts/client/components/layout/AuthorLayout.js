import { useContext, useEffect, useState } from "react";
import { Layout } from "antd";
import AuthorNav from "../nav/AuthorNav";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Content } = Layout;

function AuthorLayout({ children }) {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [loading, setLoading] = useState(true);
  // hooks
  const router = useRouter();

  useEffect(() => {
    // if (auth?.user?.role !== "Admin") {
    //   router.push("/");
    // } else {
    //   setLoading(false);
    // }
    if (auth?.token) getCurrentAuthor();
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    try {
      const { data } = await axios.get("/current-author");
      setLoading(false);
    } catch (err) {
      console.log(err);
      router.push("/");
    }
  };

  if (loading) {
    return (
      <LoadingOutlined
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "50px",
          color: "red",
        }}
      />
    );
  }

  return (
    <Layout>
      <AuthorNav />
      <Layout>
        <Content style={{ padding: "10px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default AuthorLayout;
