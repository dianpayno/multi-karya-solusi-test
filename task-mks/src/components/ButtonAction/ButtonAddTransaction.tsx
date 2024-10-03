/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BeatLoader } from "react-spinners";
import Select from "react-select";
import {
  getListAllCategory,
  getListAllStock,
} from "@/lib/features/stockSlice/stockSlice";
import { useTransaction } from "@/hooks/useTransaction";
import { getListAllUser } from "@/lib/features/userSlice/userSlice";
import ButtonAddShoppingList from "./ButtonAddShopplingList";
import { getListTransaction, resetShoopingListData } from "@/lib/features/transactionSlice/transactionSlice";

const ButtonAddTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleChangeForm,
    handleSubmitData,
    dataForm,
    listCustomerOptions,
    handleSelectChange,
  } = useTransaction();
  const dispatch = useDispatch();

  const { shoppingListData, postTransaction } = useSelector(
    (state: RootState) => state.transaction
  );

  const handleClickButtonAdd = () => {
    handleSubmitData();
  };

  useEffect(() => {
    if (postTransaction.status === "success") {
      dispatch(getListTransaction());
      dispatch(resetShoopingListData());
      onClose();
    }
  }, [postTransaction]);

  const handleClick = async () => {
    dispatch(getListAllCategory());
    dispatch(getListAllStock());
    dispatch(getListAllUser());
    onOpen();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 h-[30px] mt-5  justify-center w-[170px] px-2 text-[14px] bg-[#17375E] text-white rounded-lg"
      >
        <FiPlus color="white" />
        <span>Input Transactions</span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <div className="w-full sticky top-0 h-[40px] flex justify-start items-center px-5  bg-gray-200">
            <span>Tambah Data Transaksi Baru</span>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full min-h-[200px] overflow-y-auto grid grid-cols-2 text-[14px] items-start justify-start gap-2">
              {postTransaction.status === "error" ? (
                <div className="col-span-2">
                  <p className="text-red-500">
                    Ada masalah dengan server silahkan coba lagi nanti!
                  </p>
                </div>
              ) : null}

              <div className="col-span-2">
                <label htmlFor="regis">Transaction Number</label>
                <input
                  name="transaction_number"
                  type="text"
                  id="regis"
                  disabled
                  value={dataForm?.transaction_number}
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="ph">Customers</label>
                <Select
                  classNamePrefix="select"
                  name="type"
                  //   value={listCategoryItem?.data?.find(
                  //     (item: any) => item.value === dataForm?.type
                  //   )}
                  onChange={(e: any) => handleSelectChange(e)}
                  options={listCustomerOptions}
                />
              </div>

              <div className="flex  justify-between items-center col-span-2 w-full">
                <p className="text-[14px] font-semibold">Shooping List</p>
                <ButtonAddShoppingList />
              </div>
              <div>
                {shoppingListData?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="flex  justify-between items-center col-span-2 w-full"
                  >
                    <p>{i + 1}</p>
                    <p className="text-[14px] ">{item?.name}</p>
                    <p className="text-[14px] ">{item?.qty} pcs</p>
                    <p className="text-[14px] ">
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item?.discount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleClickButtonAdd}
              className="flex gap-1 h-[30px] w-full px-2 text-[14px]  justify-center items-center bg-[#17375E] text-white rounded-lg"
            >
              {postTransaction.status === "pending" ? (
                <BeatLoader size={10} color="white" />
              ) : (
                <>
                  <FiPlus color="white" />
                  <span>Tambahkan Stock</span>
                </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonAddTransaction;
