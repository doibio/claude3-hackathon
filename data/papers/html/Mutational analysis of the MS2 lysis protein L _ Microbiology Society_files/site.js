



var findToggleContent = function(obj) { 
    return $(obj).siblings(".togglecontent").add($(obj).parent().siblings(".togglecontent"));
};


function isEmpty(str) {
    return (!str || 0 === str.length);
}


function doubleTitleLinks(){

 /* ==================================
      double icon issue / search results due to title having link it in.
      ========================================*/
    $("[target='xrefwindow']").each(function(){
    /*  each href link to a doi in a title has span wrapped around it and parent Href given a class */
    var thisParent = $(this).parent();
    $(this).wrap("<span class='wrapTitle'></span>");
       $(".wrapTitle").prev().addClass("emptyHref"); 
    });

    // remove the link for the doi part of the title
     $("[target='xrefwindow']").children(".jp-italic").unwrap("<a></a>");

   // look through each empty href (due to an internal href in title)  
    $(".emptyHref").each(function(){
        var $this = $(this);
        var $thisParent = $(this).parent();
        var hrefT = $(this).attr("href"), hrefC = $(this).text();
        
        // $(this).parent().append(hrefT);
        $(this).parent().prepend(hrefC);
        $(this).parent().wrapInner("<a href='' class='newLinkWrapper'></a>");
        $(this).append(hrefC);
        $(this).parent().attr("href",hrefT);

        $(this).remove();

    });
    /* ==========================================================================*/


}

//anonymous function so vars are not in global scope.
(function(){
var currentUrl = window.location.href,  
    urlParts = currentUrl.split("?"),
    queryString = urlParts[1],
    queryStringParts = [],
    paramKeyValuePair = [],
    latestIssueLink = $("#currentissuetab > a").attr("href");
//if not empty or null etc
    if (queryString && latestIssueLink) {
        queryStringParts = queryString.split("&"); 
        // if no further queryStringParts
        if (queryStringParts.length === 0){
            queryStringParts[0] = queryString;  
        }

        for (var i= 0; i < queryStringParts.length; i++) {
            
            paramKeyValuePair = queryStringParts[i].split('=');
            if (paramKeyValuePair[0] === 'open' && paramKeyValuePair[1] === 'latestissue') {
                //redirect to the url of the #currentissuetab url
                window.location.href = latestIssueLink;
            }
        }
        
       
    }

})();



/**
 * Loads a JavaScript script from the cache, if available
 */
jQuery.cachedScript = function(url, options) {
    // allow user to set any option except for dataType, cache, and url
    options = $.extend(options || {}, {
        dataType : "script",
        cache : true,
        url : url
    });
    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return jQuery.ajax(options);
};


window.document.addEventListener('fireInvestigation', handleIframeEvent, false);
function handleIframeEvent(e) {
	var eventLogUrl = $("meta[name='stats-meta']").data("logstatisticsurl");

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

/* ONLOAD ACTIONS */ 
$(document).ready(function() {
    /*For Chapters tab*/
    $( "#chapters_tab" ).on( "click", function() {
        var ajaxurl = $(this).find('i[data-ajaxurl]').data('ajaxurl'),
            data = "";
      if(ajaxurl) {
          $("#book div.toc").append('<img id="loader" src="/images/jp/spinner.gif" alt="Loading" width="21">');

          if (ajaxurl.indexOf("?") != -1) {
             data = ajaxurl.split('?')[1];
             ajaxurl = ajaxurl.split('?')[0];
          }

          $.ajax({
            method: "POST",
            data: data,
            url: ajaxurl,
              success: function(response, status){
              $('#book .toc').html(response);
            },
            error: function(error,status){
                
            }
          });
        }
    });
  
    
    $(".js-toggle-search-window").on( "click", function() {
        var quickSearchContainer = $('#search-nav');
        quickSearchContainer.toggle();
        quickSearchContainer.find('#quickSearchBox:visible').focus();

     });


    /* MOBILE and Desktop MENU JS Starts */
    (function() {
        "use strict";
        
     
        var dlMenuElems = $('.dl-menuwrapper'),
            desktopButtonElems = $('.js-collapse-btn'),
            mobileButtonCSSClass = '.js-dl-menu-btn',
            mobileButtonElems   =  $(mobileButtonCSSClass),
            megaDropdownMenus       =  $('.mega-dropdown-menu');
        
        /* Initilize all the Dl menus */
            //dlMenuElems.dlmenu();
            

           /* Event for Menu bar on moblie */
           mobileButtonElems.on('click', function(e) {
               e.preventDefault();
               e.stopPropagation();
               var iThis = $(this),
                     iThisMenuDiv =   $(iThis.data('menucontainerid'));
               
                   // close all other menus in the case they are open
                   dlMenuElems.not(iThisMenuDiv).dlmenu('closeMenu');
                   
                   //remove all active classes on other menu items
                   iThis.siblings(mobileButtonCSSClass).removeClass('active');

               if (iThis.hasClass('active')) {
                   iThis.removeClass('active');
                       //console.log('close dlmenu main navigation');
                       iThisMenuDiv.dlmenu('closeMenu');
               } else {
  
                   iThis.addClass('active');
                       //console.log('open dlmenu main navigation');
                   iThisMenuDiv.dlmenu('openMenu');
               }

           });
    
            
           /*
              * this event is fired on mouseEnter of the button/menu on desktop
              * or the click/press of the admin button
              */ 
           desktopButtonElems.on('mouseenter click', function(e) {
                   
                    e.preventDefault();
                    // first step is to determine which link was clicked
                    var menuBtn = $(this),
                        megaMenuDiv = $(menuBtn.attr('href'));
                    if (!menuBtn.hasClass('activated')){
                        
                        menuBtn.addClass("activated");
                        megaMenuDiv.stop().fadeIn(300, function() {
                            megaMenuDiv.addClass("visible1")
                            .removeClass("second");
                       
                            //remove all existing menuClasses
                            desktopButtonElems.removeClass('js-btn-trigger-admin-megamenu');
                            megaDropdownMenus.removeClass('js-collapse-panel');
                           
                          //now lets apply a class to the menuBtn and MegaMenuDiv to target that they are now active.
                            menuBtn.addClass('js-btn-trigger-admin-megamenu');
                            megaMenuDiv.addClass('js-collapse-panel');
                            
                           //console.log('Initial click of button desktop!')
                       
                        });
                        
                    }
               
            });
           
           // if we leave the menu we need it to close (this will work for mouse pointers only) and is applied using delegate syntax
       $('header').on('mouseenter','.js-btn-trigger-admin-megamenu, .js-collapse-panel' , function() {
           $('.js-btn-trigger-admin-megamenu').addClass("activated");
           $('.js-collapse-panel').stop().fadeIn(300, function() {
               $('.js-collapse-panel').addClass("visible1")
                 .removeClass("second");
                    
               //console.log('mouseenter event triggered on menu items!');
             });
         })
         .on('mouseleave', '.js-btn-trigger-admin-megamenu, .js-collapse-panel', function() {
             $('.js-btn-trigger-admin-megamenu').removeClass("activated");
             $('.js-collapse-panel').stop().fadeOut(300, function() {
                 $('.js-collapse-panel').removeClass("visible1")
                    .addClass("second");
                    //console.log('mouseleave event triggered on menu items!');
                 });
          });
           
         // JS for hide menu and collapse div on outside click and click on other icons starts 
           $(document).click(function(e) {
               //console.log('click on all elements event fired!');

               var clickover = $(e.target);

               // JS for hide collapseon outside click starts 
               var $navbar = $(".navbar-collapse");
               var _opened = $($navbar).hasClass("in");

               if (_opened === true &&
                   !clickover.parents().hasClass("navbar-collapse") &&
                   !clickover.hasClass("navbar-collapse")) {
                   //console.log(' hide navbar-collapse ');
                   $navbar.collapse('hide');
               }
               // JS for hide collapseon outside click ends 

               // JS for hide dlmenu on outside click starts
               var $navbar2 = $('.dl-menu');
               var _opened2 = $($navbar2).hasClass("dl-menuopen");

               if (_opened2 === true && !clickover.parents().hasClass("mobile-mega-dropdown-menu") &&
                   !clickover.parents().hasClass("js-dl-menu-btn") &&
                   !clickover.hasClass("mobile-mega-dropdown-menu") &&
                   !clickover.hasClass("js-dl-menu-btn")) {
                   //console.log('closeMenu and do something else! ');
                   dlMenuElems.dlmenu('closeMenu');
                   mobileButtonElems.removeClass('active');
                   desktopButtonElems.removeClass('js-btn-trigger-admin-megamenu');
                   megaDropdownMenus.removeClass('js-collapse-panel');
               }
               // JS for hide dlmenu on outside click ends 

           });
  

        if (matchMedia) {
            var mq = window.matchMedia("(max-width: 844px)");
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            // below classes are toggled between mobile and desktop
            if (mq.matches) {
                 // console.log('I am mobile!');
                
                //remove delegate classes when going to mobile viewport
                desktopButtonElems.removeClass('js-btn-trigger-admin-megamenu');
                megaDropdownMenus.removeClass('js-collapse-panel');
                 
                 // OK the only events we need triggered in this logic is to
                 // attach the dlMenu for mobile.
                 dlMenuElems.dlmenu();
                 dlMenuElems.dlmenu('resetMenu');                
                 dlMenuElems.dlmenu('closeMenu');

                 mobileButtonElems.removeClass('active');
                 
                 megaDropdownMenus.show(); // need to make sure the megaMenudiv
                                             // is not css "display: none" before
                                             // the dlmenus are called hopefully
                                             // this will fix the FF issue.
                 
                 $('main .js-searchcomplete').attr('placeholder','Search...');

            }  else {
                // console.log('I is desktop!');
                
                /* Close the dlmenu as its not used on Desktop */
                $('ul.dl-menu li').off('.dlmenu'); //remove all events with name space .dlmenu.
                //dlMenuElems.dlmenu('closeMenu');
                
           
                dlMenuElems.find('.dl-menu').removeClass( 'dl-menuopen' );
                
                desktopButtonElems.removeClass("activated");
                 megaDropdownMenus.stop().fadeOut(10, function() {
                     megaDropdownMenus.removeClass("visible1")
                    .addClass("second");
                });
                 
                 $('main .js-searchcomplete').attr('placeholder', 'Search articles, authors, DOIs, keywords');
                 
                 
              
           }
        }

    })();
   /* MOBILE and Desktop MENU JS Ends */

    ingentaCMSApp.displayElipsisDescription();
    
    $(".js-connect-orcid").click(function(e){
        var oauthWindow = window.open($("#hiddenContext").text() + "/orcid/out.action?signInTarget=%2Forcid%2Freturn.action", "_blank", "toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500");
        e.preventDefault();
    });
    
    $(".js-back-top").click(function(){
        ingentaCMSApp.goToLocation(this);
 
    });
    
    $("#publisherslistpage .pagination a").click(function(){
        ingentaCMSApp.goToLocation(this);
        
    });

    
    // a-z filter option for smaller screens
    $( ".js-a_to_z_mobile" ).on('change',function() {

        
        var url = $(this).find(':selected').data('url'),
            isHashAnchorLink = $(this).data('ishashanchorlink');
        //if it is a hash anchor link then we don't want to append the hidden context
        if (!(url.indexOf('/pub2web') == 0) && !isHashAnchorLink){
            url = $("#hiddenContext").text() + url;
        }
        window.location.href =  url;
    });
    
    $('.access-options .disabled').click(function(e){
        // Disabled links from going anywhere when class disabled is added!
          e.preventDefault(); 
       });
    
    var hiddenContext = $("#hiddenContext").text(),
    appUrls = {
        "autosuggest":      hiddenContext + "/search/autosuggest",
        "citations":        hiddenContext + "/content/citations",
        "commentcount1":    hiddenContext + "/commenting/comments/commentscount.action",
        "commentcount2":    hiddenContext + "/commenting/comments/jsoncommentscount.action",
        "metrics":          hiddenContext + "/metrics/metrics.action",
        "morelikethis":     hiddenContext + "/search/morelikethis",
        "search":           hiddenContext + "/search",
        "searchahah":       hiddenContext + "/search/ahahsearch.action",
        "siq":              hiddenContext + "/siq/siq.action",
        "statslogredirect": hiddenContext + "/statslogredirect",
        "statslogwrapper":  hiddenContext + "/statslogwrapper",
        "gatheritems":      hiddenContext + "/collections/gatherItems"
    },
    winProps0 = "location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes",
    winProps1 = winProps0 + ",width=700,height=600",    // RightsLink window
    winProps2 = winProps0 + ",width=1024,height=600";   // T&C window

    


     //$("#quickSearchBox").val($(".searchTextDescription").text()).removeClass("lightgrey"); // populate the search box with search term used.
     
    function retrieveAcceptedManuscripts(element){
        var $thisParent = $(element).parent().parent();
        //var dateSectionURL = $thisParent.find(".dateSectionURL").html();
        var showhideStateObj = $thisParent.find(".openCloseDateSection");
        var showhideState = showhideStateObj.html();
        var ajaxUrl = $thisParent.find(".dateSectionURL").html();
        var ajaxSpinner = $thisParent.find("ul.hidden-js-div");
        
        if (!$thisParent.hasClass("errorResp")) {
            $thisParent.find(".fastTrackArticles").slideToggle(function(){
                if (showhideState == "[+]"){
                    showhideStateObj.html("[&ndash;]");
                }else{
                    showhideStateObj.html("[+]");
                }
            });
        }
        
        if (!$thisParent.hasClass("ajaxCalled")){
            $thisParent.removeClass("errorResp");
            $thisParent.addClass("ajaxCalled");
            ajaxSpinner.removeClass("hidden-js-div");
            $thisParent.addClass("ajaxCalled");
            ajaxSpinner.addClass("ajaxCall").removeClass("hidden-js-div");
        
            $.ajax({
                type:"GET",
                url:ajaxUrl, 
                success:function(resp){
                    ajaxSpinner.remove();
                    $thisParent.find(".fastTrackArticles").html(resp);
   
                    
                },
                error:function(resp){
                    $thisParent.find(".fastTrackArticles").html("Error getting articles..");
                    $thisParent.removeClass("ajaxCalled").addClass("errorResp");
                    ajaxSpinner.addClass("hidden-js-div");
                    var errorMsg = "' failed: " + resp.status + " (" + resp.statusText + ")";
                    //console.log(errorMsg);
                }
        
            });
        }
    }
    
/*
    window.onhashchange = function(event){
      var urlPath = document.location;
      var stringLocal = urlPath.toString();
      var hash =  stringLocal.indexOf("#");
    //  console.log("$('div.itemFullTextHtml').data('fulltextcalled') = " + $("div.itemFullTextHtml").data("fulltextcalled"));
    //  var fullTextCalled= ($("div.itemFullTextHtml").data("fulltextcalled") == undefined) ? "true" : "true";
    //  if (!fullTextCalled.length > 0){
         $("#" + stringLocal.substring(parseInt(hash)+5) + " a").trigger("click");
    // }
      
    };
*/  
    
    function createCookie(name, value, days) {
    var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    
    //when user clicks sso sign in first save the location in cookie
    $(".ssoSignInLink").click(function(){
        var locationUrl = window.location.href;
        //console.log(locationUrl);
        createCookie("sir", locationUrl, 1);
    });

    // Replace all broken images with placeholder images
    $("img.cover").error(function() {
        $(this).unbind("error").attr("src", "/images/" + ingentaCMSApp.instanceprefix + "/placeholder-image.jpg");
    });
    
    // Replace all broken logos with a placeholder logo.
    $("img.logo").error(function() {
        $(this).unbind("error").attr("src", "/images/" + ingentaCMSApp.instanceprefix + "/placeholder-logo.png");
    });

    
    /* Bookmark dropdown */


    var timeout    = 500;
    var closetimer = 0;
    var bookmarkmenuitem = 0;

    function bookmarkmenu_close() {
        if (bookmarkmenuitem) {
            bookmarkmenuitem.css('display', 'none');
        }
    }

    function bookmarkmenu_timer() {
        closetimer = window.setTimeout(bookmarkmenu_close, timeout);
    }

    function bookmarkmenu_canceltimer() {
        if (closetimer) {
            window.clearTimeout(closetimer);
            closetimer = null;
        }
    }

    function bookmarkmenu_open() {
        bookmarkmenu_canceltimer();
        bookmarkmenu_close();
        bookmarkmenuitem = $(this).find('.moreshareoptions').css('display', 'block');
    }

    document.onclick = bookmarkmenu_close; 


    $(".viewfurthershareoptions").mouseover (bookmarkmenu_open);
    $(".viewfurthershareoptions").mouseout (bookmarkmenu_timer);
    $(".viewfurthershareoptions img").click (bookmarkmenu_open);

    $(".searchDiv .down-button").click(function() {
        return false;
    });
    
    $(".aopTocShowhide h5 a").click(function(e){
        retrieveAcceptedManuscripts($(this));
        return false;
    });

    // AHAH call for citations
    $("#cite").find("a").click(function(e) {
        
            itemId = $("#itemIdForCitations").text(),
            data = {
                "requesttype": "citations",
                "fmt": "ahah",
                "contentitem": itemId
            },
            url = $("#hiddenContext").text() + "/content/citations";


        $.ajax({
            type: "GET",
            data: data,
            url: url,
            dataType: "html",
            success: function(resp, statusText) {
                $(".citingArticlesLoading").remove();
                if (resp !== null) {
                    $("#citationContent").get(0).innerHTML = resp;
                }
            },
            error: function(req, statusText, message) {
                $(".citingArticlesLoading").remove();
            }
        });
    });


    $("#bellowheadercontainer").on("mouseover", ".Digital", function(){
        $(this).closest(".Digital_box").children(".Digital_PopUp").show();
    });
    

    $("#bellowheadercontainer").on("mouseout", ".Digital", function(){
        $(".Digital_PopUp").hide();
    });
    

    $("#bellowheadercontainer").on("mouseover", ".Print", function(){
        $(this).closest(".Print_box").children(".Print_PopUp").show();
    });
    
    
    
    $("#bellowheadercontainer").on("mouseout", ".Print", function(){
        $(".Print_PopUp").hide();
    });
    

    $("#bellowheadercontainer").on("mouseover", ".ApplicationDues", function(){
      $(this).closest(".ApplicationDues_box").children(".ApplicationDues_PopUp").show();
    });
    
    $("#bellowheadercontainer").on("mouseout", ".ApplicationDues", function(){
      $(".ApplicationDues_PopUp").hide();
    });
    
   
    $("#bellowheadercontainer").on("mouseover", ".Webinar", function(){
        $(this).closest(".Webinar_box").children(".Webinar_PopUp").show();
      });
    
   
    $("#bellowheadercontainer").on("mouseout", ".Webinar", function(){
        $(".Webinar_PopUp").hide();
      });
    
    
    // recurring confirm button. set defaults 
    $("#checkout_recurringConfirm").attr("disabled","true");
    $(".buttoncontainerConfirm .blueButtonBG").fadeTo("fast",0.23);
    $("#checkout_recurringConfirm").css("cursor","default");
    // check isnt already checked if so amend attr and fade
    if($("input[name='paymentProfileId']:checked").length > 0){
        $("#checkout_recurringConfirm").removeAttr("disabled");
        $(".buttoncontainerConfirm .blueButtonBG").fadeTo("fast",1);
        $("#checkout_recurringConfirm").css("cursor","pointer");
    }
    // if radio selected remove attr and fade in.
    $(".confirmRadioButton").click(function(){
         $("#checkout_recurringConfirm").removeAttr("disabled");
         $(".buttoncontainerConfirm .blueButtonBG").fadeTo("fast",1);
         $("#checkout_recurringConfirm").css("cursor","pointer");
    });
    
    
    var buyThisBookHeader = $("div.embodiment-header").html();
    if (buyThisBookHeader != null) {
      $(".pubtopright").prepend("<div class='embodiment-header'>" + buyThisBookHeader + "</div>");
    }

    /* Do not show recurring payment options on carts which contain items that do not support this*/
    if ($(".paymentagencies > .authorizecContainer")[0]){
        if ($("input[value='download']").length > 0 || $("input[value='hardcover']").length > 0){
             $(".authorizecContainer").hide();
             $('.radioauthorizec').removeAttr('checked');
             $('.radioauthorize').attr('checked','checked');
        }
     }

    /* Issue due to ahah call so not being bound so applied a click to Export Citations as live/on
    don't work with toggle so changed slightly. BUG 45783 */



  
    
        $( document ).on("click",".js-addToFavouritesButton", function(e) {
            var favButton = $(this);
            var span = favButton.find("span");
            if (span.length == 0) {
               span = favButton;
            }
            var postToUrl = favButton.parents(".favouritesForm").attr('action');
            var theForm = favButton.parents(".favouritesForm");
            var markedInput = $(theForm).find("input[name^='MARKED']");
            var event = theForm.find(".js-favouritestatsevent").text();           
            var statsurl = $("#hiddenContext").text() + "/statslogredirect"; // this is a hack to get it to run on dev!
            
            var removeMarkedListtext = favButton.attr("data-removemarkedlisttext");
            var addToMarkedListtext = favButton.attr("data-addtomarkedlisttext");

            //lets temporarily replace the heart image with spinner image while the item is being set as a faviourite....
            favButton.attr('disabled', 'disabled').find('.favouritesIcon').removeClass('fa-heart').addClass('fa-spinner fa-spin');
            
            e.preventDefault();
             
            $.ajax({
                type: "GET",
                url: postToUrl,
                data: theForm.serialize(), // serializes the form's elements.
                success: function(data) {
                    
                    favButton.removeAttr("disabled").find('.favouritesIcon').removeClass('fa-spinner fa-spin').addClass('fa-heart');
                    /* replicate change to form */
                    if (markedInput.val() == 'on') {
                        markedInput.val('off');
                        span.html(removeMarkedListtext);
                    } else if (markedInput.val() == 'off') {
                        markedInput.val('on');
                        span.html(addToMarkedListtext);
                    }

                    //theStar.css('background', 'url("/images/sgm/icon-fa.png") no-repeat scroll transparent');

                    /* send stats data */
                    if (event) {
                       $.post(statsurl, {statsLogContents:event});
                    }
                 }
             });
            
            return false;
        });

     
     
 /* START - Journal - Contents tab*/
    $(".domainListing h2").click(function(){      
       $(this).next().next(".startDiv").slideToggle();
       //$(this).next().next(".startDiv").find(".description").css("display","none");
       $(this).find(".contenttabPlus").toggle();
       $(this).find(".contenttabHide").toggle();
    });
       
     //use images for +/-
     $("#contenthometabid .contenttabPlus").html("<img src=\"/images/sgm/icon_accordion_open.png\" alt=\"[&ndash;]\" />");
     $("#contenthometabid .contenttabHide").html("<img src=\"/images/sgm/icon_accordion_close.png\" alt=\"[+]\" />").hide();
     /* END - Journal - Contents tab*/
    
    /* required to add right slice img blue buttons */
    $("#accountmanagementpage input[type='submit'], #accountdetails input[type='submit']").each(function () {
        var currentClassesButtons = $(this).attr("class");
        $(this).addClass("button-left").wrap("<span class='button-right'>");
        //$(this).parent(".button-right").wrap("<span class='clear "+currentClassesButtons+"'>")
    });
     
  /* */
   $("#value2").click(function(){
     // console.log($(this).find(":selected").attr("name"));
     var optionValue = $(this).find(":selected").attr("name");       
     $(".dropdownCover").html(optionValue);

   });
   
   $("#value2").trigger("click");
   
    
  $(".closeMembershipPopup").click(function(){
      $(this).parent().hide();
  });

    $(".searchDiv select").hover(
        function() {
            // mouseenter action
            $(this).css("cursor", "hand");
        },
        function() {
            // mouseleave action
            $(this).css("cursor", "pointer");
        }
    );

    $(".searchDiv .down-button").hover(function() {
        // mouseenter and mouseleave action
        $(this).css("cursor", "pointer");
    });



    /* Handle a dialog box for figures (and tables) in 'Figures' tabbed section */
    /* Brill provided the basis for this...bookmarkmenuitem                     */

    /* Define the basic dialog box... */
    $("#figuredialog").dialog({
        autoOpen:false,
        height:576,
        width:768,
        modal: true,
        resizable: true,
        position: {
            my: "center",
            at: "center",
            of: $("body")
        }
    });

    $(".figure .journalimg img").click(function() {

        /* Only a single instance of the dialog exists, */
        /* so remember to clear it out each time        */
        $("#figuredialog .figlegend").remove();
        $("#figuredialog .figitem").remove();
        $("#figuredialog p").remove();

        /* Set the width and height as a proportion of the current viewport size */
        var figWidth  = $(window).width()  * 0.8;
        var figHeight = $(window).height() * 0.8;

        var filetitle = $(this).attr("title");
        var filetext  = $(this).attr("alt");
        var fileurl   = $(this).attr("src");
        var filelong  = $(this).attr("longdesc");
        var citationsText= $(this).attr("citationsText");


        var newImg = new Image();
        // If the full size image is available...
        if (filelong != "") {
            newImg.src = filelong;
        } else {
            newImg.src = fileurl;
        }
        // Construct a new dialog...
        newImg.onload = function() {
            imgheight = figHeight;
            imgwidth  = figWidth;
            $("#figuredialog").append('<img class="figitem figimage" src="' + newImg.src + '" />');
            $("#figuredialog").append('<p class="figlegend"> ' + filetext + '</p>');
            $("#figuredialog").append('<p class="figlegend"><strong>Citation:</strong> ' + citationsText + '</p>');

            $("#figuredialog").dialog({ title: filetitle, height: imgheight, width: imgwidth, position: { my: 'center',at: 'center',of:  window}, modal: true, autoOpen:false });
            $("#figuredialog").dialog("open");
        };
        return false;
    });

    $(".figure .journalimg a").click(function() {

        /* Only a single instance of the dialog exists, */
        /* so remember to clear it out each time        */
        $("#figuredialog .figlegend").remove();
        $("#figuredialog .figitem").remove();
        $("#figuredialog p").remove();

        /* Set the width and height as a proportion of the current viewport size */
        var figWidth  = $(window).width()  * 0.8;
        var figHeight = $(window).height() * 0.8;
        var here = $(this).parent();
        var filetitle = here.find(".issuetocfiguretitle").html();
        var filetext  = here.find(".issuetocfiguretext").html();
        var fileurl   = here.find(".issuetocfigureurl").html();
        var filelong  = here.find(".issuetocfigurefilelong").html();
        var citationsText= here.find(".issuetocfigurecitationtext").html();

        var newImg = new Image();
        // If the full size image is available...
        if (filelong != "") {
            newImg.src = filelong;
        } else {
            newImg.src = fileurl;
        }
        // Construct a new dialog...
        newImg.onload = function() {
            imgheight = figHeight;
            imgwidth  = figWidth;
            $("#figuredialog").append('<div class="figlegend"> ' + filetext + '</div>');
            $("#figuredialog").append('<img class="figitem figimage" src="' + newImg.src + '" />');
            $("#figuredialog").append('<div class="figlegend"><strong>Citation:</strong> ' + citationsText + '</div>');

            $("#figuredialog").dialog({ title: filetitle, height: imgheight, width: imgwidth, position: { my: 'center',at: 'center',of:  window}, modal: true, autoOpen:false });
            $("#figuredialog").dialog("open");
        };
        return false;
    });

    $("#figuredialog").bind("dialogbeforeclose", function(event) {
        $("#figuredialog .figlegend").remove();
        $("#figuredialog .figitem").remove();
        $("#figuredialog p").remove();
    });

    //
    // Extract the required social bookmarks...
    //
    // set the list as global, as this is called for search results page.
    var siteListBookmarks = [ 'google','citeulike','digg','bibsonomy','delicious','reddit','researchgate'];
    $(function () {
        // jquery bookmark plugin version 1.4.0 (now a part of JP) supports all bookmarking site.
        // set the list as global, as this is called for search results page.
        $(".js-moreshareoptions").bookmark({
            icons: '/images/jp/bookmarks.png',
            sites: siteListBookmarks
        });

        var timeOut;
        $(".js-sharelinks").mouseover(function(){
            $(this).find(".js-moreshareoptions").removeClass('hidden').show();
            clearTimeout(timeOut);
        }).mouseleave(function(){
          var ithis = $(this);
            timeOut = setTimeout(function(){ 
                ithis.find(".js-moreshareoptions").hide().addClass('hidden');
            }, 500);
        });
    });

    //
    // Allow the user to click on the fulltext icon itself...
    //

    $("body").on("click", ".fulltext li",function() {
        window.open($(this).find("a").attr("href"));
        return false;
    });

   //
   // Use a pop-up window rather than a full window...
   //
   $("a.popup").click(function(){
      var pWidth  = $(window).width()  * 0.6;
      var pHeight = $(window).height() * 0.6;
      // IF HREF to copyright clearance center, don't add the ? url bit...
      var thishref = $(this).attr("href");
      if (thishref.indexOf("?") > -1) {
         window.open(thishref,'popup','toolbar=no,width=' + pWidth + ',height=' + pHeight);
      } else {
         window.open((thishref+'?url='+window.location.href),'popup','toolbar=no,width=' + pWidth + ',height=' + pHeight);
      }
      return false;
   });

    //
    // Temporary placeholders for adverts
    //
    var emptyPtrn = /empty\.gif/;

    if ($("#OAS_Top a img").length > 0) {
        var targetAd1 = $("#OAS_Top a img");
        try {
            var emptyAd1  = targetAd1.attr("src").match(emptyPtrn);
            if (emptyAd1 == "empty.gif") {
                targetAd1.attr({
                    src:    "/images/sgm/OAS_Top.placeholder.png",
                    width:  "728",
                    height: "90"});
            }
        }
        catch (err) {
            //console.log("Leaderboard advert blocked!");
        }
    }
    if ($("#OAS_Right a img").length > 0) {
        var targetAd2 = $("#OAS_Right a img");
        try {
            var emptyAd2  = targetAd2.attr("src").match(emptyPtrn);
            if (emptyAd2 == "empty.gif") {
                targetAd2.attr({
                    src:    "/images/sgm/OAS_Right.placeholder.png",
                    width:  "120",
                    height: "600"});
            }
        }
        catch (err) {
            //console.log("Skyscraper advert blocked!");
        }
    }

    
   /* back button click in browser will load full text or data and media at the moment.
    var hashSet = false;
    var idname;

    function historyLoad(hash) {
        hash = hash.substring(4);
        if (!hashSet){
            if(hash) { 
             // console.log("hash check for back button commented double click appended, hash = " + hash);
                $("#" + hash + " a").trigger("click");
            } 
        }
    }
        
    $.history.init(historyLoad);
*/

    //
    // Marker for NOT YET IMPLEMENTED
    //
    $("a[href='/mock/notimplemented'], a[href='/pub2web/mock/notimplemented']").each(function() {
        var here = $(this);
        var title = here.attr("title");
        if (title == "") {
            here.attr("title", "FUNCTIONALITY NOT YET IMPLEMENTED");
        } else {
            here.attr("title", title + " - FUNCTIONALITY NOT YET IMPLEMENTED");
        }
    });

    //
    // Marker for EXTERNAL links opening in new window
    //
    $("a[rel='external']").each(function() {
        var here = $(this);
        var title = here.attr("title");
        if (title == "") {
            here.attr("title", "Opens in new window/tab");
        } else {
            here.attr("title", title + " - opens in new window/tab");
        }
        here.attr("target", "_blank"); // add html to force in new window.
    });
    //
    // Disable the link for Supplementary Material title
    //
    $(".supplements h5 a").each(function() {
        var title = $(this).html();
        $(this).parent('h5').html(title).css({"color":"#222222", "font-weight":"normal"});
    });

   /* customizing Affiliation hideshow to avoid conflicts with general show/more sequence */


    $("#bellowheadercontainer").on("click", ".plusaff", function(){
      var $this = $(this);
      $this.siblings(".minusaff").show();
      $this.hide();
      $this.parent().siblings(".descriptionaff").show();
   });
   
    $("#bellowheadercontainer").on("click", ".minusaff", function(){
      var $this = $(this);
      $this.siblings(".plusaff").show();
      $this.hide();
      $this.parent().siblings(".descriptionaff").hide();
   });

   /* customizing Manuscript hideshow to avoid conflicts with general show/more sequence */
 
   $("#bellowheadercontainer").on("click", ".plusmanscript", function(){
      var $this = $(this);
      $this.siblings(".minusmanscript").show();
      $this.hide();
      $this.parent().children(".versioningContainer").show();
   });
 
   $("#bellowheadercontainer").on("click", ".minusmanscript", function(){
      var $this = $(this);
      $this.siblings(".plusmanscript").show();
      $this.hide();
      $this.parent().children(".versioningContainer").hide();
   });

    //
    // Slightly modified Show/Hide sequence...
    //

    $("#bellowheadercontainer").on("click", "#showHideDetail .more",function() {
        var $this = $(this);
        $this.parent().find(".hide").show();
        $this.hide();
        $("#hiddenDetail").toggle();
    });


    
     function showDisclaimer(message){
            $("body").append("<div class=\"overlay\"><div class='disclaimer signoutmessage'>"+message+"<button class='promptBack'>Back</button></div></div>");

            // Set the width and height as a proportion of the current viewport size
            var msgWidth  = $(window).width()  * 0.25;
            var msgHeight = $(window).height() * 0.25;

            $(window).scrollTop(0);
            $(".signoutmessage").css("top", msgHeight);
            $(".signoutmessage").css("left", msgWidth);

            //hide if user clicks
            
            $("body").on("click", ".promptBack", function(){
                 hideDisclaimer();
             });
           
         }
        
        function hideDisclaimer(){
            $("body").removeClass("overlay");
            $("body .overlay").remove();
        }
        
     $("#bellowheadercontainer").on("click", "#showHideDetail .less", function() {
        $(this).parent().find(".more").show();
        $(this).hide();
       $("#hiddenDetail").toggle();
    });
     



    
    //* adding handler for related content more link on article.jsp - as defined in JP site.js was not working *//

    $("#bellowheadercontainer").on("click", "#mostcitedcontent .morelink, #mostviewed .morelink", function(e) {
        $(this).parent().find(".hide").show('blind');
        $(this).after("<div class='lesslink'><a href='#'>&lt; Less</a></div>");
    });
    
    $("#bellowheadercontainer").on("click", "#mostcitedcontent .lesslink, #mostviewed .lesslink", function(e) {
        $(this).parent().find(".hide").hide('blind');
        $(this).remove();
        $(this).find(".morelink").show();
    });
    
    
    $("#bellowheadercontainer").on("click", "#related .morelink",  function(e) {
        $(this).show();
        var element = $(e.target).attr("class");
        //console.log(element);
        if (element == 'more'){
            $(this).find(".more").addClass("hidden");
            $(this).find(".less").removeClass("hidden");
        }else{
            $(this).find(".less").addClass("hidden");
            $(this).find(".more").removeClass("hidden");
            $(this).parent().find(".hide").hide('blind');
        }

    });

    
    /* pub med related slide toggle */
     
    $("#bellowheadercontainer").on("click", "#pubmed_related_content", function(e) {
        $('#pubmed_related_content_authors').slideToggle();
        /* toggle [+] to [-] using this class pubmed_related_plus_minus */
        if ($('span.pubmed_related_plus_minus').html() == "[+]") {
            $('span.pubmed_related_plus_minus').html("[&ndash;]");
        } else {
            $('span.pubmed_related_plus_minus').html("[+]");
        }
    });
    
  //  setUpPlusMinus();    
  //  setTimeout(setUpPlusMinus, 5000); //for related content box on article page, loads after page in finished

  
    
    
    //
    // Handle AoP affiliations...
    //
    $(".author-details .plus").each(function(){
        if (!$(this).hasClass("hide")) {
            $(this).parent().parent().find(".description").hide();
        }
    });

    //
    // Search results expand collapse all
    //
    $(".showlink").click(function(){
        $(this).parent(".showhideall").find(".hidelink").removeClass("inactive");
        $(this).addClass("inactive");
        $(".searchResultItemMetadata .showhide .plus").hide();
        $(".searchResultItemMetadata .showhide .minus").show();
        $(".searchResultItemMetadata .description").slideDown();
        return false;   
    });


    $(".hidelink").click(function(){
        $(this).parent(".showhideall").find(".showlink").removeClass("inactive");
        $(this).addClass("inactive");
        $(".searchResultItemMetadata .showhide .minus").hide();
        $(".searchResultItemMetadata .showhide .plus").show();
        $(".searchResultItemMetadata .description").slideUp();
        return false;   
    });


    
    /* expand code for sections */
    /*$(".sectionsExpand").trigger('click');
    $(".sectionsExpand").click(function(){
         $(this).parent().next().slideToggle();
        if ($(this).hasClass("minusSection")) {
             $(this).removeClass("minusSection").html("[+]");
        }else{
            $(this).addClass("minusSection").html("[&ndash;]");
        }
    });*/
    
    /* make section text and symbol clickable*/
    $(".sectionsExpand").parent('h2').trigger('click');
    $(".sectionsExpand").parent('h2').hover(function () {
        $(this).css("cursor","pointer");
    });
    $(".sectionsExpand").parent('h2').click(function(){
         $(this).next().slideToggle();
        if ($(this).children(".sectionsExpand").hasClass("minusSection")) {
             $(this).children(".sectionsExpand").removeClass("minusSection").html("[+]");
        }else{
            $(this).children(".sectionsExpand").addClass("minusSection").html("[&ndash;]");
        }
    });
    
    
    
    /* search box - checks if blank before submission */
    $(".topNavSearch").click(function(){
        //alert("working test");
        var searchBoxValue = $("#quickSearchBox").val();
        var indexOftheStringis = searchBoxValue.indexOf('Articles, Books and More...');
        //alert(indexOftheStringis);
        if (indexOftheStringis > -1) {
            alert("Please enter a search term");
            return false;
        }else if (searchBoxValue === ""){
            alert("Please enter a search term");
            return false;
        }else{
            $("#global-search-form").submit(); 
        }
    });
    
    $("#search_search_lensId").change(function(){
        //console.log(" this value is = " + $(this).val());
        if ( $(this).val() === 'cpdate') {
            $("#search_search_query_0_").val("*").removeClass("required").hide();
            $("#search_search_continDate").addClass("required").show();
            $("label.contindate").show();
        }else{
            $("#search_search_query_0_").addClass("required").show();
            $("#search_search_continDate").removeClass("required").hide();
            $("label.contindate").hide();
        }
    });
    // when page returns results show box again
    if ( $("#search_search_lensId").val() === 'cpdate') {
        $("#search_search_query_0_").val("*").removeClass("required").hide();
        $("#search_search_continDate").addClass("required").show();
        $("label.contindate").show();
    }else{
        $("#search_search_query_0_").addClass("required").show();
        $("#search_search_continDate").removeClass("required").hide();
        $("label.contindate").hide();
    }
    
    
    function pendingColors(){
        $(".qcActions .radioButtons label").eq(0).css("color","black");
        $(".qcActions .radioButtons label").eq(1).css("color","#39dd02");
        $(".qcActions .radioButtons label").eq(2).css("color","red");
        $(".publishActions .radioButtons label").eq(0).css("color","black");
        $(".publishActions .radioButtons label").eq(1).css("color","#39dd02");  
    }
    
    function pendingRequestForm() {
            var formContainer = $(".pendingForm");
            var pendingUrl = $("#hiddenContext").text() + formContainer.attr("data-item");
            
            $.ajax({
                type:"POST",
                url:pendingUrl,
                success:function(data){
                    formContainer.empty();
                    formContainer.append(data);
                    pendingColors();
                    $(".pendingSpinner").hide();
                    
                },error:function(){
                    formContainer.append("Error getting pending data, please refresh");
                }
            });
    }
    
    
    if ($(".checkBoxPending").length > 0){
        pendingColors();    
    }
    
    if($(".pendingItemForm").length > 0){
        pendingRequestForm();
    }
    
    
    $("#bellowheadercontainer").on("click", ".ahha.submitsearch", function(){
            var form = $("#approve"),
            formContainer = form.parents(".pendingItemForm"),
            spinner = formContainer.find(".pendingSpinner"),
            formStr = form.serialize(),
            formAction= form.attr("action"),
            validator = form.validate(),
            isforPublication = form.find("#approve_authorizationStatusApproved").is(':checked'),
            radioQCfailed = form.find(".radioButtons input[name=qcStatus]:eq(2)").is(':checked'),
            qcFailedAnswer = false;
            
            // radioQCfailed is done like this as the ID and value are using the full 
            // metastore URI and therefore not the best for targeting programmattically
            
            function submitData() {
                
                spinner.show();
                $.ajax({
                    type:"POST",
                    url:formAction,
                    data:formStr,
                    success:function(){
                        if (isforPublication) {
                            //this is a presumption that we dont want to present the user 
                            //with the pending approval form if they have selected publish 
                            //instead just load article.
                            location.reload();
                        } else {
                            pendingRequestForm();
                        }
                    },
                    error:function(){
                        spinner.hide();
                        formContainer.append("Error submitting pending data, please refresh");
                    }
                });
                
                
            }

            
            if (validator.form()) {
                if (isforPublication && radioQCfailed) {
                    qcFailedAnswer = confirm("You have selected status QC failed are you sure you wish to publish this article?");
                    if (qcFailedAnswer) {
                        submitData();
                    } //else do nothing!
                
                } else { 
                        submitData();
                }
            } else {
                form.find("input.error:eq(0)").focus(); //focus first element with invalid data
            }
            

    });
    


           $(".js-signinlink").click(function() {
                var $this = $(this);
                var containerWidth = $this.closest('.js-signinlinkcontainer').width();
                var formSignIn = $("#form-signin");
                var closeIcon = formSignIn.find(".js-close-panel");
                
                closeIcon.click(function() {
                    $this.trigger('click');
                    return false;
                });
        
 
            formSignIn
            .toggleClass('hidden-lg hidden-md hidden-sm hidden-xs loginDropdown list-group-item js-signinlinkcontainer');
            if(containerWidth > 0 ){
              formSignIn.css('width', (containerWidth + 10) + 'px');
            }
        
            $("#form-signin input:first").focus();
            return false;
           });
    
         
     /*   $('.js-nli-createalert').mouseenter(function(){
          $(this).css('cursor','pointer');
          $(this).css('text-decoration','underline');
        }).mouseleave(function(){
            $(this).css('cursor','auto');
            $(this).css('text-decoration','none');
        });*/


            $('.js-popoverLink').popover({
                container: 'body',
                html:true,  
                trigger: 'focus',
                delay: 100
               });
               
            $('html[dir="rtl"] .js-popoverLink').on('shown.bs.popover', function() {
                //this over rides the bootstrap popover position for RTL interfaces.
                var popOverField = $(this)[0],
                    rect = popOverField.getBoundingClientRect(),
                    bodyRect = document.body.getBoundingClientRect(),
                    rectLeftOffset = ((rect.left - bodyRect.left) - 60) + "px";
                //the minus 60 px is arbitrary based on testing! 
                    //rectRightOffset = (rect.right - bodyRect.right) + "px"; 
                
                //console.log('right:' + rectRightOffset + 'left:' + rectLeftOffset);
                $(".popover").css({
                    right: 'auto', //reposition to be in RTL context
                    left: rectLeftOffset
                });
            });
     

    function showSignInPrompt(message){
            
            function hideSignInPrompt(){
                $("body").removeClass("overlay");
                $("body .overlay").remove();
            }
            
            $("body").addClass("overlay");
            $("body").append("<div class=\"overlay\"><div class=\"signoutmessage\"><p>"+message+"</p></div></div>");

            // Set the width and height as a proportion of the current viewport size
            var msgWidth  = $(window).width()  * 0.4;
            var msgHeight = $(window).height() * 0.4;

            $(window).scrollTop(0);
            $(".signoutmessage").css("top", msgHeight);
            $(".signoutmessage").css("left", msgWidth);

            //hide if user clicks

            
           $("body").on("click", ".promptBack", function(){
                 hideSignInPrompt();
             });
           
         }
        

         $("#bellowheadercontainer").on("click", "#fulltexttoc .toclist .sectionlink", function(e) {
             moveDocument($(this).attr("href"));
             return false;
         });

         $("#bellowheadercontainer").on("click", "#morelikethis .morelink, #mostviewed .morelink, .mostcited .morelink", function(e) {
             var here = $(this);
             here.parent().parent().find(".hide").show();
             here.hide();
             return false;
         });
         

         $("#morelikethis .morelink a").on("click", function(e) {
             var here = $(this),hereAttrClass = $(this).attr("class");
           
           if (hereAttrClass === 'more'){
              here.parent().parent().find(".hidden-js-div").css("display","block");
                 here.addClass("hidden-js-div");
             here.parent().find(".less").removeClass("hidden");
             }else{
                 here.parent().find(".more").removeClass("hidden-js-div");
                 here.addClass("hidden");
               here.parent().parent().find(".hidden-js-div").css("display","none");
             }
             return false;
         });
         

      $(".js-signoutlink").click(function(e) {
            $("#signoutform").submit();
          e.preventDefault();
       }); 

      // jquery bookmark plugin version 1.4.0 (now a part of JP) supports all bookmarking site.
 /*     $(".js-showhide").click(function(e){
          e.preventDefault();
          var showhide = $(this);
          showhide.siblings('.js-description').slideToggle();
     });*/
     
    $(".listingBookmarks").mouseover(function(){
      $(this).find(".moreshareoptionsListing").removeClass('hidden').show();
    }).mouseout(function(){
      $(this).find(".moreshareoptionsListing").hide().addClass('hidden');
    });

      
        /* date picker and input default for advanced search page */
     var skinPubDate = $("#skinPublishingDates").html();
     var newDateValue = skinPubDate !== null ? skinPubDate + ":+nn" : "";
   
        $(".pickdate").datepicker({showButtonPanel: true, changeMonth:true,changeYear:true, dateFormat: "yy-mm-dd",yearRange:newDateValue+":+nn"});
        
        $(".datepicker-icon").click(function() {
            $(this).parent().parent().find("input").focus();
            
        });
        
        $("#bellowheadercontainer").on("submit","#managePendingItemForm", function(e) {
            e.preventDefault();

             var form = $(this),
             formContainer = form.parents(".pendingItemForm"),
             spinner = formContainer.find(".pendingSpinner"),
             formStr = form.serialize(),
             formAction= form.attr("action")
             isforPublication = form.find("#managePendingItemForm_authorizationStatusApproved").is(':checked'),
             qcFailedAnswer = false;
             // radioQCfailed is done like this as the ID and value are using the full 
             // metastore URI and therefore not the best for targeting programmattically
             function submitData() {
                spinner.show();
                $.ajax({
                   type:"POST",
                   url:formAction,
                   data:formStr,
                   success:function() {
                      if (isforPublication) {
                         //this is a presumption that we dont want to present the user 
                         //with the pending approval form if they have selected publish 
                         //instead just load article.
                         location.reload();
                      } else {
                          spinner.hide();
                     // do nothing!
                      }
                   }, error:function() {
                      spinner.hide();
                      formContainer.append("Error submitting pending data, please refresh");
                   }
                });
             }
             
           


          
             submitData();
            
          });
      
        
     /*
      * 
      * Form Placeholder changer
      * 
      */
        
        
        
        
        
      
/*
*
*  Responsive JS code 
*
* 
*/

// Search Page    
      // MOVE TO RESPONSIVE JS when finished, Search Page Facet Modal override issue.
      // once opened and closed at mobile/tablet view, element has display:none; appended which
      // is present if resized to desktop, so if that page now is bigger than 751 the element is now forced to be show.
      if ($(".searchResultsContent").length > 0){
          $(window).resize(function(){
              var currentWindowSize = $(window).width();
             if (currentWindowSize > 992){
                  $(".modal.fade.facet-modal").css("display","block");
              }else if (currentWindowSize <= 992) {
                  $(".modal.fade.facet-modal").css("display","none");
              }
          });
      } 
      if ($("#navigateThisJournal").length > 0) {
          
              $("#navigateThisJournal .tab-menu").click(function(e){
                  var tabmenu = $(this), menustatus;
                  if (tabmenu.hasClass("opened")){
                      tabmenu.removeClass("opened");
                      menustatus = "close";
                      
                  } else {
                      tabmenu.addClass("opened");
                      menustatus = "open";
                  }
                  var hiddenMenu = tabmenu.parent(".visible-xs").siblings("li");
                  hiddenMenu.each(function( index ) {
                      var menuItem = $(this);
                      setTimeout(function(){ 
                          if (menustatus == "open") {
                              menuItem.removeClass("hidden-xs");
                          } else {
                              menuItem.addClass("hidden-xs");
                          }
                          },200*index);
                      });
              
                    e.preventDefault();
                  });

       
          
       
      }
      // search facets, show hide 'Select drop down'
      $(".facets-toggle-span").click(function(){
          $(this).children().toggleClass("fa-caret-right fa-caret-up");
          $(this).parent().find(".list-group").toggle();
      });
      
      // general change icon on Bootstrap collapse feature.
      $(".js-plus-minus-toggle-icon").click(function(e){
          $(this).find("i").toggleClass("fa-plus-square fa-minus-square");
          e.preventDefault();
      });
      
    
      $(".js-plus-minus-toggle-text").click(function(){
          $(this).children("i").toggleClass("fa-plus fa-minus");
      });
      
      
      //create an annonoymous self calling function to limit javascript variable scope.
      (function(){
          $('.js-rssFeedReader').each(function () {
            var rssReader = $(this),
            rssFeedurl = rssReader.data("rssfeedurl"),
            showAmount = rssReader.data("showamount"),
            dateformat = rssReader.data("dateformat");
            
            //if empty then put in default
            if (isEmpty(dateformat)) {
                dateformat = 'dd MMMM, yyyy hh:mm';
            }
            
            
            //this uses the zrss feed code that is taken from at the time of writing from: http://www.zazar.net/developers/jquery/zlastfm/.
          $(rssReader).rssfeed(rssFeedurl, {
                limit: showAmount, 
                sort:'date',
                header: false,
                date: true,
                dateformat: dateformat,
                sortasc: false,
                errormsg: 'Oops sorry there seemed to be a problem loading the RSS feed',
                titletag:'h4',
                linktarget: '_blank',
                content: true,
                snippet: false
              }); 
         });
      
      })();
      
      

  /*
  *
  *  End of Responsive JS code 
  *
  * 
  */      
      
      $('.js-postlink').click(function() {
          var url = $(this).attr('href')
          url = decodeURI(url);
          urlParts = url.split('?');
          var action = urlParts[0];
          var params = urlParts[1].split('&');
          var form = $(document.createElement('form')).attr('action', action).attr('method','post');
          $('body').append(form);
          for (var i in params) {
              var tmp= params[i].split('=');
              var key = tmp[0], value = decodeURIComponent(tmp[1]);
              $(document.createElement('input')).attr('type', 'hidden').attr('name', key).attr('value', value).appendTo(form);
          }
          $(form).submit(); 
          
          return false;
      });
      
      
      $('.js-a_to_z a').click(function(e){
          /* This function is added to fix bug 45056 all pagination now uses the faceted browse Form */
          var ithis = $(this), 
          url = ithis.attr('href');
          
          facetedbrowseform = $('#facetedbrowseform');
        //this for the case when the facets dont exist e.g no results pages!
     
          if (facetedbrowseform.length > 0) {
          
              facetedbrowseform.attr('action',url);
          
              facetedbrowseform.submit();
          
              
          } else {
              window.location.href = url;
          }
              e.preventDefault();
          //else allow default link action!
          });
       
       

       $('.browse-display-option a').click( function(e){
          var ithis = $(this),
          url = ithis.attr('href');
          
          facetedbrowseform = $('#facetedbrowseform');
          //this for the case when the facets dont exist e.g no results pages!
          console.log ("facetedbrowseform.length" + facetedbrowseform.length);
          if (facetedbrowseform.length > 0) {
          
              facetedbrowseform.attr('action',url);

              facetedbrowseform.submit();

          }  else {
              window.location.href = url;
          }
          e.preventDefault();

          
       });
       


       $(".showMoreBlogPosts").click( function(e) {
           var $this = $(this);
           e.preventDefault();
           var itemId = $this.parent().find(".hiddenWeblogWebid").text();
           var month = $this.parent().find(".hiddenWeblogMonth").text();
           var requestedPage = $this.parent(".seemoreposts").find(".hiddenRequestedPageNumber").text();
           if ( requestedPage == '') {
            requestedPage = 2;
           }
           $this.parents(".seemorepostsWrapper").append('<div class="morepostsloadingwrappper"><img class="morePostsLoading" src="/images/jp/spinner.gif" alt="Loading posts" /></div>');
           var hiddenContext = $("#hiddenContext").text()
           var url = hiddenContext + itemId + "/moreposts?month=" + month + "&requestedPage=" + requestedPage;
           $.ajax({
               type: "GET",
               url: url,
               timeout: 90000,
               success: function(resp, statusText) {
                  
                $this.parents(".publistwrapperBlog").append(resp);
                $this.parents(".seemorepostsWrapper").remove();
                
               },
               error: function(req, statusText, message) {
               },
               complete: function(req, statusText) {
                   //$(".morepostsloadingwrappper").remove();
               }
           });
           
       });  
       
       $.cookieBar();
       

  
  /* */
  /* toggle facet item MORE for ajax retrieved only (only happens first retrieval) */
  $(document).on("click", ".seeAhahFacetsLink a", function(e) {
          var $here = $(this),
              $ahahParent = $here.parent(".seeAhahFacetsLink"),
              $ahahGrdParent = $ahahParent.parent("ul"),
              url = $ahahGrdParent.find(".ahahurl").text(),
              ids = $ahahGrdParent.find(".ahahids").text(),
              names = $ahahGrdParent.find(".ahahnames").text(),
              values = $ahahGrdParent.find(".ahahvalues").text(),
              searchUrl = $ahahGrdParent.find(".ahahsearchurl").text(),
              data = {"ids": ids,
                  "names": names,
                  "values": values,
                  "searchurl": searchUrl
              };
          e.preventDefault();
          $here.addClass("cursorWait");

          $.ajax({
              type: "POST",
              url: url,
              data: data,
              success: function(resp, statusText) {
                  $ahahParent.after(resp);
                  var newHtml = "<a href='#' title='Hide items in list' class='facethidetext std-display'><img src='/images/aip/minus_icon.gif' alt='-' /> Less</a>";
                  $(".toggleajaxfacetitem").html(newHtml);
                  $(".toggleajaxfacetitem a").show();
                  $ahahParent.hide();
              },
              error: function(req, statusText) {
              },
              complete: function(req, statusText) {
                  $here.removeClass("cursorWait");
              }
          });
  });
  
  /* see more facets link show / hide list - non ajax retrieval (or post ajax first retrieval and hide) */
  $(document).on("click", ".js-seeMoreFacetsLink a", function(e) {
      e.preventDefault();
      
      var $here = $(this),
      parentContainer = $here.closest(".js-seeMoreFacetsLink"),
      getMoreViaAhah = parentContainer.data('getMoreViaAhah'),
      maxItemsPerExpandMore = parseFloat($('#facets').data('maxItemsPerExpandMore'));
      
      //console.log (isNaN(parseFloat($('#facets').data('maxItemsPerExpandMore'))));
      
      function toggleDisplay(thislink, thislinkContainer, maxItemsDisplayPerClick){
          if (isNaN(maxItemsDisplayPerClick)) {
              //if not providing a maxItemsPerExpandMore then display / hide All
              thislink.closest("ul").find(".hiddenjsdiv").slideToggle();
              thislinkContainer.children("a").toggleClass("hiddenprop");  
          } else {
              //maxItemsPerExpandMore is a number!
              if (thislink.closest("ul").find(".hiddenjsdiv").length > 0){
                  thislink.closest("ul")
                      .find(".hiddenjsdiv")
                      .slice(0, maxItemsDisplayPerClick)
                      .slideDown().addClass('is-previously-hidden')
                      .removeClass('hiddenjsdiv');
                  //check again now we have displayed the next x number if any more to display.
                  //console.log(thislink.closest("ul").find(".hiddenjsdiv:hidden").length);
                  if (thislink.closest("ul").find(".hiddenjsdiv").length == 0){
                      thislinkContainer.children("a").toggleClass("hiddenprop");
                  }
              } else {
                  thislink.closest("ul")
                      .find(".is-previously-hidden")
                      .slideUp().removeClass('is-previously-hidden')
                      .addClass('hiddenjsdiv');
                  thislinkContainer.children("a").toggleClass("hiddenprop");
              }
              
          }
      }
     
      //OK first things first determine if returning via AJAX
      if (getMoreViaAhah === true){
      /* ajax section - view more */
              var  url = parentContainer.data('ahahurl'),
                  ids = parentContainer.data('ahahids'),
                  names = parentContainer.data('ahahnames'),
                  values = parentContainer.data('ahahvalues'),                              
                  searchurl = parentContainer.data('ahahsearchurl'),
                  data = {'ids': ids, 'names': names, 'values': values, 'searchurl': searchurl};
                  parentContainer.data('getMoreViaAhah',false); // set data attribute as we no longer want it to return via Ajax
                  var searchParams = JSON.parse('{"' + decodeURI(searchurl.substring(searchurl.indexOf('search?')+7)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                  if(searchParams.facetOptions) {
                          var selectedFacetsOptions = searchParams.facetOptions.split('+');
                          var selectedFacets = '';
                          selectedFacetsOptions.forEach(function(facet) {
                                  selectedFacets += (searchParams['value' + facet] && searchParams['value' + facet] != '\'\'' ? decodeURIComponent(searchParams['value' + facet]) : '') + ','
                          });
                        data.selectedFacets = selectedFacets;
                  }
                  
              $here.css({"cursor":"wait"});
              
              //
              // Since we want to handle failure as well as success,
              // we need to use ajax() rather than post().
              //
              // $.post fails silently on error!
              //

              $.ajax({
                  type : "POST",
                  url : url,
                  data : data,
                  success: function(resp) {
                      
                      parentContainer.before(resp);
                      $here.css({"cursor":"default"});
                      
                      toggleDisplay($here,parentContainer,maxItemsPerExpandMore);
                  },
                  error : function(resp) {
                      var cMsg = "'Facet More Terms' AJAX POST to '" + url + "' failed: " + resp.status + " (" + resp.statusText + ")";
                      //console.log(cMsg);
                      } 
  });
              

      } else { 
      
      
          toggleDisplay($here,parentContainer,maxItemsPerExpandMore,maxItemsPerExpandMore);
      
      }
  });
  
     

      
      
      $(document).on("click", "a.moreLink, a.lessLink", function(e) {
          ingentaCMSApp.flipMoreLess(e, "ul", "li.hiddenjsdiv");
      });
      
      $("#journal").find(".showOtherLatestArticles").on("click", "a.moreLink2, a.lessLink2", function(e) {
          ingentaCMSApp.flipMoreLess2(e, ".publistwrapper", "li.initialHide");
      });
  
  $(document).on("click", ".js-signInOrRegister",function(e) {
          ingentaCMSApp.displaySmallDialog(e, "#signInOrRegisterDialog", "Sign in or Register", "Please sign in or register to use this feature", "300");
      });


      $(".toggle.expand").on("click",function(){
          $(this).nextAll(".hidden-js-div").toggle();
      });
      //responsive tabs API code.
      var Pills = {

            init: function() {
              this.bindUIfunctions();
              this.pageLoadCorrectTab();
            },

            bindUIfunctions: function() {

              // Delegation
              $(document)
                .on("click", ".pills-container a[href^='#']:not('.active, .disabled')", function(event) {
                    Pills.changeTab(this.hash);
                  event.preventDefault();
                })
              
            },

            changeTab: function(hash) {
              
               
              var anchor = $(".pills-container a[href='" + hash + "']");
              
              function displayTab(anchortab) {
                  var url = anchortab.attr("href");
                  //console.log("url" + url);
                  var divtabContent = $(url);
                  
                  // activate correct anchor (visually)
                  anchortab.addClass("active").parent().addClass("active").siblings().removeClass("active").find("a").removeClass("active");
                  

                
                  // activate correct div (visually)
                  divtabContent.addClass("active").removeClass("hidden").siblings().removeClass("active").addClass("hidden");
                  
                  anchortab.closest("ul").removeClass("open");

                  
              }
                  displayTab(anchor);

              // update history stack adding additional history entries.
              
                  // pushState is supported!
                  history.pushState(null, null,  hash);

              
              
             //We also need to handle the backstate by telling the brower to trigger the tab behaviour!   
              $(window).on('popstate', function(e) {
                 anchor = $('[href="' + document.location.hash + '"]');
                 if (anchor.length) {
                     displayTab(anchor);
                 } else {
                    defaultAnchor =  $('.pills-container li.active a');
                    displayTab(defaultAnchor);
                 }
              });

              // Close menu, in case mobile
             
              return anchor; // make property available outside the function

            },

            // If the page has a hash on load, go to that tab
            pageLoadCorrectTab: function() {
                //console.log("document.location.hash: " + document.location.hash);
              if   (document.location.hash.length > 0) {
                   var anchor = $(".pills-container a[href='" + document.location.hash + "']");
                   if (!anchor.hasClass("disabled")) {
                       var anchorTab = this.changeTab(document.location.hash);
                   
                   
                       // this is a further amendment to allow the fulltext and 
                       //(any future event if its attached) to load when bookmarking a page with a particular tab. 
                       anchorTab.trigger("click");
                   }
                }
            },

            toggleMobileMenu: function(event, el) {
              $(el).closest("ul").toggleClass("open");
            }

      }

      $("#metrics_tab").find("a").click(function(e) {
          var $metricsContainer = $(".metricsContainer"),
              startDate = $metricsContainer.find(".metricsPubDate").text(),
              endDate = $metricsContainer.find(".metricsEndDate").text(),
              webId = $metricsContainer.find(".metricsItemId").text(),
              url = appUrls.metrics + "?startDate=" + startDate + "&endDate=" + endDate + "&itemId=" + webId,
              ERR_MSGS = ["<p class='noMetricsData bg-warning'>" + $("#graph1Settings").data("nodata") + "</p>",
                          "<p class='noMetricsData bg-warning'>" + $("#graph2Settings").data("nodata") + "</p>",
                          "<p class='noMetricsData bg-warning'>" + $("#graph3Settings").data("nodata") + "</p>"
              ],
              pageTitle = $(".siqPageTitle").text(),
              doi = $(".siqDoi").text(),
              lineData1,
              lineData2,
              lineData3;

          // SIQ tagging request
          //ingentaCMSApp.siq(appUrls.siq, SIQ.webId, SIQ.pageTitle, SIQ.doi, "Metrics");

          if ($metricsContainer.hasClass("retrieveMetrics")) {
              // Make the call...
              $.ajax({
                  type: "GET",
                  url: url,
                  timeout: 90000,
                  success: function(resp, statusText) {
                      $metricsContainer.find(".metricsDetails").append(resp);
                      $metricsContainer.removeClass("retrieveMetrics");
                  },
                  error: function(req, statusText, message) {
                      $metricsContainer.find(".metricsDetails").html(ERR_MSGS[1]).addClass("ajax-error");
                  },
                  complete: function(req, statusText) {
                      $(".itemMetricsLoading").remove();
                      var $table1 = $("#abstractDayView"),
                          table1HasData = ($table1.find("td").hasClass("noMetricsData") ? false : true),
                          graph1 = "graph1Output",
                          $table2 = $("#fulltextDayView"),
                          table2HasData = ($table2.find("td").hasClass("noMetricsData") ? false : true),
                          graph2 = "graph2Output",
                          $table3 = $("#metricTotals"),
                          // Notice the negation...
                          table3HasData = (!$table3.find("td").hasClass("noMetricsData") ? true : false),
                          graph3 = "graph3Output";

                      // Plot data from  Table 1...
                      if (table1HasData) {
                          ingentaCMSApp.displayGraphOrTable($table1, "line", graph1, "abstractDayView", ERR_MSGS[2]);
                      } else {
                          $("#" + graph1).append(ERR_MSGS[0]);
                      }
                      // Plot data from Table 2...
                      if (table2HasData) {
                          ingentaCMSApp.displayGraphOrTable($table2, "line", graph2, "fulltextDayView", ERR_MSGS[2]);
                      } else {
                          $("#" + graph2).append(ERR_MSGS[1]);
                      }
                      // Plot data from  Table 3...
                      if (table3HasData) {
                          ingentaCMSApp.displayGraphOrTable($table3, "pie", graph3, "metricTotals", ERR_MSGS[2]);
                      } else {
                          $("#" + graph3).append(ERR_MSGS[2]);
                      }
                  }
              });
          }
      });
     $(".ellipseSeeMore").click(function(){
         $(this).siblings(".hidden-js-div").show();
         $(this).parent().siblings("p").show(); // some descriptions have multiple <p> tags
         $(this).remove();
     });

   //Scripts for Alerts
   function manageAlert() {
      //this Obj is the item that triggered click .contentAlertLink div
      var thisObj = $(this);
      var load = '<img class="js-settingAlert" src="/images/jp/spinner.gif" alt="Loading" />';
      
      //remove regular click functionality and add spinner
      thisObj.unbind("click");
      thisObj.before(load);
       
      //define parts of this for future use      
      var parent = thisObj.closest(".js-alertDiv");
      var alertId = parent.find(".js-alertId").text();
      var alertContext = parent.find(".js-alertContext").text();
      var alertContextTitle = parent.find(".js-alertContextTitle").text();
      var alertContentId = parent.find(".js-alertContentId").text();
      var submitUrl = parent.find(".js-submitUrl").text();
      var removeUrl = parent.find(".js-removeUrl").text();
      var contentAlert = parent.find(".js-contentAlert").text();
      var alertContextText = parent.find(".js-alertContextText").text();
      var frequencyKeyName = "freq:" + alertContentId ; 
      var data = {
         alertId : alertId,
         alertContext: alertContext,
         alertDescription: alertContextTitle,
         update: 'true',
         alertScopeObjectId: alertContentId,
         alertFrequency: 'HOUR',
         contentAlert: contentAlert
      };
      
      var nextUrl = (contentAlert == "on" ? submitUrl : removeUrl);
      
      var isContentAlertType = alertContext.match("citation|correction") !== null ? true : false;

      if (!isContentAlertType) {
         if (contentAlert == "on") {
            data["enabled:" + alertContentId ] = contentAlert;
            data[frequencyKeyName] = 'HOUR'; 
            data["description:" + alertContentId ] = alertContextTitle;
         }
      }

      $.ajax({
         type: "POST",
         url: nextUrl,
         data: data,
         timeout: 20000,
         success: function(data) {
            parent.find(".js-settingAlert").remove();
            var nextOperation = (contentAlert == "on" ? "Remove" : "Create") + " " + alertContextText ;
          
            if (contentAlert == "on") {
               parent.find(".js-contentAlert").text("");
               parent.find(".js-successMessage").text("(created)");
            } else {
               parent.find(".js-contentAlert").text("on");
               parent.find(".js-alertId").text("");
               parent.find(".js-successMessage").text("(removed)");
            }
            parent.find(".js-successMessage").addClass("hidden").show();
            if (parent.find(".js-contentAlertLink").children().length > 0) {
               var text = $.trim(parent.find(".js-contentAlertLink").text());
               parent.find(".js-contentAlertLink").html(parent.find(".js-contentAlertLink").html().replace(text, nextOperation));
            } else {
               parent.find(".js-contentAlertLink").text(nextOperation);
            }
            parent.find(".js-successMessage").removeClass("hidden").hide("slide", { direction: "up" }, 3000);
            thisObj.bind("click", manageAlert);
         },
         error: function(error) {
            if (error.status == "200") {
               parent.find(".js-settingAlert").remove();
               var nextOperation = (contentAlert == "on" ? "Remove" : "Create") + " " + alertContextText ;
              
               if (contentAlert == "on") {
                  parent.find(".js-contentAlert").text("");
                  parent.find(".js-successMessage").text("(created)");
               } else {
                  parent.find(".js-contentAlert").text("on");
                  parent.find(".js-successMessage").text("(removed)");
               }
               parent.find(".js-successMessage").addClass("hidden").show();
               if (parent.find(".js-contentAlertLink").children().length > 0) {
                  var text = $.trim(parent.find(".js-contentAlertLink").text());
                  parent.find(".js-contentAlertLink").html(parent.find(".js-contentAlertLink").html().replace(text, nextOperation));
               } else {
                  parent.find(".js-contentAlertLink").text(nextOperation);
               }
               parent.find(".js-successMessage").removeClass("hidden").hide("slide", { direction: "up" }, 3000);
               thisObj.bind("click", manageAlert);
            } else {
               parent.find(".js-settingAlert").remove();
               parent.find(".js-successMessage").text("(error)").removeClass("hidden").hide("slide", { direction: "up" }, 3000);
               thisObj.bind("click", manageAlert);
            }
         }
      });
      return false;
   }
   // To manage Content alerts (Citation, Correction)
   $(".js-contentAlertLink").click(manageAlert);

   $('.js-back-top').fadeOut();
   $(window).scroll(function() {
       if ($(this).scrollTop() > 160) {
           $('.js-back-top').fadeIn();
       } else {
           $('.js-back-top').fadeOut();
       }
   });


   

   $('[data-toggle="tooltip"]').tooltip();
   
  function showEmailForm() {
       var dlg = $("#myModal");
       dlg.empty();
       dlg.load($("#hiddenContext").text() + "/email/form", {}, function() {
          var form = $("#emailForm", dlg);
          var formElement = $("#email-form", form);
          formElement.validate({
             onfocusout: function(element) {
                if (!this.checkable(element)) {
                   this.element(element);
                }
             }
          });
          $.extend($.validator.messages, {
             required: $("#required_field").html(),
             email: $("#valid_email_address").html()
          });
          $("#myModal").modal('show');
       });
   }
   
   $("body").on("click", ".js-email-this", function(e) {
    e.preventDefault();
       const title = $(this).data('page-title') ? $(this).data('page-title') : document.title;
       const url = $(this).prop('href');
      
       window.location.href = "mailto:?body=" + encodeURIComponent(url) + "#email-this-url-000&subject=" + encodeURIComponent(title);
   });  
   $('#myModal').on('hidden.bs.modal', function (e) {
       resetFrom();
       resetErrors();
   });
   $(".sendEmailList").click(function(e) {
       if($("input.select-item[name^='MARKED']:checked,#managedMarkedListCont input[name^='MARKED']:checked").length>0)
       {
           ingentaCMSApp.linkItemsList = [];

           $("input.select-item[name^='MARKED']:checked,#managedMarkedListCont input[name^='MARKED']:checked").each(function(index,element) {
               var item ={},
                   linksplit;
              
               item.link = $( element ).parent().parent().find(".title>a").prop('href');

               if (item.link.indexOf('?') != -1){
                   linksplit = item.link.split('?');
                   item.link = linksplit[0];
               }
               
               //console.log('itemLink' +item.link);
               ingentaCMSApp.linkItemsList.push(item);
               //console.log ('firstItem1:' + ingentaCMSApp.linkItemsList[0].link);
           });
           
           showEmailForm();
       }
       else{
           alert("please select items for email");
       }   
   });
    
   $(".table-wrapper").on("change", "input.select-item", function(){
       var sendEmailList = $(".sendEmailList");
       var InputCheckedCount = $("input.select-item[name^='MARKED']:checked").length;
       //display count
       sendEmailList.children('.selected-count').text('('+ InputCheckedCount +')');
       
       if(InputCheckedCount>0) {
           if(!sendEmailList.hasClass('active')) {
               sendEmailList.addClass('active');
           } 
           }
           else {
           if(sendEmailList.hasClass('active')) {
               sendEmailList.removeClass('active');
               }
           }
       });
       
   $("input[name=select_deselect_all]").on("change", function(){
       var count= 0; 
       if($(this).is(":checked")) {
           $("input.select-item").prop('checked', true).trigger("change")
       } else {
           $("input.select-item").prop('checked', false).trigger("change");
       }
   });
   
   
   
   
   $("#myModal").on("submit", "#email-form", function(e) {
     //stop accdientally submit multiple time by disabling submit button. 
       var thisForm = $(this);
       thisForm.find("#sendButton").prop( "disabled", true );
	   e.preventDefault();
       if(isFormValid(thisForm)){
           var form = $('#email-form').clone();
           //console.log ('firstItem2:' + ingentaCMSApp.linkItemsList[0].link);

            for(var i = 0;i<ingentaCMSApp.linkItemsList.length;i++){
            var link = document.createElement('input')
              $(link).attr("type", "hidden").attr("name", 'emailItems['+i+'].link').attr("value", ingentaCMSApp.linkItemsList[i].link);
              //console.log('thislink exists' + ingentaCMSApp.linkItemsList[i]);
              form.append(link);
            }

            $.ajax({ 
                   type: 'post',
                   url: $("#hiddenContext").text() + '/email/message',
                   data: form.serialize(),
                   success: function (html) {
                 $( "#myModal" ).modal('hide');
                     ingentaCMSApp.linkItemsList = [];
                     alert(html);
                    //this is to reset the fields on the add to favourites page 
                    var marklistPageContainer = $('#managedMarkedListCont');
                    marklistPageContainer.find('.js-resultItem input[type="checkbox"]').prop('checked',false);
                    marklistPageContainer.find('.js-disabled')
                                         .attr("disabled","disabled")
                                         .addClass('btn-default--inverse');
                    
                    thisForm.find("#sendButton").prop( "disabled", false );
                    
                   },error: function (request, error) {
               $( "#myModal" ).modal('hide');
                   ingentaCMSApp.linkItemsList = [];
                   alert("Error in sending email");
                   }   
               }); 
           //clear the stuff
       }
   });

   $("#myModal").on("change", "#timer_id", function(e) {
          isFormValid($(this).parent("form"));
   });
   
   function resetFrom()
   {
       $( "#recipientemail").val("");
       $( "#subject").val("");
       $( "#email").val($("#email").attr("backup-value"));
       $( "#timer_id").prop("checked",false);
       
   }
   function resetErrors()
   {
       $( "#recipientemail-error").hide();
       $( "#email-error").hide();
       $( "#subject-error").hide();
       $( "#timer_id-error").hide();
   }
   function isFormValid(emailform){
       resetErrors();

       var requiredErrorMessage = "This is a required field";
       var emailErrorMessage = "Please enter a valid email address";
       var isValid=true;

       /*if(required($( "#email").val()) == false){
           showErrorMessage("email",requiredErrorMessage);
           return false;
       }
       
       if(isEmail($( "#email").val(),false) == false){
           showErrorMessage("email",emailErrorMessage);
           return false;
       }*/

       if(required($("#recipientemail").val()) == false){
           showErrorMessage("recipientemail",requiredErrorMessage);
           isValid=false;
       }
       else if(isEmail($( "#recipientemail").val(),true) == false){
           showErrorMessage("recipientemail",emailErrorMessage);
           isValid=false;
       }
       
       if(required($( "#subject").val()) == false){
           showErrorMessage("subject",requiredErrorMessage);
            if(isValid){
                $( "#subject").focus();
            }
           isValid=false;
       }
       
       if(emailform.find("input[name='timer_id']").prop('checked') == false){
           showErrorMessage("timer_id",requiredErrorMessage);
            if(isValid){
                $( "#timer_id").focus();
            }
           isValid=false;
       }

       return isValid;
    }

    function showErrorMessage(id,message){
       $( "#"+ id +"-error").text(message);
       $(  "#"+ id +"-error").show();
    }

function isEmail(emails,checkMultiple) {
   var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(checkMultiple){
       var emailsArr = emails.split(",");
       var result = true;
       for(var i = 0; i < emailsArr.length; i++){
           result = result && regex.test(emailsArr[i].trim());
       }
       return result;
   }
   else
   {
        return regex.test(emails.trim());  
   }
}

function required(value) {
   return (value && value.trim().length);
}

$(".navbar-collapse").on("shown.bs.collapse", function (e) {
     e.preventDefault();
      $('#' + e.currentTarget.id).find('input:first').focus();
});


//Returns a function, that, as long as it continues to be invoked, will not
//be triggered. The function will be called after it stops being called for
//N milliseconds. If `immediate` is passed, trigger the function on the
//leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
 var timeout;
 return function() {
     var context = this, args = arguments;
     var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
     };
     var callNow = immediate && !timeout;
     clearTimeout(timeout);
     timeout = setTimeout(later, wait);
     if (callNow) func.apply(context, args);
 };
};


$(".js-toggle-blurb-edit-mode").on("click", function (e) {
    e.preventDefault();
    const ithis = $(this),
          blurbModeOff = ithis.data('blurbmodeofftext'),
          blurbModeOn = ithis.data('blurbmodeontext');
          
    if (ithis.hasClass('is-active')) {
        ithis.removeClass('is-active')
            .html('<i class="fa fa-stop-circle static-edit-menu__blurb-edit-off" aria-hidden="true"></i> ' + blurbModeOff);
            $('body').removeClass('is-blurb-enabled');
            localStorage.setItem("blurbEnabled",'false');
            
    } else {
        ithis.addClass('is-active')
            .html('<i class="fa fa-play-circle static-edit-menu__blurb-edit-on" aria-hidden="true"></i> ' + blurbModeOn);
            $('body').addClass('is-blurb-enabled');
            localStorage.setItem("blurbEnabled",'true');
    } 
});

if (localStorage.getItem("blurbEnabled") === 'true') {
    //this will be triggered on load each time.
    $(".js-toggle-blurb-edit-mode").trigger("click");
}


(function(){
    var blurbMenu = $('.static-edit-menu');
    var mainHeaderContainer = $('.main-header-container');
    var articleNavigationBar = $('.article-navigation-bar');
    var articleNavigationBarPosToTopDocument = 0;
    if (articleNavigationBar.length > 0) {
         articleNavigationBarPosToTopDocument =  articleNavigationBar.offset().top;
    }
$(window).on("scroll", function() {
      var scroll = $(window).scrollTop();
      var articleNavigationBarPosToTopViewport = (articleNavigationBarPosToTopDocument - scroll);
        if (scroll > 142) {
            blurbMenu.addClass("is-static-edit-menu--fixed");
        } else {
            blurbMenu.removeClass("is-static-edit-menu--fixed");
        }
        if (articleNavigationBar.length > 0) {
            //93px is the height of the fixed menu
            if (articleNavigationBarPosToTopViewport < 90){
                articleNavigationBar.addClass("is-article-navigation-bar--fixed");
            } else {
                articleNavigationBar.removeClass("is-article-navigation-bar--fixed");
            }
        }
        if (scroll > 3) {
            mainHeaderContainer.addClass("is-main-header-container--scrolling");
        } else {
            mainHeaderContainer.removeClass("is-main-header-container--scrolling");
        }
  });
})();
  
  $(".js-link-toggle-main-sub-menu").on("click", function() {
     var ithis = $(this);
          ithis.find('.glyphicon')
              .toggleClass('is-active');
          // this is added for accessibility reasons only!
          $(".js-link-toggle-main-sub-menu").attr('aria-expanded', 
              ithis.attr('aria-expanded') == 'false' ? 'true' : 'false');
          
           ithis.parent().find('.js-toggle-display-sub-menu').slideToggle();
  });
  
  $(document).click(function (event) {
      var clickover = $(event.target);
      var expandingElem = $(".main-navigation-dropdown")
      var _opened = expandingElem.hasClass("collapse in");
      
      if (_opened === true && clickover.closest(".main-navigation-menu").length === 0) {
              expandingElem.collapse('hide');
      }
      
      var searchMenu = $('#search-nav');
      
      if (searchMenu.css('display') !== 'none' && 
          clickover.closest('#search-nav').length === 0 && //check not clicking in the search nav.
          clickover.closest(".js-toggle-search-window").length === 0){ //check not clicking on search icon in main nav.
          searchMenu.hide();  
      }
          
  });
  
  

});