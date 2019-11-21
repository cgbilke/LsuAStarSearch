import React from 'react';
import './App.css';
import Body from './Body'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return (
      <div className="App">
        <div className="header">LSU Pathfinder</div>
        <Body/>
        <div className="footer">footer</div>
      </div>
    );
  }
}

export default App;
