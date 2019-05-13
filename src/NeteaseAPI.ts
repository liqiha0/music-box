import request from "request-promise-native";
import {Song} from "./Song";
import {MusicSourceAdapter} from "./MusicSourceAdapter";

export class NeteaseAPI implements MusicSourceAdapter {
    constructor(private host: string, private port: string) {
    }

    async getSong(name: string): Promise<Song|null> {
        let data = await request.get(this.getUrl("/search"), {qs: {keywords: name}, json: true});
        let song = data.result.songs[0];
        if (song) {
            let url = (await request.get(this.getUrl("/song/url"), {qs: {id: song.id}, json: true})).data[0].url;
            return new Song(song.name, url);
        } else {
            return null;
        }

    }

    private getUrl(path: string): string {
        return `http://${this.host}:${this.port}${path}`
    }
}