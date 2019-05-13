import {Song} from "./Song";

export interface MusicSourceAdapter {
    getSong(name: string): Promise<Song | null>
}