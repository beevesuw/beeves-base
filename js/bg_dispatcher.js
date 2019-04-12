browser.runtime.onMessage.addListener(dispatch);

async function dispatch(message) {
  console.log(message['text'].split(' '));
  if(message['text'].split(' ')[0]=='fail')return Promise.resolve('FAILURE');
  return Promise.resolve('success!')
}