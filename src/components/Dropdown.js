import React from 'react';
import { Dropdown } from 'react-bootstrap';


export default function DDown(props) {
  const dropdownItems = props.lists.map((list, index) => <Dropdown.Item href={`#${list.id}`} key={index} onClick={() => props.onListChange(list)}>{list.title}</Dropdown.Item>);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm">
        {props.title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>{props.header}</Dropdown.Header>
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
}
