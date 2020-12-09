//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

var path="root";//a dinamic string where to store the currett work foulder

var directoryTree = {
    rootFolders:[],
    rootFiles:[]
}

/* var foulderObject = {
    folders:[],
    files:[],
} */

/* var fileObject = {
    name:"",
    text:"",
} */

localStorage.setItem("history",JSON.stringify([]));

//commands functions

function pwd() {
    console.log("entro en pwd");
    alert("You are in "+currentDirectory);
}

// function ls() {
    
// }

function cd(whereToMove) {
    console.log("entro en cd");
    currentDirectory+=("/"+whereToMove);
}

// function cd2() {
    
// }

function mkdir() {
    var currentDirectoryWords = currentDirectory.split('/');
    cu
}

// function echo(){
    
// }

// function cat() {
    
// }

// function rm() {
    
// }

// function mv() {
    
// }

// function clear() {
    
// }


//flow functions

function saveInHistory(){
    var historyArray = JSON.parse(localStorage.getItem("history"));
    historyArray.push(document.getElementById("comd").value);
    localStorage.setItem("history",JSON.stringify(historyArray));
    document.getElementById("comd").value="";
}

function checkValidCommand(){
    var stringInWords=document.getElementById("comd").value.split(' ');
    console.log(stringInWords[0])
    switch(stringInWords[0]){
    case "pwd":
        pwd();
        saveInHistory();
        break;
    case "cd":
        cd(stringInWords[1]);
        saveInHistory();
        break;
    default:
        console.log("Invalid command madafaka, try again");
        document.getElementById("comd").value="";
    }
}

function preventSendForm(event) {
    event.preventDefault();
    checkValidCommand();
}

document.getElementById("enter").addEventListener("click", preventSendForm);