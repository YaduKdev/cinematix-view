import React, { useState } from "react";

import "./AddMovie.css";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Avatar,
  Card,
  CardMedia,
} from "@mui/material";
import { addMovie } from "../../api-calls/api-calls";

// const movieSchema = new Schema({
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     rating: { type: String, required: true },
//     bookingsOpen: { type: Boolean },
//     language: {
//       type: String,
//       required: true,
//     },
//     trailerLink: { type: String },
//     genre: {
//       type: String,
//       required: true,
//     },
//     nowPlaying: [
//       {
//         type: {
//           name: [{ type: String }],
//           location: { type: String },
//         },
//       },
//     ],
//     actors: [
//       {
//         type: {
//           name: { type: String },
//           imageUrl: { type: String },
//         },
//         required: true,
//       },
//     ],
//     releaseDate: {
//       type: Date,
//       required: true,
//     },
//     posterUrl: {
//       type: String,
//       required: true,
//     },
//     featured: {
//       type: Boolean,
//     },
//     bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
//     admin: {
//       type: mongoose.Types.ObjectId,
//       ref: "Admin",
//       required: true,
//     },
//     cities: [{ type: String, required: true }],
//   });

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    rating: "",
    language: "",
    genre: "",
    releaseDate: "",
    posterUrl: "",
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState({
    name: "",
    imageUrl: "",
  });
  const [cinemas, setCinemas] = useState([]);
  const [cinema, setCinema] = useState({
    name: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    rating: false,
    language: false,
    genre: false,
    releaseDate: false,
    posterUrl: false,
    actors: false,
    actorName: false,
    actorImg: false,
    cinema: false,
    cinemaName: false,
    cinemaLocation: false,
  });
  const [errorTexts, setErrorTexts] = useState({
    title: "Add a title for the movie.",
    description: "Add a description for the movie.",
    rating: "Select a rating for the movie.",
    language: "Select a language for the movie.",
    genre: "Select a genre for the movie.",
    releaseDate: "Add a release date for the movie.",
    posterUrl: "Add a poster URL for the movie.",
    actors: "Add at least one actor for the movie.",
    actorName: "Add a name for actor.",
    actorImg: "Add an image URL for actor.",
    cinema: "Add at least one cinema for the movie",
    cinemaName: "Add a name for cinema.",
    cinemaLocation: "Add a location for cinema.",
  });
  const [actorInputs, setActorInputs] = useState(false);
  const [cinemaInputs, setCinemaInputs] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addCinema = () => {
    if (
      (cinema.name !== "" || cinema.name.length) &&
      (cinema.location !== "" || cinema.location.length)
    ) {
      setCinemas([...cinemas, cinema]);
      setCinema({ name: "", location: "" });
      setCinemaInputs(false);
      setErrors((prevState) => ({
        ...prevState,
        cinemaName: false,
        cinemaLocation: false,
      }));
    }

    if (cinema.name === "" || !cinema.name.length) {
      setErrors((prevState) => ({ ...prevState, cinemaName: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, cinemaName: false }));
    }

    if (cinema.location === "" || !cinema.location.length) {
      setErrors((prevState) => ({ ...prevState, cinemaLocation: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, cinemaLocation: false }));
    }
  };

  const addActor = () => {
    if (
      (actor.name !== "" || actor.name.length) &&
      (actor.imageUrl !== "" || actor.imageUrl.length)
    ) {
      setActors([...actors, actor]);
      setActor({ name: "", imageUrl: "" });
      setActorInputs(false);
      setErrors((prevState) => ({
        ...prevState,
        actorName: false,
        actorImg: false,
      }));
    }

    if (actor.name === "" || !actor.name.length) {
      setErrors((prevState) => ({ ...prevState, actorName: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, actorName: false }));
    }

    if (actor.imageUrl === "" || !actor.imageUrl.length) {
      setErrors((prevState) => ({ ...prevState, actorImg: true }));
    } else {
      setErrors((prevState) => ({ ...prevState, actorImg: false }));
    }
  };

  const handleActorChip = (actor) => {
    let tempActorArray = actors;
    const index = tempActorArray.indexOf(actor);

    if (index > -1) tempActorArray.splice(index, 1);

    setActors(() => [...tempActorArray]);

    console.log("EVENT", actors, "TEMP++++", tempActorArray);
  };

  const handleCinemaChip = (cinema) => {
    let tempCinemaArray = cinemas;
    const index = tempCinemaArray.indexOf(cinema);

    if (index > -1) tempCinemaArray.splice(index, 1);

    setCinemas(() => [...tempCinemaArray]);

    console.log("EVENT", cinemas, "TEMP++++", tempCinemaArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formDirty = false;

    if (!inputs.title.length || inputs.title === "") {
      setErrors((prevState) => ({ ...prevState, title: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, title: false }));
    }

    if (!inputs.description.length || inputs.description === "") {
      setErrors((prevState) => ({ ...prevState, description: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, description: false }));
    }

    if (!inputs.rating.length || inputs.rating === "") {
      setErrors((prevState) => ({ ...prevState, rating: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, rating: false }));
    }

    if (!inputs.language.length || inputs.language === "") {
      setErrors((prevState) => ({ ...prevState, language: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, language: false }));
    }

    if (!inputs.genre.length || inputs.genre === "") {
      setErrors((prevState) => ({ ...prevState, genre: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, genre: false }));
    }

    if (!inputs.releaseDate.length || inputs.releaseDate === "") {
      setErrors((prevState) => ({ ...prevState, releaseDate: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, releaseDate: false }));
    }

    if (!inputs.posterUrl.length || inputs.posterUrl === "") {
      setErrors((prevState) => ({ ...prevState, posterUrl: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, posterUrl: false }));
    }

    if (actors.length === 0) {
      setErrors((prevState) => ({ ...prevState, actors: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, actors: false }));
    }

    if (cinemas.length === 0) {
      setErrors((prevState) => ({ ...prevState, cinema: true }));

      formDirty = true;
    } else {
      setErrors((prevState) => ({ ...prevState, cinema: false }));
    }

    if (!formDirty) {
      let cities = [];

      cinemas.map((cinema) => {
        if (
          cities.indexOf(
            cinema.location[0].toUpperCase() + cinema.location.slice(1)
          ) === -1
        )
          cities.push(
            cinema.location[0].toUpperCase() + cinema.location.slice(1)
          );
      });

      let movieData = { ...inputs, actors, nowPlaying: cinemas, cities };

      addMovie(movieData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box
      sx={{ bgcolor: "secondary.main" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={5}
      width={"100%"}
    >
      <Typography
        fontWeight="bold"
        variant="h4"
        color="primary"
        marginBottom={4}
      >
        ADD MOVIE
      </Typography>
      <form style={{ width: "60%" }} onSubmit={handleSubmit}>
        <Box
          sx={{ bgcolor: "background.paper" }}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          padding={"80px"}
        >
          <FormLabel sx={{ fontWeight: "bold" }} required error={errors.title}>
            Title
          </FormLabel>
          <TextField
            error={errors.title}
            helperText={errors.title ? errorTexts.title : null}
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="outlined"
            margin="normal"
            sx={{ mb: "40px" }}
          />
          <FormLabel
            sx={{ fontWeight: "bold" }}
            required
            error={errors.description}
          >
            Description
          </FormLabel>
          <TextField
            multiline
            rows={4}
            error={errors.description}
            helperText={errors.description ? errorTexts.description : null}
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="outlined"
            margin="normal"
            sx={{ mb: "40px" }}
          />
          <FormControl
            sx={{ color: errors.rating ? "error.main" : "primary.main" }}
            value={inputs.rating}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
              required
              error={errors.rating}
              helperText={errors.rating ? errorTexts.rating : null}
            >
              Rating
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="rating"
              sx={{ mb: "40px", mt: "20px" }}
              error={errors.rating}
            >
              <FormControlLabel value="U" control={<Radio />} label="U" />
              <FormControlLabel value="UA" control={<Radio />} label="UA" />
              <FormControlLabel value="A" control={<Radio />} label="A" />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ color: errors.language ? "error.main" : "primary.main" }}
            value={inputs.language}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
              required
              error={errors.language}
              helperText={errors.language ? errorTexts.language : null}
            >
              Language
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="language"
              sx={{ mb: "40px", mt: "20px" }}
            >
              <FormControlLabel
                value="English"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel
                value="Hindi"
                control={<Radio />}
                label="Hindi"
              />
              <FormControlLabel
                value="Marathi"
                control={<Radio />}
                label="Marathi"
              />
              <FormControlLabel
                value="Gujarati"
                control={<Radio />}
                label="Gujarati"
              />
              <FormControlLabel
                value="Punjabi"
                control={<Radio />}
                label="Punjabi"
              />
              <FormControlLabel
                value="Bengali"
                control={<Radio />}
                label="Bengali"
              />
              <FormControlLabel
                value="Tamil"
                control={<Radio />}
                label="Tamil"
              />
              <FormControlLabel
                value="Telugu"
                control={<Radio />}
                label="Telugu"
              />
              <FormControlLabel
                value="Malayalam"
                control={<Radio />}
                label="Malayalam"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ color: errors.genre ? "error.main" : "primary.main" }}
            value={inputs.genre}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
              required
              error={errors.genre}
              helperText={errors.genre ? errorTexts.genre : null}
            >
              Genre
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="genre"
              sx={{ mb: "40px", mt: "20px" }}
            >
              <FormControlLabel
                value="Drama"
                control={<Radio />}
                label="Drama"
              />
              <FormControlLabel
                value="Comedy"
                control={<Radio />}
                label="Comedy"
              />
              <FormControlLabel
                value="Thriller"
                control={<Radio />}
                label="Thriller"
              />
              <FormControlLabel
                value="Action"
                control={<Radio />}
                label="Action"
              />
              <FormControlLabel
                value="Horror"
                control={<Radio />}
                label="Horror"
              />
            </RadioGroup>
          </FormControl>
          <FormLabel
            sx={{ mb: "20px", fontWeight: "bold" }}
            required
            error={errors.cinema}
          >
            Cinema Theatres
          </FormLabel>
          {errors.cinema ? (
            <FormHelperText sx={{ color: "error.main" }}>
              {errorTexts.cinema}
            </FormHelperText>
          ) : null}
          {cinemas.length !== 0 ? (
            <Box display={"flex"} gap={1}>
              {cinemas.map((cinema, idx) => {
                return (
                  <Chip
                    label={cinema.name}
                    key={idx}
                    variant="outlined"
                    onDelete={() => handleCinemaChip(cinema)}
                  />
                );
              })}
            </Box>
          ) : null}
          {cinemaInputs ? (
            <>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <FormLabel error={errors.cinema || errors.cinemaName}>
                  Name
                </FormLabel>
                <TextField
                  error={errors.cinema || errors.cinemaName}
                  helperText={errors.cinemaName ? errorTexts.cinemaName : null}
                  name="cinemaName"
                  value={cinema.name}
                  variant="outlined"
                  margin="normal"
                  sx={{ width: "40%" }}
                  onChange={(e) =>
                    setCinema({ ...cinema, name: e.target.value })
                  }
                />
                <FormLabel error={errors.cinema || errors.cinemaLocation}>
                  Location
                </FormLabel>
                <TextField
                  error={errors.cinema || errors.cinemaLocation}
                  helperText={
                    errors.cinemaLocation ? errorTexts.cinemaLocation : null
                  }
                  value={cinema.location}
                  name="location"
                  variant="outlined"
                  margin="normal"
                  sx={{ width: "40%" }}
                  onChange={(e) =>
                    setCinema({ ...cinema, location: e.target.value })
                  }
                />
              </Box>
              <Button
                color="primary"
                variant="outlined"
                sx={{ mt: "20px", mb: "40px", width: "15%" }}
                onClick={addCinema}
              >
                Add
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              sx={{ mt: "20px", mb: "40px", width: "15%" }}
              onClick={() => setCinemaInputs(true)}
            >
              Add
            </Button>
          )}
          <FormLabel
            sx={{ mb: "20px", fontWeight: "bold" }}
            required
            error={errors.actors}
          >
            Actors
          </FormLabel>
          {errors.actors ? (
            <FormHelperText sx={{ color: "error.main" }}>
              {errorTexts.actors}
            </FormHelperText>
          ) : null}
          {actors.length !== 0 ? (
            <Box display={"flex"} gap={1}>
              {actors.map((actor, idx) => {
                return (
                  <Chip
                    label={actor.name}
                    avatar={<Avatar alt={actor.name} src={actor.imageUrl} />}
                    key={idx}
                    variant="outlined"
                    onDelete={() => handleActorChip(actor)}
                  />
                );
              })}
            </Box>
          ) : null}
          {actorInputs ? (
            <>
              <Box display={"flex"} alignItems={"center"} gap={2}>
                <FormLabel error={errors.actors || errors.actorName}>
                  Name
                </FormLabel>
                <TextField
                  error={errors.actors || errors.actorName}
                  helperText={errors.actorName ? errorTexts.actorName : null}
                  name="actorName"
                  value={actor.name}
                  variant="outlined"
                  margin="normal"
                  sx={{ width: "40%" }}
                  onChange={(e) => setActor({ ...actor, name: e.target.value })}
                />
                <FormLabel error={errors.actors || errors.actorImg}>
                  Picture URL
                </FormLabel>
                <TextField
                  error={errors.actors || errors.actorImg}
                  helperText={errors.actorImg ? errorTexts.actorImg : null}
                  name="imageUrl"
                  value={actor.imageUrl}
                  variant="outlined"
                  margin="normal"
                  sx={{ width: "40%" }}
                  onChange={(e) =>
                    setActor({ ...actor, imageUrl: e.target.value })
                  }
                />
              </Box>
              <Button
                color="primary"
                variant="outlined"
                sx={{ mt: "20px", mb: "40px", width: "15%" }}
                onClick={addActor}
              >
                Add
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              sx={{ mt: "20px", mb: "40px", width: "15%" }}
              onClick={() => setActorInputs(true)}
            >
              Add
            </Button>
          )}
          <FormLabel
            sx={{ fontWeight: "bold" }}
            required
            error={errors.releaseDate}
          >
            Release Date
          </FormLabel>
          <TextField
            error={errors.releaseDate}
            helperText={errors.releaseDate ? errorTexts.releaseDate : null}
            type={"date"}
            name="releaseDate"
            variant="outlined"
            margin="normal"
            sx={{ mb: "40px" }}
            value={inputs.releaseDate}
            onChange={handleChange}
          />
          <FormLabel
            sx={{ fontWeight: "bold" }}
            required
            error={errors.posterUrl}
          >
            Poster URL
          </FormLabel>
          {inputs.posterUrl &&
          (inputs.posterUrl.length || inputs.posterUrl !== "") ? (
            <Card sx={{ maxWidth: 345, mt: "20px", mb: "20px" }}>
              <CardMedia
                component="img"
                height="400"
                image={inputs.posterUrl}
              />
            </Card>
          ) : null}
          <TextField
            error={errors.posterUrl}
            helperText={errors.posterUrl ? errorTexts.posterUrl : null}
            name="posterUrl"
            variant="outlined"
            margin="normal"
            sx={{ mb: "40px" }}
            value={inputs.posterUrl}
            onChange={handleChange}
          />
          <Button
            color="error"
            variant="contained"
            sx={{ width: "40%", margin: "40px auto" }}
            size="large"
            type="submit"
          >
            Add Movie
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddMovie;
