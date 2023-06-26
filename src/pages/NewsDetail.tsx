import * as React from "react";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import Block from "../components/common/Block";
import { useLocation } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { newsDetail } from "../api/news";
import NewsDetailForm from "../components/news/NewsDetailForm";
import GetTitle from "../components/common/GetTitle";

const NewsDetail: React.FC = () => {
  useAuth();

  const location = useLocation();

  console.log(GetTitle(location.search));

  const { data, isLoading, isSuccess, error, refetch } = useQuery<
    Promise<any>,
    AxiosError,
    API.CommonResp<API.NewsDetailResp>,
    any
  >({
    queryKey: ["detail"],
    queryFn: () => newsDetail(GetTitle(location.search)),
  });

  return (
    <Block>
      <NewsDetailForm
        pending={isLoading}
        article={isSuccess ? data.data.articles : []}
      ></NewsDetailForm>
    </Block>
  );
};

export default NewsDetail;
