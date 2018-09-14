import React, { Component } from 'react'
import DonorListItem from './DonorListItem'
import isEmpty from '../utils/is_empty'

class DonorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPrePage: 10
    }
  }

  render() {
    if (this.props.donorList === null)
      return <div className="container donors-container"></div>
    if (this.props.loading)
      return <div className="container donors-container">Loading</div>
    if (!this.props.loading && isEmpty(this.props.donorList))
      return <div className="container donors-container">No Donors Found</div>

    const { donorList } = this.props;
    const { currentPage, itemsPrePage } = this.state

    const lastIndex = currentPage * itemsPrePage;
    const firstIndex = lastIndex - itemsPrePage;
    const currentPageList = donorList.slice(firstIndex, lastIndex);

    const donorItem = currentPageList.map((donor => <DonorListItem key={donor.id} donor={donor} />))

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(donorList.length / itemsPrePage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((element) => {
      return (
        <li key={element}
          style={{ cursor: 'pointer' }}
          onClick={() => { this.setState({ currentPage: element }) }} className={"page-item" + ((element == currentPage) ? " active" : '')}><a className="page-link">{element}</a></li>
      )
    })

    return (
      <div className="row" style={{ margin: "0 0 200px 0" }}>
        <div className="col-sm-12">
          <div className="hstb-pricing-table-holder">
            <div className="hstb-table">
              <div className="row thead">
                <div className="col-xs-2 th">Blood Group</div>
                <div className="col-xs-2 th">Phone No.</div>
                <div className="col-xs-2 th">Name</div>
                <div className="col-xs-2 th">Age</div>
                <div className="col-xs-2 th">City</div>
                <div className='col-xs-2 th'>callnow</div>
              </div>
              {donorItem}
            </div>
          </div>
        </div>
        <nav className="paging" style={{ marginTop: '20px' }}>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => { this.setState({ currentPage: currentPage - 1 }) }}
              style={{ cursor: 'pointer' }}>
              <a className="page-link prev" aria-label="Previous">
                <i className="hstb hstb-down-arrow"></i>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {renderPageNumbers}
            <li className={`page-item ${currentPage === pageNumbers[pageNumbers.length - 1] ? 'disabled' : ''}`}
              onClick={() => { this.setState({ currentPage: currentPage + 1 }) }}>
              <a className="page-link next" aria-label="Next">
                <i className="hstb hstb-down-arrow"></i>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default DonorList
