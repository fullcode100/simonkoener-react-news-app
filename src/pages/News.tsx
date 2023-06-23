import * as React from "react";
import { AxiosError } from "axios";
import { Button, Space, Typography, Input, Dropdown, message } from "antd";
import type { MenuProps } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Block from "../components/common/Block";
import TaskList from "../components/news/NewsList";
import { useAuth } from "../utils/auth";
import { newsList } from "../api/news";
import NewsList from "../components/news/NewsList";

const { Title } = Typography;

const NewsListPage: React.FC = () => {
  const nagivate = useNavigate();
  const [, setToken] = useAuth();

  const [searchKey, setSearchKey] = React.useState<string>(" ");
  const [category, setCategory] = React.useState<string>("Business");
  const [pageSize, setPageSize] = React.useState<number>(15);
  const [page, setPage] = React.useState<number>(1);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setCategory(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "Business",
      key: "Business",
      icon: <UserOutlined />,
    },
    {
      label: "Entertainment",
      key: "Entertainment",
      icon: <UserOutlined />,
    },
    {
      label: "General",
      key: "General",
      icon: <UserOutlined />,
    },
    {
      label: "Health",
      key: "Health",
      icon: <UserOutlined />,
    },
    {
      label: "Science",
      key: "Science",
      icon: <UserOutlined />,
    },
    {
      label: "Sports",
      key: "Sports",
      icon: <UserOutlined />,
    },
    {
      label: "Technology",
      key: "Technology",
      icon: <UserOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const { data, isLoading, isSuccess, error, refetch } = useQuery<
    Promise<any>,
    AxiosError,
    API.CommonResp<API.NewsListResp>,
    any
  >({
    queryKey: ["news"],
    queryFn: () => newsList(page, pageSize, searchKey, category),
  });

  const handlePaginateChange = (pageNo: number, pageS: number) => {
    setPageSize(pageS);
    setPage(pageNo);
  };

  React.useEffect(() => {
    if (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("authtoken");
        setToken("");
      }
    }
    console.log(isLoading);
  }, [error, isLoading]);

  React.useEffect(() => {
    refetch();
  }, [page, pageSize, searchKey, category]);

  const handleSearch = (value: string) => {
    setSearchKey(value);
  };

  return (
    <Block>
      <div style={{ display: "flex", textAlign: "center", margin: "15px 0" }}>
        <Input.Search
          placeholder="input search text"
          onSearch={handleSearch}
          style={{ width: "100%" }}
        />
        <div style={{ marginLeft: "5px" }}>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                Categories /{category}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
      <NewsList
        pending={isLoading}
        articles={isSuccess ? data.data.articles : []}
        total={data?.data.totalResults}
        onPaginateChange={handlePaginateChange}
      />
    </Block>
  );
};

export default NewsListPage;
