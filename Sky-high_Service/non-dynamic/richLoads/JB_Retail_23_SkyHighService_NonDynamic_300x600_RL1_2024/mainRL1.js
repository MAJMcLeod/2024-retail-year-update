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
  tl.set('#badge', { scale: 0.2 })

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')

  // globe "rotates"
  .to('#countries', 8, { x: -100, y: 10, ease: "none" }, 'frame1')
  .to('#plane', 6, { x: 170, y: -100, ease: Power1.easeInOut }, 'frame1+=0.5')

  .addLabel('frame2', 'frame1+=2.5')
  .to('#badge', 0.75, { autoAlpha: 1, scale: 1, ease: 'none'}, 'frame2')
  .to('#globeHolder', 0.75, { scale: 0.29, ease: 'none'}, 'frame2')
  .staggerFrom(['#wingRightTop', '#wingRightMid', '#wingRightBottom'], 0.3, {scale: 0.5, y: -20, autoAlpha: 0}, 0.2, 'frame2+=0.75')
  .staggerFrom(['#wingLeftTop', '#wingLeftMid', '#wingLeftBottom'], 0.3, {scale: 0.5, y: -20, autoAlpha: 0}, 0.2, 'frame2+=0.75')
  .to('#nameTagMask', 0.4, { y: 8, ease: 'none'}, 'frame2+=2')
  .to('#nameTagMask', 0.1, { autoAlpha: 0, ease: 'none'})


  .addLabel('frame3', "frame2+=2")
  .to('#badgeHolder', 1.5, { scale: 0.12, x:29, y:72, ease: "none" }, 'frame3')
  .to('#crewMember', 1.5, { scale: 1, ease: 'none' }, 'frame3')
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame3+=1.3')

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
