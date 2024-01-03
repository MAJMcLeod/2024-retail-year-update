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
  //make parent (base file) border black

  tl.set(["#main_content"], { autoAlpha: 1, rotation: 0.01, force3D: true });
  tl.set(["#seatBase"], { scale: 1.4, y: 15, rotation: 0.01 });

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')

  .addLabel('handAnimation', 1.5)
  .to('#armhandle', 2, { rotation: 0, y: 0, x: 0, ease: Power4.easeOut }, "handAnimation")
  .to('#arm', 1, { scale: 0.6, x: 20, y: 220, rotation: 50,  ease: "none" }, "handAnimation+=0.2")
  .to('#basketball', 0.8, { scale: 0.8, x: 112, y: 35, rotation: 50, ease: "none" }, "handAnimation+=0.2")
  .to('#basketball', 0.7, { scale: 1, x: 141, y: 248, rotation: -60, ease: "none" }, "handAnimation+=0.9")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, "+=0")

  // Move the inner blue box up
  .addLabel('seatAnimation', "+=2")
  .to('#seatBase', 0.6, { scale: 1, y: 0, ease: Power1.easeIn }, "seatAnimation")
  .to('#seatScreen', 0.6, { scale: 0.7, y: -20,  ease: Power1.easeIn }, "seatAnimation")
  .to('#innerBox', 0.6, { scale: 0.7, y: -40,  ease: Power1.easeIn }, "seatAnimation")
  .to('#seatOverlay', 0.6, { autoAlpha: 1,  ease: Power1.easeIn }, "seatAnimation")
  // .to('#net', 1, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation"); // should this fade out?
  .to('#net', 0.6, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation") // should this fade out?
  .to('#playIcon', 0.4, { autoAlpha: 1,  ease: Power1.easeIn }, "seatAnimation+=0.6")

  .addLabel('frame_END', "+=2")
  .to('#endframeBg', 0.6 ,{ top: 0, ease: Back.easeOut.config(.3)}, 'frame_END')
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
