import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieList = () => {
    const [refreshData, setRefreshData] = useState(false);
    const [movie, setMovie] = useState(null);
    const [movieId, setMovieId] = useState("");
    const [input, setInput] = useState({
    title: "",
    description: "",
    year: "",
    duration: "",
    genre: "",
    rating: "",
    
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
      if (!refreshData){
          const url = "http://backendexample.sanbercloud.com/api/movies";
          axios
          .get(url)
          .then((res) => {
            setMovie(res.data);
            setRefreshData(true);
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }, [refreshData]);
  const handleChange = (event) => {
      let newInput = {...input};
      let name = event.target.value;
      let value = event.target.value;
      switch (name) {
        case "year":
          value = parseInt(value);
          if (isNaN(value)) {
            value = "";
          }
          break;
  
        case "duration":
          value = parseInt(value);
          if (isNaN(value)) {
            value = "";
          }
          break;
  
        case "rating":
          value = parseInt(value);
          if (isNaN(value)) {
            value = "";
          }
  
          if (value < 1 || value > 10) {
            value = "";
          }
          break;
        default:
          break;
      }
  
      newInput[name] = value;
      setInput(newInput);
    };
  
 

  const handleSubmit = (event) =>{
      event.preventDefault();
      const url = "http://backendexample.sanbercloud.com/api/movies"
      const { title, description, year, duration, genre, rating } = input;

      if(title && description && year && duration && genre && rating){
        axios
        .post(url, input)
        .then((res) => {
          setRefreshData(false);
          setInput({
            title: "",
            description: "",
            year: "",
            duration: "",
            genre: "",
            rating: "",
            image_url:""
          });
          setError(false);
        })
        .catch((err) => {
          console.log(err.response);
        });
      }else{
          setError(true);
      }
  };

  const handleEditData = (id) => {
    const data = movie.filter((movie) => {
        return movie.id === id;
      });
      
      setInput({
          title: data[0].title,
          description: data[0].description,
          year: data[0].year,
          duration: data[0].duration,
          genre: data[0].genre,
          rating: data[0].rating,
          image_url:data[0].image_url   
      })
      setMovieId(data[0].id);
      setMovieId(data[0].id);
      setEditMode(true);
      setError(false);  
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const url = `http://backendexample.sanbercloud.com/api/movies/${movieId}`
    const { title, description, year, duration, genre, rating } = input;

    if (title && description && year && duration && genre && rating){
        axios.put(url, input)
        .then((res) => {
            setRefreshData(false);
            setInput({
                title: "",
                description: "",
                year: "",
                duration: "",
                genre: "",
                rating: "",
                
            })
            setMovieId("");
            setEditMode(false);
            setError(false);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }else{
        setError(true);
    }
  };
  const handleDelete = (id) => {
      const url = `http://backendexample.sanbercloud.com/api/movies/${id}`
      axios
      .delete(url)
      .then((res) => {
        setRefreshData(false);
        setInput({
          title: "",
          description: "",
          year: "",
          duration: "",
          genre: "",
          rating: "",
          
        });
        setMovieId("");
        setEditMode(false);
        setError(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  const handleCancel = () => {
    setInput({
      title: "",
      description: "",
      year: "",
      duration: "",
      genre: "",
      rating: "",
      image_url:""
    });
    setMovieId("");
    setEditMode(false);
    setError(false);
  };
  let no = 1;

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div className="form-movie">
        <h1>Form Movie</h1>
        <form onSubmit={editMode ? handleEdit : handleSubmit}>
          <div
            style={{
              width: "60%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Title
                </div>
                :{" "}
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </div>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Description
                </div>
                :{" "}
                <textarea
                  style={{
                    display: "inline-block",
                    padding: "5px",
                    fontSize: "14px",
                  }}
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
              </div>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Year
                </div>
                :{" "}
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  name="year"
                  value={input.year}
                  onChange={handleChange}
                  placeholder="Year"
                />
              </div>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Duration (minutes)
                </div>
                :{" "}
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  name="duration"
                  value={input.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                />
              </div>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Genre
                </div>
                :{" "}
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  name="genre"
                  value={input.genre}
                  onChange={handleChange}
                  placeholder="Genre"
                />
              </div>
              <div style={{ display: "block", marginBottom: "1em" }}>
                <div
                  style={{
                    display: "inline-block",
                    width: 180,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Rating (1-10)
                </div>
                :{" "}
                <input
                  style={{ display: "inline-block" }}
                  type="text"
                  name="rating"
                  value={input.rating}
                  onChange={handleChange}
                  placeholder="Rating"
                />
              </div>
            </div>
            {error && (
              <div
                style={{
                  margin: "0 0 15px 0",
                  display: "inline-block",
                  width: 200,
                  color: "red",
                  fontSize: 16,
                }}
              >
                Field tidak boleh kosong!
              </div>
            )}
            {editMode ? (
              <div style={{ display: "inline-block" }}>
                <button
                  className="btn-cancel"
                  style={{ margin: "0 5px" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn-edit"
                  style={{ margin: "0 5px" }}
                  type="submit"
                >
                  Edit
                </button>
              </div>
            ) : (
              <button className="btn-add" type="submit">
                Add
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="list-movie">
        <h1>Tabel Movie</h1>
        <table className="movie-list-editor">
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Description</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Genre</th>
              <th>Rating</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movie &&
              movie.map((data) => (
                <tr style={{ textAlign: "left" }} key={data.id}>
                  <td>{no++}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.year}</td>
                  <td>{parseFloat(data.duration / 60).toFixed(2)} jam</td>
                  <td>{data.genre}</td>
                  <td>{data.rating}</td>
                  <td style={{ textAlign: "center", width: "100px" }}>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditData(data.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td style={{ textAlign: "center", width: "100px" }}>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
 }


export default MovieList;
