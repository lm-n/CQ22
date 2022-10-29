let studio = '30322945';
//let studio = '30053065';
//let studio = '27961716';

// When the user clicks the about, open the modal 
let aboutModal = document.getElementById("about");
let guideModal = document.getElementById("guide");
// Get the <span> element that closes the modal
let spanAbout = document.getElementById("closeAbout");
let spanGuide = document.getElementById("closeGuide");

$('#aboutm a').click(function(){
	aboutModal.style.display = "block";    
});
$('#guidem a').click(function(){
	guideModal.style.display = "block";    
});

$('#close').click(function(){
 aboutModal.style.display = "none";
});

$('#closeg').click(function(){
 guideModal.style.display = "none"; 
});


function closeGuide(){
	guideModal.style.display = "none"; 
}

// When the user clicks on <span> (x), close the modal
spanAbout.onclick = function() {
  aboutModal.style.display = "none";
}

spanGuide.onclick = function() {
  guideModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == aboutModal) {
    aboutModal.style.display = "none";
  }
  if (event.target == guideModal) {
    guideModal.style.display = "none";
  }
}

///////student guide////
let steps = 0;
let CQguide = [
"<h2>1. Think</h2><ul><li>What comes to mind when you think about coding or computer programming?</li><li>What comes to mind when you think about coders or computer programmers?</li><li>How do you imagine the world can change for the better if who or what we program changes? </li></ul><a target='_blank' class='center' id='seeOnDocs' href='https://docs.google.com/document/d/1cqmNMMAiV9OtVDonzAKtBK5hd9yZB-g7gD2Ce3D3Xis/edit?usp=sharing'>View Guide on Google Docs</a>",
"<h2>2. Watch</h2><div class='yt'><<iframe id='ytplayer' type='text/html' width='720' height='405' src='https://www.youtube.com/embed/UwVIUzcxwj4'frameborder='0' allowfullscreen>></div>",
"<h2>3. Checkout the quilt</h2><p>Take a look at what the CodeQuilt looks like so far. What are the different designs and ideas represented? What is missing?</p> <a id='close' href='javascript:closeGuide()'>Explore Quilt</a>",
"<h2>4. Make a patch</h2><h3>Plan</h3><p>What do you want to add to the quilt? Talk to your peers and come up with new ideas. Remember you can always take a look at the quilt to find inspiration in what other people have already created. As you plan consider the following<ul><li>What do you want the future of computing to look like?</li><li>What is your own personal history with computing? What do you want your personal future with computing to look like?</li><li>Who is missing from the story of computing/coding?</li></ul></p>",
"<h2>4. Make a patch</h2><h3>Code</h3><p>Open the <a target='_blank' href='https://scratch.mit.edu/projects/572730407/'>Scratch starter project</a> and start coding. If it’s the first time you’re using Scratch make sure you take a look at the <a target='_blank' href='https://scratch.mit.edu/projects/editor/?tutorial=getStarted'>getting started tutorial</a>.</p>",
"<h2>5. Share [Optional]</h2><h3>Add your project to the Scratch Studio.</h3>Projects added to the studio will automatically appear in the quilt. To add projects to the studio you must create a Scratch account and have access to an email address you can use to confirm their account. Before adding any project to the studio, make sure you share your project.",
"<h2>6. Reflect</h2><p>Go to the “Notes and credits” of your Scratch project and add 1-2 sentences explaining why you made the project. What new stories are we seeing? Which stories are still missing? Take a look at the quilt again and think:<ul><li>What do you see across all the stories?</li><li>Anything standing out? Anything still missing?</li><li>What are 1-2 things you learned making Scratch patches for the quilt?</li></ul></p>"
];
function setGuide(){
	$("#step").append(CQguide[steps]);
	$("#menu").append("<div id='bholder'></div><button id='next' class='button' onclick='next()'>Next</button>");
	steps = 1;
}
function next(){
		if(steps === 0){
			steps = 1;
		}
		if (steps===1){
			$("#bholder").replaceWith("<button id='back' class='button' onclick='back()'>Back</button>");
		}
		$("#step").replaceWith("<div id='step'>"+CQguide[steps]+"</div>");
		if(steps === CQguide.length-1){
			$("#next").replaceWith("<button id='closeSGuide' class='button' onclick='closeGuide()'>Close</button>");
		}else{
			steps = steps + 1;
		}
}
function back(){
	
		if(steps === CQguide.length-1){
			steps = steps -1;
		}
		if(steps === CQguide.length-2){
			$("#closeSGuide").replaceWith("<button id='next' class='button' onclick='next()'>Next</button>");
		} 
		$("#step").replaceWith("<div id='step'>"+CQguide[steps]+"</div>");
		if (steps === 0){
			$("#back").replaceWith("<div id='bholder'></div>");
		} else {
			steps = steps - 1;
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
		//$("#column" + column).prepend('<a href="https://scratch.mit.edu/projects/'+ i +'" target="_blank" ><img src="/image/'+ i +'.png" alt="' + projects[i] + ' Scratch project" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');
		//$("#column" + column).prepend('<a href="https://scratch.mit.edu/projects/'+ projects[i][0] +'" target="_blank" ><img src="/image/'+ projects[i][0] +'.png" alt="' + projects[i][1] + ' Scratch project" style="width:100%"></a>');
		$("#column" + column).prepend('<a href="https://scratch.mit.edu/projects/'+ projects[i][0] +'" target="_blank" ><img src="https://uploads.scratch.mit.edu/projects/thumbnails/'+ projects[i][0] +'.png" alt="' + projects[i][1] + ' Scratch project" style="width:100%"></a>');
		column++;
	}
	let randomColor = Math.floor(Math.random()*16777215).toString(16);
	$("#column0").prepend('<a href="https://scratch.mit.edu/studios/'+ studio +'/projects/" target="_blank" ><img src="https://www.dsk.lm-n.xyz/codeQuilt/images/codeQuilt3.png" alt="a quilt where every patch is a scratch project" style="width:100%"></a>');
	//$("#column0").prepend('<a href="https://scratch.mit.edu/studios/'+ studio +'/projects/" target="_blank" ><img src="codeQuilt3.png" alt="a quilt where every patch is a scratch project" style="width:100%;outline:2px dashed #' + randomColor + ';outline-offset: -10px;"></a>');

}

//Function to get data via the server's JSON route
function getAPIData(studio){
	$.ajax({
		url: '/api/' + studio,
		type: 'GET',
		dataType: 'json',
		error: function(data){
			console.log(data);
			alert("Oh No! Try a refresh?");
		},
		success: function(data){
			projects = data;
			makeQuilt();
		}
	});
}

$(document).ready(function(){
	getAPIData(studio);
	setGuide();
});