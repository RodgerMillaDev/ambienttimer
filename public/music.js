
var audioElement = document.getElementById("fidiBackMusic");

const musicArray = [];


firebase.firestore().collection("Music").get().then((allMusic)=>{
    allMusic.forEach((Music) => {

        var content='';
        const { MusicName, MusicID, MusicCat, MusicURL } = Music.data();

        content += '<div class="track" onclick="playTrack((\'' + MusicURL + '\'))">';
        content +='<p>'+MusicName+'<p>';
        content += '</div>';
        musicArray.push({ name: MusicName, ID: MusicID, cat: MusicCat, url: MusicURL });
        $(".musicList").append(content);  

        
        
    });
    // playNextTrack(); // Start playing the first track
   


    audioElement.addEventListener("ended", playNextTrack);
})


function playTrack(MusicURL){
    audioElement.src = MusicURL;
    // audioElement.loop = true; // Set loop attribute to true
    audioElement.play();
    audioElement.addEventListener("ended", playNextTrack);


}


function playNextTrack() {
    document.getElementById("musicStartPlay").style.display="none"
    document.getElementById("musicPause").style.display="block"


    if (musicArray.length > 0) {
        const { url } = musicArray.shift(); // Take the first track and remove it from the array
        audioElement.src = url;
        audioElement.play();
    } else {
        console.log("End of playlist");
    }
}

function backtrackPause(){
    audioElement.pause();
  
    document.getElementById("musicPlay").style.display="block"
    document.getElementById("musicPause").style.display="none"
  
}
function backtrackPlay(){
    audioElement.play();

    document.getElementById("musicPlay").style.display="none"
    document.getElementById("musicPause").style.display="block"
  
}