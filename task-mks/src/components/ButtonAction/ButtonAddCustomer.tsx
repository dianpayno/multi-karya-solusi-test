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
import { useCostumer } from "@/hooks/useCostumer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BeatLoader } from "react-spinners";
import { getListAllUser } from "@/lib/features/userSlice/userSlice";

const ButtonAddCustomer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleChangeForm, handleSubmitData } = useCostumer();
  const { postNewData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleClickButtonAdd = async () => {
    await handleSubmitData();
    if (postNewData.status === "success") {
      onClose();
      dispatch(getListAllUser());
    }
  };
  return (
    <>
      <button
        onClick={onOpen}
        className="flex items-center gap-1 h-[30px] absolute top-3 right-3 justify-center w-[170px] px-2 text-[14px] bg-[#17375E] text-white rounded-lg"
      >
        <FiPlus color="white" />
        <span>Tambah Customer</span>
      </button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent className="overflow-hidden">
          <div className="w-full sticky top-0 h-[40px] flex justify-start items-center px-5  bg-gray-200">
            <span>Tambah Customer Baru</span>
          </div>
          <ModalCloseButton />
          <ModalBody>
            <div className="w-full h-[300px] grid grid-cols-2 text-[14px] gap-2">
                {
                    postNewData.status === "error" ? 
                    <div className="col-span-2">
 <p className="text-red-500">Ada masalah dengan server silahkan coba lagi nanti!</p>
                    </div>
                    
                   : null
                }
              <div className="col-span-1">
                <label htmlFor="regis">Registration Number</label>
                <input
                  name="registration_number"
                  type="text"
                  id="regis"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="fullname">Fullname</label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="ps">Password</label>
                <input
                  name="password"
                  id="ps"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="ph">Phone Number</label>
                <input
                  name="phone_number"
                  type="number"
                  id="ph"
                  onChange={handleChangeForm}
                  className="w-full h-[34px] px-2 border-[1px] border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="ad">Address</label>
                <textarea
                  name="address"
                  id="ad"
                  onChange={handleChangeForm}
                  className="w-full h-[100px] px-2 resize-none border-[1px] border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              onClick={handleClickButtonAdd}
              className="flex gap-1 h-[30px] w-full px-2 text-[14px]  justify-center items-center bg-[#17375E] text-white rounded-lg"
            >
              {postNewData.status === "pending" ? (
                <BeatLoader size={10} color="white" />
              ) : (
                <>
                  <FiPlus color="white" />
                  <span>Tambah Customer</span>
                </>
              )}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonAddCustomer;
