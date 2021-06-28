import logo from './logo.svg';
import NavBar from './components/Navbar/Navbar';
import LogIn from './components/Log In/LogIn';
import SignUp from './components/Sign Up/SignUp';
import Homepage from './components/HomePage/Homepage';
import Activities from './components/Activities/Activities';
import Activity from './components/Activities/Activity'
import Services from './components/Services/Services';
import Service from './components/Services/Service';
import MembershipFees from './components/Fees/Membership_Fees';
import MembershipFee from './components/Fees/Membership_Fee';
import Footer from './components/Footer/Footer';
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

            <Route path="/LogIn"> <LogIn /> </Route>

            <Route path="/SignUp"> <SignUp /> </Route>

            <Route path="/activities" exact={true}> <Activities /> </Route>

            <Route path="/activities/find/:activityId"> <Activity /> </Route>

            <Route path="/services" exact={true}> <Services /> </Route>

            <Route path="/services/find/:serviceId"> <Service /> </Route>

            <Route path="/membershipFees" exact={true}> <MembershipFees /> </Route>

            <Route path="/membershipFees/moreInfo/:membFeeId"> <MembershipFee /> </Route>
          </Switch>
          <Footer />
        </div >
      </Router >
    </>
  );
}

export default App;
