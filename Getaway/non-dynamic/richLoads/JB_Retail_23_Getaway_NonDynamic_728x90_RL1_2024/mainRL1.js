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
  
  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')
  .to('#window', 5, { y: 0, ease: "none" }, "frame1")

  .addLabel('frame2', 'frame1+=3')
  .to(['#backgroundClouds'], 15, { x: -150, ease: "none" }, 'frame2')
  .to(['#foregroundClouds'], 15, { x: -350, ease: "none" }, 'frame2')
  .to('.beach', 0.5, { y: 10, ease: "none" }, "frame2")
  .to('#sea', 0.5, { y: 20, ease: "none" }, "frame2")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut }, "frame2+=0.5")
  .to('#floor', 1, { y: 0, ease: "none" }, "frame2+=1.5")
  .to('.beach', 1, { y: 50, ease: "none" }, "frame2+=2")
  .to('#window', 1, { autoAlpha: 1, ease: "none" }, "frame2+=2")
  .to('#sun', 1, { y: -80, ease: "none" }, "frame2+=2")
  .to(['#window', '#passenger'], 1, { x: "-=50", ease: "none" }, "frame2+=2")
  .to('#chair', 1, { x: -45, ease: "none" }, "frame2+=2")
  .to('#chair2', 1, { x: 25, ease: "none" }, "frame2+=2")

  .addLabel('frame_END', "frame2+=6")
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
