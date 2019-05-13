import {PlayStrategy} from "./PlayStrategy";
import {Song} from "../Song";

export class PlayInOrder implements PlayStrategy {
    select(song: Song[]): Song {
        return song.shift() as Song;
    }
}