import React from 'react';
import {Link} from 'react-router-dom';
import { TiInputChecked } from "react-icons/ti";
import { css } from "glamor";

class Header extends React.PureComponent{

    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.props.logout();
    }

    render(){

        let pTextSpan = css ({
            color: "#196ab1",
            fontWeight: "bold",
            textDecoration: "none",
            ":hover": {
              color: "#FF8B00",
            }
          }) 

        let h3TextSpan = css ({
            textDecoration: "none",
            color: "#196ab1",
            ":hover": {
                cursor: "pointer",
            }
        })


        let icon = css({
            width: "20px",
            height: "20px",
            backgroundColor: "#196ab1",
            borderRadius: " 0 50% 50% 50%",
            padding: "5px",
            marginBottom: "0px",
            marginRight: "5px",
            position: "relative",
            top: "3px"
        })

        console.log("render from header")

        let buttonOne;
        let buttonTwo;
        let homeButton;

        if(this.props.testItem === "todo"){
            homeButton = <h3><Link to="/" className={h3TextSpan}> <TiInputChecked color="white" className={icon}/>doToDo</Link></h3>;
            buttonOne =  <p className="loginUser">{this.props.user}</p>;
            buttonTwo =  <button onClick={this.props.logout} className="logoutButton">Log out</button>;
        } else if (this.props.testItem === "signup"){
            homeButton = <h3><Link to="/" className={h3TextSpan}> <TiInputChecked color="white" className={icon}/>doToDo</Link></h3>;
            buttonOne = <p className="loginUser"><Link to="/" className={pTextSpan}>Home</Link></p>;
            buttonTwo = <p className="logoutButton"><Link to="/login" className={pTextSpan}>Log in</Link></p>;
        }  else if (this.props.testItem === "login"){
            homeButton = <h3><Link to="/" className={h3TextSpan}> <TiInputChecked color="white" className={icon}/>doToDo</Link></h3>;
            buttonOne = <p className="loginUser"><Link to="/" className={pTextSpan}>Home</Link></p>;
            buttonTwo = <p className="logoutButton"><Link to="/register" className={pTextSpan}>Sign up</Link></p>;
        } else if (this.props.testItem === "home"){
            if (this.props.activeToken === "Register"){
                homeButton = <h3><Link to="/" className={h3TextSpan}> <TiInputChecked color="white" className={icon}/>doToDo</Link></h3>;
                buttonOne = <p className="loginUser"><Link to="/register" className={pTextSpan}>Sign up</Link></p>;
                buttonTwo = <p className="logoutButton"><Link to="/login" className={pTextSpan}>Log in</Link></p>;
            }else {
                homeButton = <h3><Link to="/" className={h3TextSpan}> <TiInputChecked color="white" className={icon}/>doToDo</Link></h3>;
                buttonOne = <p className="loginUser">{this.props.activeToken}</p>;
                buttonTwo =  <button onClick={this.props.logout} className="logoutButton">Log out</button>;
            }
            
        }

        return (<div className="header">
                    <div className="header-left">
                        {homeButton}
                    </div>
                    <div className="header-right">
                        {buttonOne}
                        <span>|</span>
                        {buttonTwo}
                    </div>
                 </div>)
                }
}

export default Header;