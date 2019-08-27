import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CalenderChart from './CalenderChart.js'

export default function YearTabs(props) {

	function sortYears(calenderData) {
		let years = [];
		calenderData.map(entry => {
			let year = entry[0].getFullYear();
			if (!years.includes(year)) {
				years.push(year);
			}
		});
		return years;
	}

	function calenderDataByYears(calenderData) {
		let dataByYears = {};
		calenderData.map(entry => {
			let year = entry[0].getFullYear();

			if (!dataByYears[year]) {
				dataByYears[year] = [entry];
			} else {
				dataByYears[year].push(entry);
			}
		})
		return dataByYears;
	}

	let dataByYears = calenderDataByYears(props.calenderData);

	console.log(dataByYears);
	const tabs = sortYears(props.calenderData).map((year, index) => {
		return (<Tab key={index} eventKey={year.toString()} title={year.toString()}>
				<CalenderChart title={props.calenderTitle} data={dataByYears[year]}/>
			</Tab>);
	});

	return (
		<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
			{tabs}
		</Tabs>
		);
}