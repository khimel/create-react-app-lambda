import React, { Component } from "react"
import "../assets/Home.css"

import { Link } from "react-router-dom";

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      name : ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.startGame = this.startGame.bind(this)
  }

  startGame(){
    this.props.updateName(this.state.name)
    console.log(this.state.name);
    
  }

  handleChange(e){
    this.setState({ name: e.target.value });
  }

    render() {
      return (
        <div className="container d-flex flex-column align-items-center h-100 ">
            <div className="row  align-self-center justify-content-center my-auto mb-1">
              <h1 className="green typewriter">Welcome, Batman</h1>
            </div>
          <div className="row d-flex align-self-center mt-4">
            <div className="col d-flex justify-content-center ">
              <div>
                <input type="text" className="form-control" id="playerNameInput" placeholder="Player Name" onChange={ this.handleChange } required />
              </div>
            </div> 
          </div>
          <div className="row d-flex align-self-center my-auto mt-3">
            <div className="col d-flex justify-content-center ">
              <Link to="/game">
                <button className="btn btn-primary" onClick={this.startGame}>Solve Riddles</button>
              </Link>
            </div> 
          </div>
        </div>
      )
    }
}

export default Home