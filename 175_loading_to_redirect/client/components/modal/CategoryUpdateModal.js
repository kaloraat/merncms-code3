import { Modal, Form, Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

const CategoryUpdateModal = ({
  visible,
  setVisible,
  handleUpdate,
  updatingCategory,
}) => {
  return (
    <Modal
      title="Update category"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form
        onFinish={handleUpdate}
        fields={[{ name: ["name"], value: updatingCategory.name }]}
      >
        <Form.Item name="name">
          <Input
            prefix={<EditOutlined className="site-form-item-icon" />}
            placeholder="Give it a name"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default CategoryUpdateModal;
