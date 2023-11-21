import React from "react";
import { Col, Layout, Row } from "antd";
import AppRoutes from "./Routes";
import logoVote from "./static/vote.png"
const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{
      minHeight: "100vh",
    }}>
      <Row gutter={[0, 32]}>
        <Col span={24}>
          <Header style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img
              height={48}
              src={logoVote}
              alt="vote"
              style={{ display: "block", backgroundColor:"white", padding: "0 12px", borderRadius:"6px" }}
            />
          </Header>
        </Col>
        <Col span={22} offset={1}>
          <Content>
            <AppRoutes />
          </Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default App;
