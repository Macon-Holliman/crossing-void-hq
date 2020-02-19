import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Characters.scss';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class Characters extends Component {

  componentDidMount()
  {
    
    //Getting needed height for animation
    window.addEventListener('load', (event) => { 
      this.getHeight();
    });
    //Setting Initial Menus/////////////////

    this.CreateMains(this.state.Mains);
    this.CreateSupports(this.state.Supports);

    
    var all = document.getElementsByClassName("support-characters-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.right = '-800px';}
    for(var x = 0; x < all.length;x++){all[x].style.marginBottom = '0px';}

    var all = document.getElementsByClassName("main-characters-wrapper");
    var all = document.getElementsByClassName("main-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '69.7%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.63)';
      all[x].style.boxShadow = 'rgb(99, 122, 132) 0px 0px 6px 4px inset';
      all[x].style.border = '';
    }

    
    var all = document.getElementsByClassName("support-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '29.7%';
      all[x].style.backgroundColor = 'rgba(146, 146, 146, 0.23)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 2px #444444';
      all[x].style.border = 'transparent';
    }

    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
      ListMains: [],
      ListSupports: [],
      showSupp: false,
      showMain: true,
      NeededHeight:0,
      NeededWidth:0,
      Mains: names,
      Supports: supports
    };
    
  }

  render() {

  return (
      
    <div class="characters-wrapper">
      <div class="characters-inside">
        <div class="characters-content">
          <div class="role-options">
            
          <h1 onClick={() => { this.ShowMains()}} class="main-option">
            Mains
            </h1>
            <span class="selected-indicator">Selected</span>
          <h1 onClick={() => { this.ShowSupports()}} class="support-option">
            Supports
          </h1>
          </div>
          <div class="support-characters-wrapper">
          <div  class="support-header">
            
          </div>

          <div class="characters-list">

          {this.state.ListSupports}

          </div>
          </div>

          <div class="main-characters-wrapper">
          <div class="main-header">
           
          </div>
          <div class="characters-list">

          {this.state.ListMains}

          </div>

          </div>

        </div>
      </div>
    </div>

    
    );
  }

  
 getHeight = () => {
   
  var all = document.getElementsByClassName("support-characters-wrapper");
  this.state.NeededHeight = (all[0].clientHeight + 70) + 'px';

  
  var all = document.getElementsByClassName("characters-content");
  for(var x = 0; x < all.length;x++){
    all[x].style.minHeight = this.state.NeededHeight;
  }
  
  var all = document.getElementsByClassName("role-options");
  this.state.NeededWidth = (all[0].clientWidth);
 }
 ShowSupports = ()  =>{

  if(!this.state.showSupp)
  {
    this.state.showSupp = !this.state.showSupp;
    var all = document.getElementsByClassName("main-characters-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.left = '-800px';}
    for(var x = 0; x < all.length;x++){all[x].style.border = 'transparent';}
    var all = document.getElementsByClassName("main-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '29.7%';
      all[x].style.backgroundColor = 'rgba(146, 146, 146, 0.23)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 2px #444444';
      all[x].style.border = 'transparent';
    }
    var all = document.getElementsByClassName("support-characters-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.right = '0px';}
    for(var x = 0; x < all.length;x++){all[x].style.border = '';}
    var all = document.getElementsByClassName("support-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '69.7%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.63)';
      all[x].style.boxShadow = 'rgb(99, 122, 132) 0px 0px 6px 4px inset';
      all[x].style.border = '';
    }
    var all = document.getElementsByClassName("selected-indicator");
    for(var x = 0; x < all.length;x++){
      if(window.innerWidth < 640)
      {
        all[x].style.left ='-80px';
      }
      else
      {
      all[x].style.left = (((this.state.NeededWidth/4)*3) + (this.state.NeededWidth*-1))+'px';
      }
    }
  }

 }

 
 ShowMains = ()  =>{

  if(this.state.showSupp)
  {
    this.state.showSupp = !this.state.showSupp;
    var all = document.getElementsByClassName("support-characters-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.right = '-800px';}
    for(var x = 0; x < all.length;x++){all[x].style.border = 'transparent';}
    var all = document.getElementsByClassName("support-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '29.7%';
      all[x].style.backgroundColor = 'rgba(146, 146, 146, 0.23)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 2px #444444';
      all[x].style.border = 'transparent';
    }
    var all = document.getElementsByClassName("main-characters-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.left = '-0px';}
    for(var x = 0; x < all.length;x++){all[x].style.border = '';}
    var all = document.getElementsByClassName("main-option");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '69.7%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.63)';
      all[x].style.boxShadow = 'rgb(99, 122, 132) 0px 0px 6px 4px inset';
      all[x].style.border = '';
    }
    var all = document.getElementsByClassName("selected-indicator");
    for(var x = 0; x < all.length;x++){
      if(window.innerWidth < 640)
      {
        all[x].style.left ='40px';
      }
      else
      {
        all[x].style.left = ((this.state.NeededWidth) + (((this.state.NeededWidth/4)*3)*-1)) +'px';
      }
    }

  }

 }
  
 CreateMains = (Data)  =>{

  for(var x = 0; x < Data.length; x++)
  {
    
    var name = "/char/m/" + Data[x].Name;
    name = name.replace(" ", "_");
    
    var displayName = Data[x].Name;
    if(Data[x].Name == "Kuroyukihime (Butterfly)"){displayName = "KYH (Butterfly)";}
    if(Data[x].Name == "Kirito (Dual Blade)"){displayName = "Kirito (DB)";}

    this.state.ListMains.push(
      <a class="characters-item-group" href={name}>
      <div class="characters-item" style={{'background-image': 'url(' + Data[x].Icon + ')'}}>
      <span class="characters-type">
        {Data[x].DmgType}
      </span>
      </div>

      <span class="characters-item-name">
        {displayName}
      </span>

      </a>

    );

  }
  this.setState({
    ListSupports: this.state.ListSupports,
  });
 }


 
 CreateSupports = (Data)  =>{
   

  for(var x = 0; x < Data.length; x++)
  {
    
    var name = "/char/s/" + Data[x].Name;
    name = name.replace(" ", "_");
    
    this.state.ListSupports.push(
      <a class="characters-item-group" href={name}>
      <div class="characters-item" style={{'background-image': 'url(' + Data[x].Icon + ')'}}>
      <span class="characters-type">
        {Data[x].DmgType}
      </span>
      </div>

      <span class="characters-item-name">
        {Data[x].Name}
      </span>

      </a>

    );

  }
  this.setState({
    ListSupports: this.state.ListSupports,
  });
 }


}

export default Characters;
