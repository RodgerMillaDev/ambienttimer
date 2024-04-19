var universalID;
notifyWelcome()

function backMedia(){
 
  firebase.firestore().collection("Videos").where("MediaCat", "==" ,"Anime").get().then((fotos) => {
    var content = '';
    fotos.forEach((foto) => {
        var videoID = foto.data().videoID;
        var videoURL = foto.data().videoURL;

        content += '<div class="selectCardV" onclick="setBackVideo(\'' + videoURL + '\')">';
        content += '<video src="' + videoURL + '">' + '</video>';
        content += '</div>';
    });

    selectedWrap.innerHTML = content;

   }).then(()=>{
    document.getElementById("Ambience").style.bottom="-100%";
    document.getElementById("Music").style.bottom="-100%";
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("chooseList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="120px"

   })
  
}
function optCancel(){
    const optCards = document.querySelectorAll(".optPop");
    optCards.forEach(optCard => {
    optCard.style.bottom = "-100%";
  });
}

function ambience(){
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("chooseList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="-100%";
    document.getElementById("Music").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="-100%"
    document.getElementById("Ambience").style.bottom="120px";
}
function Music(){
    document.getElementById("Ambience").style.bottom="-100%";
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("chooseList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="-100%"
    document.getElementById("Music").style.bottom="120px";
}
function fullfocus(){
 
    document.getElementById("Music").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="-100%";
    document.getElementById("Ambience").style.bottom="-100%";
    document.getElementById("Options").style.scale="0.001";
    document.getElementById("flip-container").style.scale="0.001"; 
    document.getElementById("chooseList").style.bottom="-100%";
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="-100%";
    document.getElementById("Blog").style.transform="scale(0.0001)";


    Swal.fire("To return, double click on screen")
  

}


document.getElementById("fidiBody").ondblclick=function(){
    document.getElementById("Options").style.scale="1";
    document.getElementById("flip-container").style.scale="1"; 
}



function notify(){
  notifySound()

  var welcomeTXT="Streamline your day and maximize your potential with Ambient Timer"
  document.getElementById("notifyTXT").innerText = welcomeTXT;


    document.getElementById("notification").style.transform = "scale(1)";
        setTimeout(function() {
            document.getElementById("notification").style.transform = "scale(0.001)";
        }, 8000);
}
function notifyWelcome(){
  var welcomeTXT="Streamline your day and maximize your potential with Ambient Timer"
  document.getElementById("notifyTXT").innerText = welcomeTXT;
    document.getElementById("notification").style.transform = "scale(1)";
        setTimeout(function() {
            document.getElementById("notification").style.transform = "scale(0.001)";
        }, 8000);
}

function notifySound() {
  var audioElement = document.getElementById("fidiNotifySound");

    // // Check if the audio can be played
    // if (audioElement.paused) {
    //     audioElement.play();
    // }else{
      audioElement.play()
    // }
}


function todoList(){
    document.getElementById("Ambience").style.bottom="-100%";
    document.getElementById("Music").style.bottom="-100%";
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="-100%"
    document.getElementById("chooseList").style.bottom="120px";


}

function viewTask() {
  var myTasks = JSON.parse(localStorage.getItem("userTasks")) || [];

  var taskContainer = document.getElementById("taskList");
  
  taskContainer.innerHTML = "";
  
  myTasks.forEach((task, index) => {
      var taskDiv = document.createElement("div");
      taskDiv.className = "task";
  
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "taskCheckbox" + index; // Add a unique identifier
      checkbox.className = "taskCheckbox" + index; // Add a unique identifier
      checkbox.checked = task.isChecked; // Set the initial state of the checkbox
  
      var taskParagraph = document.createElement("p");
      taskParagraph.innerText = task.task; // Use task.task to get the task text
      if (task.isChecked) {
          taskParagraph.style.textDecoration = "line-through";
      }
  
      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(taskParagraph);
  
      taskContainer.appendChild(taskDiv);
  
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskParagraph.style.textDecoration = "line-through";
        } else {
            taskParagraph.style.textDecoration = "none";
        }
        checkAllCheckboxes();
    });
    
  });
  

  document.getElementById("Ambience").style.bottom = "-100%";
  document.getElementById("Music").style.bottom = "-100%";
  document.getElementById("WriteList").style.bottom = "-100%";
  document.getElementById("backgroundMenu").style.bottom = "-100%";
  document.getElementById("chooseList").style.bottom = "-100%";
  document.getElementById("viewList").style.bottom = "120px";
}



function checkAllCheckboxes() {
  var checkboxes = document.querySelectorAll('.task input[type="checkbox"]');
  var allChecked = true;

  checkboxes.forEach((checkbox, index) => {
    if (!checkbox.checked) {
      allChecked = false;
      // meaning not all are checked
      var taskArray = JSON.parse(localStorage.getItem("userTasks")) || [];
      taskArray[index].isChecked = false; // Update the isChecked property in the taskArray
      localStorage.setItem("userTasks", JSON.stringify(taskArray)); // Save the updated taskArray back to local storage
    } else {
      // Task is checked, update its status in the local storage
      var taskArray = JSON.parse(localStorage.getItem("userTasks")) || [];
      taskArray[index].isChecked = true; // Update the isChecked property in the taskArray
      localStorage.setItem("userTasks", JSON.stringify(taskArray)); // Save the updated taskArray back to local storage
    }
  });

  if (allChecked) {
    deleteTasks();
  }
}



function deleteTasks() {
  notifySound();

  localStorage.removeItem("userTasks");


  var doneTXT = "Great work, You've aced every challenge!";
  document.getElementById("notifyTXT").innerText = doneTXT;

  document.getElementById("notification").style.transform = "scale(1)";
  setTimeout(function () {
      document.getElementById("notification").style.transform = "scale(0.001)";
  }, 8000);
}




function writeList(){
    document.getElementById("Ambience").style.bottom="-100%";
    document.getElementById("Music").style.bottom="-100%";
    document.getElementById("backgroundMenu").style.bottom="-100%"
    document.getElementById("chooseList").style.bottom="-100%";
    document.getElementById("viewList").style.bottom="-100%";
    document.getElementById("WriteList").style.bottom="120px";



}
function addTyped() {
  const task = document.getElementById("typingTask").value;

  if (task && task!= ' ') {
      // Create a div to contain the task and cancel button
      const newTaskDiv = document.createElement("div");
      newTaskDiv.classList.add('mainTask');

      // Create a p tag to hold the task text
      const taskParagraph = document.createElement("p");
      taskParagraph.classList.add('actTask');
      taskParagraph.innerText = task;

      // Create a cancel button
      const cancelButton = document.createElement("button");
      cancelButton.innerText = "X";
      cancelButton.onclick = function() {
          // Remove the corresponding task div
          document.getElementById("typedList").removeChild(newTaskDiv);
      };

      // Append the p tag and cancel button to the task div
      newTaskDiv.appendChild(taskParagraph);
      newTaskDiv.appendChild(cancelButton);

      // Append the task div to the container
      document.getElementById("typedList").appendChild(newTaskDiv);

      // Clear the input field
      document.getElementById("typingTask").value = "";
  } else {
      Swal.fire("Hhhmmm! It seems there is nothing to add.");
  }
}



function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addTyped();
    }
}
function blogCancel(){
    document.getElementById("Blog").style.display="none";

}




// snow` 
particlesJS("particles-js", {
    particles: {
      number: { value: 221, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 6,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0,
        width: 1
      },
      move: {
        enable: true,
        speed: 6,
        direction: "bottom-right",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
  var count_particles, stats, update;



// rain 


function createRaindrops() {
    var toggleSwitch = document.getElementById('RainFallToggle');

    if (toggleSwitch.checked) {
        startRainAnimation();
    } else {
        stopRainAnimation();
    }
}

function startRainAnimation() {
    let amount = 100;
    let container = document.querySelector('.raindrops-container');
    container.innerHTML = ''; 

    for (let i = 0; i < amount; i++) {
        let drop = document.createElement("div");
        drop.className = "drop";
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`; 
        drop.style.animationDelay = `${Math.random() * 2}s`; 
        container.appendChild(drop);
    }

   
}

function stopRainAnimation() {
 
    let container = document.querySelector('.raindrops-container');
    container.innerHTML = "";
}

createRaindrops();

document.getElementById("snowOverlay").style.display='none'


function snowFall() {
    var toggleSwitch = document.getElementById('SnowfallToggle');
    if (toggleSwitch.checked) {
        document.getElementById("snowOverlay").style.display='flex'

    } else {
        document.getElementById("snowOverlay").style.display='none'

    }
}



 function birdSound(){
  var toggleSwitch = document.getElementById('BirdSoundToggle');
if(toggleSwitch.checked){
  document.getElementById("fidiBirdSound").play();
  
  var audio = document.getElementById("fidiBirdSound");
  var volumeControl = document.getElementById("BirdVolume");
  audio.volume = volumeControl.value;
  volumeControl.addEventListener("input", function() {
      audio.volume = volumeControl.value;
  });

}else{
  document.getElementById("fidiBirdSound").pause()

}
 }
 function fireSound(){
  var toggleSwitch = document.getElementById('FireplaceToggle');
if(toggleSwitch.checked){
  document.getElementById("fidiFireSound").play()
  var audio = document.getElementById("fidiFireSound");
  var volumeControl = document.getElementById("FireVolume");
  audio.volume = volumeControl.value;
  volumeControl.addEventListener("input", function() {
      audio.volume = volumeControl.value;
  });

}else{
  document.getElementById("fidiFireSound").pause()

}
 }
 function rainSound(){
  var toggleSwitch = document.getElementById('RainSoundToggle');
if(toggleSwitch.checked){
  document.getElementById("fidiRainSound").play()
  var audio = document.getElementById("fidiRainSound");
  var volumeControl = document.getElementById("RainVolume");
  audio.volume = volumeControl.value;
  volumeControl.addEventListener("input", function() {
      audio.volume = volumeControl.value;
  });

}else{
  document.getElementById("fidiRainSound").pause()

}
 }
 function waveSound(){
  var toggleSwitch = document.getElementById('WaveToggle');
if(toggleSwitch.checked){
  document.getElementById("fidiBeachSound").play()
  var audio = document.getElementById("fidiBeachSound");
  var volumeControl = document.getElementById("WaveVolume");
  audio.volume = volumeControl.value;
  volumeControl.addEventListener("input", function() {
      audio.volume = volumeControl.value;
  });
}else{
  document.getElementById("fidiBeachSound").pause()

}
 }
 function Breeze(){
  var toggleSwitch = document.getElementById('BreezeToggle');
if(toggleSwitch.checked){
  document.getElementById("fidiBreeezeSound").play()

  var audio = document.getElementById("fidiBreeezeSound");
  var volumeControl = document.getElementById("BreezeVolume");
  audio.volume = volumeControl.value;
  volumeControl.addEventListener("input", function() {
      audio.volume = volumeControl.value;
  });
}else{
  document.getElementById("fidiBreeezeSound").pause()

}
 }

 
 



function FocusMode(){
 


  var focusMode=document.getElementById("FocusMode");
  if(focusMode.checked){
   
    document.getElementById("breakP").style.color='aliceblue'
    document.getElementById("Min").value='25'
    document.getElementById("Sec").value='00'

  }
  else{
  
    
    document.getElementById("focusP").style.color='aliceblue'
    document.getElementById("Min").value='05'
    document.getElementById("Sec").value='00'

  }
}

function logInput(inputElement) {
  let value = inputElement.value;

  value = value.replace(/[^0-9]/g, '');

  inputElement.value = value;

  if (parseInt(value) < 0) {
      inputElement.value = '';
  }

  if (value.length > 2) {
      inputElement.value = value.slice(0, 2); 
  }

  if (parseInt(value) >= 60) {
      inputElement.value = 60;
  }
}
function logInputmin(inputElement) {
  let value = inputElement.value;

  value = value.replace(/[^0-9]/g, '');

  inputElement.value = value;

  if (parseInt(value) < 0) {
      inputElement.value = '';
  }

  if (value.length > 2) {
      inputElement.value = value.slice(0, 2); 
  }

  if (parseInt(value) >= 60) {
      inputElement.value = 59;
  }
}



 function leave(inputElement){
  const value = inputElement.value;
  if(value==''){
    inputElement.value ="00"; 
  }


 }

//  increasing my volumes for  ambient voices 

function saveList() {
  const tasks = document.querySelectorAll(".actTask");
  var taskArray = [];

  tasks.forEach((task) => {
    var fidiTask = task.innerText;
    taskArray.push({ task: fidiTask, isChecked: false });
  });

  if (taskArray.length == 0) {
    console.log(taskArray);
    Swal.fire("No tasks written");
  } else {
    notifySound();

    // Store taskArray in local storage
    localStorage.setItem("userTasks", JSON.stringify(taskArray));

    var taskTXT = "Your tasks have been saved.";
    document.getElementById("notifyTXT").innerText = taskTXT;
    document.getElementById("notification").style.transform = "scale(1)";

    setTimeout(function () {
      document.getElementById("notification").style.transform = "scale(0.001)";
    }, 8000);

    document.getElementById("WriteList").style.bottom = "-100%";
  }
}



function setBackFoto(fotoURL){
  document.getElementById("backImageFoto").src=fotoURL;
  document.getElementById("actBackVideo").style.display="none";
  document.getElementById("backImage").style.display="block";
  

}



function loadAnime(){
  document.getElementById("fotoCat").style.background=   "rgba(255, 255, 255, 0.3)";
  document.getElementById("animeCat").style.background=   "rgba(255, 255, 255, 0.9)";


  
  // Clear existing content
  selectedWrap.innerHTML = "";


  firebase.firestore().collection("Videos").where("MediaCat", "==" ,"Anime").get().then((fotos) => {
      var content = '';
      fotos.forEach((foto) => {
          var videoID = foto.data().videoID;
          var videoURL = foto.data().videoURL;

          content += '<div class="selectCardV" onclick="setBackVideo(\'' + videoURL + '\')">';
          content += '<video src="' + videoURL + '">' + '</video>';
          content += '</div>';
      });

      // Append new content
      selectedWrap.innerHTML = content;
  });

}

function setBackVideo(videoURL){
  document.getElementById("actBackVideo").src=videoURL;
  document.getElementById("actBackVideo").style.display="block";
}





