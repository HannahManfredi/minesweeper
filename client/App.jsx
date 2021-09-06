import React from 'react';
import axios from 'axios';
import "babel-polyfill";
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset, Counter } from 'react95';
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import Board from './components/Board.jsx';
import mineIcon from "../public/assets/mine.png";
import classic_icons from "../public/assets/classic_icons.png";
import smiley from "../public/assets/smiley.png";
// import frowny from "../public/assets/frowny.png";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;

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
        const board = async () => {
          let newBoard = await this.setBoard();
          this.setState({
            board: newBoard
          }, () => {
            console.log('board is set. ready to play minesweeper')
          });
        }
        board();
      })
      .catch((err) => {
        throw err;
      });
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
      this.stopTimer();
      this.resetTimer();
      this.setState({
        game_started: false
      });
    }
  }

  setBoard = async () => {
    let board = [...Array(10)].map(e => Array());
    let mines = [];
    const makeMines = () => {
      if (mines.length === 10) {
        return;
      }
      let random_row = Math.floor(Math.random() * (10 - 1 + 1) + 1); 
      let random_col = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      let mine = Number(random_row + '.' + random_col);
      if (mines.indexOf(mine) === -1) {
        mines.push(mine);
      }
      return makeMines();
    }
    makeMines()
    this.setState({
      mines: mines
    });
    for (let i = 0; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        let v = Number(j + '.' + (i + 1));
        let mineFlag = false;
        if (mines.indexOf(v) > -1) {
          mineFlag = true;
        }
        let value = {
            val: v,
            x: (i + 1),
            y: j,
            isMine: mineFlag,
            isRevealed: false,
            isEmpty: false,
            sFlagged: false,
            neighbor: 0
        }
        if (board[i]) {
          board[i].push(value);
        }
      }
    }
    let updateBoard = await this.setNeighbors(board);
    return updateBoard;
  } 

  setNeighbors = async (board) => {
    let updatedBoard = board;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[i][j].isMine !== true) {
          let mine = 0;
          const area = this.traverseBoard(board[i][j].x, board[i][j].y, board);
          area.map(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedBoard[i][j].isEmpty = true;
          }
          updatedBoard[i][j].neighbour = mine;
        }

      }
    }
    return updatedBoard;
  }

  traverseBoard = (x, y, data) => {
    const el = [];

    //up
    if (x > 0) {
      el.push(data[x - 1][y - 1]);
    } 
    //down
    if (x < 10 - 1) {
      if (x === 9) {
        el.push(data[x][y - 1]);
      } else {
        el.push(data[x + 1][y - 1]);
      }
    }
    //left
    if (y > 0) {
      el.push(data[x-1][y - 1]);
    }
    //right
    if (y < 10 - 1) {
      el.push(data[x-1][y + 1]);
    }
    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }
    // top right
    if (x > 0 && y < 10 - 1) {
      el.push(data[x - 1][y + 1]);
    }
    // bottom right
    if (x < 10 - 1 && y < 10 - 1) {
      el.push(data[x + 1][y + 1]);
    }
    // bottom left
    if (x < 10 - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }
    return el;
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
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const {smiley, board, mines, timerTime} = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    if (board.length > 0) {
      return (
        <div className="app">
          <GlobalStyles />
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
                <ThemeProvider theme={original}>
                    <Counter>
                      <div className="num-box">
                        <div  className="mine-count">
                        </div>
                      </div>
                    </Counter>
                </ThemeProvider>
                <div className="smiley-container">
                  <div className="smiley-btn">
                    <div className="smiley-inner">
                      <div><img className="smiley-icon" src={smiley} onClick={this.click}/></div>
                    </div>
                  </div>
                </div>
                <ThemeProvider theme={original}>
                  <Counter>
                    <div className="num-box">
                      <div className="Stopwatch">
                        <div className="Stopwatch-display">
                          {minutes} : {seconds}
                        </div>
                      </div>
                    </div>
                  </Counter>
                </ThemeProvider>
                </div>
              </div>
            </div>
              <div className="board">
                <Board mines={mines} board={board} traverseBoard={this.traverseBoard}/>
              </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>One moment while we create a custom board for you!</h1>
        </div>
      );
    }
  }
}

export default App;

//once i get frowny back:
// src={game_over ? frowny : smiley}