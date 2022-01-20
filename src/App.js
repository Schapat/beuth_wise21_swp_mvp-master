import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Storyplotter from './components/Storyplot/Storyplotter';
import MeetingCalendar from "./components/Calendar/Calendar";
import About from "./components/About/About";
import Characters from "./components/Characters/Characters";
import Dashboard from "./components/Dashboard/Dashboard";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import './App.css';

const theme = {};

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />


      <Switch>
            <Route path="/storyplot">
              <Storyplotter />
            </Route>
            <Route path="/calendar">
              <MeetingCalendar />
            </Route>
            <Route path="/characters">
              <Characters />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
