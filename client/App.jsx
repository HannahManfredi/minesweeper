import React from 'react';
import axios from 'axios';
import Nav from './components/Nav.jsx';
import Grid from './components/Grid.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
      width: 10,
      mines: 10
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
  }

  render() {
    const {height, width, mines} = this.state;
    return (
      <div>
        <h1>MINESWEEPER by HKM</h1>
        <div id="board">
          <Grid height={height} width={width} mines={mines} />
        </div>
        <form onSubmit={this.submit}>
          <input type="submit" name="plant_poops" value="Plant Rabbit Poops"></input>
        </form>
      </div>
    );
  }
}

export default App;

//when you click start it should randmly plant ten mines