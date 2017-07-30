let ScrollTop = (state , action) => {
	switch(action.type){
		case "SCROLL_TOP":
			return {
				type:"SCROLL_TOP",
				ScrollTop:action.ScrollTop || 0
			}
		default:
			return state || {};
	}
}

export default ScrollTop;