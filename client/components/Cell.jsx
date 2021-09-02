import React from 'react';

class Cell extends React.Component {
  getValue() {
    const {value} = this.props;

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }

  render() {
    const {value, onClick, cMenu} = this.props;
    return (
      <div
        onClick={this.props.onClick}
        onContextMenu={this.props.cMenu}
      >
      {this.getValue()}
      </div>
    );
  }

}