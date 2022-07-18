import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import Footer from "../components/Footer";
import { MainContext } from "../context/MainContext";
const Index = () => {
  //! create user token on localstorage
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      //!already have token
    } else {
      const token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("userToken", token);
    }
    alert('Double Click for deleting item')
  }, []);
  const { loading, filteredTodos } = useContext(MainContext);
  return (
    <div className="flex bg-[#181824]  dark:bg-white/70 items-center justify-center flex-col h-screen w-full ">
      <Header />
      <TodoList />
      {loading ? null : <Footer />}
    </div>
  );
};

export default Index;
