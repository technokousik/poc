
const {ADD_EXPENSE,DELETE_EXPENSE}=require('../actions/expenseActions');

const initialState={
 expenses:[],
 total:0
};

function expenseReducer(state=initialState,action){
 switch(action.type){
  case ADD_EXPENSE:
   return {
    expenses:[...state.expenses,action.payload],
    total:state.total + action.payload.amount
   };

  case DELETE_EXPENSE:
   const item=state.expenses.find(e=>e.id===action.payload);
   return {
    expenses:state.expenses.filter(e=>e.id!==action.payload),
    total:item ? state.total-item.amount : state.total
   };

  default:
   return state;
 }
}

module.exports=expenseReducer;
