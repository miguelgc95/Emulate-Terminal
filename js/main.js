//data manage
localStorage.setItem("commands",JSON.stringify(["pwd", "ls", "cd", "cd..", "mkdir", "echo", "cat", "rm", "mv", "clear"]));


let currentPath = 'directoryTree';

let history = []

let directoryTree = {
    folders : [],
    files:[]
}

let myObj ={
    name : "",
    time : 0,
    folders : [],
    files : [],
    size : 0
}
//flow functions
getLocalStorage()
function getLocalStorage(){
    if (localStorage.getItem('root') === null) {
        localStorage.setItem('root',JSON.stringify(directoryTree))
        
    }else{
        directoryTree = JSON.parse(localStorage.getItem('root'))
      
    }
    if (localStorage.getItem('history') === null) {
        localStorage.setItem('history',JSON.stringify(history))
        
    }else{
    
        history = JSON.parse(localStorage.getItem('history'))
      
    }
}
function setLocalStorage(){
    localStorage.setItem('root',JSON.stringify(directoryTree))
    localStorage.setItem('history',JSON.stringify(history))

}

function saveInHistory(){
    // var historyArray = JSON.parse(localStorage.getItem("history"));
    var newCommandToSave = document.getElementById(contador).value.slice(path.length+4);
    history.push(newCommandToSave);
    // localStorage.setItem("history",JSON.stringify(historyArray));
    setLocalStorage()

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
            saveInHistory();
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
            setLocalStorage()
            break;
        case "cat":
            saveInHistory();
            cat(stringInWords[2]);
            break;
        case "ls":
            saveInHistory();
            ls(stringInWords[2])
            break;
        case "help":
            saveInHistory();
            help(stringInWords);
            break;
        case "clear":
            saveInHistory();
            clear();
            break;
        case "man":
            saveInHistory();
            man(stringInWords[2]);
            break;
        case "JS":
            JSCommand(stringInWords[2])
            saveInHistory();
            break;
        case "mv":
            mv(stringInWords)
            saveInHistory();
            break;
        default:
            newtextArea();
            document.getElementById(contador).value="Invalid command madafaka, try again";
    }
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

        lsCommand(currentPathcopy); // listo la ruta -> imprimo carpetas y archivos que haya en el directorio actual

        let goto_variable = "goinginfolders";
        let var_continue = true;

        while (currentPathcopy.length >= currentPath.length && var_continue== true){
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
        setSize();
        let listToSort = [];
        let nameSorts = [];
        for (let index = 0; index < eval(currentPath).folders.length; index++) {
            listToSort.push(eval(currentPath).folders[index]);
        }
        console.log(listToSort);

        listToSort.sort(function (a, b) {
            if (a.size < b.size) {
              return 1;
            }
            if (a.size > b.size) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          listToSort.forEach(element => {
            nameSorts.push(element.name);
          });

        for (let index = 0; index < eval(currentPath).files.length; index++) {
            nameSorts.push(eval(currentPath).files[index].name);
        }

        newtextArea();
        document.getElementById(contador).value = nameSorts.join(" ");
    }


    /* OPCION t */
    if (option == "-t") {
        let itemsToSort = [];
        let nameSortsbyTime = [];
        
        for (let index = 0; index < eval(currentPath).folders.length; index++) {
            itemsToSort.push(eval(currentPath).folders[index]);
        }
        for (let index = 0; index < eval(currentPath).files.length; index++) {
            itemsToSort.push(eval(currentPath).files[index]);
        }
        console.log(itemsToSort);

        itemsToSort.sort(function (a, b) {
            if (a.time < b.time) {
              return 1;
            }
            if (a.time > b.time) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });

          itemsToSort.forEach(element => {
            nameSortsbyTime.push(element.name);
          });
          newtextArea();
        document.getElementById(contador).value = nameSortsbyTime.join(" ");

    }
}

function setSize() {
    let currentPathcopy = currentPath; //copio la ruta desde donde se ha llamado a la funcion

    let goto_variable = "goinginfolders";
    let var_continue = true;

    let size = 0;

    while (currentPathcopy.length >= currentPath.length && var_continue== true) //
{
switch (goto_variable)
{
    case "goinginfolders": 
        while (eval(currentPathcopy).folders.length > 0) { // si hay carpetas me voy metiendo hasta que llegue a una que no tenga carpetas dentro
                currentPathcopy += `.folders[0]`;
        }
        if (eval(currentPathcopy).folders.length == 0) { //cuando no haya carpeta
            //entro en una carpeta que no hay carpetas y cuento los archivos que tiene
            eval(currentPathcopy).size = eval(currentPathcopy).files.length;
            goto_variable = "readPositionFolder";
        }
        break;

    case "readPositionFolder":
        let lastfolderposition = currentPathcopy.charAt(currentPathcopy.length - 2);
        let nextfolderposition = parseInt(lastfolderposition) + 1;
        if (currentPathcopy.length > currentPath.length) {
            currentPathcopy = currentPathcopy.slice(0, -11);
        } //voy al nivel superior

        if (nextfolderposition < eval(currentPathcopy).folders.length) {  //si el numero de carpetas de ese nivel es mayor a la posicion de la ultima
            currentPathcopy += `.folders[`+ nextfolderposition +`]`;
            goto_variable = "goinginfolders";
        } else if  (nextfolderposition >= eval(currentPathcopy).folders.length){
            eval(currentPathcopy).size = 0;
            for (let index = 0; index < eval(currentPathcopy).folders.length; index++) {
                eval(currentPathcopy).size = eval(currentPathcopy).size + eval(currentPathcopy).folders[index].size;
            }
            eval(currentPathcopy).size = eval(currentPathcopy).size + eval(currentPathcopy).files.length;
            goto_variable = "readPositionFolder";
        } 
        if (currentPathcopy.length <= currentPath.length) {
            var_continue = false;
        }
        console.log(var_continue);
        break;
}
}
console.log(eval(currentPathcopy));
currentPath = currentPathcopy;
//directoryTree = eval(currentPathcopy);
}

function man (command) {
    let manCommand = ["pwd","ls","echo","cat","mkdir","pwd","mv", "clear"];
    let validCommand = false;
    manCommand.forEach(element => {
        if (command == element ) {
            document.getElementById("textsArea-container").style.display = "none";
            document.getElementById(command).style.display = "block";
            validCommand = true;
            window.onkeypress = function(e) {
            if (e.keyCode == 113) {
                document.getElementById("textsArea-container").style.display = "flex";
                document.getElementById(command).style.display = "none";
            }};
        }
        });
        if (validCommand == false) {
            newtextArea();
            document.getElementById(contador).value = "There is no information about " + command + " command."
        };
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


function JSCommand(jsDocumentName) {
    let myHTML = document.getElementById("body").innerHTML;
    searchFile(jsDocumentName);
    let myJScode = searchFile(jsDocumentName);
    alert (myJScode)
    let myErrorControl = `<script>
    try {
      ` + eval(myJScode) + `
    }
    catch(err) {
        newtextArea();
        document.getElementById(contador).value= err.mensage;
    }
    </script>`;

    document.getElementById("body").innerHTML = myHTML + myErrorControl;
}

function searchFile(jsDocumentName) {
    alert(jsDocumentName)
    let pathSearch = 'directoryTree';
    let finded = false;
    let startposition = 0;
    let folderposition = startposition;
    let mycodetorun = "";
    let key = "compareFiles";
    while (finded === false) {
        switch (key) {
            case "compareFiles":
                alert("entra caso1")
                eval(pathSearch).files.forEach(element => {
                    alert(element.name)
                    if (element.name == jsDocumentName) {
                        alert("encontrado");
                        alert(element.content);
                        finded = true;
                        mycodetorun = element.content;
                    }
                });
                if (finded === false) {
                    if (folderposition < eval(pathSearch).folders.length - 1) {
                        key = "nextFolder";
                    } else {
                        key = "changeFolder";
                    }
                }

                break;
        
            case "changeFolder":
                pathSearch.slice(0, -11);
                pathSearch += `.folders[`+ startposition +`]`;
                pathSearch += `.folders[0]`
                key="compareFiles";
                break;
            case "nextFolder":
                let folderposition = pathSearch.charAt(currentPathcopy.length - 2);
                let nextfolderposition = parseInt(folderposition) + 1;
                pathSearch.slice(0, -11);
                pathSearch += `.folders[`+ nextfolderposition +`]`;
                key = "compareFiles";
                break;
        }
    }
    alert("my code: "+mycodetorun)
    return mycodetorun;
}

function help(stingInWords){
    console.log(stingInWords);
    if(stingInWords.length>3){
        newtextArea();
        document.getElementById(contador).value="Invalid command madafaka, try again";
    }
    else if(stingInWords.length===3){
        specificHelp(stingInWords[2])
    }
    else if(stingInWords.length===2){
        newtextArea();
        var helpText=" Browser terminal develop with assembler.";
        document.getElementById(contador).value=helpText;
        newtextArea( );
        helpText=" These shell commands are simulation of interacting with a SO terminal.";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText=" Type 'help name' to find out more about the command 'name'.";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText=" Use 'man' to more detailed explanarion.";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText=" List of avaliable commands:";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  cd [] [..] [relativepath] [absolutepath]";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  echo []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  pwd []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  ls []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  mkdir []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  cat []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  rm []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  mv []";
        document.getElementById(contador).value=helpText;
        newtextArea();
        helpText="  clear []";
        document.getElementById(contador).value=helpText;
    }
    else{
        alert("bug")
    }
}

function specificHelp(commandToHelp) {
    console.log(commandToHelp);
    switch(commandToHelp){
        case "pwd":
            newtextArea();
            var helpText="  fot a detailed information type 'man pwd'";
            document.getElementById(contador).value=helpText;
            break;
        case "cd":
            newtextArea();
            helpText="  fot a detailed information type 'man cd'";
            document.getElementById(contador).value=helpText;
            break;
        case "echo":
            newtextArea();
            helpText="  fot a detailed information type 'man echo'";
            document.getElementById(contador).value=helpText;
            break;
        case "mkdir":
            newtextArea();
            helpText="  fot a detailed information type 'man mkdir'";
            document.getElementById(contador).value=helpText;
            break;
        case "rm":
            newtextArea();
            helpText="  fot a detailed information type 'man rm'";
            document.getElementById(contador).value=helpText;
            break;
        case "cat":
            newtextArea();
            helpText="  fot a detailed information type 'man cat'";
            document.getElementById(contador).value=helpText;
            break;
        case "ls":
            newtextArea();
            helpText="  fot a detailed information type 'man ls'";
            document.getElementById(contador).value=helpText;
            break;
        default:
            newtextArea();
            document.getElementById(contador).value="Invalid command, please try again";
    }
}
// Command Clear

function clear(){
    let $textAreas = document.querySelectorAll('textarea')

    $textAreas.forEach(e => {
            e.remove()
    });


}
function getAbsolutePath(str){
    
    
    let absPath = 'directoryTree.folders'
    let index = 0
    
    strSplit = str.split('/')
    
    strSplit.forEach((e,i) => {
        eval(absPath).forEach((el,ind) => {
            if (e === el.name) {
                if (i < strSplit.length-1) {
                    absPath += `[${ind}].folders`       
                }
                index = ind
            }
        });
    });
    let ret = [absPath,index]
    return ret
}
function rm(string){
    
    let routeDel = string[3]

    if (routeDel.includes('/')) {
        //reuta absoluta
        let info = getAbsolutePath(routeDel)
        console.log(info);
        switch (string[2]) {
            case '-r':
                eval(info[0]).splice(info[1],info[1]+1)

                break;
            case '-R':
                eval(info[0]).splice(info[1],info[1]+1)

                break;
            case '-d':               
                    eval(info[0]).splice(info[1],info[1]+1)
     
                break;
                
            default:
                newtextArea()
                document.getElementById(contador).value="The extension of this command doesn't exist"
                break;
        }

    }else{
        //ruta relativa
        switch (string[2]) {
            case '-r':
                currentPath += '.folders'
                let x = false
                eval(currentPath).forEach((e,i) => {
                    if (e.name === routeDel) {
                        eval(currentPath).splice(i,i+1)
                        x = true
                    }
                    if (!x) {
                        newtextArea()
                        document.getElementById(contador).value="This folder doesn't exist"
                    }
                });    
                break;
            case '-R':
                currentPath += '.folders'
                
                eval(currentPath).forEach((e,i) => {
                    if (e.name === routeDel) {
                        eval(currentPath).splice(i,i+1)
                    }
                });    
                break;
            case '-d':
                if (eval(currentPath).folders.length>0 || eval(currentPath).files.length>0) {
                    newtextArea()
                    document.getElementById(contador).value='This is not an empty directory'
                }else{
                    currentPath += '.folders'
                    console.log(currentPath);
                    console.log(routeDel);
                    eval(currentPath).forEach((e,i) => {
                        if (e.name === routeDel) {
                            eval(currentPath).splice(i,i+1)
                        }
                    });       
                }
                break;
            
            default:
                newtextArea()
                document.getElementById(contador).value="The extension of this command doesn't exist"
                break;
        }

    }



}
function mv(string){

    
    switch (string[2]) {
        case '-f':
            let move = getAbsolutePath(string[3])
            let destiny = getAbsolutePath(string[4])

            let getArray = `${move[0]}[${move[1]}]`
            //let array = eval(getArray)
            const clon =getArray

            console.log(clon);

            console.log(destiny[0]);

            eval(destiny[0]).push(eval(clon))
            //destiny.push(clon)

            //directoryTree.folders[1].folders.push(directoryTree.folders[0].folders[0])

           //  eval(move[0]).splice(move[1],move[1]+1)
            // eval(destiny[0])
            setLocalStorage()
            break;
    
        default:
            break;
    }
}


