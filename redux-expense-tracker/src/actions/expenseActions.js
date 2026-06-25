
const ADD_EXPENSE='ADD_EXPENSE';
const DELETE_EXPENSE='DELETE_EXPENSE';

const addExpense=(title,amount)=>({
 type:ADD_EXPENSE,
 payload:{id:Date.now(),title,amount}
});

const deleteExpense=(id)=>({
 type:DELETE_EXPENSE,
 payload:id
});

module.exports={ADD_EXPENSE,DELETE_EXPENSE,addExpense,deleteExpense};
