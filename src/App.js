import React, { Component } from "react"

import Home from "./components/Home"
import Game from "./components/Game"

import "./App.css"

import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      playerName : ""
    }

    this.updateName = this.updateName.bind(this)
  }

  updateName(name){
    this.setState({
      playerName: name
    })
    console.log(name)
  }

  render() {
    return (
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home updateName={this.updateName}/>} />
          <Route path="/game" element={<Game playerName={this.state.playerName}/>} />
        </Routes>
      </BrowserRouter>
        

      // <div className="App container">


      //   <GameHeader  />

      //   <UserNameInput />
      //   <StartButton />


      //   {/* These show when user started the game (need bool) */}

      //   {/* <Question /> */}
      //   {/* <Picture /> Should be related to question - use another API */}
      //   {/* <Score /> */}
      //   {/* Here will be the player name -- no need for component I think */}
      //   {/* <Timer />  */}
      //   {/* <Answers /> */}

      //   {/* Bonus: add prices like who will win million with animation */}


      //   {/* <Celebration /> */}

      // </div> */}

      
    )
  }
}

export default App
