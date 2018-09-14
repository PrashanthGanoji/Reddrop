import React, { Component } from 'react'
import { Consumer } from '../context'
import Select from 'react-select'
import axios from 'axios'


import { cities, bloodgroups, states } from '../resources/cities';

class Register extends Component {

    state = {
        bloodgroup: '',
        name: '',
        age: '',
        phone: '',
        location: '',
        city: '',
        password: '',
        confirmpassword: '',

        errors: {}
    }


    componentDidMount() {
        this.props.context.setTheme('#3f2e63')
        this.props.context.setTab(3)
        window.scrollTo(0,0)
    }

    submitData = () => {
        console.log(this.state)

        let regData = {
            user: {
                username: this.state.phone,
                password: this.state.password,
                confirm_password: this.state.confirmpassword
            },
            name: this.state.name,
            bloodgroup: this.state.bloodgroup,
            age: this.state.age,
            state: this.state.location,
            city: this.state.city,
            active: true,
            paid: false
        }
        axios.post('http://127.0.0.1:8000/api/donors', regData)
            .then(edu => {
                console.log(edu)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                this.setState({ errors: err.response.data })
            })
    }


    render() {
        const {errors} = this.state;
        return (
            <React.Fragment>
                <div id="header-holder" className="innerpage light-bg">
                    <div id="top-content" className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="page-title">Volunteer to Donte blood</div>
                                    <div className="page-subtitle">register yourself and helps save lives :)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-us container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-holder myform2">
                                    <form>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className='searchLabel' style={{ color: 'white' }} htmlFor="inputName1">Name: </label>
                                                <input id="inputName1" type="text"
                                                    value={this.state.name}
                                                    onChange={(e) => { this.setState({ name: e.target.value }) }}
                                                    className="form-control" required />
                                                {errors.name && (<small className="error-text">{errors.name[0]}</small>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className='searchLabel' htmlFor="inputEmail1">Phone: </label>
                                                <input id="inputEmail1" type="number"
                                                    value={this.state.phone}
                                                    onChange={(e) => { this.setState({ phone: e.target.value }) }} className="form-control" required />
                                                {errors.username && (<small className="error-text">{errors.username[0]}</small>)}

                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className='searchLabel' htmlFor="inputAge">Age: </label>
                                                <input id="inputAge" type="number"
                                                    value={this.state.age}
                                                    onChange={(e) => { this.setState({ age: e.target.value }) }} className="form-control" required />
                                                {errors.age && (<small className="error-text">{errors.age[0]}</small>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className='searchLabel'>Blood Gruop:</label>
                                                <Select
                                                    onChange={(data) => { this.setState({ bloodgroup: data.value }) }}
                                                    options={bloodgroups} />
                                                {errors.bloodgroup && (<small className="error-text">{errors.bloodgroup[0]}</small>)}
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className="searchLabel">State: </label>
                                                <Select
                                                    onChange={(data) => { this.setState({ location: data.value }) }}
                                                    options={states} />
                                                {errors.state && (<small className="error-text">{errors.state[0]}</small>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <label className='searchLabel'>City:</label>
                                                <Select
                                                    onChange={(data) => { this.setState({ city: data.value }) }}
                                                    isDisabled={this.state.location ? false : true}
                                                    options={cities[this.state.location] ?
                                                        [{ value: '', label: 'All' }].concat(cities[this.state.location]) : undefined} />
                                                {errors.city && (<small className="error-text">{errors.city[0]}</small>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12 col-md-6">
                                                <label className='searchLabel'>Password: </label>
                                                <input type="password"
                                                    value={this.state.password}
                                                    onChange={(e) => { this.setState({ password: e.target.value }) }} className="form-control" required />
                                                {errors.password && (<small className="error-text">{errors.password[0]}</small>)}
                                            </div>
                                            <div className="col-xs-12 col-md-6">
                                                <label className='searchLabel' htmlFor="inputEmail1">Confirm Password: </label>
                                                <input type="password"
                                                    value={this.state.confirmpassword}
                                                    onChange={(e) => { this.setState({ confirmpassword: e.target.value }) }} className="form-control" required />
                                                {errors.confirm_password && (<small className="error-text">{errors.confirm_password[0]}</small>)}
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-xs-12">
                                                <div className="submit-holder">
                                                    <button type="submit"
                                                        onClick={(e) => { e.preventDefault(); this.submitData() }} className="hbtn hbtn-blue">Send</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="address-details">
                                    <div className="title">Office Locations</div>
                                    <h4>Oslo</h4>
                                    <p>Oslo, Norway<br />
                                        Road 398, Center, Office 38, floor 3<br />
                                        Contact number: 0901</p>
                                    <h4>Support</h4>
                                    <p>At vero eos et accusamus et iusto odio dignissimos  ducimus
                  qui blanditiis. praesentium voluptatum deleniti llitia animi.</p>
                                    <h4>Customer Service</h4>
                                    <p>At vero eos et accusamus et iusto odio dignissimos  ducimus
                                      qui blanditiis. praesentium voluptatum deleniti llitia animi,
                  inquiries@hustbee.io.co</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default props => (
    <Consumer>
        {value => <Register {...props} context={value} />}
    </Consumer>
);
