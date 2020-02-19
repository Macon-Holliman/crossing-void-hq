import React, { Component } from 'react';
import './Stats.scss';
import Talent from '../Talent/Talent';
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { useParams } from 'react-router';
let names = require('../Data/Mains.json');
let supports = require('../Data/Supports.json');
let ItemsDB = require('../Data/Items.json');

class Stats extends Component {
  componentDidMount()
  {
    
    //Loading character//////////////////


    if(this.props.LoadedCharacter != "" && this.props.LoadedCharacter != undefined)
    {
      if(this.props.use == "supports")
      {
        this.state.LoadCharacter = this.props.LoadedCharacter.Supp;
      }
      else
      {
        this.state.LoadCharacter = this.props.LoadedCharacter.Main;
      }
      if(this.state.LoadCharacter != undefined)
      {

        this.LoadCharacter();
      }
    }



    ///////////////////////////////

  }
  constructor(props) {
    super(props);
    this.state = {
      FinalDmg: 0,
      CharCount: 0,
      CharStored: [],
      LoadCharacter: {},
      CharacterName: "",
      Rarity: 'S',
      Level: 1,
      Stars: 1,
      SubStars: 0,
      Weapon: "None",
      ItemOne: "1",
      ItemTwo: "2",
      ItemThree: "3",
      ItemFour: "4",
      TalentOne: false,
      TalentTwo: "",
      TalentThree: "",
      TalentFour: "",
      mainCharacters: names,
      HP: 0,
      PDEF: 0,
      ADEF: 0,
      Speed: 0,
      Attack: 0,
      CC: 0,
      CD: 0,
      BaseATK: 0,
      BaseATKRarity: 0,
      BaseHP: 0,
      BaseHPRarity: 0,
      BasePDEF: 0,
      BasePDEFRarity: 0,
      BaseADEF: 0,
      BaseADEFRarity: 0,
      AtkGrowth: 0,
      HPGrowth: 0,
      PDefGrowth: 0,
      ADefGrowth: 0,
      ATKFromLevels: 0,
      StarGrowthATK: 0,
      StarGrowthHP: 0,
      StarGrowthPDEF: 0,
      StarGrowthADEF: 0,
      GrowthPercentage: 0,
      NextGrowthPercentage: 0,
      Selector: 0,
      temp: 0,
      TalentsSelected: [
        {Talent: 'Ardor', Used: false, Level: 5},
        {Talent: 'Valor', Used: false, Level: 5},
        {Talent: 'Strength', Used: false, Level: 5},
        {Talent: 'Aggression', Used: false, Level: 5},
        {Talent: 'Agility', Used: false, Level: 5},
        {Talent: 'Tenacity', Used: false, Level: 5},
        {Talent: 'Sagacity', Used: false, Level: 5},
        {Talent: 'Fortitude', Used: false, Level: 5},
        {Talent: 'Vitality', Used: false, Level: 5},
        {Talent: 'Vigor', Used: false, Level: 5}
      ],
      Talents: [],
      Ability: [],
      BonusesList: [],
      UnusedTalents: ["Ardor", "Vigor", "Grit"],
      UsedTalents: [],
      TalentChoices: [],
      AbilityChoices: [],
      MainCharactersMenu: [],
      ATKAbility: 0,
      ATKAbilityBonus: 0,
      Items: [
        {Item: "", Level: 1, twoPiece: "", fourPiece: "", Set: "", SetName: "", Stats: [{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"}], TotalStat: {Attack: 0, HP: 0, PDEF: 0, ADEF: 0, CritChance: 0, CritDamage: 0}},
        {Item: "", Level: 1, twoPiece: "", fourPiece: "", Set: "", SetName: "", Stats: [{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"}], TotalStat: {Attack: 0, HP: 0, PDEF: 0, ADEF: 0, CritChance: 0, CritDamage: 0}},
        {Item: "", Level: 1, twoPiece: "", fourPiece: "", Set: "", SetName: "", Stats: [{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"}], TotalStat: {Attack: 0, HP: 0, PDEF: 0, ADEF: 0, CritChance: 0, CritDamage: 0}},
        {Item: "", Level: 1, twoPiece: "", fourPiece: "", Set: "", SetName: "", Stats: [{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"},{Tier: "1"}], TotalStat: {Attack: 0, HP: 0, PDEF: 0, ADEF: 0, CritChance: 0, CritDamage: 0}},
        ],
      ItemsStats: [{Attack: 0, HP: 0, PDEF: 0, ADEF: 0}],
      ItemsList: [[],[],[],[]],
      ItemsStatsList: [[{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"}],
      [{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"}],
      [{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"}],
      [{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"},{Stat: "Empty"}]],
      ItemsStatsSelection: ["Attack", "Crit DMG", "Crit Rate", "HP", "P DEF", "A DEF"],
      ItemsChoices: [[],[],[],[],[],[]],
      ItemsStatsChoices: [[],[],[],[],[],[]],
      ItemsStatsSelectionList: [[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]],[[],[],[],[],[],[]]],
      BonusesFromItems: [[],[],[],[]],
      CharacterPicture: "",
      ItemPictures: [],
      TotalStatsFromItems: {
        Attack: 0,
        HP: 0,
        PDEF: 0,
        ADEF: 0,
        BoostedATK: 0,
        BoostedHP: 0,
        BoostedPDEF: 0,
        BoostedADEF: 0,
      },
      TotalBonusesFromItems: {
        ATKBonus: 0,
        HPBonus: 0,
        PDEFBonus: 0,
        ADEFBonus: 0,
        CCBonus: 0,
        CDBonus: 0,
      },
      Abilities: [
        {Skill: 'ATK Ability', Used: false, Level: 1, Boost: 0},
        {Skill: 'DEF Ability', Used: false, Level: 1, Boost: 0},
        {Skill: 'Survivability', Used: false, Level: 1, Boost: 0},
        {Skill: 'Burst Ability', Used: false, Level: 1, Boost: 0},
      ],
      RarityOptions: ['S','A','B','C'],
      RarityMenu: [],
      StarOptions: [1,2,3,4,5,6],
      StarMenu: [],
      StarsChosen: [],
      SubStarsChosen: [],
      RarityChosen: [],
      ItemsATK: 0,
      ItemsHP: 0,
      ItemsADEF: 0,
      ItemsPDEF: 0,
      ItemsCC: 0,
      ItemsCD: 0,
      CharATK: 0,
      CharHP: 0,
      CharADEF: 0,
      CharPDEF: 0,
      CharCC: 0,
      CharCD: 0,
      ImpWeaponsList: [
        [  "Gada of Indra", "Vermillion Bird", "Da Sheng Yi Yin", "Jarngreipr" ,"Lamp of Nightingale",], 
        [  "Aegis of Zeus", "Muramasa", "Olive-wood Club of Heracles", "Shield of Xingtian"]
      ],
      ImpWeaponStats: {Name: "", Upgrade: 0, Phase: 0, Attack: 0, HP: 0, PDEF: 0, ADEF: 0, CC: 0, CD: 0, AttackTier: 0, HPTier: 0, PDEFTier: 0, ADEFTier: 0, CCTier: 0, CDTier: 0},
      ImpWeaponMenu: [],
      ImpWeaponStatsMenu: [],
      ImpWeapon: [],
      Bonuses: {},
      ItemsBonusesActive: [],
      ItemsBonuses: [ 
        {Set: "Alternative Fashion", Count: 0},
        {Set: "Assemble! Gekota", Count: 0},
        {Set: "Poser", Count: 0},
        {Set: "Shizu-chan's Weapon", Count: 0},
      ],
      ItemBonusesList:[ 
        {Set: "Alternative Fashion", TwoPC: "3%", FourPC: ""},
        {Set: "Assemble! Gekota", TwoPC: "3%", FourPC: ""},
        {Set: "Poser", TwoPC: "3%", FourPC: ""},
        {Set: "Shizu-chan's Weapon", TwoPC: "3%", FourPC: ""},
      ],
    };

    var defaultImg = "https://i.imgur.com/n3lPnpt.png";
    if(this.props.use == "supports")
    {
      this.state.mainCharacters = supports;
      defaultImg = "https://i.imgur.com/8cxJxLg.png";
    }






    //impweapon


    this.UpdateImpWeapon();

    //


    var tempStyle = {};
    for(var x = 0; x < 6; x++){

      if(x == 0){tempStyle = {'background-image': "url(https://i.imgur.com/cfxGxVe.png)",};}
      if(x > 0){tempStyle = {'background-image': "url(https://i.imgur.com/uVfYKBu.png)",};}

      this.state.StarsChosen.push(
        <div key={x} style={tempStyle} onClick={this.SetStars(x)} class="stars-picture">
          
        </div>
        );
      }



      var tempStyle = {
        'background-image': "url(\""+ defaultImg +"\"\)",
        '-webkit-border-radius': '5px',
        '-moz-border-radius': '5px',
        'border-radius': '5px',
      };
      this.state.CharacterPicture = [];
      this.state.CharacterPicture.push(
         <div key={"ChooseCharacter"} style={tempStyle} class="character-picture">
          </div>
      )
    
    for(var x = 0; x < this.state.Items.length; x++){
    this.state.ItemPictures.push(
      <div key={x} style={{'background-image': "url(https://i.imgur.com/v7tuCIe.png)"}} class="item-picture">
        
      </div>
      );
    }

    
    this.state.RarityChosen.push(
      <div key={"rarityChosen"} style={{'background-image': "url(https://i.imgur.com/mYygdJR.png)"}} class="rarity-picture">
      </div>
      );
    
    
for (var i = 0; i < this.state.RarityOptions.length; i++) {
  
  var tempImage = "";
  if(i == 0){tempImage="https://i.imgur.com/mYygdJR.png";}
  if(i == 1){tempImage="https://i.imgur.com/RgjHo1d.png";}
  if(i == 2){tempImage="https://i.imgur.com/vIM4opt.png";}
  if(i == 3){tempImage="https://i.imgur.com/L5yy5LQ.png";}

  this.state.RarityMenu.push(
     <a key={this.state.RarityOptions[i]} onClick={this.SetRarity(i)}>
       <div key={this.state.RarityOptions[i]} style={{'background-image': "url("+ tempImage +")"}} class="rarity-menu-picture">
        </div>
      </a>
  )
}

   
for (var i = 0; i < this.state.StarOptions.length; i++) {
  this.state.StarMenu.push(
     <a key={this.state.StarOptions[i]} onClick={this.SetStars("testing")}>
        <div type="checkbox" style={{float: 'left'}} ></div>
        {this.state.StarOptions[i]}
      </a>
  )
}

    
    for (var i = 0; i < this.state.mainCharacters.length; i++) {
      var right = "0px";
      var bottom = "83%";
      
      if(this.props.use == "supports"){
        if(this.state.mainCharacters[i].Name == "Alicia"){bottom = "76%";}
        if(this.state.mainCharacters[i].Name == "Boogiepop"){bottom = "81%";}
        if(this.state.mainCharacters[i].Name == "Celty"){bottom = "76%";}
        if(this.state.mainCharacters[i].Name == "Enju"){bottom = "76%";}
        if(this.state.mainCharacters[i].Name == "Erio"){bottom = "81%";}
        if(this.state.mainCharacters[i].Name == "Frolaytia"){bottom = "74%";}
        if(this.state.mainCharacters[i].Name == "Haruyuki"){bottom = "76%";}
        if(this.state.mainCharacters[i].Name == "Havia"){bottom = "81%";}
        if(this.state.mainCharacters[i].Name == "Kuroyukihime"){bottom = "64%";}
        if(this.state.mainCharacters[i].Name == "Leafa"){bottom = "78%";}
        if(this.state.mainCharacters[i].Name == "Llenn"){bottom = "76%";}
        if(this.state.mainCharacters[i].Name == "Mashiro"){bottom = "78%";}
        if(this.state.mainCharacters[i].Name == "Selvaria"){bottom = "70%";}
        if(this.state.mainCharacters[i].Name == "Wilhelmina"){bottom = "72%";}
        if(this.state.mainCharacters[i].Name == "Yukina"){bottom = "69%";}
        if(this.state.mainCharacters[i].Name == "Yuuki"){bottom = "82%";}
        if(this.state.mainCharacters[i].Name == "Zero"){bottom = "82%";}
        if(this.state.mainCharacters[i].Name == "Ako"){bottom = "78%";}
        if(this.state.mainCharacters[i].Name == "Asuna"){bottom = " 73%";}
        if(this.state.mainCharacters[i].Name == "Kouko"){bottom = " 86%";}
      }
      else{
        if(this.state.mainCharacters[i].Name == "Ako"){bottom = "78%";}
        if(this.state.mainCharacters[i].Name == "Kirito (Dual Blade)"){bottom = "78%";}
        if(this.state.mainCharacters[i].Name == "Kuroyukihime"){bottom = "74%";}
        if(this.state.mainCharacters[i].Name == "Shizuo"){bottom = "82%";}
        if(this.state.mainCharacters[i].Name == "Yukina"){bottom = "61%";}
        if(this.state.mainCharacters[i].Name == "Accelerator"){bottom = "59%";}
        if(this.state.mainCharacters[i].Name == "Kuroko"){bottom = "81%";}
        if(this.state.mainCharacters[i].Name == "Kuroyukihime (Butterfly)"){bottom = "61%";}
        if(this.state.mainCharacters[i].Name == "Kimono Shana"){bottom = "80%";}
      }



      var tempStyle = {
        'background-image': "url(\""+ this.state.mainCharacters[i].Image +"\"\)",
        'background-position': 'right ' + right + ' bottom '+ bottom +'',
    };

      this.state.MainCharactersMenu.push(
         <a key={this.state.mainCharacters[i].Name} style={tempStyle} class="character-selection" onClick={this.ChangeCharacter(this.state.mainCharacters[i].Name, i)}>
            { }
          </a>
      )
    }

for (var i = 0; i < this.state.TalentsSelected.length; i++) {
  this.state.TalentChoices.push(
     <a key={this.state.TalentsSelected[i].Talent}  onClick={this.SetTalent(i,!this.state.TalentsSelected[i].Used, this.state.TalentsSelected[i].Level)}>
        <div type="checkbox" style={{float: 'left'}} value={this.state.TalentsSelected[i].Used}></div>
        {this.state.TalentsSelected[i].Talent}
        <input class="talent-input" type="number" style={{width: '25%', float: 'right'}} value={this.state.TalentsSelected[i].Level} onChange={this.SetTalent(i,this.state.TalentsSelected[i].Used, this.state.TalentsSelected[i].Level)}/>
      </a>
  )
}


for (var i = 0; i < this.state.Abilities.length; i++) {
  this.state.AbilityChoices.push(
     <a key={this.state.Abilities[i].Skill}  onClick={this.SetAbility(i,!this.state.Abilities[i].Used, this.state.Abilities[i].Level)}>
       {this.state.Abilities[i].Skill}
        <input class="ability-input" type="number" style={{width: '25%', float: 'right'}} value={this.state.Abilities[i].Level} onChange={this.SetAbility(i,this.state.Abilities[i].Used, this.state.Abilities[i].Level)}/>
      </a>
  )
}


for (var i = 0; i < ItemsDB.length; i++) {
  if(ItemsDB[i].Slot == 1)
  {this.state.ItemsList[0].push(ItemsDB[i]);}
  if(ItemsDB[i].Slot == 2)
  {this.state.ItemsList[1].push(ItemsDB[i]);}
  if(ItemsDB[i].Slot == 3)
  {this.state.ItemsList[2].push(ItemsDB[i]);}
  if(ItemsDB[i].Slot == 4)
  {this.state.ItemsList[3].push(ItemsDB[i]);}
}

for (var h = 0; h < this.state.Items.length; h++) {
for (var i = 0; i < this.state.ItemsList[h].length; i++) {
  this.state.ItemsChoices[h].push(
     <a key={this.state.ItemsList[h][i].Talent} onClick={this.SetItem(this.state.ItemsList[h][i].Item,h,this.state.ItemsList[h][i])}>
     <div key={this.state.ItemsList[h][i].Item} style={{'background-image': "url("+ this.state.ItemsList[h][i].Image +")"}} class="item-menu-picture">
       <span class="item-menu-text">
       </span>
     </div>
      </a>
  )
}
}


for (var h = 0; h < this.state.Items.length; h++) {






  for (var i = 0; i < this.state.ItemsStatsList[h].length; i++) {

    
    var tempStyle = {};
      tempStyle = {'background-image': "url(https://i.imgur.com/e0Pk0ZG.png)",};
      if(x > 0){tempStyle = {'background-image': "url(https://i.imgur.com/k1P0Ptl.png)",};}
      var tempDiv = [];

      //g is item slot
      //then g.stats
      //h is stat
      //h.tier is rank
      //if g.stats[h].tier
      var tempStyleAssignment = [];
      for(var x = 0; x < 5; x++){
        tempStyleAssignment[x] = {'background-image': "url(https://i.imgur.com/k1P0Ptl.png)"};
      }
      
      for(var x = 0; x < this.state.Items[h].Stats[i].Tier; x++){
        tempStyleAssignment[x] = {'background-image': "url(https://i.imgur.com/e0Pk0ZG.png)"};
      }
      
      tempDiv.push(<div>

        <div key={h} style={tempStyleAssignment[0]} onClick={this.SetItemStatValue(1,h,i)} class="item-stats-picture">
        </div>
        <div key={h} style={tempStyleAssignment[1]} onClick={this.SetItemStatValue(2,h,i)} class="item-stats-picture">
        </div>
        <div key={h} style={tempStyleAssignment[2]} onClick={this.SetItemStatValue(3,h,i)} class="item-stats-picture">
        </div>
        <div key={h} style={tempStyleAssignment[3]} onClick={this.SetItemStatValue(4,h,i)} class="item-stats-picture">
        </div>
        <div key={h} style={tempStyleAssignment[4]} onClick={this.SetItemStatValue(5,h,i)} class="item-stats-picture">
        </div>

        </div>
        );




    this.state.ItemsStatsChoices[h].push(
       <a key={i} >
          <div class="stats-selection">
            <span class="item-stats-text" >{this.state.ItemsStatsList[h][i].Stat}</span>

              <div key={this.state.ItemsStatsSelection[i]}> 
                  {tempDiv}
              </div>

              <div class="stats-choices">
                {this.state.ItemsStatsSelectionList[h][i]}
              </div>
          </div>
        </a>
    )
  }
  }

//Create onclick function below to store the info about the selected attack and reflect it as the chosen stat

for (var g = 0; g < this.state.Items.length; g++) {
  for (var h = 0; h < this.state.ItemsStatsList[g].length; h++) {
    for (var i = 0; i < this.state.ItemsStatsSelection.length; i++) {

      
      if(i == 2 || i == 4)
      {
        
      this.state.ItemsStatsSelectionList[g][h].push(<br/>)
      }
      this.state.ItemsStatsSelectionList[g][h].push(
         <a key={this.state.ItemsStatsSelection[i]} onClick={this.SetItemStat(g,h,i)}> 
            {this.state.ItemsStatsSelection[i]}
         </a>
         
      )
      
    }
  }
}



  

    
  }

  

 render() {


    return (
        
    <div class="stats">
      <div class="character dropdown dropbtn text" >
        {this.state.CharacterPicture}
        <div class="dropdown-content character-selection-dropdown">
          {this.state.MainCharactersMenu}
        </div>
      </div>
      


      
      
      <div class="rarity  rarity-selection" >
        {this.state.RarityChosen[0]}
        <div class="rarity-choices">
        {this.state.RarityMenu}
        </div>
      </div>
      
      <div class="stars">
        <div class="stars-inner">
        {this.state.StarsChosen}
        </div>
        <div class="sub-stars">
        {this.state.SubStarsChosen}
        </div>
      </div>


      <div class="item-one item-selection">
        {this.state.ItemPictures[0]}
        <div class="item-choices item-one-menu">
          {this.state.ItemsChoices[0]}
        </div>
      </div>

      
      <div class="item-two item-selection">
        {this.state.ItemPictures[1]}
        <div class="item-choices item-two-menu">
          {this.state.ItemsChoices[1]}
        </div>
      </div>

      <div class="item-three item-selection">
        {this.state.ItemPictures[2]}
        <div class="item-choices item-three-menu">
          {this.state.ItemsChoices[2]}
        </div>
      </div>

      
      <div class="item-four item-selection">
        {this.state.ItemPictures[3]}
        <div class="item-choices item-four-menu">
          {this.state.ItemsChoices[3]}
        </div>
      </div>



      <div class="item1stats item-stats-selection text">
      <span class="item-name">{this.state.Items[0].Item} </span>
      <input class="item-stats-input" type="text"  value={this.state.Items[0].Level} onChange={this.SetItemLevel(0)}/>
        <div class="item-stats-choices">
          {this.state.ItemsStatsChoices[0]}
        </div>
      </div>

      <div class="item2stats item-stats-selection text">
      <span class="item-name">{this.state.Items[1].Item} </span>
      <input class="item-stats-input" type="text"  value={this.state.Items[1].Level} onChange={this.SetItemLevel(1)}/>
        <div class="item-stats-choices">
          {this.state.ItemsStatsChoices[1]}
        </div>
      </div>

      <div class="item3stats item-stats-selection text">
      <span class="item-name">{this.state.Items[2].Item} </span>
      <input class="item-stats-input" type="text"  value={this.state.Items[2].Level} onChange={this.SetItemLevel(2)}/>
        <div class="item-stats-choices">
          {this.state.ItemsStatsChoices[2]}
        </div>
      </div>

      
      <div class="item4stats item-stats-selection text">
      <span class="item-name">{this.state.Items[3].Item} </span>
      <input class="item-stats-input" type="text"  value={this.state.Items[3].Level} onChange={this.SetItemLevel(3)}/>
        <div class="item-stats-choices">
          {this.state.ItemsStatsChoices[3]}
        </div>
      </div>


     

      <div class="level text">
        <input type="text" class="level-input" id="level" name="level" onChange={this.SetLevel} value={this.state.Level}></input>
      </div>

      <div class="talent-one talent-selection text">
        <div class="talent-choices talent-stats-text">
          {this.state.TalentChoices}
        </div>
      </div>
      

      <div class="abilities ability-selection text">
        <div class="ability-choices ability-stats-text">
          {this.state.AbilityChoices}
        </div>
      </div>


      <div class="awakening">
      <div class="awakening-inner">
        Coming Soon

      </div>
      </div>


      <div class="talents text">
        {this.state.Talents}
      </div>

      <div class="attack stats-text">

        ATK: {this.state.Attack.toFixed()} <br/>
        CC: {this.state.CC.toFixed(2)}% <br/>
        CD: {this.state.CD.toFixed(2)}% <br/>
        HP: {this.state.HP.toFixed()} <br/>
        PDEF: {this.state.PDEF.toFixed()} <br/>
        ADEF: {this.state.ADEF.toFixed()} <br/>
      Speed: {this.state.Speed} <br/>
        
          <div class="stats-inner-text" style={{width: '48%', 'float': 'right', 'margin-right': '2%', 'margin-top': '8px'}}>

      </div>
      
      </div>

      <div class="hp text">
      </div>

      <div class="ability text">
        {this.state.Ability}
      </div>


      <div class="impweapon text impweapon-selection">
        <div class="impweapon-choices">
          {this.state.ImpWeaponStatsMenu}
        </div>
        <div class="impweapon-choices" style={{'right':'100%', 'width': '165%', 'min-width': '50px', 'padding-left': '5px'}}>
          {this.state.ImpWeaponMenu}
        </div>
      </div>


      <div class="bonuses text">
        {this.state.BonusesList}
      </div>

 
    </div>
    );
  }

 UpdateStats = (level, stars, rarity)  =>{



  if(stars == 1){this.state.GrowthPercentage = 0}
  if(stars == 2){this.state.GrowthPercentage = 1; this.state.NextGrowthPercentage =  2.931}
  if(stars == 3){this.state.GrowthPercentage = 2.931; this.state.NextGrowthPercentage =  5.7488634}
  if(stars == 4){this.state.GrowthPercentage = 5.7488634; this.state.NextGrowthPercentage =  9.462629156}
  if(stars == 5){this.state.GrowthPercentage = 9.462629156; this.state.NextGrowthPercentage =  13.791782}
  if(stars == 6){this.state.GrowthPercentage = 13.791782}

  if(rarity == 'S'){this.state.Selector = 0}
  if(rarity == 'A'){this.state.Selector = 1}
  if(rarity == 'B'){this.state.Selector = 2}
  if(rarity == 'C'){this.state.Selector = 3}

  var SubStarRatio = 0;
  if(stars == 5)
  {
    if(this.state.SubStars == 1){SubStarRatio = .10;}
    if(this.state.SubStars == 2){SubStarRatio = .25;}
    if(this.state.SubStars == 3){SubStarRatio = .45;}
    if(this.state.SubStars == 4){SubStarRatio = .70;}
    if(this.state.SubStars == 5){SubStarRatio = 1;}
  }
  if(stars == 4)
  {
    if(this.state.SubStars == 1){SubStarRatio = .10;}
    if(this.state.SubStars == 2){SubStarRatio = .25;}
    if(this.state.SubStars == 3){SubStarRatio = .45;}
    if(this.state.SubStars == 4){SubStarRatio = .70;}
    if(this.state.SubStars == 5){SubStarRatio = 1;}
  }
  if(stars == 3)
  {
    if(this.state.SubStars == 1){SubStarRatio = .10;}
    if(this.state.SubStars == 2){SubStarRatio = .30;}
    if(this.state.SubStars == 3){SubStarRatio = .60;}
    if(this.state.SubStars == 4){SubStarRatio = 1;}
  }
  if(stars == 2)
  {
    if(this.state.SubStars == 1){SubStarRatio = .20;}
    if(this.state.SubStars == 2){SubStarRatio = .50;}
    if(this.state.SubStars == 3){SubStarRatio = 1;}
  }
  
  var fullStarvalueHP = ((((((this.state.BaseHP  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage));
  var nextStarHP =((((((this.state.BaseHP  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) ; 
  var DifferenceBetweenNextStarUpHP = (((((((this.state.BaseHP  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) 
  - ((((((this.state.BaseHP  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)));
  var subStarValueHP = DifferenceBetweenNextStarUpHP * SubStarRatio;
  var HPSubStar = fullStarvalueHP + subStarValueHP
  var fullStarvalueATK = ((((((this.state.BaseATK  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage));
  var nextStarATK =((((((this.state.BaseATK  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) ; 
  var DifferenceBetweenNextStarUpATK = (((((((this.state.BaseATK  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) 
  - ((((((this.state.BaseATK  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)));
  var subStarValueATK = DifferenceBetweenNextStarUpATK * SubStarRatio;
  var ATKSubStar = fullStarvalueATK + subStarValueATK
  var fullStarvaluePDEF = ((((((this.state.BasePDEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage));
  var nextStarPDEF =((((((this.state.BasePDEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) ; 
  var DifferenceBetweenNextStarUpPDEF = (((((((this.state.BasePDEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) 
  - ((((((this.state.BasePDEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)));
  var subStarValuePDEF = DifferenceBetweenNextStarUpPDEF * SubStarRatio;
  var PDEFSubStar = fullStarvaluePDEF + subStarValuePDEF
  var fullStarvalueADEF = ((((((this.state.BaseADEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage));
  var nextStarADEF =((((((this.state.BaseADEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) ; 
  var DifferenceBetweenNextStarUpADEF = (((((((this.state.BaseADEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.NextGrowthPercentage)) 
  - ((((((this.state.BaseADEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)));
  var subStarValueADEF = DifferenceBetweenNextStarUpADEF * SubStarRatio;
  var ADEFSubStar = fullStarvalueADEF + subStarValueADEF

  this.setState({ 
    BaseATKRarity: this.state.BaseATK * Math.pow(.847458,this.state.Selector),
    BaseHPRarity: this.state.BaseHP * Math.pow(.847458,this.state.Selector),
    BasePDEFRarity: this.state.BasePDEF * Math.pow(.847458,this.state.Selector),
    BaseADEFRarity: this.state.BaseADEF * Math.pow(.847458,this.state.Selector),
    StarGrowthATK: ((this.state.BaseATKRarity  * 0.409) * Math.pow(.847458,this.state.Selector)),
    StarGrowthHP: ((this.state.BaseHP * 0.409) * Math.pow(.847458,this.state.Selector)),
    StarGrowthPDEF: ((this.state.BasePDEF * 0.409) * Math.pow(.847458,this.state.Selector)),
    StarGrowthADEF: ((this.state.BaseADEF * 0.409) * Math.pow(.847458,this.state.Selector)),
    ATKFromLevels: ((this.state.AtkGrowth *  Math.pow(.847458,this.state.Selector))* (level - 1)),
  }, () => {
    this.setState({
      ItemsHP: (this.state.TotalStatsFromItems.BoostedHP),
      CharHP: ((((this.state.BaseHPRarity) 
      + ((this.state.HPGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (((((((((this.state.BaseHP  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage))
      + (this.state.TalentsSelected[9].Used * (70 * (parseInt(this.state.TalentsSelected[9].Level)/5))))
      * (1 + ((this.state.TalentsSelected[8].Used * (4.995 + (2.895 * ((parseInt(this.state.TalentsSelected[8].Level)/5)-1))))/100))) 
      * ( 1 + (this.state.Abilities[2].Used * this.state.Abilities[2].Boost)/100))))),
      ItemsATK: this.state.TotalStatsFromItems.BoostedATK,
      CharATK: ((((this.state.BaseATKRarity )
      + ((this.state.AtkGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (((((this.state.BaseATK  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)
      + (this.state.TalentsSelected[0].Used * (19 * (parseInt(this.state.TalentsSelected[0].Level)/5))))
      * ((1 + (((this.state.TalentsSelected[1].Used * (4.98 + (2.9 * ((parseInt(this.state.TalentsSelected[1].Level)/5)-1))))/100)
      + (this.state.Abilities[0].Used * ((this.state.Abilities[0].Boost)/100))))))),
      ItemsPDEF: this.state.TotalStatsFromItems.BoostedPDEF,
      CharPDEF:  (((this.state.BasePDEFRarity)
      + ((this.state.PDefGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (((((this.state.BasePDEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)
      + (this.state.TalentsSelected[5].Used * (8 * (parseInt(this.state.TalentsSelected[5].Level)/5)))))
      * (1 + ((this.state.TalentsSelected[7].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[7].Level)/5)-1))))/100))
      *  ( 1 + (this.state.Abilities[1].Used * this.state.Abilities[1].Boost)/100)
      ,
      ItemsADEF: this.state.TotalStatsFromItems.BoostedADEF,
      CharADEF:  (((this.state.BaseADEFRarity) 
      + ((this.state.ADefGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (((((this.state.BaseADEF  * 0.409)) * Math.pow(.847458,this.state.Selector))) * this.state.GrowthPercentage)
      + (this.state.TalentsSelected[4].Used * (8 * (parseInt(this.state.TalentsSelected[4].Level)/5)))))
      * (1 + ((this.state.TalentsSelected[6].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[6].Level)/5)-1))))/100))
      * ( 1 + (this.state.Abilities[1].Used * this.state.Abilities[1].Boost)/100) 
      ,
      ItemsCC: this.state.TotalBonusesFromItems.CCBonus,
      CharCC: (1 + ( (this.state.TalentsSelected[2].Used * (0.995 + ( 0.475 * ((parseInt(this.state.TalentsSelected[2].Level)/5)-1)))))) 
      + this.state.Abilities[3].Used * this.state.Abilities[3].Boost
      ,
      ItemsCD: this.state.TotalBonusesFromItems.CDBonus,
      CharCD: (10 + ( (this.state.TalentsSelected[3].Used * (1.98 + ( 0.95 * ((parseInt(this.state.TalentsSelected[3].Level)/5)-1)))))) 
      ,
      Attack: ((((this.state.BaseATKRarity )
        + ((this.state.AtkGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
        + (ATKSubStar)
        + (this.state.TalentsSelected[0].Used * (19 * (parseInt(this.state.TalentsSelected[0].Level)/5))))
        * ((1 + (((this.state.TalentsSelected[1].Used * (4.95 + (2.9 * ((parseInt(this.state.TalentsSelected[1].Level)/5)-1))))/100)
        + (this.state.Abilities[0].Used * ((this.state.Abilities[0].Boost)/100))))))) 
        + this.state.TotalStatsFromItems.BoostedATK
        + this.state.ImpWeaponStats.Attack
        ,
      HP: ((((this.state.BaseHPRarity) 
      + ((this.state.HPGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + ((((HPSubStar)
      + (this.state.TalentsSelected[9].Used * (70 * (parseInt(this.state.TalentsSelected[9].Level)/5))))
      * (1 + ((this.state.TalentsSelected[8].Used * (4.995 + (2.895 * ((parseInt(this.state.TalentsSelected[8].Level)/5)-1))))/100))) 
      * ( 1 + (this.state.Abilities[2].Used * this.state.Abilities[2].Boost)/100)))))
      + (this.state.TotalStatsFromItems.BoostedHP)
      + this.state.ImpWeaponStats.HP
        ,
      PDEF: ((((this.state.BasePDEFRarity)
      + ((this.state.PDefGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (PDEFSubStar)
      + (this.state.TalentsSelected[5].Used * (8 * (parseInt(this.state.TalentsSelected[5].Level)/5)))))
      * (1 + ((this.state.TalentsSelected[7].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[7].Level)/5)-1))))/100))
      *  ( 1 + (this.state.Abilities[1].Used * this.state.Abilities[1].Boost)/100))
      + this.state.TotalStatsFromItems.BoostedPDEF
      + this.state.ImpWeaponStats.PDEF
        ,
      ADEF:(((this.state.BaseADEFRarity) 
      + ((this.state.ADefGrowth *  Math.pow(.847458,this.state.Selector)) * (level - 1))
      + (ADEFSubStar)
      + (this.state.TalentsSelected[4].Used * (8 * (parseInt(this.state.TalentsSelected[4].Level)/5)))))
      * (1 + ((this.state.TalentsSelected[6].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[6].Level)/5)-1))))/100))
      * ( 1 + (this.state.Abilities[1].Used * this.state.Abilities[1].Boost)/100) 
      + this.state.TotalStatsFromItems.BoostedADEF
      + this.state.ImpWeaponStats.ADEF
      ,
      CC: (1 + ( (this.state.TalentsSelected[2].Used * (0.995 + ( 0.475 * ((parseInt(this.state.TalentsSelected[2].Level)/5)-1))))))
      + this.state.TotalBonusesFromItems.CCBonus
      + this.state.Abilities[3].Used * this.state.Abilities[3].Boost
      + parseFloat(this.state.ImpWeaponStats.CC)
      ,
      CD: (10 + ( (this.state.TalentsSelected[3].Used * (1.98 + ( 0.95 * ((parseInt(this.state.TalentsSelected[3].Level)/5)-1))))))
      + this.state.TotalBonusesFromItems.CDBonus
      + parseFloat(this.state.ImpWeaponStats.CD)
      ,
    }, () => {
      this.UpdateCombined();
    });
  });

};

  UpdateCombined = () => {
    this.props.Char.Attack = this.state.Attack;
    this.props.Char.HP = this.state.HP;
    this.props.Char.CD = this.state.CD;
    this.props.Char.CC = this.state.CC;
    this.props.Char.ADEF = this.state.ADEF;
    this.props.Char.PDEF = this.state.PDEF;
    this.props.Char.Speed = this.state.Speed;

    if(this.props.Data != undefined){
    this.props.Data.Name = {
      Character: this.state.CharacterName,
      Level: this.state.Level,
      Rarity: this.state.Rarity,
      Stars: this.state.Stars,
      SubStars: this.state.SubStars,
      Talents: this.state.TalentsSelected,
      ImpWeapon: this.state.ImpWeaponStats,
      Items: this.state.Items,
      ItemsStats: this.state.ItemsStatsList,
      Abilities: this.state.Abilities,
      };
    }

    this.props.updateCombined(this.props.Char, this.props.Data);
  };

  

  LoadAllCharStats = (name) => () => {

    if(this.state.CharCount==0)
    { //Push info about main characters
      this.state.CharStored.push({
        Rarity: this.state.Rarity,
        Level: this.state.Level,
        Stars: this.state.Stars,
        ItemSet: this.state.ItemsBonusesActive,
        Items : [
          {Item: this.state.Items[0].Item, Level: this.state.Items[0].Level, Stats: this.state.Items[0].Stats, Image: this.state.Items[0].Image},
          {Item: this.state.Items[1].Item, Level: this.state.Items[1].Level, Stats: this.state.Items[1].Stats, Image: this.state.Items[1].Image},
          {Item: this.state.Items[2].Item, Level: this.state.Items[2].Level, Stats: this.state.Items[2].Stats, Image: this.state.Items[2].Image},
          {Item: this.state.Items[3].Item, Level: this.state.Items[3].Level, Stats: this.state.Items[3].Stats, Image: this.state.Items[3].Image},

        ],
        FinalDmg : this.state.FinalDmg,
        Talents : this.state.TalentsSelected,
        Abilities : this.state.Abilities,
        ImpWeapon : this.state.ImpWeaponStats,
      });
    }
    else
    { //push name and stats
      this.state.CharStored.push({
        Name:this.state.CharacterName,
        Attack:this.state.Attack,
        HP: this.state.HP,
        CD: this.state.CD,
        CC : this.state.CC,
        ADEF : this.state.ADEF,
        PDEF : this.state.PDEF,
      });
      if(this.state.CharCount == this.state.mainCharacters.length)
      {
        this.CopyLoadedCharacters(JSON.stringify(this.state.CharStored));
      }
    }
  
    if(this.state.CharCount < this.state.mainCharacters.length){
   //can put here to store previous
   this.ChangeCharactertwo(this.state.mainCharacters[this.state.CharCount],this.state.CharCount);
   this.state.CharCount++;
    }
   this.setState({
    
      }, () => {
        this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
        if(this.state.CharCount < this.state.mainCharacters.length)
        {
         // this.LoadAllCharStats(1);
        }
         });

      
  };

  
  CopyLoadedCharacters = (text)  => {
    
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy)

  };

  LoadAllCharStatstwo = (name) =>  {

    //once clicked, starts at first characters and goes through each character. 
    //once change character, get data from this.props.data //check update combined for exact locations
    //then change character again
    //until full array of all mains with those stats/items
    //set it up to return a value?
    
  
   //can put here to store previous
   this.ChangeCharactertwo(this.state.mainCharacters[this.state.CharCount],this.state.CharCount);
   this.state.CharCount++;
   this.setState({
    
      }, () => {
        if(this.state.CharCount < this.state.mainCharacters.length)
        {
          this.state.CharStored.push(this.state.Attack);
          this.LoadAllCharStatstwo(1);
        }
      });

  };

  ChangeCharactertwo = (Name, index, rarity) =>{
     
    var bottom = "78%";
    if(Name == "Yukina"){bottom = "60%";}
    if(Name == "Accelerator"){bottom = "59%";}
    if(Name == "Kirito (Dual Blade)"){bottom = "85%";}
    if(Name == "Kuroyukihime"){bottom = "85%";}
    if(Name == "Kouko"){bottom = "86%";}

    var tempStyle = {
      'background-image': "url(\""+ this.state.mainCharacters[index].Image +"\"\)",
      'background-position': 'right 0px bottom '+ bottom +'',
      '-webkit-border-radius': '5px',
      '-moz-border-radius': '5px',
      'border-radius': '5px',
      'background-size': 'cover',
};
    this.state.CharacterPicture = [];
    this.state.CharacterPicture.push(
       <div key={this.state.mainCharacters[index].Name} style={tempStyle} class="character-picture" >
         
         <div class="character-name">
            {this.state.mainCharacters[index].Name}
          </div>
        </div>
    )


   this.setState({
      Speed: this.state.mainCharacters[index].Speed,
      CharacterName: this.state.mainCharacters[index].Name,
      BaseATK: this.state.mainCharacters[index].ATK,
      BaseHP: this.state.mainCharacters[index].HP,
      BasePDEF: this.state.mainCharacters[index].PDEF,
      BaseADEF: this.state.mainCharacters[index].ADEF,
      AtkGrowth: this.state.mainCharacters[index].AtkGrowth,
      HPGrowth: this.state.mainCharacters[index].HPGrowth, 
      PDefGrowth: this.state.mainCharacters[index].PDefGrowth,
      ADefGrowth: this.state.mainCharacters[index].ADefGrowth,
      StarGrowthATK: this.state.mainCharacters[index].ATK * 0.409,
      StarGrowthHP: this.state.mainCharacters[index].HP * 0.409,
      StarGrowthPDEF: this.state.mainCharacters[index].PDEF * 0.409,
      StarGrowthADEF: this.state.mainCharacters[index].ADEF * 0.409,
        }, () => {
          this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
        });
  };
  ChangeCharacter = (Name, index, rarity) => () =>{
     
    var bottom = "78%";
    if(Name == "Yukina"){bottom = "60%";}
    if(Name == "Accelerator"){bottom = "59%";}
    if(Name == "Kirito (Dual Blade)"){bottom = "85%";}
    if(Name == "Kuroyukihime"){bottom = "85%";}
    if(Name == "Kouko"){bottom = "86%";}

    var tempStyle = {
      'background-image': "url(\""+ this.state.mainCharacters[index].Image +"\"\)",
      'background-position': 'right 0px bottom '+ bottom +'',
      '-webkit-border-radius': '5px',
      '-moz-border-radius': '5px',
      'border-radius': '5px',
      'background-size': 'cover',
};
    this.state.CharacterPicture = [];
    this.state.CharacterPicture.push(
       <div key={this.state.mainCharacters[index].Name} style={tempStyle} class="character-picture" >
         
         <div class="character-name">
            {this.state.mainCharacters[index].Name}
          </div>
        </div>
    )


   this.setState({
      Speed: this.state.mainCharacters[index].Speed,
      CharacterName: this.state.mainCharacters[index].Name,
      BaseATK: this.state.mainCharacters[index].ATK,
      BaseHP: this.state.mainCharacters[index].HP,
      BasePDEF: this.state.mainCharacters[index].PDEF,
      BaseADEF: this.state.mainCharacters[index].ADEF,
      AtkGrowth: this.state.mainCharacters[index].AtkGrowth,
      HPGrowth: this.state.mainCharacters[index].HPGrowth, 
      PDefGrowth: this.state.mainCharacters[index].PDefGrowth,
      ADefGrowth: this.state.mainCharacters[index].ADefGrowth,
      StarGrowthATK: this.state.mainCharacters[index].ATK * 0.409,
      StarGrowthHP: this.state.mainCharacters[index].HP * 0.409,
      StarGrowthPDEF: this.state.mainCharacters[index].PDEF * 0.409,
      StarGrowthADEF: this.state.mainCharacters[index].ADEF * 0.409,
        }, () => {
          this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
        });
  };

  SetLevel = (e) => {
    if(!isNaN(e.target.value) && e.target.value != "")
    {
      e.target.value = parseInt(e.target.value);
      if(e.target.value <= 0){e.target.value = 1;}
      if(e.target.value > 60){e.target.value = 60;}

      this.setState({ Level: e.target.value});
      this.UpdateStats(parseInt(e.target.value), this.state.Stars, this.state.Rarity);
    }
  };

  SetStars = (stars) => (e) => {
    this.setState({ Stars: stars + 1,
      SubStars: 0,
    }, () => {
      
    this.UpdateStarsMenu(stars);
    
    this.UpdateStats(this.state.Level, stars + 1, this.state.Rarity);
    },() => {
      
    });
    
  };

  SetSubStars = (substars) => (e) => {
    this.setState({ SubStars: substars 
    }, () => {
      
    this.UpdateStarsMenu(substars);
    this.UpdateStats(this.state.Level, this.state.Stars, this.state.Rarity);
    
    },() => {
      
    });
    
  };

  SetItemLevel = (slot) => (e) => {
    
    if(!isNaN(e.target.value) && e.target.value != "")
    {
      e.target.value = parseInt(e.target.value);
      if(e.target.value <= 0){e.target.value = 1;}
      if(e.target.value > 20){e.target.value = 20;}

    
    let ItemsCopy = this.state.Items;
    
    ItemsCopy[slot].Level = e.target.value;
    
    this.setState({ Items: ItemsCopy});
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    }
  };


  SetATKAbility = (e) => {
    this.setState({ 
      ATKAbility: parseInt(e.target.value),
      ATKAbilityBonus: 5 + (.8333 * (parseInt(e.target.value) - 1))
    });
    this.UpdateStats(this.state.Level, this.state.Stars, this.state.Rarity);
  };

  UpdateStatsFromItems = (e) => {
    
    let ItemsCopy = this.state.Items;

    var tempTotalATK = 0;
    var tempTotalHP = 0;
    var tempTotalPDEF = 0;
    var tempTotalADEF = 0;

    for(var x = 0; x < this.state.Items.length; x++)
    {


      if(ItemsCopy[x].Growth != undefined)
      {
        ItemsCopy[x].TotalStat.Attack = ((ItemsCopy[x].Level - 1)  * ItemsCopy[x].Growth.GrowthATK) + ItemsCopy[x].Growth.BaseATK;
        ItemsCopy[x].TotalStat.HP = ((ItemsCopy[x].Level - 1) * ItemsCopy[x].Growth.GrowthHP) + ItemsCopy[x].Growth.BaseHP;
        ItemsCopy[x].TotalStat.PDEF = ((ItemsCopy[x].Level - 1)  * ItemsCopy[x].Growth.GrowthPDEF) + ItemsCopy[x].Growth.BasePDEF;
        ItemsCopy[x].TotalStat.ADEF = ((ItemsCopy[x].Level - 1)  * ItemsCopy[x].Growth.GrowthADEF) + ItemsCopy[x].Growth.BaseADEF;

        tempTotalATK += parseInt(ItemsCopy[x].TotalStat.Attack);
        tempTotalHP += parseInt(ItemsCopy[x].TotalStat.HP);
        tempTotalPDEF += parseInt(ItemsCopy[x].TotalStat.PDEF);
        tempTotalADEF += parseInt(ItemsCopy[x].TotalStat.ADEF);
      }

      if(ItemsCopy[x].Stats != undefined)
      {
        var tempATKBoost = 0;
        var tempHPBoost = 0;
        var tempPDEFBoost = 0;
        var tempADEFBoost = 0;
        var tempCCBoost = 0;
        var tempCDBoost = 0;

        for(var j = 0; j < ItemsCopy[x].Stats.length; j++)
        {
          if(ItemsCopy[x].Stats[j].Stat == "Attack"){tempATKBoost += 2 + ((ItemsCopy[x].Stats[j].Tier-1) * 2.5)}
          if(ItemsCopy[x].Stats[j].Stat == "Crit DMG"){tempCDBoost += .4 + ((ItemsCopy[x].Stats[j].Tier-1) * .5)}
          if(ItemsCopy[x].Stats[j].Stat == "Crit Rate"){tempCCBoost += .2 + ((ItemsCopy[x].Stats[j].Tier-1) * .5)}
          if(ItemsCopy[x].Stats[j].Stat == "HP"){tempHPBoost += 2 + ((ItemsCopy[x].Stats[j].Tier-1) * 2.5)}
          if(ItemsCopy[x].Stats[j].Stat == "P DEF"){tempPDEFBoost += 2 + ((ItemsCopy[x].Stats[j].Tier-1) * 2.5)}
          if(ItemsCopy[x].Stats[j].Stat == "A DEF"){tempADEFBoost += 2 + ((ItemsCopy[x].Stats[j].Tier-1) * 2.5)}
        }

        this.state.BonusesFromItems[x] = {
          AttackBoost: tempATKBoost, 
          HPBoost: tempHPBoost, 
          ADEFBoost: tempPDEFBoost, 
          PDEFBoost: tempADEFBoost,
          CCBoost: tempCCBoost,
          CDBoost: tempCDBoost
        };
      }


    }

    var tempBoostATK = 0;
    var tempBoostHP = 0;
    var tempBoostPDEF = 0;
    var tempBoostADEF = 0;
    var tempBoostCC = 0;
    var tempBoostCD = 0;
    for(var j = 0; j < this.state.BonusesFromItems.length; j++)
    {
       tempBoostATK += this.state.BonusesFromItems[j].AttackBoost;
       tempBoostHP += this.state.BonusesFromItems[j].HPBoost;
       tempBoostPDEF += this.state.BonusesFromItems[j].PDEFBoost;
       tempBoostADEF += this.state.BonusesFromItems[j].ADEFBoost;
       tempBoostCC += this.state.BonusesFromItems[j].CCBoost;
       tempBoostCD += this.state.BonusesFromItems[j].CDBoost;
    }
    


    this.state.TotalBonusesFromItems = {
      ATKBonus: tempBoostATK,
      HPBonus: tempBoostHP,
      PDEFBonus: tempBoostPDEF,
      ADEFBonus: tempBoostADEF,
      CCBonus: tempBoostCC,
      CDBonus: tempBoostCD,
    };

    this.state.TotalStatsFromItems = {
      Attack: tempTotalATK,
      HP: tempTotalHP,
      PDEF: tempTotalPDEF,
      ADEF: tempTotalADEF,
      BoostedATK: tempTotalATK * (1 + (this.state.TotalBonusesFromItems.ATKBonus/100)),
      BoostedHP: tempTotalHP * (1 + (this.state.TotalBonusesFromItems.HPBonus/100)),
      BoostedPDEF: tempTotalPDEF * (1 + (this.state.TotalBonusesFromItems.PDEFBonus/100)),
      BoostedADEF: tempTotalADEF * (1 + (this.state.TotalBonusesFromItems.ADEFBonus/100)),
    };

    this.setState({ 
      Items: ItemsCopy

    });
    this.UpdateStats(this.state.Level, this.state.Stars, this.state.Rarity);
  };

  SetRarity = (rarity) => (e) => {
    var tempImage = "";
    if(rarity == '0' || rarity == 'S' ){this.state.Selector = 0; rarity = 'S'; tempImage="https://i.imgur.com/mYygdJR.png";}
    if(rarity == '1' || rarity == 'A' ){this.state.Selector = 1; rarity = 'A'; tempImage="https://i.imgur.com/RgjHo1d.png";}
    if(rarity == '2' || rarity == 'B' ){this.state.Selector = 2; rarity = 'B'; tempImage="https://i.imgur.com/vIM4opt.png";}
    if(rarity == '3' || rarity == 'C' ){this.state.Selector = 3; rarity = 'C'; tempImage="https://i.imgur.com/L5yy5LQ.png";}
    
    this.state.RarityChosen = [];
    this.state.RarityChosen.push(
      <div key={"rarityChosen"} style={{'background-image': "url("+ tempImage + ")"}} class="rarity-picture"></div>
      );

    this.setState({ Rarity: rarity});
    this.UpdateStats(this.state.Level, this.state.Stars, e.target.value);
  };

  SetItem = (item, slot, itemgrowth) => (e) => {
    //Item is the name of the item
    //Slot indicates which slot (0,1,2,3)


    
    let ItemsCopy = this.state.Items;
    
    ItemsCopy[slot].Item = item;
    ItemsCopy[slot].Growth = itemgrowth;
    ItemsCopy[slot].Set = itemgrowth.Set;
    ItemsCopy[slot].Image = itemgrowth.Image;

    //Check for set bonuses

    
    let ItemsBonusesCopy = this.state.ItemsBonuses;
    ItemsBonusesCopy = [ 
      {Set: "Alternative Fashion", Count: 0},
      {Set: "Assemble! Gekota", Count: 0},
      {Set: "Poser", Count: 0},
      {Set: "Shizu-chan's Weapon", Count: 0},
    ];

    for(var x = 0; x < ItemsCopy.length; x++)
    {
      for(var i = 0; i < ItemsBonusesCopy.length; i++)
      {
        if(ItemsCopy[x].Set == ItemsBonusesCopy[i].Set)
        {
          ItemsBonusesCopy[i].Count++;
        }
      

      }
      
    }


    //



    this.state.ItemPictures = [];

    var tempStyle = {};

    for(var x = 0; x < ItemsCopy.length; x++)
    {
      tempStyle = {
      'background-image': "url(\""+ ItemsCopy[x].Image +"\"\)",
      };
      if(ItemsCopy[x].Image == "" || ItemsCopy[x].Image == undefined)
      {
        tempStyle = {'background-image': "url(\"https://i.imgur.com/v7tuCIe.png\")"}
      }
      this.state.ItemPictures.push(
        <div key={x} style={tempStyle} class="item-picture">
          
        </div>
        );

    }

    this.setState({
      ItemsBonusesActive: ItemsBonusesCopy,
      Items: ItemsCopy,
    }, () => {
      this.UpdateFinalDmg();
    }
    );
    
    this.UpdateStatsFromItems();
    this.UpdateItems();
    this.UpdateItemStats(this.state.Level,this.state.Stars,this.state.Rarity);

  };

  SetItemStat = (itemslot, statslot, skillslot) => (e) => {
    //itemslot = item slot number
    //statslot = item slot number
    //skillslot = identifies what skill


    //Test if two of that stat are already on it. 
    var count = 0;

    for(var x = 0; x < this.state.ItemsStatsList[itemslot].length; x++)
    {
      if(this.state.ItemsStatsList[itemslot][x].Stat == this.state.ItemsStatsSelection[skillslot])
      {
        count++;
      }
    }

    if(count < 2)
    {

      let ItemsCopy = this.state.Items;
      this.state.ItemsStatsList[itemslot][statslot].Stat = this.state.ItemsStatsSelection[skillslot];
      ItemsCopy[itemslot].Stats[statslot].Stat =  this.state.ItemsStatsSelection[skillslot];
  
      if(this.state.ItemsStatsList[itemslot][statslot].Tier == undefined)
      {
      this.state.ItemsStatsList[itemslot][statslot].Tier = 1;
      }
  
      this.setState({
        Items: ItemsCopy,
      });
    }



    
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);

  };

  SetItemStatValue = (value, slot, statslot, skillToIncrease) => (e) => {
    //value is how many levels that stat has
    //Slot indicates which slot (0,1,2,3)
    //statslot indiciates which stat slot for that item (0,1,2,3,4,5)

      e.target.value = parseInt(e.target.value);
      if(e.target.value <= 0){e.target.value = 1;}
      if(e.target.value > 5){e.target.value = 5;}


    let ItemsCopy = this.state.Items;
    
    ItemsCopy[slot].Stats[statslot].Tier = value;
    
    this.setState({
      Items: ItemsCopy,
    });
    
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
  

   

  };

  SelectTalent = (talent, index, k) => (e) => {

    //this.state.UnusedTalents.splice(index, 1);
    this.state.UsedTalents.push(talent);

    this.setState({ 
      UsedTalents: this.state.UsedTalents,
      TalentOne: this.state.UsedTalents[0],
      TalentTwo: this.state.UsedTalents[1],
      TalentThree: this.state.UsedTalents[2],
      TalentFour: this.state.UsedTalents[3],
    });

  


    this.UpdateAvailableTalents(); //Create table off all unused talents

  };

  
  UpdateImpWeapon = () =>{
    this.state.ImpWeaponMenu = [];
    var selector = 0;
    if(this.props.use == "supports")
    {
      selector = 1;
    }

    

    

    for (var i = 0; i < this.state.ImpWeaponsList[selector].length; i++) {
    var selected = "";
    var image = "";
    if(this.state.ImpWeaponsList[selector][i] == this.state.ImpWeaponStats.Name){
      selected = '#54d641';
    }
      
    if(this.state.ImpWeaponsList[selector][i] == "Shield of Xingtian"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/8/89/IW-Shield_of_Xingtian.png/revision/latest/scale-to-width-down/70?cb=20200105081811" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Muramasa"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/d/d0/IW-Muramasa.png/revision/latest/scale-to-width-down/70?cb=20200105081815" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Olive-wood Club of Heracles"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/0/04/IW-Olive-wood_Club_of_Heracles.png/revision/latest/scale-to-width-down/70?cb=20200105081819" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Aegis of Zeus"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/8/8a/IW-Aegis_of_Zeus.png/revision/latest/scale-to-width-down/70?cb=20191229070538" +"\"\)"}
    
    if(this.state.ImpWeaponsList[selector][i] == "Lamp of Nightingale"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/b/ba/IW-Lamp_of_Nightingale.png/revision/latest/scale-to-width-down/70?cb=20191229070531" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Gada of Indra"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/7/74/IW-Gada_of_Indra.png/revision/latest/scale-to-width-down/70?cb=20200105081823" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Vermillion Bird"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/8/85/IW-Vermilion_Bird.png/revision/latest/scale-to-width-down/70?cb=20200105081829" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Da Sheng Yi Yin"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/6/6d/IW-Da_Sheng_Yi_Yin.png/revision/latest/scale-to-width-down/70?cb=20191208192938" +"\"\)"}
    if(this.state.ImpWeaponsList[selector][i] == "Jarngreipr"){image = "url(\""+ "https://vignette.wikia.nocookie.net/crossingvoid-global/images/7/7e/IW-J%C3%A1rngreipr.png/revision/latest/scale-to-width-down/70?cb=20200105081834" +"\"\)"}


        this.state.ImpWeaponMenu.push(
          <a class="impweapon-weapon-picture" key={this.state.ImpWeaponsList[selector][i]} style={{'background-color': selected, 'background-image': image}} onClick={this.SetImpWeapon(this.state.ImpWeaponsList[selector][i])}>
              
          </a>
        )
      
    }

    
    this.state.ImpWeaponStatsMenu = [];

    
      this.state.ImpWeaponStatsMenu.push(
        
      <div class="impweapon-stats-text">
       <div class="impweapon-stats"><span >Attack: </span><input class="impweapon-input" type="number" value={this.state.ImpWeaponStats.Attack} onChange={this.SetImpWeaponStat(1)}/></div>
       <div class="impweapon-stats"><span >Crit Rate: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.CC} onChange={this.SetImpWeaponStat(2)} /></div>
       <div class="impweapon-stats"><span >Crit DMG: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.CD} onChange={this.SetImpWeaponStat(3)} /></div>
       <div class="impweapon-stats"><span >Phys DEF: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.PDEF} onChange={this.SetImpWeaponStat(4)} /></div>
       <div class="impweapon-stats"><span >Arca DEF: </span><input class="impweapon-input" type="number" value={this.state.ImpWeaponStats.ADEF} onChange={this.SetImpWeaponStat(5)} /></div>
       <div class="impweapon-stats"><span >HP: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.HP} onChange={this.SetImpWeaponStat(6)} /></div>
       <div class="impweapon-stats"><span >Upgrade: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.Upgrade} onChange={this.SetImpWeaponStat(7)} /></div>
       <div class="impweapon-stats"><span >Phase: </span><input class="impweapon-input" type="number"  value={this.state.ImpWeaponStats.Phase} onChange={this.SetImpWeaponStat(8)} /></div>
      </div>
        
      
      )
    
  


  };  

  UpdateAvailableTalents = () =>{
    this.state.TalentChoices = [];
    for (var i = 0; i < this.state.UnusedTalents.length; i++) {
      if(!this.state.UsedTalents.includes(this.state.UnusedTalents[i]))
      {
        this.state.TalentChoices.push(
          <a key={this.state.UnusedTalents[i]} onClick={this.SelectTalent(this.state.UnusedTalents[i], i)}>
              {this.state.UnusedTalents[i]}
          </a>
        )
      }
    }

  };  
  
  SetTalent = (index, selected, level) => (e) => {

    

     var counter = 0;
    for (var i = 0; i < this.state.TalentsSelected.length; i++) {
        if(this.state.TalentsSelected[i].Used == true)
        {
          counter++;
        }
    }

    if(counter <= 3 || selected == false || this.state.TalentsSelected[index].Used == true)
    {

    let TalentsSelectedCopy = this.state.TalentsSelected;
    if(!isNaN(e.target.value))
    {
      if(e.target.value <= 100){

      if(e.target.value >= 10){
        e.target.value = 5 * Math.round((e.target.value / 5));
      }

      if(e.target.value <= 0){e.target.value = 5;}
      TalentsSelectedCopy[index].Level = e.target.value;
      }
    }
    else
    {
      TalentsSelectedCopy[index].Used = selected;
    }
    
    if(TalentsSelectedCopy[index].Talent == "Ardor")
    {TalentsSelectedCopy[index].Boost =  (this.state.TalentsSelected[0].Used * (19 * (parseInt(this.state.TalentsSelected[0].Level)/5)));}

    if(TalentsSelectedCopy[index].Talent == "Valor")
    {TalentsSelectedCopy[index].Boost =  ((this.state.TalentsSelected[1].Used * (4.98 + (2.9 * ((parseInt(this.state.TalentsSelected[1].Level)/5)-1)))));}

    if(TalentsSelectedCopy[index].Talent == "Strength")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[2].Used * (0.995 + ( 0.475 * ((parseInt(this.state.TalentsSelected[2].Level)/5)-1)))))}

    if(TalentsSelectedCopy[index].Talent == "Aggression")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[3].Used * (1.98 + ( 0.95 * ((parseInt(this.state.TalentsSelected[3].Level)/5)-1)))))}
    if(TalentsSelectedCopy[index].Talent == "Agility")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[4].Used * (8 * (parseInt(this.state.TalentsSelected[4].Level)/5)))}
    if(TalentsSelectedCopy[index].Talent == "Tenacity")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[5].Used * (8 * (parseInt(this.state.TalentsSelected[5].Level)/5)))}
    if(TalentsSelectedCopy[index].Talent == "Sagacity")
    {TalentsSelectedCopy[index].Boost = (((this.state.TalentsSelected[6].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[6].Level)/5)-1))))))}
    if(TalentsSelectedCopy[index].Talent == "Fortitude")
    {TalentsSelectedCopy[index].Boost = (((this.state.TalentsSelected[7].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[7].Level)/5)-1))))))}
    if(TalentsSelectedCopy[index].Talent == "Vitality")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[8].Used * (4.995 + (2.895 * ((parseInt(this.state.TalentsSelected[8].Level)/5)-1)))))}
    if(TalentsSelectedCopy[index].Talent == "Vigor")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[9].Used * (70 * (parseInt(this.state.TalentsSelected[9].Level)/5)))}
   

    this.setState({
      TalentsSelected: TalentsSelectedCopy,
    });
    this.UpdateTalents();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    }
    
  };

    
  SetAbility = (index, selected, level) => (e) => {

   

    let AbilitiesCopy = this.state.Abilities;
    if(!isNaN(e.target.value))
    {
      if(e.target.value > 25){e.target.value = 25;}
      if(e.target.value <= 0){e.target.value = 1;}

      AbilitiesCopy[index].Level = e.target.value;
      
      
    }
    else
    {
    AbilitiesCopy[index].Used = selected;
    }

    AbilitiesCopy[0].Boost = (5 +( .833333 * (AbilitiesCopy[0].Level-1)));
    AbilitiesCopy[1].Boost = (5 +( .833333 * (AbilitiesCopy[1].Level-1)));
    AbilitiesCopy[2].Boost = (5 +( .833333 * (AbilitiesCopy[2].Level-1)));
    AbilitiesCopy[3].Boost = (1.6 +( .142 * (AbilitiesCopy[3].Level-1)));


    this.setState({
      Abilities: AbilitiesCopy,
    });

    this.UpdateAbility();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    
    
  };


    
  SetImpWeaponStat = (slot) => (e) => {
    //slot is what stat, indicated by inputs
    //e.target.value holds the new value

    if(e.target.value[0] == "0" && e.target.value[1] != undefined && slot != 2 && slot != 3)
    {
      e.target.value = e.target.value[1];
    }
    
    if(!isNaN(e.target.value))
    {
      //if(e.target.value > 25){e.target.value = 25;} //set max
      if(e.target.value <= 0){e.target.value = 0;}
      
    if(slot == 1)
    {
      if(parseInt(e.target.value) >= 1000){e.target.value = 1000}
      this.state.ImpWeaponStats.Attack =  parseInt(e.target.value);
    }
    if(slot == 2)
    {
      if(e.target.value >= 7.5){e.target.value = 7.5}
      this.state.ImpWeaponStats.CC =  e.target.value;
    }
    if(slot == 3)
    {
      if(e.target.value >= 5){e.target.value = 5}
      this.state.ImpWeaponStats.CD =  e.target.value;
    }
    if(slot == 4)
    {
      if(parseInt(e.target.value) >= 500){e.target.value = 400}
      this.state.ImpWeaponStats.PDEF =  parseInt(e.target.value);
    }
    if(slot == 5)
    {
      if(parseInt(e.target.value) >= 500){e.target.value = 400}
      this.state.ImpWeaponStats.ADEF =  parseInt(e.target.value);
    }
    if(slot == 6)
    {
      if(parseInt(e.target.value) >= 2000){e.target.value = 3500}
      this.state.ImpWeaponStats.HP =  parseInt(e.target.value);
    }
    if(slot == 7)
    {
      if(parseInt(e.target.value) >= 4){e.target.value = 5}
      this.state.ImpWeaponStats.Upgrade =  parseInt(e.target.value);
    this.UpdateFinalDmg();
    }
    if(slot == 8)
    {
      if(parseInt(e.target.value) >= 5){e.target.value = 7.50}
      this.state.ImpWeaponStats.Phase =  parseInt(e.target.value);
    }
      
      
    }


   

    this.UpdateImpWeapon();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    
    
  };

   
  SetImpWeapon = (name) => (e) => {
    //slot is what stat, indicated by inputs
    //e.target.value holds the new value
    if(this.state.ImpWeaponStats.Name == name)
    {
      this.state.ImpWeaponStats.Name = "";
    }
    else
    {

      this.state.ImpWeaponStats.Name = name;
    }

   

    this.UpdateImpWeapon();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    
    
  };


  UpdateTalents = () =>  {
    this.state.TalentChoices = [];
    
    for (var i = 0; i < this.state.TalentsSelected.length; i++) {

      var selected = "";
      //var show = 0;
      if(this.state.TalentsSelected[i].Used == true){
        //show = <img className="check" style={{display: {show}}} src="https://static.thenounproject.com/png/190431-200.png" id="logo"/>;
        selected = '#0ddc0d99';
      }

      this.state.TalentChoices.push(
     <a key={this.state.TalentsSelected[i].Talent}  style={{background: selected}}  onClick={this.SetTalent(i,!this.state.TalentsSelected[i].Used, this.state.TalentsSelected[i].Level)}>
        
        
        {this.state.TalentsSelected[i].Talent}
        <input class="talent-input" type="number" value={this.state.TalentsSelected[i].Level} onChange={this.SetTalent(i,this.state.TalentsSelected[i].Used, this.state.TalentsSelected[i].Level)}/>
      </a>
      )
    }

    this.state.Talents = [];
    for (var i = 0; i < this.state.TalentsSelected.length; i++) {
      var show = 0;
      var symbol = "%";
      if(i == 0 || i == 4 || i == 5){symbol = "";}
      if(this.state.TalentsSelected[i].Used == true){
      this.state.Talents.push(
        <div style={{'text-align': 'left', 'margin-left': '2px'}}>
          <span style={{'position': 'absolute'}}>{this.state.TalentsSelected[i].Level}</span>
          <span class="middle-stat-name">{this.state.TalentsSelected[i].Talent}</span>
          <span style={{float: 'right', 'margin-right': '5px'}}>+{this.state.TalentsSelected[i].Boost.toFixed(2)}{symbol}</span>
        </div>
         )
      }
    }
    

  };

  UpdateAbility = () =>  {
    this.state.AbilityChoices = [];
    
  for (var i = 0; i < this.state.Abilities.length; i++) {
    //var show = 0;
    
    var selected = "";
    if(this.state.Abilities[i].Used == true){
     //show = <img className="check" style={{display: {show}}} src="https://static.thenounproject.com/png/190431-200.png" id="logo"/>;
        selected = '#0ddc0d99';
    }
    this.state.AbilityChoices.push(
       <a key={this.state.Abilities[i].Skill} style={{background: selected}} onClick={this.SetAbility(i,!this.state.Abilities[i].Used, this.state.Abilities[i].Level)}>
          {this.state.Abilities[i].Skill}
          <input class="ability-input" type="number" style={{width: '25%', float: 'right'}} value={this.state.Abilities[i].Level} onChange={this.SetAbility(i,this.state.Abilities[i].Used, this.state.Abilities[i].Level)}/>
        </a>
    )
  }

  
  this.state.Ability = [];
  for (var i = 0; i < this.state.Abilities.length; i++) {
    if(this.state.Abilities[i].Used == true){
    this.state.Ability.push(
        <div style={{'text-align': 'left'}}>
         <span style={{'position': 'absolute', 'margin-left': '4px'}}>{this.state.Abilities[i].Level}</span>
         <span  class="middle-stat-name">{this.state.Abilities[i].Skill}</span>
         <span style={{float: 'right', 'margin-right': '5px'}}>+{this.state.Abilities[i].Boost.toFixed(2)}%</span>
        </div>
       )
    }
  }


  };

  UpdateStarsMenu = (stars) => {
    this.state.StarsChosen = [];  
    var tempStyle = {};
    for(var x = 0; x < 6; x++){
      
      tempStyle = {'background-image': "url(https://i.imgur.com/cfxGxVe.png)",};
      if(x > this.state.Stars-1){tempStyle = {'background-image': "url(https://i.imgur.com/uVfYKBu.png)",};}

      this.state.StarsChosen.push(
        <div key={x} style={tempStyle} onClick={this.SetStars(x)} class="stars-picture">
          
        </div>
        );
      }

      
    this.state.SubStarsChosen = [];  
    var tempStyle = {};
    var subStars = 0;
    if (this.state.Stars == 2){subStars = 3}
    if (this.state.Stars == 3){subStars = 4}
    if (this.state.Stars == 4){subStars = 5}
    if (this.state.Stars == 5){subStars = 5}
    for(var x = 0; x < subStars; x++){
      
      tempStyle = {'background-image': "url(https://i.imgur.com/cfxGxVe.png)",};
      if(x >= this.state.SubStars){tempStyle = {'background-image': "url(https://i.imgur.com/uVfYKBu.png)",};}

      this.state.SubStarsChosen.push(
        <div key={x} style={tempStyle} onClick={this.SetSubStars(x+1)} class="inner-stars-picture">
          
        </div>
        );
      }

      this.setState({
        StarsChosen: this.state.StarsChosen,
      });

  };

  
  UpdateFinalDmg = () => {
      
    let ItemsBonusesCopy = this.state.ItemsBonuses;
    ItemsBonusesCopy = [ 
      {Set: "Alternative Fashion", Count: 0},
      {Set: "Assemble! Gekota", Count: 0},
      {Set: "Poser", Count: 0},
      {Set: "Shizu-chan's Weapon", Count: 0},
    ];

    for(var x = 0; x < this.state.Items.length; x++)
    {
      for(var i = 0; i < ItemsBonusesCopy.length; i++)
      {
        if(this.state.Items[x].Set == ItemsBonusesCopy[i].Set)
        {
          ItemsBonusesCopy[i].Count++;
        }
      

      }
      
    }

    
  this.state.BonusesList = [];
  var finalDmgIncrease = 0;
  var AltFashion = false;
  var Gekota = false;
  var Poser = false;
  for (var i = 0; i < ItemsBonusesCopy.length; i++) 
  {
    if(ItemsBonusesCopy[i].Count >= 2){
        finalDmgIncrease = finalDmgIncrease + 2;
    }
    if(ItemsBonusesCopy[i].Count >= 4){
        finalDmgIncrease = finalDmgIncrease + 2;

        if(ItemsBonusesCopy[i].Set == "Alternative Fashion"){AltFashion = true;}
        if(ItemsBonusesCopy[i].Set == "Assemble! Gekota"){Gekota = true;}
        if(ItemsBonusesCopy[i].Set == "Poser"){Poser = true;}
    }

  }

  if(AltFashion || Gekota || Poser)
  {
    var boost = "";
    var info = "";
    if(AltFashion){boost = "14%"; info = "Skills >= 4";}
    if(Gekota){boost = "13.50%"; info = "Bleeds +% atk";}
    if(Poser){boost = "11%"; info = "Skills <= 3";}
    
  this.state.BonusesList.push(
    <div style={{'text-align': 'left'}}>
     <span style={{'position': 'absolute', 'margin-left': '4px'}}>4pc</span>
     <span  class="middle-stat-name">{info}</span>
     <span style={{float: 'right', 'margin-right': '5px'}}>+{boost}</span>
    </div>
   )

  }
  this.state.FinalDmg = finalDmgIncrease;
  if(finalDmgIncrease)
  {
    finalDmgIncrease = finalDmgIncrease + (this.state.ImpWeaponStats.Upgrade * 3);
  this.state.BonusesList.push(
    <div style={{'text-align': 'left'}}>
     <span style={{'position': 'absolute', 'margin-left': '4px'}}></span>
     <span class="middle-stat-name">Final Dmg</span>
     <span style={{float: 'right', 'margin-right': '5px'}}>+{finalDmgIncrease}%</span>
    </div>
   )
  }





  };



  UpdateItems = () =>  {
    this.state.ItemsChoices = [[],[],[],[]];
    this.state.ItemsChoices[0] = [];

    for (var h = 0; h < this.state.Items.length; h++) {
      for (var i = 0; i < this.state.ItemsList[h].length; i++) {
        var selected = "";
        if(this.state.Items[h].Item == this.state.ItemsList[h][i].Item){
          selected = '#0ddc0d99';
        }
        this.state.ItemsChoices[h].push(
          <a key={this.state.ItemsList[h][i].Talent} style={{background: selected}} onClick={this.SetItem(this.state.ItemsList[h][i].Item,h,this.state.ItemsList[h][i])}>
            <div key={this.state.ItemsList[h][i].Item} style={{'background-image': "url("+ this.state.ItemsList[h][i].Image +")"}} class="item-menu-picture">
              <span class="item-menu-text">
              </span>
             </div>
          </a>
        )
      }
    }
  };

  UpdateItemStats = () =>  {
    this.state.ItemsStatsChoices = [[],[],[],[],[],[]];
    this.state.ItemsStatsChoices[0] = [];

    



    for (var h = 0; h < this.state.Items.length; h++) {
      for (var i = 0; i < this.state.ItemsStatsList[h].length; i++) {


         
    var tempStyle = {};
    tempStyle = {'background-image': "url(https://i.imgur.com/e0Pk0ZG.png)",};
    if(x > 0){tempStyle = {'background-image': "url(https://i.imgur.com/k1P0Ptl.png)",};}
    var tempDiv = [];

    //g is item slot
    //then g.stats
    //h is stat
    //h.tier is rank
    //if g.stats[h].tier
    var tempStyleAssignment = [];
    for(var x = 0; x < 5; x++){
      tempStyleAssignment[x] = {'background-image': "url(https://i.imgur.com/k1P0Ptl.png)"};
    }
    
    for(var x = 0; x < this.state.Items[h].Stats[i].Tier; x++){
      tempStyleAssignment[x] = {'background-image': "url(https://i.imgur.com/e0Pk0ZG.png)"};
    }
    
    tempDiv.push(<div>

      <div key={h} style={tempStyleAssignment[0]} onClick={this.SetItemStatValue(1,h,i)} class="item-stats-picture">
      </div>
      <div key={h} style={tempStyleAssignment[1]} onClick={this.SetItemStatValue(2,h,i)} class="item-stats-picture">
      </div>
      <div key={h} style={tempStyleAssignment[2]} onClick={this.SetItemStatValue(3,h,i)} class="item-stats-picture">
      </div>
      <div key={h} style={tempStyleAssignment[3]} onClick={this.SetItemStatValue(4,h,i)} class="item-stats-picture">
      </div>
      <div key={h} style={tempStyleAssignment[4]} onClick={this.SetItemStatValue(5,h,i)} class="item-stats-picture">
      </div>

      </div>
      );



        this.state.ItemsStatsChoices[h].push(
       <a key={i} >
          <div class="stats-selection">
            <span class="item-stats-text">{this.state.ItemsStatsList[h][i].Stat}</span>

              <div key={this.state.ItemsStatsSelection[i]}> 
                  {tempDiv}
              </div>

              <div class="stats-choices">
                {this.state.ItemsStatsSelectionList[h][i]}
              </div>
          </div>
        </a>
        )
      }
      }
  };


  LoadImpWeapon = (name) => {

    this.state.ImpWeaponStats.Name = name;

   

    this.UpdateImpWeapon();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    
  };

  LoadImpWeaponStat = (slot, value) => {
    

    if(value[0] == "0" && value[1] != undefined && slot != 2 && slot != 3)
    {
      value = value[1];
    }
    
    if(!isNaN(value))
    {
      if(value <= 0){value = 0;}
      
    if(slot == 1)
    {
      if(parseInt(value) >= 1000){value = 1000}
      this.state.ImpWeaponStats.Attack =  parseInt(value);
    }
    if(slot == 2)
    {
      if(value >= 7.5){value = 7.5}
      this.state.ImpWeaponStats.CC =  value;
    }
    if(slot == 3)
    {
      if(value >= 5){value = 5}
      this.state.ImpWeaponStats.CD =  value;
    }
    if(slot == 4)
    {
      if(parseInt(value) >= 500){value = 500}
      this.state.ImpWeaponStats.PDEF =  parseInt(value);
    }
    if(slot == 5)
    {
      if(parseInt(value) >= 500){value = 500}
      this.state.ImpWeaponStats.ADEF =  parseInt(value);
    }
    if(slot == 6)
    {
      if(parseInt(value) >= 2000){value = 2000}
      this.state.ImpWeaponStats.HP =  parseInt(value);
    }
    if(slot == 7)
    {
      if(parseInt(value) >= 4){value = 4}
      this.state.ImpWeaponStats.Upgrade =  parseInt(value);
    this.UpdateFinalDmg();
    }
    if(slot == 8)
    {
      if(parseInt(value) >= 5){value = 5}
      this.state.ImpWeaponStats.Phase =  parseInt(value);
    }
      
      
    }


   

    this.UpdateImpWeapon();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
  };

  LoadAbility = (index, selected, level) => {
    

    let AbilitiesCopy = this.state.Abilities;
    if(!isNaN(level))
    {
      if(level > 25){level = 25;}
      if(level <= 0){level = 1;}

      AbilitiesCopy[index].Level = level;
      
      
    }
    else
    {
    AbilitiesCopy[index].Used = selected;
    }
    //Above not needed for the load function version, possibly changing later to need it
    AbilitiesCopy[index].Used = selected;

    AbilitiesCopy[0].Boost = (5 +( .833333 * (AbilitiesCopy[0].Level-1)));
    AbilitiesCopy[1].Boost = (5 +( .833333 * (AbilitiesCopy[1].Level-1)));
    AbilitiesCopy[2].Boost = (5 +( .833333 * (AbilitiesCopy[2].Level-1)));
    AbilitiesCopy[3].Boost = (1.6 +( .142 * (AbilitiesCopy[3].Level-1)));


    this.setState({
      Abilities: AbilitiesCopy,
    });

    this.UpdateAbility();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    
  };

  LoadTalent = (index, selected, level) => {


    var counter = 0;
    for (var i = 0; i < this.state.TalentsSelected.length; i++) {
        if(this.state.TalentsSelected[i].Used == true)
        {
          counter++;
        }
    }

    if(counter <= 3 || selected == false || this.state.TalentsSelected[index].Used == true)
    {

    let TalentsSelectedCopy = this.state.TalentsSelected;
    if(!isNaN(level))
    {
      if(level <= 100){

      if(level >= 10){
        level = 5 * Math.round((level / 5));
      }

      if(level <= 0){level = 5;}
      TalentsSelectedCopy[index].Level = level;
      }
    }
    else
    {
      TalentsSelectedCopy[index].Used = selected;
    }

    if(counter <= 3)
    {
      TalentsSelectedCopy[index].Used = selected
    }
    
    if(TalentsSelectedCopy[index].Talent == "Ardor")
    {TalentsSelectedCopy[index].Boost =  (this.state.TalentsSelected[0].Used * (19 * (parseInt(this.state.TalentsSelected[0].Level)/5)));}

    if(TalentsSelectedCopy[index].Talent == "Valor")
    {TalentsSelectedCopy[index].Boost =  ((this.state.TalentsSelected[1].Used * (4.98 + (2.9 * ((parseInt(this.state.TalentsSelected[1].Level)/5)-1)))));}

    if(TalentsSelectedCopy[index].Talent == "Strength")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[2].Used * (0.995 + ( 0.475 * ((parseInt(this.state.TalentsSelected[2].Level)/5)-1)))))}

    if(TalentsSelectedCopy[index].Talent == "Aggression")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[3].Used * (1.98 + ( 0.95 * ((parseInt(this.state.TalentsSelected[3].Level)/5)-1)))))}
    if(TalentsSelectedCopy[index].Talent == "Agility")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[4].Used * (8 * (parseInt(this.state.TalentsSelected[4].Level)/5)))}
    if(TalentsSelectedCopy[index].Talent == "Tenacity")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[5].Used * (8 * (parseInt(this.state.TalentsSelected[5].Level)/5)))}
    if(TalentsSelectedCopy[index].Talent == "Sagacity")
    {TalentsSelectedCopy[index].Boost = (((this.state.TalentsSelected[6].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[6].Level)/5)-1))))))}
    if(TalentsSelectedCopy[index].Talent == "Fortitude")
    {TalentsSelectedCopy[index].Boost = (((this.state.TalentsSelected[7].Used * (9.97 + ( 2.64 * ((parseInt(this.state.TalentsSelected[7].Level)/5)-1))))))}
    if(TalentsSelectedCopy[index].Talent == "Vitality")
    {TalentsSelectedCopy[index].Boost = ((this.state.TalentsSelected[8].Used * (4.995 + (2.895 * ((parseInt(this.state.TalentsSelected[8].Level)/5)-1)))))}
    if(TalentsSelectedCopy[index].Talent == "Vigor")
    {TalentsSelectedCopy[index].Boost = (this.state.TalentsSelected[9].Used * (70 * (parseInt(this.state.TalentsSelected[9].Level)/5)))}
   

    this.setState({
      TalentsSelected: TalentsSelectedCopy,
    });
    this.UpdateTalents();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    }
  };

  LoadItemStat = (itemslot, statslot, skillslot) => {
    //itemslot = item slot number
    //statslot = item slot number
    //skillslot = identifies what skill

    let ItemsCopy = this.state.Items;
    
    this.state.ItemsStatsList[itemslot][statslot].Stat = this.state.ItemsStatsSelection[skillslot];
    ItemsCopy[itemslot].Stats[statslot].Stat =  this.state.ItemsStatsSelection[skillslot];
    if(this.state.ItemsStatsList[itemslot][statslot].Tier == undefined)
    {
    this.state.ItemsStatsList[itemslot][statslot].Tier = 1;
    }
    this.setState({
      Items: ItemsCopy,
    });
    
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
  };

  LoadItemStatValue = (value, slot, statslot) => {
    //value is how many levels that stat has
    //Slot indicates which slot (0,1,2,3)
    //statslot indiciates which stat slot for that item (0,1,2,3,4,5)


    let ItemsCopy = this.state.Items;
  
    ItemsCopy[slot].Stats[statslot].Tier = value;
  
    this.setState({
      Items: ItemsCopy,
    });
  
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);


  };

  LoadItemLevel = (slot, level) => {

    
    if(!isNaN(level) && level != "")
    {
      level = parseInt(level);
      if(level <= 0){level = 1;}
      if(level > 20){level = 20;}

    
    let ItemsCopy = this.state.Items;
    
    ItemsCopy[slot].Level = level;
    
    this.setState({ Items: ItemsCopy});
    this.UpdateStatsFromItems();
    this.UpdateItemStats();
    this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
    }

  };
  
  LoadItem = (item, slot, itemgrowth) =>  {

    //Item is the name of the item
    //Slot indicates which slot (0,1,2,3)


    
    let ItemsCopy = this.state.Items;
    
    ItemsCopy[slot].Item = item;
    if(item == "")
    {

    }
    else
    {
      ItemsCopy[slot].Growth = itemgrowth;
      ItemsCopy[slot].Set = itemgrowth.Set;
      ItemsCopy[slot].Image = itemgrowth.Image; 

    }

    //Check for set bonuses

    
    let ItemsBonusesCopy = this.state.ItemsBonuses;
    ItemsBonusesCopy = [ 
      {Set: "Alternative Fashion", Count: 0},
      {Set: "Assemble! Gekota", Count: 0},
      {Set: "Poser", Count: 0},
      {Set: "Shizu-chan's Weapon", Count: 0},
    ];

    for(var x = 0; x < ItemsCopy.length; x++)
    {
      for(var i = 0; i < ItemsBonusesCopy.length; i++)
      {
        if(ItemsCopy[x].Set == ItemsBonusesCopy[i].Set)
        {
          ItemsBonusesCopy[i].Count++;
        }
      

      }
      
    }


    //



    this.state.ItemPictures = [];

    var tempStyle = {};

    for(var x = 0; x < ItemsCopy.length; x++)
    {
      tempStyle = {
      'background-image': "url(\""+ ItemsCopy[x].Image +"\"\)",
      };
      if(ItemsCopy[x].Image == "" || ItemsCopy[x].Image == undefined)
      {
        tempStyle = {'background-image': "url(\"https://i.imgur.com/v7tuCIe.png\")"}
      }
      this.state.ItemPictures.push(
        <div key={x} style={tempStyle} class="item-picture">
          
        </div>
        );

    }

    this.setState({
      ItemsBonusesActive: ItemsBonusesCopy,
      Items: ItemsCopy,
    }, () => {
      this.UpdateFinalDmg();
    }
    );
    
    this.UpdateStatsFromItems();
    this.UpdateItems();
    this.UpdateItemStats(this.state.Level,this.state.Stars,this.state.Rarity);
  };
   
  LoadSubStars = (substars) =>  {
    this.setState({ SubStars: substars 
    }, () => {
      
    this.UpdateStarsMenu(substars);
    this.UpdateStats(this.state.Level, this.state.Stars, this.state.Rarity);
    
    },() => {
      
    });
  };
  
  LoadStars = (stars) =>  {
    this.setState({ Stars: stars + 1,
      SubStars: 0,
    }, () => {
      
    this.UpdateStarsMenu(stars);
    
    this.UpdateStats(this.state.Level, stars + 1, this.state.Rarity);
    },() => {
      
    });

  };
  
  LoadRarity = (rarity) =>  {
  var tempImage = "";
  if(rarity == '0' || rarity == 'S' ){this.state.Selector = 0; rarity = 'S'; tempImage="https://i.imgur.com/mYygdJR.png";}
  if(rarity == '1' || rarity == 'A' ){this.state.Selector = 1; rarity = 'A'; tempImage="https://i.imgur.com/RgjHo1d.png";}
  if(rarity == '2' || rarity == 'B' ){this.state.Selector = 2; rarity = 'B'; tempImage="https://i.imgur.com/vIM4opt.png";}
  if(rarity == '3' || rarity == 'C' ){this.state.Selector = 3; rarity = 'C'; tempImage="https://i.imgur.com/L5yy5LQ.png";}
  
  this.state.RarityChosen = [];
  this.state.RarityChosen.push(
    <div key={"rarityChosen"} style={{'background-image': "url("+ tempImage + ")"}} class="rarity-picture"></div>
    );

  this.setState({ Rarity: rarity});
  this.UpdateStats(this.state.Level, this.state.Stars, this.state.Rarity);
  
};

  LoadChar = (Name, index) =>  {
   
    var bottom = "78%";
    if(Name == "Yukina"){bottom = "60%";}
    if(Name == "Accelerator"){bottom = "59%";}
    if(Name == "Kirito (Dual Blade)"){bottom = "85%";}
    if(Name == "Kuroyukihime"){bottom = "85%";}
    if(Name == "Kouko"){bottom = "86%";}

    var tempStyle = {
      'background-image': "url(\""+ this.state.mainCharacters[index].Image +"\"\)",
      'background-position': 'right 0px bottom '+ bottom +'',
      '-webkit-border-radius': '5px',
      '-moz-border-radius': '5px',
      'border-radius': '5px',
      'background-size': 'cover',
};
    this.state.CharacterPicture = [];
    this.state.CharacterPicture.push(
       <div key={this.state.mainCharacters[index].Name} style={tempStyle} class="character-picture" >
         
         <div class="character-name">
            {this.state.mainCharacters[index].Name}
          </div>
        </div>
    )


   this.setState({
      Speed: this.state.mainCharacters[index].Speed,
      CharacterName: this.state.mainCharacters[index].Name,
      BaseATK: this.state.mainCharacters[index].ATK,
      BaseHP: this.state.mainCharacters[index].HP,
      BasePDEF: this.state.mainCharacters[index].PDEF,
      BaseADEF: this.state.mainCharacters[index].ADEF,
      AtkGrowth: this.state.mainCharacters[index].AtkGrowth,
      HPGrowth: this.state.mainCharacters[index].HPGrowth, 
      PDefGrowth: this.state.mainCharacters[index].PDefGrowth,
      ADefGrowth: this.state.mainCharacters[index].ADefGrowth,
      StarGrowthATK: this.state.mainCharacters[index].ATK * 0.409,
      StarGrowthHP: this.state.mainCharacters[index].HP * 0.409,
      StarGrowthPDEF: this.state.mainCharacters[index].PDEF * 0.409,
      StarGrowthADEF: this.state.mainCharacters[index].ADEF * 0.409,
        }, () => {
          this.UpdateStats(this.state.Level,this.state.Stars,this.state.Rarity);
        });


  };

  
  LoadCharacter = (Name, index) =>  {

    //SetCharacter
    //ChangeCharacter(Name, index of character) 
      //getting index
      for(var x = 0; x < this.state.mainCharacters.length; x++)
      {
        if(this.state.LoadCharacter.Name.Character == this.state.mainCharacters[x].Name)
        {
          this.LoadChar(this.state.LoadCharacter.Name.Character,x);
          index = x;
          x = this.state.mainCharacters.length;
        }
      }

    //SetLevel
    this.setState({ Level: this.state.LoadCharacter.Name.Level});


    //SetStars
    this.LoadStars(this.state.LoadCharacter.Name.Stars - 1);
    //SetSubStars
    this.LoadSubStars(this.state.LoadCharacter.Name.SubStars);

    //SetRarity
    this.LoadRarity(this.state.LoadCharacter.Name.Rarity);

    //SetItem
    //SetItemLevel
    //SetItemStats
    for(var i = 0; i < 4; i++)
    {
      this.LoadItem(this.state.LoadCharacter.Name.Items[i].Item, i, this.state.LoadCharacter.Name.Items[i].Growth);
      this.LoadItemLevel(i, this.state.LoadCharacter.Name.Items[i].Level);
      for(var j = 0; j < 6; j++)
      {
        var index = 0;
        if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat != undefined)
        {
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "Attack"){index = 0;}
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "Crit DMG"){index = 1;}
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "Crit Rate"){index = 2;}
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "HP"){index = 3;}
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "P DEF"){index = 4;}
          if(this.state.LoadCharacter.Name.Items[i].Stats[j].Stat == "A DEF"){index = 5;}
          this.LoadItemStat(i,j,index);
        }
        if(this.state.LoadCharacter.Name.ItemsStats[i][j].Tier == undefined){this.state.LoadCharacter.Name.ItemsStats[i][j].Tier = 1;}
        this.LoadItemStatValue(this.state.LoadCharacter.Name.Items[i].Stats[j].Tier,i,j);
      }
    }

    //SetTalents
    //SetTalentsLevels
    
    for(var i = 0; i < this.state.TalentsSelected.length; i++)
    {
      this.LoadTalent(i, this.state.LoadCharacter.Name.Talents[i].Used, this.state.LoadCharacter.Name.Talents[i].Level);
    }


    //SetAbility
    //SetAbilityLevels
    for(var i = 0; i < 4; i++)
    {
      this.LoadAbility(i, this.state.LoadCharacter.Name.Abilities[i].Used, this.state.LoadCharacter.Name.Abilities[i].Level);
    }
    
    //SetImpressionWeapon
    this.LoadImpWeapon(this.state.LoadCharacter.Name.ImpWeapon.Name);
    //SetImpressionWeaponStats
    this.LoadImpWeaponStat(1, this.state.LoadCharacter.Name.ImpWeapon.Attack);
    this.LoadImpWeaponStat(2, this.state.LoadCharacter.Name.ImpWeapon.CC);
    this.LoadImpWeaponStat(3, this.state.LoadCharacter.Name.ImpWeapon.CD);
    this.LoadImpWeaponStat(4, this.state.LoadCharacter.Name.ImpWeapon.PDEF);
    this.LoadImpWeaponStat(5, this.state.LoadCharacter.Name.ImpWeapon.ADEF);
    this.LoadImpWeaponStat(6, this.state.LoadCharacter.Name.ImpWeapon.HP);
    this.LoadImpWeaponStat(7, this.state.LoadCharacter.Name.ImpWeapon.Upgrade);
    this.LoadImpWeaponStat(8, this.state.LoadCharacter.Name.ImpWeapon.Phase);
    

  };
  

  
}

export default Stats;