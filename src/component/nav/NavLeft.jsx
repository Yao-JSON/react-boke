import { Link } from 'react-router';
import Grid from 'uxcore-grid';
let { Col } = Grid;

let NavLeft = (props) => {
	return (
		<Col mdOffset={2} md={4} sm={16} xs={16}>
			{...props}
			YJSON
		</Col>
	);
}

export default NavLeft;




