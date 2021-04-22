import React, {Component} from 'react';
import './Imdb.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Imdb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genres: [],
            fromYear: 1970,
            toYear: 1979,
            genre: "Drama"
        };
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:7001/imdb/api/genres")
            .then(response=> response.json())
            .then((genres) =>this.setState({genres: genres}));
    }

    componentWillUnmount() {
    }

    search(e) {
        e.preventDefault();
        const { fromYear, toYear, genre } = this.refs ;
        this.setState({
            fromYear: Number(this.refs.fromYear.value),
            toYear: Number(this.refs.toYear.value),
            genre: this.refs.genre.value
        });
        fetch("http://localhost:7001/imdb/api/movies?from="+Number(fromYear.value)+"&to="+Number(toYear.value)+"&genre="+genre.value)
            .then( response => response.json() )
            .then( movies => this.setState({movies: movies}) );
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h2 className="panel-title">Search Panel</h2>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.search}>
                            <div className="form-group">
                                <label htmlFor="from">From</label>
                                <input type="text" ref="fromYear" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="to">To</label>
                                <input type="text" ref="toYear" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="genre">Genre</label>
                                <select ref="genre" className="form-control">
                                    { this.state.genres.map( (genre,i) =>
                                        <option key={i} label={genre.name} value={genre.name}>{genre.name}</option>
                                      )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h2 className="panel-title">Search Result</h2>
                    </div>
                    <div className="panel-body">
                        <table id="movies" className="table table-responsive table-striped">
                            <thead>
                            <tr>
                                <td>No</td>
                                <td>Title</td>
                                <td>Year</td>
                                <td>Directors</td>
                                <td>Genres</td>
                            </tr>
                            </thead>
                            <tbody>
                                { this.state.movies.map(
                                    (movie,i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><a href={`http://www.imdb.com/title/${movie.imdb}`} target="_blank">{movie.title}</a></td>
                                            <td>{movie.year}</td>
                                            <td>
                                                {movie.directors.map( (director,j) =>
                                                    <div key={j}><a href={`http://www.imdb.com/name/${director.imdb}`} target="_blank">{director.name}</a>
                                                    </div>
                                                 )
                                                }
                                            </td>
                                            <td>
                                                {movie.genres.map( (genre,k) =>
                                                    <span key={k} className="label label-success">{genre.name}</span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        );
    }
}

export default Imdb;
