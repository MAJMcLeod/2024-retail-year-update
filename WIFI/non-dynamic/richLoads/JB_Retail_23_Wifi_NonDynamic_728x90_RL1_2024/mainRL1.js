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
  .from('#plane', 2, { y: 85, ease: Power2.easeOut}, 'frame1')
  .from('#cloudFade', 0.2, { x: -100, ease: Power1.easeOut}, 'frame1+=1')

  // distant clouds move
  .to(['.backgroundCloud'], 11, { x: -500, ease: "none" }, 'frame1')
  .to(['.foregroundCloud'], 11, { x: -850, ease: "none" }, 'frame1')

  .from('#emojiA', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=0.6')
  .from('#emojiB', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=2.2')
  .from('#emojiC', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=3.0')
  .from('#emojiD', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=6.5')

  .from('#emojiL', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=2.6')
  .from('#emojiM', 0.5, {scale: 0, ease: Power1.easeIn}, 'frame1+=8.4')

  .addLabel('frame2', "frame1+=1")
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame2')
  
  .addLabel('frame_END', "frame2+=4")
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
