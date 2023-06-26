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
    success: boolean;
    data: {
      token: string;
      name: string;
    };
    message: string;
  };

  export type UserRegisterResp = {
    id: string;
    message: string;
  };

  export type ArticleListResp = {
    source: {
      id: string;
      name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  };

  export type NewsListResp = {
    status: string;
    totalResults: number;
    articles: ArticleListResp[];
  };

  export type NewsDetailResp = {
    status: string;
    totalResults: number;
    articles: ArticleListResp[];
  };
}
