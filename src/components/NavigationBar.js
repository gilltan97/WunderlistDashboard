import React from 'react';
import { Navbar } from 'react-bootstrap';


const style = {
  navbar: {
    backgroundColor: '#f8f8f8',
    borderStyle: 'solid',
    borderWidth: '0 0 1px',
    borderColor: '#e7e7e7',
    marginBottom: '10px',
  },

  brand: {
    width: '900px',
    margin: '0 auto',
  },
};

export default function NaviationBar() {
  return (
    <Navbar style={style.navbar}>
      <Navbar.Brand style={style.brand}>
				Wunderlist
        <strong>Dashboard</strong>
      </Navbar.Brand>
    </Navbar>
  );
}
