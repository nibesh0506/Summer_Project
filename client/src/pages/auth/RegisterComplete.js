import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";

import { Button, Form, Input, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import MetaData from "../../layout/MetaData";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'));
  }, [history]);

  const handleSubmit = async (values) => {
    setLoading(true);

    if (!email || !values.password) {
      toast.error('Email and password are required');
      setLoading(false);
      return;
    }
    if (values.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);

      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(values.password);
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            history.push("/login");  // Redirect to login page after registration
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <MetaData title="Complete Registration" />
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-4">Complete Registration</h1>
            <Form name="complete-registration" onFinish={handleSubmit}>
              <Form.Item>
                <Input
                  type="email"
                  value={email}
                  disabled
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                >
                  {loading ? <Spin /> : "Complete Registration"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComplete;
