// Global transition speed
var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
var startTime;

// Timeline reference
var tl;

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
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true });

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')


  .addLabel('handAnimation', 2)
  .to('#armhandle', 2, { rotation: 0, y: -90, x: -20, ease: Power4.easeOut }, "handAnimation")
  .to('#arm', 1, { scale: 0.8, x: 0, y: 240, rotation: 70, ease: "none" }, "-=1.8")
  .to('#basketball', 0.7, { scale: 0.9, x: 42, y: 115, rotation: 50, ease: "none" }, "-=1.8")
  .to('#basketball', 0.8, { scale: 1, y: 190, rotation: -20, ease: "none" }, "-=1.1")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut})

  // Move the inner blue box up
  .addLabel('seatAnimation', "+=1.5")
  .to('#innerBox', 0.6, { y: -10,  ease: Power1.easeInOut }, "seatAnimation")
  .to('#seatOverlay', 0.6, { autoAlpha: 1,  ease: Power1.easeIn }, "seatAnimation")
  // .to('#net', 1, { autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation"); // should this fade out?
  .to('#net', 0.6, { y: 100, autoAlpha: 0,  ease: Power1.easeIn }, "seatAnimation") // should this fade out?
  .to('#playIcon', 0.4, { autoAlpha: 1,  ease: Power1.easeIn }, "+=0")

  .addLabel('frame_END', "+=1.5")
  .to('#endframeBg', 0.6 ,{ top: 0, ease: Back.easeOut.config(.3)}, 'frame_END')
  .to('#h3', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=0.5')
  .to('#cta', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=1')
  .to('#terms1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame_END+=0.5')

}

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
