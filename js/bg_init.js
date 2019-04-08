/*
handles initialization for beeves compatible webextensions
stores extension metadata (beeves.json) when the extension is loaded
TODO: train the NLU backend for the current extension
*/

//clears beeves metadata when beeves-base is loaded
browser.runtime.onInstalled.addListener(function(){
  let clearStorage = browser.storage.local.clear();
});

//registering metadata for new extenions and training the backend
browser.runtime.onMessageExternal.addListener(function(message, sender){
  //trainNLUBackend
  updateBeevesMetadata(message, sender);
  //flash 'new skill added' on agent
});

//metadata storage handler
function updateBeevesMetadata(message, sender){
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
}

//for testing only
function printStorage(){
  browser.storage.local.get(['beeves_metadata', 'beeves_hotwords'], function(data){
    log(data);
  });
}

//TODO: promisified browser.storage.local.get to use within an async function

