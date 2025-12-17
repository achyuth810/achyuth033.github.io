// 1. Prototype Music Array (Local or URL)
const songs = [
    { title: "Ne kallu", url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/youreyes.mp3" },
    { title: "Chikiri", url: "https://myheartifymusic.s3.us-east-1.amazonaws.com/yoursong.mp3" }
];

const playBtn = document.getElementById('random-btn');
const audio = document.getElementById('audio-player');
const songLabel = document.getElementById('song-name');

// 2. Random Selection Function
function playRandomSong() {
    // Pick a random index (0 or 1)
    const randomIndex = Math.floor(Math.random() * songs.length);
    const selectedSong = songs[randomIndex];

    // Load and Play
    audio.src = selectedSong.url;
    audio.play();
    
    // UI Update
    songLabel.innerText = "Playing: " + selectedSong.title;
    console.log("Playing random song:", selectedSong.title);
}

// Event Listener
playBtn.addEventListener('click', playRandomSong);

// 3. "Netflix Style" Session Reset Placeholder
window.addEventListener('beforeunload', () => {
    // In the prototype, we just log it. In the real app, we use sendBeacon.
    console.log("Application closing... Resetting session.");
});