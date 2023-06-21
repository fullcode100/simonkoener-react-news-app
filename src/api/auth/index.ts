import instance from "..";

export const login = (formData: API.UserLoginReq) =>
  instance.post<string, API.CommonResp>("signin", formData);

export const register = (formData: API.UserRegisterReq) =>
  instance.post<string, API.CommonResp>("signup", formData);
