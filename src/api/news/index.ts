import instance from "..";

export const newsList = () => instance.get<string, API.CommonResp>("news/");
