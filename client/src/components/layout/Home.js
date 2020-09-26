import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateMovieReview, deleteMovie } from "../../actions/movies";
import uuid from "uuid";

const handleMovieUpdates = (e, updateMovieReview) => {
  e.preventDefault();
  const movieID = e.target.dataset.key;
  const updates = {
    title: document.querySelector(`[data-title="${movieID}"]`).innerHTML.trim(),
    year: document.querySelector(`[data-year="${movieID}"]`).innerHTML,
    score: document.querySelector(`[data-score="${movieID}"]`).value,
    review: document.querySelector(`[data-review="${movieID}"]`).value,
  };
  updateMovieReview(updates);
};

const handleMovieDelete = (e, deleteMovie) => {
    e.preventDefault();
    const movieID = e.target.dataset.key;
    const movie = { 
      title: document.querySelector(`[data-title="${movieID}"]`).innerHTML.trim(),
      year: document.querySelector(`[data-year="${movieID}"]`).innerHTML.trim(),
    };

    deleteMovie(movie);
  };

const Home = ({ movies: { movies }, updateMovieReview, deleteMovie }) => {
  console.log(movies);
  return (
    <div>
      <div className="container-fluid p-3 mt-2">
        <h1 className="display-5 text-center">Movie Collection</h1>
      </div>

      <div className="container">
        <div className="row">
          {movies && movies.length === 0 ? (
            <h1>Add some movies!</h1>
          ) : (
            movies.movies.map((movie) => {
              const id = uuid.v4();
              return (
                <div className="col-md-6 p-3" key={`${id}`}>
                  <div className="card">
                    <div
                      className="card-header"
                      style={{ background: "#F56600" }}
                    >
                      <div>
                        <h5 className="d-inline text-white font-weight-bold" data-title={`${id}`}>{movie.title} </h5>
                      </div>
                    </div>
                    <div
                      className="card-body"
                      style={{ backgroundImage: `${movie.poster}` }}
                    >
                      <div className="row justify-content-around">
                        <div className="p-2 col-xs-5">
                          <img src={movie.poster} width="125rem" alt="" />
                        </div>
                        <div className="col-xs-7 rating text-center">
                          <form>
                            <div className="form-group">
                              <label>
                                <h6>My Review:</h6>
                              </label>
                              <select
                                className="form-control"
                                data-score={`${id}`}
                                defaultValue={`${movie.score}`}
                              >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                              <br />
                              <textarea
                                className="form-control"
                                rows="3"
                                data-review={`${id}`}
                                defaultValue={`${movie.review || ""}`}
                              ></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-footer"
                      style={{ background: "#F56600" }}
                    >
                      <h5 className="d-inline">
                        <span className="badge badge-success" data-year={`${id}`}>
                          {movie.year}
                        </span>
                      </h5>
                      <h5 className="d-inline">
                        <span className="badge badge-primary">Watched</span>
                      </h5>
                      <h4 className="d-inline">
                        <button
                          className="btn btn-primary btn-sm font-weight-bold float-right"
                          onClick={(e) =>
                            handleMovieUpdates(e, updateMovieReview)
                          }
                          data-key={`${id}`}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-warning btn-sm font-weight-bold float-right"
                          onClick={(e) => handleMovieDelete(e, deleteMovie)}
                          data-key={`${id}`}
                        >
                          Delete
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  movies: PropTypes.object.isRequired,
  updateMovieReview: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

export default connect(mapStateToProps, { updateMovieReview, deleteMovie })(
  Home
);
