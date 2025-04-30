import React from "react";
import { Form, Input, Button } from "antd";

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <Form
      layout="vertical"
      onFinish={() => handleSubmit({name})}
      className="p-4 shadow-sm bg-white rounded"
    >
      <Form.Item label="Name" required>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-block">
        Save
      </Button>
    </Form>
  );
};

export default CategoryForm;
