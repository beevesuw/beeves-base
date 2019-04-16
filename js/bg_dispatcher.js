browser.runtime.onMessage.addListener(dispatch);

async function dispatch(message) {
  return Promise.resolve(await hotwordMapper(message['text'].split(' ')[0]));
}
