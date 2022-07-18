import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { memo, useEffect } from "react";
import { BsCheck } from "react-icons/bs";
import { db } from "../firebase";
const TodoItem = ({ todo }) => {
  const handleCheck = (id) => {
    const uptDocRef = doc(db, localStorage.getItem("userToken"), id);
    updateDoc(uptDocRef, {
      done: !todo.done,
    });
  };
  const handleRemove = (id) => {
    const delDocRef = doc(db, localStorage.getItem("userToken"), id);
    deleteDoc(delDocRef);
  };
  return (
    <div
      onDoubleClick={(e) => {
        handleRemove(todo.id);
      }}
      className="w-full dark:text-black/80 dark:bg-gray-200  justify-between h-12 bg-[#25273C] text-white mx-3 px-2 flex items-center flex-shrink-0 rounded "
    >
      <p className={`${todo.done ? " line-through" : null}`}>{todo?.todo}</p>
      <label className="w-6 h-6  relative cursor-pointer ">
        <input
          type="checkbox"
          name="checkbox"
          checked={todo.done}
          onChange={() => handleCheck(todo.id)}
          className=" appearance-none border cursor-pointer border-gray-400 peer   w-full h-full  rounded-full "
        />
        <BsCheck className="absolute  scale-0 peer-checked:scale-100 transition-all z-[0]   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </label>
    </div>
  );
};

export default memo(TodoItem);
