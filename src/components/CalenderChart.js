import React from 'react';
import { Chart } from 'react-google-charts';
import { Spinner } from 'react-bootstrap';


const style = {
  width: '10px',
  paddingTop: '100px',
  margin: '0 auto',
};

export default function CalendarChart(props) {
  const data = [[{
    type: 'date', id: 'Date',
  }, {
    type: 'number', id: 'Won/Loss',
  }]].concat(props.data);

  return (
    <Chart
      onClick={() => { console.log('here'); }}
      width={925}
      height={200}
      chartType="Calendar"
      loader={<div style={style}><Spinner animation="grow" variant="primary" /></div>}
      data={data}
      chartEvents={[{
        eventName: 'select',
        callback: ({ chartWrapper, google }) => {
          const chart = chartWrapper.getChart();

          const date = new Date(chart.getSelection()[0].date);

          props.onCellSelection({
            day: date.getUTCDate(),
            month: date.getUTCMonth() + 1,
            year: date.getUTCFullYear(),
          });
        },
      }]}
      rootProps={{ 'data-testid': '1' }}
      options={{
        title: props.title,
      }}
    />
  );
}
