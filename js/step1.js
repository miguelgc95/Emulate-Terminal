var contador = 0;
var path = "/root"; //a dinamic string where to store the current work folder
var keyCounter = 0;
newtextArea();

function newtextArea() {
	contador++;
	var textareaElement = document.createElement("TEXTAREA");
	var textareaContent = document.createTextNode(`[${path}]$ `);
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
	newElement.addEventListener("keydown", moveOnHistory);
	setCursorPosition(newElement, newElement.value.length);
}

function autosize() {
	var el = this;
	setTimeout(function () {
		el.style.cssText = 'height:auto; padding:0';
		el.style.cssText = 'height:' + el.scrollHeight + 'px';
	}, 0);
}

function autowrite(e) {
	if (e.keyCode == 13) {
		e.preventDefault();
		keyCounter = 0;
		this.removeEventListener('keydown', moveOnHistory)
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

function preventDeleteDefaultText(e) {
	if (e.keyCode == 8 && this.value.length <= path.length + 4) {
		e.preventDefault();
	}
}

function setCursorWhenClick() {
	setCursorPosition(document.getElementById(contador), document.getElementById(contador).value.length);
}

function moveOnHistory(e) {
	var h = JSON.parse(localStorage.getItem("history"));
	//keyCode===38 es flecha arriba,keyCode===40 es pabajo
	if (e.keyCode == 38 || e.keyCode == 40) {
		e.preventDefault();
	}
	if (e.keyCode == 38 && keyCounter < h.length) {
		keyCounter += 1;
		var hh = h[h.length - keyCounter]
		document.getElementById(contador).value = `[${path}]$ `+hh;
	} else if (e.keyCode == 40 && keyCounter > 0) {
		keyCounter -= 1;
		var hh = h[h.length - keyCounter];
		if (keyCounter === 0) {
			hh = h[h.length - keyCounter - 1];
		}
		document.getElementById(contador).value = `[${path}]$ `+hh;
	}
}

document.getElementById("textsArea-container").addEventListener("click", setCursorWhenClick);