import React, { Component } from 'react'
import setJwtToken from './utils/set_jwt_token'
import * as jwt_decode from 'jwt-decode';

const Context = React.createContext();
let signedIn = false
if (localStorage.jwtToken) {
  setJwtToken(localStorage.jwtToken)
  signedIn = true
  console.log('inside auth', localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  const currentTime = Date.now() / 1000
  if (currentTime > decoded.exp) {
    console.log('inside expiry ')
    window.location.href = '/'
    signedIn = false
  }
}

export class Provider extends Component {

  state = {
    isLogged: signedIn,
    theme: '#111a2b',
    tab: 1,

    removeUser: () => {
      this.setState({ isLogged: false, user: {} })
    },

    setUser: () => {
      this.setState({ isLogged: true })
    },

    setTheme: (color) => {
      this.setState({ theme: color })
    },

    setTab: (tab) => {
      this.setState({ tab: tab })
    }
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;

