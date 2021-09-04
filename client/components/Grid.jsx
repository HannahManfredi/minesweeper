import React from 'react';
import smiley from "../../public/assets/smiley.png";
import frowny from "../../public/assets/frowny.png";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smiley: smiley,
      frowny: frowny,
      restart: false,
      game_over: false,
      smiley_clicked: false //restart game
    }
  }

    //restart game
    //game over     this.changeSmiley();
    //plant bombs

  click = (e) => {
    console.log('e: ', e)
    this.setState({
      restart: true,
      smiley_clicked: !this.state.smiley_clicked
    });
  }

  changeSmiley = () => {
    if (this.state.smiley_clicked) {

    }
  }

  render() {
    const gridCells1 = [1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.1, 10.1];
    const gridCells2 = [1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 10.2];
    const gridCells3 = [1.3, 2.3, 3.3, 4.3, 5.3, 6.3, 7.3, 8.3, 9.3, 10.3];
    const gridCells4 = [1.4, 2.4, 3.4, 4.4, 5.4, 6.4, 7.4, 8.4, 9.4, 10.4];
    const gridCells5 = [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5];
    const gridCells6 = [1.6, 2.6, 3.6, 4.6, 5.6, 6.6, 7.6, 8.6, 9.6, 10.6];
    const gridCells7 = [1.7, 2.7, 3.7, 4.7, 5.7, 6.7, 7.7, 8.7, 9.7, 10.7];
    const gridCells8 = [1.8, 2.8, 3.8, 4.8, 5.8, 6.8, 7.8, 8.8, 9.8, 10.8];
    const gridCells9 = [1.9, 2.9, 3.9, 4.9, 5.9, 6.9, 7.9, 8.9, 9.9, 10.9];
    const gridCells10 = [1.10, 2.10, 3.10, 4.10, 5.10, 6.10, 7.10, 8.10, 9.10, 10.10];
    return (
      //conditional rendering for either restart fresh game or middle of game-play
      <div>
        <div>
          <div className="grid_header">
            <img className="smiley" onClick={this.click}src={this.state.game_over ? this.state.frowny : this.state.smiley}/>
          </div>
          <table className="grid">
            <tbody>
              <tr>
                {gridCells1.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells2.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells3.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells4.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells5.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells6.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells7.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells8.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells9.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
              <tr>
                {gridCells10.map((val, i) => {
                  return <td key={i} className="cell" data-item={val}></td>
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Grid;