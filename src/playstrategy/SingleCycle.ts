import {PlayStrategy} from "./PlayStrategy";
import {Song} from "../Song";

export class SingleCycle implements PlayStrategy {
    select(song: Song[]): Song {
        return song[song.length - 1];
    }
}