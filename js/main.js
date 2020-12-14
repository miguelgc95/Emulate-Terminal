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
    var newCommandToSave = document.getElementById(contador).value.slice(path.length+4);
    console.log(newCommandToSave, path.length);
    historyArray.push(newCommandToSave);
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
    case "ls":
        ls(stringInWords[2])
        saveInHistory();
        break;
    default:

        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }
}
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

function lsCommand(dirToList) {
    console.log(dirToList)
    let listToShow = [];
    for (let index = 0; index < eval(dirToList).files.length; index++) {
        listToShow.push(eval(dirToList).files[index].name);
    }
    for (let index = 0; index < eval(dirToList).folders.length; index++) {
        listToShow.push(eval(dirToList).folders[index].name);
    }
        newtextArea();
        document.getElementById(contador).value = listToShow.join(" ");
}

function ls(option) {

    if (option == undefined) {
        lsCommand(currentPath);
    }

    /* Option R */
    if (option == "-R") {
        let currentPathcopy = currentPath; //copio la ruta desde donde se ha llamado a la funcion
        let directoryTreeCopy = eval(currentPathcopy);

        console.log(currentPathcopy);
        console.log(directoryTreeCopy);

        lsCommand(currentPathcopy); // listo la ruta -> imprimo carpetas y archivos que haya en el directorio actual

        let goto_variable = "goinginfolders";
        let var_continue = true;

        while (currentPathcopy.length >= currentPath.length && var_continue== true) //
{
    switch (goto_variable)
    {
        case "goinginfolders": 
            while (eval(currentPathcopy).folders.length > 0) { // si hay carpetas me meto en la primera y hago ls
                    currentPathcopy += `.folders[0]`;
                    console.log(currentPathcopy);

                    lsCommand(currentPathcopy);
                    document.getElementById(contador).value = " " + eval(currentPathcopy).name + ": " + document.getElementById(contador).value
            }
            if (eval(currentPathcopy).folders.length == 0) { //cuando no haya carpeta
                //entro en una carpeta que no hay carpetas 111
                console.log(eval(currentPathcopy).name);
                goto_variable = "readPositionFolder";
            }
            break;

        case "readPositionFolder":
            let lastfolderposition = currentPathcopy.charAt(currentPathcopy.length - 2);
            let nextfolderposition = parseInt(lastfolderposition) + 1;
            console.log(eval(currentPathcopy).name);
            currentPathcopy = currentPathcopy.slice(0, -11); //voy al nivel superior
            console.log(eval(currentPathcopy).name);
            if (nextfolderposition < eval(currentPathcopy).folders.length) {  //si el numero de carpetas de ese nivel es mayor a la posicion de la ultima
                currentPathcopy += `.folders[`+ nextfolderposition +`]`;
                    console.log(currentPathcopy)
                    lsCommand(currentPathcopy);
                    document.getElementById(contador).value = " " + eval(currentPathcopy).name + ": " + document.getElementById(contador).value
                    goto_variable = "goinginfolders";
            } else if (currentPathcopy.length > currentPath.length) {
                console.log(currentPathcopy.length);
                console.log(currentPath.length);
                console.log(eval(currentPathcopy).name);
                console.log(eval(currentPath).name);
                goto_variable = "readPositionFolder";
            } else {
                var_continue = false;
                break;
            }
            

    }
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