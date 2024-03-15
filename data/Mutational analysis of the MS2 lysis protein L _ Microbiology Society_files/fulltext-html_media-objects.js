$(document).ready(function() {
  // SGM toggle highlighted text on full text.
  if($(".hiddenHighlight").length > 0) {
    //if there is highlighted text
    //show the tool and set up a click handler
    $(".fullTextHighlight").css("display","block");
    $(".fullTextHighlight").click(function() {
      //console.log("clicked");
      var fullTextOption= $(this).hasClass("Show");
      //console.log(fullTextOption);
      if(fullTextOption === true) {
          $(this).parent().parent().find(".hiddenHighlight").addClass("jp-concept");
      } else {
          $(this).parent().parent().find(".jp-concept").removeClass("jp-concept").addClass("hiddenHighlight");
      }
    });
  } else {
    //if there is no highlighted text
    //do nothing the tool is hidden by default   
  }

  //
  // Two actions to support FullText in article and chapter...
  //
   
  $("body").on("click",".menuButton",function(){
    var parentContainer = $(this).parent(".sectionDivider").parent(".articleSection");
    var currentMenu = $(parentContainer).find(".dropDownMenu");
    $(currentMenu).slideToggle("slow");
    return false;
  });
  
  $("body").on("click",".menuLink", function(){
      $(".dropDownMenu").hide();
      return true;
  });
   
  //
  // As needed, retrieve the full text of an article, a chapter or contributors...
  //
  var numCount = 0; // needed to count clicks on the links to stop duplicate ahah calls when back button is clicked and tab called. Not great, revisit this more elegent
  $("#html_tab a").on( "click", function(){

   // check if #itemFullTextId div exists, if not them removed the spinner and gives no full text message
   // else it goes and get the full text.
         
   // NEW - now getting the value from the data attribute
   var fulltextCheck = $("div.itemFullTextHtml").data('fulltexturl');
   // if ($("#itemFullTextId").length > 0) {   
   
   // NEW - and now check against data attribute
    if (fulltextCheck && fulltextCheck.length > 0) {   
      numCount++;
      //console.log("numCount = " + numCount);     
      if (numCount <= 1){
         //console.log("renderFullTextHTML called");
         renderFullTextHTML();
      }else{
         return true;
      }
   } else {
      // Remove the spinning icon...
          $(".itemFullTextLoading").html("No full text exists for this article.");
   }
  });


  $("#supplements a").on( "click", function(){
    var thisLink =  $(this);
    //notice the NOT
    if (!thisLink.hasClass("ajaxTrigged")){
      thisLink.addClass("ajaxTrigged"); // this ensures the ajax request is only triggered once
      
      var suppTabContent = thisLink.parents(".transformer-tabs").next("#tabbedpages").children(".supplements");
      var ajaxURL = suppTabContent.data("ajaxurl");
      
      //necessary hack for dev!
      var hiddenContext = $('#hiddenContext').text();
      if (hiddenContext) {
        ajaxURL = hiddenContext + ajaxURL;
      }
      
      if (ajaxURL){
        $.ajax({
          type   : "GET",
          url    : ajaxURL,
          success: function(resp){
            suppTabContent.find(".loading-message").replaceWith(resp);
          },
          error: function(resp){
            console.log("ajax call fails for url:" + ajaxURL );
            suppTabContent.find(".loading-message").remove();
          }
        });
      } else {
        console.log("ajax url missing! please check DOM! AJAX variable URL value is:" + ajaxURL);
        suppTabContent.find(".loading-message").remove();
      }
        
    }
     
  });
    
  $("#dataandmedia a").on( "click", function(){
    var thisLink =  $(this);
    //notice the NOT
    if (!thisLink.hasClass("ajaxTrigged")){
      thisLink.addClass("ajaxTrigged"); // this ensures the ajax request is only triggered once
      
      var figuresTabContent = thisLink.parents(".transformer-tabs").next("#tabbedpages").children(".dataandmedia");
      var ajaxURL = figuresTabContent.data("ajaxurl");
      
      //necessary hack for dev!
      var hiddenContext = $('#hiddenContext').text();
      if (hiddenContext) {
        ajaxURL = hiddenContext + ajaxURL;
      }
      
      if (ajaxURL){
        $.ajax({
          type   : "GET",
          url    : ajaxURL,
          success: function(resp){
            figuresTabContent.find(".loading-message").replaceWith(resp);
          },
          error: function(resp){
            console.log("ajax call fails for url:" + ajaxURL );
            figuresTabContent.find(".loading-message").remove();
          }
        });
      } else {
        console.log("ajax url missing! please check DOM! AJAX variable URL value is:" + ajaxURL);
        figuresTabContent.find(".loading-message").remove();
      }
    }
     
  });


  $("#dataandmedia").on('click', '.js-gotologin', function(e) {
      // no preventDefault as we want the browser to jump to the top of the site.
    var loginForm = $("#form-signin")
    if ($(loginForm).is(":hidden")) {
      $(".js-signinlink").trigger('click'); //trigger click!
    } else {
      loginForm.find('input:first').focus();
    }

  });

  //both the data and Media tab and html fulltext tab.
  $("#itemFullTextId, #dataandmedia").on('click', '.js-toggle-table', function(e) {
    e.preventDefault();
    var $this = $(this),
    context = $('#hiddenContext').text(),
    thisTableCaption = $this.closest('.js-table-caption-container'),
    tableAjaxUrl = thisTableCaption.data('webid');

    if (!$this.hasClass('is-ajax-triggered')) {
      $this.addClass('is-ajax-triggered'); //add Class so subsquent clicks dont trigger the Ajax.

      thisTableCaption.after('<span class="fa-is-spinner"><i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i><span class="sr-only">Loading...</span></span>');

      tableAjaxUrl = context + tableAjaxUrl + '?fmt=ahah&tableonly=true';
      //now we need to trigger the AJAX call
      $.ajax({
        type   : "GET",
        url    : tableAjaxUrl,
        success: function(resp){
          var respObj = $(resp); //wrap as jQuery Obj.
          thisTableCaption.next('.fa-is-spinner').remove();
          thisTableCaption.after(respObj); //add it to the DOM

          thisTableCaption.next('.table-container').slideDown('slow'); //now slide it down!

          $this.siblings('.open-table-fullscreen').removeClass('hidden');
        },
        error  : function(resp){
          var cMsg = "'fulltext' AJAX GET (Stage 1) to '" + tableAjaxUrl + "' failed: " + resp.status + " (" + resp.statusText + ")";
          console.log(cMsg);
          thisTableCaption.next('.fa-is-spinner').remove();
          thisTableCaption.after('<p class="text-warning">Table failed to generate try refreshing this page!</p>');
        }
      });
    } else {
      thisTableCaption.siblings('.table-container').slideToggle('slow');
      $this.siblings('.open-table-fullscreen').toggleClass('hidden');
    }

    if($this.find('.fa-caret-down').length > 0){
      $this.find('.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-up'); 
    } else {
      $this.find('.fa-caret-up').removeClass('fa-caret-up').addClass('fa-caret-down');
    }

  });


  // Identify the dialog 'hooks'...
  var figureDialog     = $("#figuredialog");
  var tableDialog      = $("#tabledialog");
  var videoDialog      = $("#videodialog");
  var multimediaDialog = $("#multimediadialog");

  // Declare some default dialog attributes
  var stdDialogOptions = {
    autoOpen:false,
    height:640,
    width:480,
    modal:true,
    resizable:true,
    position: {
      my:"center",
      at:"center",
      of:$(window)
    }
  }
  //
  // Create the dialog boxes...
  //
  figureDialog.dialog(stdDialogOptions);
  tableDialog.dialog(stdDialogOptions);
  videoDialog.dialog(stdDialogOptions);
  multimediaDialog.dialog(stdDialogOptions);

  //
  // Remove contents as the dialog is closed
  //
  figureDialog.bind('dialogbeforeclose', function(event) {
    figureDialog.find(".multimediaContainer").remove();
    figureDialog.find(".dialogCitation").remove();
  });

  tableDialog.bind('dialogbeforeclose', function(event) {
    tableDialog.find(".multimediaContainer").remove();
    tableDialog.find(".dialogCitation").remove();
  });

  videoDialog.bind("dialogbeforeclose", function(event) {
    videoDialog.find(".multimediaContainer").remove();
    videoDialog.find(".dialogCitation").remove();
  });

  multimediaDialog.bind("dialogbeforeclose", function(event) {
    multimediaDialog.find(".multimediaContainer").remove();
    multimediaDialog.find(".dialogCitation").remove();
  });

  //
  // Process request for figure from Fulltext tab...
  //


  /*$("body").on("click", "#html-body .figure .image a", function() {
    var here = $(this);
    if (here.hasClass('opened')) {
      return true;
    }
    here.addClass("opened");
    // Keep a record of where we are...
    
    // Set the cursor to busy...
    here.css({"cursor":"progress"});
    // Grab various items of item-level metadata...
    var itemMetadata = "";
    // Grab citation details
    var citation = $(".figureCaptionContainer .figSrcOrCit").html();
    
    // Define some additional text...
    var additionalText = "";
    // Grab various items of media-level metadata...
    var figMetadata = here.parents(".figure");
    // Override some of the features of the dialog defined above...
    var dialogTitle  = figMetadata.find(".image .label").text();
    // Construct the url to call...
    var url = $("#hiddenContext").text() + figMetadata.find(".image a").attr("id");

    if (url) {
      processAjax(here, multimediaDialog, url, dialogTitle, citation, additionalText);
    } else {
      console.log( url +" No location specified from which to retrieve figure image...");
    }
    return false;
  });*/

  //
  // Process request for table from Fulltext tab...
    
  
  //
  
  //
  $("body").on("click", "#html-body .table .image a", function() {    
    if ($(this).hasClass('opened')) {
        return true;
    }
    $(this).addClass("opened");

    // Keep a record of where we are...
    var here = $(this);
    // Set the cursor to busy...
    here.css({"cursor":"progress"});
    // Grab various items of item-level metadata...
    var itemMetadata = "";
    // Grab citation details
    if ($('.tableCaptionContainer .tableSrcOrCit').length > 0) {
      //if table tan exists use src/cit info from that tab
      var citation = $(".tableCaptionContainer .tableSrcOrCit").html();
    } else {
      //it is journal team so use src from metadata on page
      var citation = $(".displaySource").text();
    }

    // Define some additional text...
    var additionalText = "";
    // Grab various items of media-level metadata...
    var tabMetadata = here.parents(".table");
    // Override some of the features of the dialog defined above...
    var dialogTitle  = tabMetadata.find(".image .label").text();
    // Construct the url to call...
    var url = $("#hiddenContext").text() + tabMetadata.find(".image a").attr("id");

    if (url !== "") {
      processAjax(here, multimediaDialog, url, dialogTitle, citation, additionalText);
    } else {
      console.log("No location specified from which to retrieve table data...");
    }
    return false;
  });

  // Submit 'download as PPT' form from text link
  $(document).on("click", ".pptForm .downloadPpt", function(e) {
    var $pptForm = $(this).closest("form");
    articleCitation = $(".metadata_citation").text();
    $pptForm.find("input[name='citation']").val(articleCitation);
    $pptForm.submit();
    return false;
  });

  $(document).on("click",".js-open-table", logInvestigationEvent);
    
  // handler for when citation or footnote clicked inside table dialog box
  $("body").on("click", ".xref .jp-sup a, .xref a", function(e) {

    //is this is footnote or citation?
    if(!isNaN($(this).text())){
      var anchor = $(this).attr("href");
      
      // Citation from either full text or figure tab:
      // **   close dialog and jump to citation in full text tab
      if (!$("#html_tab a").hasClass("active")) {
        //from media tab
        //$(".ui-icon-closethick").click();
        if($("body").attr("id") == "referenceWorkArticle" || $("body").attr("id") == "article"){ //on an article page only
          $("#html_tab a").click();
        }
        if($("body").attr("id") == "chapter"){ //on an chapter page only
          $("#chapterfulltext a").click();
        }               
        $("a[href='"+anchor+"']").click();
      } else {
        //from full text tab
        //$(".ui-icon-closethick").click();
      }                   
    } else {
      //Footnote from dialog either full text or figure tab:
      // **   go to link, no special behavior
    }
      
  });
   
    
  $("#dataandmedia_tab").find("a").click(function(e) {
    if ($("#hiddenDataMediaWebid").length > 0) {
      var itemId = $("#hiddenDataMediaWebid").text(),
      url =  $("#hiddenContext").text() + itemId + "/datamedia?fmt=ahah",
      dataandmedia = $('#dataandmedia');
      $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: function(resp, statusText, req) {
          var target = $(".dataandmedia").get(0);
          if (target) {
            target.innerHTML = resp;
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, target]);
            initFancyBox('.figureCaptionContainer', 'gallery');
            inlineTable(dataandmedia);
          }
        },
        complete: function(req, statusText) {
          $(".itemDataMediaLoading").remove();
          $("#hiddenDataMediaWebid").remove();
        }
      });
    }
  });
  
  $(".video-item__video--disable-download, .audio-item__audio--disable-download").bind("contextmenu",function(){
      return false;
   });
  
 function logEvent(e){
    var eventEl = e.target, 
    paramsUrl = eventEl.dataset.ahahEventUrl,
    eventUrl = $("meta[name='stats-meta']").data("logstatisticsurl");
            
    eventEl.removeEventListener("playing", logEvent);

    let urlObj = new URL(window.location.origin + paramsUrl);
    eventData = {
      "eventType": urlObj.searchParams.get("eventType"),
      "eventProperties.ITEM_ID": urlObj.searchParams.get("statlogid"),
      "eventProperties.MIME_TYPE": urlObj.searchParams.get("mimeType")
    };
    
    if (urlObj.searchParams.has("eventType")) {
      $.ajax({
         type: "GET",
         url: eventUrl,
         data: eventData,
         aysnc: false,
         success: function() {
             //console.log("Delivery event logged for audio/video");            
         }
        });  
      }
  }  

  var videoElArray = document.querySelectorAll('.js-video-register-click');
    for(var i=0; i < videoElArray.length; i++){
    videoElArray[i].addEventListener('playing', logEvent);
  }

  var audioElArray = document.querySelectorAll('.js-audio-register-click');
    for(var i=0; i < audioElArray.length; i++){
    audioElArray[i].addEventListener('playing', logEvent);
  }  

  //trigger play on click  
  $('.js-video-register-click').click(function(e) {
    $(this)[0].play();
  });

  //placeholder for ajax for reviewStatus stuff 
  $('#review-status-breakdown [data-toggle="tooltip"], #review-status-table [data-toggle="tooltip"]').tooltip();
  $('#isOldVersionModal').modal('show');


  $('#review-status-breakdown .js-route').click(function(e){
      e.preventDefault();
    //Do Ajax call to return review details
       const link =  $(this);
       const webId  = link.data('webid');
       const slideId = link.data('slide-id');
       const slideNO = link.data('slide-to');

      if(webId) {
          
          const reviewdata = {
            "webid": webId,
            "fmt": 'ahah'
          };

        $.ajax({
           type: "GET",
           url: '/content/ahahloadreview',
           data: reviewdata,
           success: function(resp) {
                  const jQueryResp = $(resp);
                   $('#' + slideId).find('.loader-icon').replaceWith(jQueryResp);
                   link.data('webid', ''); //set to nothing so ajax does not get called again 2nd time.
                   
                   

           },
           error: function(req, statusText, message){
            $('#' + slideId).find('.loader-icon').replaceWith('<p>Error Occured' + statusText +'</p>')
           } 
        });
        
      }
      let urlWithHash
      //update URL with hash add an aditional char to avoid matching the ID in the page
      if (slideId) {
        urlWithHash = replaceHash('0' + slideId);
      } else {
        urlWithHash = window.location.href.split("#")[0];
      }
   
      history.pushState({}, null, urlWithHash);

       $('#review-status-breakdown').carousel(slideNO);
  });

  const currentlocation = window.location.hash;
  if( currentlocation.indexOf('#0reviewreports-') !== -1 ) {
    //currentlocation.substring(2) removes the first two characters in this case the 0 and hash symbol
    $('#review-status-breakdown .js-route[data-slide-id="' + currentlocation.substring(2) + '"]').trigger('click');
  }

  $(".js-toggle-display-review-status-breakdown").click(function(e) {
    e.preventDefault();
    $('#review-status-breakdown').toggleClass('hidden');

  });

  var timer;
  $('.js-block-tip').hover(
    function(){
        $(this).closest('.carousel-inner').css('overflow','visible');
        $(this).find('.js-block-tip__content').removeClass('hidden');
        if(timer) {
            clearTimeout(timer);
            timer = null
        }
        
    }, function(){
        var ithis = $(this);
        timer = setTimeout(function () {
            ithis.find('.js-block-tip__content').addClass('hidden');
            ithis.closest('.carousel-inner').css('overflow','hidden');
        }, 500)
    }    
 );

});



//
// This next function is invoked from within the files containing the figures and tables...
//
function popupImage(filename) {
  //
  // Use the same proportions as the dialog box
  //
  var w_width  = $(window).width()  * 0.8;
  var w_height = $(window).height() * 0.8;
  var w_params  = "menubar=no,width=" + w_width + ",height=" + w_height + ",toolbar=no,resizeable=yes,scrollbars=yes"; 
  window.open(filename, "figWindow", w_params);
}

/*
 * JavaScript specific to figure and table dialogs on SGM
 * removed video and multimedia bc not required for SGM
 * 
 */


function postProcessing(dialogName) {
  var dialogType = dialogName.attr("id");
  switch (dialogType) {
    case 'figuredialog':
      break;
    case 'tabledialog':
      break;
    case 'videodialog':
      var videoUrl = $(".mediaSource").text();
      var mimeType = $(".mediaFormat .mediaFormatType").text();
      alert("No video player is available");
      break;
    default:
      break;
  }
}

function fetchMultimedia() {
  // To be constructed...
  return false;
}

// Function to call AJAX
function processAjax(here, dialogName, url, dialogTitle, citation, additionalText) {
  // Set up the dialog window size...
  var dialogWidth  = $(window).width()  * 0.8;
  var dialogHeight = $(window).height() * 0.8;
  // Make the call...
  $.ajax({
    type     : "GET",
    url      : url,
    datatype : "html",
    success  : function(resp, statusText) {
      var dialogContent = $(resp);
      if (dialogContent.length > 0) {
        /* Set the width and height as a proportion of the current viewport size */
        dialogName.dialog({
          title:dialogTitle, 
          height:dialogHeight,
          width:dialogWidth
        });
        dialogName.append(dialogContent);
        dialogName.find(".dialogCitation span").after(citation);
        //console.log(citation);
        if (additionalText !== "") {
          dialogName.append("<span class=\"additionalText\">" + additionalText + "</span>");
        }
        dialogName.dialog("open");
      } else {
        console.log("No contents returned...");
      }
    },
    error    : function(req, statusText) {
      alert("The attempt to retrieve the full size image of this figure has failed.");
    },
    complete : function(req, statusText) {
      /*here.addClass("cursorPointer").removeClass("cursorWait");
      here.closest(container).removeClass("cursorWait opened");*/
      here.addClass("cursorPointer").removeClass("cursorWait");
      here.css("cursor","pointer");
      here.removeClass("opened");
      postProcessing(dialogName);
    }
  });
}


function renderFullTextHTML(){
  
  if( $(".itemFullTextHtml").hasClass("retrieveFullTextHtml") ) {
    // var fulltextUrl = $(".itemFullTextHtml").html();    
    // NEW - now getting url from Data attribute
    var fulltextUrl = $(".itemFullTextHtml").data('fulltexturl');
    fulltextUrl = fulltextUrl.replace(/&amp;/g,"&");
    //console.log("Fulltext URL Stage 1: " + fulltextUrl);
    var container = $("#itemFullTextId");
    var docserverReq = "";
        
    container.empty();
    //
    // A full jQuery AJAX call is made to allow for different callbacks for success and failure...
    //
    $.ajax({
      type   : "GET",
      url  : fulltextUrl,
      success: function(resp){
        // Some proxies will reformat this response to be an HTML document so we only want the text, not the whole response
        docserverReq = $("<foo>" + resp + "</foo>").text();
        var a = $('<a>', { href:docserverReq } )[0];
        var dsUrl = a.pathname + a.search;
        if ( ! dsUrl.match(/^\//)) {
          dsUrl = "/" + dsUrl;
        }
        //console.log("Fulltext URL Stage 2: " + resp);
        $.ajax({
          type   : "GET",
          url  : dsUrl,
          success: function(ftresp){
            var responseObj = $(ftresp);
                
            container.removeClass("retrieveFullTextHtml").removeClass("hidden-js-div").html();

            // Remove the spinning icon...
            $(".itemFullTextLoading").remove();
                
            //append the response.
            container.append(responseObj);
            
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);  
            
            getImagesMetaData();
            
            inlineTable(container);         
                
            /* now replace the supp data section */
            if($('a#supplementalmaterial-1').length > 0){
              if($('ul#SuppDataIndexList').length > 0){
                var styledSuppData = $('ul#SuppDataIndexList').clone();
                $('a#supplementalmaterial-1').parent().parent().parent().nextAll().remove(); 
                $('a#supplementalmaterial-1').parent().parent().parent().after(styledSuppData);
              
              }
            }
            /* PLAT-493 - Replace the references section with data from the "References" tab*/
            var refDetails = $('#articlereference');
            if(refDetails.length > 0){ 
               var sectionReference =$('.articleSection .references');
               if(sectionReference.length > 0){
                  var refData = refDetails.clone();
                  sectionReference.html(refData); 
                  /* Updating the IDs to remove ref- so that we don't duplicate IDs */
                  sectionReference.find('li[id^="ref-"]').each(function() {
                     var newId = $(this).attr('id');
                     newId = newId.replace('ref-','');
                     $(this).attr('id', newId);
                  });
               }
             }  
            
            /*hack to move headings with class "t1-default" inside there adjacent sibling paragraph where it exists*/
            $('#itemFullTextId #article-level-0-front-and-body > .articleSection .tl-default').each(function () {
              var $this = $(this);
              var adjacentSiblingParagraph = $this.next("p");
              if (adjacentSiblingParagraph.length > 0) {
                var c_b_headsheading = $this.clone();
                adjacentSiblingParagraph.prepend(c_b_headsheading);
                $this.remove();
              }
            });
            
            if(container.data('showreferenceoverlaypopup') === true){

                var counter;
                $('.xref a[href^="#R"]').popover({
                  trigger: 'manual',
                  animation: false,
                  html: true,
                  content: function () {
                    var ithis = $(this), linktext = ithis.text(), lowEnd, highEnd, thisURL, htmlcontents = '', 
                      refNumberArray = new Array(), numberList = false, items, i = 0;
                             
                    
                    //console.log(linktext + ' ' + linktext.indexOf('%u2013'));
                    // console.log(linktext + ' ' + linktext.indexOf('–'));
                    //we use greater than one as the character should not be the first character
                    if (linktext.indexOf('–') > 0) {
                      //console.log('number1 ' +linktext.split('–')[0]);
                      //console.log('number2 ' +linktext.split('–')[1]);
                      lowEnd = Number(linktext.split('–')[0]);
                      highEnd = Number(linktext.split('–')[1]);
                    } else if (linktext.indexOf(',') > 0) {
                      refNumberArray = linktext.split(',');
                      //console.log ('refNumberArray:' + refNumberArray);
                      //console.log('refNumberArray.length' + refNumberArray.length);   
                      for (i in refNumberArray) {
                        if (typeof Number(refNumberArray[i]) === 'number') {
                          //console.log ('Number(item) ' + numberList);
                          numberList = true;
                        } else {
                          //if any item in array is NaN then we dont care about any other values and we want to return false
                          numberList = false;
                          //console.log ('numberList: ' + numberList);
                          break;
                        }
                      }
                    }
                    //check if not Null, undefined etc...
                         
                    if (lowEnd && highEnd) {
                      for (var i = lowEnd; i <= highEnd; i++) {
                        thisURL =  '#R' + i;
                        if ($(thisURL).length) {
                          htmlcontents += $(thisURL).html();
                        }
                      }
                      return htmlcontents;
    
                    } else if(numberList && refNumberArray) {
                      //console.log ('refNumberArray: ' + refNumberArray);
                      for (i in refNumberArray) {
                        thisURL =  '#R' + refNumberArray[i].trim();
                        //console.log('thisURL' + thisURL);
                        if ($(thisURL).length) {
                          htmlcontents += $(thisURL).html();
                        }
                      }
                      return htmlcontents;
                    } else {
                      thisURL = ithis.attr('href');
                      htmlcontents = $(thisURL).html();
                      if (htmlcontents) {
                        return htmlcontents;
                      }
                    }
                  },
                  placement: 'auto'
                }).on("click",function () {
                  var _this = this; // thumbcontainer
                  $(_this).popover('hide');
                  return true
                    
                }).on("mouseenter",function () {
                  var _this = this; // thumbcontainer
                  $(_this).addClass('is-hover');
                  //console.log('thumbcontainer mouseenter');
                  // clear the counter
                  clearTimeout(counter);
                  // Close all other Popovers
                  $('.xref a[href^="#"]').not(_this).popover('hide').removeClass('is-hover');
    
                  // start new timeout to show popover
                  counter = setTimeout(function(){
                    if($(_this).hasClass('is-hover'))
                    {
                      $(_this).popover("show");
                    }
                    $(".popover").on("mouseleave", function () {
                      $('.xref a[href^="#"]').popover('hide');
                      $(_this).removeClass('is-hover');
                    });
                  }, 400);
    
                }).on("mouseleave", function () {
                  var _this = this;
                  //console.log('thumbcontainer mouseleave');
                  setTimeout(function () {
                    if (!$(".popover:hover").length) {
                      if(!$(this).hasClass('is-hover'))
                      {
                        $(_this).popover('hide').removeClass('is-hover');
                      }
                    }
                  }, 200);
                });
           }
            
            //OK lets add the script here to return the FT sections to the new menu when enabled.
            var sectionMenu = $('#html-body .dropDownMenu')
                                .first()
                                .contents()
                                .clone()
                                .addClass('dropdown-menu');
            
            var newSectionMenu = $('.navbar-nav__item--ft-sections');
            if (newSectionMenu) {
            newSectionMenu
                .find('.dropdown-menu')
                    .replaceWith(sectionMenu)
                    .end()
                .removeClass('disabled')
                .find('.dropdown-toggle')
                    .removeClass('disabled')
                    .attr('aria-disabled','false');
            }
          },
          error  : function(ftresp){
            container.html(container.data("fulltextunavailablemsg")).removeClass("hidden-js-div");
            var cMsg = "'fulltext' AJAX GET (Stage 2) to '" + resp + "' failed: " + ftresp.status + " (" + ftresp.statusText + ")";
            //console.log(cMsg);

            // Remove the spinning icon...
            $(".itemFullTextLoading").remove();
          }
        });
      },
      error  : function(resp){
        container.html(container.data("fulltextunavailablemsg")).removeClass("hidden-js-div");
        var cMsg = "'fulltext' AJAX GET (Stage 1) to '" + fulltextUrl + "' failed: " + resp.status + " (" + resp.statusText + ")";
        console.log(cMsg);

        // Remove the spinning icon...
        $(".itemFullTextLoading").remove();
      }
    });
  }
}

function inlineTable(container) {
  if (container) {
    container.find('.js-table-caption-container:not([data-hascccess=false])').each(function (index) {
      var $this = $(this);

      var tableHeadingText = $this.find('.table-label').text();
      var tableWebId = $this.data('webid');
      var hideInlineTable = container.data('hideinlinetablesbydefault'); //default to display tables.
      var openFullscreen = "Open " + tableHeadingText + " fullscreen"; //this need changing to data properties
      var context = $('#hiddenContext').text()
      var tableLink = context + tableWebId + '?fmt=ahah&fullscreen=true';

      var expandText = container.data('fulltextexpandlinktext') + tableHeadingText;

      //append initally display as if the table are hidden. (we can change this once the Ajax has been successfull) 
      $this.append('<a href="#" class="toggle-table js-toggle-table">' + expandText + '&nbsp;<i class="fa fa-table" aria-hidden="true"> \
        </i>&nbsp;<i class="fa fa-caret-up" aria-hidden="true"></i></a> \
        <a href="' + tableLink + '" target="_blank" class="open-table-fullscreen js-open-table hidden pull-right" \
        >' + openFullscreen + ' <i class="fa fa-expand" aria-hidden="true"></i></a>');

      //zero based index
      if (hideInlineTable !== true && index < 10) {
        //console.log('I got ere!' + hideInlineTable);
        //only trigger the display of the first 10 tables to avoid overloading the server.
        $this.find('.js-toggle-table').trigger('click');
      }

    });
  }
}

// Toggle the footer caption inside the popup view
function toggle(){
  $('.cover .js-tgl').slideToggle();
  $('.cover .fa').toggleClass('hidden');
}

// Download PPT method for popup view
function downloadPpt(pos, container){
  var $pptForm = $($(container).find('form[name="pptFigForm"]').get(pos));
  articleCitation = $(".metadata_citation").text();
  $pptForm.find("input[name='citation']").val(articleCitation);
  $pptForm.submit();
}

/** Initialise fancybox instance for the fulltext tab and the figures and tables tab
  * Takes the image container and gallery name for the slides to be part of
**/
function initFancyBox(container,gallery){
  var shouldDisplayDownloadPowerPointOption = $('.showPPT').data('showppt');
  $('[data-fancybox="' + gallery + '"]').fancybox({   
    slideShow  : false,
    closeClickOutside: false,
    caption: function( instance, item ) {
      var caption, title;
      if ( item.type === 'image' ) {
        caption = $(this).data('caption');
        title = $(this).data('title');

        caption   = "<div class='cover'> \
                      <span class='showhide' onclick='toggle()'> \
                        <i class='fa fa-chevron-up' aria-hidden='true'></i> \
                        <i class='fa fa-chevron-down hidden' aria-hidden='true'></i> " + title +
                      "</span> \
                      <div class='js-tgl' style='display:none'>" + caption +
                      "</div> \
                    </div>";
        return caption;
      }
    },
    onInit : function( instance, item ) {
    	$('.annotator-frame').hide();
      if(shouldDisplayDownloadPowerPointOption) {
        instance.$refs.downloadButton = $('<a class="fancybox-button fancybox-download" title="Download PPT" download></a>')
        .appendTo( instance.$refs.buttons );
      }
    },
    beforeMove: function( instance, current ) {
      if(shouldDisplayDownloadPowerPointOption) {
        var dwnldStr = "downloadPpt(" + current.index + ", '" + container+ "')";
        instance.$refs.downloadButton.attr('onclick', dwnldStr);        
      }
      logInvestigationEventForFancybox(current);
    },
    afterLoad: function(){
      var svgBackgroundColor = document.getElementsByName('svgImageBackgroundColor')[0].value;
      $('.fancybox-image').each(function(index,image){         
         if(svgBackgroundColor != null && image.src.endsWith(".svg")){
            $(image).css('background-color',svgBackgroundColor);           
         }
      });
   },
   afterClose: function(){
	   $('.annotator-frame').show();
   }
  });
}

/**
 * this function is needed because of dynamically added controls 
 * cannot be bound to eventListeners as they get new instances on
 * each slideshow. so approach is add a flag class on the element
 * itself to avoid logging duplicate events.
 */
function logInvestigationEventForFancybox(current) {
    var currEl = current,
    eventLogUrl = $("meta[name='stats-meta']").data("logstatisticsurl");
    
    if(eventLogUrl) {
	    eventData = {
	      "eventType": "INVESTIGATION",
	      "eventProperties.ITEM_ID": $("meta[name='stats-meta']").data("itemid")
	    };
	    //console.log(eventData);  
	    $.ajax({
	         url: eventLogUrl,
	         type: "GET",
	         data: eventData,
	         success: function(resp, statusText) {
	         //console.log("event logged");
	         },
	         error: function(req, statusText, errorThrown) {
	         }
	    });
    }
}


function logInvestigationEvent(e) { 
   var currEl = $(this),
   eventLogUrl = $("meta[name='stats-meta']").data("logstatisticsurl");
 
   if(eventLogUrl) {
	   eventData = {
	      "eventType": "INVESTIGATION",
	      "eventProperties.ITEM_ID": $("meta[name='stats-meta']").data("itemid")
	   };
	   //console.log(eventData);
	   $.ajax({
	         url: eventLogUrl,
	         type: "GET",
	         data: eventData,
	         success: function(resp, statusText) {
	         },
	         error: function(req, statusText, errorThrown) {
	         }
	   });
   }
}

// Gets the list of all images with metadata for fulltext tab
function getImagesMetaData(){
   $.ajax({
    type: 'GET',
    url: $("#hiddenContext").text() + $('.metadata_itemWebId').text() + '/figure?fmt=ahah',
    success: function(resp) {
      $(resp).find('.singleFigureContainer').each(function(index){
          
        var imageAnchor = $($('.image a.media-link').get(index));
        imageAnchor.attr('href',$(this).find('a[data-fancybox]').attr('href'));
        imageAnchor.data('title',$(this).find('.metadata_title').html());
        imageAnchor.data('caption',$(this).find('.metadata_description').html());

        var imageContainer = $($('.html-fulltext-responsive-figure').get(index));
        $(this).find('.downloadAsPptContainer').addClass('hidden');
        $(this).find('.downloadAsPptContainer').appendTo(imageContainer);
      });
      
      $('.image a.media-link').attr('data-fancybox','gallery1');
      
      initFancyBox('.html-fulltext-responsive-figure', 'gallery1');
    },
    error  : function(resp){
    }
  });
}

function replaceHash(hash) {
  return window.location.replace(
    '#' + hash.replace(/^#/, '')
  );
}
