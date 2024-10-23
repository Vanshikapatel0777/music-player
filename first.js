const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const playPauseBtn = document.getElementById('playPause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const trackList = document.getElementById('track-list');
const tracks =trackList.getElementsByTagName('li');

let currentTrack = 0;
const songs = Array.from(tracks).map(track => track.getAttribute('data-track'));

function loadSong(index) {
const song = songs[index];
audio.src = song;
songTitle.textContent = tracks[index].textContent;
highlightActiveTrack(index);

}
function highlightActiveTrack(index) {
    Array.from(tracks).forEach((track,i) => {
        track.classList.toggle('active', i === index);
    });
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause' ;

    }else {
        audio.pause();
        playPauseBtn.textContent = 'Play' ;

    }
}
function prevSong(){
    currentTrack = (currentTrack - 1 + songs.length) % songs.length;
    loadSong(currentTrack);
    audio.play();
    playPauseBtn.textContent = 'Pause';

}
function nextSong() {
    currentTrack = (currentTrack + 1) % songs.length;
    loadSong(currentTrack);
    audio.play();
    playPauseBtn.textContent = 'Pause';

}
playPauseBtn.addEventListener('click',togglePlayPause);
prevButton.addEventListener('click',prevSong);
nextButton.addEventListener('click',nextSong);

Array.from(tracks).forEach((track, index) => {
    track.addEventListener('click', () => {
        currentTrack = index;
        loadSong(currentTrack);
        audio.play();
        playPauseBtn.textContent = 'Pause';
    });
});
loadSong(currentTrack);

audio.addEventListener('ended',nextSong);
