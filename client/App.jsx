import React from 'react';
import axios from 'axios';
import Board from './components/Board.jsx';
import mineIcon from "../public/assets/mine.png";
import classic_icons from "../public/assets/classic_icons.png";
import smiley from "../public/assets/smiley.png";
// import frowny from "../public/assets/frowny.png";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      mines: [],
      smiley: smiley,
      timerOn: false,
      timerTime: 0,
      timerStart: 0,
      game_started: false,
      game_over: false
    };
  }

  componentDidMount() {
    axios
      .get('/start')
      .then(res => {
        console.log('ready to play minesweeper')
        this.setBoard();
      })
      .catch((err) => {
        throw err;
      })
  }

  click = (e) => {
    const {game_started, game_over} = this.state;
    if (!game_started || game_over) {
      this.setState({
        game_started: true
      });
      this.setBoard(this.state.mines_total);
      this.startTimer();
    } else if (game_started) {
      console.log('inside game started')
      this.stopTimer();
      this.resetTimer();
      this.setState({
        game_started: false
      });
    }
  }

  setBoard = () => {
    console.log('in setboard');
    let numbs = [1, 2, 3];
    let board = [...Array(10)].map(e => Array(10));
    let mines = [];
    const makeBombs = () => {
      if (mines.length === 10) {
        return;
      }
      let random_row = Math.floor(Math.random() * (10 - 1 + 1) + 1); 
      let random_col = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      let bomb = Number(random_row + '.' + random_col);
      // let bomb = [random_col.random_row];
      if (mines.indexOf(bomb) === -1) {
        mines.push(bomb);
      }
      return makeBombs();
    }
    makeBombs()
    console.log('mines: ', mines);
    this.setState({
      mines: mines
    });
    for (let i = 0; i < board.length; i++) {
      let row = board[i]
      for (let j = 1; j <= 10; j++) {
        let v = Number(j + '.' + (i + 1));
        let mineFlag = false;
        if (mines.indexOf(v) > -1) {
          mineFlag = true;
        }
        let value = {
            val: v,
            mine: mineFlag,
            neighbors: []
        }
        row.push(value);
      }
    }
    this.setNeighbors(board);
  }

  setNeighbors = (board) => {
    //ROBOT PATHS!
    //if row 1 dont check for mines above
    //if column 1 dont check for mines to left
    //if column 10 dont check for mines to right
    //if row 10 dont check for mines below
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    console.log('inside stop timer')
    this.setState({ timerOn: false });
    console.log('timer: ', this.timer)
    clearInterval(this.timer);
    console.log('timer: ', this.timer)
  };

  resetTimer = () => {
    console.log('inside reset timer')
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
    console.log('after reset timer: ', this.timer)
  };

  render() {
    const {smiley, game_over, height, width, mines_total, mines, timerTime} = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <div className="app">
        <div className="container">
          <div className="title-container">
            <span className="icon">
              <img src={mineIcon}/>
            </span>
            <div className="app-title">Minesweeper</div>
            <div className="classic-btns-container">
                <div className="classic-btn">
                  <div className="classic-inner-btn">
                    <img src={classic_icons}/>
                  </div>
                </div>
            </div>
          </div>
          <div className="menu-container">
            <div className="menu-btn">
              <span className="text">Game</span>
            </div><div className="menu-btn">
              <span className="text">Help</span>
            </div>
          </div>
          <div className="game_menu-container">
            <div className="game-status-bar">
              <div className="game-menu">
                <div className="num-box">
                  <div className="digit iii"></div>
                  <div className="digit ii"></div>
                  <div className="digit i"></div>
                </div>
                <div className="smiley-container">
                  <div className="smiley-btn">
                    <div className="smiley-inner">
                      <div><img className="smiley-icon" src={smiley} onClick={this.click}/></div>
                    </div>
                  </div>
                </div>
                <div className="num-box timer">
                  <div className="Stopwatch">
                    <div className="Stopwatch-header"></div>
                      <div className="Stopwatch-display">
                        {minutes} : {seconds}
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
            <div className="board">
              <Board mines={mines}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;

//once i get frowny back:
// src={game_over ? frowny : smiley}