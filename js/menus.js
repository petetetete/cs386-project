function changePage(toPage) {

	// If navigating back
	if (toPage == "back") {
		visitedPages.pop();
		toPage = visitedPages[visitedPages.length - 1];
	}
	else {
		visitedPages.push(toPage);
	}

	// Hide all other pages
	pages.forEach((page) => {
		if (page.dataset.page == toPage) {
			page.style.display = "flex";
		}
		else {
			page.style.display = "none";
		}
	});

	// Conditionally hide back arrow
	if (visitedPages.length == 1) {
		arrow.style.display = "none";
	}
	else {
		arrow.style.display = "block";
	}
}


// Add event listeners to all inputs
[].slice.call(document.querySelectorAll('[data-clear]')).forEach((input) => {
	let value = input.value;
	input.onfocus = (e) => {
		if (e.target.value == value) e.target.value = "";
	}
	input.onblur = (e) => {
		if (!e.target.value) e.target.value = value;
	}
});

// Tracking variables
var arrow = document.getElementById("back");
var pages = [].slice.call(document.getElementsByClassName("page"));
var visitedPages = [];

changePage("home");
