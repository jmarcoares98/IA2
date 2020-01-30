//
//eventHandlers.js -- This file defines the JavaScript functions necessary to
//update the app in response to user interaction.
//


  //startUp -- This function sets up the initial state of the app: Login page is
  //visible, bottom bar is invisible, all menu items invisible except feed items,
  //menu bottom disabled, UI mode = login
  function startUp() {
    //Hide all pages except for Login Page, which is the start page.
    document.getElementById("displayDataModeMainDiv").style.display = "none";
    document.getElementById("underConstructionModeMainDiv").style.display = "none";
    document.getElementById("underConstructionModeMenu").style.display = "none";
    document.getElementById("addDataDiv").style.display = "none";

    document.getElementById("loginModeDiv").style.display = "block";
    //Clear all text from email and password fields
    //TO DO: Fill in

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: welcome!";

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
  if (!menuOpen && !pageLocked) {
    document.getElementById("menuBtnIcon").classList.remove("fa-bars"); 
    //Change hamburger to X when menu open
    document.getElementById("menuBtnIcon").classList.add("fa-times");
    document.getElementById("sideMenu").style.width = "250px"; //open up menu
    menuOpen = true;
    e.stopPropagation();
  }
  if(pageLocked) {
    document.getElementById("addDataDiv").style.display = "none";
    document.getElementById("displayDataModeMainDiv").style.display = "block";
    document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: display data";
    pageLocked = false;
    document.getElementById("menuBtnIcon").classList.remove("fa-arrow-left");
    document.getElementById("menuBtnIcon").classList.add("fa-bars");
    //When pageLocked is true, the bottom bar buttons are disabled
    document.getElementById("bottomBar").classList.remove("disabledButton");
  }
});   

//bottomBarBtnClick -- When a button in the bottom bar is clicked, we potentially
//need to toggle the mode.
var bottomBarBtnClick = function() {
  if (mode != this.id) {
    //this changes the mode buttons
    document.getElementById(mode).classList.remove("menuItemSelected");
    document.getElementById(mode + "MainDiv").style.display = "none";
    document.getElementById(mode + "Menu").style.display = "none";
    this.classList.add("menuItemSelected");
    let menuItems = document.getElementsByClassName(mode + "Item");
    //not displaying the other modes or changing pages
    for (let i = 0; i < menuItems.length; ++i) {
      menuItems[i].style.display = "none";
    }
    //this is where the changes happen when switching modes to current mode
    mode = this.id;
    document.getElementById("topBarTitle").textContent = modeToTitle[mode];
    document.getElementById(mode + "MainDiv").style.display = "block";
    document.getElementById(mode + "Menu").style.display = "block";
    menuItems = document.getElementsByClassName(mode + "Item");
    for (let i = 0; i < menuItems.length; ++i) {
      menuItems[i].style.display = "block";
    }
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
  document.getElementById("underConstructionMode").classList.remove("menuItemSelected");
  
  //Set mode to current mode
  mode = "displayDataMode";

  //Change title bar to that of app start page
  document.getElementById("topBarTitle").textContent = modeToTitle[mode];
 
  //Show only the menu items for current mode
  //TO DO: Fill in

  //hide login screen and show feed screen
  document.getElementById("loginModeDiv").style.display = "none";
  document.getElementById(mode + "MainDiv").style.display = "block";
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

//aboutBtn click:
var aboutOpen = false;
document.getElementById("aboutBtn").onclick = function(e) {
  if(!aboutOpen){
    document.getElementById("aboutModal").style.display = "block"
    aboutOpen = true;
  }
};

//closing the about dialog
document.getElementById("modalClose").onclick = function(e) {
  document.getElementById("aboutModal").style.display = "none";
  aboutOpen = false;
}
document.getElementById("modalClose2").onclick = function(e) {
  document.getElementById("aboutModal").style.display = "none";
  aboutOpen = false;
}

//add data clicked by plus circle
document.getElementById("floatBtn").onclick = function(e) {
   //Swap pages:
   document.getElementById("displayDataModeMainDiv").style.display = "none";
   document.getElementById("addDataDiv").style.display = "block";
   //Change page title:
   document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: add data";
   //Set label of form button appropriately
   document.getElementById("submitBtnLabel").textContent = "save data";
   //Set pageLocked to true, thus indicating that we're on a page that may only
   //be exited by clicking on the left arrow at top left
   pageLocked = true;
   //When pageLocked is true, the menu  icon is the left arrow
   document.getElementById("menuBtnIcon").classList.remove("fa-bars");
   document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
   //When pageLocked is true, the bottom bar buttons are disabled
   document.getElementById("bottomBar").classList.add("disabledButton");
}

//add data clicked by submenu
document.getElementById("addDataModeItem").onclick = function(e) {
  //Swap pages:
  document.getElementById("displayDataModeMainDiv").style.display = "none";
  document.getElementById("addDataDiv").style.display = "block";
  //Change page title:
  document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: add data";
  //Set label of form button appropriately
  document.getElementById("submitBtnLabel").textContent = "save data";
  //Set pageLocked to true, thus indicating that we're on a page that may only
  //be exited by clicking on the left arrow at top left
  pageLocked = true;
  //When pageLocked is true, the menu  icon is the left arrow
  document.getElementById("menuBtnIcon").classList.remove("fa-times");
  document.getElementById("menuBtnIcon").classList.remove("fa-bars");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.add("disabledButton");
}

