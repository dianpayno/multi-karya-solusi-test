"use client";
import React, { useEffect } from "react";
import { MdPersonPin } from "react-icons/md";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { BeatLoader } from "react-spinners";

const LoginPage = () => {
  const { handleClickLoginButton, handleChange } = useAuth();
  const { postLogin } = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    if (postLogin?.data?.status == 0) {
        window.location.href = "/";
        localStorage.setItem("token", postLogin?.data?.userdata?.api_token);
        localStorage.setItem("id", postLogin?.data?.userdata?.id);
      }
  }, [postLogin]);

  return (
    <div className="h-[100vh] bg-[#17375E] max-w-full flex justify-center items-center">
      <div className="min-h-[calc(100vh-200px)]  w-[calc(100vw-600px)] bg-white grid grid-cols-2 p-3 rounded-[8px] shadow">
        <div className="col-span-1 bg-slate-200 rounded-[8px] p-5 relative">
          <MdPersonPin color="#17375E" size={50} />
          <p className="text-4xl mt-20 font-semibold">
            Let us help to run your bussines
          </p>
          <p className="text-[14px] text-gray-600">
            Our registrasion process is easly and quick, taking a few minutes
          </p>

          <div className="absolute bottom-5 left-5 text-white text-[15px] flex justify-center p-5 flex-col items-start right-5 bg-[#17375E] rounded-[8px] h-[200px]">
            <p>
              &quot; Multi Karya Solusi delivered outstanding results! Their
              team was professional, met all deadlines, and created a product
              that exceeded our expectations. Great communication and attention
              to detail. Highly recommended! &quot;
            </p>
            <p className="text-gray-500 mt-2 text-[14px]">Bryan Domay</p>
            <p className="text-gray-500 text-[13px]">Product Manager</p>
          </div>
        </div>
        <div className="col-span-1 p-5">
          <p className="text-xl font-semibold mt-7">Get Started</p>
          <p className="text-[14px] text-gray-600">Login to your account</p>
          {
            postLogin?.data?.status == 1 ? <p className="text-[14px] text-red-500">{postLogin?.data?.message}</p> : <div className="h-[25px]"></div>
          }

          <div className="mt-[70px]">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="w-full border-[1px] text-[15px] border-gray-300 rounded-lg p-2 mt-2"
            />
            <div className="mt-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full border-[1px] text-[15px] border-gray-300 rounded-lg p-2 mt-2"
              />
            </div>
            <button
              disabled={postLogin?.status == "pending"}
              onClick={handleClickLoginButton}
              className="mt-10 w-full bg-[#17375E] rounded-[8px] py-2 text-white"
            >
              {postLogin?.status == "pending" ? (
                <BeatLoader color="white" size={10} />
              ) : (
                <span>Login</span>
              )}
            </button>
            <p className="text-gray-500 mt-3 text-center text-[14px]">
              Do not have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
