import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
const Footer = () => {
  const { todos, filteredTodos, setFilteredTodos } = useContext(MainContext);
  const [currentFilter, setCurrentFilter] = useState(0);
  useEffect(() => {
    if (todos.length > 0) {
      setFilteredTodos(todos);
    }
  }, [todos]);
  const filterMenu = [
    {
      title: "All",
      id: 0,
    },
    {
      title: "Active",
      id: 1,
    },
    {
      title: "Completed",
      id: 2,
    },
  ];
  const handleActiveFilter = (id) => {
    setCurrentFilter(id);
    switch (id) {
      case 0:
        setFilteredTodos(todos);
        break;
      case 1:
        setFilteredTodos(todos.filter((todo) => todo.done === false));
        break;
      case 2:
        setFilteredTodos(todos.filter((todo) => todo.done === true));
    }
  };
  const handleClearComplated = async () => {
    todos.map((todo) => {
      if (todo.done === true) {
        const docRef = doc(db, localStorage.getItem("userToken"), todo.id);
        deleteDoc(docRef);
      }
    });
  };
  return (
    <div
      className={`w-[35rem] dark:bg-gray-200  bg-[#25273C]  h-14  px-4 items-center justify-around rounded  ${
        filteredTodos.length < 0 ? "hidden" : "flex"
      }`}
    >
      <div className="text-gray-400 flex items-center gap-x-1 dark:text-black/80">
        <p className="text-indigo-200 dark:text-indigo-700  font-semibold">
          {filteredTodos?.length}
        </p>{" "}
        items left
      </div>
      <ul className="flex items-center gap-x-3 font-semibold text-gray-400 dark:text-black/80 ">
        {filterMenu.map((menu) => (
          <li
            onClick={() => handleActiveFilter(menu.id)}
            className={`cursor-pointer hover:text-white transition-all dark:hover:text-black ${
              menu.id == currentFilter ? "text-indigo-500" : null
            }`}
            key={menu.id}
          >
            {menu.title}
          </li>
        ))}
      </ul>
      <button
        className="text-gray-400 hover:text-white transition-all  dark:text-black/80"
        onClick={handleClearComplated}
      >
        Clear Complated
      </button>
    </div>
  );
};

export default Footer;
