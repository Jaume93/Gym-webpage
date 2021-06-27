import logo from './logo.svg';
import NavBar from './components/Navbar';
import Homepage from './components/Homepage';
import Activities from './components/Activities';
import Activity from './components/Activity'
import Services from './components/Services';
import Service from './components/Service';
import MembershipFees from './components/Membership_Fees';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />

          <Switch>
            <Route path="/" exact={true}> <Homepage /> </Route>

            <Route path="/activities"> <Activities /> </Route>

            <Route path="/activities/find/:activityId"> <Activity /> </Route>

            <Route path="/services"> <Services /> </Route>

            <Route path="/services/find/:serviceId"> <Service /> </Route>

            <Route path="/membershipFees"> <MembershipFees /> </Route>
          </Switch>
        </div >
      </Router >
    </>
  );
}

export default App;
