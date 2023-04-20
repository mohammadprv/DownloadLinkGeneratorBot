const { Telegraf } = require('telegraf');
const express = require('express');
require('dotenv').config();


const app = express();
app.get("/", (req,res) => {
    res.send("Hello Bot!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server Is Up And Online On Port: ${ port }\nhttp://localhost:${port}`);
});




const bot = new Telegraf(process.env.BOT_TOKEN);






bot.launch();