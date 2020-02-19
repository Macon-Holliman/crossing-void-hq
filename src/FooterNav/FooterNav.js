import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './FooterNav.scss';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class FooterNav extends Component {

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
      
    <div class="footer-menu-nav">
      <div class="footer-menu-nav-inside">

      <div class="footer-nav">

      
      <div class="info-socials">
                    Official Game Links
      <div class="menu-footer-nav-inside nav-fluid">
      <ul class="social-links" >
                <li class="social-link-box">
                  <a href="https://discord.gg/sPDXj25" >
                    <img class='social-icon' src="https://i.imgur.com/7L7axo2.png"></img>
                  </a>
                </li>		
                <li class="social-link-box">
                  <a href="https://www.facebook.com/CrossingVoid.91Act"  >
                    <img class='social-icon' src="https://i.imgur.com/8b7e8b5.png"></img>
                  </a>
                </li>	
                <li class="social-link-box">
                  <a href="https://www.reddit.com/r/crossingvoidglobal"  >
                    <img class='social-icon' src="https://i.imgur.com/Y6hMs5E.png"></img>
                  </a>
                </li>		
                <li class="social-link-box">
                  <a href="https://twitter.com/CrossingVoid_EN"  >
                    <img class='social-icon' src="https://i.imgur.com/bUfofo1.png"></img>
                  </a>
                </li>		
                <li class="social-link-box">
                  <a href="https://www.youtube.com/channel/UCI1AVG4Z4yxvDoLE8tly7eA"  >
                    <img class='social-icon' src="https://i.imgur.com/n17wzpa.png"></img>
                  </a>
                </li>		
	    </ul>



        
      </div>

      </div>

      
      <div class="footer-copyright">
      CrossingVoid: HQ isn’t endorsed by ©SEGA, ©2017 KADOKAWA ASCII MEDIA WORKS, or ©91Act and is purely a fan made site. The game Crossing Void 
      and Character and Item images used on this site belong to ©SEGA, ©2017 KADOKAWA ASCII MEDIA WORKS, and ©91Act
      </div>

        </div>
      </div>
    </div>

    
    );
  }
  


}

export default FooterNav;
