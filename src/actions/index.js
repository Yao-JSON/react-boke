export const MouseMove =({MouseX,MouseY}) => {
	return {
		type:'MOUSE_MOVE',
		MouseY,
		MouseX
	}
}

export const Resize = (props) => {
	return{
		type:'RESIZE_ING',
		...props
	}
}

export const ScrollTop = (Top) => {
	return {
		type: 'SCROLL_TOP',
		ScrollTop:Top
	}
}







