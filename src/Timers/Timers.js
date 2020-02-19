import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Timers.scss';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class Timers extends Component {

  componentDidMount()
  {
    
    //Setting Initial Menus//////////////////




    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }

  render() {

  return (
      
    <div class="timers">
      <div class="timers-inside">
        <div class="timers-content">
          <div class="menu">
          efefefe


          </div>
        </div>
      </div>
    </div>

    
    );
  }
  


}

export default Timers;
