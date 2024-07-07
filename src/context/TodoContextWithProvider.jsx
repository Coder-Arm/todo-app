import { createContext, useReducer, useState } from "react";


export const todoContext = createContext();

const initialState = [];

function reducerFn(state,action){
   switch(action.type){
    case 'ADD_TASK' : return [...state,{
      id : Date.now(),
      task : action.payload,
      isCompleted : false,
      editable : false
    }]
    case 'DELETE_TASK' : return state.filter((item,idx) => item.id !== action.payload);

    case 'TOGGLE_COMPLETED' : 
     return state.map((item,idx) => 
        item.id === action.payload ? {...item,isCompleted : !item.isCompleted} : item
      )
    case 'TOGGLE_EDIT' : 
    return state.map((item,idx) => 
      item.id === action.payload ? {...item,editable : !item.editable} : item
    )
    case 'EDIT' : 
    return state.map((item,idx) => 
      item.id === action.payload.id ? {...item,task  : action.payload.task} : item
    )
    default : return state
   }
}

export const TodoContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducerFn,initialState);
    const [editTask,setEditTask] = useState(null);
    return <todoContext.Provider value={{state,dispatch,editTask,setEditTask}}>
     {children}
    </todoContext.Provider>
}