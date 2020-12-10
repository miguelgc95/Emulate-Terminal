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
getLocalStorage()
function getLocalStorage(){
    if (localStorage.getItem('root') === null) {
        localStorage.setItem('root',JSON.stringify(directoryTree))
        console.log('lo creo');
    }else{
        directoryTree = JSON.parse(localStorage.getItem('root'))
        console.log('lo cojo');
    }
}
function setLocalStorage(){
    localStorage.setItem('root',JSON.stringify(directoryTree))
}

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
        setLocalStorage()
        break;
    case "mkdir":
        mkdir(stringInWords[2])
        saveInHistory();
        setLocalStorage()
        break;
    case "rm":
        rm(stringInWords)
        saveInHistory();
        
        break;
    case "ls":
        ls(stringInWords[2])
        saveInHistory();
        break;
    default:
        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }
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
/*
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
 */

function cd2() {
    var pathInWords=path.split(' ');
    pathInWords.pop()
}

function mkdir(name){
    myObj.name = name
    myObj.time = //segundos desde 1970
    eval(currentPath).folders.push(myObj)
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
    let listToShow = [];
    if (option == undefined) {
        for (let index = 0; index < eval(directoryTree).files.length; index++) {
            listToShow.push(eval(directoryTree).files[index].name);
        }
        for (let index = 0; index < eval(directoryTree).folders.length; index++) {
            listToShow.push(eval(directoryTree).folders[index].name);
        }
        /* console.log(listToShow)
        console.log(document.getElementById(contador).innerHTML)
        console.log(listToShow.join(" ")) */
        newtextArea();
        document.getElementById(contador).value += listToShow.join(" ");
    }

    /* Option R */
    if (option == "-R") {
        }
    
} 
function rm(string){
    console.log(string);
    switch(string[2]){
        case '-r': 
            console.log('estas en -r');
            break
        case '-d': 
            console.log('estas en -d');
            break
        default:
            console.log('estas en default');


    }
}