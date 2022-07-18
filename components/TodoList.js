import React, { memo, useContext, useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import TodoItem from "../components/TodoItem";
import { MainContext } from "../context/MainContext";
const TodoList = () => {
  const { todos, setTodos, setFilteredTodos, filteredTodos,loading,setLoading } =
    useContext(MainContext);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("userToken")) {
      let colRef = collection(db, localStorage.getItem("userToken"));
      const q = query(colRef, orderBy("addedTime"));
      onSnapshot(q, (snap) => {
        setTodos(snap.docs.map((doc) => doc.data()));
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className="w-[35rem] gap-y-2 flex flex-col items-center mb-2">
      {loading ? (
        <div className="border-4 border-indigo-500 w-[10rem] h-[10rem] rounded-full animate-spin  border-t-indigo-100"></div>
      ) : todos.length > 0 ? (
        filteredTodos.map((todo, key) => <TodoItem todo={todo} key={key} />)
      ) : (
        <div className="text-white dark:text-black text-2xl animate-pulse">
          You don't have any todo ( ' _ ' )
        </div>
      )}
    </div>
  );
};

export default memo(TodoList);
