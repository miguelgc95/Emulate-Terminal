//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));
localStorage.setItem("history",JSON.stringify([]));

var path="directoryTree";//a dinamic string where to store the currett work folder
let currentPath = 'directoryTree';
let directoryTree = {
    folders: [ /* 0 -> folderObject === CARPETA1*/ {
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

/* 1 */ files: [
/* 0 -> fileObject === File1 del rootActual*/ {
name: "file1",
content: "contentFile1"
},
/* 1 -> fileObject === File2 del rootActual*/ {
name: "file2",
content: "contentFile2"
}
]
};

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
        saveInHistory();
        break;
    case "ls":
        ls(stringInWords[2]);
        saveInHistory();
        break;
    default:
        console.log("Invalid command madafaka, try again");
        //document.getElementById(contador).value="";
    }
}


//commands functions

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

function pwd() {
    console.log("entro en pwd");
    alert("You are in "+path);
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

    }
    
    newtextArea();
}