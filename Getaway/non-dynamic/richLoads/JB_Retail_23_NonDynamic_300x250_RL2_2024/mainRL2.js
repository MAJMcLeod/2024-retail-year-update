var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl;

//@FT VARIABLE DECLARATIONS
var deploy = true
    showDefault=false,
    thisFeedLoaded=false;

var default_exit = myFT.$("#default_exit");

//@FT Setting local variable values using FT dynamic variables (instantAds)
var ctURL = myFT.instantAds.Retail_default_clickTag_URL;


//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) { 
    return true
  } else {
    return false
  }
}

//@FT Feed data callback function
function feedLoaded(feed){
  if(!thisFeedLoaded){
    thisFeedLoaded=true;

    try{
      ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feedItems[0]['url'];
    }catch(error){
        //Feed error handling done within base file
        //If no feed available, show default content
        showDefault = true;
    }
    myFT.dispatch('RL2_ready_to_play');
  }
}

myFT.on('RL2_play' , function(){
  console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  animate();
  setRollover();

}

function animate() {
  myFT.dispatch('show_RL2');
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true })
}

// CTA grow on hover

function setRollover() {
  document.getElementById('default_exit').addEventListener('mouseover', defaultOver, false);
  document.getElementById('default_exit').addEventListener('mouseout', defaultOut, false);
}

function defaultOver() {
  TweenMax.to('#cta', 0.25, { scale: 1.05, ease: Power1.easeInOut })
}

function defaultOut() {
  TweenMax.to('#cta', 0.25, { scale: 1, ease: Power1.easeInOut })
}

// End timer

function endTime() {
  myFT.dispatch('stopTimer')
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/
