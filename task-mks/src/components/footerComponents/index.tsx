import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";

const FooterComponents = () => {
  return (
    <div className="h-[370px] max-w-full bg-[#262626]">
      <div className="h-[330px]  max-w-full  flex justify-start flex-col items-start p-10 ms-20 ">
        <p className="text-white font-semibold">Bussines Info</p>
        <div className="flex justify-start items-start gap-3 text-gray-500 text-[14px] mt-7">
          <div>
            <IoLocationSharp color="gray" />
          </div>
          <div>
            <p>Office Representative:</p>
            <p>JDC Buliding 6th Floor, Jl. Gatot Subroto</p>
            <p>Kav. 53 Jakarta 10260</p>
            <p>Workshop:</p>
            <p>JL. Kafi II Komplek Mabad II ,</p>
            <p>Kel.Srengseng Sawah Kec. Jagakarsa</p>
            <p>Jakarta Selatan</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 text-gray-500 text-[14px] mt-2">
          <div>
            <IoMail color="gray" />
          </div>
          <div>
            <span>info@mksolusi.id</span>
          </div>
        </div>
      </div>

      <div className="h-[70px]  max-w-full bg-[#222222] flex justify-between items-center px-[120px]">
        <span className="text-gray-500 text-[14px]">
          Copyright Multi Karya Solusi @2024 - All Rights Reserved
        </span>
        <div className="flex justify-start items-center gap-3 text-gray-500 text-[14px]">
            <span>Home</span>
            <span>Contact</span>
        </div>
      </div>
    </div>
  );
};

export default FooterComponents;
