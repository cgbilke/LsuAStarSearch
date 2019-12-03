import React, {Component} from 'react';
import Autocomplete from "./Autocomplete";
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
        var suggestions = ["LSU Art Building",
        "Animal and Food Science Lab",
        "Patrick F Taylor Hall",
        "Business Education Complex",
        "Reilly Theatre",
        "Department of Chemistry",
        "LSU Agcenter",
        "Middleton Library",
        "LSU Museum of Natural Science",
        "Prescott Hall",
        "William C Stubbs Hall",
        "Audubon Hall",
        "College of Agriculture",
        "Robert Reich School of Landscape Architcture",
        "Howe Russell Geosciences Complex",
        "Department of Physics and Astronomy",
        "Coates Hall",
        "Himes Hall",
        "Bell Tower",
        "Lockett Hall",
        "Tureaud Hall",
        "LSU Ag Center Dairy Store",
        "Hatcher Hall",
        "LSU College of Humanities and Social Sciences",
        "Manship School of Mass Communication",
        "Johnston Hall",
        "College of the Coast and Environment",
        "Allen Hall",
        "Nicholson Hall",
        "Department of Geography and Anthropology",
        "School of Human Ecology"];

        return(
            <div className="body">
                <div className="start-div"><p>Enter Start:</p><Autocomplete suggestions={suggestions} /></div>
                <div className="stop-div"><p>Enter Stop:</p><Autocomplete suggestions={suggestions} /></div>
                <div><button className="button" onClick={this.handleMap}>Map</button></div>
            </div>
        );
    }
}

export default Body;