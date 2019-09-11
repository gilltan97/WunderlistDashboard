import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';


const style = {
  marginTop: '10px',
  marginBottom: '10px',
};

export default function YearTabs(props) {
  const { years } = props;

  if (!(years.length) && props.selectedYear) years.push(props.selectedYear);

  const tabs = years.map((year, index) => (<Tab key={index} eventKey={year.toString()} title={year.toString()} />));

  let selectedYear;
  if (props.selectedYear) {
    selectedYear = props.selectedYear.toString();
  }

  return (
    <Tabs onSelect={(year) => props.onYearChange(year)} style={style} activeKey={selectedYear} id="uncontrolled-tab-example">
      {tabs}
    </Tabs>
  );
}
