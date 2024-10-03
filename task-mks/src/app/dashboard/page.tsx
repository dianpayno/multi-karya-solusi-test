/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ButtonAddCustomer from "@/components/ButtonAction/ButtonAddCustomer";
import EmployeeCard from "@/components/Card/EmployeeCard";
import StockComponents from "@/components/StockComponents/StockComponents";
import { menuListInterface } from "@/Interface/menuInterface";
import { getDataDetailUser } from "@/lib/features/authenticationSlice/authenticationSlice";
import { getListAllStock } from "@/lib/features/stockSlice/stockSlice";
import { getListTransaction } from "@/lib/features/transactionSlice/transactionSlice";
import { getListAllUser } from "@/lib/features/userSlice/userSlice";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const menuListDashboard: menuListInterface[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    label: "Employee",
    path: "/employee",
  },
  {
    label: "Customers",
    path: "/customers",
  },
  {
    label: "Stock",
    path: "/stock",
  },
  {
    label: "Transaction Report",
    path: "/transaction",
  },
];

const DashboardPage = () => {
  const { detailUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const { listAllUser } = useSelector((state: RootState) => state.user);
  const [activeView, setActiveView] = useState(-1);
  const dispatch = useDispatch();
  //   const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(getDataDetailUser({ id: id }));
    }
  }, []);

  const handleClickActiveDashboard = (path: number) => {
    if (path === 0) {
      setActiveView(-1);
    } else if (path === 1) {
      setActiveView(0);
      dispatch(getListAllUser());
    } else if (path === 2) {
      setActiveView(1);
      dispatch(getListAllUser());
    } else if (path === 3) {
      setActiveView(2);
      dispatch(getListAllStock());
      dispatch(getListAllUser());
    } else if (path === 4) {
      setActiveView(3);
      dispatch(getListTransaction());
      dispatch(getListAllUser());
    }
  };

  console.log(listAllUser);
  return (
    <div className="bg-slate-100 min-h-[100vh] grid grid-cols-7 max-w-full">
      <div className="col-span-1 p-5">
        <div className="flex justify-start items-center gap-2">
          <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] border-gray-400 rounded-full  bg-white">
            <IoIosPerson size={30} />
          </div>

          <div>
            <p className="capitalize text-[14px] font-semibold">
              {detailUser?.data?.detail?.fullname}
            </p>
            <p className="capitalize text-[13px] text-gray-500">
              {detailUser?.data?.username}
            </p>
          </div>
        </div>
        <div className="h-[2px] bg-gray-200 rounded-full mt-5 w-full"></div>
        <div className="mt-5 flex flex-col justify-start items-start">
          {menuListDashboard.map((item, index) => {
            return (
              <div
                onClick={() => handleClickActiveDashboard(index)}
                key={index}
                className="mt-3 hover:bg-slate-200 w-full rounded-[8px] py-1 px-3"
              >
                <button>
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-6 p-5">
        <div className="bg-white rounded-[8px] relative h-[calc(100vh-40px)] flex justify-start overflow-y-auto items-start gap-2 flex-wrap">
          {activeView == 1 && <ButtonAddCustomer />}

          {activeView == 0 ? (
            listAllUser?.dataEmployee?.map((item: any) => {
              return (
                <div className="p-5">
                  <EmployeeCard key={item.id} dataList={item} />
                </div>
              );
            })
          ) : activeView == 1 ? (
            listAllUser?.dataCustomers?.map((item: any) => {
              return (
                <div className="p-5">
                  <EmployeeCard key={item.id} dataList={item} />
                </div>
              );
            })
          ) : activeView == 2 ? (
            <StockComponents />
          ) : activeView == 3 ? (
            <StockComponents activeView={activeView} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
