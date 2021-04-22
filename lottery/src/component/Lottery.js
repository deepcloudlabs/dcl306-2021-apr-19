import React from "react";
import LotteryRow from "./LotteryRow";

class Lottery extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            numbers: [],
            columns: 0
        }
        this.render = this.render.bind(this);
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // shallow comparison -> PureComponent automatically does this!
        // risk ! state model -> complex compound object -> missing updates on the UI
        /*
        return (this.state.columns !== nextState.columns) || (this.state.numbers !== nextState.numbers)
            || (this.props.max !== nextProps.max);
        return super.shouldComponentUpdate(nextProps, nextState, nextContext);
        */
        return this.state.columns !== nextState.columns;
    }

    drawNumbers = () => {
        let newNumbers = Array.from(this.state.numbers);
        newNumbers.push(this.createLotteryNumbers());
        let newColumns = this.state.columns + 1;
        this.setState({  // async
            numbers: newNumbers,
            columns: newColumns
        }, () => {
           console.log(this.state.columns);
        })
        //setInterval(() => {}, 3000)
    }

    createLotteryNumbers = () => { // no side effect
        let lotteryNumbers = [];
        while (lotteryNumbers.length < Number(this.props.size)){
            let candidate = Math.floor(Math.random() *  Number(this.props.max)) + 1;
            if (!lotteryNumbers.includes(candidate))
                lotteryNumbers.push(candidate);
        }
        lotteryNumbers.sort((x,y)=>x-y);
        return lotteryNumbers;
    }

    resetNumbers = () => {
        this.setState({
            numbers: [],
            columns: 0
        })
    }

    removeRow = (index) => {
        let removedNumbers = this.state.numbers.filter( (nums,idx) => idx !== index );
        this.setState({
            numbers: removedNumbers,
            columns: removedNumbers.length
        })
    }
    optimizeDrawNumbers = () => this.drawNumbers();

    render = () => {
        let numbersTable = "";
        if (this.state.numbers.length > 0){
            numbersTable = <table className="table table-bordered table-responsive table-hover">
                <thead>
                <tr>
                    {
                        Array.from(Array(Number(this.props.size)).keys()).map( col =>
                                <th key={col}>Column #{col + 1}</th>
                        )
                    }
                    <th key={this.props.size}>Operations</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.numbers.map(
                        (nums,row_idx) => <LotteryRow key={row_idx}
                                                      index={row_idx}
                                                      removeRow={this.removeRow}
                                                      numbers={nums}>
                            <td>Hello Mars!</td>
                            <td>Hello Neptune!</td>
                        </LotteryRow>
                    )
                }
                </tbody>
            </table>
        }
        // <React.Fragment></React.Fragment>
        // <>  </>
        return (
            <div className="container">
                <div className="card-header">
                    <h2 className="card-title">Lottery Numbers</h2>
                </div>
                <div className="card-body">
                    <button className="btn btn-success" onClick={this.optimizeDrawNumbers}>Draw</button>
                    <button className="btn btn-warning" onClick={this.resetNumbers}>Reset</button>
                    {numbersTable}
                </div>
            </div>
        );
    }
}

export default Lottery;