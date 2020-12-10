//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

var path="directoryTree";//a dinamic string where to store the currett work folder

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


function cd2() {
    var pathInWords=path.split(' ');
    pathInWords.pop()
}

function mkdir(name){
    myObj.name = name
    myObj.time = //segundos desde 1970
    currentPath.folders.push(myObj)
}

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

function echo(commandline) {
    //let directoryTree = JSON.parse(localStorage.getItem("directoryTree"))

    console.log(directoryTree);
    //obtencion de la ruta llamando a la funcion:
    // ejemplo: rutaPrueba = carpera1/carpera1.1
    // situacion dentro del local Store: directoryTree[0].folders[0].files.push

    let echoParameters = [];
    let textToEvalue;
    for (let index = 2; index < commandline.length; index++) {
        echoParameters.push(commandline[index]);
    }
    //console.log(echoParameters);
    textToEvalue = echoParameters.join("");
    console.log(textToEvalue);
    if (textToEvalue.includes(">>")) {
        echoParameters = textToEvalue.split(">>");
        var newfileObject = {
            name: echoParameters[1],
            text: echoParameters[0],
            }

            eval(currentPath).files.forEach(element => {
                if (element.name == echoParameters[1]) {
                    element.text += echoParameters[0];
                }
            });
        
            /* actualDirectory.files.forEach(element => {
                if (element.name == echoParameters[1]) {
                    element.text += echoParameters[0];
                }
            }); */

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
}

/* l */

/* document.getElementById("enter").addEventListener("click", preventSendForm); */