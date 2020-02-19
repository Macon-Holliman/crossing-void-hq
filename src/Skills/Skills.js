import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
import './Skills.scss';

import ReactDOMServer from "react-dom/server";
var ReactDOM = require('react-dom')

let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');
let mainsStats = require('../Data/MainStats.json');
let supportsStats = require('../Data/SuppStats.json');
let mainsSkills = require('../Data/MainSkills.json');
let supportsSkills = require('../Data/SupportSkills.json');
let skillData = require('../Data/SkillData.json');


class Skills extends Component {

  componentDidMount()
  {
    
    //Getting Stat Sticks//////////////////
    
    this.AssignImages();
    this.FindStatSticks();
    this.CreateMainStatSticks();
    this.CreateSuppStatSticks();
    this.CreateCombinations();

    this.CalculateDPS(this.state.MainCharactersHighStatStick);
    this.CalculateDPS(this.state.MainCharactersMedStatStick);
    this.CalculateDPS(this.state.MainCharactersLowStatStick);

    this.CalculateDPS(this.state.SuppCharactersHighStatStick);
    this.CalculateDPS(this.state.SuppCharactersMedStatStick);
    this.CalculateDPS(this.state.SuppCharactersLowStatStick);
    
    this.CalculateDPS(this.state.BothCharactersCrossSkill);
    this.CalculateDPS(this.state.BothCharactersCrossSkillClimax);

    //splice all alt variations into a new array
    
    this.state.AltMainCharactersHighStatStick = this.state.MainCharactersHighStatStick;
    this.state.MainCharactersHighStatStick = this.state.MainCharactersHighStatStick.filter(a => a.Alt == undefined);

    this.state.AltMainCharactersMedStatStick = this.state.MainCharactersMedStatStick;
    this.state.MainCharactersMedStatStick = this.state.MainCharactersMedStatStick.filter(a => a.Alt == undefined);

    this.state.AltMainCharactersLowStatStick = this.state.MainCharactersLowStatStick;
    this.state.MainCharactersLowStatStick = this.state.MainCharactersLowStatStick.filter(a => a.Alt == undefined);



    this.state.AltBothCharactersCrossSkill = this.state.BothCharactersCrossSkill;
    this.state.BothCharactersCrossSkill = this.state.BothCharactersCrossSkill.filter(a => a.Alt == undefined);


    this.state.AltBothCharactersCrossSkillClimax = this.state.BothCharactersCrossSkillClimax;
    this.state.BothCharactersCrossSkillClimax = this.state.BothCharactersCrossSkillClimax.filter(a => a.Alt == undefined);



    this.state.ListBothCharactersCrossSkillClimax =  this.CreateList(this.state.BothCharactersCrossSkillClimax, this.state.ListBothCharactersCrossSkillClimax, "CLIMAX");
    
    this.state.CrossCostTwelveClimax = this.state.ListBothCharactersCrossSkillClimax[12];

    
    this.state.ListAltBothCharactersCrossSkillClimax =  this.CreateList(this.state.AltBothCharactersCrossSkillClimax, this.state.ListAltBothCharactersCrossSkillClimax, "ALTCLIMAX");
    
    this.state.AltCrossCostTwelveClimax = this.state.ListAltBothCharactersCrossSkillClimax[12];

    


    this.state.ListBothCharactersCrossSkill =  this.CreateList(this.state.BothCharactersCrossSkill, this.state.ListBothCharactersCrossSkill);

    this.state.CrossCostThree = this.state.ListBothCharactersCrossSkill[3];
    this.state.CrossCostFour = this.state.ListBothCharactersCrossSkill[4];
    this.state.CrossCostFive = this.state.ListBothCharactersCrossSkill[5];
    this.state.CrossCostSix = this.state.ListBothCharactersCrossSkill[6];

    
    this.state.ListAltBothCharactersCrossSkill =  this.CreateList(this.state.AltBothCharactersCrossSkill, this.state.ListAltBothCharactersCrossSkill, "ALT");
    
    this.state.AltCrossCostThree = this.state.ListAltBothCharactersCrossSkill[3];
    this.state.AltCrossCostFour = this.state.ListAltBothCharactersCrossSkill[4];
    this.state.AltCrossCostFive = this.state.ListAltBothCharactersCrossSkill[5];
    this.state.AltCrossCostSix = this.state.ListAltBothCharactersCrossSkill[6];





    this.state.ListSuppCharactersHighStatStick = this.CreateList(this.state.SuppCharactersHighStatStick, this.state.ListSuppCharactersHighStatStick);

    this.state.SuppCostZeroHighStatStick = this.state.ListSuppCharactersHighStatStick[0];
    this.state.SuppCostTwoHighStatStick = this.state.ListSuppCharactersHighStatStick[2];
    this.state.SuppCostThreeHighStatStick = this.state.ListSuppCharactersHighStatStick[3];
    this.state.SuppCostFourHighStatStick = this.state.ListSuppCharactersHighStatStick[4];
    this.state.SuppCostFiveHighStatStick = this.state.ListSuppCharactersHighStatStick[5];

    
    this.state.ListSuppCharactersMedStatStick = this.CreateList(this.state.SuppCharactersMedStatStick, this.state.ListSuppCharactersMedStatStick);

    this.state.SuppCostZeroMedStatStick = this.state.ListSuppCharactersMedStatStick[0];
    this.state.SuppCostTwoMedStatStick = this.state.ListSuppCharactersMedStatStick[2];
    this.state.SuppCostThreeMedStatStick = this.state.ListSuppCharactersMedStatStick[3];
    this.state.SuppCostFourMedStatStick = this.state.ListSuppCharactersMedStatStick[4];
    this.state.SuppCostFiveMedStatStick = this.state.ListSuppCharactersMedStatStick[5];

    
    this.state.ListSuppCharactersLowStatStick = this.CreateList(this.state.SuppCharactersLowStatStick, this.state.ListSuppCharactersLowStatStick);

    this.state.SuppCostZeroLowStatStick = this.state.ListSuppCharactersLowStatStick[0];
    this.state.SuppCostTwoLowStatStick = this.state.ListSuppCharactersLowStatStick[2];
    this.state.SuppCostThreeLowStatStick = this.state.ListSuppCharactersLowStatStick[3];
    this.state.SuppCostFourLowStatStick = this.state.ListSuppCharactersLowStatStick[4];
    this.state.SuppCostFiveLowStatStick = this.state.ListSuppCharactersLowStatStick[5];
    
    
    this.state.ListCharactersHighStatStickClimax = this.CreateList(this.state.MainCharactersHighStatStick, this.state.ListMainCharactersHighStatStick, "CLIMAX");

    this.state.CharactersEightHighStatStickClimax = this.state.ListCharactersHighStatStickClimax[8];
    this.state.CharactersTenHighStatStickClimax =  this.state.ListCharactersHighStatStickClimax[10];
    this.state.CharactersTwelveHighStatStickClimax =  this.state.ListCharactersHighStatStickClimax[12];
    this.state.CharactersSixteenHighStatStickClimax =  this.state.ListCharactersHighStatStickClimax[16];

    
    this.state.ListCharactersMedStatStickClimax = this.CreateList(this.state.MainCharactersMedStatStick, this.state.ListMainCharactersMedStatStick, "CLIMAX");

    this.state.CharactersEightMedStatStickClimax = this.state.ListCharactersMedStatStickClimax[8];
    this.state.CharactersTenMedStatStickClimax =  this.state.ListCharactersMedStatStickClimax[10];
    this.state.CharactersTwelveMedStatStickClimax =  this.state.ListCharactersMedStatStickClimax[12];
    this.state.CharactersSixteenMedStatStickClimax =  this.state.ListCharactersMedStatStickClimax[16];

    
    this.state.ListCharactersLowStatStickClimax = this.CreateList(this.state.MainCharactersLowStatStick, this.state.ListMainCharactersLowStatStick, "CLIMAX");

    this.state.CharactersEightLowStatStickClimax = this.state.ListCharactersLowStatStickClimax[8];
    this.state.CharactersTenLowStatStickClimax =  this.state.ListCharactersLowStatStickClimax[10];
    this.state.CharactersTwelveLowStatStickClimax =  this.state.ListCharactersLowStatStickClimax[12];
    this.state.CharactersSixteenLowStatStickClimax =  this.state.ListCharactersLowStatStickClimax[16];

    



    this.state.ListMainCharactersHighStatStick = this.CreateList(this.state.MainCharactersHighStatStick, this.state.ListMainCharactersHighStatStick);
    
    this.state.MainCostZeroHighStatStick = this.state.ListMainCharactersHighStatStick[0];
    this.state.MainCostOneHighStatStick = this.state.ListMainCharactersHighStatStick[1];
    this.state.MainCostTwoHighStatStick =  this.state.ListMainCharactersHighStatStick[2];
    this.state.MainCostThreeHighStatStick = this.state.ListMainCharactersHighStatStick[3];
    this.state.MainCostFourHighStatStick = this.state.ListMainCharactersHighStatStick[4];
    this.state.MainCostSixHighStatStick = this.state.ListMainCharactersHighStatStick[6];

    this.state.ListMainCharactersMedStatStick = this.CreateList(this.state.MainCharactersMedStatStick, this.state.ListMainCharactersMedStatStick);
    
    this.state.MainCostZeroMedStatStick = this.state.ListMainCharactersMedStatStick[0];
    this.state.MainCostOneMedStatStick = this.state.ListMainCharactersMedStatStick[1];
    this.state.MainCostTwoMedStatStick =  this.state.ListMainCharactersMedStatStick[2];
    this.state.MainCostThreeMedStatStick = this.state.ListMainCharactersMedStatStick[3];
    this.state.MainCostFourMedStatStick = this.state.ListMainCharactersMedStatStick[4];
    this.state.MainCostSixMedStatStick = this.state.ListMainCharactersMedStatStick[6];

    this.state.ListMainCharactersLowStatStick = this.CreateList(this.state.MainCharactersLowStatStick, this.state.ListMainCharactersLowStatStick);
    
    this.state.MainCostZeroLowStatStick = this.state.ListMainCharactersLowStatStick[0];
    this.state.MainCostOneLowStatStick = this.state.ListMainCharactersLowStatStick[1];
    this.state.MainCostTwoLowStatStick =  this.state.ListMainCharactersLowStatStick[2];
    this.state.MainCostThreeLowStatStick = this.state.ListMainCharactersLowStatStick[3];
    this.state.MainCostFourLowStatStick = this.state.ListMainCharactersLowStatStick[4];
    this.state.MainCostSixLowStatStick = this.state.ListMainCharactersLowStatStick[6];

    

    
    this.state.ListAltCharactersHighStatStickClimax = this.CreateList(this.state.AltMainCharactersHighStatStick, this.state.ListAltMainCharactersHighStatStick, "ALTCLIMAX");

    this.state.AltCharactersEightHighStatStickClimax = this.state.ListAltCharactersHighStatStickClimax[8];
    this.state.AltCharactersTenHighStatStickClimax =  this.state.ListAltCharactersHighStatStickClimax[10];
    this.state.AltCharactersTwelveHighStatStickClimax =  this.state.ListAltCharactersHighStatStickClimax[12];
    this.state.AltCharactersSixteenHighStatStickClimax =  this.state.ListAltCharactersHighStatStickClimax[16];

    
    this.state.ListAltCharactersMedStatStickClimax = this.CreateList(this.state.AltMainCharactersMedStatStick, this.state.ListAltMainCharactersMedStatStick, "ALTCLIMAX");

    this.state.AltCharactersEightMedStatStickClimax = this.state.ListAltCharactersMedStatStickClimax[8];
    this.state.AltCharactersTenMedStatStickClimax =  this.state.ListAltCharactersMedStatStickClimax[10];
    this.state.AltCharactersTwelveMedStatStickClimax =  this.state.ListAltCharactersMedStatStickClimax[12];
    this.state.AltCharactersSixteenMedStatStickClimax =  this.state.ListAltCharactersMedStatStickClimax[16];

    
    this.state.ListAltCharactersLowStatStickClimax = this.CreateList(this.state.AltMainCharactersLowStatStick, this.state.ListAltMainCharactersLowStatStick, "ALTCLIMAX");

    this.state.AltCharactersEightLowStatStickClimax = this.state.ListAltCharactersLowStatStickClimax[8];
    this.state.AltCharactersTenLowStatStickClimax =  this.state.ListAltCharactersLowStatStickClimax[10];
    this.state.AltCharactersTwelveLowStatStickClimax =  this.state.ListAltCharactersLowStatStickClimax[12];
    this.state.AltCharactersSixteenLowStatStickClimax =  this.state.ListAltCharactersLowStatStickClimax[16];

    this.state.ListAltMainCharactersHighStatStick = this.CreateList(this.state.AltMainCharactersHighStatStick, this.state.ListAltMainCharactersHighStatStick, "ALT");
    
    this.state.AltMainCostZeroHighStatStick = this.state.ListAltMainCharactersHighStatStick[0];
    this.state.AltMainCostOneHighStatStick = this.state.ListAltMainCharactersHighStatStick[1];
    this.state.AltMainCostTwoHighStatStick =  this.state.ListAltMainCharactersHighStatStick[2];
    this.state.AltMainCostThreeHighStatStick = this.state.ListAltMainCharactersHighStatStick[3];
    this.state.AltMainCostFourHighStatStick = this.state.ListAltMainCharactersHighStatStick[4];
    this.state.AltMainCostSixHighStatStick = this.state.ListAltMainCharactersHighStatStick[6];

    this.state.ListAltMainCharactersMedStatStick = this.CreateList(this.state.AltMainCharactersMedStatStick, this.state.ListAltMainCharactersMedStatStick, "ALT");
    
    this.state.AltMainCostZeroMedStatStick = this.state.ListAltMainCharactersMedStatStick[0];
    this.state.AltMainCostOneMedStatStick = this.state.ListAltMainCharactersMedStatStick[1];
    this.state.AltMainCostTwoMedStatStick =  this.state.ListAltMainCharactersMedStatStick[2];
    this.state.AltMainCostThreeMedStatStick = this.state.ListAltMainCharactersMedStatStick[3];
    this.state.AltMainCostFourMedStatStick = this.state.ListAltMainCharactersMedStatStick[4];
    this.state.AltMainCostSixMedStatStick = this.state.ListAltMainCharactersMedStatStick[6];

    this.state.ListAltMainCharactersLowStatStick = this.CreateList(this.state.AltMainCharactersLowStatStick, this.state.ListAltMainCharactersLowStatStick, "ALT");
    
    this.state.AltMainCostZeroLowStatStick = this.state.ListAltMainCharactersLowStatStick[0];
    this.state.AltMainCostOneLowStatStick = this.state.ListAltMainCharactersLowStatStick[1];
    this.state.AltMainCostTwoLowStatStick =  this.state.ListAltMainCharactersLowStatStick[2];
    this.state.AltMainCostThreeLowStatStick = this.state.ListAltMainCharactersLowStatStick[3];
    this.state.AltMainCostFourLowStatStick = this.state.ListAltMainCharactersLowStatStick[4];
    this.state.AltMainCostSixLowStatStick = this.state.ListAltMainCharactersLowStatStick[6];




   ///////////

    this.SelectRoleChoice('main');
    this.SelectRankingChoice('high');
    this.SelectNumOfTargets('ST');
    this.SelectMainHighCost(0);
    this.SelectAlt(false);

    this.forceUpdate();

    ///////////////////////////////

  }
  
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      saveMainCost: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      saveAltMainCost: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      saveBoth: [],
      Mains: names,
      Supps: supports,
      SuppStats: supportsStats,
      MainStats: mainsStats,
      SuppSkills: supportsSkills,
      MainSkills: mainsSkills,

      AltEnabled: true,
      CurrCostChoice: 0,

      MainStatsInfo: {},
      SuppStatsInfo: {},

      MainStatStickHigh: {},
      MainStatStickMed: {},
      MainStatStickLow: {},

      SuppStatStickHigh: {},
      SuppStatStickMed: {},
      SuppStatStickLow: {},

      
      CharactersHighStatStickClimax: [],
      CharactersMedStatStickClimax: [],
      CharactersLowStatStickClimax: [],

      
      CharactersEightHighStatStickClimax: [],
      CharactersTenHighStatStickClimax: [],
      CharactersTwelveHighStatStickClimax: [],
      CharactersSixteenHighStatStickClimax: [],

      CharactersEightMedStatStickClimax: [],
      CharactersTenMedStatStickClimax: [],
      CharactersTwelveMedStatStickClimax: [],
      CharactersSixteenMedStatStickClimax: [],
      
      CharactersEightLowStatStickClimax: [],
      CharactersTenLowStatStickClimax: [],
      CharactersTwelveLowStatStickClimax: [],
      CharactersSixteenLowStatStickClimax: [],

      
      AltCharactersEightHighStatStickClimax: [],
      AltCharactersTenHighStatStickClimax: [],
      AltCharactersTwelveHighStatStickClimax: [],
      AltCharactersSixteenHighStatStickClimax: [],

      AltCharactersEightMedStatStickClimax: [],
      AltCharactersTenMedStatStickClimax: [],
      AltCharactersTwelveMedStatStickClimax: [],
      AltCharactersSixteenMedStatStickClimax: [],
      
      AltCharactersEightLowStatStickClimax: [],
      AltCharactersTenLowStatStickClimax: [],
      AltCharactersTwelveLowStatStickClimax: [],
      AltCharactersSixteenLowStatStickClimax: [],

      //skill 1-3
      MainCharactersHighStatStick: [],
      MainCharactersMedStatStick: [],
      MainCharactersLowStatStick: [],

      AltMainCharactersHighStatStick: [],
      AltMainCharactersMedStatStick: [],
      AltMainCharactersLowStatStick: [],
      
      MainCostZeroHighStatStick: [],
      MainCostOneHighStatStick: [],
      MainCostTwoHighStatStick: [],
      MainCostThreeHighStatStick: [],
      MainCostFourHighStatStick: [],
      MainCostSixHighStatStick: [],

      MainCostZeroMedStatStick: [],
      MainCostOneMedStatStick: [],
      MainCostTwoMedStatStick: [],
      MainCostThreeMedStatStick: [],
      MainCostFourMedStatStick: [],
      MainCostSixMedStatStick: [],
      
      MainCostZeroLowStatStick: [],
      MainCostOneLowStatStick: [],
      MainCostTwoLowStatStick: [],
      MainCostThreeLowStatStick: [],
      MainCostFourLowStatStick: [],
      MainCostSixLowStatStick: [],

      
      AltMainCostZeroHighStatStick: [],
      AltMainCostOneHighStatStick: [],
      AltMainCostTwoHighStatStick: [],
      AltMainCostThreeHighStatStick: [],
      AltMainCostFourHighStatStick: [],
      AltMainCostSixHighStatStick: [],

      AltMainCostZeroMedStatStick: [],
      AltMainCostOneMedStatStick: [],
      AltMainCostTwoMedStatStick: [],
      AltMainCostThreeMedStatStick: [],
      AltMainCostFourMedStatStick: [],
      AltMainCostSixMedStatStick: [],
      
      AltMainCostZeroLowStatStick: [],
      AltMainCostOneLowStatStick: [],
      AltMainCostTwoLowStatStick: [],
      AltMainCostThreeLowStatStick: [],
      AltMainCostFourLowStatStick: [],
      AltMainCostSixLowStatStick: [],

      //////

      MainCharactersHighStatStickPoser: [],
      MainCharactersMedStatStickPoser: [],
      MainCharactersLowStatStickPoser: [],

      MainCharactersHighStatStickAltFashion: [],
      MainCharactersMedStatStickAltFashion: [],
      MainCharactersLowStatStickAltFashion: [],

      //skill 4
      SuppCharactersHighStatStick: [],
      SuppCharactersMedStatStick: [],
      SuppCharactersLowStatStick: [],

      SuppCharactersHighStatStickPoser: [],
      SuppCharactersMedStatStickPoser: [],
      SuppCharactersLowStatStickPoser: [],

      SuppCharactersHighStatStickAltFashion: [],
      SuppCharactersMedStatStickAltFashion: [],
      SuppCharactersLowStatStickAltFashion: [],


      SuppCostZeroHighStatStick: [],
      SuppCostTwoHighStatStick: [],
      SuppCostThreeHighStatStick: [],
      SuppCostFourHighStatStick: [],
      SuppCostFiveHighStatStick: [],
      
      SuppCostZeroMedStatStick: [],
      SuppCostTwoMedStatStick: [],
      SuppCostThreeMedStatStick: [],
      SuppCostFourMedStatStick: [],
      SuppCostFiveMedStatStick: [],
      
      SuppCostZeroLowStatStick: [],
      SuppCostTwoLowStatStick: [],
      SuppCostThreeLowStatStick: [],
      SuppCostFourLowStatStick: [],
      SuppCostFiveLowStatStick: [],

      //skill 5
      BothCharactersCrossSkill: [],
      AltBothCharactersCrossSkill: [],

      //skill 5 - climax
      BothCharactersCrossSkillClimax: [],
      AltBothCharactersCrossSkillClimax: [],

      //List
      //skill 1-3
      ListMainCharactersHighStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListMainCharactersMedStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListMainCharactersLowStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      ListAltMainCharactersHighStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltMainCharactersMedStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltMainCharactersLowStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      ListMainCharactersHighStatStickPoser: [],
      ListMainCharactersMedStatStickPoser: [],
      ListMainCharactersLowStatStickPoser: [],

      ListMainCharactersHighStatStickAltFashion: [],
      ListMainCharactersMedStatStickAltFashion: [],
      ListMainCharactersLowStatStickAltFashion: [],

      
      ListCharactersHighStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListCharactersMedStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListCharactersLowStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      ListAltCharactersHighStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltCharactersMedStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltCharactersLowStatStickClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      //skill 4
      ListSuppCharactersHighStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListSuppCharactersMedStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListSuppCharactersLowStatStick: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      ListSuppCharactersHighStatStickPoser: [],
      ListSuppCharactersMedStatStickPoser: [],
      ListSuppCharactersLowStatStickPoser: [],

      ListSuppCharactersHighStatStickAltFashion: [],
      ListSuppCharactersMedStatStickAltFashion: [],
      ListSuppCharactersLowStatStickAltFashion: [],

      //skill 5
      ListBothCharactersCrossSkill:  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltBothCharactersCrossSkill:  [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],

      
      CrossCostThree: [],
      CrossCostFour: [],
      CrossCostFive: [],
      CrossCostSix: [],


      CrossCostTwelveClimax: [],

      AltCrossCostThree: [],
      AltCrossCostFour: [],
      AltCrossCostFive: [],
      AltCrossCostSix: [],


      AltCrossCostTwelveClimax: [],

      ListBothCharactersCrossSkillPoser: [],

      ListBothCharactersCrossSkillAlTFashion: [],


      //skill 5 - climax
      ListBothCharactersCrossSkillClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      ListAltBothCharactersCrossSkillClimax: [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],



    };
    
  }

  render() {

  return (
      
    <div class="skills">
      <div class="skills-inside">
        <div class="skills-content">
          
          <div class="center-wrap-full as1">
          <div class="skills-info">
            No Set Bonuses | Lv.60 | S | Max Items | Lv.60 Talents | Ardor | Valor | Aggression | Strength
          </div>
            
          <div class="content-rankings-choice">
                    <ul class="index-stats" style={{'margin-bottom': '0px','margin-top': '4px'}}>
                      <li class="index-stats-tab rank-choice main-alt" style={{'background-color':'#5790b3'}} onClick={() => { this.SelectAlt(!this.state.AltEnabled)}}>
                      <a href="javascript:;">Enable Alt (Some Unique Talents/Skill Bonuses)</a>
                      </li> 
                    </ul>
            </div>  

            
          <div class="content-rankings-choice">
                    <ul class="index-stats" style={{'margin-bottom': '0px','margin-top': '4px'}}>
                      <li class="index-stats-tab rank-choice main-main" style={{'background-color':'#5790b3'}} onClick={() => { this.SelectRoleChoice('main')}}>
                      <a href="javascript:;">Main</a>
                      </li> 
                      <li class="index-stats-tab rank-choice main-cross" onClick={() => { this.SelectRoleChoice("cross")}}>
                      <a href="javascript:;">Cross</a>
                      </li> 
                      <li class="index-stats-tab rank-choice main-supp" onClick={() => { this.SelectRoleChoice('supp')}}>
                      <a href="javascript:;">Support</a>
                      </li> 
                    </ul>
            </div> 

          <div class="content-rankings-choice">
            <div class="selection-title">Partner Atk Value</div>
                    <ul class="index-stats" style={{'margin-bottom': '0px','margin-top': '4px'}}>
                      <li class="index-stats-tab rank-choice main-high" style={{'background-color':'#5790b3'}} onClick={() => { this.SelectRankingChoice('high')}}>
                      <a href="javascript:;">High</a>
                      </li> 
                      <li class="index-stats-tab rank-choice main-med" onClick={() => { this.SelectRankingChoice("med")}}>
                      <a href="javascript:;">Medium</a>
                      </li> 
                      <li class="index-stats-tab rank-choice main-low" onClick={() => { this.SelectRankingChoice('low')}}>
                      <a href="javascript:;">Low</a>
                      </li> 
                    </ul>
            </div>  

            
          <div class="content-rankings-choice">
            <div class="selection-title"># of Targets</div>
                    <ul class="index-stats" style={{'margin-bottom': '0px','margin-top': '4px'}}>
                      <li class="index-stats-tab rank-choice targets-choices-ST" style={{'background-color':'#5790b3'}} onClick={() => { this.SelectNumOfTargets('ST')}}>
                      <a href="javascript:;">1</a>
                      </li> 
                      <li class="index-stats-tab rank-choice targets-choices-DT" onClick={() => { this.SelectNumOfTargets("DT")}}>
                      <a href="javascript:;">2</a>
                      </li> 
                      <li class="index-stats-tab rank-choice targets-choices-TT" onClick={() => { this.SelectNumOfTargets('TT')}}>
                      <a href="javascript:;">3</a>
                      </li> 
                    </ul>
            </div>  
              

          <div class="main-content-rankings-main">
            <div class="selection-title">Cost</div>
                    <ul class="index-stats" style={{'margin-top': '4px', 'margin-bottom': '5px'}}>
                      <li class="index-stats-tab main-zero" style={{'background-color':'#5790b3'}} onClick={() => { this.SelectMainHighCost(0)}}>
                      <a href="javascript:;">0</a>
                      </li> 
                      <li class="index-stats-tab main-one" onClick={() => { this.SelectMainHighCost(1)}}>
                      <a href="javascript:;">1</a>
                      </li> 
                      <li class="index-stats-tab main-two" onClick={() => { this.SelectMainHighCost(2)}}>
                      <a href="javascript:;">2</a>
                      </li> 
                      <li class="index-stats-tab main-three" onClick={() => { this.SelectMainHighCost(3)}}>
                      <a href="javascript:;">3</a>
                      </li> 
                      <li class="index-stats-tab main-four" onClick={() => { this.SelectMainHighCost(4)}}>
                      <a href="javascript:;">4</a>
                      </li> 
                      <li class="index-stats-tab main-five" onClick={() => { this.SelectMainHighCost(5)}}>
                      <a href="javascript:;">5</a>
                      </li> 
                      <li class="index-stats-tab main-six" onClick={() => { this.SelectMainHighCost(6)}}>
                      <a href="javascript:;">6</a>
                      </li> 
                      <li class="index-stats-tab main-eight" onClick={() => { this.SelectMainHighCost(8)}}>
                      <a href="javascript:;">8</a>
                      </li> 
                      <li class="index-stats-tab main-ten" onClick={() => { this.SelectMainHighCost(10)}}>
                      <a href="javascript:;">10</a>
                      </li> 
                      <li class="index-stats-tab main-twelve" onClick={() => { this.SelectMainHighCost(12)}}>
                      <a href="javascript:;">12</a>
                      </li> 
                      <li class="index-stats-tab main-sixteen" onClick={() => { this.SelectMainHighCost(16)}}>
                      <a href="javascript:;">16</a>
                      </li> 
                    </ul>
            </div>   

            <div class="column-info">
            <span class="column-text" style={{'width':'11%'}}>
            DMG
            </span>
            <span  class="column-text" style={{'width':'10%'}}>
            Dmg/Cost
            </span>
            <span  class="column-text" style={{'width':'26%'}}>
            Skill Name
            </span>
            <span  class="column-text" style={{'width':'33%', 'visibility':'hidden'}}>
            -
            </span>
            <span  class="column-text" style={{'width':'15%'}}>
            Name
            </span>
            <span  class="column-text" style={{'width':'5%'}}>
            Rank
            </span>
            </div>
            

          <ul class="rankings main-rankings">

          <div class="main-rankings-high">

          <div class="main-cost-zero active">
          {this.state.MainCostZeroHighStatStick}
          </div>
          <div class="main-cost-one disabled">
          {this.state.MainCostOneHighStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.MainCostTwoHighStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.MainCostThreeHighStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.MainCostFourHighStatStick}
          </div>
          <div class="main-cost-six disabled">
          {this.state.MainCostSixHighStatStick}
          </div>
          <div class="alt-main-cost-zero disabled">
          {this.state.AltMainCostZeroHighStatStick}
          </div>
          <div class="alt-main-cost-one disabled">
          {this.state.AltMainCostOneHighStatStick}
          </div>
          <div class="alt-main-cost-two disabled">
          {this.state.AltMainCostTwoHighStatStick}
          </div>
          <div class="alt-main-cost-three disabled">
          {this.state.AltMainCostThreeHighStatStick}
          </div>
          <div class="alt-main-cost-four disabled">
          {this.state.AltMainCostFourHighStatStick}
          </div>
          <div class="alt-main-cost-six disabled">
          {this.state.AltMainCostSixHighStatStick}
          </div>
          <div class="main-cost-eight disabled">
          {this.state.CharactersEightHighStatStickClimax}
          </div>
          <div class="main-cost-ten disabled">
          {this.state.CharactersTenHighStatStickClimax}
          </div>
          <div class="main-cost-twelve disabled">
          {this.state.CharactersTwelveHighStatStickClimax}
          </div>
          <div class="main-cost-sixteen disabled">
          {this.state.CharactersSixteenHighStatStickClimax}
          </div>
          <div class="alt-main-cost-eight disabled">
          {this.state.AltCharactersEightHighStatStickClimax}
          </div>
          <div class="alt-main-cost-ten disabled">
          {this.state.AltCharactersTenHighStatStickClimax}
          </div>
          <div class="alt-main-cost-twelve disabled">
          {this.state.AltCharactersTwelveHighStatStickClimax}
          </div>
          <div class="alt-main-cost-sixteen disabled">
          {this.state.AltCharactersSixteenHighStatStickClimax}
          </div>

          </div>

          
          <div class="main-rankings-med" style={{'display':'none'}}>

          <div class="main-cost-zero active">
          {this.state.MainCostZeroMedStatStick}
          </div>
          <div class="main-cost-one disabled">
          {this.state.MainCostOneMedStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.MainCostTwoMedStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.MainCostThreeMedStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.MainCostFourMedStatStick}
          </div>
          <div class="main-cost-six disabled">
          {this.state.MainCostSixMedStatStick}
          </div>
          <div class="alt-main-cost-zero disabled">
          {this.state.AltMainCostZeroMedStatStick}
          </div>
          <div class="alt-main-cost-one disabled">
          {this.state.AltMainCostOneMedStatStick}
          </div>
          <div class="alt-main-cost-two disabled">
          {this.state.AltMainCostTwoMedStatStick}
          </div>
          <div class="alt-main-cost-three disabled">
          {this.state.AltMainCostThreeMedStatStick}
          </div>
          <div class="alt-main-cost-four disabled">
          {this.state.AltMainCostFourMedStatStick}
          </div>
          <div class="alt-main-cost-six disabled">
          {this.state.AltMainCostSixMedStatStick}
          </div>
          <div class="main-cost-eight disabled">
          {this.state.CharactersEightMedStatStickClimax}
          </div>
          <div class="main-cost-ten disabled">
          {this.state.CharactersTenMedStatStickClimax}
          </div>
          <div class="main-cost-twelve disabled">
          {this.state.CharactersTwelveMedStatStickClimax}
          </div>
          <div class="main-cost-sixteen disabled">
          {this.state.CharactersSixteenMedStatStickClimax}
          </div>
          <div class="alt-main-cost-eight disabled">
          {this.state.AltCharactersEightMedStatStickClimax}
          </div>
          <div class="alt-main-cost-ten disabled">
          {this.state.AltCharactersTenMedStatStickClimax}
          </div>
          <div class="alt-main-cost-twelve disabled">
          {this.state.AltCharactersTwelveMedStatStickClimax}
          </div>
          <div class="alt-main-cost-sixteen disabled">
          {this.state.AltCharactersSixteenMedStatStickClimax}
          </div>

          </div>

          
          <div class="main-rankings-low" style={{'display':'none'}}>

          <div class="main-cost-zero active">
          {this.state.MainCostZeroLowStatStick}
          </div>
          <div class="main-cost-one disabled">
          {this.state.MainCostOneLowStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.MainCostTwoLowStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.MainCostThreeLowStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.MainCostFourLowStatStick}
          </div>
          <div class="main-cost-six disabled">
          {this.state.MainCostSixLowStatStick}
          </div>
          <div class="alt-main-cost-zero disabled">
          {this.state.AltMainCostZeroLowStatStick}
          </div>
          <div class="alt-main-cost-one disabled">
          {this.state.AltMainCostOneLowStatStick}
          </div>
          <div class="alt-main-cost-two disabled">
          {this.state.AltMainCostTwoLowStatStick}
          </div>
          <div class="alt-main-cost-three disabled">
          {this.state.AltMainCostThreeLowStatStick}
          </div>
          <div class="alt-main-cost-four disabled">
          {this.state.AltMainCostFourLowStatStick}
          </div>
          <div class="alt-main-cost-six disabled">
          {this.state.AltMainCostSixLowStatStick}
          </div>
          <div class="main-cost-eight disabled">
          {this.state.CharactersEightLowStatStickClimax}
          </div>
          <div class="main-cost-ten disabled">
          {this.state.CharactersTenLowStatStickClimax}
          </div>
          <div class="main-cost-twelve disabled">
          {this.state.CharactersTwelveLowStatStickClimax}
          </div>
          <div class="main-cost-sixteen disabled">
          {this.state.CharactersSixteenLowStatStickClimax}
          </div>
          <div class="alt-main-cost-eight disabled">
          {this.state.AltCharactersEightLowStatStickClimax}
          </div>
          <div class="alt-main-cost-ten disabled">
          {this.state.AltCharactersTenLowStatStickClimax}
          </div>
          <div class="alt-main-cost-twelve disabled">
          {this.state.AltCharactersTwelveLowStatStickClimax}
          </div>
          <div class="alt-main-cost-sixteen disabled">
          {this.state.AltCharactersSixteenLowStatStickClimax}
          </div>

          </div>

          </ul>

          <ul class="rankings supp-rankings" style={{'display':'none'}}>

          <div class="main-rankings-high">

          <div class="main-cost-zero active">
          {this.state.SuppCostZeroHighStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.SuppCostTwoHighStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.SuppCostThreeHighStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.SuppCostFourHighStatStick}
          </div>
          <div class="main-cost-five disabled">
          {this.state.SuppCostFiveHighStatStick}
          </div>

          </div>

          
          <div class="main-rankings-med" style={{'display':'none'}}>

          <div class="main-cost-zero active">
          {this.state.SuppCostZeroMedStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.SuppCostTwoMedStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.SuppCostThreeMedStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.SuppCostFourMedStatStick}
          </div>
          <div class="main-cost-five disabled">
          {this.state.SuppCostFiveMedStatStick}
          </div>

          </div>

          
          <div class="main-rankings-low" style={{'display':'none'}}>

          <div class="main-cost-zero active">
          {this.state.SuppCostZeroLowStatStick}
          </div>
          <div class="main-cost-two disabled">
          {this.state.SuppCostTwoLowStatStick}
          </div>
          <div class="main-cost-three disabled">
          {this.state.SuppCostThreeLowStatStick}
          </div>
          <div class="main-cost-four disabled">
          {this.state.SuppCostFourLowStatStick}
          </div>
          <div class="main-cost-five disabled">
          {this.state.SuppCostFiveLowStatStick}
          </div>

          </div>

          </ul>


          <ul class="rankings cross-rankings" style={{'display':'none'}}>

          

          <div class="main-cost-three active">
          {this.state.CrossCostThree}
          </div>
          <div class="main-cost-four disabled">
          {this.state.CrossCostFour}
          </div>
          <div class="main-cost-five disabled">
          {this.state.CrossCostFive}
          </div>
          <div class="main-cost-six disabled">
          {this.state.CrossCostSix}
          </div>
          <div class="main-cost-twelve disabled">
          {this.state.CrossCostTwelveClimax}
          </div>
          <div class="alt-main-cost-three disabled">
          {this.state.AltCrossCostThree}
          </div>
          <div class="alt-main-cost-four disabled">
          {this.state.AltCrossCostFour}
          </div>
          <div class="alt-main-cost-five disabled">
          {this.state.AltCrossCostFive}
          </div>
          <div class="alt-main-cost-six disabled">
          {this.state.AltCrossCostSix}
          </div>
          <div class="alt-main-cost-twelve disabled">
          {this.state.AltCrossCostTwelveClimax}
          </div>
          

          
          </ul>


          
          


          </div>
        </div>
      </div>
    </div>

    
    );
  }

  
 AssignImages = ()  =>{

  for(var x = 1; x < this.state.Supps.length + 1; x++)
  {
    
    var suppIcon = this.state.Supps.filter(a => a.Name == this.state.SuppStats[x].Name);
    this.state.SuppStats[x].Icon = suppIcon[0].Icon;
    if( x < this.state.Mains.length + 1)
    {
      var mainIcon = this.state.Mains.filter(a => a.Name == this.state.MainStats[x].Name);
      this.state.MainStats[x].Icon = mainIcon[0].Icon;
    }

  }
 }

 FindStatSticks = ()  =>{

  this.state.MainStatsInfo = this.state.MainStats[0];
  this.state.SuppStatsInfo = this.state.SuppStats[0];

  this.state.SuppStats.splice(0, 1);
  this.state.MainStats.splice(0, 1);

  this.state.MainStats.sort((a, b) => b.Attack - a.Attack);
  this.state.SuppStats.sort((a, b) => b.Attack - a.Attack);

  var x = Math.round(this.state.MainStats.length / 2);
  var y = Math.round(this.state.SuppStats.length / 2);

  //Divide length of array by two, choose 1 index, middle index and last index as the stat sticks
  
  this.state.MainStatStickHigh = this.state.MainStats[0];
  this.state.MainStatStickMed = this.state.MainStats[x];
  this.state.MainStatStickLow = this.state.MainStats[this.state.MainStats.length-1];

  this.state.SuppStatStickHigh = this.state.SuppStats[0];
  this.state.SuppStatStickMed = this.state.SuppStats[y];
  this.state.SuppStatStickLow = this.state.SuppStats[this.state.SuppStats.length-1];

 }

 
 CreateMainStatSticks = ()  =>{


  for(var x = 0; x < this.state.MainStats.length; x++)
  {
    var skillData = this.state.MainSkills.filter(a => a.Name == this.state.MainStats[x].Name);
    for(var i = 0; i < skillData.length;i++)
    {
      var Alt = {
        Info: "",
        ccmod: 0,
        cdmod: 0,
        atkmod: 0,
        dmgmod: 0,
      };
      
  this.state.MainCharactersHighStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickHigh,
      Skill: skillData[i],
      Combined: {
        Attack: this.state.SuppStatStickHigh.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickHigh.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickHigh.CD + this.state.MainStats[x].CD
      }
    }
  );
  this.state.MainCharactersMedStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickMed,
      Skill: skillData[i],
      Combined: {
        Attack: this.state.SuppStatStickMed.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickMed.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickMed.CD + this.state.MainStats[x].CD
      }
    }
  );
  this.state.MainCharactersLowStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickLow,
      Skill: skillData[i],
      Combined: {
        Attack: this.state.SuppStatStickLow.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickLow.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickLow.CD + this.state.MainStats[x].CD
      }
    }
  );


  if(this.state.MainStats[x].Name == "Alice")
  {
    Alt.Info = "Talent + Skill Buff";
    Alt.dmgmod = 15.53;
    Alt.atkmod = 300;
  }
  if(this.state.MainStats[x].Name == "Shana")
  {
    Alt.Info = "Talent - 5 Stack";
    Alt.dmgmod = 12.5;
  }
  if(this.state.MainStats[x].Name == "Asuna")
  {
    Alt.Info = "Talent - Crit Rate";
    Alt.ccmod = 12.5;
  }
  if(this.state.MainStats[x].Name == "Kimono Asuna")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 16;
  }
  if(this.state.MainStats[x].Name == "Emi")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 11.17;
  }
  if(this.state.MainStats[x].Name == "Kirino")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 6;
  }
  if(this.state.MainStats[x].Name == "Kuroko")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(this.state.MainStats[x].Name == "Mikoto")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 6;
  }
  if(this.state.MainStats[x].Name == "Miyuki")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(this.state.MainStats[x].Name == "Shizuo")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 10;
  }
  if(this.state.MainStats[x].Name == "Taiga")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(this.state.MainStats[x].Name == "Yukina")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 9.5;
  }
  if(this.state.MainStats[x].Name == "Kirito (Dual Blade)" && skillData[i].Skills == "Double Circular")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 8.00;
  }
  if(this.state.MainStats[x].Name == "Kirito (Dual Blade)" && skillData[i].Skills == "Horizontal Arc")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 16.00;
  }
  if(this.state.MainStats[x].Name == "Kimono Shana" && skillData[i].Skills == "Inferno Wraith")
  {
    Alt.Info = "5 Stack";
    Alt.dmgmod = 28;
  }
  if(this.state.MainStats[x].Name == "Kimono Shana" && skillData[i].Skills == "Inferno Wraith")
  {
    Alt.Info = "5 Stack + Unique Talent";
    Alt.dmgmod = 28 + 14.86;
  }
  if(this.state.MainStats[x].Name == "Kimono Shana" && skillData[i].Skills == "Blazing Charge")
  {
    Alt.Info = "Unique Talent";
    Alt.dmgmod = 9.31;
  }
  if(this.state.MainStats[x].Name == "Kimono Shana" && skillData[i].Skills == "Blazing Charge (5 Stack)")
  {
    Alt.Info = "Unique Talent";
    Alt.dmgmod = 9.31;
  }
  if(this.state.MainStats[x].Name == "Kuroyukihime (Butterfly)")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12.50;
  }
  if(this.state.MainStats[x].Name == "Accelerator")
  {
    Alt.Info = "Talent - 5 Stack +%DMG";
    Alt.dmgmod = 9.31;
  }
  if(this.state.MainStats[x].Name == "Accelerator" && skillData[i].Skills == "Plasma")
  {
    Alt.Info = "5x [Battery Power] + Talent +%DMG";
    Alt.dmgmod = 500;
  }

  if(Alt.Info != "")
  {
    
  this.state.MainCharactersHighStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickHigh,
      Skill: skillData[i],
      Alt: Alt,
      Combined: {
        Attack: this.state.SuppStatStickHigh.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickHigh.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickHigh.CD + this.state.MainStats[x].CD
      }
    }
  );
  this.state.MainCharactersMedStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickMed,
      Skill: skillData[i],
      Alt: Alt,
      Combined: {
        Attack: this.state.SuppStatStickMed.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickMed.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickMed.CD + this.state.MainStats[x].CD
      }
    }
  );
  this.state.MainCharactersLowStatStick.push(
    {
      Main: this.state.MainStats[x],
      Supp: this.state.SuppStatStickLow,
      Skill: skillData[i],
      Alt: Alt,
      Combined: {
        Attack: this.state.SuppStatStickLow.Attack + this.state.MainStats[x].Attack,
        CC: this.state.SuppStatStickLow.CC + this.state.MainStats[x].CC,
        CD: this.state.SuppStatStickLow.CD + this.state.MainStats[x].CD
      }
    }
  );
  }


    }
  }

 }

 CreateSuppStatSticks = ()  =>{


  for(var x = 0; x < this.state.SuppStats.length; x++)
  {
    var skillData = this.state.SuppSkills.filter(a => a.Name == this.state.SuppStats[x].Name && a.Partner == 'No');
    for(var i = 0; i < skillData.length;i++)
    {
      
  this.state.SuppCharactersHighStatStick.push(
    {
      Main: this.state.MainStatStickHigh,
      Supp: this.state.SuppStats[x],
      Skill: skillData[i],
      Combined: {
        Attack: this.state.MainStatStickHigh.Attack + this.state.SuppStats[x].Attack,
        CC: this.state.MainStatStickHigh.CC + this.state.SuppStats[x].CC,
        CD: this.state.MainStatStickHigh.CD + this.state.SuppStats[x].CD
      }
    }
  );
  this.state.SuppCharactersMedStatStick.push(
    {
      Main: this.state.MainStatStickMed,
      Supp: this.state.SuppStats[x],
      Skill: skillData[i],
      Combined: {
        Attack: this.state.MainStatStickMed.Attack + this.state.SuppStats[x].Attack,
        CC: this.state.MainStatStickMed.CC + this.state.SuppStats[x].CC,
        CD: this.state.MainStatStickMed.CD + this.state.SuppStats[x].CD
      }
    }
  );
  this.state.SuppCharactersLowStatStick.push(
    {
      Main: this.state.MainStatStickLow,
      Supp: this.state.SuppStats[x],
      Skill: skillData[i],
      Combined: {
        Attack: this.state.MainStatStickLow.Attack + this.state.SuppStats[x].Attack,
        CC: this.state.MainStatStickLow.CC + this.state.SuppStats[x].CC,
        CD: this.state.MainStatStickLow.CD + this.state.SuppStats[x].CD
      }
    }
  );
    }
  }

 }

 CreateCombinations = ()  =>{

  //Iterate through SuppSkills, if Cross skill, create combination and add that skill to their object.
  //If CrossSkill == true -> Name == support, Partner == main
  //If CostType == SP, add to BothCharactersCrossSkillClimax
  //Otherwise, add to BothCaractersCrossSKill
for(var x = 0; x < this.state.SuppSkills.length; x++)
  {
    if(this.state.SuppSkills[x].CrossSkill == 'TRUE')
    {
      var Alt = {
        Info: "",
        ccmod: 0,
        cdmod: 0,
        atkmod: 0,
        dmgmod: 0,
      };

      if(this.state.SuppSkills[x].CostType == 'SP') //Climax
      {
        var mainData = this.state.MainStats.filter(a => a.Name == this.state.SuppSkills[x].Partner);
        var suppData = this.state.SuppStats.filter(a => a.Name == this.state.SuppSkills[x].Name);
          
        this.state.BothCharactersCrossSkillClimax.push(
          {
            Main: mainData[0],
            Supp: suppData[0],
            Skill: this.state.SuppSkills[x],
            Combined: {
              Attack: mainData[0].Attack + suppData[0].Attack,
              CC: mainData[0].CC + suppData[0].CC,
              CD:  mainData[0].CD + suppData[0].CD
            }
          }
        );
      }
      else //Non-Climax
      {
        var mainData = this.state.MainStats.filter(a => a.Name == this.state.SuppSkills[x].Partner);
        var suppData = this.state.SuppStats.filter(a => a.Name == this.state.SuppSkills[x].Name);
        this.state.BothCharactersCrossSkill.push(
          {
            Main: mainData[0],
            Supp: suppData[0],
            Skill: this.state.SuppSkills[x],
            Combined: {
              Attack: mainData[0].Attack + suppData[0].Attack,
              CC: mainData[0].CC + suppData[0].CC,
              CD:  mainData[0].CD + suppData[0].CD
            }
          }
        );
      }
        
  if(mainData[0].Name == "Alice")
  {
    Alt.Info = "Talent + Skill Buff + Cross Buff";
    Alt.dmgmod = 15.53;
    Alt.atkmod = 300;
    if(suppData[0].name == "Kirito")
    {
      Alt.atkmod = 1200;
    }
  }
  if(mainData[0].Name == "Shana")
  {
    Alt.Info = "Talent - 5 Stack";
    Alt.dmgmod = 12.5;
  }
  if(mainData[0].Name == "Asuna")
  {
    Alt.Info = "Talent - Crit Rate";
    Alt.ccmod = 12.5;
  }
  if(mainData[0].Name == "Kimono Asuna")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 16;
  }
  if(mainData[0].Name == "Emi")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 11.17;
  }
  if(mainData[0].Name == "Kirino")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 6;
  }
  if(mainData[0].Name == "Kuroko")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(mainData[0].Name == "Mikoto")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 6;
  }
  if(mainData[0].Name == "Miyuki")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(mainData[0].Name == "Shizuo")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 10;
  }
  if(mainData[0].Name == "Taiga")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 12;
  }
  if(mainData[0].Name == "Yukina")
  {
    Alt.Info = "Talent - Increase %DMG";
    Alt.dmgmod = 9.5;
  }
  if(mainData[0].Name == "Accelerator")
  {
    Alt.Info = "Talent - 5 Stack +%DMG";
    Alt.dmgmod = 9.31;
  }

  if(Alt.Info != "")
  {
    
    
    if(this.state.SuppSkills[x].CostType == 'SP') //Climax
    {
        
      this.state.BothCharactersCrossSkillClimax.push(
        {
          Main: mainData[0],
          Supp: suppData[0],
          Skill: this.state.SuppSkills[x],
          Alt: Alt,
          Combined: {
            Attack: mainData[0].Attack + suppData[0].Attack,
            CC: mainData[0].CC + suppData[0].CC,
            CD:  mainData[0].CD + suppData[0].CD
          }
        }
      );
    }
    else //Non-Climax
    {
      this.state.BothCharactersCrossSkill.push(
        {
          Main: mainData[0],
          Supp: suppData[0],
          Skill: this.state.SuppSkills[x],
          Alt: Alt,
          Combined: {
            Attack: mainData[0].Attack + suppData[0].Attack,
            CC: mainData[0].CC + suppData[0].CC,
            CD:  mainData[0].CD + suppData[0].CD
          }
        }
      );
    }

  }


    }
    else
    {
      //Dont do anything.
    }



  }

 }


 SelectMainHighCost= (choice) =>  { 


 
  var main = document.getElementsByClassName('main-main'); 
  var cross = document.getElementsByClassName('main-cross');
  var supp = document.getElementsByClassName('main-supp');
  if(
    (choice == 5 && main[0].style.boxShadow != 'unset') ||
    (choice == 1 && supp[0].style.boxShadow != 'unset') ||
    (choice == 6 && supp[0].style.boxShadow != 'unset') ||
    (choice == 8 && supp[0].style.boxShadow != 'unset') ||
    (choice == 10 && supp[0].style.boxShadow != 'unset') ||
    (choice == 12 && supp[0].style.boxShadow != 'unset') ||
    (choice == 16 && supp[0].style.boxShadow != 'unset') ||
    (choice == 0 && cross[0].style.boxShadow != 'unset') ||
    (choice == 1 && cross[0].style.boxShadow != 'unset') ||
    (choice == 2 && cross[0].style.boxShadow != 'unset') ||
    (choice == 8 && cross[0].style.boxShadow != 'unset') ||
    (choice == 10 && cross[0].style.boxShadow != 'unset') ||
    (choice == 16 && cross[0].style.boxShadow != 'unset') 
    ){ //Not selected



  }
  else
  {

    var all = document.getElementsByClassName('main-cost-zero');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-one');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-two');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-three');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-four');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-five');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-six');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-eight');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-ten');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-twelve');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('main-cost-sixteen');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}


    var all = document.getElementsByClassName('alt-main-cost-zero');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-one');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-two');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-three');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-four');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-five');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-six');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-eight');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-ten');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-twelve');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}
    var all = document.getElementsByClassName('alt-main-cost-sixteen');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('active','disabled');}

    

 var all = document.getElementsByClassName('main-zero');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-one');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-two');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-three');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-four');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-five');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-six');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-eight');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-ten');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-twelve');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-sixteen');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';




 if(choice == 0){
   this.state.CurrCostChoice = choice;
   if(this.state.AltEnabled == false)
   {
    var all = document.getElementsByClassName('main-zero');  
    all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
    all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('main-cost-zero');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
   }
   else
   {
    var all = document.getElementsByClassName('main-zero');  
    all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
    all[0].style.backgroundColor = '#5790b3';
    var all = document.getElementsByClassName('alt-main-cost-zero');
    for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
   }
   }
   if(choice == 1){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-one');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-one');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-one');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-one');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
     }
   if(choice == 2){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-two');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-two');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-two');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-two');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 3){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-three');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-three');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-three');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-three');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 4){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-four');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-four');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-four');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-four');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   } 
   if(choice == 5){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-five');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-five');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-five');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-five');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 6){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-six');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
      var all = document.getElementsByClassName('main-cost-six');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-six');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = '#5790b3';
     var all = document.getElementsByClassName('alt-main-cost-six');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 8){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-eight');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
      var all = document.getElementsByClassName('main-cost-eight');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-eight');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
     var all = document.getElementsByClassName('alt-main-cost-eight');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 10){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-ten');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
      var all = document.getElementsByClassName('main-cost-ten');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-ten');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
     var all = document.getElementsByClassName('alt-main-cost-ten');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 12){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-twelve');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
      var all = document.getElementsByClassName('main-cost-twelve');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-twelve');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
     var all = document.getElementsByClassName('alt-main-cost-twelve');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }
   if(choice == 16){
    this.state.CurrCostChoice = choice;
    if(this.state.AltEnabled == false)
    {
     var all = document.getElementsByClassName('main-sixteen');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
      var all = document.getElementsByClassName('main-cost-sixteen');
      for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
    else
    {
     var all = document.getElementsByClassName('main-sixteen');  
     all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';
     all[0].style.backgroundColor = 'rgb(193, 157, 26)';
     var all = document.getElementsByClassName('alt-main-cost-sixteen');
     for(var x = 0; x < all.length;x++){all[x].className= all[x].className.replace('disabled','active');}
    }
   }



  }







  }


  SelectRoleChoice= (choice) =>  { 

    var all = document.getElementsByClassName('main-rankings');
    for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}   
    var all = document.getElementsByClassName('supp-rankings');    
    for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}    
    var all = document.getElementsByClassName('cross-rankings'); 
    for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}    
   
  
    var all = document.getElementsByClassName('main-main');    
    all[0].style.backgroundColor = '#7b8084';
    all[0].style.boxShadow = 'unset';
    var all = document.getElementsByClassName('main-cross');    
    all[0].style.backgroundColor = '#7b8084';
    all[0].style.boxShadow = 'unset';
    var all = document.getElementsByClassName('main-supp');    
    all[0].style.backgroundColor = '#7b8084';
    all[0].style.boxShadow = 'unset';



    

 var all = document.getElementsByClassName('main-zero'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-one'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-two'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-three');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-four');  
 all[0].className= all[0].className.replace(' button-disabled','');   
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-five');  
 all[0].className= all[0].className.replace(' button-disabled','');  
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-six'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-eight'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-ten'); 
 all[0].className= all[0].className.replace(' button-disabled','');    
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-twelve');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-sixteen');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-high');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-med');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';
 var all = document.getElementsByClassName('main-low');
 all[0].className= all[0].className.replace(' button-disabled','');     
 all[0].style.backgroundColor = '#7b8084';
 all[0].style.boxShadow = 'unset';

    
   if(choice == 'main'){
    var all = document.getElementsByClassName('main-five'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
  
    var all = document.getElementsByClassName('main-alt');
    all[0].className= all[0].className.replace(' button-disabled','');   
  this.SelectMainHighCost(0);
  this.SelectRankingChoice('high');
   }

   
   if(choice == 'cross'){
    var all = document.getElementsByClassName('main-zero'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-one'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-two'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-eight'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-ten'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-sixteen'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}

    var all = document.getElementsByClassName('main-high'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-med'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-low'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}

    
  var all = document.getElementsByClassName('main-alt');
  all[0].className= all[0].className.replace(' button-disabled','');     
  //all[0].style.backgroundColor = '#7b8084';
  //all[0].style.boxShadow = 'unset';

    this.SelectMainHighCost(3);
     }

     
   if(choice == 'supp'){
    var all = document.getElementsByClassName('main-one'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-six'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-eight'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-ten'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-twelve'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
    var all = document.getElementsByClassName('main-sixteen'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}

    
    var all = document.getElementsByClassName('main-alt'); 
    if(!all[0].className.includes('button-disabled')){all[0].className= all[0].className +' button-disabled';}
  
  this.SelectAlt(false);  
  this.SelectRankingChoice('high');
    this.SelectMainHighCost(0);
     }



  
   if(choice == 'main'){
  var all = document.getElementsByClassName('main-rankings');    
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
  var all = document.getElementsByClassName('main-main');  
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';  
  all[0].style.backgroundColor = '#5790b3';
   }
   if(choice == 'cross'){
    var all = document.getElementsByClassName('cross-rankings');   
    for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
    var all = document.getElementsByClassName('main-cross'); 
    all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
    all[0].style.backgroundColor = '#5790b3';
   }
   if(choice == 'supp'){
    var all = document.getElementsByClassName('supp-rankings');  
    for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
    var all = document.getElementsByClassName('main-supp'); 
    all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
    all[0].style.backgroundColor = '#5790b3';
   }
  }

 SelectRankingChoice= (choice) =>  { 

  var all = document.getElementsByClassName('main-rankings-high');
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}   
  var all = document.getElementsByClassName('main-rankings-med');    
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}    
  var all = document.getElementsByClassName('main-rankings-low'); 
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}    
 

  var all = document.getElementsByClassName('main-high');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';
  var all = document.getElementsByClassName('main-med');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';
  var all = document.getElementsByClassName('main-low');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';

 var all = document.getElementsByClassName('main-high');    
 if(choice == 'high' && !all[0].className.includes('button-disabled')){
  var all = document.getElementsByClassName('main-rankings-high');
for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
var all = document.getElementsByClassName('main-high');  
all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';  
all[0].style.backgroundColor = '#5790b3';
 }
 var all = document.getElementsByClassName('main-med'); 
 if(choice == 'med' && !all[0].className.includes('button-disabled')){
  var all = document.getElementsByClassName('main-rankings-med');   
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
  var all = document.getElementsByClassName('main-med'); 
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
  all[0].style.backgroundColor = '#5790b3';
 }
 var all = document.getElementsByClassName('main-low'); 
 if(choice == 'low' && !all[0].className.includes('button-disabled')){
  var all = document.getElementsByClassName('main-rankings-low');  
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'block';}    
  var all = document.getElementsByClassName('main-low'); 
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
  all[0].style.backgroundColor = '#5790b3';
 }
}


SelectAlt= (choice) =>  { 


var supp = document.getElementsByClassName('main-supp');
if(
  (supp[0].style.boxShadow != 'unset') 
  ){ // selected



}
else{

  this.state.AltEnabled = choice;


  var all = document.getElementsByClassName('main-alt');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';
  
  var all = document.getElementsByClassName('main-alt');    
  if(choice == true){
  var all = document.getElementsByClassName('main-alt');  
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';  
  all[0].style.backgroundColor = '#5790b3';
  }
  
  this.SelectMainHighCost(this.state.CurrCostChoice);
}






}
 

SelectNumOfTargets= (choice) =>  { 

  var all = document.getElementsByClassName('ST');  
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}       
  //all[0].style.display = 'none';
  var all = document.getElementsByClassName('DT'); 
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}        
 // all[0].style.display = 'none';
  var all = document.getElementsByClassName('TT'); 
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'none';}      
  //all[0].style.display = 'none';
 

  var all = document.getElementsByClassName('targets-choices-ST');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';
  var all = document.getElementsByClassName('targets-choices-DT');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';
  var all = document.getElementsByClassName('targets-choices-TT');    
  all[0].style.backgroundColor = '#7b8084';
  all[0].style.boxShadow = 'unset';

 if(choice == 'ST'){
var all = document.getElementsByClassName('ST'); 
for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'list-item';}   
var all = document.getElementsByClassName('targets-choices-ST'); 
all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
all[0].style.backgroundColor = '#5790b3';
 }
 if(choice == 'DT'){
  var all = document.getElementsByClassName('DT'); 
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'list-item';}   
  var all = document.getElementsByClassName('targets-choices-DT'); 
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
  all[0].style.backgroundColor = '#5790b3';
 }
 if(choice == 'TT'){
  var all = document.getElementsByClassName('TT');  
  for(var x = 0; x < all.length;x++){all[x].style.display= all[x].style.display = 'list-item';}   
  var all = document.getElementsByClassName('targets-choices-TT'); 
  all[0].style.boxShadow = 'inset 0px 0px 4px 2px #adade8';   
  all[0].style.backgroundColor = '#5790b3';
 }
}

 
 CalculateDPS = (Data)  =>{

  for(var x = 0; x < Data.length; x++)
  {
   // if(Data[x].Skill.length != 0){
      //for(var y = 0; y < Data[x].Skill.length; y++)
     // {
    
  var arcanedmg = Data[x].Skill.Arcane;
  var physicaldmg = Data[x].Skill.Physical;
  var bleeddmg = Data[x].Skill.Bleed;

  //This will be only for cross skill
  //Add if cross skill flag here.
  if(Data[x].Skill.CrossSkill == true || Data[x].Skill.CrossSkill == "TRUE")
  {
  arcanedmg = arcanedmg + (Data[x].Skill.ArcaneByStar * 10);
  physicaldmg = physicaldmg + (Data[x].Skill.PhysicalByStar * 10);
  bleeddmg = bleeddmg + (Data[x].Skill.BleedByStar * 10);
  }
  //Add if not cross skill here
  if(Data[x].Skill.CrossSkill == false || Data[x].Skill.CrossSkill == "FALSE")
  {
    var SkillLevel = 24;
    

    arcanedmg = arcanedmg + (Data[x].Skill.ArcaneRatio * SkillLevel);
    physicaldmg = physicaldmg + (Data[x].Skill.PhysicalRatio * SkillLevel);
  }
  if(Data[x].Skill.CrossSkill == undefined)
  {
    var SkillLevel = 24;
  
  arcanedmg = arcanedmg + (Data[x].Skill.ArcaneGrowth * SkillLevel);
  physicaldmg = physicaldmg + (Data[x].Skill.PhysicalGrowth  * SkillLevel);
  bleeddmg = bleeddmg +  (Data[x].Skill.BleedGrowth * SkillLevel);
  }





  arcanedmg = arcanedmg/100;
  physicaldmg = physicaldmg/100;
  bleeddmg = bleeddmg/100;

  if(Data[x].Skill.Skills != undefined)
  {
    Data[x].Skill.SkillName = Data[x].Skill.Skills;
  }



  var atkmod = 0;
  var ccmod = 0;
  var cdmod = 0;
  var dmgmod = 0;
  var basedmgmod = 0;



  if(Data[x].Alt != undefined)
  {
    if(Data[x].Alt.atkmod != 0){Data[x].Combined.Attack += Data[x].Alt.atkmod;}
    if(Data[x].Alt.ccmod != 0){ccmod = Data[x].Alt.ccmod/100;}
    if(Data[x].Alt.cdmod != 0){cdmod = Data[x].Alt.cdmod/100;}
    if(Data[x].Alt.dmgmod != 0){dmgmod = Data[x].Alt.dmgmod/100;}
    
  }

  if(Data[x].Skill.SkillName == "Mother's Rosario"){ccmod = ccmod + .25;} //Increased Crit Chance
  if(Data[x].Skill.SkillName == "Starburst Stream"){ccmod = ccmod + .25;} //Increased Crit Chance
  //if(Data[x].Skill.SkillName == "Valkyria's Raid"){basedmgmod = 1425;} //Increased dmg%
  if(Data[x].Skill.SkillName == "Demolition"){ccmod = ccmod + .25;} //Increased dmg%


  if(Data[x].Skill.SkillName == "Valkyria on the Battlefield"){
    //basedmgmod = 7475;
    var bonusAtk = 0;
    bonusAtk = Data[x].Combined.Attack * 0.42;
    if(bonusAtk < 7475)
    {
      Data[x].Combined.Attack = Data[x].Combined.Attack + bonusAtk;
    }
    else
    {
      Data[x].Combined.Attack = Data[x].Combined.Attack + 7475;
    }

  } //Increased dmg%

  
  if(Data[x].Skill.SkillName == "Valkyria's Raid"){
    //basedmgmod = 7475;
    var bonusAtk = 0;
    bonusAtk = Data[x].Supp.Attack * 0.1228;
    if(bonusAtk < 1450)
    {
      Data[x].Combined.Attack = Data[x].Combined.Attack + bonusAtk;
    }
    else
    {
      Data[x].Combined.Attack = Data[x].Combined.Attack + 1450;
    }

  } //Increased dmg%

  //Data[x].Skill.Damage = (Data[x].Combined.Attack * arcanedmg) + (Data[x].Combined.Attack  * physicaldmg) + ((Data[x].Combined.Attack  * bleeddmg) * Data[x].Skill.BleedDuration );
  if(Data[x].SkillDmg == undefined){Data[x].SkillDmg = ""}
  //Data[x].SkillDmg.push((Data[x].Combined.Attack * arcanedmg) + (Data[x].Combined.Attack  * physicaldmg) + ((Data[x].Combined.Attack  * bleeddmg) * Data[x].Skill.BleedDuration ));


  if(Data[x].Skill.SkillName == "Plasma" && Data[x].Alt != undefined){
    arcanedmg = arcanedmg + 0.0931 * 5;
  }

  Data[x].SkillDmg = (Data[x].Combined.Attack * arcanedmg) + (Data[x].Combined.Attack  * physicaldmg);

  bleeddmg = (Data[x].Combined.Attack  * bleeddmg) * (Data[x].Skill.BleedDuration * 3);
 // Data[x].SkillDmg = (Data[x].Combined.Attack * arcanedmg) + (Data[x].Combined.Attack  * physicaldmg) + ((Data[x].Combined.Attack  * bleeddmg) * (Data[x].Skill.BleedDuration * 3) );



  Data[x].SkillDmg = (((1-((Data[x].Combined.CC/100)+ccmod))) * (Data[x].SkillDmg * (1 + dmgmod))) + (((Data[x].Combined.CC/100)+ccmod) * ((Data[x].SkillDmg * (1 + dmgmod)) * (1+((Data[x].Combined.CD/100) + cdmod))));
  Data[x].SkillDmg = Data[x].SkillDmg + basedmgmod;
  Data[x].SkillDmg =   Data[x].SkillDmg + (bleeddmg * (1+dmgmod));

  if(bleeddmg != 0)
  {
   // if(Data[x].SkillName != "Blazing Charge")
   // {
   //   Data[x].BleedDmg =  (bleeddmg * (1));
    //}
    //else
    //{
      Data[x].BleedDmg =  (bleeddmg * (1+dmgmod));
    //}
  }
  
  }


  return Data;

 }

 
 CreateList = (Data, List, type)  =>{
  var max = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  var byCost = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  var byCostClimax = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  var byCost1T = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  var byCost2T = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  var byCostClimax1T = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  var byCostClimax2T = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  //Data.sort((a, b) => b.SkillDmg - a.SkillDmg);

  for(var x = 0; x < Data.length; x++)
  {
    if(Data[x].Skill.SkillNumber == 3 || Data[x].Skill.CostType == "SP")
    {
      byCostClimax[Data[x].Skill.Cost].push(Data[x]);
    }
    else
    {
      byCost[Data[x].Skill.Cost].push(Data[x]);
    }
  }
  
  byCost1T = JSON.parse(JSON.stringify(byCost))
  byCost2T = JSON.parse(JSON.stringify(byCost))
  byCostClimax1T = JSON.parse(JSON.stringify(byCostClimax))
  byCostClimax2T = JSON.parse(JSON.stringify(byCostClimax))

  for(var x = 0; x < byCost1T.length; x++)
  {
    for(var y = 0; y < byCost1T[x].length; y++)
    {
      if(byCost1T[x][y].Skill.SkillName != "Horizontal Arc") //Kirito DB 
      {

      if(byCost1T[x][y].Skill.Hits == '123')
      {
        byCost1T[x][y].SkillDmg = byCost1T[x][y].SkillDmg/3;
      }
      else if(byCost1T[x][y].Skill.Hits == '12' ||byCost1T[x][y].Skill.Hits == '23' || byCost1T[x][y].Skill.Hits == '13')
      {
        byCost1T[x][y].SkillDmg = byCost1T[x][y].SkillDmg/2;
      }

      if(byCost2T[x][y].Skill.Hits == '123')
      {
        byCost2T[x][y].SkillDmg = (byCost2T[x][y].SkillDmg/3)*2;
      }
    }

    }
  }

  
  for(var x = 0; x < byCostClimax1T.length; x++)
  {
    for(var y = 0; y < byCostClimax1T[x].length; y++)
    {
      if(byCostClimax1T[x][y].Skill.Hits == '123')
      {
        byCostClimax1T[x][y].SkillDmg = byCostClimax1T[x][y].SkillDmg/3;
      }
      else if(byCostClimax1T[x][y].Skill.Hits == '12' ||byCostClimax1T[x][y].Skill.Hits == '23' || byCostClimax1T[x][y].Skill.Hits == '13')
      {
        byCostClimax1T[x][y].SkillDmg = byCostClimax1T[x][y].SkillDmg/2;
      }

      if(byCostClimax2T[x][y].Skill.Hits == '123')
      {
        byCostClimax2T[x][y].SkillDmg = (byCostClimax2T[x][y].SkillDmg/3)*2;
      }

    }
  }

  for(var x = 0; x < byCost.length; x++)
  {
    byCost[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
    byCost1T[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
    byCost2T[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
  }

  
  for(var x = 0; x < byCostClimax.length; x++)
  {
    byCostClimax[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
    byCostClimax1T[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
    byCostClimax2T[x].sort((a, b) => b.SkillDmg - a.SkillDmg);
  }


  for(var x = 0; x < byCost.length; x++)
  {
    if(type == "CLIMAX")
    {
      if(byCostClimax[x].length != 0 ){
        for(var y = 0; y < byCostClimax[x].length; y++)
        { 
      var z = byCostClimax[x][y].Skill.Cost; //y == skill cost
        if((byCostClimax[x][y].Skill.CostType == "SP" || byCostClimax[x][y].Skill.SkillNumber == 3 )&& byCostClimax[x][y].Skill.CrossSkill != "TRUE") //Climax
        {
          List[z].push(
            
            <li key={byCostClimax[x][y].SkillDmg}  class="TT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax[x][y].Main.Icon} alt=""/>
                </span>
                   <a href={'/char/m/' + byCostClimax[x][y].Main.Name.replace(" ", "_")} class="ranking-name">{byCostClimax[x][y].Main.Name}</a>
      
                    
      
                    <span class="damage">
                  {byCostClimax[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-(byCostClimax[x][y].SkillDmg/byCostClimax[x][0].SkillDmg*100)+'%'}}>
                    </span>
                  <span class="percent" style={{'width': (byCostClimax[x][y].BleedDmg/byCostClimax[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax2T[x][y].SkillDmg}  class="DT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax2T[x][y].Main.Icon} alt=""/>
                </span>
                   <a href={'/char/m/' + byCostClimax2T[x][y].Main.Name.replace(" ", "_")} class="ranking-name">{byCostClimax2T[x][y].Main.Name}</a>
      
      
                    <span class="damage">
                  {byCostClimax2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax2T[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax2T[x][y].SkillDmg/byCostClimax2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax2T[x][y].BleedDmg*(2/3))/byCostClimax2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax1T[x][y].SkillDmg}  class="ST">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax1T[x][y].Main.Icon} alt=""/>
                </span>
                   <a href={'/char/m/' + byCostClimax1T[x][y].Main.Name.replace(" ", "_")} class="ranking-name">{byCostClimax1T[x][y].Main.Name}</a>
      
      
                    <span class="damage">
                  {byCostClimax1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   
                   <span class="damage-by-cost">
                  {(byCostClimax1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax1T[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax1T[x][y].SkillDmg/byCostClimax1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax1T[x][y].BleedDmg*(1/3))/byCostClimax1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
        }
        else
        {
          
          List[z].push(
            
            <li key={byCostClimax[x][y].SkillDmg}  class="TT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCostClimax[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCostClimax[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax[x][y].Supp.Name}</a>
      
                    </span>
                    
      
                    <span class="damage">
                  {byCostClimax[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-(byCostClimax[x][y].SkillDmg/byCostClimax[x][0].SkillDmg*100)+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax[x][y].BleedDmg*(3/3))/byCostClimax[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax2T[x][y].SkillDmg}  class="DT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax2T[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax2T[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCostClimax2T[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax2T[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCostClimax2T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax2T[x][y].Supp.Name}</a>
      
                    </span>
      
                    <span class="damage">
                  {byCostClimax2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax2T[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax2T[x][y].SkillDmg/byCostClimax2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax2T[x][y].BleedDmg*(2/3))/byCostClimax2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax1T[x][y].SkillDmg}  class="ST">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax1T[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax1T[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCostClimax1T[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax1T[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCostClimax1T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax1T[x][y].Supp.Name}</a>
      
                    </span>
      
                    <span class="damage">
                  {byCostClimax1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   
                   <span class="damage-by-cost">
                  {(byCostClimax1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax1T[x][y].Skill.SkillName}
                   </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax1T[x][y].SkillDmg/byCostClimax1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax1T[x][y].BleedDmg*(1/3))/byCostClimax1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
        }
      }}
    }
    else if (type == undefined)
    {

      for(var y = 0; y < byCost1T[x].length; y++)
      { 
        var z = byCost[x][y].Skill.Cost; //y == skill cost
        
         
          
         if(byCost[x][y].Skill.SkillNumber == 2 || byCost[x][y].Skill.SkillNumber == 1)
         {
           //if(List[y].length == 0){max[y] = byCost[x][y].SkillDmg}
           List[z].push(
       
             <li  key={byCost[x][y].SkillDmg}  class="TT">
       
             <span class="ranking-item">
               <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                 <span class="icon">
                   <img class="ranking-image" src={byCost[x][y].Main.Icon} alt=""/>
                 </span>
                     <a href={'/char/m/' + byCost[x][y].Main.Name.replace(" ", "_")} class="ranking-name">{byCost[x][y].Main.Name}</a>
       
       
                    <span class="damage">
                    {byCost[x][y].SkillDmg.toFixed(2)}
                     </span>
                   <span class="damage-by-cost">
                  {(byCost[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                     <span class="skillname">
                    {byCost[x][y].Skill.SkillName}
                     </span>
                  </span>
       
                  <span class="percent-bar">
                    <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                     </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                  </span>
       
             </li>
           );
  
           List[z].push(
       
            <li  key={byCost2T[x][y].SkillDmg}  class="DT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost2T[x][y].Main.Icon} alt=""/>
                </span>
                    <a href={'/char/m/' + byCost2T[x][y].Main.Name.replace(" ", "_")}  class="ranking-name">{byCost2T[x][y].Main.Name}</a>
      
      
                   <span class="damage">
                   {byCost2T[x][y].SkillDmg.toFixed(2)}
                    </span>
                   <span class="damage-by-cost">
                  {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                    <span class="skillname">
                   {byCost2T[x][y].Skill.SkillName}
                    </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
  
          List[z].push(
       
            <li  key={byCost1T[x][y].SkillDmg}  class="ST">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost1T[x][y].Main.Icon} alt=""/>
                </span>
                    <a href={'/char/m/' + byCost1T[x][y].Main.Name.replace(" ", "_")}  class="ranking-name">{byCost1T[x][y].Main.Name}</a>
      
      
                   <span class="damage">
                   {byCost1T[x][y].SkillDmg.toFixed(2)}
                    </span>
                   <span class="damage-by-cost">
                  {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                    <span class="skillname">
                   {byCost1T[x][y].Skill.SkillName}
                    </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
         }
         else if(byCost[x][y].Skill.Partner == "No") //Skill 4
         {
          List[z].push(
       
            <li  key={byCost[x][y].SkillDmg}  class="TT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Supp.Icon} alt=""/>
                </span>
                    <a href={'/char/s/' + byCost[x][y].Supp.Name.replace(" ", "_")}  class="ranking-name">{byCost[x][y].Supp.Name}</a>
      
      
                   <span class="damage">
                   {byCost[x][y].SkillDmg.toFixed(2)}
                    </span>
                  <span class="damage-by-cost">
                 {(byCost[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                    <span class="skillname">
                   {byCost[x][y].Skill.SkillName}
                    </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
 
          List[z].push(
      
           <li  key={byCost2T[x][y].SkillDmg}  class="DT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
               <span class="icon">
                 <img class="ranking-image" src={byCost2T[x][y].Supp.Icon} alt=""/>
               </span>
                   <a href={'/char/s/' + byCost2T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name">{byCost2T[x][y].Supp.Name}</a>
     
     
                  <span class="damage">
                  {byCost2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost2T[x][y].Skill.SkillName}
                   </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
 
         List[z].push(
      
           <li  key={byCost1T[x][y].SkillDmg}  class="ST">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
               <span class="icon">
                 <img class="ranking-image" src={byCost1T[x][y].Supp.Icon} alt=""/>
               </span>
                   <a href={'/char/s/' + byCost1T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name">{byCost1T[x][y].Supp.Name}</a>
     
     
                  <span class="damage">
                  {byCost1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost1T[x][y].Skill.SkillName}
                   </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
         }
         else if(byCost[x][y].Skill.Partner != "No") //Skill 5
         {
          List[z].push(
       
            <li  key={byCost[x][y].SkillDmg}  class="TT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCost[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCost[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCost[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost[x][y].Supp.Name}</a>
      
                    </span>
      
                   <span class="damage">
                   {byCost[x][y].SkillDmg.toFixed(2)}
                    </span>
                  <span class="damage-by-cost">
                 {(byCost[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                    <span class="skillname">
                   {byCost[x][y].Skill.SkillName}
                    </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
 
          List[z].push(
      
           <li  key={byCost2T[x][y].SkillDmg}  class="DT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost2T[x][y].Main.Icon} alt=""/>
                </span>
               <span class="icon">
                 <img class="ranking-image" src={byCost2T[x][y].Supp.Icon} alt=""/>
               </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCost2T[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCost2T[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCost2T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost2T[x][y].Supp.Name}</a>
      
                    </span>
     
     
                  <span class="damage">
                  {byCost2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost2T[x][y].Skill.SkillName}
                   </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
 
         List[z].push(
      
           <li  key={byCost1T[x][y].SkillDmg}  class="ST">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost1T[x][y].Main.Icon} alt=""/>
                </span>
               <span class="icon">
                 <img class="ranking-image" src={byCost1T[x][y].Supp.Icon} alt=""/>
               </span>
                    <span class="cross-name">
                    <a href={'/char/m/' + byCost1T[x][y].Main.Name.replace(" ", "_")} class="ranking-name" style={{'font-size':'100%'}}>{byCost1T[x][y].Main.Name}</a>
                    
                    <a href={'/char/s/' + byCost1T[x][y].Supp.Name.replace(" ", "_")} class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost1T[x][y].Supp.Name}</a>
      
                    </span>
     
     
                  <span class="damage">
                  {byCost1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost1T[x][y].Skill.SkillName}
                   </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
         }
        
        
         
        }
    }
    else if (type == "ALT")//Alternate
    {
      
      for(var y = 0; y < byCost1T[x].length; y++)
      { 
        var z = byCost[x][y].Skill.Cost; //y == skill cost
        
         if(byCost[x][y].Alt == undefined)
         {
           byCost[x][y].Alt = {Info: ""};
         }
         if(byCost2T[x][y].Alt == undefined)
         {
           byCost2T[x][y].Alt = {Info: ""};
         }
         if(byCost1T[x][y].Alt == undefined)
         {
           byCost1T[x][y].Alt = {Info: ""};
         }
          
         if(byCost[x][y].Skill.SkillNumber == 2 || byCost[x][y].Skill.SkillNumber == 1)
         {
           //if(List[y].length == 0){max[y] = byCost[x][y].SkillDmg}
           List[z].push(
       
             <li  key={byCost[x][y].SkillDmg}  class="TT ALT">
       
             <span class="ranking-item">
               <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                 <span class="icon">
                   <img class="ranking-image" src={byCost[x][y].Main.Icon} alt=""/>
                 </span>
                     <a href="javascript:;" class="ranking-name">{byCost[x][y].Main.Name}</a>
       
       
                    <span class="damage">
                    {byCost[x][y].SkillDmg.toFixed(2)}
                     </span>
                   <span class="damage-by-cost">
                  {(byCost[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                     <span class="skillname">
                    {byCost[x][y].Skill.SkillName}
                     </span>
                    <span class="alt-info">
                    {byCost[x][y].Alt.Info}
                     </span>
                  </span>
       
                  <span class="percent-bar">
                    <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                     </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                  </span>
       
             </li>
           );
  
           List[z].push(
       
            <li  key={byCost2T[x][y].SkillDmg}  class="DT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost2T[x][y].Main.Icon} alt=""/>
                </span>
                    <a href="javascript:;" class="ranking-name">{byCost2T[x][y].Main.Name}</a>
      
      
                   <span class="damage">
                   {byCost2T[x][y].SkillDmg.toFixed(2)}
                    </span>
                   <span class="damage-by-cost">
                  {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                    <span class="skillname">
                   {byCost2T[x][y].Skill.SkillName}
                    </span>
                    <span class="alt-info">
                    {byCost2T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
  
          List[z].push(
       
            <li  key={byCost1T[x][y].SkillDmg}  class="ST ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost1T[x][y].Main.Icon} alt=""/>
                </span>
                    <a href="javascript:;" class="ranking-name">{byCost1T[x][y].Main.Name}</a>
      
      
                   <span class="damage">
                   {byCost1T[x][y].SkillDmg.toFixed(2)}
                    </span>
                   <span class="damage-by-cost">
                  {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                    <span class="skillname">
                   {byCost1T[x][y].Skill.SkillName}
                    </span>
                    <span class="alt-info">
                    {byCost1T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
         }
         else if(byCost[x][y].Skill.Partner == "No") //Skill 4
         {
          List[z].push(
       
            <li  key={byCost[x][y].SkillDmg}  class="TT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Supp.Icon} alt=""/>
                </span>
                    <a href="javascript:;" class="ranking-name">{byCost[x][y].Supp.Name}</a>
      
      
                   <span class="damage">
                   {byCost[x][y].SkillDmg.toFixed(2)}
                    </span>
                  <span class="damage-by-cost">
                 {(byCost[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                    <span class="skillname">
                   {byCost[x][y].Skill.SkillName}
                    </span>
                    <span class="alt-info">
                    {byCost[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
 
          List[z].push(
      
           <li  key={byCost2T[x][y].SkillDmg}  class="DT ALT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
               <span class="icon">
                 <img class="ranking-image" src={byCost2T[x][y].Supp.Icon} alt=""/>
               </span>
                   <a href="javascript:;" class="ranking-name">{byCost2T[x][y].Supp.Name}</a>
     
     
                  <span class="damage">
                  {byCost2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost2T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCost2T[x][y].Alt.Info}
                     </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
 
         List[z].push(
      
           <li  key={byCost1T[x][y].SkillDmg}  class="ST ALT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
               <span class="icon">
                 <img class="ranking-image" src={byCost1T[x][y].Supp.Icon} alt=""/>
               </span>
                   <a href="javascript:;" class="ranking-name">{byCost1T[x][y].Supp.Name}</a>
     
     
                  <span class="damage">
                  {byCost1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost1T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCost1T[x][y].Alt.Info}
                     </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
         }
         else if(byCost[x][y].Skill.Partner != "No") //Skill 5
         {
          List[z].push(
       
            <li  key={byCost[x][y].SkillDmg}  class="TT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCost[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCost[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost[x][y].Supp.Name}</a>
      
                    </span>
      
                   <span class="damage">
                   {byCost[x][y].SkillDmg.toFixed(2)}
                    </span>
                  <span class="damage-by-cost">
                 {(byCost[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                    <span class="skillname">
                   {byCost[x][y].Skill.SkillName}
                    </span>
                    <span class="alt-info">
                    {byCost[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                   <span class="percent" style={{'width': 100-byCost[x][y].SkillDmg/byCost[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCost[x][y].BleedDmg*(3/3))/byCost[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            </li>
          );
 
          List[z].push(
      
           <li  key={byCost2T[x][y].SkillDmg}  class="DT ALT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost2T[x][y].Main.Icon} alt=""/>
                </span>
               <span class="icon">
                 <img class="ranking-image" src={byCost2T[x][y].Supp.Icon} alt=""/>
               </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCost2T[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost2T[x][y].Supp.Name}</a>
      
                    </span>
     
     
                  <span class="damage">
                  {byCost2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost2T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost2T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCost2T[x][y].Alt.Info}
                     </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost2T[x][y].SkillDmg/byCost2T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost2T[x][y].BleedDmg*(2/3))/byCost2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
 
         List[z].push(
      
           <li  key={byCost1T[x][y].SkillDmg}  class="ST ALT">
     
           <span class="ranking-item">
             <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCost1T[x][y].Main.Icon} alt=""/>
                </span>
               <span class="icon">
                 <img class="ranking-image" src={byCost1T[x][y].Supp.Icon} alt=""/>
               </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCost1T[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCost1T[x][y].Supp.Name}</a>
      
                    </span>
     
     
                  <span class="damage">
                  {byCost1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                  <span class="damage-by-cost">
                 {(byCost1T[x][y].SkillDmg/z).toFixed(2)}
                  </span>
                   <span class="skillname">
                  {byCost1T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCost1T[x][y].Alt.Info}
                     </span>
                </span>
     
                <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCost1T[x][y].SkillDmg/byCost1T[x][0].SkillDmg*100+'%'}}>
                   </span>
                  <span class="percent" style={{'width': ((byCost1T[x][y].BleedDmg*(1/3))/byCost1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                </span>
     
           </li>
         );
         }
        
        
         
        }
    }
    else if (type == "ALTCLIMAX")
    {
      

        for(var y = 0; y < byCostClimax[x].length; y++)
        { 

          
      if(byCostClimax[x].length != 0 ){
        
        if(byCostClimax[x][y].Alt == undefined)
        {
          byCostClimax[x][y].Alt = {Info: ""};
        }
        if(byCostClimax2T[x][y].Alt == undefined)
        {
          byCostClimax2T[x][y].Alt = {Info: ""};
        }
        if(byCostClimax1T[x][y].Alt == undefined)
        {
          byCostClimax1T[x][y].Alt = {Info: ""};
        }

      var z = byCostClimax[x][y].Skill.Cost; //y == skill cost
        if((byCostClimax[x][y].Skill.CostType == "SP" || byCostClimax[x][y].Skill.SkillNumber == 3 )&& byCostClimax[x][y].Skill.CrossSkill != "TRUE") //Climax
        {
          List[z].push(
            
            <li key={byCostClimax[x][y].SkillDmg}  class="TT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax[x][y].Main.Icon} alt=""/>
                </span>
                   <a href="javascript:;" class="ranking-name">{byCostClimax[x][y].Main.Name}</a>
      
                    
      
                    <span class="damage">
                  {byCostClimax[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-(byCostClimax[x][y].SkillDmg/byCostClimax[x][0].SkillDmg*100)+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax[x][y].BleedDmg*(3/3))/byCostClimax[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax2T[x][y].SkillDmg}  class="DT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax2T[x][y].Main.Icon} alt=""/>
                </span>
                   <a href="javascript:;" class="ranking-name">{byCostClimax2T[x][y].Main.Name}</a>
      
      
                    <span class="damage">
                  {byCostClimax2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax2T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax2T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax2T[x][y].SkillDmg/byCostClimax2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax2T[x][y].BleedDmg*(2/3))/byCostClimax2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax1T[x][y].SkillDmg}  class="ST ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                 <img class="ranking-image" src={byCostClimax1T[x][y].Main.Icon} alt=""/>
                </span>
                   <a href="javascript:;" class="ranking-name">{byCostClimax1T[x][y].Main.Name}</a>
      
      
                    <span class="damage">
                  {byCostClimax1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   
                   <span class="damage-by-cost">
                  {(byCostClimax1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax1T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax1T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax1T[x][y].SkillDmg/byCostClimax1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax1T[x][y].BleedDmg*(1/3))/byCostClimax1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
        }
        else
        {
          
          List[z].push(
            
            <li key={byCostClimax[x][y].SkillDmg}  class="TT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax[x][y].Supp.Name}</a>
      
                    </span>
                    
      
                    <span class="damage">
                  {byCostClimax[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-(byCostClimax[x][y].SkillDmg/byCostClimax[x][0].SkillDmg*100)+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax[x][y].BleedDmg*(3/3))/byCostClimax[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax2T[x][y].SkillDmg}  class="DT ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax2T[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax2T[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax2T[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax2T[x][y].Supp.Name}</a>
      
                    </span>
      
                    <span class="damage">
                  {byCostClimax2T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   <span class="damage-by-cost">
                  {(byCostClimax2T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax2T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax2T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax2T[x][y].SkillDmg/byCostClimax2T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax2T[x][y].BleedDmg*(2/3))/byCostClimax2T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
          List[z].push(
            
            <li key={byCostClimax1T[x][y].SkillDmg}  class="ST ALT">
      
            <span class="ranking-item">
              <span class="rank">{Math.floor((List[z].length/3)+1)}</span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax1T[x][y].Main.Icon} alt=""/>
                </span>
                <span class="icon">
                  <img class="ranking-image" src={byCostClimax1T[x][y].Supp.Icon} alt=""/>
                </span>
                    <span class="cross-name">
                    <a href="javascript:;" class="ranking-name" style={{'font-size':'100%'}}>{byCostClimax1T[x][y].Main.Name}</a>
                    
                    <a href="javascript:;" class="ranking-name" style={{'margin-left':'5px', 'font-size':'100%'}}>+ {byCostClimax1T[x][y].Supp.Name}</a>
      
                    </span>
      
                    <span class="damage">
                  {byCostClimax1T[x][y].SkillDmg.toFixed(2)}
                   </span>
                   
                   <span class="damage-by-cost">
                  {(byCostClimax1T[x][y].SkillDmg/z).toFixed(2)}
                   </span>
                   <span class="skillname">
                  {byCostClimax1T[x][y].Skill.SkillName}
                   </span>
                    <span class="alt-info">
                    {byCostClimax1T[x][y].Alt.Info}
                     </span>
                 </span>
      
                 <span class="percent-bar">
                  <span class="percent" style={{'width': 100-byCostClimax1T[x][y].SkillDmg/byCostClimax1T[x][0].SkillDmg*100+'%'}}>
                    </span>
                  <span class="percent" style={{'width': ((byCostClimax1T[x][y].BleedDmg*(1/3))/byCostClimax1T[x][0].SkillDmg*100)+'%', background: 'rgba(255, 20, 42, 0.88)'}}>
                    </span>
                 </span>
      
            
            </li>
          );
        }
      }}
    }
    
  }

  return List;
 }

 

}

export default Skills;
