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
    if(document.getElementById("interest1").checked){
      interest += document.getElementById("interest1").value + ",";
    }
    if(document.getElementById("interest2").checked){
      interest += document.getElementById("interest2").value + ",";
    }
    if(document.getElementById("interest3").checked){
      interest += document.getElementById("interest3").value + ",";
    }
    if(document.getElementById("interest4").checked){
      interest += document.getElementById("interest4").value + ",";
    }
    if(document.getElementById("interest5").checked){
      interest += document.getElementById("interest5").value + ",";
    }
    let result = setCookie(email, name, surname, username, password, dob, interest, image, 30);
    console.log(result);
    if (result == ""){
      $("#signup-form")[0].reset();
    } else {
      changeToUser(result.split(","));
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
    }
  })
  $("#sbutton").click(function(){
    var value = $("#stext").val().toLowerCase();
    $("#experiences-container .exp-container").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  })
});

function loadImage(image){
  var uploaded_image = "";
  image.addEventListener("change", function(){
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector("#user-pic").src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
  })
}

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
  $(".navbar-button").hide()
  $("#user-username").html(cookie_val[2]);
  $("#user-logged").show();
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
