import express from "express";
import path from "path";
import {Player} from "./Player";
import {NeteaseAPI} from "./NeteaseAPI";
import {PlayInOrder} from "./playstrategy/PlayInOrder";

let player = new Player(new NeteaseAPI("192.168.3.251", "3000"), new PlayInOrder());
const app = express();
app.use(express.static(path.resolve(__dirname, "static")));

app.get("/", (req, res) => {
    res.redirect("/view/index.html")
});

app.get("/song", ((req, res) => {
    player.play(req.query.name as string);
    res.redirect("/view/index.html")
}));

app.get("/skip", (req, res) => {
    player.skip()
    res.redirect("/view/index.html")
})

app.listen(51035);
