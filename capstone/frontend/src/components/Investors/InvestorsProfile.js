import React from 'react';
import {connect} from 'react-redux';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import {addUserThunk, addUserFinishedThunk} from '../../redux/entrepneurs/actions';
import '../EntrepneursPitch.css'

export class InvestorsProfile extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
        this.state = {
            user_id: localStorage.getItem('token'),
            visible2: true,
            expertise: '',
            about:'',
            bgImg:'',
            logo:'',
            name:'',
            minimumAmount: 0,
            maximumAmount: 0,
            facebook_url: '',
            linkedin_url: ''
        };
    }

    componentDidMount = async() => {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/investors/${this.props.match.params.id}`)
          .then((res => {            
            this.setState({
                about: res.data[0].about,
                bgImg: res.data[0].background_photo,
                logo: res.data[0].logo,
                name: res.data[0].name,
                expertise: res.data[0].expertise,
                maximumAmount: res.data[0].maximum_amount,
                minimumAmount: res.data[0].minimum_amount,
                facebook_url: res.data[0].facebook_url,
                linkedin_url: res.data[0].linkedin_url,

            });
          }));
      }

    scroll(ref) {
        ref.current.scrollIntoView({behavior: 'smooth'})
    }

    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }



    testRenderAlert = (props) => {
        return (
            this.props.addUserB ? (<Alert color="info" isOpen={this.state.visible2} toggle={this.onDismiss2}>Please follow introduction, finish your pitch and share with invesotrs!</Alert>) : null
        )
    }

    render(){
        return (
            <div>
        <section className="header-1 pb-0">
          <div className="container">
            <h1 className="mb-4">{this.state.title}</h1>
            <div className="img-container">
              <img width="100%" className="rounded" alt="" src={this.state.bgImg} />
            </div>
            <div className="company-info d-flex justify-content-between">
              <div className="company-media d-flex justify-content-start">
                <img className="company-image rounded" src={this.state.logo} />
                <div className="company-name ml-3">{this.state.name}</div>
              </div>
            <div className="socialMenu">
              <ul class="list-inline">
                <li class="list-inline-item">
                  <a class="social-link rounded-circle text-white mr-3" href={this.state.facebook_url}>
                        <i class="fab fa-facebook facebookColor"></i>                  
                    </a>
                </li>
                <li class="list-inline-item">
                  <a class="social-link rounded-circle text-white mr-3" href={this.state.linkedin_url}>
                        <i class="fab fa-linkedin"></i>                  
                    </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </section>


            <section className="project-nav pt-0">
              <div className="tab-nav-bar">
              <div className="container">
          <div className="row">
            <div className="col-xs-12 wid-100">
              <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                  <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Features</a>
                  <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Messege</a>
                </div>
              </nav>
              <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
              <div className="container pt-45 pb-80">
          <div id="show" className="row">
          <div class="col-md-3">
                <div class="toc">
                    <div class="list-group" data-turbolinks="false">
                            <div class="list-group-item list-group-item-heading" style={textStyle}>Contents</div>
                            <a href="#toc-0" class="list-group-item list-group-item-action toc-li-0 toc-mokuji">About me</a>
                            <a href="#toc-1" class="list-group-item list-group-item-action toc-li-1 toc-mokuji">Profile</a>
                            <a href="#toc-2" class="list-group-item list-group-item-action toc-li-2 toc-mokuji">Expertise</a>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div className="tab-pane description show active" id="description">                  
                    <section className="content_wrapper top_pad_half">
                    <div id="i15">
                      <h3 className="mokuji" id="toc-0">
                        About me
                      </h3>
                    </div>
                    <p className="text">{this.state.about}</p>
                  </section>

                  <section className="content_wrapper">
                    <div id="i2">
                      <h3 className="mokuji" id="toc-1">
                        Profile
                      </h3>
                    </div>
                    <div class="investment-summary js-profile">
                            <table class="table">
                                <tbody><tr>
                                    <td className="brd0"><span class="editableLabel" labelid="global:minimum_investment">Minimum Investment</span></td>
                                    <td className="brd0">
                                        <div id="js-min-investment">
                                            <strong>{this.numberWithCommas(this.state.minimumAmount)} </strong>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Maximum </td>
                                    <td>
                                        <div id="js-max-investment">
                                            <strong>{this.numberWithCommas(this.state.maximumAmount)}</strong>
                                        </div>
                                    </td>
                                </tr>
                            </tbody></table>
                        </div>
                  </section>
                  <section className="content_wrapper">
                    <h3 className="mokuji" id="toc-2">
                      Expertise
                    </h3>
                    <p className="text">{this.state.expertise}</p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
              </div>
            </div>
          </div>
      </div>
              </div>
            </section>


      </div>
      
                
        )
    }
}


const textStyle = {
    fontFamily: 'inherit',
    fontWeight: 500,
    color: 'inherit'
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
        addUser: (users) => {
            dispatch(addUserThunk(users))
        },
        addUserFinished: () => {
            dispatch(addUserFinishedThunk())
        }
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(InvestorsProfile)