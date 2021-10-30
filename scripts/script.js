var imageUrl = "";
var numOfDivs = 0;

$(document).ready(function(){
  $(".container-experiences").sortable({
    helper: "clone",
  })
  $("#login-button").click(function(){
    openPopUp("#login-popup")
  })
  $("#login-close").click(function(){
    closePopUp("#login-popup")
  })
  $("#signup-button").click(function(){
    openPopUp("#signup-popup")
  })
  $("#signup-close").click(function(){
    closePopUp("#signup-popup")
  })
  $("#godai-area").click(function(e){
    e.preventDefault();
    openPopUp("#godai-popup")
  })
  $("#godai-close").click(function(){
    closePopUp("#godai-popup")
  })
  $("#bb-area").click(function(e){
    e.preventDefault();
    openPopUp("#bb-popup")
  })
  $("#bb-close").click(function(){
    closePopUp("#bb-popup")
  })
  $("#nusr-area").click(function(e){
    e.preventDefault();
    openPopUp("#nusr-popup")
  })
  $("#nusr-close").click(function(){
    closePopUp("#nusr-popup")
  })
  $(".open-with-title").click(function(){
    openPopUp("#godai-popup");
  })
  $(".open-with-img").click(function(){
    openPopUp("#bb-popup");
  })
  $("#my-experiences").click(function(){
    openPopUp("#my-experiences-popup");
  })
  $("#mexp-close").click(function(){
    closePopUp("#my-experiences-popup");
    $("#mexp-content").css("display", "flex");
    $("#add-exp").css("display", "none");
  })
  $("#add-mexp").click(function(){
    $("#mexp-content").css("display", "none");
    $("#add-exp").css("display", "flex");
  })
  $("#signup-form").submit(function(e){
    e.preventDefault();
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let interest = "";
    let image = document.querySelector("#profile-img");
    let filetype = ""
    if (image.files.length != 0){
      filetype = image.files[0];
    } else {
      filetype = "";
    }
    addImage(filetype, "#user-pic");
    addImage(filetype, "#profile-pic");
    interest += document.getElementById("interest1").checked + ",";
    interest += document.getElementById("interest2").checked + ",";
    interest += document.getElementById("interest3").checked + ",";
    interest += document.getElementById("interest4").checked + ",";
    interest += document.getElementById("interest5").checked + ",";
    let result = setCookie(email, name, surname, username, password, dob, interest, image.value, 30);
    if (result == ""){
      $("#signup-form")[0].reset();
    } else {
      changeToUser(result.split(","));
      getProfile(result.split(","), email);
      closePopUp("#signup-popup");
      $("#signup-form")[0].reset();
    }
  })
  $("#login-b").click(function(){
    let lemail = document.getElementById("lemail").value;
    let lpassword = document.getElementById("lpassword").value;
    let checked = checkCookie(lemail, lpassword);
    if (checked != "") {
      changeToUser(checked);
      getProfile(checked, lemail);
    }
  })
  $("#my-profile").click(function(){
    openPopUp("#my-profile-popup");
  })
  $("#profile-form").submit(function (e){
    e.preventDefault();
    let email = document.getElementById("profile-email").textContent;
    console.log(email);
    let result = getCookie(email);
    result = result.split(",");
    console.log(result);
    let username = document.getElementById("new-username").value;
    let image = document.getElementById("new-img");
    let filetype = ""
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
      addImage(filetype, "#user-pic");
      addImage(filetype, "#profile-pic");
    } else {
      cname += result[10];
    }
    document.cookie = email + "=" + cname +
    ";" + expires + ";path=/";
    document.getElementById("new-username").value = "";
    document.getElementById("new-img").value = "";

  })
  $("#profile-close").click(function(){
    closePopUp("#my-profile-popup");
  })
  $("#log-out").click(function(){
    $("#user-pic").attr("src", "./images/default.png");
    $("#profile-pic").attr("src", "./images/default.png");
    logout();
  })
  $("#sbutton").click(function(){
    var value = $("#stext").val().toLowerCase();
    var showingDivs = 0;
    $("#experiences-container .exp-container").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      if ($(this).css("display") != "none"){
        showingDivs += 1;
      }
    });
    if (showingDivs == 0){
      alert("No food experience was founded");
      $("#experiences-container .exp-container").show()
    }
  })
  $("#stext").on("input", function(){
    var value = $(this).val().toLowerCase();
    if (value == ""){
      $("#experiences-container .exp-container").show()
    }
  })
  $("#mexp-form").submit(function(e){
    e.preventDefault();
    let title = document.getElementById("mexp-new-title").value;
    let location = document.getElementById("mexp-place").value;
    let desc = document.getElementById("mexp-desc").value;
    let image = document.getElementById("mexp-img");
    let filetype = ""
    if (image.files.length != 0){
      filetype = image.files[0];
    } else {
      filetype = "";
    }
    addExperience(title, location, desc, filetype);
    document.getElementById("mexp-new-title").value = "";
    document.getElementById("mexp-place").value = "";
    document.getElementById("mexp-desc").value = "";
    document.getElementById("mexp-img").value = "";
    $("#mexp-content").css("display", "flex");
    $("#add-exp").css("display", "none");
  })
});

$('img[usemap]').imageMap();

function openPopUp(id) {
  $(id).fadeIn("slow");
  $(id).css("display", "flex");
  $("body").css("overflow", "hidden");
}

function closePopUp(id){
  $(id).fadeOut("slow");
  $(id).css("display", "none");
  $("body").css("overflow", "auto");
}

function changeToUser(cookie_val){
  $(".navbar-button").hide();
  $("#user-username").html(cookie_val[2]);
  $("#user-logged").show();
}

function addImage(image, id){
  if (image == ""){
    $(id).attr("src", "./image/default.png");
  } else {
    let reader = new FileReader();

    reader.onloadend = function (){
      imageUrl = reader.result;
      $(id).attr("src", imageUrl);
    }
    reader.readAsDataURL(image);
  }
}

function addExperience(title, location, desc, image){
  let newhtml = '<div class="new-exp" id="experience' + numOfDivs + '">';
  newhtml += '<div class="new-exp-img-container"><img class="new-exp-img" id="expimage' + numOfDivs + '" src="" alt="experience"></div>';
  newhtml += '<div class="new-exp-text"><div class="loc-and-title"><h3 class="new-exp-title">' + title + '</h3><h5>(' + location + ')</h5>';
  newhtml += '</div><p class="new-exp-desc">' + desc + '</p></div><div class="new-exp-delete" onclick=removeExp("#experience' + numOfDivs + '")>';
  newhtml += '<ion-icon class="del-new-exp" name="trash"></ion-icon></div></div>';

  $("#list-experiences").prepend(newhtml);
  let id_image = "#expimage" + numOfDivs;
  addImage(image, id_image);

  numOfDivs += 1;

}

function removeExp(id){
  $(id).remove();
  numOfDivs -= 1;
}

function logout(){
  confirm("Do you really want to exit?")
  $(".navbar-button").show();
  $("#user-username").html("");
  $("#user-logged").hide();
}

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
