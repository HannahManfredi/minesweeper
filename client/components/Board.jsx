import React from 'react';
import boom from "../../public/assets/boom.png";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      gameStatus: '',
      clicked_mine: false,
      detonated_mines: 0,
    }
  }

  click = (val, x, y) => {
    const { board, mines } = this.props;
    const { detonated_mines } = this.state;
    // const mines = this.props.mines;
    // let cell = e.target.dataset.item;
    let cell = val;
    // check if revealed. return if true.
    if (board[x][y].isRevealed || board[x][y].isFlagged) {
      return null;
    } 
    // check if mine. game over if true
    if (board[x][y].isMine) {
      this.setState({
        gameStatus: "You Lost."
      });
      this.revealAllMines();
      alert("game over");
    }

    let updatedBoard = board;

    if (board[x][y].isEmpty) {
      const { traverseBoard } = this.props;
      let area = traverseBoard(x, y, board);
      updatedBoard = this.revealEmpty(x, y, board, area);
      console.log('updatedboard: ', updatedBoard);
    }

    if (board[x][y].neighbor) {
      let numb = board[x][y].neighbor;
      cell.innerHTML = "numb";
    }

    //something with detonated_mines:
    if (detonated_mines === this.props.mines.length) {
      this.setState({gameStatus: "You Win."});
      this.revealBoard();
      alert("You Win");
     }
     this.setState({
      board: updatedBoard
     });

  }

  revealEmpty(x, y, board, area) {
    if (area.length) {
      area.map(value => {
        if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
          board[value.x][value.y].isRevealed = true;
          if (value.isEmpty) {
            this.revealEmpty(value.x, value.y, board, area.slice(1));
          }
        }
      });
    }
    return board;
  }  

  revealAllMines = () => {
    const { mines } = this.props;
    let cells = document.getElementsByTagName("td");
    let img = document.createElement('img');
    img.src = boom;
    img.classList.add('icon');
    img.classList.add('boom');
    for (let cell of cells) {
      mines.forEach(mine => {
        if (cell.dataset.item === mine) {
          cell.appendChild(img);
        }
      });
    }  
  }

  render() {
    const { mines, board } = this.props;
    const {clicked_mine} = this.state;
    const gridCells1 = board[0]; 
    const gridCells2 = board[1];
    const gridCells3 = board[2];
    const gridCells4 = board[3];
    const gridCells5 = board[4];
    const gridCells6 = board[5];
    const gridCells7 = board[6];
    const gridCells8 = board[7];
    const gridCells9 = board[8];
    const gridCells10 = board[9];
    return (
      <table>
        <tbody>
          <tr >
            {gridCells1.map((val, i) => {
                return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells2.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells3.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells4.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells5.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells6.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells7.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells8.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells9.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
          <tr onClick={this.click}>
            {gridCells10.map((val, i) => {
              return <td key={i} className="cell" data-item={val.val} onClick={() => this.click(val.val, val.x, val.y)}></td>
            })}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Board;




//Click a square, you get a number. That number is the number of how many mines are surrounding it. 
//If you find the mine, you can open "unopened" (unclicked) squares around it, opening more areas