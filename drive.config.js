// Go to https://console.developers.google.com/apis/credentials

// Client ID and API key from the Developer Console
var CLIENT_ID = 'YOURCLIENTID';
var API_KEY = 'YOURAPIKEY';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.

//See https://developers.google.com/drive/v2/web/about-auth
var SCOPES;
//Only metadata
SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
//Full access
SCOPES = "https://www.googleapis.com/auth/drive";
//Only read
SCOPES = "https://www.googleapis.com/auth/drive.readonly";


var AUTH_BUTTON=document.getElementById("authorize-button");
var SIGNOUT_BUTTON=document.getElementById("signout-button");

var SIGN_CALLBACK=function(signed){
    if(signed){
        console.log("Signed");
    }else{
        console.log("Not signed");
    }
}
