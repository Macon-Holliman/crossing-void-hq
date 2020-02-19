import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './MenuNav.scss';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class MenuNav extends Component {

  componentDidMount()
  {
    
    //Setting Initial Menus//////////////////
    

    this.state.path = window.location.pathname;
    if(this.state.path == "/")
    { 
      var currentTab = document.getElementsByClassName("nav-link-box");
      for(var x = 0; x < currentTab.length; x++)
      {
        if(currentTab[x].children[0].firstChild.data == "Home")
        {currentTab[x].className += " nav-link-box-active";}
      }
    }
    if(this.state.path == "/characters")
    { 
      var currentTab = document.getElementsByClassName("nav-link-box");
      for(var x = 0; x < currentTab.length; x++)
      {
        if(currentTab[x].children[0].firstChild.data == "Characters")
        {currentTab[x].className += " nav-link-box-active";}
      }
    }
    if(this.state.path == "/stats")
    { 
      var currentTab = document.getElementsByClassName("nav-link-box");
      for(var x = 0; x < currentTab.length; x++)
      {
        if(currentTab[x].children[0].firstChild.data == "Stats")
        {currentTab[x].className += " nav-link-box-active";}
      }
    }
    if(this.state.path == "/builder")
    { 
      var currentTab = document.getElementsByClassName("nav-link-box");
      for(var x = 0; x < currentTab.length; x++)
      {
        if(currentTab[x].children[0].firstChild.data == "Team Builder")
        {currentTab[x].className += " nav-link-box-active";}
      }
    }
    if(this.state.path == "/skills")
    { 
      var currentTab = document.getElementsByClassName("nav-link-box");
      for(var x = 0; x < currentTab.length; x++)
      {
        if(currentTab[x].children[0].firstChild.data == "Skill Rankings")
        {currentTab[x].className += " nav-link-box-active";}
      }
    }

    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
      path: "",
    };
    
  }

  render() {

  return (
      
    <div class="menu-nav">
      <div class="menu-nav-inside nav-fluid">
      <a class="logo-container" href="/"> <img class="logo-flex" src="https://i.imgur.com/icCNINW.png" alt="Crossing Void HQ"/> </a>
      
      <ul class="nav-links" >
                <li class="nav-link-box">
                  <a href="/"  >
                    Home
                  </a>
                </li>		
                <li class="nav-link-box">
                  <a href="/characters"  >
                    Characters
                  </a>
                </li>	
                <li class="nav-link-box">
                  <a href="/stats"  >
                    Stats
                  </a>
                </li>		
                <li class="nav-link-box">
                  <a href="/builder"  >
                    Team Builder
                  </a>
                </li>		
                <li class="nav-link-box">
                  <a href="/skills"  >
                    Skill Rankings
                  </a>
                </li>		
	    </ul>
      <div class="menu-wrapper" onClick={() => { this.ToggleHamburgerMenu()}}>
        <div class="hamburger-menu"></div>	  
      </div>



        
      </div>

      <div class="mobile-menu">
        <h2>Navigation</h2>
        
      <ul class="nav-links-mobile" >
                <li class="nav-link-box-mobile">
                  <a href="/"  >
                    Home
                  </a>
                </li>		
                <li class="nav-link-box-mobile">
                  <a href="/characters"  >
                    Characters
                  </a>
                </li>	
                <li class="nav-link-box-mobile">
                  <a href="/stats"  >
                    Stats
                  </a>
                </li>		
                <li class="nav-link-box-mobile">
                  <a href="/builder"  >
                    Team Builder
                  </a>
                </li>		
                <li class="nav-link-box-mobile">
                  <a href="/skills"  >
                    Skill Rankings
                  </a>
                </li>		
	    </ul>

      </div>

    </div>

    
    );
  }
  

  ToggleHamburgerMenu = () => {
    
    var menu = document.getElementsByClassName("menu-wrapper");
    var content = document.getElementsByClassName("mobile-menu");
    if(menu[0].className.includes('animate'))
    {
       menu[0].className = menu[0].className.replace(" animate", "");
       content[0].className = content[0].className.replace(" active", "");
    }
    else
    {
      menu[0].className = menu[0].className += ' animate';
      content[0].className = content[0].className += ' active';
    }
   }
  

}

export default MenuNav;
