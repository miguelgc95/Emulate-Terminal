//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

var path="directoryTree";//a dinamic string where to store the currett work folder

var directoryTree = {
    folders:[
        {
            name: "folder1",
            folders:[
                {
                    name: "folder3",
                    folders:[],
                    files:[]
                }
            ],
            files:[]
        },
        {
            name: "folder2",
            folders:[
                {
                    name: "folder3",
                    folders:[],
                    files:[]
                }
            ],
            files:[]
        },
    ],

    files:[]
}


//commands functions

function pwd() {
    console.log("entro en pwd");
    alert("You are in "+path);
}

// function ls() {

// }
let currentPath = 'directoryTree'
function cd(whereToMove){
    
    path+=('/'+whereToMove)


    eval(currentPath).folders.forEach((x,i)=>{
        if (x.name === whereToMove) {
            currentPath += `.folders[${i}]`
            console.log(currentPath);

        }
    })
    path+=("/"+whereToMove)
     
}


// function cd2() {
    
// }

// function mkdir() {

// }

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
    historyArray.push(document.getElementById(contador).value);
    localStorage.setItem("history",JSON.stringify(historyArray));
    //document.getElementById(contador).value="";
}

function checkValidCommand(){
    var stringInWords=document.getElementById(contador).value.split(' ');
    console.log(stringInWords[0])
    switch(stringInWords[1]){
    case "pwd":
        pwd();
        saveInHistory();
        break;
    case "cd":
        cd(stringInWords[2]);
        saveInHistory();
        break;
    default:
        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }
}

/* l */

/* document.getElementById("enter").addEventListener("click", preventSendForm); */