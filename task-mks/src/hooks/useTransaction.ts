/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { postDataTransaction } from "@/lib/features/transactionSlice/transactionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StockInterface {
  transaction_number: string;
  customer: number;
  items: any[];
}

export const useTransaction = () => {
  const dispatch = useDispatch();
  const [stockProductOptions, setStockProductOptions] = useState([]);
  const [listCustomerOptions, setListCustomerOptions] = useState([]);
  const { listAllStock } = useSelector((state: any) => state.stock);
  const { listAllUser } = useSelector((state: any) => state.user);
  const { shoppingListData } = useSelector((state: any) => state.transaction);

  function generateRandomCode() {
    const prefix = "MKST";
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    const formattedNumber = randomNumber.toString().padStart(5, "0");

    return `${prefix}-${year}-${formattedNumber}`;
  }
  const [dataForm, setDataForm] = useState<StockInterface>({
    transaction_number: generateRandomCode(),
    customer: 0,
    items: [],
  });

  const [formShoppingLList, setFormShoppingLList] = useState<any>({
    id: "",
    name: "",
    qty: 0,
    discount: 0,
  });

  const handleChangeFormShoppingList = (e: any) => {
    const { name, value } = e.target;
    setFormShoppingLList({
      ...formShoppingLList,
      [name]: name === "qty" || name === "discount" ? Number(value) : value,
    });
  };

  const handleSelectChangeFormShoppingList = (e: any) => {
    setFormShoppingLList({ ...formShoppingLList, id: e.value, name: e.label });
  };
  const handleChangeForm = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    });
  };

  const handleSelectChange = (e: any) => {
    setDataForm({ ...dataForm, customer: e.value });
  };

  const handleSubmitData = () => {
    dispatch(postDataTransaction({ data: dataForm }));
    setDataForm({
      transaction_number: generateRandomCode(),
      customer: 0,
      items: [],
    })
  };

  useEffect(() => {
    const newData = shoppingListData?.map((item: any) => {
      return {
        id: item.id,
        qty: item.qty,
        discount: item.discount,
      };
    });

    setDataForm({ ...dataForm, items: newData });
  }, [shoppingListData]);

  useEffect(() => {
    const listNewStockValue = listAllStock?.data?.map((item: any) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setStockProductOptions(listNewStockValue);
  }, [listAllStock]);

  useEffect(() => {
    const listNewCustomerValue = listAllUser?.dataCustomers?.map(
      (item: any) => {
        return {
          value: item.detail.id,
          label: item.detail.fullname,
        };
      }
    );
    setListCustomerOptions(listNewCustomerValue);
  }, [listAllUser.dataCustomers]);

  return {
    handleChangeForm,
    dataForm,
    formShoppingLList,
    stockProductOptions,
    listCustomerOptions,
    handleSubmitData,
    handleSelectChange,
    handleChangeFormShoppingList,
    handleSelectChangeFormShoppingList,
  };
};
