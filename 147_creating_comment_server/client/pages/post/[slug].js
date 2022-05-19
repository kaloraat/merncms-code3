import { useContext } from "react";
import axios from "axios";
import { Row, Col, Card, Typography } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";

const { Title } = Typography;

const { Meta } = Card;

export const SinglePost = ({ post }) => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta description={post.content.substring(0, 160)} />
      </Head>
      <Row>
        <Col xs={24} xl={16}>
          <Card
            cover={
              <img
                src={post?.featuredImage?.url || "/images/default.jpeg"}
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p>
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              / in{" "}
              {post?.categories.map((c) => (
                <span key={c._id}>
                  <Link href={`/category/${c.slug}`}>
                    <a>{c.name} </a>
                  </Link>
                </span>
              ))}
            </p>

            <Editor
              defaultValue={post.content}
              dark={theme === "light" ? false : true}
              readOnly={true}
            />
          </Card>
        </Col>

        <Col xs={22} xl={6} offset={1}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          officia suscipit assumenda ducimus dolorum optio, natus id blanditiis
          aliquid, quibusdam quasi alias. Nobis excepturi cupiditate minima sed
          in fugit eaque, quod vitae suscipit sit maxime. Vitae consequuntur
          alias rerum, consectetur modi incidunt unde ipsam optio amet
          praesentium quo exercitationem asperiores eveniet cupiditate illo.
          Nemo quo, esse impedit id ipsum magnam earum dolores inventore, quidem
          doloremque nesciunt ad fugit quis deleniti provident corrupti
          doloribus eum quisquam, quae non? Eveniet, accusantium doloremque, in
          repudiandae tempore voluptas velit est obcaecati qui itaque illum
          eligendi amet ipsum, culpa modi ut. Laudantium libero blanditiis qui?
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
