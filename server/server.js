require("dotenv").config(); //we use to make sure our sensitive information is not part of the codebase but stored in .env file
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors()); //This allows our frontend to communicate with backend which might be running on different domain
app.use(express.urlencoded({ extended: true })); //This line tells Express to parse incoming requests with URL-encoded payloads (form data, for example).

const API_KEY = process.env.API_KEY; //To authenticate our request to the News API

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "Successfully fetched the data",
          data: response.data,
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "No more results to show",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500, //server encountered a situation it doesn't know how to handle
        success: false,
        message: "Falied to fetch data",
        error: error.message,
      });
    });
}

// all news

app.get("/all-news", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

//Top Headline

app.options("/top-headlines", cors());
app.get("/top-headline", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "business";

  let url = `https://newsapi.org/v2/top-headlines?${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

//PORT

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
