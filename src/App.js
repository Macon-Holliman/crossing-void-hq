import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Character from './Character/Character';
import Characters from './Characters/Characters';
import Toolbar from './Toolbar/Toolbar';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Stats from './Stats/Stats';
import Statistics from './Statistics/Statistics';
import Timers from './Timers/Timers';
import Skills from './Skills/Skills';
import MenuNav from './MenuNav/MenuNav';
import FooterNav from './FooterNav/FooterNav';


import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom";
class App extends Component { 
  
  constructor(props){  
    super(props);  

    this.state = {
      Link: "URL",
      LinkStatus: "Link",
      path: "",
      loadedCharacter: "",

      MainData: {},
      SuppData: {},

      Main: {
        Attack: 0,
        HP: 0,
        CD: 0,
        CC: 0,
        ADEF: 0,
        PDEF: 0,
        Speed: 0,
      },
      Support: {
        Attack: 0,
        HP: 0,
        CD: 0,
        CC: 0,
        ADEF: 0,
        PDEF: 0,
        Speed: 0,
      },
      Combined: {
        Attack: 0,
        HP: 0,
        CD: 0,
        CC: 0,
        ADEF: 0,
        PDEF: 0,
        Speed: 0,
      },
      LoadCharacter: () => {
        return this.state.loadedCharacter;
        
      },

      LoadedMain: "",
      LoadedSupp: "",

      UpdateMain: (char, data) => {
        this.state.Main.Attack = char.Attack;
        this.setState({
          Main: {
            Attack: char.Attack,
            HP: char.HP,
            CD: char.CD,
            CC: char.CC,
            ADEF: char.ADEF,
            PDEF: char.PDEF,
            Speed: char.Speed,
          },
          MainData: data,
        }, () => { 
          this.CombineStats(this.state.Main,this.state.Support);
        });
      },

      UpdateSupport: (char, data) => {
        this.state.Support.Attack = char.Attack;
        this.setState({
          Support: {
            Attack: char.Attack,
            HP: char.HP,
            CD: char.CD,
            CC: char.CC,
            ADEF: char.ADEF,
            PDEF: char.PDEF,
            Speed: char.Speed,
          },
          SuppData: data,
        }, () => { 
          this.CombineStats(this.state.Main,this.state.Support);
        });
      },

      MakeLink: (url) => {
        if(url != ""){

          var CharacterData = {Main: this.state.MainData, Supp: this.state.SuppData};
          CharacterData = JSON.stringify(CharacterData);
          const Http = new XMLHttpRequest();
          const url='https://cvgapp-7060d.firebaseio.com/.json';
          Http.open("POST", url, true);
          Http.setRequestHeader('Content-type','application/json; charset=utf-8');
          Http.onload = function () {
            var res = JSON.parse(Http.responseText);
            if (Http.readyState == 4 && Http.status == "201") {
              console.table(res);
            
            } else {
              console.error(res);
            }
          }
          Http.send(CharacterData);
          
      Http.onreadystatechange = (e) => {
        var res = JSON.parse(Http.responseText);
        var urlPartial = "http://localhost:3000/c/";
        urlPartial = "https://crossingvoidhq.com/c/";
        this.setState({
          Link: urlPartial + res.name,
       });
        this.setState({loadedCharacter: JSON.parse(Http.responseText)});
      }

        }
      },

    };
    
    //Get Path Name
     this.state.path = window.location.pathname;
    
    if(this.state.path[0] == '/' && this.state.path[1] == 'c' && this.state.path[2] == '/' )
    {
      
      //character load
      this.state.path = this.state.path.slice(3); // removing /c/
      //call function to get data
      const Http = new XMLHttpRequest();
      var unique = this.state.path;
      const url='https://cvgapp-7060d.firebaseio.com/'+ unique + '.json';
      Http.open("GET", url);
      Http.send();
      Http.onreadystatechange = (e) => {
        this.state.loadedCharacter = JSON.parse(Http.responseText);
        this.state.LoadedMain = 
          <div className="info-inner-left">
                <Stats use={"mains"} Char={this.state.Main} updateCombined={this.state.UpdateMain} LoadedCharacter={this.state.loadedCharacter}/>
              </div>;
              
        this.state.LoadedSupp = 

        <div className="info-inner-right">
          <Stats use={"supports"} Char={this.state.Support} updateCombined={this.state.UpdateSupport} LoadedCharacter={this.state.loadedCharacter}/>
        </div>
        ;
        this.setState({loadedCharacter: JSON.parse(Http.responseText)});
      }
      
    }


} 

CombineStats = (main, support) => {
  this.setState({
    Combined: {
      Attack: main.Attack + support.Attack,
      HP: main.HP + support.HP,
      CD: main.CD + support.CD,
      CC: main.CC + support.CC,
      ADEF: main.ADEF + support.ADEF,
      PDEF: main.PDEF + support.PDEF,
      Speed: main.Speed + support.Speed,
    }
  });
}






render(){
  return (
    <div className="App">
      <div class="wrapper">
      <div class="background"></div>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <Router>
    <MenuNav />
    <Switch>
    <Route exact path="/" component={Home}>
    </Route>
    <Route path="/builder">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.css"></link>
    <div class="info stats-container">
      
    
      <div class="info-inner">
        
      <div class="link-box">
        <div class="link-box-left">
        <div class="link-box-left-inner">
        <input class="link-input" type="text"  value={this.state.Link}/>
        
        </div>
        
        <div class="link-box-right" onClick={() => { this.state.MakeLink()}}>
        <div class="link-box-right-inner">{this.state.LinkStatus}</div>
        </div></div>
        </div>
        
        <div className="info-inner-left">
          <Stats use={"mains"} Char={this.state.Main} updateCombined={this.state.UpdateMain} Data={this.state.MainData} />
        </div>

        
        <div className="info-inner-right">
          <Stats use={"supports"} Char={this.state.Support} updateCombined={this.state.UpdateSupport} Data={this.state.SuppData} />
        </div>
      

        <div className="info-middle text-combined-stats">

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.Attack.toFixed()}</span>
  <span class="combined-stat-title">ATK</span>
  <span class="combined-stat-amount">{this.state.Combined.Attack.toFixed()}</span>
  <span class="float-right small">{this.state.Support.Attack.toFixed()}</span>
</div>


<div class="combined-stat">
  <span class="float-left small">{this.state.Main.CC.toFixed(2)}</span>
  <span class="combined-stat-title">Crit Rate</span>
  <span class="combined-stat-amount">{this.state.Combined.CC.toFixed(2)}%</span>
  <span class="float-right small">{this.state.Support.CC.toFixed(2)}</span>
</div>



<div class="combined-stat">
  <span class="float-left small">{this.state.Main.CD.toFixed(2)}</span>
  <span class="combined-stat-title">Crit DMG</span>
  <span class="combined-stat-amount">{this.state.Combined.CD.toFixed(2)}%</span>
  <span class="float-right small">{this.state.Support.CD.toFixed(2)}</span>
</div>


<div class="combined-stat">
  <span class="float-left small">{this.state.Main.HP.toFixed()}</span>
  <span class="combined-stat-title">HP</span>
  <span class="combined-stat-amount">{this.state.Combined.HP.toFixed()}</span>
  <span class="float-right small">{this.state.Support.HP.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.PDEF.toFixed()}</span>
  <span class="combined-stat-title">PDEF</span>
  <span class="combined-stat-amount">{this.state.Combined.PDEF.toFixed()}</span>
  <span class="float-right small">{this.state.Support.PDEF.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.ADEF.toFixed()}</span>
  <span class="combined-stat-title">ADEF</span>
  <span class="combined-stat-amount">{this.state.Combined.ADEF.toFixed()}</span>
  <span class="float-right small">{this.state.Support.ADEF.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.Speed}</span>
  <span class="combined-stat-title">Speed</span>
  <span class="combined-stat-amount">{this.state.Combined.Speed}</span>
  <span class="float-right small">{this.state.Support.Speed}</span>
</div>
 
</div>
        
      </div>

      
    </div>

    </Route>

    <Route path="/timers" component={Timers}>

    </Route>

    
    <Route path="/char/:role/:name" component={Character}>

    </Route>

    <Route path="/characters" component={Characters}>

    </Route>


    <Route path="/skills" component={Skills}>

    </Route>

    <Route path="/c/:link" component={Stats}> 
    <div class="info stats-container">
      
    
      <div class="info-inner">
        <div class="link-box">
        <div class="link-box-left">
        <div class="link-box-left-inner">
        <input class="link-input" type="text"  value={this.state.Link}/>
        
        </div>
        
        <div class="link-box-right" onClick={() => { this.state.MakeLink()}}>
        <div class="link-box-right-inner">{this.state.LinkStatus}</div>
        </div></div>
        </div>
        
    {this.state.LoadedMain}
    {this.state.LoadedSupp}

    
    <div className="info-middle text-combined-stats">

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.Attack.toFixed()}</span>
  <span class="combined-stat-title">ATK</span>
  <span class="combined-stat-amount">{this.state.Combined.Attack.toFixed()}</span>
  <span class="float-right small">{this.state.Support.Attack.toFixed()}</span>
</div>


<div class="combined-stat">
  <span class="float-left small">{this.state.Main.CC.toFixed(2)}</span>
  <span class="combined-stat-title">Crit Rate</span>
  <span class="combined-stat-amount">{this.state.Combined.CC.toFixed(2)}%</span>
  <span class="float-right small">{this.state.Support.CC.toFixed(2)}</span>
</div>



<div class="combined-stat">
  <span class="float-left small">{this.state.Main.CD.toFixed(2)}</span>
  <span class="combined-stat-title">Crit DMG</span>
  <span class="combined-stat-amount">{this.state.Combined.CD.toFixed(2)}%</span>
  <span class="float-right small">{this.state.Support.CD.toFixed(2)}</span>
</div>


<div class="combined-stat">
  <span class="float-left small">{this.state.Main.HP.toFixed()}</span>
  <span class="combined-stat-title">HP</span>
  <span class="combined-stat-amount">{this.state.Combined.HP.toFixed()}</span>
  <span class="float-right small">{this.state.Support.HP.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.PDEF.toFixed()}</span>
  <span class="combined-stat-title">PDEF</span>
  <span class="combined-stat-amount">{this.state.Combined.PDEF.toFixed()}</span>
  <span class="float-right small">{this.state.Support.PDEF.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.ADEF.toFixed()}</span>
  <span class="combined-stat-title">ADEF</span>
  <span class="combined-stat-amount">{this.state.Combined.ADEF.toFixed()}</span>
  <span class="float-right small">{this.state.Support.ADEF.toFixed()}</span>
</div>

<div class="combined-stat">
  <span class="float-left small">{this.state.Main.Speed}</span>
  <span class="combined-stat-title">Speed</span>
  <span class="combined-stat-amount">{this.state.Combined.Speed}</span>
  <span class="float-right small">{this.state.Support.Speed}</span>
</div>
 
</div>
        
      </div>

      
    </div>
    </Route>
    <Route path="/Stats" component={Statistics}> 

    
    </Route>
    <Redirect from="/accounts" to="/users" />

    <Route>
    </Route>
  </Switch>
  </Router>

  <FooterNav />
  </div>
    </div>
  );
}
}

export default App;
