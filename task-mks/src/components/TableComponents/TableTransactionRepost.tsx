/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const tableHead = [
  "Transaction Number",
  "Customer Name / Id",
  "Transaction Time",
  "Pic Name / Id",
  " Transaction List",
];

const TableTransactionReport = () => {
  const { listTransaction } = useSelector((state: any) => state.transaction);
  const {listAllUser} = useSelector((state: any) => state.user)
  const getHeaderWith = (index: number) => {
    switch (index) {
      case 0:
        return "max-w-[200px] min-w-[200px]";
      case 1:
        return "max-w-[200px] min-w-[200px]";
      case 2:
        return "max-w-[200px] min-w-[200px]";
      case 3:
        return "max-w-[200px] min-w-[200px]";
      case 4:
        return "w-full";
    }
  };
  const getCustomerName = (id: number) => {
    const data = listAllUser.dataCustomers?.find((item: any) => item.detail.id === id);
    if (data) {
      return data.detail.fullname;
    }
  }

  const getPicName = (id: number) => {
    const data = listAllUser.dataEmployee?.find((item: any) => item.detail.id === id);
    if (data) {
      return data.detail.fullname;
    }
  }
  return (
    <div className="mt-2 overflow-y-auto h-[calc(100vh-300px)]">
      <table>
        <tr>
          {tableHead.map((item: any, i: number) => {
            return (
              <th
                className={`${getHeaderWith(
                  i
                )} bg-slate-100 sticky top-0 h-[36px] border-r-[1px] border-gray-200 text-[14px]`}
                key={i}
              >
                {item}
              </th>
            );
          })}
        </tr>
        <tbody>
          {listTransaction.data?.map((item: any, i: number) => {
            return (
              <tr
                key={i}
                className="text-[14px] ps-2 h-[30px] bg-stone-50 border-b-[1px] border-r-[1px] border-gray-200"
              >
                <td className="ps-2 border-r-[1px] ">
                  {" "}
                  {item?.transaction_number}
                </td>
                <td className="ps-2 border-r-[1px] ">{ getCustomerName(item?.customer_id)}</td>
                <td className="ps-2 border-r-[1px] ">
                  {moment(item?.created_at).format("LLL")}
                </td>
                <td className="ps-2 border-r-[1px] ">{
               getPicName(item?.employee_id)
                }</td>
                <td>
                  {item?.sales_transactions?.map(
                    (salesItem: any, i: number) => {
                      const lastIndex =
                        item?.sales_transactions?.length - 1;
                      return (
                        <div
                          key={salesItem.id}
                          className={`${
                            i == lastIndex ? ' ' : "border-b-[1px] border-gray-200"
                          } text-gray-500 ps-5 text-[13px]`}
                        >
                          <p>Product Name : {salesItem.item_id }</p>
                          <p>Quantity : {salesItem.qty} pcs</p>
                          <p>
                            Price :{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(salesItem?.item_price)}
                          </p>
                          <p>
                            Discount :{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(salesItem?.discount)}
                          </p>
                          <p>
                            Gross :{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              maximumFractionDigits: 0,
                            }).format(salesItem.total_gross_price)}
                          </p>
                        </div>
                      );
                    }
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableTransactionReport;
