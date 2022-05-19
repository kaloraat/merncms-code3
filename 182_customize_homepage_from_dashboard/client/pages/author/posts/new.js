import AuthorLayout from "../../../components/layout/AuthorLayout";
import NewPostComponent from "../../../components/posts/NewPostComponent";

function NewPost() {
  return (
    <AuthorLayout>
      <NewPostComponent page="author" />
    </AuthorLayout>
  );
}

export default NewPost;
