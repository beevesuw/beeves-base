/**
 * @description enahnced logging to make debugging easier
 * @todo train the NLU backend for the current extension
*/
function log(message){
    console.log("-----------------------");
    console.log("beeves-base says:");
    console.log(message);
    console.log("-----------------------");
  }

  async function postData(endpoint, payload) {
    try {
      let res = await fetch(endpoint, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      res = await res.json();
      //log(res);
      return res;
    }catch(err) {
      console.log(err);
    }
  }