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
import { getListAllCategory} from "@/lib/features/stockSlice/stockSlice";
import { useStock } from "@/hooks/useStock";

const ButtonAddStock = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleChangeForm, handleSubmitData, dataForm, handleSelectChange } =
    useStock();
  const dispatch = useDispatch();
  const { listCategoryItem, postDataStock } = useSelector((state: RootState) => state.stock);

  const handleClickButtonAdd =  () => {
     handleSubmitData();
     onClose();
  };
  

  

  const handleClick = async () => {
    dispatch(getListAllCategory());
    onOpen();
  };
  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-1 h-[30px] mt-5  justify-center w-[170px] px-2 text-[14px] bg-[#17375E] text-white rounded-lg"
      >
        <FiPlus color="white" />
        <span>Tambah Stock</span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <div className="w-full sticky top-0 h-[40px] flex justify-start items-center px-5  bg-gray-200">
            <span>Tambah Data Stock Baru</span>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-[200px] grid grid-cols-2 text-[14px] gap-2">
              {postDataStock.status === "error" ? (
                <div className="col-span-2">
                  <p className="text-red-500">
                    Ada masalah dengan server silahkan coba lagi nanti!
                  </p>
                </div>
              ) : null}
              <div className="col-span-2">
                <label htmlFor="ph">Kategory</label>
                <Select
                  classNamePrefix="select"
                  name="type"
                  value={listCategoryItem?.data?.find(
                    (item: any) => item.value === dataForm?.type
                  )}
                  onChange={(e: any) => handleSelectChange(e)}
                  options={listCategoryItem?.data}
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="regis">Kode Item</label>
                <input
                  name="item_code"
                  type="text"
                  id="regis"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="fullname">Nama Produk</label>
                <input
                  type="text"
                  name="name"
                  id="fullname"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="username">Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="username"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="ps">Price</label>
                <input
                  type="number"
                  name="price"
                  id="ps"
                  onChange={handleChangeForm}
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

export default ButtonAddStock;
