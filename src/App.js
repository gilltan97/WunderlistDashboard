import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { AreaChart, linearGradient, stop, defs, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import { Navbar, ListGroup, Container, Row, Col } from 'react-bootstrap';

import "./App.css";

function Index() {
    const data = [
    {
      "name": "Wednesday",
      "uv": 4000,
    },
    {
      "name": "Thursday",
      "uv": 3000
    }, 
    {
      "name": "Friday",
      "uv": 5000
    }
  ];

  return (
    <div>
      <Navbar bg="light">
          <Navbar.Brand href="#home">WunderList<strong>Dashboard</strong></Navbar.Brand>
      </Navbar>

      <Container className="root">
        <Row>
          <Col>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              This is Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              This is Link 2
            </ListGroup.Item>
          </ListGroup>
          </Col>


          <Col>
            <AreaChart width={650} height={350} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>

            <ListGroup variant="flush" >
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <ListGroup variant="flush" >
        <ListGroup.Item>© Tanveer Gill</ListGroup.Item>
      </ListGroup>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={Index} />
      </div>
    </Router>
  );
}

export default App;
