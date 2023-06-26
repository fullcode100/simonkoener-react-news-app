import * as React from "react";
import { Avatar, List, Space, Spin } from "antd";
import Spinner from "../common/Spinner";

interface NewsDetailFormPops {
  pending: boolean;
  article: API.ArticleListResp[];
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsDetailForm: React.FC<NewsDetailFormPops> = ({ pending, article }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={article}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={<img width={272} alt="logo" src={item.urlToImage} />}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.urlToImage} />}
              title={<p>{item.title}</p>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
      {/* <List
        dataSource={article}
        loading={pending}
        renderItem={(item, index) => (
          <>
            <div style={{ textAlign: "center" }}>
              <img
                src={`${item.urlToImage}`}
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <h2>{item.title}</h2>
            </div>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`${item.urlToImage}`} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          </>
        )}
      /> */}
    </>
  );
};

export default NewsDetailForm;
