import React, { Component } from 'react'
import { Consumer } from '../context'
import axios from 'axios'
import './Dashboard.css';
import isEmpty from '../utils/is_empty'


import Select from 'react-select'
import { cities, bloodgroups, states } from '../resources/cities';

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,

      phone: '',
      name: '',
      bloodgroup: '',
      age: '',
      state: '',
      city: '',
      active: '',

      errors: {}
    }
  }

  setCurrentUser = () => {
    axios.get('http://127.0.0.1:8000/api/details')
      .then(res => {
        const { name, bloodgroup, state, city, active, age } = res.data
        const phone = res.data.user.username
        const newstate = {
          phone: phone,
          name: name,
          bloodgroup: bloodgroup,
          age: age,
          state: state,
          city: city,
          active: active
        }
        this.setState({ ...this.state, ...newstate })
        console.log(newstate)
      })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  componentDidMount() {
    this.props.context.setTheme('#2f3f46')
    this.props.context.setTab(2)
    this.setCurrentUser();
  }

  submitEditedData = () => {
    console.log('ghii')
    let editedData = {
      user: {
        username: this.state.phone,
      },
      name: this.state.name,
      bloodgroup: this.state.bloodgroup,
      age: this.state.age,
      state: this.state.state,
      city: this.state.city,
      active: this.state.active,
      paid: false
    }
    console.log(editedData)
    axios.put('http://127.0.0.1:8000/api/details', editedData)
      .then(edu => {
        console.log(edu)
        this.setState({ isEditing: false })
      })
      .catch(err => {
        console.log(err.response.data)
        this.setState({ errors: err.response.data })
      })
  }

  toggleEditMode = () => {
    if(this.state.isEditing)
    {
      this.setCurrentUser()
    }
    this.setState({ isEditing: !this.state.isEditing })
  }

  render() {
    if (!this.props.context.isLogged)
      this.props.history.push('/')

    const { isEditing } = this.state
    const { name, bloodgroup, state, city, phone, active, age } = this.state

    return (
      <React.Fragment>
        <div id="header-holder" className="innerpage grey-bg">
          <div id="top-content" className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title">Welcome {name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container myform">
          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-default">
                <div className="panel-heading clearfix">
                  {isEditing ? <React.Fragment><button onClick={this.toggleEditMode} className='hbtn hbtn-blue'>Back</button><button onClick={this.submitEditedData} className='hbtn hbtn-green pull-right'>SAVE <i className="hstb hstb-tick"></i></button> </React.Fragment> : <button onClick={this.toggleEditMode} className='hbtn hbtn-blue pull-right'>Edit</button>}
                </div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>Name :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <input type="text"
                        value={this.state.name}
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                        className="form-control" required /> :
                        <p className="form-control-static">{name}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>Phone no :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <input type="text"
                        value={this.state.phone}
                        onChange={(e) => { this.setState({ phone: e.target.value }) }}
                        className="form-control" required /> :
                        <p className="form-control-static">{phone}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>Age :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <input type="text"
                        value={this.state.age}
                        onChange={(e) => { this.setState({ age: e.target.value }) }}
                        className="form-control" required /> :
                        <p className="form-control-static">{age}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>Blood Group :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <Select
                        defaultInputValue={this.state.bloodgroup}
                        onChange={(data) => { this.setState({ bloodgroup: data.value }) }}
                        options={bloodgroups} /> :
                        <p className="form-control-static">{bloodgroup}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>State :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <Select
                        defaultInputValue={this.state.state}
                        onChange={(data) => { this.setState({ state: data.value }) }}
                        options={states} /> :
                        <p className="form-control-static">{state}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>City :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <Select
                        defaultInputValue={this.state.city}
                        onChange={(data) => { this.setState({ city: data.value }) }}
                        isDisabled={this.state.state ? false : true}
                        options={cities[this.state.state] ?
                          [{ value: '', label: 'All' }].concat(cities[this.state.state]) : undefined} /> :
                        <p className="form-control-static">{city}</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-md-4">
                      <label>Status :</label>
                    </div>
                    <div className="col-xs-8 col-md-8">
                      {isEditing ? <div id="d-toggle"
                        value={this.state.active}
                        onClick={() => { this.setState({ active: !this.state.active }) }} className="d-toggle">
                        <div className={`fd ${this.state.active ? '' : 'active'}`}>In-Active</div>
                        <div className={`button ${!this.state.active ? 'on' : ''}`}></div>
                        <div className={`sd ${!this.state.active ? '' : 'active'}`}>Active</div>
                      </div> : <p className="form-control-static">{active ? 'Active' : 'In-Active'}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </React.Fragment >
    )
  }
}


export default props => (
  <Consumer>
    {value => <Dashboard {...props} context={value} />}
  </Consumer>
);
