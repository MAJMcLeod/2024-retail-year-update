// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl, tl2;

////////////////////////////////////////////////////////////////////////
// @FT1 - code block start
//VARIABLE DECLARATIONS
var ctURL = "";


var default_exit = myFT.$("#default_exit");

var default_exit = myFT.$("#default_exit");
var clickTag1_url="";

//
default_exit.on('click',function(){
  myFT.clickTag(1,clickTag1_url)
})
// wait for instantads to load before initializing creative animation
myFT.on('instantads',function(){

  clickTag1_url=myFT.instantAds.clickTag1_url;
  myFT.dispatch('RL1_available');

})
myFT.on('theFeedLoaded', function(e) {
  myFT.dispatch('RL1_ready_to_play');
});
myFT.on('RL1_play', function () {
  init();
});
// @FT1 - code block end
///////////////////////////////////////////////////////////////////////////////////////


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax({onComplete:endTime});

  animate();
  setRollover();

}

function animate() {
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true, rotation: 0.01 });
  tl.set(["#seatBase"], { scale: 1.4, y: -17, });
  tl.set(["#seatScreen"], { scale: 1.4, y: -28, });
  tl.set(["#innerBox"], { scale: 1.4, y: -17, });
  tl.set(["#net"], { scale: 1.4, y: -25, });

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')


  .addLabel('handAnimation', 2)
  .to('#armhandle', 2, { rotation: 0, y: 0, x: 0, ease: Power4.easeOut }, "handAnimation")
  .to('#arm', 0.5, { scale: 1, x: 0, y: 0, rotation: 0, ease: "none" }, "handAnimation+=0.2")
  .to('#arm', 0.5, { scale: 0.4, x: -30, y: 80, rotation: 90, ease: "none" }, "handAnimation+=0.6")
  .from('#basketball', 0.6, { x: "-=60", y: "-=30", rotation: 50, ease: "none" }, "handAnimation+=0.2")
  .to('#basketball', 0.8, { scale: 0.7, x: "+=33", y: "+=150", rotation: -20, ease: "none" }, "handAnimation+=0.8")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut})

  // Move the inner blue box up
  .addLabel('seatAnimation', "+=1.5")
  .to('#seatBase', 0.6, { scale: 1, y: 0, ease: Power1.easeIn }, "seatAnimation")
  .to('#seatScreen', 0.6, { scale: 1, y: 0,  ease: Power1.easeIn }, "seatAnimation")
  .to('#innerBox', 0.6, { scale: 1, y: 0,  ease: Power1.easeIn }, "seatAnimation")
  .to('#seatOverlay', 0.6, { autoAlpha: 1,  ease: Power1.easeIn }, "seatAnimation")
  // .to('#net', 1, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation"); // should this fade out?
  .to('#net', 0.6, { scale: 1, y: 100, autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation") // should this fade out?
  .to('#playIcon', 0.4, { autoAlpha: 1,  ease: Power1.easeIn }, "+=0")

  .addLabel('frame_END', "+=1.5")
  .to('#endframeBg', 0.6 ,{ left: 0, ease: Back.easeOut.config(.3)}, 'frame_END')
  .to('#h3', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=0.5')
  .to('#cta', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=1')
  .to('#terms1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=0.5')


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
function endTime(){
  // show total banner animation time in browser console.
  var endTime = new Date()
  console.log("Animation duration: " + ((endTime - startTime) / 1000) + " seconds");
}
