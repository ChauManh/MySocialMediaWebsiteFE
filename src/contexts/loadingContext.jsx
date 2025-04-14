// contexts/LoadingContext.js
import React, { createContext, useContext, useState } from "react";
import FullScreenLoading from "../components/FullScreenLoading";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <FullScreenLoading />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
