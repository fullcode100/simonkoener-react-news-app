import instance from "..";

export const newsList = (
  page: number,
  pageSize: number,
  searchKey: string,
  category: string
) =>
  instance.get<string, API.CommonResp>(
    `news?searchKey=${searchKey}&page=${page}&pageSize=${pageSize}&category=${category}`
  );
