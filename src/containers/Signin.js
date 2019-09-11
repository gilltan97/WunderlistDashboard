import React from 'react';
import {
	Alert, Button
} from 'react-bootstrap';


const style = {
	width: "400px",
	margin: "0 auto", 
	top: "200px", 
	textAlign: "center"
}


export default class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.handleSigninClick = this.handleSigninClick.bind(this);
	}

	handleSigninClick() {
		window.location.replace(encodeURI(this.props.authURI));
	}

	render() {
		return(<div>
			<Alert style={style} variant="primary">
				<Alert.Heading>Wunderlist<strong>Dashboard</strong></Alert.Heading>
				<hr />
				<Button onClick={this.handleSigninClick} variant="primary" size="sm">Sign in with Wunderlist</Button>
			</Alert>
		</div>);
	}
}