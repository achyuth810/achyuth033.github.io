/* ===== DOM ELEMENTS ===== */
const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("nowPlaying");
const randomBtn = document.getElementById("randomBtn");
const moodButtons = document.querySelectorAll(".mood-buttons button");
const songQuote = document.getElementById("songQuote");

/* 💖 143 HEARTS GENERATOR */
function initValentineHearts() {
  const container = document.getElementById('heart-container');
  const heartCount = 143; 
  const hearts = ['❤️', '💖', '💝', '💕', '💗'];

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * (20 - 10) + 12 + 'px';
    const duration = Math.random() * 7 + 5;
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = Math.random() * 10 + 's';
    container.appendChild(heart);
  }
}

/* 🔗 SONGS DATABASE */
const ALL_SONGS = [
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Chikiri.mp3", mood: "love", quote: "Can I Call You ..Chikiri Chikiri ?" },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/love1.mp3", mood: "love", quote: " Beautiful Moon ." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Nuvvena+.mp3", mood: "love", quote: "Coffee...tagutara." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Chilipiga+-+Karthik.mp3", mood: "love", quote: "Infinite Love." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Padithinammo+-+Vishwa.mp3", mood: "love", quote: "Padithinammo ..." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Chulbuli+Chulbuli+-+Karthik.mp3", mood: "love", quote: "Pilla Puli, Kopam Lo kuda cuteness haa." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Neeli+Meghamula+lo+.mp3", mood: "love", quote: "Bangaru kalla bujjammo." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Kilimanjaro.mp3", mood: "love", quote: "Em pettalo idea ledu (AI) ." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/Neetho.mp3", mood: "love", quote: "fav Song.. ." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/sad.mp3", mood: "sad", quote: "Koncham Motivate cheddam ani." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/sad2.mp3", mood: "sad", quote: "Wonderful Universe...." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/sad3.mp3", mood: "sad", quote: "Let Your soul Dance.." },
    { url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/youreyes.mp3", mood: "love", quote: "abbo.. kallu untai chudu...." }
];

/* STATE */
let currentMode = "random"; 
let activeMood = null;
let playlist = [];
let index = 0;

/* 🔀 SHUFFLE */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* 🎶 BUILD PLAYLIST */
function buildPlaylist() {
  if (currentMode === "random") {
    return shuffle([...ALL_SONGS]);
  }
  const filtered = ALL_SONGS.filter(song => song.mood === activeMood);
  return shuffle(filtered);
}

/* ▶️ PLAY CURRENT SONG */
function playCurrent() {
    if (index >= playlist.length) {
      if (currentMode === "random") {
        playlist = buildPlaylist();
        index = 0;
      } else {
        nowPlaying.textContent = "Playlist finished";
        songQuote.textContent = "";
        return;
      }
    }
  
    const currentSong = playlist[index];
    audio.src = currentSong.url;
    audio.play();
  
    // Update UI
    nowPlaying.textContent = currentMode === "random" ? "Serenading: Random" : `Serenading: ${activeMood}`;
    
    // Add animation to quote
    songQuote.style.opacity = 0;
    setTimeout(() => {
        songQuote.textContent = currentSong.quote || "";
        songQuote.style.opacity = 1;
    }, 300);
}

/* 🔄 EVENTS */
audio.addEventListener("ended", () => {
  index++;
  playCurrent();
});

randomBtn.addEventListener("click", () => {
  currentMode = "random";
  activeMood = null;
  playlist = buildPlaylist();
  index = 0;
  playCurrent();
});

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentMode = "mood";
    activeMood = btn.dataset.mood;
    playlist = buildPlaylist();
    index = 0;
    playCurrent();
  });
});

/* 🚀 START EVERYTHING */
window.addEventListener('DOMContentLoaded', () => {
    initValentineHearts();
    // Optional: play a random song immediately
    // playlist = buildPlaylist();
    // playCurrent();
});