import React from 'react';
import boom from "../../public/assets/boom.png";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked_mine: false,
    }
  }

  click = (e) => {
    const mines = this.props.mines;
    let cell = e.target.dataset.item;
    console.log('clicked cell: ', cell);
    if (mines.includes(Number(cell))) {
      console.log('cell in mines array: ', cell);
      this.setState({
        clicked_mine: true
      });
    }
    let cells = document.getElementsByTagName("td");
    console.log('cells: ', cells);
    let img = document.createElement('img');
    img.src = boom;
    // console.log('img: ', img);
    for (let cell of cells) {
      // console.log('cell.dataset.item: ', cell.dataset.item);
      mines.forEach(mine => {
        // console.log('mine: ', mine);
        if (cell.dataset.item === mine) {
          console.log('match')
          cell.appendChild(img);
          // console.log('cell: ', cell);
        }
      });
    }
  }

  render() {
    const mines = this.props.mines;
    const {clicked_mine} = this.state;
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
      <div>
        <table>
          <tbody>
            <tr onClick={this.click}>
              {gridCells1.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells2.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells3.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells4.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells5.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells6.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells7.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells8.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells9.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
            <tr onClick={this.click}>
              {gridCells10.map((val, i) => {
                if (clicked_mine && mines.indexOf(val) > -1) {
                  {console.log('in if')}
                  return <td key={i} className="cell" data-item={val}><img src={boom}/></td>
                } else {
                  return <td key={i} className="cell" data-item={val}></td>
                }
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;