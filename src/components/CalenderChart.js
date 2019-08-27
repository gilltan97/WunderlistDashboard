import React from 'react';
import { Chart } from "react-google-charts";
import { Spinner } from 'react-bootstrap';


const style = {
    width: "10px", 
    paddingTop: "100px",
    margin: "0 auto"
}

export default function CalendarChart(props) {
	const data = [
    [{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }]
  ].concat(props.data);

  return (
  	<Chart width={925}
	  height={200}
      title="sdfds"
	  chartType="Calendar"
	  loader={<div style={style} ><Spinner animation="grow" variant="primary" /></div>}
	  data={data}
	  rootProps={{ 'data-testid': '1' }}
      options={{
        title: props.title
    }}/>
    );

}

