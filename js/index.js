/*
found this function here 
http://stackoverflow.com/a/26831113
*/

function inViewport($el) {
    var H = $(window).height(),
        r = $el[0].getBoundingClientRect(), t=r.top, b=r.bottom;
    return Math.max(0, t>0? H-t : (b<H?b:H));  
}
var sticky = false;
$(window).on("scroll resize", function(){
  
  if($(window).scrollTop() >= 0) {

    $(".fakeintro").height($(".intro").height());
    
    var window_offset = sticky ? inViewport($('.fakeintro')) : inViewport($('.intro')); 
    $(".overlay").height(window_offset);
    $(".caption").css("bottom", (window_offset / 4) );
    //console.log($(window).scrollTop()+" "+inViewport($('.fakeintro'))+" "+inViewport($('.intro'))+" "+sticky);
  
    if(window_offset<50) {
      sticky = true;
      $(".fakeintro").css("position", "relative");
      $(".intro").css({
        "position": "fixed",
        "top": -($(".intro").height()-50)
      });
    } else {
      $(".intro").css({
        "position": "relative",
        "top": 0
        //"top": -($(".intro").height()-50)
      });
      $(".fakeintro").css("position", "fixed");
      sticky = false;
    }

  };
  
});

setTimeout(function(){
  $(window).scroll();
}, 550);

//alert("5");
console.log("Reloaded 9");

