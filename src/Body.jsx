import React, {Component} from 'react';
import Autocomplete from "./Autocomplete";
import Map from "./Map";
import './body.css';

class Body extends Component{
    constructor(props){
        super(props);
        this.state = {
            start: null,
            stop: null,
            showMap: false
        }
        this.handleMap = this.handleMap.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateStop = this.updateStop.bind(this);
    }

    componentDidMount(){
        const script = document.createElement("script");

        script.src = "https://imgur.com/gallery/a848Kik";
        script.async = true;
        document.body.appendChild(script);
    }
    handleMap(){
        var {start, stop} = this.state;
        console.log(start,stop);
        this.setState({
            showMap: true
        })
    }

    updateStart(val){
        this.setState({
            start: val
        });
    }
    updateStop(val){
        this.setState({
            stop: val
        });
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
        const {showMap} = this.state;
        const search = (<div className="body">
        <div className="body-container">
            <div className="start-div"><Autocomplete valChange={this.updateStart} ptext={"Start Location"} suggestions={suggestions} /></div>
            <div className="stop-div"><Autocomplete valChange={this.updateStop} ptext={"Stop Location"} suggestions={suggestions} /></div>
            <div><button className="button" onClick={this.handleMap}>Map</button></div>
        </div>
    </div>)
        const body = showMap ? <Map/> : search;
        return(
            <div>{body}</div>
        );
    }
}

export default Body;