const express = require("express");
const mongoose = require("mongoose");
const app = express();
const fetch = require("node-fetch");

const Uptime = require("./schemas/Uptime")

mongoose.connect("mongodb+srv://Joker6:FAres0159357@cluster0.5kcgfbc.mongodb.net/BotMaker").then(() => console.log('Connected to mongodb'));

async function uptimer() {
  const uptime = await Uptime.find({})
  uptime.forEach(async url => {
    try {
      await fetch(url.url).then(async () => {
        await url.updateOne({ status: "Uptimed" })
        console.log(`${url.url} - Uptimed`)
      }).catch(async () => {
        await url.updateOne({ status: "Down" })
        console.log(`${url.url} - Down`)
      })
    } catch (error) {
      console.log(error)
    }
  })
}

setInterval(() => {
  uptimer();
}, 10000);

const http = require("http").createServer(app);
http.listen(3000, () => {
  console.log(`Website is online on the Port: ${3000} ..`);
});