browser.runtime.onMessage.addListener(dispatch);

async function dispatch(text) {
  console.log(text);
  return Promise.resolve('success!')
}