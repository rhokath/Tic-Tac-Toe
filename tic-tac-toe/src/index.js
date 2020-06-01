import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
//square components not longer maintain state, now "controlled components"
// class Square extends React.Component {
//     render() {
//       return (
//         <button 
//         className="square"
//          onClick={()=> this.props.onClick()}
//          >
//           {this.props.value}
//         </button>
//       );
//     }
//   }
function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}
  
  class Board extends React.Component {
    // handleClick(i){
    //   //call .slice to create a copy of the squares array to modify instead of exsiting array
    //   const squares = this.state.squares.slice()
    //   //ignore a click if someone has won the game or if the square has already been clicked
    //   if(calculateWinner(squares)|| squares[i]){
    //     return
    //   }
    //   squares[i] = this.state.xIsNext ? 'X': 'O';
    //   this.setState({
    //     squares: squares,
    //     xIsNext: !this.state.xIsNext,
    //   })
    // }
    renderSquare(i) {
      return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
  
      return (
        <div>
          
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      }
    }
    handleClick(i){
      //call .slice to create a copy of the squares array to modify instead of exsiting array
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if(calculateWinner(squares) || squares[i]){
        return
      }
      squares[i] = this.state.xIsNext ? "X": "O";
      //prefer concat over push because it doesn't mutate original array
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
      })
    
    }
    jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
    renderSquare(i) {
      return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
      );
    }
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      //when we render a list React stores some info about each rendered list item
      //when we update a list, React needs to determin what has changed. we could have added, removed, re-arranged or updated lists item
      //keys tell React about the identity of each component which allows React to
      //maintain state between re-renders
      //keys don't need to be globally unique, they only need to be unique between components and their siblings
      const moves = history.map((step, move)=> {
        const desc = move ?
        "Go to move #" + move :
        "Go to game start";
        return(
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })
      let status;
      if(winner){
        status = "Winner: "+ winner;
      }else{
        status = "Next player: " + (this.state.xIsNext ? "X": "O")
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  //function to determine winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  