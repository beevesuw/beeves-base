function log(message){
  console.log("-----------------------");
  console.log("beeves-base says:");
  console.log(message);
  console.log("-----------------------");
}

//this is terrible code, but it works
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

function onMessageRecieved(message, sender){
  //trainNLUBackend
  updateBeevesMetadata(message, sender);
  //flash 'new skill added' on agent
}

browser.runtime.onMessageExternal.addListener(onMessageRecieved);

browser.browserAction.onClicked.addListener(function(){
  var createData = {
    type: "detached_panel",
    url: "test.html",
    width: 250,
    height: 250
  };
  var creating = browser.windows.create(createData);
});

var clearStorage = browser.storage.local.clear();