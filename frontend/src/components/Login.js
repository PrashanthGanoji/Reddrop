import React, { Component } from 'react'
import { withRouter } from 'react-router'
import setJwtToken from '../utils/set_jwt_token'
import axios from 'axios'
import * as jwt_decode from 'jwt-decode';

import { setCurrentUser } from '../actions/authactions'

class Login extends Component {

  state = {
    phone: '',
    password: '',

    errors: {}
  }

  /*
  loginUser = data => {
    return function (dispatch) {
        axios.post('/api/login', data)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setJwtToken(token);
            const decoded = jwt_decode(token);
            console.log(decoded)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
    }
}
  */
  toggleNavbarCollapse = () => {
    let ham = document.getElementById('hamburger')
    if (!ham['className'].includes('collapsed'))
      ham.click();
  }

  submitData = () => {
    let logData = {
      username: this.state.phone,
      password: this.state.password
    }
    const props = this.props
    axios.post('http://127.0.0.1:8000/api/login', logData)
      .then(
        (res) => {
          const { token } = res.data
          localStorage.setItem('jwtToken', token);
          setJwtToken(token);
          document.getElementById('modalClose').click()
          this.props.context.setUser()
          props.history.push('/dashboard')
          this.toggleNavbarCollapse()
        })
      .catch((err) => {
        console.log(err.response)
        this.setState({ errors: err.response.data })
      })
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <li className="nav-item">
          <a className="nav-link btn-client-area" data-toggle="modal" data-target="#exampleModal" onClick={(e) => { e.preventDefault() }}><i className="hstb hstb-lock" />Login</a>
          <div className="chat-info"><i className="hstb hstb-right-arrow" />Already Registered?</div>
        </li>
        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ display: 'inline', fontSize: '1.5em' }} id="exampleModalLabel">Login</h5>
                <button type="button" id='modalClose' className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label htmlFor="phone" className="col-sm-4 col-form-label">Phone no:</label>
                    <div className="col-sm-8">
                      <input type="text"
                        onChange={(e) => { this.setState({ phone: e.target.value }) }}
                        value={this.state.phone}
                        className="form-control" id="phone" />
                      {errors.username ? <small className="error-text" style={{ float: 'left' }}>{errors.username}</small> : ''}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pwd" className="col-sm-4 col-form-label">Password:</label>
                    <div className="col-sm-8">
                      <input type="password"
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                        value={this.state.password}
                        className="form-control" id="pwd" />
                      {errors.password ? <small className="error-text" style={{ float: 'left' }}>{errors.password}</small> : ''}
                      {errors.non_field_errors ? <small className="error-text" style={{ float: 'left' }}>{errors.non_field_errors}</small> : ''}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={this.submitData} type="button" className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default withRouter(Login)