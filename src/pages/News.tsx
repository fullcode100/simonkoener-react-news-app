import * as React from "react";
import { AxiosError } from "axios";
import {
  Button,
  Space,
  Typography,
  Input,
  Dropdown,
  message,
  notification,
  Row,
  Col,
} from "antd";
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
  const [domain, setDomain] = React.useState<string>("techcrunch.com");
  const [pageSize, setPageSize] = React.useState<number>(15);
  const [page, setPage] = React.useState<number>(1);
  const [startDate, setStartDate] = React.useState<string>("2023-06-21");
  const [endDate, setEndDate] = React.useState<string>("2023-06-21");
  const [api, contextHolder] = notification.useNotification();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setDomain(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: "bbc.co.uk",
      key: "bbc.co.uk",
    },
    {
      label: "techcrunch.com",
      key: "techcrunch.com",
    },
    {
      label: "engadget.com",
      key: "engadget.com",
    },
    {
      label: "wsj.com",
      key: "wsj.com",
    },
    {
      label: "usatoday.com",
      key: "usatoday.com",
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
    queryFn: () =>
      newsList(page, pageSize, searchKey, domain, startDate, endDate),
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
  }, [error, isLoading]);

  React.useEffect(() => {
    refetch();
  }, [page, pageSize, searchKey, domain, startDate, endDate]);

  const handleSearch = (value: string) => {
    setSearchKey(value);
  };

  const startDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value > endDate) {
      e.target.value = "";
      api.error({
        message: "An error has occurred",
        placement: "top",
      });
    } else setStartDate(e.target.value);
  };

  const endDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <Block>
      {contextHolder}
      <Row>
        <Col md={12} xs={24}>
          <div style={{ display: "flex", margin: "15px 10px" }}>
            <Input.Search
              placeholder="input search text"
              onSearch={handleSearch}
              style={{ width: "100%" }}
            />
            <div style={{ marginLeft: "10px" }}>
              <Dropdown menu={menuProps}>
                <Button>
                  <Space>
                    {domain}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          </div>
        </Col>
        <Col md={12} xs={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "15px 0",
            }}
          >
            <span style={{ marginRight: "5px" }}>From:</span>
            <Input
              placeholder="2023-6-22"
              type="date"
              style={{ marginRight: "10px" }}
              onChange={startDateChange}
            />
            <span style={{ marginRight: "5px" }}>To:</span>
            <Input placeholder="from" type="date" onChange={endDateChange} />
          </div>
        </Col>
      </Row>
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
