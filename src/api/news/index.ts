import instance from "..";

export const newsList = (
  page: number,
  pageSize: number,
  searchKey: string,
  domain: string,
  startDate: string,
  endDate: string
) =>
  instance.get<string, API.CommonResp>(
    `news?searchKey=${searchKey}&page=${page}&pageSize=${pageSize}&domains=${domain}&from=${startDate}&to=${endDate}`
  );

export const newsDetail = (title: string) =>
  instance.get<string, API.CommonResp>(`news?searchKey=${title}`);
