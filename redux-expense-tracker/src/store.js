
const {createStore}=require('redux');
const expenseReducer=require('./reducers/expenseReducer');

module.exports=createStore(expenseReducer);
