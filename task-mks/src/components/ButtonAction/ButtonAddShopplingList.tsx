/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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
import { getListAllCategory, getListAllStock } from "@/lib/features/stockSlice/stockSlice";
import { useTransaction } from "@/hooks/useTransaction";
import { getListAllUser } from "@/lib/features/userSlice/userSlice";
import { addShoopingListData } from "@/lib/features/transactionSlice/transactionSlice";

const ButtonAddShoppingList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleChangeFormShoppingList,formShoppingLList, handleSelectChangeFormShoppingList, stockProductOptions } =
  useTransaction();
  const dispatch = useDispatch();
  const {  postDataStock } = useSelector(
    (state: RootState) => state.stock
  );
 

  const handleClickButtonAdd = () => {
    dispatch(addShoopingListData(formShoppingLList));
    onClose();
  };

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
        className="flex items-center gap-1 h-[30px] mt-1 justify-center w-[50px] px-2 text-[14px] bg-[#17375E] text-white rounded-lg"
      >
        <FiPlus color="white" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <div className="w-full sticky top-0 h-[40px] flex justify-start items-center px-5  bg-gray-200">
            <span>Add Shopping List</span>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full min-h-[150px] grid grid-cols-2 text-[14px] items-start justify-start gap-2">
              {postDataStock.status === "error" ? (
                <div className="col-span-2">
                  <p className="text-red-500">
                    Ada masalah dengan server silahkan coba lagi nanti!
                  </p>
                </div>
              ) : null}

              <div className="col-span-2">
                <label htmlFor="ph">Product Item</label>
                <Select
                  classNamePrefix="select"
                  name="type"
                  onChange={(e: any) => handleSelectChangeFormShoppingList(e)}
                  options={stockProductOptions}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="regis">Qty</label>
                <input
                  name="qty"
                  type="number"
                  id="regis"
                  onChange={handleChangeFormShoppingList}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="regis">Discount</label>
                <input
                  name="discount"
                  type="number"
                  id="regis"
                  onChange={handleChangeFormShoppingList}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleClickButtonAdd}
              className="flex gap-1 h-[30px] w-full px-2 text-[14px]  justify-center items-center bg-[#17375E] text-white rounded-lg"
            >
              {postDataStock.status === "pending" ? (
                <BeatLoader size={10} color="white" />
              ) : (
                <>
                  <FiPlus color="white" />
                  <span>Add</span>
                </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonAddShoppingList;
