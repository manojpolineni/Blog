import React, {useState} from 'react'
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo, toggleTodo } from '../../redux/TodoList';


const TodosItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleToggleTodo = () => {
        dispatch(toggleTodo(todo.id));
    };

    const handleUpdateTodo = () => {
        dispatch(updateTodo({
            id: todo.id,
            text: editedText.trim(),
        }));
        setEditMode(false);
    };

    const handleDeleteTodo = () => {
        dispatch(deleteTodo(todo.id));
    };
    return (
        <>
            <li className='mb-10 capitalize'>{editMode ? (<input type="text" value={editedText}
                onChange={(e) => setEditedText(e.target.value)} className='border p-4 w-1/3 outline-none h-10 rounded-md capitalize' />)
                : (<span className={todo.completed ? 'completed line-through text-red-400' : ''}>{todo.text}</span>)}
                
                <button onClick={handleToggleTodo} className='bg-green-500 text-white font-medium px-2 py-1 rounded ml-52 '>{todo.completed ? 'Undo' : 'Complete'}</button>
                {editMode ? (
                    <button onClick={handleUpdateTodo} className='bg-green-500 text-white font-medium px-2 py-1 rounded mx-2'>Save</button>
                ) : (
                        <button onClick={() => setEditMode(true)} className='bg-yellow-500 text-white font-medium px-2 py-1 rounded mx-2 '>Edit</button>
                )}
                <button onClick={handleDeleteTodo} className='bg-red-500 text-white font-medium px-2 py-1 rounded mx-2 '>Delete</button>
            </li>
        </>
    )
}

export default TodosItem
