// browser.browserAction.onClicked.addListener(function(){
//     var createData = {
//       type: "detached_panel",
//       url: "agent.html",
//       width: 250,
//       height: 250
//     };
//     var let = browser.windows.create(createData);
//   });

browser.browserAction.onClicked.addListener(function(){
  let sending = browser.runtime.sendMessage(
    'extension@beeves.com',
    {'ok':'ok'},
    {}
  );
});