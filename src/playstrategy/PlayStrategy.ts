import {Song} from "../Song";

export interface PlayStrategy {
    select(song: Song[]): Song;
}