//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

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
}

function checkValidCommand(){
    var stringInWords=document.getElementById(contador).value.split(' ');
    switch(stringInWords[1]){
    case "pwd":
        saveInHistory();
        pwd();
        break;
    case "cd":
        cd(stringInWords);
        break;
    case "echo":
        echo(stringInWords);
        setLocalStorage()
        break;
    case "mkdir":
        saveInHistory();
        mkdir(stringInWords[2])
        setLocalStorage()
        break;
    case "rm":
        saveInHistory();
        rm(stringInWords)
        break;
    case "cat":
        saveInHistory();
        cat(stringInWords[2]);
        break;
    case "clear":
        saveInHistory()
        clear();
        break;
    default:
        newtextArea();
        document.getElementById(contador).value="Invalid command madafaka, try again";
    }


//commands functions
function pwd() {
    newtextArea();
    document.getElementById(contador).value="You are in: "+path;
}

function cd(stringInWords){
    saveInHistory();
    if(stringInWords.length===2){
        emptyCD();
    }
    else if(stringInWords[2]===".."){
        cd2();
    }
    else if(stringInWords[2][0]!="/"){
        relativeCD(stringInWords[2]);
    }
    else if(stringInWords[2][0]==="/"){
        absoluteCD(stringInWords[2]);
    }
    else{
        console.log("invalid command")
    }
}

function emptyCD(){
    path="/root";
    currentPath = 'directoryTree';
}

function cd2() {
    //Instructions to change "path"
    var pathInWords=path.split('/');
    pathInWords.shift();
    pathInWords.pop();
    path=""
    pathInWords.forEach(element => {
        path+="/"+element;
    });
    //instructions to change "currentPath"
    currentPath=currentPath.slice(0,currentPath.length-11);
}

function relativeCD(whereToMove){
    var flag=true;
    eval(currentPath).folders.forEach((x,i)=>{
        if (x.name === whereToMove) {
            currentPath += `.folders[${i}]`;
            path+=('/'+whereToMove)
            flag=false;
        }
    })
    if (flag){
        newtextArea();
        document.getElementById(contador).value="folder doesn't exist";
    }
}

function absoluteCD(whereToMove){
    var whereToMoveInWords=whereToMove.split("/");
    whereToMoveInWords.shift();
    whereToMoveInWords.shift();
    whereToMoveInWords.unshift("root");
    var pathAux="";
    var currentPathAux="directoryTree";
    var metaFlag=false;
    for(i=0;i<whereToMoveInWords.length-1;i++){
        var flag=true;
        for(j=0;j<eval(currentPathAux).folders.length;j++){
            if(eval(currentPathAux).folders[j].name===whereToMoveInWords[i+1]){
                flag=false;
                pathAux+="/"+whereToMoveInWords[i];
                currentPathAux+=`.folders[${j}]`;
                break;
            }
        }
        if(flag){
            newtextArea();
            document.getElementById(contador).value="The path doesn't exist";
            break;
        }
        else{
            metaFlag=true;
        }
    }
    if(metaFlag){
        path=`${pathAux}/${whereToMoveInWords[whereToMoveInWords.length-1]}`;
        currentPath=currentPathAux;
    }
}

function cat(fileToOpen){
    var flag=true;
    eval(currentPath).files.forEach(element => {
        if (element.name===fileToOpen){
            newtextArea();
            document.getElementById(contador).value=element.content;
            flag=false
        }
    });
    if(flag){
        newtextArea();
        document.getElementById(contador).value="file doesn't exist";
    }
}

function mkdir(name){
    let time = new Date().getTime()
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

// Command Clear

function clear(){
    let $textAreas = document.querySelectorAll('textarea')

    $textAreas.forEach(e => {
            e.remove()
    });


}

