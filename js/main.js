//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

var path="Root";//a dinamic string where to store the currett work folder
let currentPath = 'directoryTree';

let directoryTree = {
    folders : [],
    files:[]
}

let myObj ={
    name : "",
    time : 0,
    folders : [],
    files : []
}

//flow functions

function saveInHistory(){
    var historyArray = JSON.parse(localStorage.getItem("history"));
    historyArray.push(document.getElementById(contador).value);
    localStorage.setItem("history",JSON.stringify(historyArray));
    //document.getElementById(contador).value="";
}

function checkValidCommand(){
    var stringInWords=document.getElementById(contador).value.split(' ');
    switch(stringInWords[1]){
    case "pwd":
        pwd();
        saveInHistory();
        break;
    case "cd":
        cd(stringInWords[2]);
        saveInHistory();
        break;
    case "cd..":
        cd2();
        saveInHistory();
        break;
    case "echo":
        echo(stringInWords);
        break;
    case "mkdir":
        mkdir(stringInWords[2])
        saveInHistory();
        break;
    default:
        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }

//commands functions
function pwd() {
    console.log("entro en pwd");
    alert("You are in "+path);
}

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

function cd2() {
    var pathInWords=path.split(' ');
    pathInWords.pop()
}

function mkdir(name){
    let time = new Date().getTime()
    // console.log(time);
    let myObj ={
        name : name,
        time : time,
        folders : [],
        files : []
    }
    eval(currentPath).folders.push(myObj);
}


function echo(commandline) {

    console.log(directoryTree);

    let echoParameters = [];
    let textToEvalue;
    for (let index = 2; index < commandline.length; index++) {
        echoParameters.push(commandline[index]);
    }
    textToEvalue = echoParameters.join("");
    console.log(textToEvalue);
    if (textToEvalue.includes(">>")) {
        echoParameters = textToEvalue.split(">>");
        var newfileObject = {
            name: echoParameters[1],
            content: echoParameters[0],
            }

            eval(currentPath).files.forEach(element => {
                if (element.name == echoParameters[1]) {
                    element.content += echoParameters[0];
                }
            });

    } else if (textToEvalue.includes(">")) {
        echoParameters = textToEvalue.split(">");
        var newfileObject = {
            name: echoParameters[1],
            content: echoParameters[0],
            }

    eval(currentPath).files.push(newfileObject);
    console.log(directoryTree);

    } else {
        alert("no");
    }
}

function ls(option) {
    //localStorage.getItem("directoryTree");
    let listToShow = [];
    for (let index = 0; index < directoryTree.files.length; index++) {
        listToShow.push(directoryTree.files[index].name);
    }
    for (let index = 0; index < directoryTree.folder.length; index++) {
        listToShow.push(directoryTree.folder[index].name);
    }
    document.getElementById(contador).innerHTML = listToShow.join(" ");

    /* Option R */
    if (option == "-R") {
    newtextArea();
        }
    }
}