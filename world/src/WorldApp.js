import React, {Component} from 'react';
import Table from './Table';
import './WorldApp.css';

class WorldApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            continents: [],
            countries: [],
            continent: "Asia"
        };
        this.list = this.list.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8001/world/api/continents")
            .then(response => response.json())
            .then((continents) => this.setState({continents: continents.sort()}));
    }

    componentWillUnmount() {
    }

    list(e) {
        e.preventDefault();
        const { continent } = this.refs ;
        this.setState({
           continent: continent.value
        });
        fetch("http://localhost:8001/world/api/continents/"+this.refs.continent.value)
            .then( response => {console.log(response); return response;} )
            .then( response => response.json() )
            .then( countries => {
                countries.forEach( c => this.state.countries.push(c));

                this.setState({countries: this.state.countries});
            });
    };

    render() {
        return (
            <div>
                <div className="container" role="main">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">World Countries</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.list}>
                                <div className="form-group">
                                    <label htmlFor="continent"></label>
                                    <select className="form-control" ref="continent">
                                        {this.state.continents.map((continent, i) =>
                                            <option key={i} label={continent} value={continent}>{continent}</option>
                                        )
                                        }
                                    </select>
                                    <button className="btn btn-success">List</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Table title="Countries"
                           columns="Code,Name,Population,Surface Area"
                           values={this.state.countries}
                           properties="code,name,population,surfaceArea"></Table>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h2 className="panel-title">Search Result</h2>
                        </div>
                        <div className="panel-body">
                            <table id="movies" className="table table-responsive table-striped">
                                <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Code</td>
                                    <td>Name</td>
                                    <td>Population</td>
                                    <td>Surface Area</td>
                                </tr>
                                </thead>
                                <tbody>
                                { this.state.countries.map(
                                    (country,i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{country.code}</td>
                                            <td>{country.name}</td>
                                            <td>{country.population}</td>
                                            <td>{country.surfaceArea}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default WorldApp;
