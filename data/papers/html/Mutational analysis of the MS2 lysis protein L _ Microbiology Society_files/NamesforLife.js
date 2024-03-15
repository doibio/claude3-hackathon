/**
 * Copyright (c) 2005-2022 NamesforLife, LLC.
 *
 * This software and associated services are the proprietary information of NamesforLife, LLC and is covered by the NamesforLife Intellectual Property portfolio.
 * Use is subject to license terms (https://www.namesforlife.com/intellectual-property).
 *
 * All rights reserved.
 */
"use strict"; //$NON-NLS-1$

var PRODUCTION_SERVER = 'api.namesforlife.com'; //$NON-NLS-1$
var TEST_SERVER = 'api-dev.namesforlife.com'; //$NON-NLS-1$
var LOCAL_SERVER = 'localhost'; //$NON-NLS-1$
var DEV_PATH = '/webapp-api'; //$NON-NLS-1$
var SLASH = '/'; //$NON-NLS-1$
var NAMESFORLIFE_SERVICE_PROTOCOL = (window.location.pathname.substring(0, window.location.pathname.indexOf(SLASH, 1)) === DEV_PATH) ? 'http://' : 'https://'; //$NON-NLS-1$ //$NON-NLS-2$
var NAMESFORLIFE_SERVICE_PORT = (window.location.pathname.substring(0, window.location.pathname.indexOf(SLASH, 1)) === DEV_PATH) ? ':8080' : ''; //$NON-NLS-1$ //$NON-NLS-2$
var NAMESFORLIFE_SERVICE_HOST = ((window.location.hostname === LOCAL_SERVER) || (window.location.hostname === TEST_SERVER)) ? window.location.hostname : PRODUCTION_SERVER;
var NAMESFORLIFE_SERVICE_PATH = (window.location.pathname.substring(0, window.location.pathname.indexOf(SLASH, 1)) === DEV_PATH) ? DEV_PATH + SLASH : SLASH;

var NAMESFORLIFE_SERVICE_URI = NAMESFORLIFE_SERVICE_PROTOCOL + NAMESFORLIFE_SERVICE_HOST + NAMESFORLIFE_SERVICE_PORT + NAMESFORLIFE_SERVICE_PATH;

var DOI_SERVER_URL = 'https://doi.org/'; //$NON-NLS-1$

var doiPattern = new RegExp('^doi:10[.][0-9]+/.+'); //$NON-NLS-1$
var n4lHandlePattern = '10[.]1601/(?:nm|tx|ex)[.][0-9]+'; //$NON-NLS-1$
//var n4lHandlePattern = '10[.]1601/nm[.][0-9]+'; //$NON-NLS-1$
var n4lUriPattern = new RegExp('[=:/]' + n4lHandlePattern + '$'); //$NON-NLS-1$
var n4lDoiPattern = new RegExp('^' + DOI_SERVER_URL + n4lHandlePattern + '$'); //$NON-NLS-1$

var NAMESFORLIFE_DOI_PREFIX = '10.1601'; //$NON-NLS-1$
var NAMESFORLIFE_PANEL_ID = 'namesforlife-panel'; //$NON-NLS-1$
var NAMESFORLIFE_CLIPBOARD_ID = 'namesforlife-clipboard'; //$NON-NLS-1$
var NAMESFORLIFE_SEARCH_PANEL_ID = 'namesforlife-search'; //$NON-NLS-1$
var NAMESFORLIFE_MARKER_ID = 'namesforlife-marker'; //$NON-NLS-1$
var NAMESFORLIFE_ROOT_MENU_ID = 'namesforlife-root'; //$NON-NLS-1$
var NAMESFORLIFE_MENU_CONTAINER_ID = 'namesforlife-panel'; //$NON-NLS-1$
var NAMESFORLIFE_ACTIVE_CLASS_NAME = 'namesforlife-active'; //$NON-NLS-1$
var NAMESFORLIFE_MENU_CLASS_NAME = 'namesforlife-menu'; //$NON-NLS-1$
var NAMESFORLIFE_HIGHLIGHT_ITEM_CLASS_NAME = 'namesforlife-selectable-hover'; //$NON-NLS-1$

var NAMESFORLIFE_META_DISPLAY_MODE = 'namesforlife-display-mode'; //$NON-NLS-1$
var NAMESFORLIFE_META_DISPLAY_MODE_MENU = 'menu'; //$NON-NLS-1$
var NAMESFORLIFE_META_DISPLAY_MODE_LINK = 'link'; //$NON-NLS-1$

var ID_ATTRIBUTE_NAME = 'id'; //$NON-NLS-1$
var CLASS_ATTRIBUTE_NAME = 'class'; //$NON-NLS-1$
var A_ELEMENT_NAME = 'a'; //$NON-NLS-1$
var REL_ATTRIBUTE_NAME = 'rel'; //$NON-NLS-1$
var HREF_ATTRIBUTE_NAME = 'href'; //$NON-NLS-1$
var A_ELEMENT_NAME_ATTRIBUTE_NAME = 'name'; //$NON-NLS-1$
var DIV_ELEMENT_NAME = 'div'; //$NON-NLS-1$
var AREA_ELEMENT_NAME = 'area'; //$NON-NLS-1$
var META_ELEMENT_NAME = 'meta'; //$NON-NLS-1$
var META_ELEMENT_NAME_ATTRIBUTE_NAME = 'name'; //$NON-NLS-1$
var META_ELEMENT_CONTENT_ATTRIBUTE_NAME = 'content'; //$NON-NLS-1$
var HEAD_ELEMENT_NAME = 'head'; //$NON-NLS-1$
var BODY_ELEMENT_NAME = 'body'; //$NON-NLS-1$
var DISPLAY_BLOCK = 'block'; //$NON-NLS-1$
var DISPLAY_NONE = 'none'; //$NON-NLS-1$

// DOM Level 2 Events
var CLICK_EVENT_NAME = 'click'; //$NON-NLS-1$
var DRAG_EVENT_NAME = 'drag'; //$NON-NLS-1$
var MOUSEOVER_EVENT_NAME = 'mouseover'; //$NON-NLS-1$
var MOUSEOUT_EVENT_NAME = 'mouseout'; //$NON-NLS-1$
var CONTEXTMENU_EVENT_NAME = 'contextmenu'; //$NON-NLS-1$

// Fix Internet Explorer
if (!window['Node']) //$NON-NLS-1$
{
  window.Node = new Object();
  Node.ELEMENT_NODE = 1;
  Node.ATTRIBUTE_NODE = 2;
  Node.TEXT_NODE = 3;
  Node.CDATA_SECTION_NODE = 4;
  Node.ENTITY_REFERENCE_NODE = 5;
  Node.ENTITY_NODE = 6;
  Node.PROCESSING_INSTRUCTION_NODE = 7;
  Node.COMMENT_NODE = 8;
  Node.DOCUMENT_NODE = 9;
  Node.DOCUMENT_TYPE_NODE = 10;
  Node.DOCUMENT_FRAGMENT_NODE = 11;
  Node.NOTATION_NODE = 12;
}

function isOfClass(theElement, className)
{
  if (theElement === null)
  {
    throw 'Cannot test for class \'' + className + '\'. No element supplied.';
  }

  return new RegExp('(^|\\s)' + className + '(\\s|$)').test(theElement.className); //$NON-NLS-1$ //$NON-NLS-2$
}

function isHyperlinkTag(theTag)
{
  return (theTag.nodeName.toLowerCase() == A_ELEMENT_NAME.toLowerCase()) || (theTag.nodeName.toLowerCase() == AREA_ELEMENT_NAME.toLowerCase());
}

function isNotHyperlinkTag(theTag)
{
  return isHyperlinkTag(theTag) === false;
}

/**
 * Gets all of the elements of a specific name in an HTML document.
 *
 * @param theDocument An HTML document.
 * @param tagName An HTML element name.
 * @return An HTMLCollection containing the elements of the specified name in the document.
 * @throws An exception if theDocument is not an HTML document.
 */
function getElementsByName(theDocument, tagName)
{
  if (theDocument === null)
  {
    throw 'No document supplied to getElementsByName(document, tagName).';
  }

  if (theDocument.nodeType !== Node.DOCUMENT_NODE)
  {
    throw 'Unexpected node type: ' + theDocument.nodeType;
  }

  return theDocument.getElementsByTagName(tagName);
}

/**
 * Gets an element from a document where only a single instance is expected.
 * i.e., HEAD, BODY.
 *
 * @param theDocument
 * @param tagName
 * @return The specified element.
 */
function getElementByName(theDocument, tagName)
{
  var els = getElementsByName(theDocument, tagName);

  if (els.length === 0)
  {
    throw 'Document does not contain a \'' + tagName + '\' tag.';
  }

  if (els.length > 1)
  {
    throw 'Document contains multiple \'' + tagName + '\' tags.';
  }

  return els[0];
}

/**
 * Finds all tags in the document that match a particular attribute value.
 *
 * @param theDocument
 * @param tagName
 * @param attributeName
 * @param attributeValue
 * @return array of matched elements
 */
function getElementsWithAttribute(theDocument, tagName, attributeName, attributeValue)
{
  var useTagName = tagName;

  if (useTagName === null)
  {
    useTagName = '*'; //$NON-NLS-1$
  }

  var els = getElementsByName(theDocument, useTagName);

  var matchedElements = new Array();

  for (var i = 0, j = 0; i < els.length; i++)
  {
    if (els[i].getAttribute(attributeName) === attributeValue)
    {
      matchedElements[j++] = els[i];
    }
  }

  return matchedElements;
}

/**
 * Gets the tag matching the specified name and attribute value, where only a
 * single match is expected. Useful for finding a specific META tag.
 *
 * @param theDocument
 * @param tagName
 * @param attributeName
 * @param attributeValue
 * @return The single tag matching the specified name and attribute.
 */
function getElementWithAttribute(theDocument, tagName, attributeName, attributeValue)
{
  var matchedTags = getElementsWithAttribute(theDocument, tagName, attributeName, attributeValue);

  if (matchedTags.length > 1)
  {
    throw 'Multiple \'' + tagName + '\' tags matched name \'' + attributeName + '\'.';
  }

  if (matchedTags.length === 0)
  {
    return null;
  }

  return matchedTags[0];
}

function getElementsByClass(theDocument, tagName, className)
{
  var classElements = new Array();
  var useTagName = tagName;

  if (theDocument === null)
  {
    throw 'No document supplied to getElementsByClass().';
  }

  if (useTagName === null)
  {
	  useTagName = '*'; //$NON-NLS-1$
  }

  var els = getElementsByName(theDocument, useTagName);
  var elsLen = els.length;

  for (var i = 0, j = 0; i < elsLen; i++)
  {
    if (isOfClass(els[i], className))
    {
      classElements[j] = els[i];
      j++;
    }
  }

  return classElements;
}

/**
 * Gets all of the anchor elements in an HTML document.
 *
 * @param theDocument An HTML document.
 * @return An HTMLCollection containing the anchor elements in the document.
 * @throws An exception if theDocument is not an HTML document.
 */
function getAnchorElements(theDocument)
{
  return theDocument.getElementsByTagName(A_ELEMENT_NAME);
}

/**
 * Gets all of the area elements in an HTML document.
 *
 * @param theDocument An HTML document.
 * @return An HTMLCollection containing the area elements in the document.
 * @throws An exception if theDocument is not an HTML document.
 */
function getAreaElements(theDocument)
{
  return theDocument.getElementsByTagName(AREA_ELEMENT_NAME);
}

/**
 * Gets all of the hyperlink elements in an HTML document.
 *
 * @param theDocument An HTML document.
 * @return An HTMLCollection containing the hyperlink elements in the document.
 * @throws An exception if theDocument is not an HTML document.
 */
function getHyperLinkElements(theDocument)
{
  var anchorEls = getAnchorElements(theDocument);
  var areaEls = getAreaElements(theDocument);

  var hyperlinkEls = new Array();
  var hyperlinkIndex = 0;

  if (anchorEls !== null)
  {
    for (var i = 0; i < anchorEls.length; i++)
    {
      hyperlinkEls[hyperlinkIndex++] = anchorEls[i];
    }
  }

  if (areaEls !== null)
  {
    for (var j = 0; j < areaEls.length; j++)
    {
      hyperlinkEls[hyperlinkIndex++] = areaEls[j];
    }
  }

  return hyperlinkEls;
}

function getHeadTag(theDocument)
{
  return getElementByName(theDocument, HEAD_ELEMENT_NAME);
}

function getBodyTag(theDocument)
{
  return getElementByName(theDocument, BODY_ELEMENT_NAME);
}

/**
 * Gets all of the META tags in an HTML document.
 *
 * @param theDocument An HTML document.
 * @return An HTMLCollection containing the META tags in the document.
 * @throws An exception if theDocument is not an HTML document.
 */
function getMetaTags(theDocument)
{
  return getElementByName(theDocument, META_ELEMENT_NAME);
}

/**
 * Gets the META tag with the specified content name.
 *
 * @param theDocument
 * @param metadataName
 * @return the matching meta tag, or null if none matched.
 */
function getMetaTag(theDocument, metadataName)
{
  return getElementWithAttribute(theDocument, META_ELEMENT_NAME, META_ELEMENT_NAME_ATTRIBUTE_NAME, metadataName);
}

/**
 * Set or update a META tag in the document.
 *
 * @param theDocument
 * @param metadataName
 * @param metadataValue
 */
function setMetaTag(theDocument, metadataName, metadataValue)
{
  var metaTag = getMetaTag(theDocument, metadataName);

  // Create the meta tag if it does not yet exist.
  if (metaTag === null)
  {
    metaTag = theDocument.createElement(META_ELEMENT_NAME);
    var headEl = getHeadTag(theDocument);
    headEl.appendChild(metaTag);
  }

  // Set or update the META tag attributes.
  metaTag.setAttribute(META_ELEMENT_NAME_ATTRIBUTE_NAME, metadataName);
  metaTag.setAttribute(META_ELEMENT_CONTENT_ATTRIBUTE_NAME, metadataValue);

  return;
}

function getMetaValue(theDocument, metaName)
{
  var metaTag = getMetaTag(theDocument, metaName);

  if (metaTag)
  {
    return metaTag.getAttribute(META_ELEMENT_CONTENT_ATTRIBUTE_NAME);
  }

  return null;
}

function setMetaValue(theDocument, metaName, metaValue)
{
  setMetaTag(theDocument, metaName, metaValue);
  return;
}

function loadCSS(targetDocument, url)
{
  var cssNode = targetDocument.createElement('link'); //$NON-NLS-1$
  cssNode.setAttribute('type', 'text/css'); //$NON-NLS-1$ //$NON-NLS-2$
  cssNode.setAttribute(REL_ATTRIBUTE_NAME, 'stylesheet'); //$NON-NLS-1$
  cssNode.setAttribute(HREF_ATTRIBUTE_NAME, url);
  cssNode.setAttribute('media', 'screen'); //$NON-NLS-1$ //$NON-NLS-2$

  // Get all 'stylesheet' links.
  var stylesheets = getElementsWithAttribute(targetDocument, 'link', REL_ATTRIBUTE_NAME, 'stylesheet'); //$NON-NLS-1$ //$NON-NLS-2$

  // Get only the titled 'stylesheets'.
  var titledStylesheets = new Array();

  if (stylesheets !== null)
  {
    for (var i = 0, j = 0; i < stylesheets.length; i++)
    {
      if (stylesheets[i].hasAttribute('title')) //$NON-NLS-1$
      {
        titledStylesheets[j++] = stylesheets[i];
      }
    }
  }

  var title = null;

  if (titledStylesheets.length > 1)
  {
    console.log('Multiple titled stylesheets are in this document. Using the first one listed.');
  }

  if (titledStylesheets.length > 0)
  {
    title = titledStylesheets[0].getAttribute('title'); //$NON-NLS-1$
  }

  if (title !== null)
  {
    console.log('Merging NamesforLife stylesheet with \'' + title + '\'.');
    cssNode.setAttribute('title', title); //$NON-NLS-1$
  }

  var headEl = getHeadTag(targetDocument);
  headEl.appendChild(cssNode);

  return;
}

function isDigitalObjectIdentifier(uri)
{
  if (uri === null)
  {
    return false;
  }

  return doiPattern.test(uri);
}

function DOI(uri)
{
  if (n4lUriPattern.test(uri))
  {
    this.handle = uri.substring(uri.indexOf('10.1601/')); //$NON-NLS-1$
  }

  this.getPrefix = function ()
  {
    return this.handle.substring(0, this.handle.indexOf('/')); //$NON-NLS-1$
  };

  this.getSuffix = function ()
  {
    return this.handle.substring(this.handle.indexOf('/') + 1); //$NON-NLS-1$
  };

  this.isNamesforLifeDOI = function ()
  {
    return this.getPrefix() == NAMESFORLIFE_DOI_PREFIX;
  };

  this.toString = function ()
  {
    return this.handle;
  };

  this.toUrl = function ()
  {
    return DOI_SERVER_URL + this.handle;
  };

  this.toMenuUrl = function ()
  {
    return NAMESFORLIFE_SERVICE_URI + this.handle;
  };
}

// BEGIN UTIL

function createEvent(targetElement, eventType, eventHandler)
{
  // From JavaScript: The Definitive Guide, page 381
  var handlerWrapper = function(event)
  {
    // Stop the propagation of the event.
    if (event.stopPropagation)
    {
      event.stopPropagation(); // DOM Level 2
    } else {
      event.cancelBubble = true; // IE
    }

    // Prevent the default action.
    if (event.preventDefault)
    {
      event.preventDefault(); // DOM Level 2
    } else {
      event.returnValue = false; // IE
    }

    eventHandler(event);

    return false;
  };

  if (targetElement.ownerDocument.addEventListener) // DOM Level 2 Event Model
  {
    targetElement.addEventListener(eventType, handlerWrapper, false);
  } else if (targetElement.ownerDocument.attachEvent) { // Internet Explorer 5+ event model
    targetElement.attachEvent('on' + eventType, handlerWrapper); //$NON-NLS-1$
  } else {
    throw 'Unsupported browser event model.';
  }

  return;
}

function createEventAllowDefault(targetElement, eventType, eventHandler)
{
  var handlerWrapper = function(event)
  {
    eventHandler(event);
    return true;
  };

  if (targetElement.ownerDocument.addEventListener) // DOM Level 2 Event Model
  {
    targetElement.addEventListener(eventType, handlerWrapper, false);
  } else if (targetElement.ownerDocument.attachEvent) { // Internet Explorer 5+ event model
    targetElement.attachEvent('on' + eventType, handlerWrapper); //$NON-NLS-1$
  } else {
    throw 'Unsupported browser event model.';
  }

  return;
}

function hasClass(theElement, className)
{
  return (' ' + theElement.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function addClass(theElement, className)
{
  if (theElement === null)
  {
    throw 'Cannot add class \'' + className + '\'. No element supplied.';
  }

  // TODO: When supported by IE, use theElement.classList (http://caniuse.com/#feat=classlist).
  if (!hasClass(theElement, className))
  {
    if (theElement.className)
    {
      theElement.className += ' ' + className; //$NON-NLS-1$
    } else {
      theElement.className += className;
    }
  }

  return;
}

function removeClass(theElement, className)
{
  if (theElement === null)
  {
    throw 'Cannot remove class \'' + className + '\'. No element supplied.';
  }

  if (new RegExp('^\\s*' + className + '\\s*$').test(theElement.className)) //$NON-NLS-1$ //$NON-NLS-2$
  {
    theElement.removeAttribute(CLASS_ATTRIBUTE_NAME); // only one class, so remove the attribute
    return;
  }

  // There is more than one class on the element.
  var currentClasses = theElement.className;
  var newClasses = currentClasses.replace(new RegExp(className, ''), ''); //$NON-NLS-1$ //$NON-NLS-2$

  // Collapse white space.
  theElement.className = newClasses.replace(new RegExp('  ', ''), ' '); //$NON-NLS-1$ //$NON-NLS-2$ //$NON-NLS-3$

  return;
}

function updateElementContent(theElement, newContent)
{
  if (theElement === null)
  {
    throw 'Cannot update content. No element supplied.';
  }

  try
  {
    theElement.innerHTML = newContent;
  } catch (e) {
    throw 'Unable to update content in document.';
  }

  return;
}

function startsWith(testString, prefix)
{
  if (testString === null || prefix === null)
  {
    return false;
  }

  if (prefix.length > testString.length)
  {
    return false;
  }

  if (testString.substr(0, prefix.length) == prefix)
  {
    return true;
  }

  return false;
}

function moveObject(theObject, x, y)
{
  theObject.style.left = x + 'px'; //$NON-NLS-1$
  theObject.style.top = y + 'px'; //$NON-NLS-1$

  return;
}

function getScrollXY(theDocument)
{
  var scrOfX = 0, scrOfY = 0;

  if (typeof(window.pageYOffset) == 'number') //$NON-NLS-1$
  {
    // Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if (theDocument.body && (theDocument.body.scrollLeft || theDocument.body.scrollTop)) {
    // DOM compliant
    scrOfY = theDocument.body.scrollTop;
    scrOfX = theDocument.body.scrollLeft;
  } else if (theDocument.documentElement && (theDocument.documentElement.scrollLeft || theDocument.documentElement.scrollTop)) {
    // IE6 standards compliant mode
    scrOfY = theDocument.documentElement.scrollTop;
    scrOfX = theDocument.documentElement.scrollLeft;
  }

  return [scrOfX, scrOfY];
}

function getLeftScrollAmount(theElement)
{
  return getScrollXY(theElement.ownerDocument)[0];
}

function getTopScrollAmount(theElement)
{
  return getScrollXY(theElement.ownerDocument)[1];
}

/**
 * Gets the target of the event.
 *
 * @param e
 * @return The object that is the target of the event.
 */
function getEventTarget(e)
{
  if (e.target)
  {
    return e.target;
  }

  return e.srcElement;
}

function getEventHref(e)
{
  var aEl = getEventTarget(e); // target is a DOM node (but it may be an internal node, such as 'em' or 'i').

  if (isNotHyperlinkTag(aEl))
  {
    // Check the parent.
    var parentEl = aEl.parentNode;

    if (isNotHyperlinkTag(aEl.parentNode))
    {
//      alert('\'' + parentEl.nodeName + '\' element is event target \'' + aEl.nodeName + '\' parent. Giving up on opening menu.');
      return false;
    }

    aEl = parentEl;
  }

  return aEl.getAttribute(HREF_ATTRIBUTE_NAME);
}

/**
 * Gets the document that the event occurred in.
 *
 * @param e
 * @return the document that the event occurred in.
 */
function getEventDocument(e)
{
  var targetNode = getEventTarget(e);
  if (targetNode === null)
  {
    throw 'Event has no target.';
  }

  if (targetNode.nodeType == Node.DOCUMENT_NODE)
  {
    return targetNode;
  }

  var theDocument = targetNode.ownerDocument;

  if (theDocument === null)
  {
    throw 'Event target \'' + targetNode.nodeName + '\' has no owner document.';
  }

  return theDocument;
}

/**
 * Get the location of the event.
 *
 * @param e The event.
 * @return The location of the event [x, y].
 */
function getEventPosition(e)
{
  var x = undefined, y = undefined;

  if (e.pageX)
  {
    x = e.pageX;
    y = e.pageY;
  }

  if (e.clientX)
  {
    var theDocument = getEventDocument(e);

    if (theDocument === null)
    {
      return null;
    }

    var bodyEl = getBodyTag(theDocument);
    x = e.clientX + bodyEl.scrollLeft + getLeftScrollAmount(theDocument.documentElement);
    y = e.clientY + bodyEl.scrollTop + getTopScrollAmount(theDocument.documentElement);
  }

  return [x, y];
}

function getObjectPosition(obj)
{
  if (obj === null)
  {
    return null;
  }

  var curleft = 0, curtop = 0;
  var curobj = obj;

  if (curobj.offsetParent)
  {
    do
    {
      curleft += curobj.offsetLeft;
      curtop += curobj.offsetTop;
    } while (curobj = curobj.offsetParent);
  }

  var width = obj.offsetWidth;
  var height = obj.offsetHeight;

  // workaround for mozilla bug
  if (obj.tagName.toLowerCase() == AREA_ELEMENT_NAME.toLowerCase())
  {
    // First undo the incorrect upper left calculation. This assumes that
    // the AREA tag is the innermost tag and therefore the last object on
    // the offset stack, which it should be. This avoids having to insert
    // this code in the while loop above.
    curleft -= obj.offsetLeft;
    curtop -= obj.offsetTop;

    var areaCoords = obj.coords.split(','); //$NON-NLS-1$

    switch (obj.shape.toLowerCase())
    {
      case 'circ': //$NON-NLS-1$
      case 'circle': //$NON-NLS-1$
      {
        var x_center = parseInt(areaCoords[0]);
        var y_center = parseInt(areaCoords[1]);
        var radius = parseInt(areaCoords[2]);

        curleft += (x_center - radius);
        curtop += (y_center - radius);
        width = radius * 2;
        height = width;
        break;
      }
      case 'rect': //$NON-NLS-1$
      case 'rectangle': //$NON-NLS-1$
      {
        var x_left = parseInt(areaCoords[0]), y_top = parseInt(areaCoords[1]), x_right = parseInt(areaCoords[2]), y_bot = parseInt(areaCoords[3]);
        curleft += x_left;
        curtop += y_top;
        width = x_right - x_left;
        height = y_bot - y_top;
        break;
      }
      case 'poly': //$NON-NLS-1$
      case 'polygon': //$NON-NLS-1$
      {
        var x_min = parseInt(areaCoords[0]), y_min = parseInt(areaCoords[1]), x_max = x_min, y_max = y_min, coordCount = areaCoords.length;

        for (var i = 0; i < coordCount; i += 2)
        {
          var x = parseInt(areaCoords[i]), y = parseInt(areaCoords[i+1]);

          if (x > x_max)
          {
            x_max = x;
          }

          if (y > y_max)
          {
            y_max = y;
          }

          if (x < x_min)
          {
            x_min = x;
          }

          if (y < y_min)
          {
            y_min = y;
          }
        }

        curleft += x_min;
        curtop += y_min;
        width = x_max - x_min;
        height = y_max - y_min;

        break;
      }
      default:
      {
        break;
      }
    }
  }

  var left = curleft;
  var right = left + width;
  var top = curtop;
  var bottom = top + height;

  var position = [left, top, right, bottom];
  return position;
}

function getObjectUpperLeft(obj)
{
  var position = getObjectPosition(obj);

  if (obj === null)
  {
    return null;
  }

  return [position[0], position[1]];
}

function getObjectLowerLeft(obj)
{
  var position = getObjectPosition(obj);

  if (obj === null)
  {
    return null;
  }

  return [position[0], position[3]];
}

function getObjectUpperRight(obj)
{
  var position = getObjectPosition(obj);

  if (obj === null)
  {
    return null;
  }

  return [position[2], position[1]];
}

function getObjectLowerRight(obj)
{
  var position = getObjectPosition(obj);

  if (obj === null)
  {
    return null;
  }

  return [position[2], position[3]];
}

/**
 * Get the location of the event target.
 *
 * @param e The event.
 * @return The location of the event target [x, y].
 */
function getEventTargetPosition(e)
{
  return getObjectPosition(getEventTarget(e));
}

function getScreenBoundary(theDocument)
{
  if (theDocument === null)
  {
    return null;
  }

  var xOrigin = getLeftScrollAmount(theDocument.documentElement);
  var yOrigin = getTopScrollAmount(theDocument.documentElement);

  var scrollbarWidth = 0;

  var browserWidth = 0, browserHeight = 0;

  if (typeof(window.innerWidth) == 'number') //$NON-NLS-1$
  {
    // Non-IE
    browserWidth = window.innerWidth;
    browserHeight = window.innerHeight;
    scrollbarWidth = 20;
  } else if (theDocument.documentElement && (theDocument.documentElement.clientWidth || theDocument.documentElement.clientHeight)) {
    // IE 6+ in 'standards compliant mode'
    browserWidth = theDocument.documentElement.clientWidth;
    browserHeight = theDocument.documentElement.clientHeight;
  } else if (theDocument.body && (theDocument.body.clientWidth || theDocument.body.clientHeight)) {
    // IE 4 compatible
    browserWidth = theDocument.body.clientWidth;
    browserHeight = theDocument.body.clientHeight;
  }

  browserWidth -= scrollbarWidth;
  browserHeight -= scrollbarWidth;

  var visibleScreen = [xOrigin, yOrigin, xOrigin + browserWidth, yOrigin + browserHeight];

  return visibleScreen;
}

function keepOnScreen(el)
{
  var theDocument = el.ownerDocument;

  if (theDocument === null)
  {
    return;
  }

  var elementBoundary = getObjectPosition(el);

  if (elementBoundary === null)
  {
    return;
  }

  var elementLeft = elementBoundary[0];
//  var elementTop = elementBoundary[1];
  var elementRight = elementBoundary[2];
//  var elementBottom = elementBoundary[3];

  var visibleScreen = getScreenBoundary(theDocument);

  var screenRight = visibleScreen[2];
//  var screenBottom = visibleScreen[3];

  if (elementRight > screenRight)
  {
    var shiftLeft = elementRight - screenRight;
    el.style.left = elementLeft - shiftLeft + 'px'; //$NON-NLS-1$
  }

  // TODO: This seems to be working inversely from the vertical scrolling.
//  if (elementBottom > screenBottom)
//  {
//    var shiftUp = elementBottom - screenBottom;
//    el.style.top = elementTop - shiftUp + 'px';
//  }

  return;
}

function snapToChildren(containerEl)
{
  // Get all elements with class 'menu'.
  var menus = getElementsByClass(containerEl.ownerDocument, DIV_ELEMENT_NAME, NAMESFORLIFE_MENU_CLASS_NAME);
  var xMin = undefined, yMin = undefined, xMax = undefined, yMax = undefined;
  var borderWidth = 0;

  var activeCount = 0;

  for (var i = 0; i < menus.length; i++)
  {
    // Only if menu is 'active'.
    if (isOfClass(menus[i], NAMESFORLIFE_ACTIVE_CLASS_NAME))
    {
      var position = getObjectPosition(menus[i]);
      var left = position[0], top = position[1], right = position[2], bottom = position[3];
      if ((xMin == undefined) || (xMin > left)) { xMin = left; }
      if ((xMax == undefined) || (xMax < right)) { xMax = right; }
      if ((yMin == undefined) || (yMin > top)) { yMin = top; }
      if ((yMax == undefined) || (yMax < bottom)) { yMax = bottom; }

      // Get the border width.
//      borderWidth = menus[i].style.borderWidth;
      borderWidth = 2;

      activeCount++;
    }
  }

  // If no menus are active, reset to origin.
  if (activeCount == 0)
  {
    containerEl.style.top = '0px'; //$NON-NLS-1$
    containerEl.style.left = '0px'; //$NON-NLS-1$
    containerEl.style.width = '0px'; //$NON-NLS-1$
    containerEl.style.height = '0px'; //$NON-NLS-1$

    return;
  }

  // Set the new dimensions of the container.
  var width = xMax - xMin + (borderWidth * 2);
  var height = yMax - yMin + (borderWidth * 2);
  containerEl.style.width = width + 'px'; //$NON-NLS-1$
  containerEl.style.height = height + 'px'; //$NON-NLS-1$

  keepOnScreen(containerEl);

  return;
}

function showElement(element)
{
  element.style.display = DISPLAY_BLOCK;
  return;
}

function hideElement(element)
{
  element.style.display = DISPLAY_NONE;
  return;
}

function isElementVisible(element)
{
  return element.style.display == DISPLAY_BLOCK;
}

function getProtocol(url)
{
  return url.substring(0, url.indexOf(':')); //$NON-NLS-1$
}

function chopProtocol(url)
{
  var protocol = url.substring(0, url.indexOf(':')); //$NON-NLS-1$
  var path = url.substring(protocol.length + 1);

  if (path.substring(0, 2) == '//') //$NON-NLS-1$
  {
    path = path.substring(2);
  }

  return path;
}

function openExternalUri(event)
{
  var theTarget = getEventTarget(event);
  var uri = theTarget.getAttribute(HREF_ATTRIBUTE_NAME), url = uri;

  // If DOI, convert to URL.
  if (isDigitalObjectIdentifier(uri))
  {
    var doi = new DOI(uri);
    url = doi.toUrl();
  }

  // The open(url, target) parameter is no longer needed in new browsers (default behavior is new tab).
  // Additionally, opening the page in the same target prevents browsers from switching to that tab.
  window.open(url);

  return false;
}

function copyTextToClipboard(text)
{
  var success = false;

  var theDocument = window.document;
  var bodyEl = getBodyTag(theDocument);

  if (theDocument.queryCommandSupported('copy'))
  {
    var namesforlifeClipboardEl = theDocument.getElementById(NAMESFORLIFE_CLIPBOARD_ID);

    // If the clipboard div doesn't exist yet, create it and add to the body element.
    if (namesforlifeClipboardEl === null)
    {
      namesforlifeClipboardEl = theDocument.createElement('textarea');
      namesforlifeClipboardEl.setAttribute(ID_ATTRIBUTE_NAME, NAMESFORLIFE_CLIPBOARD_ID);
      namesforlifeClipboardEl.style.position = 'fixed';
      namesforlifeClipboardEl.style.top = 0;
      namesforlifeClipboardEl.style.left = 0;

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      namesforlifeClipboardEl.style.width = '2em';
      namesforlifeClipboardEl.style.height = '2em';

      // We don't need padding, reducing the size if it does flash render.
      namesforlifeClipboardEl.style.padding = 0;

      // Clean up any borders.
      namesforlifeClipboardEl.style.border = 'none';
      namesforlifeClipboardEl.style.outline = 'none';
      namesforlifeClipboardEl.style.boxShadow = 'none';

      // Avoid flash of white box if rendered for any reason.
      namesforlifeClipboardEl.style.background = 'transparent';

      bodyEl.appendChild(namesforlifeClipboardEl);
    }

    namesforlifeClipboardEl.value = text;
    namesforlifeClipboardEl.select();

    try
    {
      success = theDocument.execCommand('copy');
    } catch (err) {
      console.log('Clipboard copy failed with error: ' + err);
    }

    namesforlifeClipboardEl.blur(); // remove focus
    bodyEl.removeChild(namesforlifeClipboardEl); // remove element from DOM
  } else {
//    window.prompt("Copy to clipboard: (Ctrl+C on Windows, Cmd+C on Mac), Enter", text);
  }

  return success;
}

function getTextContent(el)
{
  // If available, innerText will return the content without additional whitespace.
  // Not supported on older browsers.
  if (el.innerText)
  {
    return el.innerText;
  }

  return el.textContent;
}

function copyContentToClipboard(event)
{
  // If a tag in the content triggered the event, walk up to the clipboard tag.
  var clipboardEl = event.target;
  while (startsWith(clipboardEl.id, 'clipboard') == false)
  {
    clipboardEl = clipboardEl.parentNode;
  }

  var copyTarget = window.document.getElementById(clipboardEl.id);

  var text = getTextContent(copyTarget);

  if (copyTextToClipboard(text))
  {
    addClass(copyTarget, 'copied'); // animation
    setTimeout(function() { removeClass(copyTarget, 'copied'); }, 1500);
  }

  return false;
}

// END UTIL

// BEGIN NET

function doServiceRequest(targetDocument, doi, handler, errorHandler)
{
  if (window.XDomainRequest)
  {
    doServiceRequestXDR(targetDocument, doi, handler, errorHandler);
  } else {
    doServiceRequestXHR(targetDocument, doi, handler, errorHandler);
  }

  return;
}

function doServiceRequestXDR(targetDocument, doi, handler, errorHandler)
{
//  var method = 'GET'; //$NON-NLS-1$
  var method = 'POST'; //$NON-NLS-1$

  // Note: No custom headers may be added to an XDomainRequest.
  // As of 2014, XDomainRequest doesn't send any Content-Type header.
  // See: https://blogs.msdn.microsoft.com/ieinternals/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds/

  var xmlhttp = new XDomainRequest(); // Internet Explorer 8+

  if (!xmlhttp)
  {
    throw 'Unable to create XDR request.';
  }

  if (!handler)
  {
    throw 'No response handler provided.';
  }

  xmlhttp.onerror =
    function()
    {
      errorHandler('Error in XDR request.');
    };

  xmlhttp.ontimeout =
    function()
    {
      errorHandler('Timeout from XDR request.');
    };

  xmlhttp.timeout = 12000;

  xmlhttp.onload =
    function()
    {
      handler(xmlhttp.responseText);
    };

  xmlhttp.open(method, doi.toMenuUrl(), true);

  xmlhttp.setRequestHeader('Accept', 'application/vnd+namesforlife.guide+html'); //$NON-NLS-1$ //$NON-NLS-2$
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //$NON-NLS-1$ //$NON-NLS-2$
//  xmlhttp.setRequestHeader('X-NamesforLife-Service', 'menu-standard'); //$NON-NLS-1$ //$NON-NLS-2$

  if (targetDocument.location) // RFC2616
  {
    xmlhttp.setRequestHeader('Content-Location', targetDocument.location); //$NON-NLS-1$
  }

  try
  {
    xmlhttp.send();
  } catch (e) {
    throw 'Unable to request ' + doi.toMenuUrl() + ' from ' + targetDocument.location + '\nReason: ' + e.message;
  }

  return;
}

function doServiceRequestXHR(targetDocument, doi, handler, errorHandler)
{
  var xmlhttp = null;

  if (window.XDomainRequest)
  {
    // Note: No custom headers may be added to an XDomainRequest.
    // As of 2014, XDomainRequest doesn't send any Content-Type header.
    // See: https://blogs.msdn.microsoft.com/ieinternals/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds/
    xmlhttp = new XDomainRequest(); // Internet Explorer 8+
  } else {
    xmlhttp = new XMLHttpRequest(); // all other browsers
  }

  if (!xmlhttp)
  {
    throw 'Unable to create server request.';
  }

  if (!handler)
  {
    throw 'No response handler provided.';
  }

  xmlhttp.open('POST', doi.toMenuUrl(), true); //$NON-NLS-1$

  xmlhttp.withCredentials = 'false'; //$NON-NLS-1$
  xmlhttp.setRequestHeader('Accept', 'application/vnd+namesforlife.guide+html'); //$NON-NLS-1$ //$NON-NLS-2$
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //$NON-NLS-1$ //$NON-NLS-2$
//  xmlhttp.setRequestHeader('X-NamesforLife-Service', 'menu-standard'); //$NON-NLS-1$ //$NON-NLS-2$

  if (targetDocument.location) // RFC2616
  {
    xmlhttp.setRequestHeader('Content-Location', targetDocument.location); //$NON-NLS-1$
  }

  var UNKNOWN = 0;
  var PAGE_OK = 200;
  var NO_CONTENT = 204;
  var PAGE_NOT_MODIFIED = 304;
  var UNAUTHORIZED = 401;
  var PAGE_NOT_FOUND = 404;

  var DONE = 4; // XMLHttpRequest.DONE

  xmlhttp.onreadystatechange =
    function()
    {
      var state = xmlhttp.readyState;

      switch (state)
      {
        case DONE:
        {
          switch (xmlhttp.status)
          {
            case UNKNOWN: // Can happen with local requests.
            {
              errorHandler('Request failed with no response code. This is usually due to a loss of network connectivity.');
              break;
            }
            case PAGE_OK:
            case NO_CONTENT:
            case PAGE_NOT_MODIFIED:
            {
              try
              {
                handler(xmlhttp.responseText);
              } catch (e) {
                errorHandler('Error occurred while handling server response. Error: ' + e);
              }
              break;
            }
            case UNAUTHORIZED:
            {
              errorHandler('Invalid username/password.');
              break;
            }
            case PAGE_NOT_FOUND:
            default:
            {
              var error = 'Request failed with response code \'' + xmlhttp.statusText + '\'.';
              if (!xmlhttp.responseText) { error += ' No response received from server.'; }
              errorHandler(error);
              break;
            }
          }
//          console.log('sendRequest [' + xmlhttp.status + ']: ' + ((Number(new Date().valueOf()) - Number(startTime.valueOf())) / 1000.0) + 's.');
          break;
        }
        default: { /* The request is not complete yet. */ }
      }
    };

  try
  {
    xmlhttp.send(null);
  } catch (e) {
    throw 'Unable to request ' + doi.toMenuUrl() + ' from ' + targetDocument.location + '\nReason: ' + e.message;
  }

  return;
}

// END NET

// BEGIN MENU

function closeMenu(menuEl)
{
  var theDocument = menuEl.ownerDocument;

  if (isOfClass(menuEl, NAMESFORLIFE_ACTIVE_CLASS_NAME))
  {
    removeClass(menuEl, NAMESFORLIFE_ACTIVE_CLASS_NAME);
    var container = theDocument.getElementById(NAMESFORLIFE_MENU_CONTAINER_ID);
    snapToChildren(container);
  }

  return;
}

function getSubmenusOfMenuId(theDocument, parentId)
{
  var menuContainer = theDocument.getElementById(NAMESFORLIFE_MENU_CONTAINER_ID);
  var els = menuContainer.getElementsByTagName(DIV_ELEMENT_NAME);

  var submenus = new Array();
  var menuCount = 0;

  for (var i = 0; i < els.length; i++)
  {
    var id = els[i].getAttribute(ID_ATTRIBUTE_NAME);

    if ((id != parentId) && startsWith(id, parentId))
    {
      submenus[menuCount++] = els[i];
    }
  }

  return submenus;
}

function closeSubmenusOfMenuId(theDocument, parentMenuId)
{
  if ((parentMenuId === null) || (parentMenuId == '')) //$NON-NLS-1$
  {
    return;
  }

  // Get all sub-menus of the current menu.
  var submenus = getSubmenusOfMenuId(theDocument, parentMenuId);

  for (var i = 0; i < submenus.length; i++)
  {
    closeMenu(submenus[i]);
  }

  return;
}

function closeMenuById(theDocument, menuId)
{
  var menuEl = theDocument.getElementById(menuId);
  closeSubmenusOfMenuId(theDocument, menuId);
  closeMenu(menuEl);
  return;
}

function openMenuAtAbsolutePosition(menuEl, xAbsolute, yAbsolute)
{
  if (isOfClass(menuEl, NAMESFORLIFE_ACTIVE_CLASS_NAME))
  {
    return false;
  }

  var theDocument = menuEl.ownerDocument;
  var containerEl = theDocument.getElementById(NAMESFORLIFE_MENU_CONTAINER_ID);

  var containerUpperLeft = getObjectUpperLeft(containerEl);
  var containerLeft = containerUpperLeft[0];
  var containerTop = containerUpperLeft[1];

  var xRelative = xAbsolute - containerLeft;
  var yRelative = yAbsolute - containerTop;

  menuEl.style.left = xRelative + 'px'; //$NON-NLS-1$
  menuEl.style.top = yRelative + 'px'; //$NON-NLS-1$

  // Make the menu active.
  addClass(menuEl, NAMESFORLIFE_ACTIVE_CLASS_NAME);

  snapToChildren(containerEl);

  return false;
}

/**
 * 
 * @param linkEl The A element that triggered this menu to open.
 * @param menuId The id of the menu to be opened.
 * @return false when the method completes. (return code for event)
 */
function openMenuById(linkEl, menuId)
{
  if (linkEl === null)
  {
    throw 'No menu link supplied.';
  }

  if (menuId === null)
  {
    throw 'No menu name supplied.';
  }

  var menuEl = linkEl.ownerDocument.getElementById(menuId);

  if (menuEl === null)
  {
    throw 'Menu \'' + menuId + '\' could not be located.';
  }

  // Align the new menu to the right of the parent menu.
  var upperRightOfParent = getObjectUpperRight(linkEl);

  // New (absolute) coordinates of the submenu.
  var xAbsolute = upperRightOfParent[0]; // + 2; // Add a small horizontal gap to account for the border. ??
  var yAbsolute = upperRightOfParent[1];

  return openMenuAtAbsolutePosition(menuEl, xAbsolute, yAbsolute);
}

function openRootMenu(theDocument, x, y)
{
  var menuEl = theDocument.getElementById(NAMESFORLIFE_ROOT_MENU_ID);

  if (menuEl === null)
  {
    throw 'Cannot open root menu. No menu element found.';
  }

  if (isOfClass(menuEl, NAMESFORLIFE_ACTIVE_CLASS_NAME))
  {
    return false;
  }

  // Move the menu container to the appropriate location in the document.
  moveObject(menuEl.ownerDocument.getElementById(NAMESFORLIFE_MENU_CONTAINER_ID), x, y);

  return openMenuAtAbsolutePosition(menuEl, x, y);
}

// BEGIN MENU EVENT HANDLERS

function namesforlifeCloseMenu(event)
{
  closeMenuById(getEventDocument(event), NAMESFORLIFE_ROOT_MENU_ID);
  namesforlifeHideMarker(event);
  return true;
}

function namesforlifeHoverMenuItem(event)
{
  // Get the id of the menu that contains this item.
  var theTarget = getEventTarget(event);

  if (isNotHyperlinkTag(theTarget)) // for some items, the event may be invoked on the content of the tag (such as an I tag within the A tag).
  {
    theTarget = theTarget.parentNode;
  }

  var menuId = theTarget.parentNode.getAttribute(ID_ATTRIBUTE_NAME);

  closeSubmenusOfMenuId(theTarget.ownerDocument, menuId);

  // Highlight the menu item. (Bug workaround. :hover doesn't work consistently on IE8).
  addClass(theTarget, NAMESFORLIFE_HIGHLIGHT_ITEM_CLASS_NAME);

  return false;
}

function namesforlifeHoverSubmenuItem(event)
{
  // Get the id of the menu that contains this item.
  var theTarget = getEventTarget(event);
  var parentMenuId = theTarget.parentNode.getAttribute(ID_ATTRIBUTE_NAME);
  closeSubmenusOfMenuId(theTarget.ownerDocument, parentMenuId);

  // Highlight the menu item. (Bug workaround. :hover doesn't work consistently on IE8).
  addClass(theTarget, NAMESFORLIFE_HIGHLIGHT_ITEM_CLASS_NAME);

  var prefix = 'open_'; //$NON-NLS-1$
  var a_name = theTarget.getAttribute(A_ELEMENT_NAME_ATTRIBUTE_NAME);
  if (startsWith(a_name, prefix))
  {
    var menuId = a_name.substr(prefix.length);
    return openMenuById(theTarget, menuId);
  }

  return false;
}

function namesforlifeUnHoverMenuItem(event)
{
  var theTarget = getEventTarget(event);

  if (isNotHyperlinkTag(theTarget)) // for some items, the event may be invoked on the content of the tag (such as an I tag within the A tag).
  {
    theTarget = theTarget.parentNode;
  }

  // Highlight the menu item. (Bug workaround. :hover doesn't work consistently on IE8).
  removeClass(theTarget, NAMESFORLIFE_HIGHLIGHT_ITEM_CLASS_NAME);
  return false;
}

// END MENU EVENTS

/**
 * Registers the new menu events.
 *
 * @param namesforlifePanelEl
 * @return when the function completes successfully.
 */
function registerMenuEvents(namesforlifePanelEl)
{
  // NOTE: Multiple identical event listeners
  //
  // If multiple identical EventListeners are registered on the same EventTarget
  // with the same parameters, the duplicate instances are discarded. They do
  // not cause the EventListener to be called twice, and since the duplicates
  // are discarded, they do not need to be removed manually with the
  // removeEventListener method.

  var aEls = namesforlifePanelEl.getElementsByTagName(A_ELEMENT_NAME);

  var relMenu = new RegExp("(^|\\s)namesforlife-name(\\s|$)"); //$NON-NLS-1$
  var relSubMenu = new RegExp("(^|\\s)namesforlife-submenu(\\s|$)"); //$NON-NLS-1$
  var relMenuItem = new RegExp("(^|\\s)namesforlife-menuitem(\\s|$)"); //$NON-NLS-1$
  var relClipboard = new RegExp("(^|\\s)namesforlife-clipboard(\\s|$)"); //$NON-NLS-1$
  var relExternal = new RegExp("(^|\\s)namesforlife-external(\\s|$)"); //$NON-NLS-1$

  for (var i = 0; i < aEls.length; i++)
  {
    var aEl = aEls[i];
    var relAttributeValueA = aEl.getAttribute(REL_ATTRIBUTE_NAME);

    // click events
    if (relExternal.test(relAttributeValueA)) // namesforlife-external takes priority in opening external links
    {
      createEvent(aEl, CLICK_EVENT_NAME, function(event) { return openExternalUri(event); });
    } else if (relMenu.test(relAttributeValueA)) {
      createEvent(aEl, CLICK_EVENT_NAME, function(event) { return namesforlifeOpenMenu(event); });
    } else if (relClipboard.test(relAttributeValueA)) {
      createEvent(aEl, CLICK_EVENT_NAME, function(event) { return copyContentToClipboard(event); });
    }

    // mouseover events
    if (relSubMenu.test(relAttributeValueA))
    {
      createEvent(aEl, MOUSEOVER_EVENT_NAME, function(event) { return namesforlifeHoverSubmenuItem(event); });
      createEvent(aEl, MOUSEOUT_EVENT_NAME, function(event) { return namesforlifeUnHoverMenuItem(event); });
    } else if (relMenuItem.test(relAttributeValueA)) {
      createEvent(aEl, MOUSEOVER_EVENT_NAME, function(event) { return namesforlifeHoverMenuItem(event); });
      createEvent(aEl, MOUSEOUT_EVENT_NAME, function(event) { return namesforlifeUnHoverMenuItem(event); });
    }
  }

  var divEls = namesforlifePanelEl.getElementsByTagName(DIV_ELEMENT_NAME);

  for (var j = 0; j < divEls.length; j++)
  {
    var divEl = divEls[j];
    var relAttributeValueB = divEl.getAttribute(REL_ATTRIBUTE_NAME);

    if (relClipboard.test(relAttributeValueB))
    {
      createEvent(divEl, CLICK_EVENT_NAME, function(event) { return copyContentToClipboard(event); });
    }

    // disable default context menu
    createEvent(divEl, CONTEXTMENU_EVENT_NAME, function(event) { return false; });
    createEvent(divEl, DRAG_EVENT_NAME, function(event) { return false; });
  }

  // TODO: This is interfering with default link behavior.
  createEventAllowDefault(getBodyTag(namesforlifePanelEl.ownerDocument), CLICK_EVENT_NAME, function(event) { return namesforlifeCloseMenu(event); });

  return;
}

function menuResponseHandler(linkEl, previousMenuPosition, newContent)
{
  var theDocument = linkEl.ownerDocument;
  var namesforlifePanelEl = theDocument.getElementById(NAMESFORLIFE_PANEL_ID);

  // Before updating the content of the element, determine the new position of
  // the menu.

  // NOTE: The menu position cannot be obtained while it is hidden. Hiding the
  // menu panel will return a position of (0,0), which will indicate the menu
  // was opened from a parent menu, in which case the previous menu position
  // should be used.

  hideElement(namesforlifePanelEl);
  // Set the upper left corner of the container to the lower left of the link.
  var menuPosition = getObjectLowerLeft(linkEl);

  // New (absolute) coordinates of the submenu.
  var x = menuPosition[0];
  var y = menuPosition[1] + 2; // Add a small vertical gap between the menu and the link.

  if ((menuPosition[0] == 0) && (menuPosition[1] == 0))
  {
    // Use the previous location of the menu.
    x = previousMenuPosition[0];
    y = previousMenuPosition[1];
  }

  // Update the menu content.
  updateElementContent(namesforlifePanelEl, newContent);

  showElement(namesforlifePanelEl);

  // Register the new menu events. This only affects elements under the panel element.
  registerMenuEvents(namesforlifePanelEl);

  openRootMenu(theDocument, x, y);

  return;
}

function namesforlifeHideMarker(event)
{
  var aEl = getEventTarget(event);
  var theDocument = aEl.ownerDocument;

  var namesforlifeMarkerEl = theDocument.getElementById(NAMESFORLIFE_MARKER_ID);

  if (namesforlifeMarkerEl !== null)
  {
    hideElement(namesforlifeMarkerEl);
  }

  return false;
}

function namesforlifeShowMarker(event)
{
  var aEl = getEventTarget(event);
  var theDocument = aEl.ownerDocument;

  var namesforlifeMarkerEl = theDocument.getElementById(NAMESFORLIFE_MARKER_ID);

  // If the div doesn't exist yet, create it and add to the body element.
  if (namesforlifeMarkerEl === null)
  {
    namesforlifeMarkerEl = theDocument.createElement(DIV_ELEMENT_NAME);
    namesforlifeMarkerEl.setAttribute(ID_ATTRIBUTE_NAME, NAMESFORLIFE_MARKER_ID);

    var imgEl = theDocument.createElement('img'); //$NON-NLS-1$
    imgEl.setAttribute('src', NAMESFORLIFE_SERVICE_URI + 'images/namesforlife-marker_27x17.png'); //$NON-NLS-1$ //$NON-NLS-2$

    namesforlifeMarkerEl.appendChild(imgEl);

    var bodyEl = getBodyTag(theDocument);
    bodyEl.appendChild(namesforlifeMarkerEl);
  }

  if (isNotHyperlinkTag(aEl))
  {
    // Check the parent.
    var parentEl = aEl.parentNode;

    if (isNotHyperlinkTag(aEl.parentNode))
    {
//      alert('\'' + parentEl.nodeName + '\' element is event target \'' + aEl.nodeName + '\' parent. Giving up on opening menu.');
      return false;
    }

    aEl = parentEl;
  }

  var linkPosition = getObjectPosition(aEl);
  var x = linkPosition[0];
  var y = linkPosition[1];

  var markHeight = 17;
  var markWidth = 27;

  var linkHeight = linkPosition[3] - linkPosition[1];

  x -= markWidth; // place mark to the left of the image
  y += Math.ceil((linkHeight - markHeight) / 2); // vertically center on link

  var doi = new DOI(aEl.getAttribute(HREF_ATTRIBUTE_NAME));

  if (doi !== null) // only show the marker if the link was a DOI
  {
    // set the marker position
    moveObject(namesforlifeMarkerEl, x, y);
    showElement(namesforlifeMarkerEl);
  } else {
    hideElement(namesforlifeMarkerEl);
  }

  return false;
}

function namesforlifeOpenMenu(event)
{
  var aEl = getEventTarget(event);
  var theDocument = aEl.ownerDocument;

  var namesforlifePanelEl = theDocument.getElementById(NAMESFORLIFE_PANEL_ID);

  // If the menu div doesn't exist yet, create it and add to the body element.
  if (namesforlifePanelEl === null)
  {
    namesforlifePanelEl = theDocument.createElement(DIV_ELEMENT_NAME);
    namesforlifePanelEl.setAttribute(ID_ATTRIBUTE_NAME, NAMESFORLIFE_PANEL_ID);

    var bodyEl = getBodyTag(theDocument);
    bodyEl.appendChild(namesforlifePanelEl);
  }

  var previousMenuPosition = getObjectUpperLeft(namesforlifePanelEl);

  if (isNotHyperlinkTag(aEl))
  {
    // Check the parent.
    var parentEl = aEl.parentNode;

    // Do not attempt to open a menu if the parent node of the target is not a hyperlink.
    if (isNotHyperlinkTag(aEl.parentNode))
    {
      return false;
    }

    aEl = parentEl;
  }

  var doi = new DOI(aEl.getAttribute(HREF_ATTRIBUTE_NAME));

//  namesforlifeShowMarker(event); // TODO: Do not show the marker if a menu link was clicked.

  doServiceRequest(theDocument, doi, function(response) { menuResponseHandler(aEl, previousMenuPosition, response); return; }, function(error) { console.log(error); return; } );

  return false;
}

// END MENU

// BEGIN APP

function handleNamesforLifeEvent(event)
{
  var doc = getEventDocument(event), target = new DOI(getEventHref(event));

  if (target.isNamesforLifeDOI())
  {
    switch (getMetaValue(doc, NAMESFORLIFE_META_DISPLAY_MODE))
    {
      case NAMESFORLIFE_META_DISPLAY_MODE_LINK:
      {
        return openExternalUri(event);
      }
      case NAMESFORLIFE_META_DISPLAY_MODE_MENU:
      default:
      {
        return namesforlifeOpenMenu(event);
      }
    }
  }

  return false;
}

function NamesforLifeProcessHyperlinks(hyperlinkEls)
{
  if (hyperlinkEls.length == 0)
  {
    return;
  }

  // From JavaScript: The Definitive Guide, page 381
  var handlerWrapper = function(event)
  {
    // Stop the propagation of the event.
    if (event.stopPropagation)
    {
      event.stopPropagation(); // DOM Level 2
    } else {
      event.cancelBubble = true; // IE
    }

    // Prevent the default action.
    if (event.preventDefault)
    {
      event.preventDefault(); // DOM Level 2
    } else {
      event.returnValue = false; // IE
    }

    return handleNamesforLifeEvent(event);
  };

  var eventName = CLICK_EVENT_NAME, ie = false, domLevel2 = (hyperlinkEls[0].ownerDocument.addEventListener !== undefined);

  if (domLevel2 === false)
  {
    ie = (hyperlinkEls[0].ownerDocument.attachEvent !== undefined);
  }

  if (ie)
  {
    eventName = 'on' + eventName; //$NON-NLS-1$
  }

  var relExternal = new RegExp("(^|\\s)namesforlife-external(\\s|$)"); //$NON-NLS-1$

  for (var i = 0, hyperlinkEl; hyperlinkEl = hyperlinkEls[i++];)
  {
    // If (doi:) protocol or proxy URL convert to URL.
    if (n4lUriPattern.test(hyperlinkEl[HREF_ATTRIBUTE_NAME]) && !n4lDoiPattern.test(hyperlinkEl[HREF_ATTRIBUTE_NAME]))
    {
      hyperlinkEl[HREF_ATTRIBUTE_NAME] = new DOI(hyperlinkEl[HREF_ATTRIBUTE_NAME]).toUrl();
    }

    if (n4lDoiPattern.test(hyperlinkEl[HREF_ATTRIBUTE_NAME]))
    {
      var relAttributeValueA = hyperlinkEl.getAttribute(REL_ATTRIBUTE_NAME);

      // Check if the link is tagged as an external link (Abstract).
      if (relExternal.test(relAttributeValueA)) // namesforlife-external takes priority in opening external links
      {
        continue; // do not convert this URL
      }

      hyperlinkEl[HREF_ATTRIBUTE_NAME] = new DOI(hyperlinkEl[HREF_ATTRIBUTE_NAME]).toUrl();
      hyperlinkEl[REL_ATTRIBUTE_NAME] = 'namesforlife-name'; //$NON-NLS-1$

      // do not override menu item styles with namesforlife class, which is for tagged text.
      if (isOfClass(hyperlinkEl, 'namesforlife-item') === false) //$NON-NLS-1$
      {
        addClass(hyperlinkEl, 'namesforlife'); //$NON-NLS-1$
      }

      if (domLevel2)
      {
        hyperlinkEl.addEventListener(eventName, handlerWrapper, false);
      } else if (ie) {
        hyperlinkEl.attachEvent(eventName, handlerWrapper);
      }
    }
  }

  return;
}

function NamesforLifeProcessNode(theNode)
{
  if (theNode.getElementsByTagName)
  {
    NamesforLifeProcessHyperlinks(theNode.getElementsByTagName(AREA_ELEMENT_NAME));
    NamesforLifeProcessHyperlinks(theNode.getElementsByTagName(A_ELEMENT_NAME));
  }

  return;
}

function getDOMInsertionEventName(theDocument)
{
  var rootEl = theDocument.documentElement;
  var NATIVE_MUTATION_EVENTS = rootEl.addEventListener ?
  (
    function()
    {
      var f = false;
      var l = rootEl.id;

      // TODO: Use a named function to store and remove references to the event listener.
      var e = function()
      {
        rootEl.removeEventListener('DOMNodeInsertedIntoDocument', e, false); //$NON-NLS-1$
        NATIVE_MUTATION_EVENTS = true;
        rootEl.id = l;
      };

      // TODO: Use of Mutation Events is deprecated. Use MutationObserver instead.
      rootEl.addEventListener('DOMNodeInsertedIntoDocument', e, false); //$NON-NLS-1$

      // now modify a property
      rootEl.id = 'nw'; //$NON-NLS-1$
      f = rootEl.id != 'nw'; //$NON-NLS-1$
      rootEl.id = l;
      return f;
    }
  )() : false;

  var domNodeInsertedEventName = "DOMNodeInserted"; //$NON-NLS-1$
  if (NATIVE_MUTATION_EVENTS)
  {
    domNodeInsertedEventName = "DOMNodeInsertedIntoDocument"; //$NON-NLS-1$
  }

  return domNodeInsertedEventName;
}

function NamesforLifeProcessDocument(theLocation, theDocument)
{
  NamesforLifeProcessNode(theDocument);
  loadCSS(theDocument, NAMESFORLIFE_SERVICE_URI + 'style/namesforlife-default.css'); //$NON-NLS-1$

  // Automatically process any new content added to the document.
  if (theDocument.addEventListener)
  {
    var domNodeInsertedEventName = getDOMInsertionEventName(theDocument);
    theDocument.addEventListener(domNodeInsertedEventName, function(e) { NamesforLifeProcessNode(e.target); }, false);
  }

  return;
}

// Deprecated since browsers started restricting access among frames. 
//function NamesforLifeProcessWindowFrames()
//{
//    var frames = window.parent.frames;
//
//    if (frames.length > 1)
//    {
//      for (var i = 0; i < frames.length; i++)
//      {
//        NamesforLifeProcessDocument(frames[i].location, frames[i].document);
//      }
//    } else {
//      NamesforLifeProcessDocument(window.location, window.document);
//    }
//
//  return;
//}

function NamesforLifeProcessWindow()
{
  NamesforLifeProcessDocument(window.location, window.document);
  return;
}

function NamesforLife()
{
  NamesforLifeProcessWindow();
  return;
}

window.onload = function()
{
  NamesforLife();
  return;
};

// END APP
