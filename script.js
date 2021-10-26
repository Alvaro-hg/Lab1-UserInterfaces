$(document).ready(function(){
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
  $("#submit-signup").click(function(){
    let email = document.getElementById("email").value;
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let interest = "";
    if(document.getElementById("interest1").checked){
      interest += document.getElementById("interest1").value;
    }
    if(document.getElementById("interest2").checked){
      interest += " " + document.getElementById("interest2").value;
    }
    if(document.getElementById("interest3").checked){
      interest += " " + document.getElementById("interest3").value;
    }
    if(document.getElementById("interest4").checked){
      interest += " " + document.getElementById("interest4").value;
    }
    if(document.getElementById("interest5").checked){
      interest += " " + document.getElementById("interest5").value;
    }
    let result = setCookie(email, name, surname, username, password, dob, interest, 30);
    if (result == 0){
      console.log("Enters");
      $("#signup-form").trigger("reset");
    } else {
      closePopUp("#signup-popup");
    }
  })
  $("#login-b").click(function(){
    let lemail = document.getElementById("lemail").value;
    let lpassword = document.getElementById("lpassword").value;
    console.log("clicked");
    checkCookie(lemail, lpassword);
  })
});

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

function setCookie(email, name, surname, username, password, dob, interests, exdays){
  let exists = getCookie(email);
  if (exists == ""){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toGMTString();
    let cname = name + " " + surname +
    " " + username + " " + password + " " + dob + " " + interests;
    document.cookie = email + "=" + cname +
    ";" + expires + ";path=/";
    return 1;
  } else {
    alert("This email already has an account");
    return 0;
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
  } else {
    let passincookie = user.split(" ");
    for(let i = 0; i < passincookie.length; i++){
      let s = passincookie[i];
      if (s == password){
        closePopUp("#login-popup");
        return 1;
      }
    }
    alert("Incorrect password");
    return 0;
  }
}
