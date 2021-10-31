/* This file contains all the functionalities of the webpage*/
// The only thing we were not able to achieve was to save the images in the cookies to retrieve them when logging in
// We tried many different things but it was impossible for us to do it
// The actual functionality is to save the fakepath to the image introduce by the user
var imageUrl = "";
//Global variable to keep track of the added experiences by the user
var numOfDivs = 0;

//General ready function that contains all the functions
$(document).ready(function(){
  // We can sort the experiences of the third section
  $(".container-experiences").sortable({
    helper: "clone",
  })
  //Login open and close buttons
  $("#login-button").click(function(){
    openPopUp("#login-popup")
  })
  $("#login-close").click(function(){
    closePopUp("#login-popup")
  })
  //Signup open and close buttons
  $("#signup-button").click(function(){
    openPopUp("#signup-popup")
  })
  $("#signup-close").click(function(){
    closePopUp("#signup-popup")
  })
  //Godai map open and close buttons
  $("#godai-area").click(function(e){
    e.preventDefault();
    openPopUp("#godai-popup")
  })
  $("#godai-close").click(function(){
    closePopUp("#godai-popup")
  })
  //Burger & Beyond map open and close buttons
  $("#bb-area").click(function(e){
    e.preventDefault();
    openPopUp("#bb-popup")
  })
  $("#bb-close").click(function(){
    closePopUp("#bb-popup")
  })
  //Nusr-et map open and close buttons
  $("#nusr-area").click(function(e){
    e.preventDefault();
    openPopUp("#nusr-popup")
  })
  $("#nusr-close").click(function(){
    closePopUp("#nusr-popup")
  })
  //Third section open and close buttons
  $(".open-with-title").click(function(){
    openPopUp("#godai-popup");
  })
  $(".open-with-img").click(function(){
    openPopUp("#bb-popup");
  })
  //My experiences open and close buttons
  $("#my-experiences").click(function(){
    openPopUp("#my-experiences-popup");
  })
  $("#mexp-close").click(function(){
    closePopUp("#my-experiences-popup");
    $("#mexp-content").css("display", "flex");
    $("#add-exp").css("display", "none");
  })
  // Button to switch to add a new experience
  $("#add-mexp").click(function(){
    $("#mexp-content").css("display", "none");
    $("#add-exp").css("display", "flex");
  })
  //Sign up form
  $("#signup-form").submit(function(e){
    e.preventDefault();
    //Get all the attributes from the form
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let interest = "";
    let image = document.querySelector("#profile-img");
    let filetype = ""
    // Check if profile image was added or not
    if (image.files.length != 0){
      filetype = image.files[0];
    } else {
      filetype = "";
    }
    //Add the images to menu and profile
    addImage(filetype, "#user-pic");
    addImage(filetype, "#profile-pic");
    interest += document.getElementById("interest1").checked + ",";
    interest += document.getElementById("interest2").checked + ",";
    interest += document.getElementById("interest3").checked + ",";
    interest += document.getElementById("interest4").checked + ",";
    interest += document.getElementById("interest5").checked + ",";
    let result = setCookie(email, name, surname, username, password, dob, interest, image.value, 30);
    //Check if the user already exists and if so reset the form 
    // Else show the user menu get the profile for the user and close the popup
    if (result == ""){
      $("#signup-form")[0].reset();
    } else {
      changeToUser(result.split(","));
      getProfile(result.split(","), email);
      closePopUp("#signup-popup");
      $("#signup-form")[0].reset();
    }
  })
  //Login form
  $("#login-b").click(function(){
    let lemail = document.getElementById("lemail").value;
    let lpassword = document.getElementById("lpassword").value;
    //Check if cookie exists and if so close popup and show menu else do nothing
    let checked = checkCookie(lemail, lpassword);
    if (checked != "") {
      changeToUser(checked);
      getProfile(checked, lemail);
    }
  })
  //My profile open and button
  $("#my-profile").click(function(){
    openPopUp("#my-profile-popup");
  })
  //Profile form
  $("#profile-form").submit(function (e){
    e.preventDefault();
    //Get the attributes from the user
    let email = document.getElementById("profile-email").textContent;
    console.log(email);
    let result = getCookie(email);
    result = result.split(",");
    console.log(result);
    let username = document.getElementById("new-username").value;
    let image = document.getElementById("new-img");
    let filetype = ""
    //Check if an image was added by the user 
    if (image.files.length != 0){
      filetype = image.files[0];
    } else {
      filetype = "";
    }
    let interests = "";
    interests += document.getElementById("new-interest1").checked + ",";
    interests += document.getElementById("new-interest2").checked + ",";
    interests += document.getElementById("new-interest3").checked + ",";
    interests += document.getElementById("new-interest4").checked + ",";
    interests += document.getElementById("new-interest5").checked + ",";
    const date = new Date();
    date.setTime(date.getTime() + (30*24*60*60*1000));
    let expires = "expires=" + date.toGMTString();
    let cname = "";
    cname += result[0] + "," + result[1] + ",";
    if (username == ""){
      cname += result[2] + ",";
    } else {
      cname += username + ",";
      $("#user-username").html(username);
    }
    cname += result[3] + "," + result[4] + "," + interests;
    if (image.value != ""){
      cname += image.value;
      //Add image if was introduce by the user and it didn't exist
      addImage(filetype, "#user-pic");
      addImage(filetype, "#profile-pic");
    } else {
      cname += result[10];
    }
    //Update the cookie
    document.cookie = email + "=" + cname +
    ";" + expires + ";path=/";
    document.getElementById("new-username").value = "";
    document.getElementById("new-img").value = "";

  })
  //My profile close button
  $("#profile-close").click(function(){
    closePopUp("#my-profile-popup");
  })
  //Logout functionality
  $("#log-out").click(function(){
    $("#user-pic").attr("src", "./images/default.png");
    $("#profile-pic").attr("src", "./images/default.png");
    logout();
  })
  //Seach button functionality
  $("#sbutton").click(function(){
    var value = $("#stext").val().toLowerCase();
    var showingDivs = 0;
    //We filter by the introduce text when the utton is clicked
    $("#experiences-container .exp-container").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      if ($(this).css("display") != "none"){
        showingDivs += 1;
      }
    });
    //If we end up with 0 showing divs wa show an error message
    if (showingDivs == 0){
      alert("No food experience was founded");
      $("#experiences-container .exp-container").show()
    }
  })
  // When the search is finished and text is erased from the search input all experiences show again 
  $("#stext").on("input", function(){
    var value = $(this).val().toLowerCase();
    if (value == ""){
      $("#experiences-container .exp-container").show()
    }
  })
  //For to add an new experience
  $("#mexp-form").submit(function(e){
    e.preventDefault();
    let title = document.getElementById("mexp-new-title").value;
    let location = document.getElementById("mexp-place").value;
    let desc = document.getElementById("mexp-desc").value;
    let image = document.getElementById("mexp-img");
    let filetype = ""
    //Check if image was introduce although is a required field
    if (image.files.length != 0){
      filetype = image.files[0];
    } else {
      filetype = "";
    }
    //Call to function to add the experience
    addExperience(title, location, desc, filetype);
    //Reset fields
    document.getElementById("mexp-new-title").value = "";
    document.getElementById("mexp-place").value = "";
    document.getElementById("mexp-desc").value = "";
    document.getElementById("mexp-img").value = "";
    $("#mexp-content").css("display", "flex");
    $("#add-exp").css("display", "none");
  })
});

//Code to make map responsive
$('img[usemap]').imageMap();

//Generic function to open popups
function openPopUp(id) {
  $(id).fadeIn("slow");
  $(id).css("display", "flex");
  $("body").css("overflow", "hidden");
}

//Generic function to close popups
function closePopUp(id){
  $(id).fadeOut("slow");
  $(id).css("display", "none");
  $("body").css("overflow", "auto");
}

//Function to hide login and sign up and sho menu
function changeToUser(cookie_val){
  $(".navbar-button").hide();
  $("#user-username").html(cookie_val[2]);
  $("#user-logged").show();
}

//Function to add image when user intruduces it
function addImage(image, id){
  if (image == ""){
    console.log("Enters");
    $(id).attr("src", "./images/default.png");
  } else {
    let reader = new FileReader();

    reader.onloadend = function (){
      imageUrl = reader.result;
      $(id).attr("src", imageUrl);
    }
    reader.readAsDataURL(image);
  }
}

//Function to add a new experience. HTML code structured and commented in the index file
function addExperience(title, location, desc, image){
  //We create a new experience with an id regardding the div number
  let newhtml = '<div class="new-exp" id="experience' + numOfDivs + '">';
  newhtml += '<div class="new-exp-img-container"><img class="new-exp-img" id="expimage' + numOfDivs + '" src="" alt="experience"></div>';
  newhtml += '<div class="new-exp-text"><div class="loc-and-title"><h3 class="new-exp-title">' + title + '</h3><h5>(' + location + ')</h5>';
  //Add an onclick function to the erase button to have a generic function to eliminate each of them and being able to track them after created
  newhtml += '</div><p class="new-exp-desc">' + desc + '</p></div><div class="new-exp-delete" onclick=removeExp("#experience' + numOfDivs + '")>';
  newhtml += '<ion-icon class="del-new-exp" name="trash"></ion-icon></div></div>';

  //Prepend the html text to the experiences container
  $("#list-experiences").prepend(newhtml);
  let id_image = "#expimage" + numOfDivs;
  addImage(image, id_image);

  //Update the global variable
  numOfDivs += 1;

}

//Generic function to remove experiences added by the user
function removeExp(id){
  $(id).remove();
  numOfDivs -= 1;
}

//Function to log out
function logout(){
  confirm("Do you really want to exit?")
  $(".navbar-button").show();
  $("#user-username").html("");
  $("#user-logged").hide();
}

//Function to get the informatio of the profile and add it to the profile container
function getProfile(data, email){
  $("#profile-name").html(data[0]);
  $("#profile-surname").html(data[1]);
  $("#profile-email").html(email);
  $("#profile-dob").html(data[4]);
  if (data[5] == "true"){
    $("#new-interest1").attr("checked", "checked");
  }
  if (data[6] == "true"){
    $("#new-interest2").attr("checked", "checked");
  }
  if (data[7] == "true"){
    $("#new-interest3").attr("checked", "checked");
  }
  if (data[8] == "true"){
    $("#new-interest4").attr("checked", "checked");
  }
  if (data[9] == "true"){
    $("#new-interest5").attr("checked", "checked");
  }

}

//Function to create a new cookie if it does not exists already
function setCookie(email, name, surname, username, password, dob, interests, image, exdays){
  let exists = getCookie(email);
  if (exists == ""){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    let cname = name + "," + surname +
    "," + username + "," + password + "," +
    dob + "," + interests + image;
    document.cookie = email + "=" + cname +
    ";" + expires + ";path=/";
    return cname;
  } else {
    alert("This email already has an account");
    return "";
  }
}

//Function to get a cookie from the list of cookies
function getCookie(email){
  let name = email + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++){
    let c = ca[i];
    while (c.charAt(0) == ' '){
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0){
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//Function to check if a cookie exists when logging in and check if password is the correct one
function checkCookie(email, password){
  let user = getCookie(email);
  if (user == ""){
    alert("There is no account for that user");
    $("#login-form")[0].reset()
    return "";
  } else {
    let passincookie = user.split(",");
    for(let i = 0; i < passincookie.length; i++){
      let s = passincookie[i];
      if (s == password){
        closePopUp("#login-popup");
        $("#login-form")[0].reset()
        return passincookie;
      }
    }
    alert("Incorrect password");
    return "";
  }
}
