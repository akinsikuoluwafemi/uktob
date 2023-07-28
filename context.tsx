import React, { createContext, useState, useContext, useEffect } from "react";

export const LocalStateContext = createContext<{
  handlePage: (page: number) => void;
  offSet: number;
  pageNum: number;
}>({
  handlePage: () => {},
  offSet: 0,
  pageNum: 1,
});

export const useLocalState = () => {
  const context = useContext(LocalStateContext);
  if (!context) {
    throw new Error("useLocalState must be used within a LocalStateProvider");
  }
  return context;
};

export const LocalStateWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pageNum, setPageNum] = useState(1);
  const [offSet, setOffSet] = useState(0);

  const handlePage = (page: number) => {
    setPageNum(page);
    const offset = (page - 1) * 20;
    setOffSet(offset);
  };

  return (
    <LocalStateContext.Provider
      value={{
        handlePage,
        offSet,
        pageNum,
      }}
    >
      {children}
    </LocalStateContext.Provider>
  );
};
