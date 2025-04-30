import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";

import { Button, Form, Input, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MetaData from "../../layout/MetaData";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (values) => {
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(values.email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("If email exist you'll receive the mail");
      })
      .catch((error) => {
        setLoading(false);
          toast.error(error.message);
      });
  };

  return (
    <>
      <MetaData title="Forgot Password" />
      <div className="container p-5">
        <br/><br/><br/><br/><br/><br/>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-4">
              {loading ? <Spin /> : "Forgot Password"}
            </h1>
            <Form name="forgot-password" onFinish={handleSubmit}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Email"
                  size="large"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  disabled={!email}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
