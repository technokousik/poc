
const store=require('./store');
const {addExpense,deleteExpense}=require('./actions/expenseActions');

store.subscribe(()=>{
 console.log('\nState Updated:');
 console.log(JSON.stringify(store.getState(),null,2));
});

store.dispatch(addExpense('Lunch',150));
store.dispatch(addExpense('Bus Ticket',30));
store.dispatch(addExpense('Coffee',80));

const id=store.getState().expenses[1].id;
store.dispatch(deleteExpense(id));
