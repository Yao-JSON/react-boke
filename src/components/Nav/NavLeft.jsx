import React from 'react';
import Grid  from 'uxcore-grid';
import { Link } from 'react-router';
let { Col } = Grid;

let NavLeft = (props) => {
	return (
		<Col className='nav-left' mdOffset={2} md={4} sm={16} xs={16}>
			<Link to="/" className="logo-name">
				YJSON
			</Link>
		</Col>
	);
}
export default NavLeft;

