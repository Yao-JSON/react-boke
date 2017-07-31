let Reszie = (state ={}, action) => {
	//console.log(state,action);
	switch(action.type){
		case 'RESIZE_ING':
			return Object.assign({},state,{
				clientWidth:action.clientWidth || 0,
				clientHeight:action.clientHeight || 0
			});
		default:
			return state
	}
}

export default Reszie;