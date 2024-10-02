"use client";
import { postDataNewCustomer } from "@/lib/features/userSlice/userSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const useCostumer = () => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState<any>({
    username: "",
    password: "",
    registration_number: "",
    fullname: "",
    address: "",
    phone_number: "",
  });

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmitData = () => {
    dispatch(postDataNewCustomer({ data: dataForm }));
  };

  return {
    handleChangeForm,
    handleSubmitData,
  };
};
