import React, { useState } from "react";
import logo from "../assets/logo.svg";
import googleBtn from "../assets/google.svg";
import { useNavigate } from "react-router-dom";

import "../custom.css";
import InputField from "../components/InputField";
import { Router } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    // <div className="flex h-screen bg-cover bg-center p-12 md:flex-row flex-col bg-image">
    <div className="flex flex-col md:flex-row h-auto md:h-screen bg-cover bg-center p-6 md:p-12 bg-image">
      {/* Left Section - Sign In */}
      <div className="flex flex-col  items-center md:w-[50%] w-[100%] rounded-[24px] bg-[#FFFFFF] px-8">
        <div className="w-full flex items-start justify-center md:justify-start pt-8 pb-6 md:pb-0">
          <img src={logo} />
        </div>
        <div className="h-full flex flex-col justify-center items-center md:w-[55%]">
          <h1 className="text-3xl font-bold mb-4">Sign in</h1>
          <p className="text-[#969696] text-[14px] font-normal	font mb-8 text-center">
            Please login to continue to your account.
          </p>
          <form className="w-full max-w-md">
            <InputField
              id="Email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="my-5">
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                //   placeholder="Enter your email"
              />
            </div>
            {/* </div> */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 border-2 rounded-[4px]"
                />
                <span className="md:text-xs text-[10px]  font-semibold text-[#232323] ">
                  Keep me logged in
                </span>
              </label>
              <a
                href="#"
                className="text-[#0056B3] md:text-sm text-[10px] font-medium"
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white py-2 bg-gradient-to-r from-[#0051A8] to-[#007BFF] rounded-[10px] text-[14px] font-[600]"
              //   onClick={()=>Router.pu}
            >
              Sign in
            </button>
          </form>
          <div className="w-full flex items-center my-3">
            <div className="w-[45%] h-[1px] bg-[#D9D9D9] mr-2"></div>
            <p className="text-[#6E6E6E] text-[16px] font[500]">or</p>
            <div className="w-[45%] h-[1px] bg-[#D9D9D9] ml-2"></div>
          </div>

          <div className="text-center w-full">
            <button className="flex items-center justify-center w-full max-w-md bg-white py-2 rounded-[10px] border-[#E6E8E7] border-[1px] text-[#232323] md:text-[18px] font-[600]">
              Sign in with Google
              <img src={googleBtn} className="ml-2" />
            </button>
          </div>

          <p className="text-[#6C6C6C] font-[400] md:text-[18px] mt-4">
            Need an account?{" "}
            <a
              href="#"
              className="text-[#216BBD] underline font-[600] md:text-[18px]"
            >
              Create one
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Sign Up */}
      <div className="flex flex-col justify-center items-center md:w-1/2 rounded-[24px] text-white bg-halfsection">
        <h2 className="md:text-[50px] text-[25px] md:font-bold mb-4">
          New Here
        </h2>
        <div className=" w-[50%] flex items-center flex-col">
          <p className="mb-8 text-center md:text-[24px] text-[12px] font-[400px]">
            Sign Up And Discover A Great Amount Of New Opportunities!
          </p>
          <button
            className="bg-white text-[#0170E8] font-[600] md:text-[18px] text-[14px] mb-2 px-6 py-2 rounded-lg w-full"
            onClick={() => navigate("/sign-up")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
