import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { Col, Layout, Row, notification, Menu, Button, Space } from "antd";
import { useAuth } from "../../utils/auth";

const { Header, Content, Footer } = Layout;

const contentStyle = {
  padding: "20px 25px",
  minHeight: "calc(100vh - 64px)",
};

const containerStyle = {
  maxWidth: 1200,
  margin: "auto",
};

const AppLayout: React.FC = () => {
  const [, contextHolder] = notification.useNotification();
  const [, setToken] = useAuth();

  const signOut = () => {
    localStorage.removeItem("authtoken");
    setToken("");
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: "white", fontSize: "36px" }}>NEWS</span>
        <Menu theme="dark" mode="horizontal">
          <a type="default" onClick={signOut} style={{ color: "white" }}>
            Sign Out
          </a>
        </Menu>
      </Header>
      <Content style={contentStyle}>
        <div style={containerStyle}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Outlet />
            </Col>
          </Row>
        </div>
      </Content>

      {contextHolder}
    </Layout>
  );
};

export default AppLayout;
