import React, { useState } from "react";

import "./AddMovie.css";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

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

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT=====", inputs);
    console.log("ACTORS====", actors);
    console.log("CINEMAS====", cinemas);
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
          <FormLabel sx={{ fontWeight: "bold" }}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
            sx={{ mb: "40px" }}
          />
          <FormLabel sx={{ fontWeight: "bold" }}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
            sx={{ mb: "40px" }}
          />
          <FormControl
            sx={{ color: "primary.main" }}
            value={inputs.rating}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
            >
              Rating
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="rating"
              sx={{ mb: "40px", mt: "20px" }}
            >
              <FormControlLabel value="U" control={<Radio />} label="U" />
              <FormControlLabel value="U/A" control={<Radio />} label="U/A" />
              <FormControlLabel value="A" control={<Radio />} label="A" />
            </RadioGroup>
          </FormControl>
          <FormControl
            sx={{ color: "primary.main" }}
            value={inputs.language}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
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
            sx={{ color: "primary.main" }}
            value={inputs.genre}
            onChange={handleChange}
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontWeight: "bold" }}
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
          <FormLabel sx={{ mb: "20px", fontWeight: "bold" }}>
            Now Playing
          </FormLabel>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <FormLabel>Name</FormLabel>
            <TextField
              name="cinemaName"
              variant="standard"
              margin="normal"
              sx={{ width: "40%" }}
              onChange={(e) => setCinema({ ...cinema, name: e.target.value })}
            />
            <FormLabel>Location</FormLabel>
            <TextField
              name="location"
              variant="standard"
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
            onClick={() => setCinemas([...cinemas, cinema])}
          >
            Add
          </Button>
          <FormLabel sx={{ mb: "20px", fontWeight: "bold" }}>Actors</FormLabel>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <FormLabel>Name</FormLabel>
            <TextField
              name="actorName"
              variant="standard"
              margin="normal"
              sx={{ width: "40%" }}
              onChange={(e) => setActor({ ...actor, name: e.target.value })}
            />
            <FormLabel>Picture URL</FormLabel>
            <TextField
              name="imageUrl"
              variant="standard"
              margin="normal"
              sx={{ width: "40%" }}
              onChange={(e) => setActor({ ...actor, imageUrl: e.target.value })}
            />
          </Box>
          <Button
            color="primary"
            variant="outlined"
            sx={{ mt: "20px", mb: "40px", width: "15%" }}
            onClick={() => setActors([...actors, actor])}
          >
            Add
          </Button>
          <FormLabel sx={{ fontWeight: "bold" }}>Release Date</FormLabel>
          <TextField
            type={"date"}
            name="releaseDate"
            variant="standard"
            margin="normal"
            sx={{ mb: "40px" }}
            value={inputs.releaseDate}
            onChange={handleChange}
          />
          <FormLabel sx={{ fontWeight: "bold" }}>Poster URL</FormLabel>
          <TextField
            name="posterUrl"
            variant="standard"
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
