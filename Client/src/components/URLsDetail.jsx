import React, { useContext, useEffect, useState } from "react";
import { IoCopySharp } from "react-icons/io5";
import { BsCopy } from "react-icons/bs";
import { contextApi } from "./MyContext";

export const URLsDetail = () => {
  const { historyData } = useContext(contextApi);
  const [selectedItem, setSelectedItem] = useState();
  const [showCopiedIcon, setShowCopiedIcon] = useState(false);

  // console.log("user history", historyData);

  // Handle Copy Short Url.

  const handleCopy = (id, selectedValue) => {
    navigator.clipboard.writeText(selectedValue);

    setSelectedItem(id);
    setShowCopiedIcon(true);

    setTimeout(() => {
      setShowCopiedIcon(false);
    }, 3000);

    // console.log("Copied Text", id, selectedValue);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-start gap-[3px] relative">
      <div className="flex h-[63px] items-center justify-between text-center  gap-4 px-[25px]  w-full bg-[#181e29] rounded-[10px_10px_0px_0px] shadow-[0px_4px_10px_#0000001a] backdrop-blur-[14px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(14px)_brightness(100%)]">
        <div className="w-full [font-family:'Inter-Bold',Helvetica] font-bold text-[#c9ced6] text-[15px] sm:w-[50%] lg:w-[30%]">
          Short Link
        </div>
        <div className=" w-[30%] [font-family:'Inter-Bold',Helvetica] font-bold text-[#c9ced6] text-[15px] hidden lg:block">
          Original Link
        </div>
        <div className=" [font-family:'Inter-Bold',Helvetica] font-bold text-[#c9ced6] text-[15px] hidden sm:block sm:w-[20%] lg:w-[10%]">
          Clicks
        </div>
        <div className="[font-family:'Inter-Bold',Helvetica] font-bold text-[#c9ced6] text-[15px] hidden sm:block sm:w-[30%]">
          Created At
        </div>
      </div>
      {!historyData || historyData.length == 0 ? (
        <h1 className="text-center mt-[2rem] mx-auto text-2xl">
          No Results found yet...
        </h1>
      ) : (
        <div className="overflow-y-scroll w-full h-[40vh] scrollbar-hide">
          {historyData?.map(
            ({ original_url, short_url, clicks, created_at, id, user_id }) => (
              <div
                key={id}
                className="flex h-fit items-center justify-between text-center gap-4 pl-[25px] pr-[25.19px] py-[21px] relative self-stretch w-full bg-[#181e2938] shadow-[0px_4px_10px_#0000001a] backdrop-blur-[28px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(28px)_brightness(100%)]"
              >
                <div className="w-full inline-flex gap-2.5 flex-[0_0_auto] justify-center mt-[-7.00px] mb-[-7.00px] items-center sm:w-[50%] lg:w-[30%]">
                  <div className="relative overflow-hidden [font-family:'Inter-Light',Helvetica] font-light text-[#c9ced6] text-md ">
                    https://linkify-shortener.vercel.app/{short_url}/{user_id}
                    {/* http://localhost:3000/linkify/{short_url}/{user_id} */}
                  </div>

                  <div
                    onClick={() =>
                      handleCopy(
                        id,
                        `https://linkify-shortener.vercel.app/${short_url}/${user_id}`
                      )
                      // handleCopy(
                      //   id,
                      //   // `http://localhost:3000/linkify/${short_url}/${user_id}`
                      // )
                    }
                    className="flex flex-col h-[35px] justify-center gap-2.5 p-2.5 bg-[#1c283fb0] rounded-[31px] relative cursor-pointer"
                  >
                    <div
                      className={`${
                        selectedItem == id && showCopiedIcon && "text-green-400"
                      } relative w-fit mt-[-7.50px] mb-[-5.50px] [font-family:'Font_Awesome_6_Pro-Regular',Helvetica] font-normal text-[#c9ced6] text-[15px] whitespace-nowrap`}
                    >
                      {selectedItem == id ? (
                        showCopiedIcon ? (
                          <IoCopySharp />
                        ) : (
                          <BsCopy />
                        )
                      ) : (
                        <BsCopy />
                      )}
                    </div>
                  </div>
                </div>

                <div className="justify-center overflow-x-hidden w-[30%] gap-2.5 relative leading-none hidden lg:flex">
                  <div className="relative w-full [font-family:'Inter-Light',Helvetica] font-light text-[#c9ced6] text-md ">
                    {original_url}
                  </div>
                </div>

                <div className=" overflow-hidden justify-center  [font-family:'Inter-Light',Helvetica] font-light text-[#c9ced6] text-md sm:flex sm:w-[20%] lg:w-[10%]">
                  {clicks}
                </div>

                <div className="hidden overflow-hidden justify-center [font-family:'Inter-Light',Helvetica] font-light text-[#c9ced6] text-md sm:flex sm:w-[30%]">
                  {new Date(created_at).toDateString()} -{" "}
                  {new Date(created_at).toLocaleTimeString()}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
