import React, { Component } from "react"

import "../assets/Game.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import renderTime from "./Timer";


class Game extends Component {

  constructor(props){
    super(props);

    this.state = {
      Questions : "",
      currentLevel : 1,
      CorrectIndex: 0,
      Answers:[],
      DataisLoaded: false,
      IsPlaying : true,
      key: 0
    }
    this.checkAnswer = this.checkAnswer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)

  }

  componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=100&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          var answers = result.results[this.state.currentLevel].incorrect_answers;
          var correctIndex = (this.getRandomInt());
          console.log(correctIndex)
          answers.splice(correctIndex,0,result.results[this.state.currentLevel].correct_answer);
          console.log(answers)
          this.setState({
            Questions: result.results,
            Answers: answers,
            CorrectIndex: correctIndex,
            DataisLoaded: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

      


  }

  checkAnswer(e){
    console.log(e.target.value);
    console.log(this.state.CorrectIndex);
    if(e.target.value == this.state.CorrectIndex){

      var answers = this.state.Questions[this.state.currentLevel +1].incorrect_answers;
      var correctIndex = (this.getRandomInt());
      console.log(correctIndex)
      answers.splice(correctIndex,0,this.state.Questions[this.state.currentLevel +1].correct_answer);
      console.log(answers)
      this.setState({

        currentLevel : this.state.currentLevel + 1,
        Answers : answers,
        key: 1-this.state.key

      })

    }else{
      console.log("NOOOOO");
      
      this.setState({
        // IsPlaying : false
      })
      // You lost.. try again button?
    }
  }

  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  updateTimer(){
    var timeleft = this.state.timeLeft;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
  
      } else {
        document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;
    }, 1000);
  }

  getRandomInt() {
  return Math.floor(Math.random() * 4) ; // number from 0 to 3
}

    render() {
      const { DataisLoaded ,Questions } = this.state;
      if(!DataisLoaded){
        return(
          <h1 className="white">Starting...</h1>
        )
      }

      return (

        <div className="container">
          <nav className="navbar navbar-dark bg-success border border-light border-4 rounded-pill">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                <img src={require("../assets/quiz-back.jpeg")} alt="" width="30" height="24" className="d-inline-block align-text-top" />
                  <span className="mx-2">Monday Riddler</span>
              </a>
            </div>
          </nav>
        {/* NavBar with Riddler Icon link */}

          {console.log(this.props.playerName)}
          {/* quesion */}
          <div>
            <h1 className="question">{this.decodeHtml(this.state.Questions[this.state.currentLevel].question)}</h1>
          </div>

          {/* image */}
          {/* <div>
          <img src={require("../assets/quiz-back.jpeg")} alt="Girl in a jacket" width="1000" height="500" />
          </div> */}
          
          {/* answers */}
          <div>

            <button className="btn btn-warning" onClick={this.checkAnswer} value="0"> {this.decodeHtml(this.state.Answers[0])} </button>
            <button className="btn btn-warning" onClick={this.checkAnswer} value="1"> {this.decodeHtml(this.state.Answers[1])} </button>
            <button className="btn btn-warning" onClick={this.checkAnswer} value="2"> {this.decodeHtml(this.state.Answers[2])} </button>
            <button className="btn btn-warning" onClick={this.checkAnswer} value="3"> {this.decodeHtml(this.state.Answers[3])} </button>
          </div>

          <div>
            {/* playerName and level with animation (batman car and riddler logo at the end) */}
            <h2 className="white">
              {this.props.playerName} 
              
            </h2>
            <h3 className="white">
            Current Level: {this.state.currentLevel}
            </h3>

            {/* Timer */}
            <div className="timer-wrapper">
              <CountdownCircleTimer
                isPlaying={this.state.IsPlaying}
                duration={30}
                colors={["#00FF00", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[23, 15, 7, 0]}
                size = {160}
                key={this.state.key}
              >
                {renderTime}
              </CountdownCircleTimer>
      </div>

          </div>

        </div>
      )
    }
}

export default Game