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
    alert("You are in "+path);
}

// function ls() {
    
// }

function cd(whereToMove) {
    console.log("entro en cd");
    path+=("/"+whereToMove);
}

// function cd2() {
    
// }

function mkdir() {
    var currentDirectoryWords = path.split('/');
    cu
}

function echo(commandline) {
    //let directoryTree = JSON.parse(localStorage.getItem("directoryTree"))

    let echoParameters = [];
    let textToEvalue;
    for (let index = 2; index < commandline.length; index++) {
        echoParameters.push(commandline[index]);
    }
    //console.log(echoParameters);
    textToEvalue = echoParameters.join("");
    if (/^>>/.test(textToEvalue)) {
        echoParameters = textToEvalue.split(">>");
        var newfileObject = {
            name: echoParameters[1],
            text: echoParameters[0],
            }
        
            actualDirectory.files.forEach(element => {
                if (element.name == echoParameters[1]) {
                    element.text += echoParameters[0];
                }
            });

    } else if (/^>/.test(textToEvalue)) {
        echoParameters = textToEvalue.split(">");
        var newfileObject = {
            name: echoParameters[1],
            text: echoParameters[0],
            }

        actualDirectory.files.push(newfileObject);
    } else {
        alert("no");
    }
    
    //console.log(echoParameters);

    /* me llega la ruta: carpeta0/carpeta1 */
    /* var actualDirectory = ruta(); */
    
}

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
    case "echo":
        echo(stringInWords);
        break;
    default:
        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }
}

/* l */

/* document.getElementById("enter").addEventListener("click", preventSendForm); */