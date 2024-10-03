/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import TableStock from "../TableComponents/TableStock";
import ButtonAddStock from "../ButtonAction/ButtonAddStock";
import TableTransactionReport from "../TableComponents/TableTransactionRepost";
import ButtonAddTransaction from "../ButtonAction/ButtonAddTransaction";

const headerStockList = [
  {
    label: "Today",
    data: "",
  },
  {
    label: "Total Orders",
    data: "1098",
  },
  {
    label: "Ordered Items Overtime",
    data: "198",
  },
  {
    label: "Return",
    data: "18",
  },
  {
    label: "Fulfilled Items Overtime",
    data: "5678",
  },
  {
    label: "Delivered Items Overtime",
    data: "7678",
  },
];

interface ActiveView {
  activeView?: number;
}

const StockComponents = ({ activeView }: ActiveView) => {
  return (
    <div className="w-full">
      <div className="sticky top-0 bg-white z-10 p-5">
        <div className="flex justify-between p-5 bg-white z-10">
          <p className="text-[20px]  font-semibold">
            {activeView == 3 ? "Transaction & Report" : "Stocks"}
          </p>
          {activeView == 3 ? <ButtonAddTransaction /> : <ButtonAddStock />}
        </div>

        <div className="w-full grid grid-cols-6 mt-2  h-[80px] bg-slate-100 rounded-[8px]">
          {headerStockList.map((item: any, i: number) => {
            return (
              <div
                key={i}
                className="col-span-1 border-r-[1px] px-5 flex justify-center items-start flex-col border-slate-300"
              >
                {i == 0 ? (
                  <div className="flex items-center gap-1">
                    <FaRegCalendarCheck size={20} className="text-blue-500" />
                    <p className="text-[14px] font-semibold">{item.label}</p>
                    <p className="text-[14px] font-bold text-gray-500">
                      {item.data}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-[14px] font-semibold">{item.label}</p>
                    <p className="text-[14px] font-bold text-gray-500">
                      {item.data}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-5">
      {activeView == 3 ? <TableTransactionReport /> : <TableStock />}
      </div>

      
    </div>
  );
};

export default StockComponents;
