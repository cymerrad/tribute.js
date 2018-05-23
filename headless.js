'use strict';

const puppeteer = require('puppeteer');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

let argv = require('minimist')(process.argv.slice(2))

/**
 * Return settings from argv
 */
async function getSettings() {
  let settings = {
    screenshotDir : argv.dir ? argv.dir : 'screenshots',
    dimensions : argv.size ? ((w,h)=>({width:w, height:h}))(...argv.size.split(',')) : {width: 1366, height: 768},
    username : argv.u ? argv.u : (function(){throw "username is required"}()),
    password : argv.p ? argv.p : await (async function(){
      try {
        let prompt = require('password-prompt'); 
        let password = await prompt('password: '); 
        return password;
      } catch(e) {
        throw "password-prompt errored out"
      }
    }()),
    tributeMessage : argv.m ? argv.m : (function(){throw "message is required"}()),
    recipientID : argv.r ? argv.r : (function(){throw "recipient ID is required"}()),
  }
  return settings;  
}

/**
 * Return current datetime in RFC3339 format.
 * @return {!String}
 */
function rfc3339() {
  let date = new Date();
  let [H, M, s] = [_.padStart(date.getHours(), 2, '0'), _.padStart(date.getMinutes(), 2, '0'), _.padStart(date.getSeconds(), 2, '0')];
  let [d, m, y] = [_.padStart(date.getDay(), 2, '0'), _.padStart(date.getMonth(), 2, '0'), date.getFullYear().toString()];
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
  let settings = await getSettings();

  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport(settings.dimensions);
  await page.goto(`https://www.messenger.com/t/${settings.recipientID}`, {waitUntil: 'networkidle2'});

  // Type into email and password box.
  await page.type('#email', `${settings.username}`);
  await page.type('#pass', `${settings.password}`);

  // Button isn't available at once
  const loginbutton = '#loginbutton';
  await page.waitForSelector(loginbutton);
  await page.click(loginbutton);

  await page.waitForNavigation({waitUntil: 'networkidle2'});  

  // Type in message and send with 'enter'
  await page.type('body', `${settings.tributeMessage}`);
  await page.type('body', '\n');

  // Giving some time for message to be sent
  await (async() => new Promise(resolve => setTimeout(resolve, 3000)))();

  let now = rfc3339();

  let screenshotDirNormalized = path.normalize(`./${settings.screenshotDir}`);
  checkDirectorySync(screenshotDirNormalized);

  let screenLocation = path.format({
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
