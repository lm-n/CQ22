// When the user clicks the about, open the modal 
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

$('#about a').click(function(){
	modal.style.display = "block";    
});
$('#close').click(function(){
	modal.style.display = "none";  
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let projects, cols = [];

//Function to genrerate HTML string
function makeQuilt(theData){
	for (let i = 0; i < 4; i++) {
		$('#quilt').append('<div class="column" id="column'+ i +'"></div>');
	}
	column = 1;
	for (i in projects){
		if (column === 4){
			column = 0;
		}
		let randomColor = Math.floor(Math.random()*16777215).toString(16);
		//let projectId = projects[i]
		$("#column" + column).prepend('<a href="https://scratch.mit.edu/projects/'+ i +'" target="_blank" ><img src="/image/'+ i +'.png" alt="' + projects[i] + ' Scratch project" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');
		column++;
	}
	let randomColor = Math.floor(Math.random()*16777215).toString(16);
	$("#column0").prepend('<a href="https://scratch.mit.edu/studios/27961716/projects/" target="_blank" ><img src="codeQuilt3.png" alt="a quilt where every patch is a scratch project" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');

}

//Function to get data via the server's JSON route
function getAPIData(studio){
	$.ajax({
		url: '/api20/' + studio,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			//console.log(data);
			projects = data;
			makeQuilt();
		}
	});
}

$(document).ready(function(){
	let studio = '27961716';
	//let studio = '27958137'; 
	getAPIData(studio);
});