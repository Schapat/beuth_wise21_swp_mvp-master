import React, { Component } from 'react';
import './Dashboard.css';
import MeetingCalendar from "./../Calendar/Calendar";
import Characters from "./../Characters/Characters";
import stories from "./stories.png";

class Dashboard extends Component {

	render() {
		return (

	<div>
     <h1>Dashboard</h1>

	<main id="wrapper">

	<div id="calendar" className="elements">
    <h3>My Appointments</h3>
		<MeetingCalendar />
  </div>

  <div id="plot" class="elements">
	<h3>My Plots</h3>
	<img src={stories} />
  </div>

  <div id="character" className="elements">
    <h3>My Charakters</h3>
			<Characters />
  </div>

  <div id="news" className="elements">
    <h3>News</h3>
    <p>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.r
	</p>
  </div>
</main>
</div>

			)

	}
}



export default Dashboard;
