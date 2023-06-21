import * as React from "react";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface SignupFormProps {
  pending: boolean;
  onSubmit: (data: SignupData) => void;
}

const rules = {
  name: [{ required: true, message: "Please input your name" }],
  email: [{ required: true, message: "Please input your email" }],
  password: [{ required: true, message: "Please input your password" }],
  confirm_password: [
    { required: true, message: "Please confirm your password" },
  ],
};

const SignupForm: React.FC<SignupFormProps> = ({ pending, onSubmit }) => (
  <Form name="signup" layout="vertical" onFinish={onSubmit} autoComplete="off">
    <Title level={4} style={{ marginBottom: 30, textAlign: "center" }}>
      Create Your Account
    </Title>
    <Form.Item label="Name" name="name" rules={rules.name}>
      <Input />
    </Form.Item>

    <Form.Item label="Email" name="email" rules={rules.email}>
      <Input />
    </Form.Item>

    <Form.Item label="Password" name="password" rules={rules.password}>
      <Input type="password" />
    </Form.Item>

    <Form.Item
      label="Confirm"
      name="confirm_password"
      rules={rules.confirm_password}
    >
      <Input type="password" />
    </Form.Item>

    <div style={{ textAlign: "center" }}>
      <Link to="/signin">Already have an account? Click here to sign in</Link>
    </div>

    <div style={{ textAlign: "center", margin: "15px 0" }}>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        shape="round"
        loading={pending}
      >
        {pending ? "Signing Up" : "Sign Up"}
      </Button>
    </div>
  </Form>
);

export default SignupForm;
