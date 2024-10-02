"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoImage from "@/media/logo.png";
import { menuListInterface } from "@/Interface/menuInterface";
import Link from "next/link";

import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import { getDataDetailUser } from "@/lib/features/authenticationSlice/authenticationSlice";

const menuList: menuListInterface[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
];

const NavbarComponents = () => {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      setIsLogin(true);
    }
    if (id) {
      dispatch(getDataDetailUser({ id: id }));
    }
  }, []);

  return (
    <div className="max-w-full h-[90px] bg-[##F8F7F3] shadow-sm flex justify-between items-center mx-5">
      <div className="ms-[160px]">
        <Image src={logoImage} alt="logo" width={60} height={60} />
      </div>
      <div className="flex gap-3 pe-20 text-[14px] justify-start items-center">
        {menuList.map((menu: menuListInterface, i: number) => {
          return (
            <div key={i} className="cursor-pointer hover:text-blue-500">
              <Link href={menu.path}>{menu.label}</Link>
            </div>
          );
        })}
        {isLogin ? (
          <Avatar />
        ) : (
          <Link href="/login">
            <button className="px-4 py-1 bg-[#17375E] rounded-lg text-white">
              <span>Login</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarComponents;
