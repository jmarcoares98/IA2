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
    document.getElementById("emailInput").value = "";
    document.getElementById("passwordInput").value = "";

    //Set top bar text
    document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: welcome!";

    //Hide the bottom bar initially
    document.getElementById("bottomBar").style.visibility = "hidden";

    //Disable menu button:
    document.getElementById("menuBtn").disabled = true;

    //Set current mode
    mode = "loginMode";

    //set the input focus to the email field
    document.getElementById("emailInput").focus();

    document.getElementById("birthDate").valueAsNumber = 
      Date.now()-(new Date()).getTimezoneOffset()*60000;

    let dataTable = document.getElementById("myDataTable");

    if(!dataTable.rows[1].innerHTML.includes ("colspan")){
      while(dataTable.rows.length > 1 ){
        dataTable.deleteRow(1);
      }

      let newRow = dataTable.insertRow();
      newRow.innerHTML = "<td colspan='4' style='font-style: italic'>no data logged</td>"; 
    }
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

  //hide login screen and show feed screen
  document.getElementById("loginModeDiv").style.display = "none";
  document.getElementById(mode + "MainDiv").style.display = "block";

  //local storage
  let thisUser = document.getElementById("emailInput").value;
  localStorage.setItem("userName",thisUser);

  let data = localStorage.getItem("userData");
  if(data == null) {
    localStorage.setItem("userData",
    JSON.stringify({thisUser : {"name" : {}, "nameCount": 0}})); 
  }
  else{
    data = JSON.parse(data);
    if  (!data.hasOwnProperty(thisUser)) { 
      data[thisUser] = {"name": {}, "nameCount": 0}; 
      localStorage.setItem("userData",JSON.stringify(data));
    }
  }
}

//loginInterface submit: When the login button is clicked, we rely on form
//pattern matching to ensure validity of username and password.
document.getElementById("loginInterface").onsubmit = function(e) {

  //Start spinner:
  document.getElementById("loginBtnIcon").classList.add("fas","fa-spinner","fa-spin");
  setTimeout(login,3000);
  e.preventDefault(); //Prevents form refresh -- the default behavior
};

document.getElementById("dataForm").onsubmit = function(e){
  e.preventDefault();

  document.getElementById("saveIcon").classList.add("fas", "fa-spinner", "fa-spin");
  
  setTimeout(saveData,1000);
}
  
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
   document.getElementById("displayDataModeMainDiv").style.display = "none";
   document.getElementById("addDataDiv").style.display = "block";

   document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: add data";

   document.getElementById("submitBtnLabel").textContent = "save data";

   pageLocked = true;

   document.getElementById("menuBtnIcon").classList.remove("fa-bars");
   document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");

   document.getElementById("bottomBar").classList.add("disabledButton");
}

function saveData(){
  document.getElementById("saveIcon").classList.remove("fa-spinner", "fa-spin");

  let thisUser = localStorage.getItem("userName");
  let data = JSON.parse(localStorage.getItem("userData"));

  let thisData = {}; 

  //store data
  thisData.name = document.getElementById("name").value;
  thisData.birthday = document.getElementById("birthDate").value;

  let submitBtnLabel = document.getElementById("submitBtnLabel").textContent;
  let addNew;

  if(submitBtnLabel == "save data"){
    addNew = true;
    thisData.nameNum = ++(data[thisUser].nameCount);
    data[thisUser].name[thisData.nameNum] = thisData;
  }
  else{
    addNew = false;
    thisData.nameNum = Number(localStorage.getItem("nameIndex"));
  }

  data[thisUser].name[thisData.nameNum] = thisData;

  localStorage.setItem("userData",JSON.stringify(data));

  pageLocked = false;
  document.getElementById("menuBtn").click();

  //clear
  document.getElementById("name").value = "";
  document.getElementById("birthDate").value = Date.now()-(new Date()).getTimezoneOffset()*60000;

  addToDataTable(addNew, thisData.nameNum);
}

function addToDataTable(add, nameIndex){
  let data = JSON.parse(localStorage.getItem("userData"));
  let user = localStorage.getItem("userName");
  let nameData = data[user].name[nameIndex];
  let dataTable = document.getElementById("myDataTable");
  let dataRow;

  if(add){
    if(dataTable.rows[1].innerHTML.includes ("colspan")){
      dataTable.deleteRow(1);
    }

    dataRow = dataTable.insertRow(1);
    dataRow.id = "r-" + nameIndex;
  }
  else{
    dataRow = document.getElementById("r-"+nameIndex);
  }

  dataRow.innerHTML = "<td>" + nameData.name + "</td><td>" +
  nameData.birthday + 
  "<td><button onclick='editName(" + nameIndex + ")'><span class='fas fa-eye'>" +
  "</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
  "<td><button onclick='confirmDelete(" + nameIndex + ")'>" +
  "<span class='fas fa-trash'></span></button></td>";
}

document.getElementById("dataForm").onsubmit = function(e) {
  e.preventDefault(); 
  //Start spinner
  document.getElementById("saveIcon").classList.add("fas", "fa-spinner", "fa-spin");
  //Set spinner to spin for one second, after which saveData will be called
  setTimeout(saveData,1000);
}


//add data clicked by submenu
document.getElementById("addDataModeItem").onclick = function(e) {
  document.getElementById("displayDataModeMainDiv").style.display = "none";
  document.getElementById("addDataDiv").style.display = "block";
  document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: add data";

  document.getElementById("submitBtnLabel").textContent = "save data";

  pageLocked = true;

  document.getElementById("menuBtnIcon").classList.remove("fa-times");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");

  document.getElementById("bottomBar").classList.add("disabledButton");
  e.stopPropagation;
}

document.getElementById("displayDataModeItem").onclick = function(e) {
  document.getElementById("addDataDiv").style.display = "none";
  document.getElementById("displayDataModeMainDiv").style.display = "block";
  document.getElementById("topBarTitle").textContent = "MARCO ARES IA2: display data";
  pageLocked = false;
  document.getElementById("menuBtnIcon").classList.remove("fa-arrow-left");
  document.getElementById("menuBtnIcon").classList.add("fa-bars");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.remove("disabledButton");
}

function confirmDelete(nameIndex) {
  localStorage.setItem("pendingDelete",nameIndex); 
  //Show the modal dialog box
  document.getElementById("deleteNameModal").style.display = "block";
}

function cancelDelete() {
  localStorage.setItem("pendingDelete","");
  document.getElementById("deleteNameModal").style.display = "none";
}

//code from class
function deleteName() {
  document.getElementById("deleteNameModal").style.display = "none";

  let data = JSON.parse(localStorage.getItem("userData"));
  let user = localStorage.getItem("userName");
  let nameIndex = Number(localStorage.getItem("pendingDelete"));
  let row, dataTable, newRow;

  delete data[user].name[nameIndex];
  localStorage.setItem("userData", JSON.stringify(data));

  row = document.getElementById("r-"+ nameIndex);
  row.parentNode.removeChild(row);

  dataTable = document.getElementById("myDataTable");

  if (dataTable.rows.length == 1){
    newRow = dataTable.insertRow();
    newRow.innerHTML = "<td colspan='4' style='font-style: italic'>no data logged</td>"
  }
}

function editName(nameIndex){
  let data = JSON.parse(localStorage.getItem("userData"));
  let user = localStorage.getItem("userName");
  let newData = data[user].name[nameIndex];

  //this is where the update begins
  document.getElementById("name").value = newData.name;
  document.getElementById("birthDate").value = newData.birthday;

  localStorage.setItem("nameIndex", nameIndex);

  document.getElementById("submitBtnLabel").textContent = "update data";
  transitionToLockedPage("addDataDiv", "view/edit")
}

//code from class
function transitionToLockedPage(lockedPageId, lockedPageTitle) {
  document.getElementById(mode + "MainDiv").style.display = "none";
  document.getElementById(lockedPageId).style.display = "block";

  document.getElementById("topBarTitle").textContent = lockedPageTitle;
  pageLocked = true;

  document.getElementById("menuBtnIcon").classList.remove("fa-times");
  document.getElementById("menuBtnIcon").classList.remove("fa-bars");
  document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
  //When pageLocked is true, the bottom bar buttons are disabled
  document.getElementById("bottomBar").classList.add("disabledButton");
}

