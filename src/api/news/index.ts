import instance from "..";

export const newsList = (searchKey: string) =>
  instance.get<string, API.CommonResp>(`news?searchKey=${searchKey}`);
