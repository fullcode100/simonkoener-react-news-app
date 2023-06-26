import * as React from "react";
import { Avatar, List, Space, Spin } from "antd";

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
    </>
  );
};

export default NewsDetailForm;
