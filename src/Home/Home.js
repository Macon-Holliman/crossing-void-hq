import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Home.scss';

let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class Home extends Component {

  componentDidMount()
  {
    
    //Setting Initial Menus//////////////////


    for(var x = 0; x < this.state.PatchNotes.length; x++)
    {
      this.state.DateOptions.push(
      <button type="button" ariahaspopup="true" aria-expanded="false" class="btn btn-secondary date-choice" onClick={this.SelectThisDate()}>
        {this.state.PatchNotes[x].Date}
      </button>
      );
    }
    this.setState({DateOptions: this.state.DateOptions});
    this.PopulateLatestDate();

    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
      UpdateNotes: "",
      DateOptions: [],
      PatchNotes: [
        {
          Date: "2/07/2019",
          UpdateName: "0.0.9",
          Fixes: [
            "Added (Main) Accelerator to all pages",
            "Added (Support) Kouko to all pages",
            "Skill damage for Accelerator may be off slightly until further testing is done to ensure I calculated it correctly, although it seems consistent.",
            "Added abilitiy specific info to abilities with more unique functions.",
          ],
        },
        {
          Date: "1/30/2019",
          UpdateName: "0.0.8",
          Fixes: [
            "Fixed some scrollbar issues on certain pages. Either not showing or causing misalignments at certain resolutions.",
            "Added official social links to the footer.",
          ],
        },
        {
          Date: "1/29/2019",
          UpdateName: "0.0.7",
          Fixes: [
            "Reworked Toolbar/Nav and Home Page to a cleaner style as well as one that will adapt to mobile displays more readily.",
            "Updated Websites Changelog",
          ],
        },
        {
          Date: "1/28/2019",
          UpdateName: "0.0.6",
          Fixes: [
            "Added Character database at ./characters with working links to all of their pages as well as distributing these links across other pages for their respective character.",
            "There are a few abilities that have very unique actions and this will be detailed under the ability in the next update.",
            "Few design changes and text adjustment, things should be more readable regardless of resolution.",
            "Fixes for responsive display across multiple devices.",
            "A few pages have been forced to scroll to the left/right on small resolutions, this will be changed shortly to allow for viewing the entire page without the need for scrolling on mobile devices."
          ],
        },
        {
          Date: "1/24/2019",
          UpdateName: "0.0.5",
          Fixes: [
            "Added much more to my database to allow for a lot more future applications.",
          ],
        },
        {
          Date: "1/22/2019",
          UpdateName: "0.0.4",
          Fixes: [
            "Fixed an issue with Selvaia and Alicia's skill damage modifiers not properly accounting for their bonus damage.",
          ],
        },
        {
          Date: "1/21/2019",
          UpdateName: "0.0.3",
          Fixes: [
            "Added Kimono Shana - Skills/Stats - Be aware, skils haven't been tested for possible divergence from how they're worked. Will update if needed.",
          ],
        },
        {
          Date: "1/19/2019",
          UpdateName: "0.0.2",
          Fixes: [
            "Added indicator bar for % bleed damage on skill rankings page.",
            "Pushed a small fix that was causing bleed skills to benefit from some damage modifiers where they shouldn't have been."
          ],
        },
        {
          Date: "1/18/2019",
          UpdateName: "0.0.1",
          Fixes: [
            "Website Launched",
            "Team Builder, Stats, Skill Rankings pages created.",
          ],
        },
      ],
    };
    
  }

  render() {

  return (
      
    <div class="home-wrapper">
      <div class="home-content">
        <div class="home-content-stats">
          <div class="home-content-left">

            <div class="home-image">

            </div>
          </div>
          <div class="home-content-lower">

            <div class="home-content-lower-inner"> 

            <div class="main-page">
              <div class="main-title">
                Crossing Void: HQ - Update notes

                <div class="filter"   onClick={this.ToggleDropdownDates()}>
                  <div class="filter-item active dropdown">
                    <button type="button" ariahaspopup="true" aria-expanded="false" class="dropdown-toggle btn btn-secondary title-button">
                      1/29/2019
                    </button>
                    <div tabindex="-1" role="menu" ariahidden="true" class="dropdown-menu">
                    {this.state.DateOptions}
                    </div>
                  </div>
                </div>
              </div>
                <div class="main-card">
      
                <div class="update">
                <div class="update-header">
                <h1>Update 0.0.2</h1>
                <h3>Date</h3>
                  
                </div>
                <div class="update-contents">
                  <h3>Changes</h3>
                  <ul class="list-contents">
                    {this.state.UpdateNotes}
                  </ul>
                </div>
      
                  
                </div>
                  
                </div>

            </div>




            </div>
          </div>
        </div>
      </div>
    </div>

    
    );
  }

  
  ToggleDropdownDates = () => (e) => {

    var menu = document.getElementsByClassName("dropdown-menu");
    if(menu[0].className.includes('show'))
    {
       menu[0].className = menu[0].className.replace(" show", "");
    }
    else
    {
      menu[0].className = menu[0].className += ' show';
    }
  }

  
  
  SelectThisDate = () => (e) => {

    //e.currentTarget.innerHTML == the date chosen
    //document[x].


    
    var menu = document.getElementsByClassName("update-contents");
    menu[0].children[0].innerHTML = "Changes" ;//UL Header

    var notes = this.state.PatchNotes.filter(a => a.Date == e.currentTarget.innerHTML);
    
    this.state.UpdateNotes = [];
    for(var x = 0; x < notes[0].Fixes.length;x++)
    {

      this.state.UpdateNotes.push(
        <li>
          {notes[0].Fixes[x]}
        </li>
  
      
      );
    }

    var menu = document.getElementsByClassName("update-header");
    menu[0].children[0].innerHTML = "Update " + notes[0].UpdateName;//Update x.x.x
    menu[0].children[1].innerHTML = e.currentTarget.innerHTML; //Date

    
    var menu = document.getElementsByClassName("title-button");
    menu[0].innerHTML = e.currentTarget.innerHTML;//Update x.x.x

    this.setState({UpdateNotes: this.state.UpdateNotes});

  }

  PopulateLatestDate = () => {

    
    var menu = document.getElementsByClassName("update-contents");
    menu[0].children[0].innerHTML = "Changes" ;//UL Header

    
    this.state.UpdateNotes = [];
    for(var x = 0; x < this.state.PatchNotes[0].Fixes.length;x++)
    {

      this.state.UpdateNotes.push(
        <li>
          {this.state.PatchNotes[0].Fixes[x]}
        </li>
  
      
      );
    }

    var menu = document.getElementsByClassName("update-header");
    menu[0].children[0].innerHTML = "Update " + this.state.PatchNotes[0].UpdateName;//Update x.x.x
    menu[0].children[1].innerHTML = this.state.PatchNotes[0].Date; //Date

    
    var menu = document.getElementsByClassName("title-button");
    menu[0].innerHTML = this.state.PatchNotes[0].Date;//Update x.x.x

    this.setState({UpdateNotes: this.state.UpdateNotes});

  }

  DisplayDate = () => (e) => {
    var all = "";
    all = e.currentTarget.childNodes[2];
    var width = e.currentTarget.clientWidth;
    width = document.getElementsByClassName("changelog-title");
    width = width[0].clientWidth;
    if(e.currentTarget.clientWidth > width){width = e.currentTarget.clientWidth};
    if(all.style.display == 'inline' || all.style.display == 'inline-block')
    {

      e.currentTarget.style.width = width/2 + 'px';
      
    }
    else
    {
      e.currentTarget.style.width = width*2 + 'px';
      
    }

    for(var x = 2; x < e.currentTarget.childNodes.length; x++)
    {
      all = e.currentTarget.childNodes[x];
      if(all.style.display == 'inline' || all.style.display == 'inline-block')
      {
        all.style.display = 'none'
      }
      else if(x > 1)
      {
        all.style.display = "inline-block";
        //all.style.marginLeft = "7.8%";
      }
      else
      {
        all.style.display = "inline";
      }
    }



  }
  


}

export default Home;
