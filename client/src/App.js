import NavBar from './components/Navbar/Navbar';
import LogIn from './components/Log In/LogIn';
import SignUp from './components/Sign Up/SignUp';
import Homepage from './components/HomePage/Homepage';
import Activities from './components/Activities/Activities';
import Activity from './components/Activities/Activity'
import SignedUpActivity from './components/Activities/SignedUpActivity';
import DropOutActivity from './components/Activities/DropOutActivity';
import Services from './components/Services/Services';
import Service from './components/Services/Service';
import MembershipFees from './components/Fees/Membership_Fees';
import MembershipFee from './components/Fees/Membership_Fee';
import MemberInfo from './components/Log In/MemberInfo';
import ModifyActivity from './components/Activities/ModifyActivity';
import Footer from './components/Footer/Footer';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [user, setUser] = useState();

  const getUser = async () => {
    const token = localStorage.getItem('token')
    const response = await axios(`http://localhost:5000/members/yourInfo`, {
      headers: {
        "Authorization": token
      }
    })
    setUser(response.data.member)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser()
    }

  }, []);

  return (
    <>
      <div className="App">
        <Router>
          <NavBar user={user} />

          <Switch>
            <Route path="/" exact={true}> <Homepage /> </Route>

            <Route path="/LogIn"> <LogIn getUser={getUser} /> </Route>

            <Route path="/SignUp"> <SignUp getUser={getUser} /> </Route>

            <Route path="/activities" exact={true}> <Activities /> </Route>

            <Route path="/activities/find/:activityId"> <Activity user={user} getUser={getUser} /> </Route>

            <Route path="/activity/:activityId/signedUpActivity"> <SignedUpActivity user={user} getUser={getUser} /> </Route>

            <Route path="/activity/:activityId/dropOutActivity"> <DropOutActivity /> </Route>

            <Route path="/activity/modify/:activityId"> <ModifyActivity /> </Route>

            <Route path="/services" exact={true}> <Services /> </Route>

            <Route path="/services/find/:serviceId"> <Service user={user} getUser={getUser} /> </Route>

            <Route path="/membershipFees" exact={true}> <MembershipFees /> </Route>

            <Route path="/membershipFees/find/:membFeeId"> <MembershipFee user={user} getUser={getUser} /> </Route>

            <Route path="/member/yourInfo"> <MemberInfo user={user} getUser={getUser} /></Route>

            <Route path="*" component={() => "404 NOT FOUND"}></Route>
          </Switch>

          <Footer />

        </Router >
      </div >
    </>
  );
}

export default App;
