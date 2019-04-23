import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'




// ========================================
class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}
// NOTE:
// The following is the _functional_ equivalent of the above class
//
// function Square(props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     )
// }




// ========================================
// - Manages state for the tic-tac-toe game
// - Controls rendering of tic-tac-toe game, by rendering
//   a grid of <Square>s
class Board extends React.Component {

    // State contains:
    // - an array storing the state of the game: 'null' for no move yet,
    //   and 'X' or 'O' for spots taken by 'X' and 'O', respectively
    // - a flag indicating who has the next turn
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }


    // - Receives a parameter uniquely identifying each <Square>
    // - Returns a <Square> whose value is taken from state, and whose
    //   click handler is supplied with its unique identifier (this enables
    //   each <Square>'s click handler to update the value in state
    //    corresponding to that <Square>)
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} />
    }

    
    // When a <Square> is clicked, updates the state of the game by setting
    // the value in state for the <Square> to 'X' or 'O', and updating the
    // next turn indicator
    handleClick = i => {
        
        // Ignore click if the square has already been claimed, or
        // the game has been won
        if (this.state.squares[i] || calculateWinner(this.state.squares)) {
            return
        }

        this.setState(prevState => {
            prevState.squares[i] = (prevState.xIsNext) ? 'X' : 'O'
            return {
                squares: prevState.squares,
                xIsNext: !prevState.xIsNext
            }
        })
    }

    
    // Renders a tic-tac-toe board, with game status/turn indicator
    render() {

        const winner = calculateWinner(this.state.squares)

        let status
        if (winner)
            status = 'Winner: ' + winner
        else
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

        return (
            <div>
                <div className="status">{status}</div>
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
        )
    }
}




// ========================================
// Helper function for <Board>
// Given an array of 9 squares, this function will check for a winner
// and return 'X', 'O', or null as appropriate
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
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}




// ========================================
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}




// ========================================
ReactDOM.render(
    <Game />,
    document.getElementById('root')
)
