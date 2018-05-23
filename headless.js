'use strict';

const puppeteer = require('puppeteer');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

var argv = require('minimist')(process.argv.slice(2))

try {
  var settings = {
    screenshotDir : argv.dir ? argv.dir : 'screenshots',
    dimensions : argv.size ? ((w,h)=>({width:w, height:h}))(...argv.size.split(',')) : {width: 1366, height: 768},
    username : argv.u ? argv.u : (function(){throw "username is required"}()),
    password : argv.p ? argv.p : (function(){throw "password is requird"}()),
    tributeMessage : argv.m ? argv.m : (function(){throw "message is required"}()),
    recipientID : argv.r ? argv.r : (function(){throw "recipient ID is required"}()),
  }  
} catch(e) {
  console.error('There was an error reading the arguments:', e);
  return;
}

/**
 * Return current datetime in RFC3339 format.
 * @return {!String}
 */
function rfc3339() {
  var date = new Date();
  var [H, M, s] = [_.padStart(date.getHours(), 2, '0'), _.padStart(date.getMinutes(), 2, '0'), _.padStart(date.getSeconds(), 2, '0')];
  var [d, m, y] = [_.padStart(date.getDay(), 2, '0'), _.padStart(date.getMonth(), 2, '0'), date.getFullYear().toString()];
  return `${y}-${m}-${d}T${H}:${M}:${s}`;
}

/**
 * 
 * @param {!String} directory 
 */
function checkDirectorySync(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

(async() => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport(settings.dimensions);
  await page.goto(`https://www.messenger.com/t/${settings.recipientID}`, {waitUntil: 'networkidle2'});

  // Type into email and password box.
  await page.type('#email', settings.username);
  await page.type('#pass', settings.password);

  // Button isn't available at once
  const loginbutton = '#loginbutton';
  await page.waitForSelector(loginbutton);
  await page.click(loginbutton);

  await page.waitForNavigation({waitUntil: 'networkidle2'});  

  // Type in message and send with 'enter'
  await page.type('body', settings.tributeMessage);
  await page.type('body', '\n');

  // Giving some time for message to be sent
  await (async() => new Promise(resolve => setTimeout(resolve, 3000)))();

  var now = rfc3339();

  var screenshotDirNormalized = path.normalize(`./${settings.screenshotDir}`);
  checkDirectorySync(screenshotDirNormalized);

  var screenLocation = path.format({
    name: `messenger_${settings.recipientID}_${now}`,
    ext: '.png',
    dir: screenshotDirNormalized,
  });

  // Saving 
  console.log(`Saving to ${screenLocation}`);
  await page.screenshot({path: screenLocation});

  // kthxbai
  await browser.close();
})();
