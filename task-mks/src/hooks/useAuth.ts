"use client";

import { dataForm } from "@/Interface/menuInterface";
import { postDataLogin } from "@/lib/features/authenticationSlice/authenticationSlice";
import { RootState } from "@/lib/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const [dataForm, setDataForm] = useState<dataForm>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleClickLoginButton = async () => {
    await dispatch(postDataLogin({ data: dataForm }));
   
  };
  const handleLogoutButton = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return {
    handleChange,
    handleClickLoginButton,
    handleLogoutButton,
  };
};
