export const MouseOut = ({MouseX,MouseY}) => {
	return {
		type:"MOUSE_OUT",
		MouseY,
		MouseX
	}
}

export const MouseMove = ({MouseX,MouseY}) => {
	return {
		type:"MOUSE_MOVE",
		MouseY,
		MouseX
	}
}
 export const resize = ({clientWidth,clientHeigth}) => {
 	return {
 		type: "RESIZE_ING",
 		clientWidth,
 		clientHeigth
 	}
 }

export const scrollTop = ({Top}) => {
	return {
		type:'SCROLL_TOP',
		scrollTop:Top
	}
}






