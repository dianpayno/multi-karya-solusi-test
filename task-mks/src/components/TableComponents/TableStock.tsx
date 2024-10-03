/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";

const tableHead = ["Kode Barang", "Nama Produk", "Harga", "Stok", "Kategori"];

const TableStock = () => {
  const { listAllStock } = useSelector((state: any) => state.stock);
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
          {listAllStock?.data?.map((item: any, i: number) => {
            return (
              <tr key={i} className="text-[14px] ps-2 h-[30px] bg-stone-50">
                <td>{item?.item_code}</td>
                <td>{item?.name}</td>
                <td>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(item?.price)}
                </td>
                <td>{item?.stock}</td>
                <td>{item?.item_type?.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableStock;
