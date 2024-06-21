import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
    addTodo,
} from "../../redux/TodoList";
import TodosItem from "./TodosItem";
import QuotationForm from "./Quotation";

const Todos = () => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState("");
    const todosList = useSelector((state) => state.todos);

    const handleAddtodo = () => {
        if (todo.trim !== "" && todo.length>0) {
            dispatch(
                addTodo({
                    id: nanoid(),
                    text: todo,
                    complete: false,
                })
            );
            setTodo("");
        }
    };

    return (
        <>
            <div className="py-10 mx-auto w-[1100px]">
                <h2 className="text-3xl font-bold text-red-500 text-center uppercase">
                    todo's
                </h2>
                <div className="my-5 flex items-center flex-col">
                    <h3 className="py-2">Add Todos</h3>

                    <input
                        className="border h-9 w-[50%] outline-none px-2 text-sm capitalize"
                        type="text"
                        value={todo}
                        placeholder="Enter a Todo"
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    {todo ? <button
                        className="border rounded-md text-lg text-white bg-slate-600 my-2 px-4 py-1 hover:scale-105"
                        onClick={handleAddtodo}
                    >
                        Add todo
                    </button> : ''}
                </div>

                <ul className="text-center">{todosList.length>0 ? todosList.map((todo, index) => {
                    return <TodosItem key={index} todo={todo} />
                }): 'No Todos Please Add Todos'}</ul>
            </div>

        </>
    );
};

export default Todos;
