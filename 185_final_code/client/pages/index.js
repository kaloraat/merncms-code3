import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage";
import useNumbers from "../hooks/useNumbers";
import RenderProgress from "../components/posts/RenderProgress";
import { Row, Col, Divider, Button } from "antd";
import useLatestPosts from "../hooks/useLatestPosts";
import useCategory from "../hooks/useCategory";
import Link from "next/link";
import ParallaxImage from "../components/pages/ParallaxImage";
import { ThunderboltOutlined } from "@ant-design/icons";
import Footer from "../components/pages/Footer";
import axios from "axios";
import useHome from "../hooks/useHome";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state for page customization
  // const [title, setTitle] = useState("");
  // const [subtitle, setSubtitle] = useState("");
  // const [fullWidthImage, setFullWidthImage] = useState("");

  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPosts();
  const { categories } = useCategory();

  const {
    title,
    subtitle,
    fullWidthImage,
    setTitle,
    setSubtitle,
    setFullWidthImage,
  } = useHome();

  // useEffect(() => {
  //   loadHomepage();
  // }, []);

  // const loadHomepage = async () => {
  //   try {
  //     const { data } = await axios.get("/page/home");
  //     console.log(data);
  //     setTitle(data.title);
  //     setSubtitle(data.subtitle);
  //     setFullWidthImage(data.fullWidthImage);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <FullWidthImage
        title={title}
        subtitle={subtitle}
        fullWidthImage={fullWidthImage?.url}
      />
      <Row style={{ marginTop: 40 }}>
        {/* posts */}
        <Col
          span={6}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.posts}
            name="Posts"
            link="/admin/posts"
          />
        </Col>
        {/* comments */}
        <Col
          span={6}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.comments}
            name="Comments"
            link="/admin/comments"
          />
        </Col>
        {/* catgories */}
        <Col
          span={6}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.categories}
            name="Categories"
            link="/admin/categories"
          />
        </Col>
        {/* users */}
        <Col
          span={6}
          style={{ marginTop: 50, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.users}
            name="Users"
            link="/admin/users"
          />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <ParallaxImage>
            <h2
              style={{
                textAlign: "center",
                fontSize: "74px",
                textShadow: "2px 2px 4px #000000",
                color: "#fff",
              }}
            >
              BLOG POSTS
            </h2>
            <Divider>
              <ThunderboltOutlined />
            </Divider>
            <div style={{ textAlign: "center" }}>
              {latestPosts.map((post) => (
                <Link href={`/post/${post.slug}`} key={post._id}>
                  <a>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          </ParallaxImage>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{ textAlign: "center", marginTop: 80, marginBottom: 80 }}
        >
          <Divider>CATEGORIES</Divider>
          <div style={{ textAlign: "center" }}>
            {categories.map((c) => (
              <Link href={`/category/${c.slug}`} key={c._id}>
                <a>
                  <Button style={{ margin: 2 }}>{c.name}</Button>
                </a>
              </Link>
            ))}
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

export default Home;
