import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as jwt_decode from 'jwt-decode';

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Footer from './components/Footer'
import { Provider } from './context'
import FindDonor from './components/FindDonor'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import FAQ from './components/FAQ'

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/donors' component = {FindDonor} />
              <Route exact path='/register' component = {Register}/>
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/faq' component={FAQ} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
