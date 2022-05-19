import SubscriberLayout from "../../components/layout/SubscriberLayout";

import ProfileUpdate from "../../components/user/ProfileUpdate";

const UpdateUser = () => {
  // show form
  return (
    <SubscriberLayout>
      <ProfileUpdate page="user" />
    </SubscriberLayout>
  );
};

export default UpdateUser;
