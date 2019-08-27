import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container, Row, Col, Dropdown} from 'react-bootstrap';

import {CalenderChart, NavigationBar, DDown, Logs, Tabs} from './components';

import {getLists, getTasks} from './api.js';
import {countTasksByDate} from './utils.js';

import "./App.css";


class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [], 
      selectedListId: null, 
      selectedListTitle: null,
      calenderChartData: []

    };

    this.handleListChange = this.handleListChange.bind(this);
  }

  componentDidMount() {
    getLists().then(lists => {
      this.setState({
        lists: lists
      });

    }).catch((error) => {
      // TODO: Handle this error properly 
      console.log(error);
    });
  }

  handleListChange(selectedList) {
    // TODO: Handle the 'isCompleted' value depending on the user input 
    getTasks(selectedList.id).then(tasks => {
      countTasksByDate(tasks).then(count => {

        let calenderChartData = [];
        Object.keys(count).map(date => {
          calenderChartData.push([new Date(date), count[date]]);
        });
        
        return calenderChartData;
      }).then(calenderChartData => {
        this.setState({
          selectedListId: selectedList.id,
          selectedListTitle: selectedList.title, 
          calenderChartData: calenderChartData
        });
      });

    }).catch(error => {
      // TODO: Handle this error properly 
      console.log(error);
    })
  }


  render() {
    return ( 
      <div>
        <NavigationBar/>
        <div className="wrapper">
          <Container>
              <Row>
                <Col>
                <div className="ddown">
                 <DDown title="Select a list" 
                   header= "Lists" 
                   lists={this.state.lists} 
                   onListChange={this.handleListChange}/>
                </div>
                </Col>
              </Row>
              <Dropdown.Divider />
              <Row><CalenderChart title={this.state.selectedListTitle} 
                data={this.state.calenderChartData}/></Row>
              <Row>
                <Tabs calenderTitle={this.state.selectedListTitle}
                  calenderData={this.state.calenderChartData}/>
              </Row>
          </Container>
        </div>
      </div>
    );
  }
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
