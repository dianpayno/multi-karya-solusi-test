/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { postNewStockData } from "@/lib/features/stockSlice/stockSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

interface StockInterface {
    item_code: string;
    type: number;
    name: string;
    stock: number;
    price: number;
}

export const useStock = () => {
  const dispatch = useDispatch();
  const [dataForm, setDataForm] = useState<StockInterface>({
    item_code: "",
    type: 0,
    name: "",
    stock: 0,
    price: 0,
   
  });

  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: name === "stock" || name === "price" ? Number(value) : value });
  };

const handleSelectChange = (e: any) => {
  
  setDataForm({ ...dataForm, type: e.value });
};

  const handleSubmitData = () => {
    dispatch(postNewStockData({ data: dataForm }));
  };

  return {
    handleChangeForm,
    dataForm,
    handleSubmitData,
    handleSelectChange,
  };
};
