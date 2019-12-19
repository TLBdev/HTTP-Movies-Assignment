import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }


  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails {...this.props} key={movie.id} movie={movie} updateStuffs={this.updateStuffs} />
        ))}
      </div>
    );
  }
}

function MovieDetails(props) {
  console.log('in moviedetails', props)
  return (
    <Link to={`/movies/${props.movie.id}`}>
      <MovieCard {...props} />
    </Link>
  );
}
