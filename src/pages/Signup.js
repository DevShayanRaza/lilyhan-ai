import React, { useState } from "react";
import lightlogo from "../assets/lightlogo.svg";
import googleBtn from "../assets/google.svg";
import calendar from "../assets/calendar.svg";
import eyeclose from "../assets/eyeclose.svg";
import eyeopen from "../assets/eyeopen.svg";

import { useNavigate } from "react-router-dom";

import "../custom.css";
import InputField from "../components/InputField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const CustomDateInput = ({ value, onClick }) => {
    return (
      <div
        className="block pl-10 pb-2.5 pt-4 w-[300px] h-10 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0056B3] peer cursor-pointer"
        onClick={onClick}
      >
        {value || " "}
      </div>
    );
  };
  return (
    // <div className="flex h-screen bg-cover bg-center p-12 md:flex-row flex-col bg-image">
    <div className="flex flex-col md:flex-row h-auto md:h-screen bg-cover bg-center p-6 md:p-12 bg-image">
      <div className="flex flex-col items-center md:w-1/2 rounded-[24px] px-8 text-white bg-halfsection">
        <div className="w-full flex items-start justify-center md:justify-start pt-8 pb-5 md:pb-0">
          <img src={lightlogo} />
        </div>

        <div className="flex justify-center items-center flex-col h-full">
          <h2 className="md:text-[50px] text-[25px] md:font-bold mb-4">
            One Of Us?
          </h2>
          <div className="w-[50%] flex items-center flex-col">
            <p className="mb-8 text-center md:text-[24px] text-[12px] font-[400px]">
              If you already have an account, just sign in. We've missed you!{" "}
            </p>
            <button
              className="bg-white text-[#0170E8] font-[600] md:text-[18px] text-[14px] mb-2 px-6 py-2 rounded-lg w-full hover:bg-gray-200"
              onClick={() => navigate("/")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col  items-center md:w-[50%] w-[100%] rounded-[24px] bg-[#FFFFFF] px-8">
        <div className="h-full flex flex-col justify-center items-center md:w-[55%]">
          <h1 className="text-3xl font-bold mb-4">Sign up</h1>
          <p className="text-[#969696] text-[14px] font-normal	font mb-8 text-center">
            Sign up to enjoy the feature of Revolutie
          </p>
          <form className="w-full max-w-md">
            <InputField
              label="Your Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* <div className="relative my-5">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <img src={calendar} alt="calendar icon" />
  </div>

  <input
    type="date"
    id="date_input"
    className="block pl-10 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0056B3] peer"
    placeholder=" "
  />

  <label
    htmlFor="date_input"
    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-10 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#0056B3] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
  >
    Date of Birth
  </label>
</div> */}

            <div className="relative my-5 w-full max-w-md mx-auto">
              {/* Custom Calendar Icon */}
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img src={calendar} alt="calendar icon" />
              </div>

              {/* React Date Picker */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className={`block z-999 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0056B3] ${
                  selectedDate ? "pt-4 pl-10 pb-2.5" : "pl-10 py-3"
                }`}
                wrapperClassName="w-full"
                style={{ width: "100%" }}
                // placeholderText="Date of Birth"
              />

              {/* Floating Label */}
              <label
                htmlFor="date_picker"
                className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform origin-[0] left-10 z-10 bg-white dark:bg-gray-900 px-2 ${
                  selectedDate
                    ? "scale-75 -translate-y-4 top-2"
                    : "scale-10 top-3"
                }`}
              >
                Date of Birth
              </label>
            </div>

            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative my-5">
              {/* Password Input */}
              <input
                type={passwordVisible ? "text" : "password"}
                id="password_input"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              {/* Floating Label */}
              <label
                htmlFor="password_input"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 left-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Password
              </label>

              {/* Eye Icon */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  // Eye Open Icon

                  <img src={eyeopen} />
                ) : (
                  <img src={eyeclose} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 bg-gradient-to-r from-[#0051A8]  to-[#007BFF] rounded-[10px] text-[18px] font-[600]  hover:to-[#0051A8] hover:from-[#007BFF]  transition ease-in-out duration-500 delay-150"
            >
              Sign up
            </button>
          </form>
          <div className="w-full flex items-center my-3">
            <div className="w-[45%] h-[1px] bg-[#D9D9D9] mr-2"></div>
            <p className="text-[#6E6E6E] text-[16px] font[500]">or</p>
            <div className="w-[45%] h-[1px] bg-[#D9D9D9] ml-2"></div>
          </div>

          <div className="text-center w-full">
            <button className="flex items-center justify-center w-full max-w-md bg-white py-2 rounded-[10px] border-[#E6E8E7] border-[1px] text-[#232323] md:text-[18px] font-[600] hover:bg-gray-200">
              Continue with Google <img src={googleBtn} className="ml-2" />
            </button>
          </div>

          <p className="text-[#6C6C6C] font-[400] text-[14px] md:text-[18px] mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-[#216BBD] underline font-[600] md:text-[18px] cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right Section - Sign Up */}
    </div>
  );
};

export default Signup;
