import React, { Component } from "react"

import "../assets/Game.css"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import renderTime from "./Timer";
import ProgressBar from "@ramonak/react-progress-bar";
import Win from "./Win";


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
      key: 0,
      Won:false
    }
    this.checkAnswer = this.checkAnswer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.handleNoTime = this.handleNoTime.bind(this)
    this.reset = this.reset.bind(this)
    this.win = this.win.bind(this)

  }

  componentDidMount() {
    this.getData()
  }

  win(){
    this.setState({
      Won: true
    })
  }



  getData(){
    fetch("https://opentdb.com/api.php?amount=100&difficulty=easy&type=multiple")
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
    if(!this.state.IsPlaying){
      return
    }

    var val1 = parseInt(e.target.value);
    var val2 = this.state.CorrectIndex;
    if(val1 === val2){
      if(this.state.currentLevel === 5){
        this.setState({
          Won: true
        })
      }

      var answers = this.state.Questions[this.state.currentLevel +1].incorrect_answers;
      var correctIndex = (this.getRandomInt());
      console.log(correctIndex)
      answers.splice(correctIndex,0,this.state.Questions[this.state.currentLevel +1].correct_answer);
      console.log(answers)
      this.setState({

        currentLevel : this.state.currentLevel + 1,
        Answers : answers,
        key: 1-this.state.key,
        CorrectIndex: correctIndex

      })

    }else{
      this.setState({
        IsPlaying : false
      })
      
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
    var x = Math.floor(Math.random() * 4);
    console.log(x);
  return x ; // number from 0 to 3
}

handleNoTime(){
  this.setState({
    IsPlaying : false
  })
}

reset(){
  this.setState({
    currentLevel : 1,
    IsPlaying : true,
    key: 0,
    DataisLoaded : false
})
  this.getData()
}

    render() {
      const { DataisLoaded } = this.state;
      if(!DataisLoaded){
        return(
          <h1 className="white">Starting...</h1>
        )
      }

      

      if(this.state.Won){
        return(
          <Win name={this.props.name} />
        )
      }
      var level = this.state.currentLevel
      var answers = this.state.Answers
      return (
        <div className="h-100">
        
          <nav className="navbar navbar-expand-lg navbar-dark bg-success border border-light border-1 rounded">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <img src={require("../assets/logo.png")} alt="" width="30" height="24" className="d-inline-block align-text-top" />
                  <span className="mx-2">Monday Riddler</span>
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link active" onClick={this.win}>Try Winning</span>
                  </li>
                </ul>
              </div>
            </div>
          </nav>


          <div className="container d-flex flex-column align-items-center h-100 mt-3">
            <div className="row w-100">
            <ProgressBar completed={this.state.currentLevel*20 -20} />
            </div>

          
          
            {/* quesion */}
            <div className="row my-5 ">
              <h1 className="question">{this.decodeHtml(this.state.Questions[level].question)}</h1>
            </div>
  
            {/* helper 50/50 and hint */}
            {/* <div>
            <img src={require("../assets/quiz-back.jpeg")} alt="Girl in a jacket" width="1000" height="500" />
            </div> */}
            
            {/* answers */}

            <div className="row row-cols-2 w-100 my-auto ">
              <div className="col d-grid gap-2 mb-3">
              <button className="btn btn-warning btn-lg" onClick={this.checkAnswer} value="0"> {this.decodeHtml(answers[0])} </button>
              </div>
              <div className="col d-grid gap-2 mb-3">
              <button className="btn btn-warning btn-lg" onClick={this.checkAnswer} value="1"> {this.decodeHtml(answers[1])} </button>
              </div>
              <div className="col d-grid gap-2 mb-3">
              <button className="btn btn-warning btn-lg" onClick={this.checkAnswer} value="2"> {this.decodeHtml(answers[2])} </button>

              </div>
              <div className="col d-grid gap-2 mb-3">
              <button className="btn btn-warning btn-lg" onClick={this.checkAnswer} value="3"> {this.decodeHtml(answers[3])} </button>
              </div>
            </div>
  
            <div className="my-auto">
              {/* playerName and level with animation (batman car and riddler logo at the end) */}
              <div className="white">
                {this.state.IsPlaying === true && 
                <div className="mb-4 justify-content-center align-self-center">
                  <h3> Good Luck, {this.props.playerName}.
                  </h3>
                <h4>
                  And remember, ONE wrong move and you lose. 
                </h4>
                </div>
                }
                
                

                {this.state.IsPlaying === false && 
                <div className=" mb-4">
                  <h2 className=""> {this.props.playerName} you have lost!
                </h2>
                <button className="btn btn-primary" onClick={this.reset}>
                  Try Again
                </button>
                </div>
                
                }

                
                
              </div>
  
              {/* Timer */}
              <div className="timer-wrapper">
                <CountdownCircleTimer
                  isPlaying={this.state.IsPlaying}
                  duration={30}
                  colors={["#00FF00", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[23, 15, 7, 0]}
                  size = {160}
                  key={this.state.key}
                  onComplete={this.handleNoTime}
                >
                  {renderTime}
                </CountdownCircleTimer>
              </div>
  
            </div>
  
          </div>

        </div>

        
      )
    }
}

export default Game