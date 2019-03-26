function log(message){
  console.log("-----------------------");
  console.log("beeves-base says:");
  console.log(message);
  console.log("-----------------------");
}

function onMessageRecieved(message, sender){
  log("INNNCOMMMINGGGG");
  log(message);
  log(sender);
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

