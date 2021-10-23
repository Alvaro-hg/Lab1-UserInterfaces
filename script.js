$(document).ready(function(){
  $("#login-button").click(function(){
    openPopUp("#login-popup")
  })
  $(".close").click(function(){
    closePopUp("#login-popup")
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
