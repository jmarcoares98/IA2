//Start-up functions run when page is loaded.
//1. Include the HTML snippets:
includeHTML();
//2. Define global vars and function bindings
//Set up UI state
var menuOpen = false; //Boolean variable to capture the state of the side menu.
var mode = "loginMode"; //Variable captures current UI mode

//Associative array maps modes to page titles
var modeToTitle = {"loginMode": "MARCO ARES IA2: welcome!",
                   "displayDataMode": "MARCO ARES IA2: display data",
                   "addDataMode": "MARCO ARES IA2: add data"
};

//Array of modes for the app, was introduced in class and now implementing
var modes = ["loginMode","displayDataMode", "addDataMode"]; 

//Bind bottomBarBtnClick function to all elements of class bottomBarBtn
var bottomBtns = document.getElementsByClassName("bottomBarBtn");
for (var i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",bottomBarBtnClick);
}
//Execute function to set start state of app
startUp();