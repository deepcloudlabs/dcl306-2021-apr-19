import React from "react";
import CardHeader from "../bootstrap/CardHeader";
import Badge from "../bootstrap/Badge";

class Mastermind extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            gameLevel: 3,
            tries: 0,
            secret: 123,
            moves: [],
            guess: 0,
            statistics: {
                wins: 0,
                loses: 0
            }
        }
    }

    render = () => {
        return (
          <div className="container">
             <CardHeader title="Game Console"></CardHeader>
             <div className="card-body">
                 <Badge label="Game Level" value={this.state.gameLevel}></Badge>
                 <Badge label="Tries" value={this.state.tries}></Badge>
             </div>
          </div>
        )
    }
}

export default Mastermind;