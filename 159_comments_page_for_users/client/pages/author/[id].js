import AuthorLayout from "../../components/layout/AuthorLayout";

import ProfileUpdate from "../../components/user/ProfileUpdate";

const UpdateUser = () => {
  // show form
  return (
    <AuthorLayout>
      <ProfileUpdate page="user" />
    </AuthorLayout>
  );
};

export default UpdateUser;
