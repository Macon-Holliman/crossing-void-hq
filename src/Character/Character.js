import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Character.scss';
import Chart from "chart.js";
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');
let mainsSkills = require('../Data/AllMainMoves.json');
let supportsSkills = require('../Data/AllSupportMoves.json');
let TalentsAndAwakenings = require('../Data/TalentsAndAwakenings.json');


class Character extends Component {

  componentDidMount()
  {
    //Getting needed height for animation
    window.addEventListener('load', (event) => { 
      this.getAbilitiesHeight();
    });

    this.state.MainAwakenings = TalentsAndAwakenings.filter(a => a.Role == "Main");
    this.state.SupportAwakenings = TalentsAndAwakenings.filter(a => a.Role == "Support");

    if(this.props.match.params.role != "s" && this.props.match.params.role != "m" )
    {
      //Re-routing to m role
      this.props.match.params.role = "m";
    }
    //Setting Initial Menus//////////////////
    this.props.match.params.name = this.props.match.params.name .replace("_", " ");
    if(this.props.match.params.role == "s" && this.state.Supports.filter(a => a.Name == this.props.match.params.name).length == 0 ||
    this.props.match.params.role == "m" && this.state.Mains.filter(a => a.Name == this.props.match.params.name).length == 0 )
    {
    //Re-routing to Ako
    this.props.match.params.name = "Ako";
    }

    if(this.props.match.params.role == "s" && this.props.match.params.name != "") //Load Support
    {
      var all = document.getElementsByClassName("main-info");
      for(var x = 0; x < all.length;x++){all[x].style.display = 'none';}
      var all = document.getElementsByClassName("exclusive-talent-indicator");
      for(var x = 0; x < all.length;x++){all[x].style.display = 'none';}

      var all = document.getElementsByClassName("exclusive-talent-wrapper");
      for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
      var all = document.getElementsByClassName("awakenings-wrapper");
      for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}

      this.state.Type = "Support";
      this.state.Awakening = this.state.SupportAwakenings.filter(a => a.Name == this.props.match.params.name)[0];
      
      
      let foundSkill = /(.*?):/.exec(this.state.Awakening.AwakeningThree);
      foundSkill = foundSkill[1];
      this.state.Awakening.AwakeningThree = this.state.Awakening.AwakeningThree.replace(foundSkill+':', '');
      var all = document.getElementsByClassName("awakening-skill-three");
      for(var x = 0; x < all.length;x++){all[x].innerHTML = foundSkill;}

      
      var all = document.getElementsByClassName("awakening-skill-one");
      for(var x = 0; x < all.length;x++){all[x].style.border = 'none';all[x].style.backgroundColor = 'unset';}
      var all = document.getElementsByClassName("awakening-skill-five");
      for(var x = 0; x < all.length;x++){all[x].style.border = 'none';all[x].style.backgroundColor = 'unset';}

      var all = document.getElementsByClassName("awakening-info-text");
      all[0].className = "awakening-info-text-fixed";
      all[1].className = "awakening-info-text-fixed";


      

      var all = document.getElementsByClassName("awakening-info");
      all[0].style.width = '14%';
      all[1].style.width = '14%';
      all[2].style.width = '23%';
      all[3].style.width = '14%';
      all[4].style.width = '14%';
      var all = document.getElementsByClassName("awakening-info-text-fixed");
      for(var x = 0; x < all.length;x++){all[x].style.fontSize = '.8em';}


      this.LoadCharacter(this.props.match.params.name);


      this.state.SortByATK = Array.from(this.state.Supports.sort((a, b) => b.AtkGrowth - a.AtkGrowth));
      this.state.SortByHP = Array.from(this.state.Supports.sort((a, b) => b.HPGrowth - a.HPGrowth));
      this.state.SortByADEF = Array.from(this.state.Supports.sort((a, b) => b.ADefGrowth - a.ADefGrowth));
      this.state.SortByPDEF = Array.from(this.state.Supports.sort((a, b) => b.PDefGrowth - a.PDefGrowth));
      
      this.state.Max = this.state.Supports.length;

      for(var x = 0; x < this.state.Supports.length; x++)
      {
        if(this.state.ATKGrowth == this.state.SortByATK[x].AtkGrowth && this.state.ATKRankTie == "")
        {
          this.state.ATKRank = x+1;
          if(this.state.SortByATK[x+1]!= undefined && this.state.SortByATK[x+1].AtkGrowth == this.state.ATKGrowth){this.state.ATKRankTie = "Tied at: "}
        }
        
        if(this.state.HPGrowth == this.state.SortByHP[x].HPGrowth && this.state.HPRankTie == "")
        {
          this.state.HPRank = x+1;
          if(this.state.SortByHP[x+1]!= undefined && this.state.SortByHP[x+1].HPGrowth == this.state.HPGrowth){this.state.HPRankTie = "Tied at: "}
        }
        if(this.state.PDEFGrowth == this.state.SortByPDEF[x].PDefGrowth && this.state.PDEFRankTie == "")
        {
          this.state.PDEFRank = x+1;
          if(this.state.SortByPDEF[x+1]!= undefined && this.state.SortByPDEF[x+1].PDef == this.state.PDEFGrowth){this.state.PDEFRankTie = "Tied at: "}
        }
        
        if(this.state.ADEFGrowth == this.state.SortByADEF[x].ADefGrowth && this.state.ADEFRankTie == "")
        {
          this.state.ADEFRank = x+1;
          if(this.state.SortByADEF[x+1]!= undefined && this.state.SortByADEF[x+1].ADef == this.state.ADEFGrowth){this.state.ADEFRankTie = "Tied at: "}
        }

      }
        this.state.SortByATK = Array.from(this.state.Supports.sort((a, b) => b.ATK - a.ATK));
        this.state.SortByHP = Array.from(this.state.Supports.sort((a, b) => b.HP - a.HP));
        this.state.SortByADEF = Array.from(this.state.Supports.sort((a, b) => b.ADEF - a.ADEF));
        this.state.SortByPDEF = Array.from(this.state.Supports.sort((a, b) => b.PDEF - a.PDEF));

        for(var x = 0; x < this.state.Supports.length; x++)
        {
          if(this.state.ATK == this.state.SortByATK[x].ATK && this.state.ATKStarRankTie == "")
          {
            this.state.ATKStarRank = x+1;
            if(this.state.SortByATK[x+1]!= undefined && this.state.SortByATK[x+1].ATK == this.state.ATK){this.state.ATKStarRankTie = "Tied at: "}
          }
          
          if(this.state.HP == this.state.SortByHP[x].HP && this.state.HPStarRankTie == "")
          {
            this.state.HPStarRank = x+1;
            if(this.state.SortByHP[x+1]!= undefined && this.state.SortByHP[x+1].HP == this.state.HP){this.state.HPStarRankTie = "Tied at: "}
          }
          if(this.state.PDEF == this.state.SortByPDEF[x].PDEF && this.state.PDEFStarRankTie == "")
          {
            this.state.PDEFStarRank = x+1;
            if(this.state.SortByPDEF[x+1]!= undefined && this.state.SortByPDEF[x+1].PDEF == this.state.PDEF){this.state.PDEFStarRankTie = "Tied at: "}
          }
          
          if(this.state.ADEF == this.state.SortByADEF[x].ADEF && this.state.ADEFStarRankTie == "")
          {
            this.state.ADEFStarRank = x+1;
            if(this.state.SortByADEF[x+1]!= undefined && this.state.SortByADEF[x+1].ADEF == this.state.ADEF){this.state.ADEFStarRankTie = "Tied at: "}
          }
  
      }
      this.setState({
        HPGrowth: this.state.HPGrowth.toFixed(2),
        ATKGrowth: this.state.ATKGrowth.toFixed(2),
        PDEFGrowth: this.state.PDEFGrowth.toFixed(2),
        ADEFGrowth: this.state.ADEFGrowth.toFixed(2),
        HP: this.state.HP.toFixed(2),
        ATK: this.state.ATK.toFixed(2),
        PDEF: this.state.PDEF.toFixed(2),
        ADEF: this.state.ADEF.toFixed(2),
      });
    }
    
    if(this.props.match.params.role == "m" && this.props.match.params.name != "") //Load Main
    {

      
      var all = document.getElementsByClassName("exclusive-talent-wrapper");
      for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
      var all = document.getElementsByClassName("awakenings-wrapper");
      for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}

      var all = document.getElementsByClassName("supp-info");
      for(var x = 0; x < all.length;x++){all[x].style.display = 'none';}
      var all = document.getElementsByClassName("stat-rankings");
      for(var x = 0; x < all.length;x++){all[x].style.marginRight = '44%';}
      this.state.Type = "Main";
      this.state.Awakening = this.state.MainAwakenings.filter(a => a.Name == this.props.match.params.name)[0];
      this.state.Talent = this.state.MainAwakenings.filter(a => a.Name == this.props.match.params.name)[0];

      
      let foundSkill = /(.*?):/.exec(this.state.Awakening.AwakeningOne);
      foundSkill = foundSkill[1];
      this.state.Awakening.AwakeningOne = this.state.Awakening.AwakeningOne.replace(foundSkill+':', '');
      var all = document.getElementsByClassName("awakening-skill-one");
      for(var x = 0; x < all.length;x++){all[x].innerHTML = foundSkill;}
      
      foundSkill = /(.*?):/.exec(this.state.Awakening.AwakeningThree);
      foundSkill = foundSkill[1];
      this.state.Awakening.AwakeningThree = this.state.Awakening.AwakeningThree.replace(foundSkill+':', '');
      all = document.getElementsByClassName("awakening-skill-three");
      for(var x = 0; x < all.length;x++){all[x].innerHTML = foundSkill;}

      foundSkill = /(.*?):/.exec(this.state.Awakening.AwakeningFive);
      foundSkill = foundSkill[1];
      this.state.Awakening.AwakeningFive = this.state.Awakening.AwakeningFive.replace(foundSkill+':', '');
      all = document.getElementsByClassName("awakening-skill-five");
      for(var x = 0; x < all.length;x++){all[x].innerHTML = foundSkill;}


      var all = document.getElementsByClassName("awakening-info");
      all[0].style.width = '23%';
      all[1].style.width = '14%';
      all[2].style.width = '23%';
      all[3].style.width = '14%';
      all[4].style.width = '23%';
      var all = document.getElementsByClassName("awakening-info-text-fixed");
      for(var x = 0; x < all.length;x++){all[x].style.fontSize = '.8em';}

      this.LoadCharacter(this.props.match.params.name);
      this.state.SortByATK = Array.from(this.state.Mains.sort((a, b) => b.AtkGrowth - a.AtkGrowth));
      this.state.SortByHP = Array.from(this.state.Mains.sort((a, b) => b.HPGrowth - a.HPGrowth));
      this.state.SortByADEF = Array.from(this.state.Mains.sort((a, b) => b.ADefGrowth - a.ADefGrowth));
      this.state.SortByPDEF = Array.from(this.state.Mains.sort((a, b) => b.PDefGrowth - a.PDefGrowth));

      this.state.Max = this.state.Mains.length;

      for(var x = 0; x < this.state.Mains.length; x++)
      {
        if(this.state.ATKGrowth == this.state.SortByATK[x].AtkGrowth && this.state.ATKRankTie == "")
        {
          this.state.ATKRank = x+1;
          if(this.state.SortByATK[x+1]!= undefined && this.state.SortByATK[x+1].AtkGrowth == this.state.ATKGrowth){this.state.ATKRankTie = "Tied at: "}
        }
        
        if(this.state.HPGrowth == this.state.SortByHP[x].HPGrowth && this.state.HPRankTie == "")
        {
          this.state.HPRank = x+1;
          if(this.state.SortByHP[x+1]!= undefined && this.state.SortByHP[x+1].HPGrowth == this.state.HPGrowth){this.state.HPRankTie = "Tied at: "}
        }
        if(this.state.PDEFGrowth == this.state.SortByPDEF[x].PDefGrowth && this.state.PDEFRankTie == "")
        {
          this.state.PDEFRank =  x+1;
          if(this.state.SortByPDEF[x+1]!= undefined && this.state.SortByPDEF[x+1].PDef == this.state.PDEFGrowth){this.state.PDEFRankTie = "Tied at: "}
        }
        
        if(this.state.ADEFGrowth == this.state.SortByADEF[x].ADefGrowth && this.state.ADEFRankTie == "")
        {
          this.state.ADEFRank =  x+1;
          if(this.state.SortByADEF[x+1]!= undefined && this.state.SortByADEF[x+1].ADef == this.state.ADEFGrowth){this.state.ADEFRankTie = "Tied at: "}
        }



      }
      this.setState({
        HPGrowth: this.state.HPGrowth.toFixed(2),
        ATKGrowth: this.state.ATKGrowth.toFixed(2),
        PDEFGrowth: this.state.PDEFGrowth.toFixed(2),
        ADEFGrowth: this.state.ADEFGrowth.toFixed(2),
      });
    }

    var ChartAtk = this.state.Max - this.state.ATKRank;
    var ChartHP = this.state.Max - this.state.HPRank; 
    var ChartPDEF = this.state.Max - this.state.PDEFRank;
    var ChartADEF = this.state.Max - this.state.ADEFRank;
    
    var ctx = document.getElementById('statRadar').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ATK', 'HP', 'PDEF', 'ADEF'],
            datasets: [{
                label: 'Comparative Ranking',
                data: [ChartAtk,ChartHP,ChartPDEF,ChartADEF],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 4,
                borderJoinStyle: "miter",
                pointRadius: 10,
            }]
        },
        options: {
          tooltips: {enabled: false},
          hover: {mode: null},
          legend: {
            fontSize: 30,
            fontColor: 'white',
            labels: {
              fontSize: 30,
              fontColor: 'white',
            },
          },
          scale: {
            gridLines: {
              color: 'white'
           },
            pointLabels:{
              fontSize: 30,
              fontColor: 'white'
            },
              angleLines: {
                  display: false,
                  fontSize: 130,
                  fontColor: 'white',
              },
              ticks: {
                  fontSize: 0,
                  fontColor: 'white',
                  suggestedMin: 0,
                  suggestedMax: this.state.Max
              },
          }
      }
    });

    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
      Mains: names,
      Supports: supports,
      MainSkills: mainsSkills,
      SupportSkills: supportsSkills,
      MainAwakenings: [],
      SupportAwakenings: [],
      showTalent: false,
      showAwakenings: false,
      showAbilities: false,
      showCrossAbilities: false,
      Awakening: {},
      Talent: {},
      ListAbilities: [],
      ListCrossAbilities: [],
      AbilitiesNeededHeight: 0,
      CrossNeededHeight: 0,
      SortByAtk: [],
      SortByHP: [],
      CharImage: "",
      CharName: "",
      CharSpeed: "",
      SortByPDEF: [],
      SortByADEF: [],
      ATK: 0,
      HP: 0,
      PDEF: 0,
      ADEF: 0,
      ATKStarRank: "",
      HPStarRank: "",
      PDEFStarRank: "",
      ADEFStarRank: "",
      ATKGrowth: 0,
      HPGrowth: 0,
      PDEFGrowth: 0,
      ADEFGrowth: 0,
      ATKRank: "",
      HPRank: "",
      PDEFRank: "",
      ADEFRank: "",
      Max: 0,
      ATKStarRankTie: "",
      HPStarRankTie: "",
      PDEFStarRankTie: "",
      ADEFStarRankTie: "",
      ATKRankTie: "",
      HPRankTie: "",
      PDEFRankTie: "",
      ADEFRankTie: "",
      Type: "",
      Moves: [],
      CrossMoves: [],
    };
    
  }

  render() {

  return (
      
    <div class="character-wrapper">
      <div class="character-content">
        <div class="character-content-stats">
          <div class="character-content-left">

            <div class="character-image" style={{'background-image':'url(' + this.state.CharImage + ')'}}>

            <h1 class="char-name-info">{this.state.CharName}</h1> 
            <h1 class="char-speed-info">Speed: {this.state.CharSpeed}</h1> 
            </div>

  
<canvas id="statRadar" width="400" height="400" class="stat-radar"></canvas>
         
</div>
          <div class="character-content-left">
            <section class="stat-rankings" >
  <h1>Level Growth</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Growth</th>
          <th>Rank</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr>
          <td>HP</td>
          <td>{this.state.HPGrowth}</td>
          <td>{this.state.HPRankTie}{this.state.HPRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Attack</td>
          <td>{this.state.ATKGrowth}</td>
          <td>{this.state.ATKRankTie}{this.state.ATKRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Physical Def</td>
          <td>{this.state.PDEFGrowth}</td>
          <td>{this.state.PDEFRankTie}{this.state.PDEFRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Arcane Def</td>
          <td>{this.state.ADEFGrowth}</td>
          <td>{this.state.ADEFRankTie}{this.state.ADEFRank}/{this.state.Max}</td>
        </tr>
        
      </tbody>
    </table>

    
  </div>
</section>
<section class="stat-rankings supp-info" >
  <h1>Star Growth</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Rank</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
        <tr>
          <td>HP</td>
          <td>{this.state.HPStarRankTie}{this.state.HPStarRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Attack</td>
          <td>{this.state.ATKStarRankTie}{this.state.ATKStarRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Physical Def</td>
          <td>{this.state.PDEFStarRankTie}{this.state.PDEFStarRank}/{this.state.Max}</td>
        </tr>
        <tr>
          <td>Arcane Def</td>
          <td>{this.state.ADEFStarRankTie}{this.state.ADEFStarRank}/{this.state.Max}</td>
        </tr>
        
      </tbody>
    </table>

    
  </div>
</section>
<div class="main-info-wrapper">
<div class="main-info">

          Star Growth isn't very relevant for charting differences for Main characters, as Star growths have a direct correlation to Level Growth for all Mains.
          This, however, isn't true for Supports who diverge with unique growths for each.


</div>
</div>

          </div>
          <h1 onClick={() => { this.ShowExclusiveTalent()}} class="exclusive-talent-indicator">Exclusive Talent<span class="show-more-plus-talent">Show More +</span></h1>
          <div class="exclusive-talent-wrapper">
            <div class="exclusive-talent-info">
              <div class="exclusive-talent-info-top">
                {this.state.Awakening.TalentName}
              </div>
              <div class="exclusive-talent-info-bottom">
                {this.state.Awakening.TalentInfo}
              </div>
            </div>
          </div>

          <h1 onClick={() => { this.ShowAwakenings()}} class="awakenings-indicator">Awakenings<span class="show-more-plus-awakening">Show More +</span></h1>
          <div class="awakenings-wrapper">

            <div class="awakening-info">
            <span class="awakening-info-inner">
              1
            </span>
              <span class="highlight awakening-skill-one"></span>
              <div class="awakening-info-text">
              {this.state.Awakening.AwakeningOne}

              </div>
            </div>
            <div class="awakening-info">
            <span class="awakening-info-inner">
              2

            </span>
              <div class="awakening-info-text-fixed">
              {this.state.Awakening.AwakeningTwo}

              </div>
            </div>
            <div class="awakening-info">
            <span class="awakening-info-inner">
              3

            </span>
              <span class="highlight awakening-skill-three"></span>
              <div class="awakening-info-text">
                <span class="main-specific">Awakening Card + Art<br/></span>
                {this.state.Awakening.AwakeningThree}

              </div>
            </div>
            <div class="awakening-info">
            <span class="awakening-info-inner">
              4

            </span>
              <div class="awakening-info-text-fixed">
                <span class="main-specific">Awakening Hue<br/></span>
              {this.state.Awakening.AwakeningFour}

              </div>
            </div>
            <div class="awakening-info">
            <span class="awakening-info-inner">
              5

            </span>
              <span class="highlight awakening-skill-five"></span>
              <div class="awakening-info-text">
                <span class="main-specific">Awakening Icon<br/></span>
                {this.state.Awakening.AwakeningFive}

              </div>
            </div>

          </div>


          <h1  onClick={() => { this.ShowAbilities()}} class="skills-indicator">Abilities<span class="show-more-plus-abilities">Show More +</span></h1>
<div  class="abilities-wrapper">
{this.state.ListAbilities}





</div>

<h1  onClick={() => { this.ShowCrossAbilities()}} class="cross-skills-indicator">Cross Skills<span class="show-more-plus-cross">Show More +</span></h1>
<div class="abilities-cross-wrapper">
{this.state.ListCrossAbilities}


</div>


          </div>

      </div>

      
    </div>

    
    );
  }
  
 ShowExclusiveTalent = ()  =>{

  if(!this.state.showTalent)
  {
    this.state.showTalent = !this.state.showTalent;
    var all = document.getElementsByClassName("exclusive-talent-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '114px';}
    var all = document.getElementsByClassName("exclusive-talent-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '100%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.51)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 4px #637a84';
      all[x].style.borderTop = '2px solid';
      all[x].style.borderBottom = '2px solid';
      all[x].style.borderLeft = '0px';
      all[x].style.borderRight = '0px';
    }
    var all = document.getElementsByClassName("show-more-plus-talent");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show Less -";
      all[x].style.left = "-220px";
    }
  }
  else
  {
    this.state.showTalent = !this.state.showTalent;
    var all = document.getElementsByClassName("exclusive-talent-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
    var all = document.getElementsByClassName("exclusive-talent-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '';
      all[x].style.backgroundColor = '';
      all[x].style.boxShadow = '';
      all[x].style.border = '1px solid';
    }
    var all = document.getElementsByClassName("show-more-plus-talent");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show More +";
      all[x].style.left = "-15px";
    }
  }

 }

 getAbilitiesHeight = () => {
   
  var all = document.getElementsByClassName("abilities-wrapper");
  this.state.AbilitiesNeededHeight = all[0].clientHeight;
  all[0].style.height = '0px';
  all[0].style.zIndex = '0';
  var all = document.getElementsByClassName("abilities-cross-wrapper");
  this.state.CrossNeededHeight = all[0].clientHeight;
  all[0].style.height = '0px';
  all[0].style.zIndex = '0';
 }

 ShowAwakenings = ()  =>{
  
  if(!this.state.showAwakenings)
  {
    this.state.showAwakenings = !this.state.showAwakenings;
    var all = document.getElementsByClassName("awakenings-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '135px';}
    var all = document.getElementsByClassName("awakenings-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '100%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.51)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 4px #637a84';
      all[x].style.borderTop = '2px solid';
      all[x].style.borderBottom = '2px solid';
      all[x].style.borderLeft = '0px';
      all[x].style.borderRight = '0px';
    }
    var all = document.getElementsByClassName("show-more-plus-awakening");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show Less -";
      all[x].style.left = "-220px";
    }
  }
  else
  {
    this.state.showAwakenings = !this.state.showAwakenings;
    var all = document.getElementsByClassName("awakenings-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
    var all = document.getElementsByClassName("awakenings-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '';
      all[x].style.backgroundColor = '';
      all[x].style.boxShadow = '';
      all[x].style.border = '1px solid';
    }
    var all = document.getElementsByClassName("show-more-plus-awakening");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show More +";
      all[x].style.left = "-15px";
    }
  }
 }
 ShowAbilities = ()  =>{
  
  if(!this.state.showAbilities)
  {
    this.state.showAbilities = !this.state.showAbilities;
    var all = document.getElementsByClassName("abilities-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = this.state.AbilitiesNeededHeight.toString()+'px';}
    var all = document.getElementsByClassName("skills-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '100%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.51)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 4px #637a84';
      all[x].style.borderTop = '2px solid';
      all[x].style.borderBottom = '2px solid';
      all[x].style.borderLeft = '0px';
      all[x].style.borderRight = '0px';
    }
    var all = document.getElementsByClassName("show-more-plus-abilities");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show Less -";
      all[x].style.left = "-220px";
    }
  }
  else
  {
    this.state.showAbilities = !this.state.showAbilities;
    var all = document.getElementsByClassName("abilities-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
    var all = document.getElementsByClassName("skills-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '';
      all[x].style.backgroundColor = '';
      all[x].style.boxShadow = '';
      all[x].style.border = '1px solid';
    }
    var all = document.getElementsByClassName("show-more-plus-abilities");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show More +";
      all[x].style.left = "-15px";
    }
  }
 }
 
 ShowCrossAbilities = ()  =>{
  
  if(!this.state.showCrossAbilities)
  {
    this.state.showCrossAbilities = !this.state.showCrossAbilities;
    var all = document.getElementsByClassName("abilities-cross-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = this.state.CrossNeededHeight.toString()+'px';}
    var all = document.getElementsByClassName("cross-skills-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '100%';
      all[x].style.backgroundColor = 'rgba(59, 130, 236, 0.51)';
      all[x].style.boxShadow = 'inset 0px 0px 6px 4px #637a84';
      all[x].style.borderTop = '2px solid';
      all[x].style.borderBottom = '2px solid';
      all[x].style.borderLeft = '0px';
      all[x].style.borderRight = '0px';
    }
    var all = document.getElementsByClassName("show-more-plus-cross");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show Less -";
      all[x].style.left = "-220px";
    }
  }
  else
  {
    this.state.showCrossAbilities = !this.state.showCrossAbilities;
    var all = document.getElementsByClassName("abilities-cross-wrapper");
    for(var x = 0; x < all.length;x++){all[x].style.height = '0px';}
    var all = document.getElementsByClassName("cross-skills-indicator");
    for(var x = 0; x < all.length;x++){
      all[x].style.width = '';
      all[x].style.backgroundColor = '';
      all[x].style.boxShadow = '';
      all[x].style.border = '1px solid';
    }
    var all = document.getElementsByClassName("show-more-plus-cross");
    for(var x = 0; x < all.length;x++){
      all[x].innerHTML = "Show More +";
      all[x].style.left = "-15px";
    }
  }
 }
  
 LoadCharacter = (Name)  =>{
   var Data = "";
  if(this.state.Type == "Main")
  {
    Data = this.state.Mains.filter(a => a.Name == Name);
    this.state.ATKGrowth = Data[0].AtkGrowth;
    this.state.HPGrowth = Data[0].HPGrowth;
    this.state.PDEFGrowth = Data[0].PDefGrowth;
    this.state.ADEFGrowth = Data[0].ADefGrowth;
    this.state.ADEF = Data[0].ADEF;
    this.state.PDEF = Data[0].PDEF;
    this.state.ATK = Data[0].ATK;
    this.state.HP = Data[0].HP;
    this.state.CharSpeed = Data[0].Speed;
    this.state.CharImage = Data[0].Image;
    this.state.CharName = Data[0].Name;
    var moves = this.state.MainSkills.filter(a => a.Name == Name);
    var crossMoves = this.state.SupportSkills.filter(a => a.Partner == Name);
    for(var x = 0; x < crossMoves.length; x++)
    {
      var icon = this.state.Supports.filter(a => a.Name == crossMoves[x].Name);
      crossMoves[x].Icon = icon[0].Icon;
      crossMoves[x].PartnerHere = icon[0].Name;
    }
  }
  else
  {
    var Data = this.state.Supports.filter(a => a.Name == Name);
    this.state.ATKGrowth = Data[0].AtkGrowth;
    this.state.HPGrowth = Data[0].HPGrowth;
    this.state.PDEFGrowth = Data[0].PDefGrowth;
    this.state.ADEFGrowth = Data[0].ADefGrowth;
    this.state.ADEF = Data[0].ADEF;
    this.state.PDEF = Data[0].PDEF;
    this.state.ATK = Data[0].ATK;
    this.state.HP = Data[0].HP;
    this.state.CharSpeed = Data[0].Speed;
    this.state.CharImage = Data[0].Image;
    this.state.CharName = Data[0].Name;
    var moves = this.state.SupportSkills.filter(a => a.Name == Name && a.Partner == "No");
    var crossMoves = this.state.SupportSkills.filter(a => a.Name == Name && a.Partner != "No");
    for(var x = 0; x < crossMoves.length; x++)
    {
      var icon = this.state.Mains.filter(a => a.Name == crossMoves[x].Partner);
      crossMoves[x].Icon = icon[0].Icon;
      crossMoves[x].PartnerHere = icon[0].Name;
    }
    

  }



  for(var x = 0; x < moves.length; x++)
  {
    
    var skill = [];

    var CostType = "CP";
    if(moves[x].SkillNumber < 3)
    {
      CostType = "SP";
    }
    if(moves[x].CostType == "CP")
    {
      CostType = "CP";
    }
    else if(moves[x].CostType == "SP")
    {
      CostType = "SP";
    }
    if(moves[x].Partner == "No")
    {
      moves[x].SkillNumber = 4;
    }

    if(moves[x].Seal == "TRUE")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Seal",
        }
      );

    }
    if(moves[x].P != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Physical",
          GrowthType: growthType,
          Base: moves[x].P.toFixed(2),
          Growth: moves[x].PGrowth.toFixed(2),
          Max: (moves[x].P + (moves[x].PGrowth * 24)).toFixed(2),
        }
      );

    }
    if(moves[x].A != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Arcane",
          GrowthType: growthType,
          Base: moves[x].A.toFixed(2),
          Growth: moves[x].AGrowth.toFixed(2),
          Max: (moves[x].A + (moves[x].AGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Bleed != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Bleed",
          GrowthType: growthType,
          Base: moves[x].Bleed.toFixed(2),
          Growth: moves[x].BleedGrowth.toFixed(2),
          Duration: moves[x].BleedDuration.toFixed(0),
          Max: (moves[x].Bleed + (moves[x].BleedGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Dmgup != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Damage Up",
          GrowthType: growthType,
          Base: moves[x].Dmgup.toFixed(2),
          Growth: moves[x].DmgupGrowth.toFixed(2),
          Duration: moves[x].DmgupDuration.toFixed(0),
          Buffs:  moves[x].DmgupTarget,
          Max: (moves[x].Dmgup + (moves[x].DmgupGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].HDot != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Heal Over Time",
          GrowthType: growthType,
          Base: moves[x].HDot.toFixed(2),
          Growth: moves[x].HDotGrowth.toFixed(2),
          Duration: moves[x].HDotDuration.toFixed(0),
          Buffs: moves[x].HDotTargets,
          Max: (moves[x].HDot + (moves[x].HDotGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Defup != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Defense Up",
          GrowthType: growthType,
          Base: moves[x].Defup.toFixed(2),
          Growth: moves[x].DefupGrowth.toFixed(2),
          Duration: moves[x].DefupDuration.toFixed(0),
          Max: (moves[x].Defup + (moves[x].DefupGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Deathproof != "" && moves[x].Deathproof != undefined)
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Deathproof",
          GrowthType: growthType,
          Base: moves[x].Deathproof.toFixed(2),
          Growth: moves[x].DeathproofGrowth.toFixed(2),
          Duration: moves[x].DeathproofDuration.toFixed(0),
          Max: (moves[x].Deathproof + (moves[x].DeathproofGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Shield != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Shield",
          GrowthType: growthType,
          Base: moves[x].ShieldAmount.toFixed(2),
          Growth: moves[x].ShieldGrowth.toFixed(2),
          Duration: moves[x].ShieldDuration.toFixed(0),
          Buffs: moves[x].Shield,
          Max: (moves[x].ShieldAmount + (moves[x].ShieldGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].W != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Wound",
          GrowthType: growthType,
          Base: moves[x].W.toFixed(2),
          Growth: moves[x].WGrowth.toFixed(2),
          Duration: moves[x].WDuration.toFixed(0),
          Max: (moves[x].W + (moves[x].WGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Dispel != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Dispel",
          Type: moves[x].Dispel,
          Num: moves[x].DispelNum,
        }
      );
    }
    if(moves[x].Purify != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Purify",
          Type: moves[x].Purify,
          Num: moves[x].PurifyNum,
        }
      );
    }
    if(moves[x].F != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Frail",
          GrowthType: growthType,
          Base: moves[x].F.toFixed(2),
          Growth: moves[x].FGrowth.toFixed(2),
          Duration: moves[x].FDuration.toFixed(0),
          Max: (moves[x].F + (moves[x].FGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Backfire != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Backfire",
          GrowthType: growthType,
          Base: moves[x].Backfire.toFixed(2),
          Growth: moves[x].BackfireGrowth.toFixed(2),
          Duration: moves[x].BackfireDuration.toFixed(0),
          Max: (moves[x].Backfire + (moves[x].BackfireGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].H != "")
    {
      var growthType = "";
      if(moves[x].Partner == undefined)
      {
        growthType = "Level";
      }
      skill.push(
        {
          Stat: "Heal",
          GrowthType: growthType,
          Base: moves[x].H.toFixed(2),
          Growth: moves[x].HGrowth.toFixed(2),
          Max: (moves[x].H + (moves[x].HGrowth * 24)).toFixed(2),
        }
      );
    }
    if(moves[x].Info != "")
    {
      skill.push(
        {
          Stat: "Extra Info",
          Message: moves[x].Info,
        }
      );
    }

var color = "#4089a5";  //"#9e8f30"

var front = "#4a2320";
var middle = "#4a2320";
var rear = "#4a2320";

//if that target is hit, set that position to #89b177

if((moves[x].Hits).toString().includes('1')){front = "#89b177"}
if((moves[x].Hits).toString().includes('2')){middle = "#89b177"}
if((moves[x].Hits).toString().includes('3')){rear = "#89b177"}

if(CostType == "CP")
{
  color = "rgb(173, 138, 26)";
}

//Move name, hits, name, etc
this.state.ListAbilities.push(
  
  <div class="upper-wrapper">
  <div class="ability-top">
    
  <span class="ability-user-picture" style={{'background-image': 'url(' + Data[0].Icon + ')'}}>
    
  </span>
  <span class="ability-user-name">
    {this.state.CharName}
    
  </span>
  <span class="ability-name">
    {moves[x].SkillName}
  </span>
  <div class="ability-type">
    {moves[x].Type}
  </div>
  <div class="ability-cost" style={{'background-color': color}}>
    {CostType}:{moves[x].Cost}
  </div>
  <div class="ability-slot">
    Skill [{moves[x].SkillNumber}]
  </div>
  
  </div>
  <div class="ability-skill-hits">
    
  <span class="ability-target-left" style={{'background-color': front}}>
    Front
  </span>
  <span class="ability-target-middle" style={{'background-color': middle}}>
    Middle
  </span>
  <span class="ability-target-right" style={{'background-color': rear}}>
    Rear
  </span>
  
  </div>

  </div>

);

for(var y = 0; y < skill.length; y++)
{
  
if(skill[y].Stat == "Seal")
{
  //Stat type
  this.state.ListAbilities.push( 
    
    <div class="ability-skill-info">
      
    <span class="ability-info-full">
    {skill[y].Stat}
    </span>
    
    </div>
  
  );
}
else if(skill[y].Stat == "Arcane" ||
skill[y].Stat == "Physical" ||
skill[y].Stat == "Heal"
)
{
  
//Stat type
this.state.ListAbilities.push( 
  
  <div class="ability-skill-info">
    
  <span class="ability-info ability-info-inner">
  {skill[y].Stat}
  </span>
  <span class="ability-info ability-info-inner">
  {skill[y].GrowthType} Growth
  </span>
  <span class="ability-info">
    Max
  </span>
  
  </div>

);
//Growth for that stat
this.state.ListAbilities.push(
  
  <div class="ability-skill-info">
    
  <span class="ability-info ability-info-inner">
  {skill[y].Base}%
  </span>
  <span class="ability-info ability-info-inner">
  +{skill[y].Growth}%
  </span>
  <span class="ability-info">
  {skill[y].Max}%
  </span>
  
  </div>

);

}
else if(skill[y].Stat == "Bleed" ||
skill[y].Stat == "Frail"||
skill[y].Stat == "Backfire"||
skill[y].Stat == "Wound"||
skill[y].Stat == "Defense Up"||
skill[y].Stat == "Deathproof"
)
{
  
//Stat type
this.state.ListAbilities.push( 
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt ability-info-inner">
  {skill[y].Stat}
  </span>
  <span class="ability-info-alt ability-info-inner">
  {skill[y].GrowthType} Growth
  </span>
  <span class="ability-info-alt ability-info-inner">
   Duration
  </span>
  <span class="ability-info-alt">
    Max
  </span>
  
  </div>

);
//Growth for that stat
this.state.ListAbilities.push(
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt ability-info-inner">
  {skill[y].Base}%
  </span>
  <span class="ability-info-alt ability-info-inner">
  +{skill[y].Growth}%
  </span>
  <span class="ability-info-alt ability-info-inner">
  {skill[y].Duration}
  </span>
  <span class="ability-info-alt">
  {skill[y].Max}%
  </span>
  
  </div>

);

}
else if(skill[y].Stat == "Damage Up" ||
skill[y].Stat == "Shield" ||
skill[y].Stat == "Heal Over Time"
)
{

//Stat type
this.state.ListAbilities.push( 
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-five ability-info-inner">
  {skill[y].Stat}
  </span>
  <span class="ability-info-alt-five ability-info-inner">
  {skill[y].GrowthType} Growth
  </span>
  <span class="ability-info-alt-five ability-info-inner">
   Duration
  </span>
  <span class="ability-info-alt-five ability-info-inner">
   Buffs
  </span>
  <span class="ability-info-alt-five">
    Max
  </span>
  
  </div>

);
//Growth for that stat
this.state.ListAbilities.push(
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-five ability-info-inner">
  {skill[y].Base}%
  </span>
  <span class="ability-info-alt-five ability-info-inner">
  +{skill[y].Growth}%
  </span>
  <span class="ability-info-alt-five ability-info-inner">
  {skill[y].Duration}
  </span>
  <span class="ability-info-alt-five ability-info-inner">
  {skill[y].Buffs}
  </span>
  <span class="ability-info-alt-five">
  {skill[y].Max}%
  </span>
  
  </div>

);
}
else if(skill[y].Stat == "Dispel" ||
skill[y].Stat == "Purify" 
)
{

//Stat type
this.state.ListAbilities.push( 
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-two ability-info-inner">
  {skill[y].Stat}
  </span>
  <span class="ability-info-alt-two">
    How Many
  </span>
  
  </div>

);
//Growth for that stat
this.state.ListAbilities.push(
  
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-two ability-info-inner">
  {skill[y].Type}
  </span>
  <span class="ability-info-alt-two">
  {skill[y].Num}
  </span>
  
  </div>

);
}
else if(skill[y].Stat == "Extra Info")
{
  this.state.ListAbilities.push( 
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-full ability-info-inner">
  {skill[y].Message}
  </span>
  
  </div>
  );

}

}
}

//Cross Moves

for(var x = 0; x < crossMoves.length; x++)
{
  
  var skill = [];

  var CostType = "CP";
  if(crossMoves[x].CostType == "SP")
  {
    CostType = "SP";
  }
  crossMoves[x].SkillNumber = 5;
  

  var growthType = "Star";


  if(crossMoves[x].Seal == "TRUE")
  {
    skill.push(
      {
        Stat: "Seal",
      }
    );
  }
  if(crossMoves[x].P != "")
  {
    skill.push(
      {
        Stat: "Physical",
        GrowthType: growthType,
        Base: crossMoves[x].P.toFixed(2),
        Growth: crossMoves[x].PStar.toFixed(2),
        Max: (crossMoves[x].P + (crossMoves[x].PStar * 10)).toFixed(2),
      }
    );

  }
  if(crossMoves[x].A != "")
  {
    skill.push(
      {
        Stat: "Arcane",
        GrowthType: growthType,
        Base: crossMoves[x].A.toFixed(2),
        Growth: crossMoves[x].AStar.toFixed(2),
        Max: (crossMoves[x].A + (crossMoves[x].AStar * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Bleed != "" && crossMoves[x].Bleed != "0")
  {
    skill.push(
      {
        Stat: "Bleed",
        GrowthType: growthType,
        Base: crossMoves[x].Bleed.toFixed(2),
        Growth: crossMoves[x].BleedByStar.toFixed(2),
        Duration: crossMoves[x].BleedDuration.toFixed(0),
        Max: (crossMoves[x].Bleed + (crossMoves[x].BleedByStar * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].SelfBleed != "" && crossMoves[x].SelfBleed != undefined)
  {
    skill.push(
      {
        Stat: "Bleed Allies",
        GrowthType: growthType,
        Base: crossMoves[x].SelfBleed.toFixed(2),
        Growth: crossMoves[x].SelfBleedByStar.toFixed(2),
        Duration: crossMoves[x].SelfBleedDuration.toFixed(0),
        Max: (crossMoves[x].SelfBleed + (crossMoves[x].SelfBleedByStar * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Dmgup != "")
  {
    skill.push(
      {
        Stat: "Damage Up",
        GrowthType: growthType,
        Base: crossMoves[x].Dmgup.toFixed(2),
        Growth: crossMoves[x].DmgupGrowth.toFixed(2),
        Duration: crossMoves[x].DmgupDuration.toFixed(0),
        Buffs:  crossMoves[x].DmgupTarget,
        Max: (crossMoves[x].Dmgup + (crossMoves[x].DmgupGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].HDot != "")
  {
    skill.push(
      {
        Stat: "Heal Over Time",
        GrowthType: growthType,
        Base: crossMoves[x].HDot.toFixed(2),
        Growth: crossMoves[x].HDotGrowth.toFixed(2),
        Duration: crossMoves[x].HDotDuration.toFixed(0),
        Buffs: crossMoves[x].HDotTargets.toFixed(0),
        Max: (crossMoves[x].HDot + (crossMoves[x].HDotGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Defup != "")
  {
    skill.push(
      {
        Stat: "Defense Up",
        GrowthType: growthType,
        Base: crossMoves[x].Defup.toFixed(2),
        Growth: crossMoves[x].DefupGrowth.toFixed(2),
        Duration: crossMoves[x].DefupDuration.toFixed(0),
        Max: (crossMoves[x].Defup + (crossMoves[x].DefupGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].CDUp != "")
  {
    skill.push(
      {
        Stat: "Crit Dmg Up",
        GrowthType: growthType,
        Base: crossMoves[x].CDUp.toFixed(2),
        Growth: crossMoves[x].CDUpGrowth.toFixed(2),
        Duration: crossMoves[x].CDUpDuration.toFixed(0),
        Max: (crossMoves[x].CDUp + (crossMoves[x].CDUpGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Shield != "")
  {
    skill.push(
      {
        Stat: "Shield",
        GrowthType: growthType,
        Base: crossMoves[x].ShieldAmount.toFixed(2),
        Growth: crossMoves[x].ShieldGrowth.toFixed(2),
        Duration: crossMoves[x].ShieldDuration.toFixed(0),
        Buffs: crossMoves[x].Shield,
        Max: (crossMoves[x].ShieldAmount + (crossMoves[x].ShieldGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].W != "")
  {
    skill.push(
      {
        Stat: "Wound",
        GrowthType: growthType,
        Base: crossMoves[x].W.toFixed(2),
        Growth: crossMoves[x].WGrowth.toFixed(2),
        Duration: crossMoves[x].WDuration.toFixed(0),
        Max: (crossMoves[x].W + (crossMoves[x].WGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Dispel != "")
  {
    skill.push(
      {
        Stat: "Dispel",
        Type: crossMoves[x].Dispel,
        Num: crossMoves[x].DispelNum,
      }
    );
  }
  if(crossMoves[x].Purify != "")
  {
    skill.push(
      {
        Stat: "Purify",
        Type: crossMoves[x].Purify,
        Num: crossMoves[x].PurifyNum,
      }
    );
  }
  if(crossMoves[x].F != "")
  {
    skill.push(
      {
        Stat: "Frail",
        GrowthType: growthType,
        Base: crossMoves[x].F.toFixed(2),
        Growth: crossMoves[x].FGrowth.toFixed(2),
        Duration: crossMoves[x].FDuration.toFixed(0),
        Max: (crossMoves[x].F + (crossMoves[x].FGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Backfire != "")
  {
    skill.push(
      {
        Stat: "Backfire",
        GrowthType: growthType,
        Base: crossMoves[x].Backfire.toFixed(2),
        Growth: crossMoves[x].BackfireGrowth.toFixed(2),
        Duration: crossMoves[x].BackfireDuration.toFixed(0),
        Max: (crossMoves[x].Backfire + (crossMoves[x].BackfireGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].EnemyH != "")
  {
    skill.push(
      {
        Stat: "Heal All Enemies",
        GrowthType: growthType,
        Base: crossMoves[x].EnemyH.toFixed(2),
        Growth: crossMoves[x].EnemyHGrowth.toFixed(2),
        Max: (crossMoves[x].EnemyH + (crossMoves[x].EnemyHGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].H != "")
  {
    skill.push(
      {
        Stat: "Heal",
        GrowthType: growthType,
        Base: crossMoves[x].H.toFixed(2),
        Growth: crossMoves[x].HGrowth.toFixed(2),
        Max: (crossMoves[x].H + (crossMoves[x].HGrowth * 10)).toFixed(2),
      }
    );
  }
  if(crossMoves[x].Info != "")
  {
    skill.push(
      {
        Stat: "Extra Info",
        Message: crossMoves[x].Info,
      }
    );
  }

var color = "#4089a5";  

var front = "#4a2320";
var middle = "#4a2320";
var rear = "#4a2320";


if((crossMoves[x].Hits).toString().includes('1')){front = "#89b177"}
if((crossMoves[x].Hits).toString().includes('2')){middle = "#89b177"}
if((crossMoves[x].Hits).toString().includes('3')){rear = "#89b177"}

if(CostType == "CP")
{
color = "rgb(173, 138, 26)";
}

//Move name, hits, name, etc
this.state.ListCrossAbilities.push(

<div class="upper-wrapper">
<div class="ability-top">
  
<span class="ability-user-picture" style={{'background-image': 'url(' + crossMoves[x].Icon + ')'}}>
  
</span>
<span class="ability-user-name">
  {crossMoves[x].PartnerHere}
  
</span>
<span class="ability-name">
  {crossMoves[x].SkillName}
</span>
<div class="ability-type">
  {crossMoves[x].Type}
</div>
<div class="ability-cost" style={{'background-color': color}}>
  {CostType}:{crossMoves[x].Cost}
</div>
<div class="ability-slot">
  Cross
</div>

</div>
<div class="ability-skill-hits">
  
<span class="ability-target-left" style={{'background-color': front}}>
  Front
</span>
<span class="ability-target-middle" style={{'background-color': middle}}>
  Middle
</span>
<span class="ability-target-right" style={{'background-color': rear}}>
  Rear
</span>

</div>

</div>

);

for(var y = 0; y < skill.length; y++)
{

  if(skill[y].Stat == "Seal")
{
  //Stat type
  this.state.ListCrossAbilities.push( 
  
  <div class="ability-skill-info">
    
  <span class="ability-info-full">
  {skill[y].Stat}
  </span>
  
  </div>
  
  );
}
else if(skill[y].Stat == "Arcane" ||
skill[y].Stat == "Physical" ||
skill[y].Stat == "Heal All Enemies"||
skill[y].Stat == "Heal"
)
{

//Stat type
this.state.ListCrossAbilities.push( 

<div class="ability-skill-info">
  
<span class="ability-info ability-info-inner">
{skill[y].Stat}
</span>
<span class="ability-info ability-info-inner">
{skill[y].GrowthType} Growth
</span>
<span class="ability-info">
  Max
</span>

</div>

);
//Growth for that stat
this.state.ListCrossAbilities.push(

<div class="ability-skill-info">
  
<span class="ability-info ability-info-inner">
{skill[y].Base}%
</span>
<span class="ability-info ability-info-inner">
+{skill[y].Growth}%
</span>
<span class="ability-info">
{skill[y].Max}%
</span>

</div>

);

}
else if(skill[y].Stat == "Bleed" ||
skill[y].Stat == "Frail"||
skill[y].Stat == "Backfire"||
skill[y].Stat == "Wound"||
skill[y].Stat == "Defense Up"||
skill[y].Stat == "Crit Dmg Up" ||
skill[y].Stat == "Bleed Allies"
)
{

//Stat type
this.state.ListCrossAbilities.push( 

<div class="ability-skill-info">
  
<span class="ability-info-alt ability-info-inner">
{skill[y].Stat}
</span>
<span class="ability-info-alt ability-info-inner">
{skill[y].GrowthType} Growth
</span>
<span class="ability-info-alt ability-info-inner">
 Duration
</span>
<span class="ability-info-alt">
  Max
</span>

</div>

);
//Growth for that stat
this.state.ListCrossAbilities.push(

<div class="ability-skill-info">
  
<span class="ability-info-alt ability-info-inner">
{skill[y].Base}%
</span>
<span class="ability-info-alt ability-info-inner">
+{skill[y].Growth}%
</span>
<span class="ability-info-alt ability-info-inner">
{skill[y].Duration}
</span>
<span class="ability-info-alt">
{skill[y].Max}%
</span>

</div>

);

}
else if(skill[y].Stat == "Damage Up" ||
skill[y].Stat == "Heal Over Time"||
skill[y].Stat == "Shield"
)
{

//Stat type
this.state.ListCrossAbilities.push( 

<div class="ability-skill-info">
  
<span class="ability-info-alt-five ability-info-inner">
{skill[y].Stat}
</span>
<span class="ability-info-alt-five ability-info-inner">
{skill[y].GrowthType} Growth
</span>
<span class="ability-info-alt-five ability-info-inner">
 Duration
</span>
<span class="ability-info-alt-five ability-info-inner">
 Buffs
</span>
<span class="ability-info-alt-five">
  Max
</span>

</div>

);
//Growth for that stat
this.state.ListCrossAbilities.push(

<div class="ability-skill-info">
  
<span class="ability-info-alt-five ability-info-inner">
{skill[y].Base}%
</span>
<span class="ability-info-alt-five ability-info-inner">
+{skill[y].Growth}%
</span>
<span class="ability-info-alt-five ability-info-inner">
{skill[y].Duration}
</span>
<span class="ability-info-alt-five ability-info-inner">
{skill[y].Buffs}
</span>
<span class="ability-info-alt-five">
{skill[y].Max}%
</span>

</div>

);
}
else if(skill[y].Stat == "Dispel" ||
skill[y].Stat == "Purify" 
)
{

//Stat type
this.state.ListCrossAbilities.push( 

<div class="ability-skill-info">
  
<span class="ability-info-alt-two ability-info-inner">
{skill[y].Stat}
</span>
<span class="ability-info-alt-two">
  How Many
</span>

</div>

);
//Growth for that stat
this.state.ListCrossAbilities.push(

<div class="ability-skill-info">
  
<span class="ability-info-alt-two ability-info-inner">
{skill[y].Type}
</span>
<span class="ability-info-alt-two">
{skill[y].Num}
</span>

</div>

);
}
else if(skill[y].Stat == "Extra Info")
{
  this.state.ListCrossAbilities.push( 
  <div class="ability-skill-info">
    
  <span class="ability-info-alt-full ability-info-inner">
  {skill[y].Message}
  </span>
  
  </div>
  );

}


}




}















  this.setState({
    ListAbilities: this.state.ListAbilities,
    ListCrossAbilities: this.state.ListCrossAbilities,
  });



 }


}

export default Character;
