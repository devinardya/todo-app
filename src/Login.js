import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {token$, updateToken} from './store';
import { TiUser } from "react-icons/ti"
import { css } from "glamor";
import Form from './Form';
import Header from './Header';
import Footer from './Footer';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          error401: false,
          error400: false,
          token: token$.value,
          value: "",
          errorMsg: "",
        };
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
      }
    
      componentDidMount() {
        this.subscription = token$.subscribe(token => {
          this.setState({token});
        }); 
      }
    
      componentWillUnmount() {
        this.subscription.unsubscribe();
      }

      onChange(value, name){
        this.setState({
          [name]:value,
          value: value,
        })
      }

      // submitting user data to server and in return getting a new login token to be save in localStorage
    
      onSubmit() {
        //e.preventDefault();
        let authData = {
          email: this.state.email,
          password: this.state.password,
        };
    
        axios.post('http://3.120.96.16:3002/auth', authData)
          .then(response => {
            updateToken(response.data.token);
          })
          .catch(err => {
            //this.setState({error: true});
            console.log(err.response.data);
            if (err.response.data.message === "Validation error"){
              this.setState({error400: true, 
                             error401: false, 
                             errorMsg: err.response.data.details[0].message})
             
            } else if (err.response.data.message === "Email or password incorrect"){
              console.log("error 401")
              this.setState({error401: true, 
                             error400: false,
                             errorMsg: err.response.data.message})
              
            }
          });
      }

    
      render() {

        if (this.state.token) {
            return <Redirect to="/todo" />;
        } 
     
        let icon = css({
          width: "60px",
          height: "60px",
          backgroundColor: "orange",
          borderRadius: "50% 0% 50% 50%",
          padding: "20px",
          marginBottom: "0px",
      })

        let textH3 = css ({
          color: "#196ab1",
          fontSize: "35px",
          marginBottom: "30px",
          width: "320px",
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: "20px",
          fontWeight: "bold",
          marginTop: "25px",
        })

        let pText = css ({
          fontSize: "13px",
          color: "#737373",
        })

        let pTextSpan = css ({
          color: "orangered",
          fontWeight: "bold",
          ":hover": {
            color: "#FF8B00",
          }
        })

        let errMsg = css ({
          color: "red",
          margin: 0,
          fontSize: "12px",
          height: "12px",
          fontWeight: "700",
        })

        let errorMsg = <p className = {errMsg}> </p>;
        if (this.state.error400) {
          errorMsg = <p className = {errMsg}>{this.state.errorMsg}</p>;
        } else if (this.state.error401){
          errorMsg = <p className = {errMsg}>{this.state.errorMsg}</p>
        }


        return (<div className ="login-box">
                    <Helmet>
                          <title>doTodo - Log in</title>
                    </Helmet>
                    <Header testItem = "login"/>
                    <div className="login-container">
                        <div className="box-right">
                            <TiUser color="white" className={icon}/>
                            <h3 className={textH3}>Log in</h3> 
                            {errorMsg}
                            <Form
                                onSubmit = {this.onSubmit} 
                                error400 = {this.state.error400}
                                error401 = {this.state.error401}
                                email = {this.state.email} 
                                password = {this.state.password} 
                                textContent = "Login"
                                onChange = {this.onChange}
                                value = {this.state.value}
                            />
                            <p className={pText}>Don't have an account? <span><Link to="/register" className={pTextSpan}>Sign up here!</Link></span></p>
                        </div>
                    </div>
                    <Footer/>
                </div>
        )
      }
    }

export default Login;