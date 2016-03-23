var adDiv;
var bannerDiv;
var logoDiv;
var closeButton;
var spinBox;
var spinner;
var countDown;
var delayTime;
var countDownTime;
var videoContainer;
var video;

function startAd() {

    videoContainer = document.getElementById("video-container");
    video = document.getElementById("video");
	bannerDiv = document.getElementById("banner");
	spinBox = document.getElementById("spinBox");
	countDown = document.getElementById("countDown");
	spinner = document.getElementsByClassName("spinner")[0];
    logoSizmek = document.getElementById("logoSizmek"); 
    adDiv = document.getElementById("ad");

    adDiv.style.width = adConfig.banner_width-2+"px";
    adDiv.style.height = adConfig.banner_height-2+"px";
    adDiv.style.visibility = 'visible';
    spinBox.addEventListener("mouseenter", handleOver);
    spinBox.addEventListener("click",expand);
    logoSizmek.addEventListener("click",clickthrough);
    
    var videoTrackingModule = new EBG.VideoModule(video);

	updateSize();
}

function clickthrough(e) {
    if (video) {
        video.muted = true;
    }
    EB.clickthrough();
}

function centerWebkitVideoControls() {
    document.body.classList.add("ios-center-video-controls");
}
function handleOver(e){
	setClass(spinBox, "hover");
	countDownFrom(3);
	video.muted = false;
	spinBox.addEventListener("mouseleave",resetCounter);
	delayTime = setTimeout(function(){
		expand();
	},3000);
}
function countDownFrom(number){
	countDown.style.visibility = 'visible';
	countDown.innerHTML = number;
	countDownTime = setTimeout(function(){
		countDownFrom(number-1);
	},1000);
}
function resetCounter(muted){
	video.muted = muted;
	removeClass(spinBox, "hover");
	clearTimeout(delayTime);
	clearTimeout(countDownTime);
	countDown.innerHTML = '3';
	countDown.style.visibility = 'hidden';
}

function expand()
{
	spinBox.removeEventListener("mouseleave", resetCounter);
	EB.expand();
	preventPageScrolling();
	removeClass(adDiv, "collapsed");
	setClass(adDiv, "expanded");
	resetCounter(muted = false);
}

function collapse()
{
	EB.collapse();
	video.muted = true;
	allowPageScrolling();
	setClass(adDiv, "collapsed");
	removeClass(adDiv, "expanded");
}

function preventPageScrolling()
{
	document.addEventListener("touchmove", preventDefault);
}

function allowPageScrolling()
{
	document.removeEventListener("touchmove", preventDefault);
}

function preventDefault(event)
{
	event.preventDefault();
}

function setClass(e, c)
{
	var cc = null;
	if (typeof e.className === "undefined")
	{
		cc = e.getAttribute("class");
		if (cc.indexOf(c) < 0)
		{
			if (c.length > 0)
			{
				c = cc + " " + c;
			}
			e.setAttribute("class", c);
		}
	}
	else
	{
		cc = e.className;
		if (cc.indexOf(c) < 0)
		{
			if (c.length > 0)
			{
				c = cc + " " + c;
			}
			e.className = c;
		}
	}
}

function removeClass(e, c)
{
	var nc = null;
	var reg = new RegExp('(\\s|^)+'+c.replace("-","\\-")+'(\\s|$)+');
	if (typeof e.className === "undefined")
	{
		nc = e.getAttribute("class").replace(reg, ' ');
		e.setAttribute("class", nc);
	}
	else
	{
		e.className = e.className.replace(reg, ' ');
	}
}

function updateSize()
{
	bannerDiv.style.width = (window.innerWidth - 2) + "px";
	bannerDiv.style.height = (window.innerHeight - 2) + "px";
}

window.addEventListener("resize", updateSize, false);