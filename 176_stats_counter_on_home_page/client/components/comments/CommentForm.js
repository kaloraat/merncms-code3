import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Input, Button } from "antd";

const { TextArea } = Input;

const CommentForm = ({ comment, setComment, handleSubmit, loading }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <br />
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows="4"
        disabled={auth?.user === null && auth?.token === ""}
        maxLength={200}
      />
      <Button
        onClick={handleSubmit}
        loading={loading}
        disabled={comment === ""}
        style={{ marginTop: 4 }}
        type="primary"
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
