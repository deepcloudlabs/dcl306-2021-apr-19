import React from "react";
import CardHeader from "../bootstrap/CardHeader";
import Badge from "../bootstrap/Badge";
import {Move} from "./move";
import {MoveEvaluation} from "./move-evaluation";
import {ProgressBar} from "./progress-bar";

class Mastermind extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        const secret = this.createSecret(3);
        console.log(secret);
        this.state = {
            gameLevel: 3,
            tries: 0,
            secret: secret,
            moves: [],
            counter: 120,
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

    createDigit = (min,max) => {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }

    createSecret = (level) => {
        let digits = [];
        digits.push(this.createDigit(1,9));
        while (digits.length < level){
            let candidate = this.createDigit(0,9);
            if (!digits.includes(candidate))
                digits.push(candidate);
        }
        return digits.reduce( (s,digit) => 10*s+digit, 0);
    }

    initGame = (game) => {
        game.tries = 0;
        game.counter = 120;
        game.secret = this.createSecret(game.gameLevel);
        console.log(game.secret);
        game.moves = [];
    }

    createMove = (guess, secret) => {
        let perfectMatch = 0;
        let partialMatch = 0;
        const guessAsString = guess.toString();
        const secretAsString = secret.toString();
        for (let i=0;i<guessAsString.length;++i){
            const g = guessAsString.charAt(i);
            for (let j=0;j<secretAsString.length;++j){
                const s = secretAsString.charAt(j);
                if (s===g){
                    if (i===j)
                        perfectMatch++;
                    else
                        partialMatch++;
                }
            }
        }
        return new Move(guess, perfectMatch, partialMatch);
    }

    play = () => {
        let game = {...this.state};
        game.tries++;
        if (Number(game.guess) === game.secret ){
            game.gameLevel++;
            if (game.gameLevel >= 10){
                game.statistics.wins++;
                this.props.history.push("/wins")
            }
            this.initGame(game);
        } else {
            if (game.tries >= 10){
                game.statistics.loses++;
                this.initGame(game);
                //TODO: Player loses! -> Routing!
            } else {
                game.moves.push(this.createMove(game.guess, game.secret))
            }
        }
        localStorage.setItem("mastermind", JSON.stringify(game));
        this.setState(game);
    }

    componentDidMount() {
        let game = localStorage.getItem("mastermind");
        if (game === null || game === undefined){
            localStorage.setItem("mastermind", JSON.stringify(this.state));
        } else {
            game = JSON.parse(game);
            this.setState(game);
        }
        setInterval(this.countdown, 1000);
    }

    countdown = () => {
        let game = {...this.state};
        game.counter--;
        if (game.counter <= 0){
            this.initGame(game);
            game.statistics.loses++;
        }
        this.setState(game);
    }

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <CardHeader title="Game Console"></CardHeader>
                    <div className="card-body">
                        <Badge label="Game Level" value={this.state.gameLevel}></Badge>
                        <Badge label="Tries" value={this.state.tries}></Badge>
                        <ProgressBar label="Counter" value={this.state.counter} valueMax={120}></ProgressBar>
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
                    <CardHeader title="Game Statistics"></CardHeader>
                    <div className="card-body">
                        <Badge label="Wins" value={this.state.statistics.wins}></Badge>
                        <Badge label="Loses" value={this.state.statistics.loses}></Badge>
                        <Badge label="Total" value={this.state.statistics.wins + this.state.statistics.loses}></Badge>
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
                                        <td><MoveEvaluation partial={move.partialMatch} perfect={move.perfectMatch}></MoveEvaluation></td>
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