const resize = ( state , action ) => {
	//console.log('reducer resize',state,action);
	switch(action.type){
		case 'RESIZE_ING':
			return Object.assign({},state,{
				clientWidth:action.clientWidth || 0,
				clientHeigth:action.clientHeigth || 0
			});
		default:
			return state || {}
	}
	
}

export default resize;