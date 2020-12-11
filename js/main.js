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

function lsCommand(dirToList) {
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
        lsCommand(directoryTree);
    }

    /* Option R */
    if (option == "-R") {

        let saltolinea = `\r\n`;
        let lastFolderinCurrentDir;
        let currentPathcopy = currentPath;
        let directoryTreeCopy = JSON.parse(JSON.stringify(directoryTree));
        let currentDir = directoryTreeCopy;
        let folderNumber = 0;
        let contador= 0;

        lsCommand(directoryTreeCopy);
        //for (let index = 0; index < eval(directoryTreeCopy).folders.length; index++) {
            //currentDir = directoryTreeCopy.fo
        for (let index = 0; index < directoryTreeCopy.folders.length; index++) {
            if (eval(currentDir).folders.length>0) {
                currentDir = eval(currentDir).folders[contador];
                lsCommand (currentDir);
            } else {
                contador++;
                currentDir = directoryTreeCopy;
            }
        }
        
        
            while (eval(currentDir).folders.length>0) {
                for (let index = 0; index < eval(currentDir).folders.length; index++) {
                    console.log(eval(currentDir).folders[index]);
                    currentDir = eval(currentDir).folders[index];
                    lsCommand (currentDir);
                }
                
                console.log(eval(currentDir).folders.length)
            }
        
        //}
        

           /*  for (let folderNumber = 0; folderNumber < eval(directoryTreeCopy).folders.length; folderNumber++) {
                directoryTreeCopy = eval(directoryTreeCopy).folders[folderNumber];
                currentPathcopy = currentPathcopy + "/" + eval(directoryTreeCopy).folders[folderNumber].name
                lsCommand (directoryTreeCopy);
                document.getElementById(contador).value = currentPathcopy + ": " + document.getElementById(contador).value
                currentPathcopy
            } */

        
        /* let listString = listToShow.join(" ");
        document.getElementById(contador).value = listString;
        let showfoldersR = [];
        showfoldersR.push(listString);
        console.log(showfoldersR); */

        /* let directoryTreetoString = JSON.stringify(directoryTree);
        let directoryTreeCopy = JSON.parse(directoryTreetoString);
        console.log(directoryTree);
        console.log(directoryTreeCopy); */
    //    
    //    if (eval(currentPathcopy).folders.length>0 && lastFolder == false) {
    //        
    //    }
    //    while (eval(currentPathcopy).folders.length > 0) {
    //        eval(currentPathcopy).folders.forEach((x,i)=>{
    //            x.name
    //            if (x.name === whereToMove) {
    //                currentPathcopy += `.folders[${i}]`
    //                console.log(currentPath);
    //            }
    //        })
    //        eval(currentPathcopy).files.forEach((x,i)=>{
    //            x.name
    //            if (x.name === whereToMove) {
    //                currentPathcopy += `.folders[${i}]`
    //                console.log(currentPath);
    //    
    //            }
    //        })
    //    }
    //    
    //    console.log(currentPathcopy);
    //    console.log(currentPath);
    //    
    //    for (let index = 0; index < eval(directoryTree).folders.length; index++) {
    //        let currentfolder = [];
    //        currentPathcopy+= `.folders[`+ index +`]`;
    //        console.log(currentPathcopy);
    //        currentfolder.push(eval(directoryTree).folders[index].name.toString());
    //        document.getElementById(contador).value += "" + saltolinea + "" +eval(directoryTree).folders[index].name.toString();
    //        /* console.log(eval(directoryTree).folders[index].name) */
    //        for (let j = 0; j < eval(directoryTree).folders[index].files.length; j++) {
    //            document.getElementById(contador).value += "" + saltolinea + "" + eval(directoryTree).folders[index].files[j].name;
    //            let listFilesInFolder = []
    //            listFilesInFolder.push(eval(directoryTree).folders[index].files[j].name);
    //            let listFilesInFolderString = listFilesInFolder.join("\n");
    //            currentfolder.push(listFilesInFolderString);
    //        }
    //        console.log(currentfolder);
    //    }
    //    
    }
}//

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