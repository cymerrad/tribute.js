'use strict';

const puppeteer = require('puppeteer');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

// constants which may or may not stop being constants in the future
const screenshotDir = 'screenshots';
const dimensions = { width: 1366, height: 768};
const username = '';
const password = '';
const tributeMessage = '';
const recipientID = '';

/**
 * Return current datetime in RFC3339 format.
 * @return {!String}
 */
function rfc3339() {
  var date = new Date();
  var [H, M] = [_.padStart(date.getHours(), 2, '0'), _.padStart(date.getMinutes(), 2, '0')];
  var [d, m, y] = [_.padStart(date.getDay(), 2, '0'), _.padStart(date.getMonth(), 2, '0'), date.getFullYear().toString()];
  return `${y}-${m}-${d}T${H}:${M}`;
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
  await page.setViewport(dimensions);
  await page.goto(`https://www.messenger.com/t/${recipientID}`, {waitUntil: 'networkidle2'});

  // Type into search box.
  await page.type('#email', username);
  await page.type('#pass', password);
  const loginbutton = '#loginbutton';
  await page.waitForSelector(loginbutton);
  await page.click(loginbutton);
  await page.waitForNavigation({waitUntil: 'networkidle2'});  

  await page.type('body', tributeMessage);
  await page.type('body', '\n');

  var now = rfc3339();

  await (async() => new Promise(resolve => setTimeout(resolve, 3000)))();

  var screenshotDirNormalized = path.normalize(`./${screenshotDir}`);
  checkDirectorySync(screenshotDirNormalized);

  var screenLocation = path.format({
    name: `messenger_${recipientID}_${now}`,
    ext: '.png',
    dir: screenshotDirNormalized,
  });

  console.log(`Saving to ${screenLocation}`);
  await page.screenshot({path: screenLocation});

  await browser.close();
})();