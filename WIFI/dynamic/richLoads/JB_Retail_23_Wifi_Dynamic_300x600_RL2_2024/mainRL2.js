var transitionSpeed = 0.5;

// Global ease setting
var easing = Power4.easeOut;

// Banner duration timer start time
// var startTime;

// Timeline reference
var tl;


//@FT VARIABLE DECLARATIONS
var showDefault=false,
    thisFeedLoaded=false,
    ctURL = "",
    defaultPrice = "",
    origin_longform="",
    lowestfare_faredollaramount="",
    destination_longform="";
let partner_logo_src;

var price = myFT.$("#price"),
    startingAt = myFT.$("#starting_at"),
    priceText = myFT.$("#priceText"),
    dollarSign = myFT.$("#dollar"),
    subhead = myFT.$("#subhead"),
    terms = myFT.$("#terms"),
    oneWay = myFT.$(".one_way"),
    default_exit = myFT.$("#default_exit"),
    h4 = myFT.$("#h4");

//@FT Setting local variable values using FT dynamic variables (instantAds)
ctURL           = myFT.instantAds.Retail_default_clickTag_URL
headline_color  = myFT.instantAds.headline_color;
subhead_color   = myFT.instantAds.subhead_color;
price_color     = myFT.instantAds.price_color;
oneWay_color    = myFT.instantAds.oneWay_color;
legal_color     = myFT.instantAds.legal_color;
oneWay_txt      = myFT.instantAds.one_way_text;
terms_txt       = myFT.instantAds.restrictions_text;

headline1_txt   = myFT.instantAds.headline1_text + myFT.instantAds.headline2_text;

function checkURL(u){
  if (u.indexOf("http://")==0||u.indexOf("https://")==0) { 
    return true
  } else {
    return false
  }
}

function setupContent() {

  oneWay[0].innerHTML = oneWay_txt; // - Populates the 'one-way' text
  terms[0].innerHTML = terms_txt; // - Populates the 'Restrictions Apply.' text


  // //  Longest possible places names
  // origin_longform = 'Providenciales, Turks and Caicos (PLS)'
  // destination_longform = 'Providenciales, Turks and Caicos (PLS)'

  h4[0].innerHTML = "Nonstop flights from <br><span class='city'>" + origin_longform + "</span> <span class='to'>to</span> <span class='city'>" + destination_longform + "</span>";


  if (showDefault) {
    h4[0].innerHTML = 'Enjoy free live<br>TV and sports<br>at every seat.<span class="asterisk">&ast;</span>'; // - Populates main headline
    h4[0].classList.add('defaultEndframe')
    terms[0].innerHTML = '<span class="asterisk">&ast;</span>Coverage may vary by aircraft.'
    price[0].style.display = 'none';
    startingAt[0].style.display = 'none';

  }
  //hard code price for local testing
  //comment out before uploading
  //lowestfare_faredollaramount="8"

  // Alternate text style classes for 3 and 4 characters prices
  // e.g. $30, vs $250 vs. $1000
  priceText[0].innerHTML = lowestfare_faredollaramount;

  var price_num_length=lowestfare_faredollaramount.length;
  if(lowestfare_faredollaramount.length> 3){
    dollarSign[0].className += " dollar_"+price_num_length+"_char";
    priceText[0].className += " number_"+price_num_length+"_char";
    oneWay[0].className += " one_way_"+price_num_length+"_char";
  }



  myFT.dispatch('RL2_ready_to_play');

}

//@FT Listener function for the custom dispatched event "theFeedLoaded")" (from base file)
// 'theFeedLoaded' contains the feed data
myFT.on('theFeedLoaded', function(e) {
  //console.log('RL1: Richload recieved feed from Base file)');
  feedLoaded(e.a);
});

//@FT Feed data callback function
function feedLoaded(feed){
  // If no partner logo terms should be right-aligned
  partner_logo_src = feed[0].image_logo_300x250;
  //testing swap between layouts for partner logo

  if(!thisFeedLoaded){
    thisFeedLoaded=true;
    try{

        lowestfare_faredollaramount = feed[0].lowestfare_faredollaramount;
        origin_longform = feed[0].origin_formatted;
        destination_longform = feed[0].destination_formatted;        
        ctURL = checkURL(myFT.instantAds.Retail_dynamic_clickTag_URL) ? myFT.instantAds.Retail_dynamic_clickTag_URL : feedItems[0]['url'];

        if(lowestfare_faredollaramount == "0"){
            //console.log('load default');
            showDefault = true;
        }
    }catch(error){
        //Feed error handling done within base file
        //If no feed available, show default content
        showDefault = true;
    }
    setupContent();
  }
}

myFT.on('RL2_play' , function(){
  //console.log("RL2: RL2_play event triggered")
  init();
});

default_exit.on("click",function(){
    myFT.clickTag(1, ctURL);
})


// Init tricggered by onLoad in Body tag
function init() {
  // Set Banner duration timer
  // startTime = new Date();
  // Set Global Timeline
  tl = new TimelineMax({ onComplete: endTime });
  animate();
  setRollover();

}
function animate() {
  myFT.dispatch('show_RL2');
  tl.set(["#main_content"], { autoAlpha: 1, force3D: true })
    .set(["#cta"], { force3D: true, rotation: .001 })
    .addLabel('frame_4')
    .staggerTo(['#h4', '#priceHolder', '#cta', '#terms', '#terms_container'], 0.5, { autoAlpha: 1, ease: Power1.easeInOut }, 0.3, 'frame_4')
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
  //dispatch event to notify RL1 (where timer resides) to stop and console.log
  //banner duration time
  myFT.dispatch('stopTimer')
}

// @FT notifying base file this RL is ready to accept feed if applicable, but may not yet be ready to play animation
myFT.dispatch('RL2_available');

/*  Once feed is subsequently loaded and all elements populated with data,
    notify base file that RL1 is rendered and ready to play by using the following:
    myFT.dispatch('RL2_ready_to_play');

*/
