import { useContext, useEffect, useRef, useState } from "react"
import { todoContext } from "../context/TodoContextWithProvider";

const Input = () => {
  const [task,setTask] = useState('');
  
  const inputRef = useRef()
  const {state,dispatch,editTask,setEditTask}  = useContext(todoContext);
   console.log(state)

   useEffect(() => {
    if(editTask) setTask(editTask.task)
      inputRef.current.focus()
   },[editTask])

   function handleClick(){
    if(!editTask){
    dispatch({type : 'ADD_TASK',payload : task})
    }
    else{
      dispatch({type : 'EDIT' , payload : {id : editTask.id,task}});
      setEditTask(null)
    }
    setTask('')
   }

   useEffect(() => {
    inputRef.current.focus();
   },[])

  return (
    <div className="flex justify-center gap-8 mt-8">
        <input ref={inputRef} type="text" className="border-2 border-slate-500 p-2 focus:outline-none w-[250px] rounded-md" value={task} onChange={(e) => setTask(e.target.value)}/>
        <button className="bg-slate-400 p-2 hover:bg-slate-500 rounded-md"
          onClick={handleClick}
        >{editTask ? 'EDIT' : 'ADD TODO'}</button>
    </div>
  )
}

export default Input