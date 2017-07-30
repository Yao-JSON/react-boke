let MouseMove = (state,action) => {
	console.log('MouseMove ',state,action);
	switch (action.type){
		case 'MOUSE_MOVE':
			return Object.assign({},state,{
				MouseX:action.MouseX || 0,
				MouseY:action.MouseY || 0
			});
		default:
			return state || {};
	}
	
}

export default MouseMove;