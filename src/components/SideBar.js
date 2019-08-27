import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function SideBar(props) {
	const listItems = props.lists.map((list, index) => {
		return <ListGroup.Item action href={`#${list.id}`} key={index} onClick={() => props.onListChange(list.id)}>{list.title}</ListGroup.Item>;
	});

	return <ListGroup>{listItems}</ListGroup>;
}