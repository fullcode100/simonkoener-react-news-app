import * as React from "react";
import { Avatar, List, Pagination, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";

interface NewsListProps {
  pending: boolean;
  articles: API.ArticleListResp[];
  total: number | undefined;
  onPaginateChange: (page: number, pageSize: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  pending,
  articles,
  total,
  onPaginateChange,
}) => {
  return (
    <>
      <List
        dataSource={articles}
        loading={pending}
        renderItem={(item, index) => (
          <>
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`${item.urlToImage}`} />}
                title={<Link to={"news/view/" + item.title}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          </>
        )}
      />
      <div style={{ textAlign: "center" }}>
        <Pagination
          defaultCurrent={1}
          onChange={onPaginateChange}
          total={total}
        />
      </div>
    </>
  );
};

export default NewsList;
