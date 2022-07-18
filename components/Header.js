import React, { useState } from "react";
import { BsSun } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import AlertBox from "../components/AlertBox";

const Header = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const handleAddTodo = async () => {
    if (input) {
      setError("");
      setInput("");
      const todoId = Math.random().toString(36).substring(2, 15);
      const docRef = doc(db, localStorage.getItem("userToken"), todoId);
      await setDoc(docRef, {
        todo: input,
        addedTime: new serverTimestamp(),
        id: todoId,
        done: false,
      });
    } else {
      setError("Please Enter something for doing");
    }
  };

  return (
    <div className="flex w-[35rem] h-auto flex-col  mb-6 ">
      <AlertBox setError={setError} error={error} />
      <div className="flex items-center justify-between w-full mb-10">
        <h2 className="text-white uppercase text-3xl tracking-[20px] dark:text-black/80">
          todo
        </h2>
        <button
          className="hover:text-white text-3xl text-gray-500 "
          onClick={() => {
            if (
              localStorage.theme === "dark" ||
              (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
            if (localStorage.getItem("theme") === "dark") {
              localStorage.setItem("theme", "light");
            } else {
              localStorage.setItem("theme", "dark");
            }
          }}
        >
          <BsSun className="dark:text-black/80" />
        </button>
      </div>
      <label className="w-full flex items-center gap-x-2">
        <input
          placeholder="Create new todo"
          type="text"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent dark:text-black/80 dark:bg-transparent dark:border-2 dark:border-black/50 outline-none bg-[#25273c] h-12 rounded px-3 text-white"
        />
        <button
          onClick={handleAddTodo}
          className="hover:text-white text-3xl text-gray-500  dark:text-black/80"
        >
          <IoIosAddCircleOutline />
        </button>
      </label>
    </div>
  );
};

export default Header;
