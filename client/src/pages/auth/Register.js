import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import "firebase/auth";
import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MetaData from "../../layout/MetaData";

const Register = () => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (values) => {
    const userEmail = values.email;
    setIsSubmitting(true);

    try {
      const signInMethods = await auth.fetchSignInMethodsForEmail(userEmail);
      if (signInMethods && signInMethods.length > 0) {
        setIsEmailRegistered(true);
        toast.error("Email is already registered. Please use another email.");
        return;
      }

      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth.sendSignInLinkToEmail(userEmail, config);

      toast.success(
        `Email is sent to ${userEmail}. Click the link to complete your registration.`
      );

      window.localStorage.setItem("emailForRegistration", userEmail);
      setEmail("");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaData title="Register" />
      <div className="container p-5">
      <br/><br/><br/>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center mb-4">Register</h1>
            <Form name="register" onFinish={handleSubmit}>
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
                  disabled={isSubmitting || isEmailRegistered} // Disable input while submitting or if email is already registered
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" disabled={isSubmitting || isEmailRegistered}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
