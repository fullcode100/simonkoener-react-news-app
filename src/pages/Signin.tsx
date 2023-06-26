import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { redirect, useNavigate } from "react-router-dom";
import { notification } from "antd";

import Block from "../components/common/Block";
import SigninForm, { SigninData } from "../components/auth/SigninForm";
import { login } from "../api/auth";
import { useAuth, useGuestMode } from "../utils/auth";

const Signin: React.FC = () => {
  const [, startNavigation] = React.useTransition();
  const [, setToken] = useAuth();
  const [api, contextHolder] = notification.useNotification();
  const isGuest = useGuestMode();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (formData: SigninData) => {
      return login(formData);
    },
    onSuccess: (response, variables, context) => {
      const data: API.UserLoginResp = response.data;
      if (data.data.token) {
        const token = data.data.token;
        localStorage.setItem("authtoken", token);
        setToken(token);
      }
      navigate("/news");
    },
    onError(error, variables, context) {
      api.error({
        message:
          "The account does not exist or you have provided incorrect data",
        placement: "top",
      });
    },
  });

  const handleSubmit = (input: SigninData) => {
    loginMutation.mutate(input);
  };

  if (!isGuest) {
    return null;
  }

  return (
    <Block>
      {contextHolder}
      <SigninForm pending={loginMutation.isLoading} onSubmit={handleSubmit} />
    </Block>
  );
};

export default Signin;
