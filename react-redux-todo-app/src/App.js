import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {addTodo,deleteTodo} from './actions/todoActions';

export default function App(){
 const [text,setText]=useState('');
 const todos=useSelector(s=>s.todos);
 const dispatch=useDispatch();

 return (
  <div style={{padding:20}}>
   <h2>Redux Todo App</h2>
   <input value={text} onChange={(e)=>setText(e.target.value)} />
   <button onClick={()=>{if(text){dispatch(addTodo(text));setText('');}}}>Add</button>
   <ul>
   {todos.map(t=><li key={t.id}>{t.text} <button onClick={()=>dispatch(deleteTodo(t.id))}>Delete</button></li>)}
   </ul>
  </div>
 );
}