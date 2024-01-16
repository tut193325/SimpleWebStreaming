/*
  This javascript 'simple.js'  searches the elements of  class 'simple-chapter'.
  Then try to extract the starting timing for each element in a pattern like '(10:22)'.
  if the timing information is found, it then put 'onclick' a hander to the element.
  The hander seeks the video object that has id 'simple-target'.

  Tested in Google Chrome 74.0, on 2019/06/06, by K. Umemura.

*/


// you can define function, before the page is read. 
// alert('page is about to be read.'); 

let playerStats = {};
let enemyStats = {};


// ----------------セットアップのための関数----------------
// 任意のIDの文字の大きさを変える
function changeStringSize(value, stringId) {
    const targetString = document.getElementById(stringId);
    // outputElement.textContent = `結果: ${value}`;
    const fontSize = parseInt(value); // デフォルトのフォントサイズに入力値を加算
    targetString.style.fontSize = `${fontSize}px`;
}

// プレイヤーのステータスをランダム生成する
function generatePlayer(){
    let str = document.getElementById('player-str')
    let con = document.getElementById('player-con')
    let siz = document.getElementById('player-siz')
    let dex = document.getElementById('player-dex')
    let punch = document.getElementById('player-punch')
    str.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    con.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    siz.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    dex.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    punch.value = getDiceNumber(25,90) // 初期値から最大値まで
}

// 敵のステータスをランダム生成する
function generateEnemy(){
    let str = document.getElementById('enemy-str')
    let con = document.getElementById('enemy-con')
    let siz = document.getElementById('enemy-siz')
    let dex = document.getElementById('enemy-dex')
    let punch = document.getElementById('enemy-punch')
    str.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    str.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    str.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    str.value = getDiceNumber(1,6)+getDiceNumber(1,6)+getDiceNumber(1,6)
    str.value = getDiceNumber(25,90) // 初期値から最大値まで
}

// スタートボタンを押したときのゲーム開始処理
function gameStart(){
    settingPlayerStatus()
    settingEnemyStatus()
    updateHP()
    logMessage("Buttle start!")
    if (playerStats.dex<enemyStats.dex){ // 敵に先行をとられたら先にパンチを打たれる
        enemyPunch()
    }
}

function settingPlayerStatus(){
    playerStats.str = document.forms.playerSTR
    playerStats.con = document.forms.playerCON
    playerStats.siz = document.forms.playerSIZ
    playerStats.dex = document.forms.playerDEX
    playerStats.punch = document.forms.playerPunch
    playerStats.hp = (playerStats.con+playerStats.siz)/2
    playerStats.damageBonus = getStatusDamageBonus(playerStats.str,playerStats.siz)
}

function settingEnemyStatus(){
    enemyStats.str = document.forms.enemySTR
    enemyStats.con = document.forms.enemyCON
    enemyStats.siz = document.forms.enemySIZ
    enemyStats.dex = document.forms.enemyDEX
    enemyStats.punch = document.forms.enemyPunch
    enemyStats.hp = (enemyStats.con+enemyStats.siz)/2
    enemyStats.damageBonus = getStatusDamageBonus(enemyStats.str,enemyStats.siz)
}

// プレイヤーの「ステータス」のダメージボーナスを計算する
function getStatusDamageBonus(str,siz){
    const power = str+siz
    const damageBonus = 0
    switch (true){
        case (power<13):
            damageBonus = -6
            break
        case (power>=13)&&(power<17):
            damageBonus = -4
            break
        case (power>=17)&&(power<25):
            damageBonus = 0
            break
        case (power>=25)&&(power<33):
            damageBonus = 4
            break
        case (power>=33):
            damageBonus = 6
            break
    }
    return damageBonus
}

// ----------------ゲーム進行のための関数----------------
function updateGame(){
    enemyPunch()
}

function playerPunch(){
    if (getDiceNumber(1,100)<=playerStats.punch){
        const punchDamege = getDiceNumber(1,3) // デフォルトダメージ
        const damegeBonus = getDamageBonus(playerStats.damageBonus)
        const damege = punchDamege+damegeBonus
        enemyStats.hp = enemyStats.hp-damege
        logMessage(`Player punche: ${damage} damage to enemy`)
    }else{
        logMessage("Player punche: Miss!")
    }
    updateHP()
    updateGame()
}

function enemyPunch(){
    if (getDiceNumber(1,100)<=enemyStats.punch){
        const punchDamege = getDiceNumber(1,3) // デフォルトダメージ
        const damegeBonus = getDamageBonus(enemyStats.damageBonus)
        const damege = punchDamege+damegeBonus
        playerStats.hp = playerStats.hp-damege
        logMessage(`Enemy punche: ${damage} damage to enemy`)
    }else{
        logMessage("Enemy punche: Miss!")
    }
    updateHP()
}

function getDamageBonus(statusDamageBonus){
    const damageBonus = 0
    switch (true){
        case (statusDamageBonus<0):
            damageBonus = getDiceNumber(statusDamageBonus, -1)
            break
        case (statusDamageBonus==0):
            damageBonus = 0
            break
        case (statusDamageBonus>0):
            damageBonus = getDiceNumber(1, statusDamageBonus)
            break
    }
    return damageBonus
}

function updateHP() {
    document.getElementById('player-HP').innerText = `HP: ${player.hp}`;
    document.getElementById('enemy-HP').innerText = `HP: ${enemy.hp}`;
    if (player.hp<=0){
        logMessage("Buttle finish!\n Enemy win!")
    }
    if (enemy.hp<=0){
        logMessage("Buttle finish!\n Player win!")
    }
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

// ----------------システムのための関数----------------
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


