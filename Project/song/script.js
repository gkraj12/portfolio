
const songs = [
  {
    title: "Kesariya",
    artist: "Arijit Singh",
    src: "songs/kesariya.mp3"
  },
  {
    title: "Calm Down",
    artist: "Rema",
    src: "songs/calm.mp3"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    src: "songs/blinding.mp3"
  }
];

class MusicPlayer {
  constructor(songs) {
    this.songs = songs;
    this.currentIndex = 0;
    this.isPlaying = false;

    this.audio = document.getElementById("audio");
    this.title = document.getElementById("title");
    this.artist = document.getElementById("artist");
    this.currentEl = document.getElementById("current");
    this.durationEl = document.getElementById("duration");
    this.progress = document.getElementById("progress");

    this.playBtn = document.getElementById("play");
    this.nextBtn = document.getElementById("next");
    this.prevBtn = document.getElementById("prev");

    this.loadSong();
    this.addEvents();
  }

  loadSong() {
    const song = this.songs[this.currentIndex];

    this.title.textContent = song.title;
    this.artist.textContent = song.artist;
    this.audio.src = song.src;
  }

  play() {
    this.isPlaying = true;
    this.playBtn.textContent = "⏸";
    this.audio.play();
  }

  pause() {
    this.isPlaying = false;
    this.playBtn.textContent = "▶";
    this.audio.pause();
  }

  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    this.loadSong();
    this.play();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.loadSong();
    this.play();
  }

  updateUI() {
    this.currentEl.textContent = this.formatTime(this.audio.currentTime);
    this.durationEl.textContent = this.formatTime(this.audio.duration);

    const percent =
      (this.audio.currentTime / this.audio.duration) * 100;
    this.progress.style.width = percent + "%";
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  }

  addEvents() {
    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());

    this.audio.addEventListener("timeupdate", () => this.updateUI());
    this.audio.addEventListener("ended", () => this.next());
  }
}

new MusicPlayer(songs);