var contador = 0;
newtextArea();

function newtextArea() {
    contador ++;
    var textareaElement = document.createElement("TEXTAREA");
    var textareaContent = document.createTextNode("~$ ");
    textareaElement.appendChild(textareaContent);
    var parentNode = document.getElementById("textsArea-container");
    var newElement = parentNode.appendChild(textareaElement);
    newElement.setAttribute("id", contador);
    newElement.setAttribute("cols", 100);
    newElement.setAttribute("rows", 1);
    newElement.setAttribute("name", "line" + contador);
    newElement.addEventListener('keydown', autosize);
    newElement.addEventListener('keydown', autowrite);
    newElement.addEventListener('keydown', preventDeleteDefaultText);

    setCursorPosition(newElement, newElement.value.length);
    
}

function autosize(){
  var el = this;
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}

function autowrite(e){
    if (e.keyCode == 13) {
        e.preventDefault();
        this.removeEventListener('keydown', autowrite);
        this.removeEventListener('keydown', autosize);
        this.setAttribute("readonly", true);
        checkValidCommand();
        newtextArea();
        }
}


function setCursorPosition(ctrl, pos) {
    // Modern browsers
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    // IE8 and below
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
}

function preventDeleteDefaultText(e){
    if (e.keyCode == 8 && this.value.length <=2) {
        e.preventDefault();
    }
}