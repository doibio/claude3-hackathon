
var URL = '//assets.adobedtm.com/4a848ae9611a/f26074b2ceda/launch-e88876184ece.min.js';

jQuery.cachedScript = function( url, options ) {
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });
 
  return jQuery.ajax( options );
};
 
$.cachedScript(URL).done(function( script, textStatus ) {
  if(typeof pageDataTracker !== "undefined") {
  pageDataTracker.trackPageLoad();
 }
});


