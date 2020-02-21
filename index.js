require("dotenv").config();
const express = require("express");
const app = express();
const formidableMiddleware = require("express-formidable");
app.use(formidableMiddleware());
const axios = require("axios");
const cors = require("cors");
app.use(cors());

// récuperer l'api marvel
const md5 = require("md5");
const marvelBaseEndpoint = "https://gateway.marvel.com/";
const timestamp = 1;
const hash = md5(
  `${timestamp}${process.env.MARVEL_KEY_PRIVATE}${process.env.MARVEL_KEY_PUBLIC}`
);

// characters

app.get("/characters/:id", async (req, res) => {
  const id = req.params.id;
  const path = `/v1/public/characters/${id}/comics`;
  const orderBy = "title";
  const limit = "100";

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&orderBy=${orderBy}&limit=${limit}`
  );
  //   console.log("toto");
  console.log(response.data.data.results);
  //   console.log("toto");
  res.status(200).json(response.data.data.results);
  //   console.log("toto");
});

// name
app.get("/characters", async (req, res) => {
  const path = "/v1/public/characters";
  const orderBy = "name";
  const limit = "100";
  const name = req.query.name;

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&nameStartsWith=${name}&orderBy=${orderBy}&limit=${limit}`
  );
  console.log(response.data.data.results);
  //   console.log("toto");
  res.status(200).json(response.data.data.results);
});

// comics - name

app.get("/comics", async (req, res) => {
  const path = "/v1/public/comics";
  const orderBy = "title";
  const limit = "100";
  const title = req.query.title;

  const response = await axios.get(
    `${marvelBaseEndpoint}${path}?ts=${timestamp}&apikey=${process.env.MARVEL_KEY_PUBLIC}&hash=${hash}&titleStartsWith=${title}&orderBy=${orderBy}&limit=${limit}`
  );
  //   console.log("toto");
  console.log(response.data.data.results);
  //   console.log("toto");
  res.status(200).json(response.data.data.results);
  //   console.log("toto");
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({
      message:
        "Le back de l'API Marvel du Reacteur :) Pour le Front, rendez-vous sur greatmarvel.netlify.com"
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server OK");
});
