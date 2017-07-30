import Grid from 'uxcore-grid';
import classNames from 'classnames';
import NavLight from './NavLeft.jsx';
import NavRight from './NavRight.jsx';

let { Row , Col } = Grid;

// clientWidth.  当前页面的宽度
let Nav = ({clientWidth}) => {
	clientWidth = clientWidth || 0;
	return (
		<Grid fluid={true}>
			<Row className = {classNames('nav',{"nav-border":clientWidth > 768?false:true})} >
				<NavLight />
				<NavRight clientWidth={clientWidth}/>
			</Row>
		</Grid>
	);
}

export default Nav;



