/*
  This javascript 'simple.js'  searches the elements of  class 'simple-chapter'.
  Then try to extract the starting timing for each element in a pattern like '(10:22)'.
  if the timing information is found, it then put 'onclick' a hander to the element.
  The hander seeks the video object that has id 'simple-target'.

  Tested in Google Chrome 74.0, on 2019/06/06, by K. Umemura.

*/


// you can define function, before the page is read. 
// alert('page is about to be read.'); 

// 任意のIDの文字の大きさを変える
function changeStringSize(value, stringId) {
    const targetString = document.getElementById(stringId);
    // outputElement.textContent = `結果: ${value}`;
    const fontSize = parseInt(value); // デフォルトのフォントサイズに入力値を加算
    targetString.style.fontSize = `${fontSize}px`;
}

function gameStart(){
    // settingPlayerStatus()
    // settingEnemyStatus()
    // logMessage("Buttle start!")
}

function playerPunch(){
    const punchDamege = getDiceNumber(1,3) // デフォルトダメージ
    const damegeBonus = getDiceNumber(1,3) // need to change value
    const damege = punchDamege+damegeBonus
    logMessage("Player punche: ${damage} damage to enemy")
    // logMessage("Player win!")
}

function enemyPunch(){
    // logMessage("Enamy punche: 1 damage to player")
    // logMessage("Enemy win!")
}

function logMessage(message){
    const logDiv = document.getElementById('log');
    const p = document.createElement('p');
    p.textContent = message;
    logDiv.appendChild(p);
}

function getDiceNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simpleNewSeeker(videoObject, sec) { // It returns a closure for seeking 'music-video'.
    // console.log(sec);
    function seeker() {
	videoObject.currentTime = sec;
	videoObject.play();
    }
    return seeker;  // 'seeker' contains 'sec' and 'videoObject'. 
}


function simpleSetSeekerToElements() {
    // alert('page has been read.'); 
    var timePattern = /\(([0-9]+):([0-9]+)\)/;  
    // Example: '(2:45)' for 2 minutes and 45 second,
    var listElements = document.getElementsByClassName('simple-chapter');
    var element;  // object for each 'information'. 
    var description; // string in the corresponding 'information' object. 
    var result; // matching result of description
    var i; // temporal variable 'for' loop.
    var videoObject = document.getElementById('simple-target');
    for(i = 0; i< listElements.length; i++ ) { // I know it is old fashon. 
	element = listElements[i];
	// Setting 'onclick' function to seek the video at described position.
	description = element.innerHTML;
	if( timePattern.test(description) ) { 
	    result =timePattern.exec(description);
	    // result[1]: minute, result[2]:second  
	    element.onclick = 
		simpleNewSeeker(videoObject, Number(result[1])*60+Number(result[2]));
	}
    }
}


// setting handlers is possible only after the page is read. 
if(window.onload != null) { alert('onload hander is already set.') } 
else { window.onload = simpleSetSeekerToElements; }


