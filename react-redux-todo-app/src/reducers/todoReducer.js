const initialState={todos:[]};

export default function todoReducer(state=initialState,action){
 switch(action.type){
  case 'ADD_TODO':
   return {...state,todos:[...state.todos,{id:Date.now(),text:action.payload}]};
  case 'DELETE_TODO':
   return {...state,todos:state.todos.filter(t=>t.id!==action.payload)};
  default:
   return state;
 }
}