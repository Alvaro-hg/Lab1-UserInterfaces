$(document).ready(function(){
  $("#experinces-container").sortable();
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
  $("#signup-form").submit(function(e){
    e.preventDefault()
    console.log("Enters");
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let interest = "";
    let image = document.querySelector("#profile-img").value;
    interest += document.getElementById("interest1").checked + ",";
    interest += document.getElementById("interest2").checked + ",";
    interest += document.getElementById("interest3").checked + ",";
    interest += document.getElementById("interest4").checked + ",";
    interest += document.getElementById("interest5").checked + ",";
    let result = setCookie(email, name, surname, username, password, dob, interest, image, 30);
    console.log(result);
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
    console.log(checked);
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
    let image = document.getElementById("new-img").value;
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
    if (image == ""){
      cname += image;
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
  console.log(data[5]);
  console.log(data[6]);
  console.log(data[7]);
  console.log(data[8]);
  console.log(data[9]);
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
  console.log(exists)
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
