import React, { useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const Avatar = () => {
  const { handleLogoutButton } = useAuth();
  const { detailUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        className="w-[40px] h-[40px] ms-10 flex justify-center items-center border-[1px] border-gray-400 rounded-full mt-2  bg-white"
      >
        <IoIosPerson size={30} />
      </button>

      {isHover && (
        <div 
        onMouseLeave={handleMouseLeave}
        className="bg-white  w-[200px] h-[200px] rounded-[8px] p-5 absolute top-[50px] right-0">
          <div className="w-[40px] h-[40px] flex justify-center items-center border-[1px] border-gray-400 rounded-full mt-2  bg-white">
            <IoIosPerson size={30} />
          </div>
          <div>
            <p className="capitalize text-[14px] mt-3 font-semibold">
              {detailUser?.data?.detail?.fullname}
            </p>
            <p className="capitalize text-[13px] text-gray-500">
              {detailUser?.data?.username}
            </p>
          </div>
          <button
            onClick={handleLogoutButton}
            className="px-4 mt-10 py-1 bg-[#17375E] rounded-lg text-white"
          >
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Avatar;
