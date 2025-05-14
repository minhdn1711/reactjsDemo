import React from 'react';
import {
    LockOutlined,
    LoginOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    Button,
    Form,
    Input,
    message,
    Row,
    Col,
    notification
} from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { loginApp } from '../../services/login/login';
import { store } from '../../redux/configStore';

export default function Login() {
    const [form] = Form.useForm();

    // Selector từ Redux
    const { loading } = useSelector((state) => state.login);

    // Xử lý đăng nhập
    const onFinish = async (values) => {
        try {
            const response = await store.dispatch(loginApp(values));
            if (response.payload.success === true) {
                message.success(response?.payload?.message || "Đăng nhập thành công");
            }
        } catch (error) {
            message.error("Đăng nhập thất bại");
        }
    };

    // Render form đăng nhập
    return (
        <Form
            form={form}
            name="login_form"
            onFinish={onFinish}
            layout="vertical"
        >
            {/* Tài khoản */}
            <Form.Item
                name="username"
                rules={[{
                    required: true,
                    message: "Vui lòng nhập tài khoản"
                }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Tài khoản"
                    size="large"
                />
            </Form.Item>

            {/* Mật khẩu */}
            <Form.Item
                name="password"
                rules={[{
                    required: true,
                    message: "Vui lòng nhập mật khẩu"
                }]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                    size="large"
                />
            </Form.Item>

            {/* Quên mật khẩu */}
            <Row justify="end" style={{ marginBottom: 16 }}>
                <Col>
                    <NavLink to="/forgot-password">
                        Quên mật khẩu?
                    </NavLink>
                </Col>
            </Row>

            {/* Nút đăng nhập */}
            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    icon={<LoginOutlined />}
                    loading={loading}
                    block
                    size="large"
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    );
};

