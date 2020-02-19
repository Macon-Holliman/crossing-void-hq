import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Statistics.scss';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');


class Statistics extends Component {

  componentDidMount()
  {
    
    //Setting Initial Menus//////////////////




    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {

      Mains: names,
      Supports: supports,

      //Mains at index 0
      //Suppoorts at index 1
      LowestAtkGrowthLevel: [1000,1000],
      LowestAtkGrowthStar: [1000,1000],

      LowestHPGrowthLevel: [1000,1000],
      LowestHPGrowthStar: [1000,1000],

      LowestPDEFGrowthLevel: [1000,1000],
      LowestPDEFGrowthStar: [1000,1000],

      LowestADEFGrowthLevel: [1000,1000],
      LowestADEFGrowthStar: [1000,1000],

      MainRankings: [],
      SuppRankings: [],

      NameSortedMainRankings: [],
      NameSortedSuppRankings: [],
      
    MainRankingsLevelAtkDiff: [],
    MainRankingsLevelHPDiff: [],
    MainRankingsLevelPDEFDiff: [],
    MainRankingsLevelADEFDiff: [],

    MainRankingsStarAtkDiff: [],
    MainRankingsStarHPDiff: [],
    MainRankingsStarPDEFDiff: [],
    MainRankingsStarADEFDiff: [],
      
    SuppRankingsLevelAtkDiff: [],
    SuppRankingsLevelHPDiff: [],
    SuppRankingsLevelPDEFDiff: [],
    SuppRankingsLevelADEFDiff: [],

    SuppRankingsStarAtkDiff: [],
    SuppRankingsStarHPDiff: [],
    SuppRankingsStarPDEFDiff: [],
    SuppRankingsStarADEFDiff: [],
    
    SuppRankingsCombinedDiff: [],  
    MainRankingsCombinedDiff: [],  
    SuppRankingsCombinedRank: [],  
    MainRankingsCombinedRank: [],  
    
    SuppRankingsCombinedAtkDiff: [],
    SuppRankingsCombinedHPDiff: [],
    SuppRankingsCombinedPDEFDiff: [],
    SuppRankingsCombinedADEFDiff: [],
    
    MainRankingsCombinedAtkDiff: [],
    MainRankingsCombinedHPDiff: [],
    MainRankingsCombinedPDEFDiff: [],
    MainRankingsCombinedADEFDiff: [],
    
    SuppRankingsCombinedAtkRank: [],
    SuppRankingsCombinedHPRank: [],
    SuppRankingsCombinedPDEFRank: [],
    SuppRankingsCombinedADEFRank: [],
    
    MainRankingsCombinedAtkRank: [],
    MainRankingsCombinedHPRank: [],
    MainRankingsCombinedPDEFRank: [],
    MainRankingsCombinedADEFRank: [],

    ListMainsLevelATK: [],
    ListMainsLevelHP: [],
    ListMainsLevelPDEF: [],
    ListMainsLevelADEF: [],

    ListMainsStarATK: [],
    ListMainsStarHP: [],
    ListMainsStarPDEF: [],
    ListMainsStarADEF: [],

    ListSupportsLevelATK: [],
    ListSupportsLevelHP: [],
    ListSupportsLevelPDEF: [],
    ListSupportsLevelADEF: [],

    ListSupportsStarATK: [],
    ListSupportsStarHP: [],
    ListSupportsStarPDEF: [],
    ListSupportsStarADEF: [],

    
    ListSupportsCombinedATKRank: [],
    ListSupportsCombinedHPRank: [],
    ListSupportsCombinedPDEFRank: [],
    ListSupportsCombinedADEFRank: [],

    ListMainsCombinedATKRank: [],
    ListMainsCombinedHPRank: [],
    ListMainsCombinedPDEFRank: [],
    ListMainsCombinedADEFRank: [],

    ListSupportsCombinedATKDiff: [],
    ListSupportsCombinedHPDiff: [],
    ListSupportsCombinedPDEFDiff: [],
    ListSupportsCombinedADEFDiff: [],

    ListMainsCombinedATKDiff: [],
    ListMainsCombinedHPDiff: [],
    ListMainsCombinedPDEFDiff: [],
    ListMainsCombinedADEFDiff: [],

    
    ListSuppRankingsCombinedDiff: [],  
    ListMainRankingsCombinedDiff: [], 
    
    
    ListSuppRankingsCombinedRank: [],  
    ListMainRankingsCombinedRank: [], 

    };
    
  }

  render() {

  return (
    <div class="statistics">
      <div class="statistics-inside">
        <div class="statistics-content">
          <div onClick={this.GenerateResults()} class="menu-stats">
            <div class="header-wrapper">
          <h3 style={{'display':'inline-block', 'margin-left':'0px', 'width':'47%', 'content': "", 'clear':'both'}} class="column-header-text">Star  Growth won't diverge much from Level Growth except for in the cases of a few Supports, as they're very linear for Mains</h3>
          <h3  style={{'display':'inline-block', 'width':'47%', 'margin-right':'10px', 'content': "", 'clear':'both'}}  class="column-header-text">The Total Tab for comparisons should be taken lightly as it is heavily influenced by HP gained until I weight the stats against each other.</h3>
          </div>
            <div class="type-selection" style={{'margin-left': '0px','width':'47%'}}>

              <ul class="stat-filter-menu" style={{'padding-left': '0px'}}>
                <li class="stat-filter-active">
                  <a   style={{'padding-bottom': '30px','padding-top': '9px', 'font-size': '50px'}}>
                    Mains
                  </a>
                  </li>		
	            </ul>

            </div>

            
            <div class="stat-selection" style={{'margin-left': '0px','width':'47%'}}>

              <ul class="stat-filter-menu" style={{'padding-left': '0px'}}>
                <li class="stat-type-filter-active">
                  <a  style={{'padding-bottom': '30px','padding-top': '10px', 'font-size': '50px'}}>
                    Supports
                  </a>
                </li>
                
	            </ul>


            </div>
          </div>
            <div class="right-column-content">

              <div class="support-filter-type-header">
                <ul class="support-filter-type-header-tabs">
                  <li onClick={() => { this.SelectSupportLevelMenu()}}>
                    <a  style={{'color': '#4990e2', 'font-weight': 'bold', 'border-bottom-color': '#4990e2'}} class="support-filter-type-level" >
                      Level
                    </a>
                  </li>
                  <li  onClick={() => { this.SelectSupportStarMenu()}}>
                    <a  class="support-filter-type-stars">
                      Star
                    </a>
                  </li>
                  <li  onClick={() => { this.SelectSupportCombinedMenu()}}>
                    <a  class="support-filter-type-combined">
                      Combined
                    </a>
                  </li>
                  <li   onClick={() => { this.SelectSupportTotalMenu()}}>
                    <a  class="support-filter-type-total">
                      Total
                    </a>
                  </li>
                </ul>
              </div>
              <div class="support-content">
                <div class="support-content-rankings">
                  

                 
                 <div class="support-content-rankings-level">
                    <ul class="index-stats">
                      <li class="index-stats-tab supp-level-attack active" onClick={() => { this.SelectSupportLevelStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab supp-level-hp" onClick={() => { this.SelectSupportLevelStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab supp-level-pdef" onClick={() => { this.SelectSupportLevelStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab supp-level-adef" onClick={() => { this.SelectSupportLevelStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header">Growth</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>


                    <tbody class="support-level-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListSupportsLevelATK}
                    </tbody>
                    <tbody class="support-level-hp" style={{'display': 'none'}}>
                      {this.state.ListSupportsLevelHP}
                    </tbody>
                    <tbody class="support-level-pdef" style={{'display': 'none'}}>
                      {this.state.ListSupportsLevelPDEF}
                    </tbody>
                    <tbody class="support-level-adef" style={{'display': 'none'}}>
                      {this.state.ListSupportsLevelADEF}
                    </tbody>


                    </table>


                 </div>

                
                 <div class="support-content-rankings-stars" style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab supp-stars-attack active" onClick={() => { this.SelectSupportStarStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab supp-stars-hp" onClick={() => { this.SelectSupportStarStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab supp-stars-pdef" onClick={() => { this.SelectSupportStarStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab supp-stars-adef" onClick={() => { this.SelectSupportStarStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="support-stars-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListSupportsStarATK}
                    </tbody>
                    <tbody class="support-stars-hp" style={{'display': 'none'}}>
                      {this.state.ListSupportsStarHP}
                    </tbody>
                    <tbody class="support-stars-pdef" style={{'display': 'none'}}>
                      {this.state.ListSupportsStarPDEF}
                    </tbody>
                    <tbody class="support-stars-adef" style={{'display': 'none'}}>
                      {this.state.ListSupportsStarADEF}
                    </tbody>



                    </table>


                 </div>

                 
                 <div class="support-content-rankings-combined"  style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab supp-combined-attack  active" onClick={() => { this.SelectSupportCombinedStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab supp-combined-hp" onClick={() => { this.SelectSupportCombinedStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab supp-combined-pdef" onClick={() => { this.SelectSupportCombinedStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab supp-combined-adef" onClick={() => { this.SelectSupportCombinedStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header">Ranks Combined</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="support-combined-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListSupportsCombinedATKRank}
                    </tbody>
                    <tbody class="support-combined-hp" style={{'display': 'none'}}>
                      {this.state.ListSupportsCombinedHPRank}
                    </tbody>
                    <tbody class="support-combined-pdef" style={{'display': 'none'}}>
                      {this.state.ListSupportsCombinedPDEFRank}
                    </tbody>
                    <tbody class="support-combined-adef" style={{'display': 'none'}}>
                      {this.state.ListSupportsCombinedADEFRank}
                    </tbody>



                    </table>


                 </div>

                 
                 <div class="support-content-rankings-total"  style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab supp-total  active" onClick={() => { this.SelectSupportCombinedFilter("rank")}}>
                      <a >Total Rank</a>
                      </li> 
                      <li class="index-stats-tab supp-rank" onClick={() => { this.SelectSupportCombinedFilter("deviation")}}>
                      <a >Total Deviation</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Total Deviation</th>
                      <th class="stats-index-table-header">Ranks Combined</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="support-total-rank" style={{'display': 'table-row-group'}}>
                      {this.state.ListSuppRankingsCombinedRank}
                    </tbody>
                    <tbody class="support-total-deviation" style={{'display': 'none'}}>
                      {this.state.ListSuppRankingsCombinedDiff}
                    </tbody>



                    </table>


                 </div>


                </div>

              </div>
            </div>
           
            <div class="left-column-content">
              
              <div class="main-filter-type-header">
                <ul class="main-filter-type-header-tabs">
                  <li onClick={() => { this.SelectMainLevelMenu()}}>
                    <a  style={{'color': '#4990e2', 'font-weight': 'bold', 'border-bottom-color': '#4990e2'}} class="main-filter-type-level" >
                      Level
                    </a>
                  </li>
                  <li  onClick={() => { this.SelectMainStarMenu()}}>
                    <a  class="main-filter-type-stars">
                      Star
                    </a>
                  </li>
                  <li  onClick={() => { this.SelectMainCombinedMenu()}}>
                    <a  class="main-filter-type-combined">
                      Combined
                    </a>
                  </li>
                  <li   onClick={() => { this.SelectMainTotalMenu()}}>
                    <a  class="main-filter-type-total">
                      Total
                    </a>
                  </li>
                </ul>
              </div>
              <div class="main-content">
                <div class="main-content-rankings">
                  

                 
                 <div class="main-content-rankings-level">
                    <ul class="index-stats">
                      <li class="index-stats-tab main-level-attack active" onClick={() => { this.SelectMainLevelStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab main-level-hp" onClick={() => { this.SelectMainLevelStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab main-level-pdef" onClick={() => { this.SelectMainLevelStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab main-level-adef" onClick={() => { this.SelectMainLevelStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header">Growth</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>


                    <tbody class="mains-level-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListMainsLevelATK}
                    </tbody>
                    <tbody class="mains-level-hp" style={{'display': 'none'}}>
                      {this.state.ListMainsLevelHP}
                    </tbody>
                    <tbody class="mains-level-pdef" style={{'display': 'none'}}>
                      {this.state.ListMainsLevelPDEF}
                    </tbody>
                    <tbody class="mains-level-adef" style={{'display': 'none'}}>
                      {this.state.ListMainsLevelADEF}
                    </tbody>


                    </table>


                 </div>

                
                 <div class="main-content-rankings-stars" style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab main-stars-attack active" onClick={() => { this.SelectMainStarStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab main-stars-hp" onClick={() => { this.SelectMainStarStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab main-stars-pdef" onClick={() => { this.SelectMainStarStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab main-stars-adef" onClick={() => { this.SelectMainStarStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="mains-stars-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListMainsStarATK}
                    </tbody>
                    <tbody class="mains-stars-hp" style={{'display': 'none'}}>
                      {this.state.ListMainsStarHP}
                    </tbody>
                    <tbody class="mains-stars-pdef" style={{'display': 'none'}}>
                      {this.state.ListMainsStarPDEF}
                    </tbody>
                    <tbody class="mains-stars-adef" style={{'display': 'none'}}>
                      {this.state.ListMainsStarADEF}
                    </tbody>



                    </table>


                 </div>

                 
                 <div class="main-content-rankings-combined"  style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab main-combined-attack  active" onClick={() => { this.SelectMainCombinedStat("attack")}}>
                      <a >Attack</a>
                      </li> 
                      <li class="index-stats-tab main-combined-hp" onClick={() => { this.SelectMainCombinedStat("hp")}}>
                      <a >Health</a>
                      </li> 
                      <li class="index-stats-tab main-combined-pdef" onClick={() => { this.SelectMainCombinedStat("pdef")}}>
                      <a >Physical Def</a>
                      </li> 
                      <li class="index-stats-tab main-combined-adef" onClick={() => { this.SelectMainCombinedStat("adef")}}>
                      <a >Arcane Def</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Deviation</th>
                      <th class="stats-index-table-header">Ranks Combined</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="mains-combined-attack" style={{'display': 'table-row-group'}}>
                      {this.state.ListMainsCombinedATKRank}
                    </tbody>
                    <tbody class="mains-combined-hp" style={{'display': 'none'}}>
                      {this.state.ListMainsCombinedHPRank}
                    </tbody>
                    <tbody class="mains-combined-pdef" style={{'display': 'none'}}>
                      {this.state.ListMainsCombinedPDEFRank}
                    </tbody>
                    <tbody class="mains-combined-adef" style={{'display': 'none'}}>
                      {this.state.ListMainsCombinedADEFRank}
                    </tbody>



                    </table>


                 </div>

                 
                 <div class="main-content-rankings-total"  style={{display: 'none'}}>
                    <ul class="index-stats">
                      <li class="index-stats-tab main-total  active" onClick={() => { this.SelectMainCombinedFilter("rank")}}>
                      <a >Total Rank</a>
                      </li> 
                      <li class="index-stats-tab main-rank" onClick={() => { this.SelectMainCombinedFilter("deviation")}}>
                      <a >Total Deviation</a>
                      </li> 
                    </ul>

                    <table class="stats-table">
                    <colgroup>
                    <col width="34"/>.Icon
                    <col width="23"/>
                    <col width="48"/>
                    <col/>
                    <col width="58"/>
                    <col width="58"/>
                    <col width="85"/>
                    </colgroup>

                    <thead>
                      <tr>
                      <th class="stats-index-table-header">Rank</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header" colspan="2" style={{'padding-left':'18px'}}>Name</th>
                      <th class="stats-index-table-header"></th>
                      <th class="stats-index-table-header">Total Deviation</th>
                      <th class="stats-index-table-header">Ranks Combined</th>
                      <th class="stats-index-table-header">Tier</th>
                      
                      </tr>
                    </thead>

                    <tbody class="mains-total-rank" style={{'display': 'table-row-group'}}>
                      {this.state.ListMainRankingsCombinedRank}
                    </tbody>
                    <tbody class="mains-total-deviation" style={{'display': 'none'}}>
                      {this.state.ListMainRankingsCombinedDiff}
                    </tbody>



                    </table>


                 </div>


                </div>

              </div>
            
            </div>

        </div>
      </div>
    </div>
  );
  }
  
  SetStartingMenus = () =>  {
    var all = document.getElementsByClassName('support-stars-attack');
    for (var i = 0; i < all.length; i++) {
    all[i].style.display = 'table-row-group';
    }
  };

  
  SelectSupportStarMenu = () =>  {
    var all = document.getElementsByClassName('support-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-stars');
    all[0].style.display = 'block';


    
    var all = document.getElementsByClassName('support-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-stars');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectSupportLevelMenu = () =>  {
    var all = document.getElementsByClassName('support-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-level');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('support-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-level');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectSupportCombinedMenu = () =>  {
    var all = document.getElementsByClassName('support-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-combined');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('support-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-combined');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectSupportTotalMenu = () =>  {
    var all = document.getElementsByClassName('support-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-content-rankings-total');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('support-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('support-filter-type-total');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };

  
  SelectSupportCombinedFilter= (choice) =>  {
    var all = document.getElementsByClassName('support-total-rank');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-total-deviation');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('supp-total');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-rank');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "rank"){
    var all = document.getElementsByClassName('support-total-rank');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-total');
    all[0].className += ' active';
    }
    if(choice == "deviation"){
    var all = document.getElementsByClassName('support-total-deviation');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-rank');
    all[0].className += ' active';
    }
  };

  
  SelectSupportLevelStat= (choice) =>  {
    var all = document.getElementsByClassName('support-level-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-level-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-level-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-level-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('supp-level-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-level-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-level-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-level-adef');
    all[0].className= all[0].className.replace(' active','');
   



    if(choice == "attack"){
    var all = document.getElementsByClassName('support-level-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-level-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('support-level-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-level-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('support-level-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-level-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('support-level-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-level-adef');
    all[0].className += ' active';
    }
  };

  
  SelectSupportStarStat= (choice) =>  {
    var all = document.getElementsByClassName('support-stars-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-stars-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-stars-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-stars-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('supp-stars-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-stars-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-stars-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-stars-adef');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "attack"){
    var all = document.getElementsByClassName('support-stars-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-stars-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('support-stars-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-stars-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('support-stars-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-stars-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('support-stars-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-stars-adef');
    all[0].className += ' active';
    }
  };

  
  SelectSupportCombinedStat= (choice) =>  {
    var all = document.getElementsByClassName('support-combined-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-combined-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-combined-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('support-combined-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('supp-combined-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-combined-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-combined-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('supp-combined-adef');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "attack"){
    var all = document.getElementsByClassName('support-combined-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-combined-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('support-combined-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-combined-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('support-combined-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-combined-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('support-combined-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('supp-combined-adef');
    all[0].className += ' active';
    }
  };

  
  SelectMainStarMenu = () =>  {
    var all = document.getElementsByClassName('main-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-stars');
    all[0].style.display = 'block';


    
    var all = document.getElementsByClassName('main-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-stars');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectMainLevelMenu = () =>  {
    var all = document.getElementsByClassName('main-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-level');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('main-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-level');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectMainCombinedMenu = () =>  {
    var all = document.getElementsByClassName('main-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-total');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-combined');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('main-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-total');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-combined');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };
  SelectMainTotalMenu = () =>  {
    var all = document.getElementsByClassName('main-content-rankings-stars');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-level');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-combined');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('main-content-rankings-total');
    all[0].style.display = 'block';

    
    var all = document.getElementsByClassName('main-filter-type-level');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-stars');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-combined');
    all[0].style.color = '#777';
    all[0].style.fontWeight = 'unset';
    all[0].style.borderBottomColor = 'transparent';
    var all = document.getElementsByClassName('main-filter-type-total');
    all[0].style.color = '#4990e2';
    all[0].style.fontWeight = 'bold';
    all[0].style.borderBottomColor = '#4990e2';
  };

  
  SelectMainCombinedFilter= (choice) =>  {
    var all = document.getElementsByClassName('mains-total-rank');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-total-deviation');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('main-total');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-rank');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "rank"){
    var all = document.getElementsByClassName('mains-total-rank');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-total');
    all[0].className += ' active';
    }
    if(choice == "deviation"){
    var all = document.getElementsByClassName('mains-total-deviation');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-rank');
    all[0].className += ' active';
    }
  };

  
  SelectMainLevelStat= (choice) =>  {
    var all = document.getElementsByClassName('mains-level-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-level-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-level-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-level-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('main-level-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-level-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-level-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-level-adef');
    all[0].className= all[0].className.replace(' active','');
   



    if(choice == "attack"){
    var all = document.getElementsByClassName('mains-level-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-level-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('mains-level-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-level-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('mains-level-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-level-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('mains-level-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-level-adef');
    all[0].className += ' active';
    }
  };

  
  SelectMainStarStat= (choice) =>  {
    var all = document.getElementsByClassName('mains-stars-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-stars-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-stars-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-stars-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('main-stars-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-stars-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-stars-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-stars-adef');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "attack"){
    var all = document.getElementsByClassName('mains-stars-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-stars-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('mains-stars-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-stars-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('mains-stars-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-stars-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('mains-stars-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-stars-adef');
    all[0].className += ' active';
    }
  };

  
  SelectMainCombinedStat= (choice) =>  {
    var all = document.getElementsByClassName('mains-combined-attack');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-combined-hp');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-combined-pdef');
    all[0].style.display = 'none';
    var all = document.getElementsByClassName('mains-combined-adef');
    all[0].style.display = 'none';

    
    var all = document.getElementsByClassName('main-combined-attack');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-combined-hp');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-combined-pdef');
    all[0].className= all[0].className.replace(' active','');
    var all = document.getElementsByClassName('main-combined-adef');
    all[0].className= all[0].className.replace(' active','');
   

    if(choice == "attack"){
    var all = document.getElementsByClassName('mains-combined-attack');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-combined-attack');
    all[0].className += ' active';
    }
    if(choice == "hp"){
    var all = document.getElementsByClassName('mains-combined-hp');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-combined-hp');
    all[0].className += ' active';
    }
    if(choice == "pdef"){
    var all = document.getElementsByClassName('mains-combined-pdef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-combined-pdef');
    all[0].className += ' active';
    }
    if(choice == "adef"){
    var all = document.getElementsByClassName('mains-combined-adef');
    all[0].style.display = 'table-row-group';
    var all = document.getElementsByClassName('main-combined-adef');
    all[0].className += ' active';
    }
  };

  

  GenerateResults = () =>  {

    //Iterate through anf find the smallest Growth of each stat

    for(var x = 0; x < this.state.Supports.length; x++) //Going through supports
    {
      if(x < this.state.Mains.length) //Going through mains
      {
        if(this.state.Mains[x].ADEF < this.state.LowestADEFGrowthStar[0]){this.state.LowestADEFGrowthStar[0] = this.state.Mains[x].ADEF;}
        if(this.state.Mains[x].PDEF < this.state.LowestPDEFGrowthStar[0]){this.state.LowestPDEFGrowthStar[0] = this.state.Mains[x].PDEF;}
        if(this.state.Mains[x].HP < this.state.LowestHPGrowthStar[0]){this.state.LowestHPGrowthStar[0] = this.state.Mains[x].HP;}
        if(this.state.Mains[x].ATK < this.state.LowestAtkGrowthStar[0]){this.state.LowestAtkGrowthStar[0] = this.state.Mains[x].ATK;}
        if(this.state.Mains[x].ADefGrowth < this.state.LowestADEFGrowthLevel[0]){this.state.LowestADEFGrowthLevel[0] = this.state.Mains[x].ADefGrowth;}
        if(this.state.Mains[x].PDefGrowth < this.state.LowestPDEFGrowthLevel[0]){this.state.LowestPDEFGrowthLevel[0] = this.state.Mains[x].PDefGrowth;}
        if(this.state.Mains[x].HPGrowth < this.state.LowestHPGrowthLevel[0]){this.state.LowestHPGrowthLevel[0] = this.state.Mains[x].HPGrowth;}
        if(this.state.Mains[x].AtkGrowth < this.state.LowestAtkGrowthLevel[0]){this.state.LowestAtkGrowthLevel[0] = this.state.Mains[x].AtkGrowth;}
      }

      if(this.state.Supports[x].ADEF < this.state.LowestADEFGrowthStar[1]){this.state.LowestADEFGrowthStar[1] = this.state.Supports[x].ADEF;}
      if(this.state.Supports[x].PDEF < this.state.LowestPDEFGrowthStar[1]){this.state.LowestPDEFGrowthStar[1] = this.state.Supports[x].PDEF;}
      if(this.state.Supports[x].HP < this.state.LowestHPGrowthStar[1]){this.state.LowestHPGrowthStar[1] = this.state.Supports[x].HP;}
      if(this.state.Supports[x].ATK < this.state.LowestAtkGrowthStar[1]){this.state.LowestAtkGrowthStar[1] = this.state.Supports[x].ATK;}
      if(this.state.Supports[x].ADefGrowth < this.state.LowestADEFGrowthLevel[1]){this.state.LowestADEFGrowthLevel[1] = this.state.Supports[x].ADefGrowth;}
      if(this.state.Supports[x].PDefGrowth < this.state.LowestPDEFGrowthLevel[1]){this.state.LowestPDEFGrowthLevel[1] = this.state.Supports[x].PDefGrowth;}
      if(this.state.Supports[x].HPGrowth < this.state.LowestHPGrowthLevel[1]){this.state.LowestHPGrowthLevel[1] = this.state.Supports[x].HPGrowth;}
      if(this.state.Supports[x].AtkGrowth < this.state.LowestAtkGrowthLevel[1]){this.state.LowestAtkGrowthLevel[1] = this.state.Supports[x].AtkGrowth;}
  }

  
  for(var x = 0; x < this.state.Supports.length; x++) //Going through supports to get differences
  {
    if(x < this.state.Mains.length) //Going through mains to get differences
    {
      
    this.state.MainRankings.push(
      {
        Name: this.state.Mains[x].Name,
        Stats: this.state.Mains[x],
        Level: {
          ATKDiff: (((this.state.Mains[x].AtkGrowth / this.state.LowestAtkGrowthLevel[0])*100)-100),
          ATKRank: 0,
          HPDiff: (((this.state.Mains[x].HPGrowth / this.state.LowestHPGrowthLevel[0])*100)-100),
          HPRank: 0,
          PDEFDiff: (((this.state.Mains[x].PDefGrowth / this.state.LowestPDEFGrowthLevel[0])*100)-100),
          PDEFRank: 0,
          ADEFDiff: (((this.state.Mains[x].ADefGrowth / this.state.LowestADEFGrowthLevel[0])*100)-100),
          ADEFRank: 0,
          TotalRank: 0,
          TotalDiff: (((this.state.Mains[x].AtkGrowth / this.state.LowestAtkGrowthLevel[0])*100)-100)
          + (((this.state.Mains[x].HPGrowth / this.state.LowestHPGrowthLevel[0])*100)-100)
          + (((this.state.Mains[x].PDefGrowth / this.state.LowestPDEFGrowthLevel[0])*100)-100)
          + (((this.state.Mains[x].ADefGrowth / this.state.LowestADEFGrowthLevel[0])*100)-100)
          ,
        },
        Star: {
          ATKDiff: (((this.state.Mains[x].ATK / this.state.LowestAtkGrowthStar[0])*100)-100),
          ATKRank: 0,
          HPDiff: (((this.state.Mains[x].HP / this.state.LowestHPGrowthStar[0])*100)-100),
          HPRank: 0,
          PDEFDiff: (((this.state.Mains[x].PDEF / this.state.LowestPDEFGrowthStar[0])*100)-100),
          PDEFRank: 0,
          ADEFDiff: (((this.state.Mains[x].ADEF / this.state.LowestADEFGrowthStar[0])*100)-100),
          ADEFRank: 0,
          TotalRank: 0,
          TotalDiff: (((this.state.Mains[x].ATK / this.state.LowestAtkGrowthStar[0])*100)-100)
          + (((this.state.Mains[x].HP / this.state.LowestHPGrowthStar[0])*100)-100)
          + (((this.state.Mains[x].PDEF / this.state.LowestPDEFGrowthStar[0])*100)-100)
          + (((this.state.Mains[x].ADEF / this.state.LowestADEFGrowthStar[0])*100)-100)
          ,
        },
        CombinedAll: {
          CombinedRank: 0,
          CombinedDiff: 0,
        }
      }
    );

    }

    this.state.SuppRankings.push(
      {
        Name: this.state.Supports[x].Name,
        Stats: this.state.Supports[x],
        Level: {
          ATKDiff: (((this.state.Supports[x].AtkGrowth / this.state.LowestAtkGrowthLevel[1])*100)-100),
          ATKRank: 0,
          HPDiff: (((this.state.Supports[x].HPGrowth / this.state.LowestHPGrowthLevel[1])*100)-100),
          HPRank: 0,
          PDEFDiff: (((this.state.Supports[x].PDefGrowth / this.state.LowestPDEFGrowthLevel[1])*100)-100),
          PDEFRank: 0,
          ADEFDiff: (((this.state.Supports[x].ADefGrowth / this.state.LowestADEFGrowthLevel[1])*100)-100),
          ADEFRank: 0,
          TotalRank: 0,
          TotalDiff: (((this.state.Supports[x].AtkGrowth / this.state.LowestAtkGrowthLevel[1])*100)-100)
          + (((this.state.Supports[x].HPGrowth / this.state.LowestHPGrowthLevel[1])*100)-100)
          + (((this.state.Supports[x].PDefGrowth / this.state.LowestPDEFGrowthLevel[1])*100)-100)
          + (((this.state.Supports[x].ADefGrowth / this.state.LowestADEFGrowthLevel[1])*100)-100)
          ,
        },
        Star: {
          ATKDiff: (((this.state.Supports[x].ATK / this.state.LowestAtkGrowthStar[1])*100)-100),
          ATKRank: 0,
          HPDiff: (((this.state.Supports[x].HP / this.state.LowestHPGrowthStar[1])*100)-100),
          HPRank: 0,
          PDEFDiff: (((this.state.Supports[x].PDEF / this.state.LowestPDEFGrowthStar[1])*100)-100),
          PDEFRank: 0,
          ADEFDiff: (((this.state.Supports[x].ADEF / this.state.LowestADEFGrowthStar[1])*100)-100),
          ADEFRank: 0,
          TotalRank: 0,
          TotalDiff: (((this.state.Supports[x].ATK / this.state.LowestAtkGrowthStar[1])*100)-100)
          + (((this.state.Supports[x].HP / this.state.LowestHPGrowthStar[1])*100)-100)
          + (((this.state.Supports[x].PDEF / this.state.LowestPDEFGrowthStar[1])*100)-100)
          + (((this.state.Supports[x].ADEF / this.state.LowestADEFGrowthStar[1])*100)-100)
          ,
        },
        CombinedAll: {
          CombinedRank: 0,
          CombinedDiff: 0,
        }
      }
    );
  }
  

 this.state.NameSortedMainRankings = Array.from(this.state.MainRankings);
 this.state.NameSortedSuppRankings = Array.from(this.state.SuppRankings);


 this.state.MainRankingsLevelAtkDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Level.ATKDiff - a.Level.ATKDiff));
 this.state.MainRankingsLevelHPDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Level.HPDiff - a.Level.HPDiff));
 this.state.MainRankingsLevelPDEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Level.PDEFDiff - a.Level.PDEFDiff));
 this.state.MainRankingsLevelADEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Level.ADEFDiff - a.Level.ADEFDiff));
 
 this.state.MainRankingsStarAtkDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Star.ATKDiff - a.Star.ATKDiff));
 this.state.MainRankingsStarHPDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Star.HPDiff - a.Star.HPDiff));
 this.state.MainRankingsStarPDEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Star.PDEFDiff - a.Star.PDEFDiff));
 this.state.MainRankingsStarADEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.Star.ADEFDiff - a.Star.ADEFDiff));


 this.state.SuppRankingsLevelAtkDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Level.ATKDiff - a.Level.ATKDiff));
 this.state.SuppRankingsLevelHPDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Level.HPDiff - a.Level.HPDiff));
 this.state.SuppRankingsLevelPDEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Level.PDEFDiff - a.Level.PDEFDiff));
 this.state.SuppRankingsLevelADEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Level.ADEFDiff - a.Level.ADEFDiff));
 
 this.state.SuppRankingsStarAtkDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Star.ATKDiff - a.Star.ATKDiff));
 this.state.SuppRankingsStarHPDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Star.HPDiff - a.Star.HPDiff));
 this.state.SuppRankingsStarPDEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Star.PDEFDiff - a.Star.PDEFDiff));
 this.state.SuppRankingsStarADEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.Star.ADEFDiff - a.Star.ADEFDiff));


  for(var x = 0; x < this.state.Supports.length; x++)  //Assigning Ranks
  {
    if(x < this.state.Mains.length) 
    {
      this.state.MainRankingsLevelAtkDiff[x].Level.ATKRank = x;
      this.state.MainRankingsLevelHPDiff[x].Level.HPRank = x;
      this.state.MainRankingsLevelPDEFDiff[x].Level.ADEFRank = x;
      this.state.MainRankingsLevelADEFDiff[x].Level.PDEFRank = x;
      
      this.state.MainRankingsStarAtkDiff[x].Star.ATKRank = x;
      this.state.MainRankingsStarHPDiff[x].Star.HPRank = x;
      this.state.MainRankingsStarPDEFDiff[x].Star.PDEFRank = x;
      this.state.MainRankingsStarADEFDiff[x].Star.ADEFRank = x;
     

    }
    this.state.SuppRankingsLevelAtkDiff[x].Level.ATKRank = x; 
    this.state.SuppRankingsLevelHPDiff[x].Level.HPRank = x; 
    this.state.SuppRankingsLevelPDEFDiff[x].Level.PDEFRank = x; 
    this.state.SuppRankingsLevelADEFDiff[x].Level.ADEFRank = x; 
    
    this.state.SuppRankingsStarAtkDiff[x].Star.ATKRank = x;
    this.state.SuppRankingsStarHPDiff[x].Star.HPRank = x;
    this.state.SuppRankingsStarPDEFDiff[x].Star.PDEFRank = x;
    this.state.SuppRankingsStarADEFDiff[x].Star.ADEFRank = x;

  }



  

  for(var x = 0; x < this.state.Mains.length; x++) //creating lists
  {
    var img = "https://i.imgur.com/L5yy5LQ.png";
    if(x < 18){img = "https://i.imgur.com/vIM4opt.png";}
    if(x < 9){img = "https://i.imgur.com/RgjHo1d.png";}
    if(x < 3){img = "https://i.imgur.com/mYygdJR.png";}
//mains level lists

this.state.ListMainsLevelATK.push(
      
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsLevelAtkDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image" src={this.state.MainRankingsLevelAtkDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsLevelAtkDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsLevelAtkDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelAtkDiff[x].Level.ATKDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelAtkDiff[x].Stats.AtkGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsLevelHP.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsLevelHPDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image" src={this.state.MainRankingsLevelHPDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsLevelHPDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsLevelHPDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelHPDiff[x].Level.HPDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelHPDiff[x].Stats.HPGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsLevelPDEF.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsLevelPDEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image" src={this.state.MainRankingsLevelPDEFDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsLevelPDEFDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsLevelPDEFDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelPDEFDiff[x].Level.PDEFDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelPDEFDiff[x].Stats.PDefGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsLevelADEF.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsLevelADEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image" src={this.state.MainRankingsLevelADEFDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsLevelADEFDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsLevelADEFDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelADEFDiff[x].Level.ADEFDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsLevelADEFDiff[x].Stats.ADefGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);

  
//mains star lists


this.state.ListMainsStarATK.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsStarAtkDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.MainRankingsStarAtkDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsStarAtkDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsStarAtkDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarAtkDiff[x].Star.ATKDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsStarHP.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsStarHPDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.MainRankingsStarHPDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsStarHPDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsStarHPDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarHPDiff[x].Star.HPDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarHPDiff[x].Stats.HPGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsStarPDEF.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsStarPDEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.MainRankingsStarPDEFDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsStarPDEFDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsStarPDEFDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarPDEFDiff[x].Star.PDEFDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarPDEFDiff[x].Stats.PDefGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);
this.state.ListMainsStarADEF.push(
  
  <tr>
  <td class="supports-stats-cell rank">
        {x+1}
  </td>
  <td class="supports-stats-cell change">
    
  </td>
  <td class="supports-stats-cell image">
    
  <a href={'/char/m/' + this.state.MainRankingsStarADEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.MainRankingsStarADEFDiff[x].Stats.Icon} alt=""/>
  </a>
  </td>
  <td class="supports-stats-cell name">
    <a >
      <div class="character-index-table-name">{this.state.MainRankingsStarADEFDiff[x].Name}</div>
      <div class="character-index-table-role">{this.state.MainRankingsStarADEFDiff[x].Stats.DmgType}</div>

    </a>
  </td>
  <td class="supports-stats-cell value">
    
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarADEFDiff[x].Star.ADEFDiff.toFixed(2)}%~
  </td>
  <td class="supports-stats-cell value">
  {this.state.MainRankingsStarADEFDiff[x].Stats.ADefGrowth.toFixed(2)}~
  </td>
  <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
  </td>
</tr>
);

  }

  
  for(var x = 0; x < this.state.Supports.length; x++) //creating lists
  {
    var img = "https://i.imgur.com/L5yy5LQ.png";
    if(x < 15){img = "https://i.imgur.com/vIM4opt.png";}
    if(x < 10){img = "https://i.imgur.com/RgjHo1d.png";}
    if(x < 5){img = "https://i.imgur.com/mYygdJR.png";}

    //support level lists

    this.state.ListSupportsLevelATK.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsLevelAtkDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image" src={this.state.SuppRankingsLevelAtkDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsLevelAtkDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsLevelAtkDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelAtkDiff[x].Level.ATKDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelAtkDiff[x].Stats.AtkGrowth.toFixed(2)}~
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsLevelHP.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsLevelHPDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsLevelHPDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsLevelHPDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsLevelHPDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelHPDiff[x].Level.HPDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelHPDiff[x].Stats.HPGrowth.toFixed(2)}~
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsLevelPDEF.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsLevelPDEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img  class="rankings-image" src={this.state.SuppRankingsLevelPDEFDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsLevelPDEFDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsLevelPDEFDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelPDEFDiff[x].Level.PDEFDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelPDEFDiff[x].Stats.PDefGrowth.toFixed(2)}~
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsLevelADEF.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsLevelADEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsLevelADEFDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsLevelADEFDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsLevelADEFDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelADEFDiff[x].Level.ADEFDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsLevelADEFDiff[x].Stats.ADefGrowth.toFixed(2)}~
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );

      
    //support star lists

    
    this.state.ListSupportsStarATK.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsStarAtkDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsStarAtkDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsStarAtkDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsStarAtkDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsStarAtkDiff[x].Star.ATKDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsStarHP.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsStarHPDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsStarHPDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsStarHPDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsStarHPDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsStarHPDiff[x].Star.HPDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsStarPDEF.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsStarPDEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsStarPDEFDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsStarPDEFDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsStarPDEFDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsStarPDEFDiff[x].Star.PDEFDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );
    this.state.ListSupportsStarADEF.push(
      
      <tr>
      <td class="supports-stats-cell rank">
        {x+1}
      </td>
      <td class="supports-stats-cell change">
        
      </td>
      <td class="supports-stats-cell image">
        
      <a href={'/char/s/' + this.state.SuppRankingsStarADEFDiff[x].Stats.Name.replace(" ", "_")}>
      <img class="rankings-image"  src={this.state.SuppRankingsStarADEFDiff[x].Stats.Icon} alt=""/>
      </a>
      </td>
      <td class="supports-stats-cell name">
        <a >
          <div class="character-index-table-name">{this.state.SuppRankingsStarADEFDiff[x].Name}</div>
          <div class="character-index-table-role">{this.state.SuppRankingsStarADEFDiff[x].Stats.DmgType}</div>

        </a>
      </td>
      <td class="supports-stats-cell value">
        
      </td>
      <td class="supports-stats-cell value">
      {this.state.SuppRankingsStarADEFDiff[x].Star.ADEFDiff.toFixed(2)}%~
      </td>
      <td class="supports-stats-cell value">
      </td>
      <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
      </td>
    </tr>
    );

  }



this.state.SuppRankingsStarAtkDiff.sort((a, b) => (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsStarHPDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsStarPDEFDiff.sort((a, b) => (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsStarADEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));

this.state.SuppRankingsLevelAtkDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsLevelHPDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsLevelPDEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.SuppRankingsLevelADEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));

this.state.MainRankingsStarAtkDiff.sort((a, b) => (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsStarHPDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsStarPDEFDiff.sort((a, b) => (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsStarADEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));

this.state.MainRankingsLevelAtkDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsLevelHPDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsLevelPDEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));
this.state.MainRankingsLevelADEFDiff.sort((a, b) =>  (a.Name > b.Name) - (a.Name < b.Name));


for(var x = 0; x < this.state.Supports.length; x++) //Going through supports to get combined
{
  if(x < this.state.Mains.length) //Going through mains to get combined
  {
    this.state.MainRankings[x].CombinedAll.CombinedDiff = this.state.MainRankings[x].Star.TotalDiff + this.state.MainRankings[x].Level.TotalDiff;
    this.state.MainRankings[x].CombinedAll.CombinedRank =  1 + 
    this.state.MainRankings[x].Level.ATKRank + 1 + 
    this.state.MainRankings[x].Level.HPRank +  1 + 
    this.state.MainRankings[x].Level.PDEFRank +  1 + 
    this.state.MainRankings[x].Level.ADEFRank +  1 + 
    this.state.MainRankings[x].Star.ATKRank +  1 + 
    this.state.MainRankings[x].Star.HPRank +  1 + 
    this.state.MainRankings[x].Star.PDEFRank +  1 + 
    this.state.MainRankings[x].Star.ADEFRank ;

    this.state.MainRankings[x].CombinedAll.CombinedATKDiff = this.state.MainRankings[x].Star.ATKDiff + this.state.MainRankings[x].Level.ATKDiff;
    this.state.MainRankings[x].CombinedAll.CombinedHPDiff = this.state.MainRankings[x].Star.HPDiff + this.state.MainRankings[x].Level.HPDiff;
    this.state.MainRankings[x].CombinedAll.CombinedPDEFDiff = this.state.MainRankings[x].Star.PDEFDiff + this.state.MainRankings[x].Level.PDEFDiff;
    this.state.MainRankings[x].CombinedAll.CombinedADEFDiff = this.state.MainRankings[x].Star.ADEFDiff + this.state.MainRankings[x].Level.ADEFDiff;

    
    this.state.MainRankings[x].CombinedAll.CombinedATKRank = this.state.MainRankings[x].Star.ATKRank + 1 + this.state.MainRankings[x].Level.ATKRank + 1;
    this.state.MainRankings[x].CombinedAll.CombinedHPRank = this.state.MainRankings[x].Star.HPRank  + 1+ this.state.MainRankings[x].Level.HPRank + 1;
    this.state.MainRankings[x].CombinedAll.CombinedPDEFRank = this.state.MainRankings[x].Star.PDEFRank  + 1+ this.state.MainRankings[x].Level.PDEFRank + 1;
    this.state.MainRankings[x].CombinedAll.CombinedADEFRank = this.state.MainRankings[x].Star.ADEFRank  + 1+ this.state.MainRankings[x].Level.ADEFRank + 1;
    

  }

  
  this.state.SuppRankings[x].CombinedAll.CombinedDiff = this.state.SuppRankings[x].Star.TotalDiff + this.state.SuppRankings[x].Level.TotalDiff;
  this.state.SuppRankings[x].CombinedAll.CombinedRank =  1 + 
  this.state.SuppRankings[x].Level.ATKRank +  1 + 
  this.state.SuppRankings[x].Level.HPRank +  1 + 
  this.state.SuppRankings[x].Level.PDEFRank +  1 + 
  this.state.SuppRankings[x].Level.ADEFRank +  1 + 
  this.state.SuppRankings[x].Star.ATKRank +  1 + 
  this.state.SuppRankings[x].Star.HPRank +  1 + 
  this.state.SuppRankings[x].Star.PDEFRank +  1 + 
  this.state.SuppRankings[x].Star.ADEFRank ;


  this.state.SuppRankings[x].CombinedAll.CombinedATKDiff = this.state.SuppRankings[x].Star.ATKDiff + this.state.SuppRankings[x].Level.ATKDiff;
  this.state.SuppRankings[x].CombinedAll.CombinedHPDiff = this.state.SuppRankings[x].Star.HPDiff + this.state.SuppRankings[x].Level.HPDiff;
  this.state.SuppRankings[x].CombinedAll.CombinedPDEFDiff = this.state.SuppRankings[x].Star.PDEFDiff + this.state.SuppRankings[x].Level.PDEFDiff;
  this.state.SuppRankings[x].CombinedAll.CombinedADEFDiff = this.state.SuppRankings[x].Star.ADEFDiff + this.state.SuppRankings[x].Level.ADEFDiff; 

  this.state.SuppRankings[x].CombinedAll.CombinedATKRank = this.state.SuppRankings[x].Star.ATKRank + 1 +  this.state.SuppRankings[x].Level.ATKRank + 1;
  this.state.SuppRankings[x].CombinedAll.CombinedHPRank = this.state.SuppRankings[x].Star.HPRank  + 1 + this.state.SuppRankings[x].Level.HPRank  + 1;
  this.state.SuppRankings[x].CombinedAll.CombinedPDEFRank = this.state.SuppRankings[x].Star.PDEFRank + 1 + this.state.SuppRankings[x].Level.PDEFRank + 1;
  this.state.SuppRankings[x].CombinedAll.CombinedADEFRank = this.state.SuppRankings[x].Star.ADEFRank + 1 + this.state.SuppRankings[x].Level.ADEFRank + 1;


}



 this.state.MainRankingsCombinedAtkDiff = Array.from(this.state.MainRankings.sort((a, b) => b.CombinedAll.CombinedATKDiff - a.CombinedAll.CombinedATKDiff));
 this.state.MainRankingsCombinedHPDiff = Array.from(this.state.MainRankings.sort((a, b) => b.CombinedAll.CombinedHPDiff - a.CombinedAll.CombinedHPDiff));
 this.state.MainRankingsCombinedPDEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.CombinedAll.CombinedPDEFDiff - a.CombinedAll.CombinedPDEFDiff));
 this.state.MainRankingsCombinedADEFDiff = Array.from(this.state.MainRankings.sort((a, b) => b.CombinedAll.CombinedADEFDiff - a.CombinedAll.CombinedADEFDiff));


 this.state.SuppRankingsCombinedAtkDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.CombinedAll.CombinedATKDiff - a.CombinedAll.CombinedATKDiff));
 this.state.SuppRankingsCombinedHPDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.CombinedAll.CombinedHPDiff - a.CombinedAll.CombinedHPDiff));
 this.state.SuppRankingsCombinedPDEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.CombinedAll.CombinedPDEFDiff - a.CombinedAll.CombinedPDEFDiff));
 this.state.SuppRankingsCombinedADEFDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.CombinedAll.CombinedADEFDiff - a.CombinedAll.CombinedADEFDiff));

 
 this.state.MainRankingsCombinedAtkRank = Array.from(this.state.MainRankings.sort((a, b) => a.CombinedAll.CombinedATKRank - b.CombinedAll.CombinedATKRank));
 this.state.MainRankingsCombinedHPRank = Array.from(this.state.MainRankings.sort((a, b) => a.CombinedAll.CombinedHPRank - b.CombinedAll.CombinedHPRank));
 this.state.MainRankingsCombinedPDEFRank = Array.from(this.state.MainRankings.sort((a, b) => a.CombinedAll.CombinedPDEFRank - b.CombinedAll.CombinedPDEFRank));
 this.state.MainRankingsCombinedADEFRank = Array.from(this.state.MainRankings.sort((a, b) => a.CombinedAll.CombinedADEFRank - b.CombinedAll.CombinedADEFRank));


 this.state.SuppRankingsCombinedAtkRank = Array.from(this.state.SuppRankings.sort((a, b) => a.CombinedAll.CombinedATKRank - b.CombinedAll.CombinedATKRank));
 this.state.SuppRankingsCombinedHPRank = Array.from(this.state.SuppRankings.sort((a, b) => a.CombinedAll.CombinedHPRank - b.CombinedAll.CombinedHPRank));
 this.state.SuppRankingsCombinedPDEFRank = Array.from(this.state.SuppRankings.sort((a, b) => a.CombinedAll.CombinedPDEFRank - b.CombinedAll.CombinedPDEFRank));
 this.state.SuppRankingsCombinedADEFRank = Array.from(this.state.SuppRankings.sort((a, b) => a.CombinedAll.CombinedADEFRank - b.CombinedAll.CombinedADEFRank));


 for(var x = 0; x < this.state.Supports.length; x++) //creating lists
 {


  var img = "https://i.imgur.com/L5yy5LQ.png";
  if(x < 15){img = "https://i.imgur.com/vIM4opt.png";}
  if(x < 10){img = "https://i.imgur.com/RgjHo1d.png";}
  if(x < 5){img = "https://i.imgur.com/mYygdJR.png";}

   //support combined lists

   this.state.ListSupportsCombinedATKRank.push(
     
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedAtkRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image" src={this.state.SuppRankingsCombinedAtkRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedAtkRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedAtkRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedAtkRank[x].CombinedAll.CombinedATKDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedAtkRank[x].CombinedAll.CombinedATKRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListSupportsCombinedHPRank.push(
    
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedHPRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.SuppRankingsCombinedHPRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedHPRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedHPRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedHPRank[x].CombinedAll.CombinedHPDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedHPRank[x].CombinedAll.CombinedHPRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListSupportsCombinedPDEFRank.push(
    
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedPDEFRank[x].Stats.Name.replace(" ", "_")}>
    <img  class="rankings-image" src={this.state.SuppRankingsCombinedPDEFRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedPDEFRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedPDEFRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedPDEFRank[x].CombinedAll.CombinedPDEFDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedPDEFRank[x].CombinedAll.CombinedPDEFRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListSupportsCombinedADEFRank.push(
    
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedADEFRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.SuppRankingsCombinedADEFRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedADEFRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedADEFRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedADEFRank[x].CombinedAll.CombinedADEFDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedADEFRank[x].CombinedAll.CombinedADEFRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );


 }

 

 for(var x = 0; x < this.state.Mains.length; x++) //creating main list
 {


  var img = "https://i.imgur.com/L5yy5LQ.png";
  if(x < 18){img = "https://i.imgur.com/vIM4opt.png";}
  if(x < 9){img = "https://i.imgur.com/RgjHo1d.png";}
  if(x < 3){img = "https://i.imgur.com/mYygdJR.png";}

   //main combined lists

   this.state.ListMainsCombinedATKRank.push(
     
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedAtkRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image" src={this.state.MainRankingsCombinedAtkRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedAtkRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedAtkRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedAtkRank[x].CombinedAll.CombinedATKDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedAtkRank[x].CombinedAll.CombinedATKRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListMainsCombinedHPRank.push(
    
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedHPRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.MainRankingsCombinedHPRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedHPRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedHPRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedHPRank[x].CombinedAll.CombinedHPDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedHPRank[x].CombinedAll.CombinedHPRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListMainsCombinedPDEFRank.push(
    
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedPDEFRank[x].Stats.Name.replace(" ", "_")}>
    <img  class="rankings-image" src={this.state.MainRankingsCombinedPDEFRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedPDEFRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedPDEFRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedPDEFRank[x].CombinedAll.CombinedPDEFDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedPDEFRank[x].CombinedAll.CombinedPDEFRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListMainsCombinedADEFRank.push(
    
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedADEFRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.MainRankingsCombinedADEFRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedADEFRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedADEFRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedADEFRank[x].CombinedAll.CombinedADEFDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedADEFRank[x].CombinedAll.CombinedADEFRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );


 }


 
 this.state.SuppRankingsCombinedRank = Array.from(this.state.SuppRankings.sort((a, b) => a.CombinedAll.CombinedRank - b.CombinedAll.CombinedRank));
 this.state.MainRankingsCombinedRank = Array.from(this.state.MainRankings.sort((a, b) => a.CombinedAll.CombinedRank - b.CombinedAll.CombinedRank));
 
 this.state.SuppRankingsCombinedDiff = Array.from(this.state.SuppRankings.sort((a, b) => b.CombinedAll.CombinedDiff - a.CombinedAll.CombinedDiff));
 this.state.MainRankingsCombinedDiff = Array.from(this.state.MainRankings.sort((a, b) => b.CombinedAll.CombinedDiff - a.CombinedAll.CombinedDiff));


 
 for(var x = 0; x < this.state.Supports.length; x++) //creating supports lists
 {

   //support total lists

   var img = "https://i.imgur.com/L5yy5LQ.png";
   if(x < 15){img = "https://i.imgur.com/vIM4opt.png";}
   if(x < 10){img = "https://i.imgur.com/RgjHo1d.png";}
   if(x < 5){img = "https://i.imgur.com/mYygdJR.png";}

   this.state.ListSuppRankingsCombinedRank.push(
     
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image" src={this.state.SuppRankingsCombinedRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedRank[x].CombinedAll.CombinedDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedRank[x].CombinedAll.CombinedRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListSuppRankingsCombinedDiff.push(
    
    <tr>
    <td class="supports-stats-cell rank">
      {x+1}
    </td>
    <td class="supports-stats-cell change">
      
    </td>
    <td class="supports-stats-cell image">
      
    <a href={'/char/s/' + this.state.SuppRankingsCombinedDiff[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.SuppRankingsCombinedDiff[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="supports-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.SuppRankingsCombinedDiff[x].Name}</div>
        <div class="character-index-table-role">{this.state.SuppRankingsCombinedDiff[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="supports-stats-cell value">
      
    </td>
    <td class="supports-stats-cell value">
    {this.state.SuppRankingsCombinedDiff[x].CombinedAll.CombinedDiff.toFixed(2)}%~
    </td>
    <td class="supports-stats-cell value">
      {this.state.SuppRankingsCombinedDiff[x].CombinedAll.CombinedRank}
    </td>
    <td class="supports-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );


 }
 
 for(var x = 0; x < this.state.Mains.length; x++) //creating mains lists
 {

   //main total lists

   var img = "https://i.imgur.com/L5yy5LQ.png";
   if(x < 18){img = "https://i.imgur.com/vIM4opt.png";}
   if(x < 9){img = "https://i.imgur.com/RgjHo1d.png";}
   if(x < 3){img = "https://i.imgur.com/mYygdJR.png";}

   this.state.ListMainRankingsCombinedRank.push(
     
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedRank[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image" src={this.state.MainRankingsCombinedRank[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedRank[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedRank[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedRank[x].CombinedAll.CombinedDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedRank[x].CombinedAll.CombinedRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );
  this.state.ListMainRankingsCombinedDiff.push(
    
    <tr>
    <td class="main-stats-cell rank">
      {x+1}
    </td>
    <td class="main-stats-cell change">
      
    </td>
    <td class="main-stats-cell image">
      
    <a href={'/char/m/' + this.state.MainRankingsCombinedDiff[x].Stats.Name.replace(" ", "_")}>
    <img class="rankings-image"  src={this.state.MainRankingsCombinedDiff[x].Stats.Icon} alt=""/>
    </a>
    </td>
    <td class="main-stats-cell name">
      <a >
        <div class="character-index-table-name">{this.state.MainRankingsCombinedDiff[x].Name}</div>
        <div class="character-index-table-role">{this.state.MainRankingsCombinedDiff[x].Stats.DmgType}</div>

      </a>
    </td>
    <td class="main-stats-cell value">
      
    </td>
    <td class="main-stats-cell value">
    {this.state.MainRankingsCombinedDiff[x].CombinedAll.CombinedDiff.toFixed(2)}%~
    </td>
    <td class="main-stats-cell value">
      {this.state.MainRankingsCombinedDiff[x].CombinedAll.CombinedRank}
    </td>
    <td class="main-stats-cell value">
      <img class="tier-image" src={img} alt=""/>
    </td>
  </tr>
  );



 }
          //console.log(this.state.ListMainRankingsCombinedDiff);

  };


}

export default Statistics;
