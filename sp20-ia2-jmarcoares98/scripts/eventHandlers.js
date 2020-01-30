//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    document.getElementById("displayDataModeDiv").style.display = "none";
    document.getElementById("addDataModeDiv").style.display = "none";

    document.getElementById("loginModeDiv").style.display = "block";
    //Clear all text from email and password fields
    //TO DO: Fill in

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "welcome to my app";

    //Hide the bottom bar initially
    document.getElementById("bottomBar").style.visibility = "hidden";

    //Hide all menu items except for items of current mode:
    //TO DO: Fill in

    //Disable menu button:
    document.getElementById("menuBtn").disabled = true;

    //Set current mode
    mode = "loginMode";

    //set the input focus to the email field
    //TO DO: Fill in
  }

  //document click: When the user clicks anywhere in the doc and the menu is open
  //we need to close it and toggle menu state variable.
  document.addEventListener("click",function(e) {
    if (menuOpen) {
      document.getElementById("menuBtnIcon").classList.remove("fa-times"); 
      //Change hamburger to X when menu open
      document.getElementById("menuBtnIcon").classList.add("fa-bars");
      document.getElementById("sideMenu").style.width = "0px"; //close menu
      menuOpen = false;
    }
});
 
//menuBtn click: When the top-left side menu button is clicked and the menu
//is closed, we need to open it and toggle menu state variable.
document.getElementById("menuBtn").addEventListener("click",function(e) {
  if (!menuOpen) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    e.stopPropagation();
  }
});   

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially
//need to toggle the mode.
var bottomBarBtnClick = function() {
  if (mode != this.id) {
    //this changes the mode buttons
    document.getElementById(mode).classList.remove("menuItemSelected");
    document.getElementById(mode + "Div").style.display = "none";
    //document.getElementById(mode + "Menu").style.display = "none";
    this.classList.add("menuItemSelected");
    //let menuItems = document.getElementsByClassName(mode + "Item");
    //not displaying the other modes or changing pages
    //for (let i = 0; i < menuItems.length; ++i) {
    //  menuItems[i].style.display = "none";
    //}
    //this is where the changes happen when switching modes to current mode
    mode = this.id;
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    document.getElementById(mode + "Div").style.display = "block";
    //document.getElementById(mode + "Menu").style.display = "block";
    //menuItems = document.getElementsByClassName(mode + "Item");
    //for (let i = 0; i < menuItems.length; ++i) {
    //  menuItems[i].style.display = "block";
    //}
  }
}

//login -- This function sets the initial app state after login. It is called
//from setTimeout after the button spinner has commenced.bottombar
function login() {
  //Stop spinner
  document.getElementById("loginBtnIcon").classList.remove("fas","fa-spinner","fa-spin");
  
  //Enable menu button:
  document.getElementById("menuBtn").disabled = false;

  //Show bottom bar buttons and highlight feed mode button
  document.getElementById("bottomBar").style.visibility = "visible";
  document.getElementById("displayDataMode").classList.add("menuItemSelected");
  document.getElementById("addDataMode").classList.remove("menuItemSelected");
  
  //Set mode to current mode
  mode = "displayDataMode";

  //Change title bar to that of app start page
  document.getElementById("topBarTitle").textContent = modeToTitle[mode];
 
  //Show only the menu items for current mode
  //TO DO: Fill in

  //hide login screen and show feed screen
  document.getElementById("loginModeDiv").style.display = "none";
  document.getElementById(mode + "Div").style.display = "block";
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password. To log in, we
//switch the mode to "feedMode" and make the necessary UI and state changes.

document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,3000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};
  
//logOutBtn click: When the user logs out, we need to reset the app to its start
//state, with the login page visible
document.getElementById("logOutBtn").onclick = function(e) {
  //Restore starting app state
  startUp();
};