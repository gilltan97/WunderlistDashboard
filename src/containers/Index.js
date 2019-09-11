import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';

import {
  CalenderChart, NavigationBar, DDown, ActivityCard, Tabs,
} from '../components';

import { getLists, getTasks, getAccessToken} from '../api';
import { countTasksByDate, sortYears, filterTasksByDate } from '../utils';


const style = {
  wrapper: {
    width: "900px", 
    margin: "0 auto"
  }
};

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      selectedListId: null,
      selectedListTitle: null,
      calenderChartData: [],
      selectedYear: null,
      tabYears: [],
      selectedActivities: [],
      auth: {}
    };

    this.handleListChange = this.handleListChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
  }

  componentDidMount() {
    let urlParams = new URLSearchParams(window.location.search);
    if (this.props.auth.state === urlParams.get('state')) {
      let code = urlParams.get('code');

      getAccessToken({
        clientId: this.props.auth.clientId,
        clientSecret: this.props.auth.clientSecret, 
        code: code
 
      }).then((accessTokenJson) => {
        this.setState({
          auth: {
            clientSecret: this.props.auth.clientSecret,
            clientId: this.props.auth.clientId,
            accessToken: accessTokenJson.access_token
          }
        });
      }).then(() => {
        getLists(this.state.auth).then((lists) => {
          this.setState({
            lists
          });
        });
      }).catch((error) => {
        console.log(error);
      })
    } else {
      window.location.replace('/signin');
    }
  }

  handleListChange(selectedList) {
    getTasks(this.state.auth, selectedList.id).then((tasks) => {
      countTasksByDate(tasks).then((count) => {
        const calenderChartData = [];
        Object.keys(count).map((date) => {
          calenderChartData.push([new Date(date.replace(/-/g, '/')), count[date]]);
          return date;
        });

        const tabYears = sortYears(calenderChartData);
        if (tabYears.length) {
          this.setState({ selectedYear: Math.max(...tabYears) });
        } else {
          this.setState({ selectedYear: new Date().getFullYear() });
        }

        const selectedYearData = calenderChartData.filter((dataValue) => 
          dataValue[0].getFullYear() === this.state.selectedYear);

        this.setState({
          selectedListId: selectedList.id,
          selectedListTitle: selectedList.title,
          calenderChartData: selectedYearData,
          tabYears,
          selectedActivities: [],
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  handleYearChange(selectedYear) {
    if (selectedYear) {
      getTasks(this.state.auth, this.state.selectedListId).then((tasks) => {
        countTasksByDate(tasks).then((count) => {
          const calenderChartData = [];
          Object.keys(count).map((date) => {
            calenderChartData.push([new Date(date.replace(/-/g, '/')), count[date]]);
            return date;
          });

          const selectedYearData = calenderChartData.filter((dataValue) => 
            dataValue[0].getFullYear() === parseInt(selectedYear));

          this.setState({
            calenderChartData: selectedYearData,
            selectedYear: selectedYear,
            selectedActivities: [],
          });

          return count;
        });
      });
    }
  }

  handleCellSelection(date) {
    if (date.day && date.month && date.year) {
      getTasks(this.state.auth, this.state.selectedListId).then((tasks) => {
        this.setState({
          selectedActivities: filterTasksByDate(tasks, date),
        });
      });
    }
  }

  render() {
    let calenderChart = <div />;
    if (this.state.selectedListTitle && !this.selectedListId) {
      calenderChart = (<CalenderChart title={this.state.selectedListTitle} 
        data={this.state.calenderChartData} 
        onCellSelection={this.handleCellSelection} />);
    }

    if (this.state.auth.accessToken) {
      return (
        <div>
          <NavigationBar />
          <div style={style.wrapper}>
            <Container>
              <Row>
                <Col>
                  <DDown
                    title="Select a list"
                    header="Lists"
                    lists={this.state.lists}
                    onListChange={this.handleListChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Tabs
                    years={this.state.tabYears}
                    onYearChange={this.handleYearChange}
                    selectedYear={this.state.selectedYear}
                  />
                </Col>
              </Row>

              <Row>
                <Col>{calenderChart}</Col>
              </Row>

              <Row>
                <Col>
                  <ActivityCard activityData={this.state.selectedActivities} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}