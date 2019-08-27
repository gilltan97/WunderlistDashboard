import React from 'react';
import { Card, footer, blockquote, Alert } from 'react-bootstrap';


const style = {
	margin: "0 auto", 
	width: "1500px"
} 

export default function Logs() {
	return (
		<Card style={style}>
		  <Card.Header>Logs</Card.Header>
		  <Card.Body>
		  <Alert key="1" variant="info"> This is some text within a card body. </Alert>
		  <Alert key="1" variant="success"> This is some text within a card body. </Alert>
		  </Card.Body>
		</Card>
		);
}