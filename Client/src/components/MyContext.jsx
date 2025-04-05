import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const contextApi = createContext();
export default function MyContext({ children }) {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApi = async (userId) => {
    // console.log("userID", userId);
    try {
      let url = "http://localhost:3000/linkify";
      url = "https://linkify-backend-den.vercel.app";
      const res = await axios.get(url, {
        params: { userId },
      });
      console.log("DEFAUTL RESULTS", res);
      setHistoryData(res.data.data?.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUser = localStorage.getItem("userId");
    if (getUser && getUser !== "") {
      fetchApi(getUser);
    }
  }, []);

  return (
    <>
      <contextApi.Provider
        value={{
          isLoading,
          setIsLoading,
          historyData,
          setHistoryData,
        }}
      >
        {children}
      </contextApi.Provider>
    </>
  );
}

export { contextApi };
