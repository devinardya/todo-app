import React from 'react';
import { css } from "glamor";

class FormTodo extends React.Component {
    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit();
    }

    render(){

        let placeholder;
        let errorMsg = " ";
        let counter;

        let errMsg = css ({
            color: "red",
            margin: "0px",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: "30px",
            width: "calc(90% - 30px)",
            height: "calc(100% - 10px)",
            marginBottom: "5px",
          })
  
          counter = css ({
            fontSize: "12px",
            color: "#737373",
            width: "calc(10% - 10px)",
            //height: "100%",
            textAlign: "right",
            margin: "0px 0px 0px 0px",
          })
  
          let errorCounter = css ({
            display: "flex",
            flexFlow: "row wrap",
            height:"20px",
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "5px",
          })

        if(this.props.inputError){
          
            errorMsg =  this.props.errorMsg;
            placeholder = css({
              border: "2px solid red",
              padding: "2px",
              "::placeholder": {
                color: "rgb(94, 94, 94)",
              }
            })
        } else {
            errorMsg =  " ";
            placeholder = css({
              border: "1px solid #dddddd",
              padding: "2px",
              "::placeholder": {
                color: "rgb(94, 94, 94)",
              }
            })
        }

        if (this.props.input.length > 100 || this.props.input.length === 0){

            counter = css ({
              fontSize: "12px",
              color: "red",
              width: "calc(10% - 10px)",
              textAlign: "right",
              margin: "0px 0px 0px 0px",
            })
        }

        return (<>
                    <span className ={errorCounter} >
                        <p className = {errMsg}>{errorMsg}</p>
                        <p className= {counter}>{this.props.input.length}/100</p>
                    </span>
                    <form onSubmit = {this.onSubmit}>
                        <input className={placeholder} 
                            type="text" 
                            onChange= {this.onChange} 
                            value={this.props.value} 
                            placeholder= "What to do today?" 
                            />
                        <button className="addButton" type="submit">Add List</button>
                    </form>
            </>
        )
    }
}

export default FormTodo;