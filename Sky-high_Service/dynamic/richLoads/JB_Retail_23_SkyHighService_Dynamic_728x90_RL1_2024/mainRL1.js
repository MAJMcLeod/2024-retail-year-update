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
var thisFeedLoaded=false;
var showDefault=false;
var ctURL = "";


var default_exit = myFT.$("#default_exit");

default_exit.on('click',function(){
  myFT.clickTag(1,ctURL);
});

function checkURL(u){
  if(u.indexOf("http://")==0||u.indexOf("https://")==0){return true}
  return false
}

myFT.on('instantads',function(){
      ctURL=myFT.instantAds.Retail_default_clickTag_URL
      myFT.dispatch('RL1_available');

    });
    myFT.on('theFeedLoaded', function(e) {
      console.log('RL1: Richload recieved feed from Base file)');
      feedLoaded(e.a);
    });
    myFT.on('RL1_play', function () {
      init();
    });
    /*
    ////////////////////////////////////////////////
       LOADING FEED START
    ////////////////////////////////////////////////

    Please note: JetBlue setup has feeds loading form the base file and then passed into richLoads via a custom event
    called 'theFeedLoaded'.
    */
    function feedLoaded(feedItems) {
      let partner_logo_src = feedItems[0].image_logo_300x250;

      if(partner_logo_src == "n/a"){
        //no partner logo included in feed, do nothing
      }else{
        //partner logo included in feed
        console.log('partner logo included!')
        document.getElementById('logoHolder').style.justifyContent = 'space-between'
        document.getElementById('partner_logo_container').style.width = '77px'


        var partner_logo_img = myFT.$("#partner_logo_img");
        partner_logo_img[0].src=partner_logo_src;
      }

      if(!thisFeedLoaded){
        thisFeedLoaded=true;
        try {
          /*Setting variable values from loaded feed (FEED PASSED THROUGH THE --theFeedLoaded-- CUSTOM EVENT)*/
          /*For example: the following variable ctURL is used to pass a url from feed into a dynamic clickTag*/
          ctURL = checkURL(myFT.instantAds.Retail_dynamic_click_URL)?myFT.instantAds.Retail_dynamic_click_URL:feedItems[0]['url'];
          //This variable will be passed through clicktag (inside clickEvent handler below) as a parameter
          //myFT.clickTag(1, ctURL);
          //If using dynamic text, set variables values to feed or dynamic variables setup in manifest/versions within instandAd*/
        } catch (e) {
          showDefault = true;
        }
        setupContent();
      }
    }
    function setupContent() {
      //Populate dynamic text with feed and/or dynamic variable data here
      //Once all dynamic content has been populated, dispatch event to the base file to notify richload 1 ready to start playing
      myFT.dispatch('RL1_ready_to_play');
    }

// @FT1 - code block end
///////////////////////////////////////////////////////////////////////////////////////


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  startTime = new Date();

  // Set Global Timeline
  tl = new TimelineMax();

  animate();
  setRollover();

}

function animate() {
  tl.set(["#main_content"], { autoAlpha: 1, rotation: 0.01, force3D: true });
  tl.set('#badge', { scale: 0.2 })

  tl.addLabel('frame1', 0)
  .to('#h1', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame1')

  // globe "rotates"
  .to('#countries', 8, { x: -100, y: 10, ease: "none" }, 'frame1')
  .to('#plane', 6, { x: 67, y: -45, ease: Power1.easeInOut }, 'frame1+=0.5')

  .addLabel('frame2', 'frame1+=2.5')
  .to('#badge', 0.75, { autoAlpha: 1, scale: 1, ease: 'none'}, 'frame2')
  .to('#globeHolder', 0.75, { scale: 0.53, ease: 'none'}, 'frame2')
  .staggerFrom(['#wingRightTop', '#wingRightMid', '#wingRightBottom'], 0.3, {scale: 0.5, y: -20, autoAlpha: 0}, 0.2, 'frame2+=0.75')
  .staggerFrom(['#wingLeftTop', '#wingLeftMid', '#wingLeftBottom'], 0.3, {scale: 0.5, y: -20, autoAlpha: 0}, 0.2, 'frame2+=0.75')
  .to('#nameTagMask', 0.6, { y: 3, ease: 'none'}, 'frame2+=2')
  .to('#nameTagMask', 0.1, { autoAlpha: 0, ease: 'none'})

  .addLabel('frame3', "frame2+=2")
  .to('#badgeHolder', 1.5, { scale: 0.06, y: '+=1', x: '+=19', ease: Power1.easeOut }, 'frame3')
  .to('#crewMember', 1.5, { scale: 1, y: 0, ease: Power1.easeOut }, 'frame3')
  .to('#h2', 0.5, { autoAlpha: 1, ease: Power1.easeOut}, 'frame3+=1.3')

  
  .addLabel('frame_END', "frame3+=3.5")
  .to('#endframeBg', 0.6 ,{ left: 0, ease: Back.easeOut.config(.3)}, 'frame_END')


    ////////////////////////////////////////
    //@FT2 code block start
    .call(playEndframe, ["param1"], "frame_END")
    //@FT2 code block end
    ////////////////////////////////////////


}
////////////////////////////////////////
//@FT3 code block start
function playEndframe(param1){
  myFT.dispatch('init_RL2');
}
//@FT3 code block end
////////////////////////////////////////


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
////////////////////////////////////////
//@FT4 code block start

// End timer custom event listener (dispatched from RL2 when animation complete)
myFT.on('stopTimer',function(){
  // show total banner animation time in browser console.
  var endTime = new Date();
  console.log(
    "Animation duration: " + (endTime - startTime) / 1000 + " seconds"
  );
})

//@FT4 code block end
////////////////////////////////////////
