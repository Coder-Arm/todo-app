import React, { useContext, useState } from 'react'
import { todoContext } from '../context/TodoContextWithProvider'

const Table = () => {
  const {state,dispatch,setEditTask} = useContext(todoContext);
  console.log(state)
  function handleEdit(item){
    dispatch({type : 'TOGGLE_EDIT',payload : item.id})
    setEditTask({id : item.id,task : item.task})
  }
  return (
    state.length > 0 && <table className='w-[100%] text-center mt-12'>
      <thead>
        <tr>
        <th>ID</th>
        <th>TASK</th>
        <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {
          state.map((item,idx) => {
            return <tr key={item.id}>
              <td>{item.id}</td>
              <td style={{textDecoration : item.isCompleted ?'line-through': ''}}>{item.task}</td>
              <td className='flex gap-4 justify-center'>
                <button  className='bg-orange-500 p-2 rounded-md'
                onClick={() => handleEdit(item)}
                >EDIT</button>
                <button className='bg-green-500 p-2 rounded-md'
                onClick={() => dispatch({type : 'TOGGLE_COMPLETED',payload : item.id})}
                >Completed</button>
                <button className='bg-red-500 p-2 rounded-md' onClick={() => {
                  dispatch({type : 'DELETE_TASK',payload : item.id})
                }}>DELETE</button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
  )
}

export default Table