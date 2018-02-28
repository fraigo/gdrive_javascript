//See https://developers.google.com/drive/v2/reference/files/get


function driveHelper(){

    var authorizeButton=AUTH_BUTTON;
    var signoutButton=SIGNOUT_BUTTON;

    var helper=this;

    if (!gapi){
        console.error("GooglDrive API not loaded");
        return;
    }
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    this.handleClientLoad=function() {
        gapi.load('client:auth2', this.initClient);
    }


    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    this.initClient=function() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(helper.updateSigninStatus);

            // Handle the initial sign-in state.
            helper.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = helper.handleAuthClick;
            signoutButton.onclick = helper.handleSignoutClick;
        });
    }

    /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
    this.updateSigninStatus=function(isSignedIn) {
        if (SIGN_CALLBACK){
            SIGN_CALLBACK(isSignedIn);
        }
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }


    /**
     *  Sign in the user upon button click.
     */
    this.handleAuthClick=function(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    this.handleSignoutClick=function(event) {
         gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Print files.
     */
    this.listFiles=function(callback) {
        gapi.client.drive.files.list({
            'pageSize': 20,
            'fields': "nextPageToken, files(id, name, mimeType)"
        }).then(function(response) {
            var files = response.result.files;
            if (files && files.length > 0) {
                callback(files);
            } else {
                callback([]);
            }
        });        
    }

    this.getFileInfo=function(fileId,callBack){
        var request = gapi.client.drive.files.get({
          'fileId': fileId,
        });
        request.execute(function(resp) {
            callBack(resp);
        });
    }

    this.getFile=function(fileId, callback, data) {
        var downloadUrl="https://www.googleapis.com/drive/v3/files/"+fileId+"?alt=media";
        if (downloadUrl) {
            var accessToken = gapi.auth.getToken().access_token;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', downloadUrl);
            xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            xhr.onload = function() {
                callback(xhr.responseText, data);
            };
            xhr.onerror = function() {
                callback(null);
            };
            xhr.send();
        } else {
            callback(null);
        }
    }

    this.handleClientLoad();

}