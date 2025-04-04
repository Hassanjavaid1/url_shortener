import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";

import { ToastContainer, toast } from "react-toastify";

import { LuLink } from "react-icons/lu";
import { contextApi } from "./MyContext";

function InputURL() {
  const { isLoading, setIsLoading, setHistoryData, historyData } =
    useContext(contextApi);

  const [inputURL, setInputURL] = useState("");
  let inputRef = useRef(null);

  const handleSubmitURL = async (e) => {
    e.preventDefault();

    try {
      if (
        !inputURL.startsWith("https") ||
        inputURL === "" ||
        inputURL.startsWith("https://linkify.vercel.app/")
      ) {
        console.log("Wrong url", inputURL);
        toast.dismiss();
        toast.error("Invalid Link");
        return null;
      }

      // Generate user id;

      let userId = localStorage.getItem("userId") || "";

      if (!userId || userId === "") {
        userId = "user_" + Math.random().toString(36).substring(2, 6);
        localStorage.setItem("userId", userId);
      }
      setIsLoading(true);

      let postURL = await axios.post(
        "http://localhost:3000/PostURL",
        {
          url: inputURL,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post URL", postURL.data);
      setTimeout(() => {
        setIsLoading(false);
        setInputURL(postURL?.data?.data.short_url);
        setHistoryData(postURL.data.data.user_history?.reverse());
        console.log("Historydata", historyData);

        setTimeout(() => {
          inputRef.current.select();
        }, 1);
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-3">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center gap-6">
          <img
            src="/Hero-Image.png"
            alt="Hero Img"
            className=" object-cover hidden w-[90%] sm:w-full sm:block xl:w-[60%]"
          />
          {/* Small devices */}
          <img
            src="/Hero-image-mobile.png"
            alt="Hero Img"
            className=" object-cover sm:hidden"
          />

          <p className="text-gray-300 text-center text-lg">
            Linkify is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </p>
          <form
            onSubmit={handleSubmitURL}
            className="relative bg-[#181E29] border-3 border-[#353C4A] flex items-center justify-center overflow-hidden rounded-[48px] w-full lg:w-[48%]"
          >
            <LuLink className="text-lg text-gray-300 absolute left-6" />
            <input
              type="text"
              placeholder="Enter the link here"
              value={inputURL}
              onChange={(e) => setInputURL(e.target.value)}
              ref={inputRef}
              className="text-lg w-full py-4 px-13 border-0 rounded-[48px] outline-none lg:py-5"
            />
            {isLoading ? (
              <>
                <button
                  disabled
                  className={` bg-[#1243c1] text-gray-200 rounded-[48px] absolute  right-1 top-1 bottom-1 px-5  text-lg font-semibold cursor-pointer hidden lg:block lg:px-6`}
                >
                  Processing...
                </button>
                {/* Mobile Design */}
                <button
                  disabled
                  className={` bg-[#1243c1] text-gray-200 rounded-[48px] absolute  right-1 top-1 bottom-1 px-5  text-lg font-semibold cursor-pointer lg:hidden lg:px-6`}
                >
                  <CiNoWaitingSign />
                </button>
              </>
            ) : (
              <>
                <button
                  className={`bg-[#144EE3] rounded-[48px] outline-none absolute  right-1 top-1 bottom-1 px-5  text-lg font-semibold cursor-pointer hidden lg:block lg:px-6`}
                >
                  Shorten Now!
                </button>
                {/* Mobile Design */}
                <button
                  className={`bg-[#144EE3] rounded-[48px] outline-none absolute  right-1 top-1 bottom-1 px-5  text-lg font-semibold cursor-pointer  lg:hidden lg:px-6`}
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default InputURL;
