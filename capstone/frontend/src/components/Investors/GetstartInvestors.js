import React from 'react';
import {connect} from 'react-redux';
import { Button, Alert } from 'reactstrap';
import {addUserInThunk, addUserFinishedThunk} from '../../redux/investors/actions';
import '../GetstartEntrepneurs.css'

export class GetstartInvestors extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {
            user_id: localStorage.getItem('token'),
            visible2: true
        };
        this.onDismiss2 = this.onDismiss2.bind(this);
        this.addUsertoDB = this.addUsertoDB.bind(this)
    }

    scroll(ref) {
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    onDismiss2() {
        this.setState({ visible2: false });
      }

    addUsertoDB = (e) => {
        e.preventDefault();
        this.props.addUserIn({
            user: this.state.user_id
        });
        let props = this.props
        props.history.push('investors/pitch')
    }

    testRenderAlert = (props) => {
        return (
            this.props.addUserB ? (<Alert color="info" isOpen={this.state.visible2} toggle={this.onDismiss2}>Please follow introduction, finish your pitch and share with invesotrs!</Alert>) : null
        )
    }

    render(){
        return (
            <div>
                <section className="notebook-hero">
                    <div className="inner">
                        <h1 className="lineAfter">Get Started</h1>
                        <p>Follow the step by step introduction guide to finish your profile, the share your pitch with entrepreneurs</p>
                        <Button style={borderRadius}onClick={() => {this.scroll(this.myRef)}} className="btnGet btnGet-lg">Get Started</Button>
                    </div>
                </section>
                <div>
        <div className="how-section1">
          <div className="row" style={firstStep}>
            <div className="col-md-6">
                <span className='num'>1</span>
                <div className="stepContent">
                    <h4 className="subheading stepC">Register</h4>
                    <p className="text-muted textG">If you haven't joined us yet, click the sign up button at the top of this page and join us</p>
                </div>
              
            </div>
            <div className="col-md-6 how-img">
              <img src="../img/register.jpg" className=" img-fluid" alt />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <img src="../img/profileInput.jpg" className="img-fluid imgStep2" alt />
            </div>
            <div className="col-md-6">
                <span className='num'>2</span>
                <div className="stepContent">
                    <h4 className="subheading stepC">Create your Pitch</h4>
                    <p className="text-muted textG">Fill all of the form in make pitch page!</p>
                </div>
              
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
                <span className='num'>3</span>
                <div className="stepContent">
                    <h4 className="subheading stepC">Share you profile</h4>
                    <p className="text-muted textG">Once you finish creating your profile, entrepreneurs will now be able to view your page and contact you</p>
                </div>
            </div>
              
            <div className="col-md-6 how-img">
              <img src="../img/profile.jpg" className=" img-fluid" alt />
            </div>
          </div>
        </div>
        <div style={containerStyle} ref={this.myRef}>
            <Button color="info" style={btnStyle} onClick={this.addUsertoDB}>Make your Pitch!</Button>{' '}
        </div>
            </div>
            
      </div>
      
                
        )
    }
}



const containerStyle = {
    margin: 0,
    padding: 0,
    margin: 'auto',
    textAlign: 'center',
    paddingBottom: 35
}

const btnStyle = {
    width: '30%'
}

const firstStep = {
    paddingTop: 25
}

const borderRadius = {
    borderRadius: 30
}

const mapStateToProps = (state) => {
    return {
        enOrIn: state.auth.enOrIn,
        isAuthenticated: state.auth.isAuthenticated,
        addUserB: state.entrepneurs.addUserB,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addUserIn: (users) => {
            dispatch(addUserInThunk(users))
        },
        addUserInFinished: () => {
            dispatch(addUserFinishedThunk())
        }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(GetstartInvestors)