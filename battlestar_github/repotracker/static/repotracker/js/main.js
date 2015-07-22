
$(document).ready(function() {

  if (repoURLs){
    for (var r=0; r<repoURLs.length; r++){
      RepoFetcher.fetchRepoByUserRepoId(repoURLs[r], (r+1));
    }
  }else{
    console.log("missing repoURLs, cannot proceed");
  } 
  
});

//------------------------------------------------------
var RepoFetcher = {
  "repoAttributes" : [{'model':'star_ct', 'api':'stargazers_count'},
                        {'model':'watch_ct', 'api':'watchers_count'},
                        {'model':'fork_ct', 'api':'forks_count'}],

  "repoDataObjects":[],

  "reposProcessed": 0

};
RepoFetcher.fetchRepoByUserRepoId = function(rId, rNum){
  var uri = 'https://api.github.com/repos/'+rId;
  console.log("RepoFetcher.fetchRepoByUserRepoId() uri: "+uri);
  params = {'rNum':rNum};
  ActivityCommon.GetData(uri, 'jsonp', RepoFetcher.parseRepoData, params);

}

RepoFetcher.parseRepoData = function(repoData, params){
  console.log(repoData);
  RepoFetcher.repoDataObjects[params.rNum-1] = repoData;
  var repoNum = params.rNum;
  var repoAttributes = RepoFetcher.repoAttributes;
  var attrId_mdl;
  var attrId_api;
  var useElement;
  var inner;
  if (repoData.meta.status === 404){
    console.log("BAD REPO for repoNum: "+repoNum);
    var repoDiv = document.getElementById("id_repo"+repoNum);
    repoDiv.removeChild(repoDiv.getElementsByTagName("p")[0]);
    repoDiv.removeChild(repoDiv.getElementsByTagName("ul")[0]);
    var p = document.createElement("p");
    repoDiv.appendChild(p);
    p.innerHTML = "Sorry, no github repo was found at this address.  Please <a href='/repotracker'>try again</a>."
    p.className = "error";
  }

  for (var r=0; r<repoURLs.length; r++){    
    if (repoData.data.full_name == repoURLs[r].toLowerCase()){
      for (var a=0; a<repoAttributes.length; a++){
        attrId_mdl = repoAttributes[a].model;
        attrId_api = repoAttributes[a].api;
        useElement = document.getElementById("id_repo"+repoNum+"_"+attrId_mdl);
        inner = Utility.ReplaceAll(useElement.innerHTML, "*"+attrId_mdl+"*", repoData.data[attrId_api].toString());
        RepoBattleResults.populateStats(useElement, inner);
      }
    }
  }
  RepoFetcher.reposProcessed ++;

  if (RepoFetcher.reposProcessed == repoURLs.length){
    RepoBattleResults.compareStars();
  }
}

RepoBattleResults = {}
RepoBattleResults.populateStats = function(useElement, useInner){
  useElement.innerHTML = useInner;
  Utility.FadeIn(document.getElementById("ResultsCnt"));
}

RepoBattleResults.compareStars = function(){
  var rComp_stars = [0, 0];
  var winner;
  var loser;
  var repoData;
  var starsData;
  var useElement
  for (var r=0; r<RepoFetcher.repoDataObjects.length; r++){
    repoData = RepoFetcher.repoDataObjects[r];
    starsData = repoData.data[RepoFetcher.repoAttributes[0].api];
    if (typeof(starsData) != "undefined"){
      rComp_stars[r] = starsData;
    }
  }
  if (rComp_stars[0] === rComp_stars[1]){
    console.log("there's been a tie!");
    winner = null;

    useElement = document.getElementById("Announcement");
    useElement.innerHTML = "Looks as though we have a tie!"
    useElement.className = "tie";
  }else{
    winner = (rComp_stars[0] > rComp_stars[1]) ? 1:2;

    //console.log("Star count winner: "+winner);
    useElement = document.getElementById("id_repo"+winner+"_"+RepoFetcher.repoAttributes[0].model);
    useElement.className = "winner";
    loser = (winner == 1) ? 2:1;
    useElement = document.getElementById("id_repo"+loser+"_"+RepoFetcher.repoAttributes[0].model);
    useElement.className = "loser";

    useElement = document.getElementById("Announcement");
    useElement.innerHTML = "Repo "+winner+" is the Battle of the Stars &star; winner!"
    useElement.className = "winner";
  }
  
}


//------------------------------------------------------
var ActivityCommon = {};
//Refactored out of individual engine _Data.js files...
ActivityCommon.GetData = function(endpoint, datatype, successFunction, successParams){
  //SET CRITICAL PARAMETERS HERE TO MITIGATE REDUNDANCY IN THE ERROR HANDLING
  var useASync = true;
  var useEndpoint = endpoint;
  var useOperation = 'GET'; 
  var useDatatype = datatype;
  if (datatype.toLowerCase() == 'xml') { useDatatype = (jQuery.browser.msie) ? 'text' : 'xml'};
  var useSuccessFunction = successFunction; 
  var useReturnData;
  $.ajax({
    async: useASync,
    type: useOperation,
    url: useEndpoint,
    dataType: useDatatype,
    success: function(data){
        useReturnData = (datatype.toLowerCase() == 'xml') ? Utility.GetSupportableFormat(data):data;
        useSuccessFunction(useReturnData, successParams);
    },
    error: function() {
      // jQuery.ajax() regards 302 redirect as an error condition
      // CAS SSO's "gateway" feature redirects browser to SSO site on fresh
      // session start.. a second ajax call is not redirected.
      //
      // if at first you don't succeed, try try again
      $.ajax( {
          async: useASync,
          type: useOperation,
          url: useEndpoint,
          dataType: useDatatype,
          success: function(data) {
              useReturnData = (datatype.toLowerCase() == 'xml') ? Utility.GetSupportableFormat(data):data;
              useSuccessFunction(useReturnData, successParams);
          },
          error: function() {
            // TODO: handle failsafe
            console.log("error trying to fetch data")
          }
      });
    }
  });   
};

var Utility={};
Utility.GetSupportableFormat = function(data){
    var xml; 
    if ( typeof data == 'string') { 
        xml = new ActiveXObject( 'Microsoft.XMLDOM'); 
        xml.async = false; 
        xml.loadXML( data); 
    } else { 
        xml = data; 
    } 
    return xml;
};

Utility.EscapeRegExp = function(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
Utility.ReplaceAll = function(string, find, replace) {
  return string.replace(new RegExp(Utility.EscapeRegExp(find), 'g'), replace);
}

Utility.FadeIn = function(element, duration){
  if (! duration) duration = 500;
  $(element).animate({
    opacity:1}, duration, function() {//anim complete
  });
}



