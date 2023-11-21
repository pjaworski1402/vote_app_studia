import {
    Alert,
    Button,
    Card,
    Col,
    Form,
    Input,
    message,
    Row,
    Spin,
  } from "antd";
import Link from "antd/es/typography/Link";
  import React, { Fragment, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useAuthContext } from "../../context/AuthContext";
  import { API } from "../../helpers/constant";
  import { setToken } from "../../helpers/token";
  import { useMedia } from 'react-use';
  
  const SignIn = () => {
    const navigate = useNavigate();
    const { setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const isMobile = useMedia('(max-width: 768px)');

    const onFinish = async (values) => {
      setIsLoading(true);
      try {
        const value = {
          identifier: values.email,
          password: values.password,
        };
        const response = await fetch(`${API}/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        });
  
        const data = await response.json();
        if (data?.error) {
          throw data?.error;
        } else {
          setToken(data.jwt);
          setUser(data.user);
          message.success(`Witaj ${data.user.username}!`);
          navigate("/profile", { replace: true });
        }
      } catch (error) {
        console.error(error);
        setError(error?.message ?? "Coś poszło nie tak!");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Fragment>
        <Row align="middle">
          <Col span={isMobile?24:6} offset={isMobile?0:9}>
            <Card title="Zaloguj się">
              {error ? (
                <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                  afterClose={() => setError("")}
                />
              ) : null}
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message:"Nieprawidłowy adres email"
                    },
                  ]}
                >
                  <Input placeholder="Wpisz adres email" />
                </Form.Item>
  
                <Form.Item
                  label="Hasło"
                  name="password"
                  rules={[{ required: true,
                    message:"Niepoprawne hasło"
                  }]}
                >
                  <Input.Password placeholder="Wpisz hasło" />
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login_submit_btn"
                  >
                    Zaloguj się {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
            </Card>
            <Link href="http://localhost:1337/admin">Panel administratora</Link>
          </Col>
        </Row>
      </Fragment>
    );
  };
  
  export default SignIn;