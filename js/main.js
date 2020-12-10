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

let directoryTree = [
    /* 0 */ [
                /* 0 -> folderObject === CARPETA1*/ {
                    name: "carpeta1",
                    folders: [  // CARPETAS DENTRO DE CARPETA1
                /* 0.folders */        /* 0 -> folderObject === CARPETA1 DENTRO DE CARPETA1*/ {
                                name: "carpeta1.1",
                                folders: [],
                                files: []
                        },
                /* 0.folders */       /* 1 -> folderObject === CARPETA2 DENTRO DE CARPETA1*/ {
                                name: "carpeta1.2",
                                folders: [],
                                files: [
                                        ]
                        }
                    ],
                    files: [  // ARCHIVOS DENTRO DE CARPETA1
                /* 0.files */        /* 0 -> fileObject === Archivo1 DENTRO DE CARPETA1*/ {
                                        name: "Archivo1.1",
                                        content: "contenido Archivo1.1"
                                },
                /* 0.files */       /* 1 -> folderObject === Archivo2 DENTRO DE CARPETA1*/ {
                                        name: "Archivo1.2",
                                        content: "contenido Archivo1.2"
                                }
                            ]
                },
                /* 1 -> folderObject === CARPETA2*/ {
                    name: "carpeta2",
                    folders: [  // CARPETAS DENTRO DE CARPETA2
                /* 1.folders */        /* 0 -> folderObject === CARPETA1 DENTRO DE CARPETA2*/ {
                                name: "carpeta2.1",
                                folders: [],
                                files: [
                                        ]
                        },
                    ],
                    files: [  // ARCHIVOS DENTRO DE CARPETA2
                /* 1.files */        /* 0 -> fileObject === Archivo1 DENTRO DE CARPETA2*/ {
                                        name: "Archivo1.2",
                                        content: "contenido Archivo1.2"
                                },
                            ]
                }
        ],

    /* 1 */ [
        /* 0 -> fileObject === File1 del rootActual*/ {
            name: "file1",
            content: "contentFile1"
            },
        /* 1 -> fileObject === File2 del rootActual*/ {
            name: "file2",
            content: "contentFile2"
            }
        ]
    ];

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
        
            actualDirectory.files.forEach(element => {
                if (element.name == echoParameters[1]) {
                    element.text += echoParameters[0];
                }
            });

    } else if (textToEvalue.includes(">")) {
        echoParameters = textToEvalue.split(">");
        var newfileObject = {
            name: echoParameters[1],
            content: echoParameters[0],
            }

       // actualDirectory.files.push(newfileObject);
        console.log(newfileObject);
        console.log(directoryTree[0][0].folders)

        directoryTree[0][0].folders[0].files.push(newfileObject);
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