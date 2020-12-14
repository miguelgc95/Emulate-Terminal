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
        if (stringInWords[2]===undefined){
            console.log("Invalid command madafaka, try again");
        }
        else{
        cd(stringInWords[2]);
        saveInHistory();
        }
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
    console.log("entro a cd")
    var flag=true;
    eval(currentPath).folders.forEach((x,i)=>{
        if (x.name === whereToMove) {
            currentPath += `.folders[${i}]`;
            path+=('/'+whereToMove)
            flag=false;
        }
    })
    if (flag){
        console.log("esa carpeta no existe")
    }
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
        return listToShow;
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


    /* OPCION S */
    if (option == "-S") {
        let listToSort = lsCommand(currentPath);
        console.log(listToSort);
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