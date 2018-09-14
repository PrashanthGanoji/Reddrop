import React, { Component } from 'react'
import { Consumer } from '../context'

class FAQ extends Component {

  componentDidMount() {
    this.props.context.setTheme('#000000')
    this.props.context.setTab(5)
  }
  render() {
    return (
      <div>
        <div id="header-holder" className="innerpage bluer">
          <div id="top-content" className="container-fluid">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-title">Help and Support</div>
                  <div className="page-subtitle">Find the answers to the most frequently asked questions about blood donation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="questions container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row-title">Common questions about Blood Donation</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="cards-holder">
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques1">Who can donate?</button>
                    </div>
                    <div id="ques1" className="collapse in">
                      <div className="card-body answer-holder">
                        Donors must weigh at least 40 kg and be at least 17 years old. During your donation appointment, you will complete a brief health questionnaire to make sure blood donation is safe for you and the recipient of your blood.
              </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques2" className="collapsed">How long does donation take?</button>
                    </div>
                    <div id="ques2" className="collapse">
                      <div className="card-body answer-holder">
                        Blood donation is a simple four-step process: registration, medical history and mini-physical, donation and refreshments.Every blood donor is given a mini-physical, checking the donor's temperature, blood pressure, pulse and hemoglobin to ensure it is safe for the donor to give blood. The actual blood donation typically takes less than 10-12 minutes. The entire process, from the time you arrive to the time you leave, takes about an hour and 15 min.
                    </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques3" className="collapsed">How often may I donate?</button>
                    </div>
                    <div id="ques3" className="collapse">
                      <div className="card-body answer-holder">
                        You can donate whole blood as often as every 84 days.
                        Plasma donors may donate as often as every 28 days.
                        Platelet donors may donate as frequently as every eight days, and up to 24 times in a 12-month period.
                        Double red cell donors may donate as often as every 168 days.
                        </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques4" className="collapsed">Can I donate if I have a cold, flu or fever?</button>
                    </div>
                    <div id="ques4" className="collapse">
                      <div className="card-body answer-holder">
                        You must be symptom-free from cold, flu or fever on the day of donation.
                      </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques5" className="collapsed"> Can I donate if I have recently had a vaccination?</button>
                    </div>
                    <div id="ques5" className="collapse">
                      <div className="card-body answer-holder">
                        Donation is acceptable following most vaccinations as long as you are feeling well. Donors vaccinated for chickenpox, measles, mumps, rubella and smallpox or who have received the oral polio vaccine must wait two to four weeks after vaccination.
                      </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques6" className="collapsed"> What should I do before I donate?</button>
                    </div>
                    <div id="ques6" className="collapse">
                      <div className="card-body answer-holder">
                        Before donating, you should eat a good meal and drink plenty of fluids.
                      </div>
                    </div>
                  </div>
                  <div className="card question-card">
                    <div className="card-header question-holder">
                      <button type="button" data-toggle="collapse" data-target="#ques7" className="collapsed">What if I have a question not answered here?</button>
                    </div>
                    <div id="ques7" className="collapse">
                      <div className="card-body answer-holder">
                        Contact a Doctor and ask any questions you have.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default props => (
  <Consumer>
    {value => <FAQ {...props} context={value} />}
  </Consumer>
);