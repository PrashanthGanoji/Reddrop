import React, { Component } from 'react';
import logo from '../resources/logo.png'
import { Consumer } from '../context'
import { Link } from 'react-router-dom';

import Login from './Login';

class Navbar extends Component {

  logoutUser = (context) => {
    context.removeUser()
    localStorage.removeItem('jwtToken')
  }

  loginUser = (context) => {
    context.setUser()
  }

  toggleNavbarCollapse = () => {
    let ham = document.getElementById('hamburger')
    if (!ham['className'].includes('collapsed'))
      ham.click();
  }

  render() {
    return (
      <Consumer>
        {context => (
          <nav id="nav" style={{ 'backgroundColor': `${context.theme}` }} className="navbar navbar-full">
            <div className="container-fluid">
              <div className="container container-nav">
                <div className="row">
                  <div className="col-md-12">
                    <div className="navbar-header">
                      <button id='hamburger' aria-expanded="false" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs">
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                      </button>
                      <Link onClick={this.toggleNavbarCollapse} className="navbar-brand" to="/"><img src={logo} /><span className="brand-name">Red drop</span></Link>
                    </div>
                    <div style={{ height: '0.989583px' }} role="main" aria-expanded="false" className="navbar-collapse navbar-collapse-centered collapse" id="bs">
                      <ul className="nav navbar-nav navbar-nav-centered">
                        <li className={`nav-item ${context.tab == 1 ? 'active' : ''}`}><Link onClick={() => { this.toggleNavbarCollapse() }} className="nav-link" to='/'>Home</Link></li>
                        {context.isLogged ?
                          <li className={`nav-item ${context.tab == 2 ? 'active' : ''}`}><Link className="nav-link" onClick={() => { this.toggleNavbarCollapse() }} to='/dashboard'>Dashboard</Link></li>
                          : <li className={`nav-item ${context.tab == 3 ? 'active' : ''}`}><Link className="nav-link" to="/register" onClick={() => { this.toggleNavbarCollapse() }}  >Register</Link></li>
                        }
                        <li className={`nav-item ${context.tab == 4 ? 'active' : ''}`}>
                          <Link onClick={() => { this.toggleNavbarCollapse() }} to='/donors' >Find Donors</Link>
                        </li>
                        <li className={`nav-item ${context.tab == 5 ? 'active' : ''}`}>
                          <Link onClick={() => { this.toggleNavbarCollapse() }} className="nav-link" to="/faq">FAQ</Link>
                        </li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right other-navbar">
                        {context.isLogged ?
                          <li className="nav-item">
                            <a className="nav-link btn-client-area" onClick={(e) => { e.preventDefault(); this.logoutUser(context); this.toggleNavbarCollapse() }}><i className="hstb hstb-sign-out" />Logout</a>
                            <div className="chat-info"><i className="hstb hstb-right-arrow" />Save &amp; Exit?</div>
                          </li> : <Login context={context} />
                        }
                        <li className="nav-item">
                          <a className="nav-link btn-chat" href="#"><i className="hstb hstb-user" /></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </Consumer>
    )
  }
}

export default Navbar

