/**
 * @description messages beeves compliant webextensions with parsed intents
 * @todo everything
*/

async function invoke(extensionID, functionName, parameters){
  log('ok1');
  let result = await browser.runtime.sendMessage(
    'extension@beeves.com',
    {
      'type': 'beevesRPC',
      'functionName': 'test',
      'parameters': 'poop'
    },
    {}
  );
}

