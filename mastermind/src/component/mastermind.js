import React from "react";
import CardHeader from "../bootstrap/CardHeader";
import Badge from "../bootstrap/Badge";

class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            gameLevel: 3,
            tries: 0,
            secret: 549,
            moves: [],
            guess: 145, // -1+1, 954 -> -3
            statistics: {
                wins: 0,
                loses: 0
            }
        }
    }

    handleInputChange = (event) => {
        let value = Number(event.target.value);
        this.setState({guess: value});
    }

    play = () => {

    }

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <CardHeader title="Game Console"></CardHeader>
                    <div className="card-body">
                        <Badge label="Game Level" value={this.state.gameLevel}></Badge>
                        <Badge label="Tries" value={this.state.tries}></Badge>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input type="text"
                                   id="guess"
                                   className="form-control"
                                   onChange={(event) => this.handleInputChange(event)}
                                   value={this.state.guess}></input>
                        </div>
                        <div className="form-group">
                            <button onClick={this.play}
                                    className="btn btn-success">Play
                            </button>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <CardHeader title="Moves"></CardHeader>
                    <div className="card-body">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Guess</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.moves.map( (move,index) =>
                                    <tr key={move.guess}>
                                        <td>{index + 1}</td>
                                        <td>{move.guess}</td>
                                        <td>{move.partialMatch} {move.perfectMatch}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mastermind;