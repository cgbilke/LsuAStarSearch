import React, {Component} from 'react';
import './body.css';

class Body extends Component{
    constructor(props){
        super(props);
        this.handleMap = this.handleMap.bind(this);
    }

    handleMap(){
        alert("Go home lol");
    }

    render(){
        return(
            <div className="body">
                <p>Enter Start:</p><input id="start" type="text"></input>
                <p>Enter Stop:</p><input id="stop" type="text"></input>
                <button className="button" onClick={this.handleMap}>Map</button>
            </div>
        );
    }
}

export default Body;