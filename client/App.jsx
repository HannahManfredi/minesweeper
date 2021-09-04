import React from 'react';
import axios from 'axios';
import StopWatch from './components/StopWatch.jsx';
import Grid from './components/Grid.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
      width: 10,
      mines_total: 10,
      mines: []
    };
  }

  componentDidMount() {
    axios
      .get('/start')
      .then(res => {
        console.log(res)
      })
      .catch((err) => {
        throw err;
      })
  }

  submit = (e) => {
    e.preventDefault();
    console.log('submit e: ', e);
    //generate 10 random rows
      //generate 10 random cols
    this.setBoard(this.state.mines_total);
  }

  setBoard = (bombs) => {
    console.log('in setboard');
    let board = []; //needs numbs flags
    let mines = []; //[[row_index, col_index]] for each mine
    const makeBombs = () => {
      if (mines.length === 10) {
        return;
      }
      let random_row = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      let random_col = Math.floor(Math.random() * (10 - 1 + 1) + 1);
      let bomb = [random_row, random_col];
      if (mines.indexOf(bomb) === -1) {
        mines.push(bomb);
      }
      return makeBombs();
    }
    makeBombs()
  }

  render() {
    const {height, width, mines_total, mines} = this.state;
    return (
      <div className="App">
        <h1 className="App-title">MINESWEEPER</h1>
        <div id="board">
          <Grid height={height} width={width} mines_total={mines_total} mines={mines}/>
        </div>
        <form onSubmit={this.submit}>
          <input type="submit" name="plant_mines" value="Plant Mines"></input>
        </form>
        <StopWatch />
      </div>
    );
  }
}

export default App;
