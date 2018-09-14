import React, { Component } from 'react'
import { Consumer } from '../context'
import Select from 'react-select'
import axios from 'axios'
import {ROOT_URL} from '../resources/links'

import { cities, bloodgroups, states } from '../resources/cities'
import isEmpty from '../utils/is_empty'
import DonorList from './DonorList'

class FindDonor extends Component {

  state = {
    bloodgroup: null,
    location: null,
    city: null,
    donorList: null,
    loading: false,
    errors: {},
  }

  getDonorList = () => {
    this.setState({ loading: true })

    let { bloodgroup, location, city } = this.state

    let queryList = []
    if (!isEmpty(bloodgroup)) {
      queryList.push(`bloodgroup=${bloodgroup.replace('+', '%2B')}`)
    }
    if (!isEmpty(location))
      queryList.push(`state=${location}`)
    if (!isEmpty(city))
      queryList.push(`city=${city}`)

    console.log(queryList)
    const queryString = queryList.join('&')

    let url = ROOT_URL+`/api/donors`
    url = url + '?' + queryString;
    console.log(url)

    axios.get(url)
      .then(donors => {
        this.setState({})
        console.log(donors.data)
        this.setState({ loading: false, donorList: donors.data })
      })
      .catch(err => {
        this.setState({ loading: false, donorList: {} })
      })
  }

  componentDidMount() {
    this.props.context.setTheme('#152c53')
    this.props.context.setTab(4)
    window.scrollTo(0,0)
  }

  render() {
    const { bloodgroup, location, city } = this.state;
    return (
      <React.Fragment>
        <div id="header-holder" className="innerpage lighter">
          <div id="top-content" className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title">Find Blood Donors</div>
                  <div className="page-subtitle">Search blood donors based on required blood type and location</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container myform">
          <div className="row">
            <div className="col-sm-12">
              <form>
                <div className='formElement'>
                  <label className="searchLabel" style={{ color: 'white', textAlign: 'left' }}>Blood Group: </label>
                  <Select
                    id='bg'
                    onChange={(data) => { this.setState({ bloodgroup: data.value }) }}
                    options={bloodgroups} />
                </div>
                <div className="formElement">
                  <label className="searchLabel" style={{ color: '#152c53' }}>State: </label>
                  <Select
                    onChange={(data) => { this.setState({ location: data.value }) }}
                    options={states} />
                </div>
                <div className="formElement">
                  <label className="searchLabel" style={{ color: '#152c53' }}>City: </label>
                  <Select
                    onChange={(data) => { this.setState({ city: data.value }) }}
                    isDisabled={location ? false : true}
                    options={cities[location] ?
                      [{ value: '', label: 'All' }].concat(cities[location]) : undefined} />
                </div>
                <button className='hbtn hbtn-blue hbtn-lg'
                  style={{ margin: '12px auto', display: 'block' }}
                  disabled={!bloodgroup}
                  onClick={(e) => { e.preventDefault(); this.getDonorList() }}> Search</button>
              </form>
            </div>
          </div>
        </div>
        <DonorList donorList={this.state.donorList} loading={this.state.loading} />
      </React.Fragment>
    )
  }
}

export default props => (
  <Consumer>
    {value => <FindDonor {...props} context={value} />}
  </Consumer>
);
