const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const express = require('express');
require('dotenv').config();

//? Create nodejs Server
const app = express();
app.get("/", (req,res) => {
    res.send("Hello Bot!");
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server Is Up And Online On Port: ${ port }\nhttp://localhost:${port}`);
});


//? Bot
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(ctx => {
    ctx.reply(`سلام!
    به ربات تولیدکننده لینک دانلود خوش اومدی
    برای دونستن نحوه کار کردن ربات /help رو بزن
    `);
});

bot.help(ctx => {
    ctx.reply(`خب!
    برای اینکه برات لینک یک فایل یا یک عکسو تولید کنم
    فقط کافیه که فایل یا عکس موردنظرتو اینجا برام آپلود کنی :)
    `);
})

//? Generate link for documents
bot.on(message("document"), async(ctx) => {
    try {
        ctx.sendChatAction("upload_document");
        const docID = ctx.message.document.file_id;
        const link = bot.telegram.getFileLink(docID);
        ctx.reply(`Your download link:\n ${link}`, { reply_to_message_id: ctx.message.message_id });
    } catch (error) {
        ctx.reply(error?.message ?? error?.description ?? "some errors");
    }
});


//? Generate link for photos
bot.on(message("photo"), async(ctx) => {
    try {
        const photoID = ctx.message.photo[0].file_id;
        const link = bot.telegram.getFileLink(photoID);
        ctx.reply(`Your download link:\n ${link}`, { reply_to_message_id: ctx.message.message_id });
    } catch (error) {
        ctx.reply(error?.message ?? error?.description ?? "some errors");
    }
})




bot.launch();