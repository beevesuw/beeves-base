browser.browserAction.onClicked.addListener(function(){
    var createData = {
      type: "detached_panel",
      url: "agent.html",
      width: 250,
      height: 250
    };
    var let = browser.windows.create(createData);
  });

// browser.browserAction.onClicked.addListener(async function(){
//   await new BeevesRPC('extension@beeves.com', 'add', {'n1':2, 'n2':3}).execute();
//   await new BeevesRPC('extension@beeves.com', 'subtract', {'n1':4, 'n2':2}).execute();
// });

