console.log("SpellSlinger network watcher loaded")

function postCardSpotted(cardName) {

  fetch("http://127.0.0.1:9292/cast", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'card_name': cardName })
    },
  ).catch((error) => {
    console.log(error);
  })

}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes && changes.highlightCard) {
    // console.log("chrome.storage.onChanged - postCardSpotted");
    postCardSpotted(changes.highlightCard.newValue);
  }
})

// TODO feature flag for casting automatically on cardSpotted

chrome.webRequest.onBeforeRequest.addListener( (details) => {
  // console.log(details)

  var postedString = decodeURIComponent(String.fromCharCode.apply(null,
    new Uint8Array(details.requestBody.raw[0].bytes)));

  try {
    cardObject = JSON.parse(postedString);
    //console.log(cardObject);

    if ( cardObject.hasOwnProperty("name") && cardObject.name == "cardSpotted" ) {
      let cardName = cardObject.data.name;
      console.log(cardName);
      postCardSpotted(cardName);
    }

  } catch (error) {
    console.log(error);
  }

},
{
  urls: [
    'https://spelltable.api.bi.wizards.com/*'
  ],
},
["requestBody"])


