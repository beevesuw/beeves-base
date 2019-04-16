const postmanEndpoint = 'https://postman-echo.com/post';

/**
 * handles initialization for beeves compatible webextensions
 * stores extension metadata (beeves.json) when the extension is loaded
 * @todo train the NLU backend for the current extension
*/

/** 
 * @description clears beeves metadata when beeves-base is loaded
 */
browser.runtime.onInstalled.addListener(function(){
  let clearStorage = browser.storage.local.clear();
});

/** 
 * @description metadata storage handler, maintains objects corresponding to 
 * beeves.json files and hotword-extension mapping
 */
browser.runtime.onMessageExternal.addListener(async function(message, sender){
  updateBeevesMetadata(message, sender);
  await timeout(1000);
  trainNLUBackend(sender);
  //flash 'new skill added' on agent
});

async function trainNLUBackend(sender){
  let snipsfile = (await getBeevesMetadata(sender.id))['snips'];
  let res = await postData(`http://localhost:8337/skill/${sender.id}`, snipsfile);
}

/** 
 * @description metadata storage handler, maintains objects corresponding to 
 * beeves.json files and hotword-extension mapping
 * @todo REFACTOR
 */
async function updateBeevesMetadata(message, sender){
  browser.storage.local.get('beeves_metadata', function(beeves_metadata){
    beeves_metadata = beeves_metadata.beeves_metadata || beeves_metadata;
    beeves_metadata[sender.id] = message;
    browser.storage.local.set({beeves_metadata}, function(){});
  });
  browser.storage.local.get('beeves_hotwords', function(beeves_hotwords){
    beeves_hotwords = beeves_hotwords.beeves_hotwords || beeves_hotwords;
    beeves_hotwords[message.beeves.hotword] = sender.id;
    browser.storage.local.set({beeves_hotwords}, function(){printStorage();});
  });
  return Promise.resolve(true);
}

/** 
 * @description for testing only, displays metadata in local storage
 */
function printStorage(){
  browser.storage.local.get(['beeves_metadata', 'beeves_hotwords'], function(data){
    //console.log(data);
  });
}

/**
 * @param {string} hotword
 * @returns {Promise}
 * @description maps hotword (extension-specific trigger word, eg: 'arithmetic') to extension ID
 * @example
 *    await hotwordMapper('arithmetic')
 *    //-->arithmetic@beeves.com 
 */
async function hotwordMapper(hotword){
  let dict = await browser.storage.local.get(['beeves_hotwords']);
  return dict.beeves_hotwords[hotword];
}

async function getBeevesMetadata(extensionID){
  let beeves_metadata = await browser.storage.local.get(['beeves_metadata']);
  let extension_metadata = beeves_metadata.beeves_metadata[extensionID];
  return Promise.resolve(extension_metadata);
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

