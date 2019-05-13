import express from "express";
import path from "path";
import {Player} from "./Player";
import {NeteaseAPI} from "./NeteaseAPI";
import {PlayInOrder} from "./playstrategy/PlayInOrder";

let player = new Player(new NeteaseAPI("localhost", "3000"), new PlayInOrder());
const app = express();
app.use(express.static(path.resolve(__dirname, "static")));

app.get("/", (req, res) => {
    res.redirect("/view/index.html")
});

app.get("/song", ((req, res) => {
    player.play(req.query.name);
}));

app.listen(51035);
