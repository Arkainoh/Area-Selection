//<!-- element.classList.add("otherclass"); 이거 쓰자-->
//<!-- ELEMENT.classList.remove("CLASS_NAME"); 이것도-->
var imgID = 1;
$('.dragonit').append("<div hidden id='selection' style='background-color:#dddddd; position:absolute'></div><img hidden id='imgReady"+imgID+"' style='position:absolute;border-radius:10px' src='DefaultImage.jpg' ondragenter='onDragEnter(event)' ondragover='onDragOver(event)' ondrop='onDrop(event)' onmousedown='setCurrentElement(this)' ondragstart='return false' onselectstart='return false'/>");
var selectBtn = document.getElementsByClassName('dragonit_select')[0];
var moveBtn = document.getElementsByClassName('dragonit_move')[0];
var deleteBtn = document.getElementsByClassName('dragonit_delete')[0];

selectBtn.onclick = function() { toggleAreaSelection(); }
moveBtn.onclick = function() { toggleAreaMovement(); }
deleteBtn.onclick = function() { toggleAreaDeletion(); }

function onDragEnter(event) {
	//if (event.dataTransfer.dropEffect == "move")
  event.preventDefault();
}

function onDragOver(event) {
  //if (event.dataTransfer.dropEffect == "move")
  event.preventDefault();
}
// onDrop start
function onDrop(event) {                                
  var file = event.dataTransfer.files[0];      

  var dropSpot = event.target;
  
  var imageType = /image.*/;
  var textType = /text.*/;
  var isImage = false;
  var isText = false;
  if(file.type.match(imageType)){
    isImage = true; 
  }
  else if(file.type.match(textType)){
    isText = true;
  } 
           
  var reader = new FileReader();    
  
  reader.onload = (function(aFile) {
    return function(e) {         
      var result = e.target.result;  
      if(isImage) {
        dropSpot.src = result;
      } else if(isText) {
      	 //dropSpot.src = null;
         //dropSpot.innerHTML = result;
         //dropSpot.style.display = 'block';
         //dropSpot.style.overflow = 'hidden';
         window.alert('You dragged a text file!');
      } else {
      	window.alert('Only allows image or text file.');
      }
    };
  })(file);
    
  if(isImage) { reader.readAsDataURL(file); }
  else { reader.readAsText(file,"EUC-KR"); }
    event.stopPropagation();
    event.preventDefault();
}
// onDrop end                    

//dropImage.addEventListener("load", function(e) { }, true);

//flag values
var selectionEnabled = false;
var movementEnabled = false;
var deletionEnabled = false;

var isDragging = false; //check if the user is dragging something

function toggleAreaSelection() {
	if(!movementEnabled && !deletionEnabled) {
    selectionEnabled = selectionEnabled ? false : true; //toggle flag
    //activate the button (toggling)
    if(selectionEnabled) selectBtn.classList.add('active');
    else selectBtn.classList.remove('active');
	}
}

function toggleAreaMovement() {
	if(!selectionEnabled && !deletionEnabled) {
		movementEnabled = movementEnabled ? false : true; //toggle flag
		//activate the button (toggling)
		if(movementEnabled)	moveBtn.classList.add('active');
		else moveBtn.classList.remove('active');
	}
}

function toggleAreaDeletion() {
	if(!selectionEnabled && !movementEnabled) {
		deletionEnabled = deletionEnabled ? false : true;
		//activate the button (toggling)
		if(deletionEnabled) deleteBtn.classList.add('active');
		else deleteBtn.classList.remove('active');
	}
}

var box = document.getElementById('selection'),
x1 = 0, y1 = 0, x2 = 0, y2 = 0,
boxWidth = 0, boxHeight = 0,
initXdiff = 0, initYdiff = 0;
var currentElement = null;

function setCurrentElement(element) {
	if(!isDragging && (movementEnabled || deletionEnabled)) {
		if(element != null)
		  currentElement = element;
	}
}

function setBox() { //Resize the box
  var x3 = Math.min(x1,x2);
  var x4 = Math.max(x1,x2);
  var y3 = Math.min(y1,y2);
  var y4 = Math.max(y1,y2);
  box.style.left = x3 + 'px';
  box.style.top = y3 + 'px';
  boxWidth = x4 - x3;
  boxHeight = y4 - y3;
  box.style.width = boxWidth + 'px';
  box.style.height = boxHeight + 'px';
}

function moveArea() { //Move the selected area
  if(currentElement != null) {
  	var leftValue = parseInt(currentElement.style.left);
  	var topValue = parseInt(currentElement.style.top);
  
  	currentElement.style.left = x2 - initXdiff + 'px';
  	currentElement.style.top = y2 + initYdiff + 'px';
  }
}

function removeArea() { //Remove the selected area
	if(currentElement != null) currentElement.remove();
	//else window.alert("null element cannot be removed.");
}

function setInitDiff() {
  if(currentElement != null) {
  	initXdiff = x1 - parseInt(currentElement.style.left);
  	initYdiff = parseInt(currentElement.style.top) - y1;
  }
}
onmousedown = function(e) {
	isDragging = true; //hold
	if(selectionEnabled) {
    box.hidden = 0;
    x1 = e.clientX;
    y1 = e.clientY;
    setBox();
    
	} else if(movementEnabled) {
		x1 = e.clientX;
		y1 = e.clientY;
		x2 = x1;
		y2 = y1;
		setInitDiff();
		moveArea();
	} else if(deletionEnabled) {
		removeArea();
	}
};
onmousemove = function(e) {
	if(selectionEnabled) {
    x2 = e.clientX;
    y2 = e.clientY;
    setBox();
	} else if(movementEnabled && isDragging) {
		x2 = e.clientX;
		y2 = e.clientY;
		moveArea();
	}
};
onmouseup = function(e) {
	
	isDragging = false; //release
	
  if(selectionEnabled) {
  	box.hidden = 1;
  	
  	if(boxWidth > 30 && boxHeight > 30) {
    	var img_area = document.getElementById("imgReady"+imgID);
    	img_area.style.left = box.style.left;
    	img_area.style.top = box.style.top;
    	img_area.style.width = box.style.width;
    	img_area.style.height = box.style.height;
    	img_area.hidden = 0;
    	toggleAreaSelection();
    	imgID++;
    	$('.dragonit').append("<img hidden id='imgReady"+imgID+"' style='position:absolute;border-radius:10px' src='DefaultImage.jpg' ondragenter='onDragEnter(event)' ondragover='onDragOver(event)' ondrop='onDrop(event)' onmousedown='setCurrentElement(this)' ondragstart='return false' onselectstart='return false'/>"); // Create a new empty image
  	}
  } else if(movementEnabled) {
  	currentElement = null;
  }
};
