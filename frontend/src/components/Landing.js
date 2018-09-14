import React from 'react'
import { Link } from 'react-router-dom'
import slide from '../resources/slide-img.png'
import '../App.css'
import feature1 from '../resources/feature1.png'
import feature2 from '../resources/feature2.png'
import { Consumer } from '../context'

class Landing extends React.Component {

    componentDidMount() {
        this.props.context.setTheme('#111a2b')
        this.props.context.setTab(1)
    }

    render() {
        return (
            <React.Fragment>
                <div id="header-holder">
                    <div id="top-content" className="container-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="main-slider slick-initialized slick-slider slick-dotted"><div className="slick-list draggable">
                                        <div className="slide" style={{ width: '100%', display: 'inline-block' }}>
                                            <div className="row rtl-row">
                                                <div className="col-sm-5">
                                                    <div className="img-holder">
                                                        <Link to='/'><img src={slide} /></Link>
                                                    </div>
                                                </div>
                                                <div className="col-sm-7">
                                                    <div className="b-text">{getQuote()}</div>
                                                    <div className="m-text">volunteer to donate blood<span className="bold"></span></div>
                                                    <Link onClick={() => { this.props.context.setTab(4) }} to="/donors" className="hbtn hbtn-primary hbtn-lg" tabIndex={0}>Find Donor</Link>
                                                    <Link onClick={() => { this.props.context.setTab(3) }} to="/register" className="hbtn hbtn-blue hbtn-lg" tabIndex={0}>Register as Donor</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="features container-fluid">
                    <div className="container">
                        <div className="row rtl-row">
                            <div className="col-sm-5">
                                <div className="img-holder">
                                    <img src={feature2} />
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="feature-info">
                                    <div className="feature-title">Blood Needs</div>
                                    <div className="feature-text"><ul className="feature-list"><li>Every year our nation requires about 5 Crore units of blood, out of which only a meager 2.5 Crore units of blood are available.</li>
                                        <li>A single car accident victim can require as many as 100 units of blood</li>
                                        <li>Every two seconds someone needs blood.</li>
                                    </ul></div>
                                    <div className="feature-link"><a target="_blank" href="http://www.who.int/features/qa/61/en/" className="hbtn hbtn-default">Learn More</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="img-holder">
                                    <img src={feature1} />
                                </div>
                            </div>
                            <div className="col-sm-7 def-aligned">
                                <div className="feature-info">
                                    <div className="feature-title">Who can donate blood?</div>
                                    <div className="feature-text"><ul className='feature-list'>
                                    <li>Any healthy Person between age group of 18-60 years,weighing more than 40kg.</li>
                                    <li>A healthy donor may donate red blood cells every 56 days, or double red cells every 112 days.</li>
                                    <li>A healthy donor may donate platelets as few as 7 days apart, but a maximum of 24 times a year.</li>
                                    </ul></div>
                                    <div className="feature-link"><Link to="/faq" className="hbtn hbtn-default">More</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default props => (
    <Consumer>
        {value => <Landing {...props} context={value} />}
    </Consumer>
);

function getQuote() {
    const quotes = [
        'Share a little, care a little – Donate Blood.',
        'Blood is meant to circulate. Pass it around.',
        'Tears of a mother cannot save her Child. But your Blood can',
        'Blood Donation will cost you nothing but it will save a life!',
        'Donate your blood for a reason, let the reason to be life',
        'Anybody can save lives',
        'A single pint can save three lives, a single gesture can create a million smiles',
        'Donation of Blood means a few minutes to you but a lifetime for somebody else.',
        'Your blood is replaceable. A life is not',
        'Your Droplets Of Blood May Create Ocean Of Happiness.'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)];
}