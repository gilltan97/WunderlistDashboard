import React from 'react';
import {
	Alert
} from 'react-bootstrap';


const style = {
	width: "400px",
	margin: "0 auto", 
	top: "200px", 
	textAlign: "center", 
	lineBreak: "auto"
}


export default function NoMatch() {
	return(<div>
		<Alert style={style} variant="primary">
			<Alert.Heading><strong>404</strong>. <i>This is an error.</i></Alert.Heading>
			<hr />
			<p>The requested URL was not found on this server.</p>
		</Alert>
	</div>);
}