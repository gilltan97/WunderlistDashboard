import React from 'react';
import {Card} from 'react-bootstrap';


const style = {
  body: {
    maxHeight: '200px',
    overflow: 'auto',
  },

  activity: {
    marginBottom: '10px',
  },
};

export default function ActivityCard(props) {
  let activities;
  let selectedDate;
  const options = {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  };
  if (props.activityData.length) {
    selectedDate = new Date(props.activityData[0].completed_at).toLocaleDateString('en-US', options);
    activities = props.activityData.map((activity, index) => (
      <Card style={style.activity} key={index.toString()} body>
				You completed a task:
        {' '}
        <strong>{activity.title}</strong>
      </Card>
    ));

    return (
      <Card>
        <Card.Header>
        <i>{selectedDate}</i>
        </Card.Header>
        <Card.Body style={style.body}>
          {activities}
        </Card.Body>
      </Card>
    );
  }
  return <div />;
}
