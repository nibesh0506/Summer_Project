import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";

import { Button, Form, Input, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";
import SpinFC from "antd/lib/spin";
import MetaData from "../../layout/MetaData";

const Login = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      history.push("/");
    } catch (error) {
      toast.error("Invalid Credentials");
      setLoading(false);
    }
  };

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) history.push(intended.from);
    else if (res.data.role === "admin") history.push("/admin/dashboard");
    else history.push("/");
  };

  return (
    <>
      <MetaData title="Login" />
      <div className="container p-5">
      <br/><br/><br/><br/><br/><br/>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-4">Login</h1>
            <Form name="login" onFinish={onFinish}>
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
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
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
                  {loading ? <SpinFC /> : "Login"}
                </Button>
              </Form.Item>
            </Form>

            <Link to="/forgot/password" className="float-right text-danger">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
