declare namespace API {
  export type CommonResp<T = any> = {
    status: number;
    data: T;
    msg: string;
    error: string;
  };

  export type UserRegisterReq = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  };

  export type UserLoginReq = {
    email: string;
    password: string;
  };

  export type UserLoginResp = {
    token: string;
  };

  export type UserRegisterResp = {
    id: string;
    message: string;
  };
}
