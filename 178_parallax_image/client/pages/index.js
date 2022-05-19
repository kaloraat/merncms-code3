import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage";
import useNumbers from "../hooks/useNumbers";
import RenderProgress from "../components/posts/RenderProgress";
import { Row, Col } from "antd";
import useLatestPosts from "../hooks/useLatestPosts";
import useCategory from "../hooks/useCategory";
import Link from "next/link";
import ParallaxImage from "../components/pages/ParallaxImage";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = useLatestPosts();
  const { categories } = useCategory();

  return (
    <>
      <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <FullWidthImage />
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
            <div style={{ textAlign: "center" }}>
              {latestPosts.map((post) => (
                <Link href={`/post/${post.slug}`}>
                  <a>
                    <h3>{post.title}</h3>
                  </a>
                </Link>
              ))}
            </div>
          </ParallaxImage>
        </Col>
      </Row>
    </>
  );
}

export default Home;
