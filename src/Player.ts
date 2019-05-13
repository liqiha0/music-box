import {Song} from "./Song";
import child_process, {ChildProcess} from "child_process";
import {MusicSourceAdapter} from "./MusicSourceAdapter";
import {PlayStrategy} from "./playstrategy/PlayStrategy";

export class Player {
    private songQueue: Song[] = [];
    private childProcess?: ChildProcess;

    constructor(public sourceAdapter: MusicSourceAdapter, public playStrategy: PlayStrategy) {
        this.loop();
    }

    async play(songName: string): Promise<void> {
        let song = await this.sourceAdapter.getSong(songName);
        if (song) {
            this.songQueue.push(song);
        }
    }

    skip(): void {
        this.songQueue.shift();
        if (this.childProcess) {
            this.childProcess.kill();
            this.childProcess = undefined;
        }
    }

    private loop(): void {
        setTimeout(() => {
            if (this.songQueue.length) {
                let song = this.playStrategy.select(this.songQueue);
                this.childProcess = child_process.exec(`play ${song.url}`);
                console.log(`正在播放：${song.name}`);

                this.childProcess.addListener("close", ((code, signal) => {
                    this.loop();
                }));
            } else {
                this.loop();
            }
        });
    }
}