/* W3 JS 1.00 Jan 2017 by w3schools.com */
"use strict";
var hide = function (id) {
  addStyle(id, "display", "none");
};
var show = function (id, a) {
  if (a) {addStyle(a, "display", "none");}
  addStyle(id, "display", "block");
};
var addStyle = function (id, prop, val) {
  var i, x = $(id), l = x.length;
  for (i = 0; i < l; i++) {
    x[i].style.setProperty(prop, val);
  }
};
var toggleShow = function (id) {
  var i, x = $(id), l = x.length;
  for (i = 0; i < l; i++) {
    if (x[i].style.display == "none") {
      addStyle(x[i], "display", "block");
    } else {
      addStyle(x[i], "display", "none");
    }
  }
};
var addClass = function (id, name) {
  var i, x = $(id), l = x.length, arr1, arr2, j;
  for (i = 0; i < l; i++) {
    arr1 = x[i].className.split(" ");
    arr2 = name.split(" ");
    for (j = 0; j < arr2.length; j++) {
      if (arr1.indexOf(arr2[j]) == -1) {x[i].className += " " + arr2[j];}
    }
  }
};
var toggleClass = function (id, c1, c2) {
  var t1, t2, t1Arr, t2Arr, i, j, arr, x = $(id), l = x.length, allPresent;
  t1 = (c1 || "");
  t2 = (c2 || "");
  t1Arr = t1.split(" ");
  t2Arr = t2.split(" ");
  for (i = 0; i < l; i++) {
    arr = x[i].className.split(" ");
    if (t2Arr.length == 0) {
      allPresent = true;
      for (j = 0; j < t1Arr.length; j++) {
        if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
      }
      if (allPresent) {
        removeClass(x[i], t1);
      } else {
        addClass(x[i], t1);
      }
    } else {
      allPresent = true;
      for (j = 0; j < t1Arr.length; j++) {
        if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
      }
      if (allPresent) {
        removeClass(x[i], t1);
        addClass(x[i], t2);
      } else {
        removeClass(x[i], t2);
        addClass(x[i], t1);
      }
    }
  }
};
var removeClass = function (id, name) {
  var i, x = $(id), l = x.length, arr1, arr2, j;
  for (i = 0; i < l; i++) {
    arr1 = x[i].className.split(" ");
    arr2 = name.split(" ");
    for (j = 0; j < arr2.length; j++) {
      while (arr1.indexOf(arr2[j]) > -1) {
        arr1.splice(arr1.indexOf(arr2[j]), 1);
      }
    }
    x[i].className = arr1.join(" ");
  }
};
var $ = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
var filterHTML = function(id, sel, filter) {
  var a, b, c, i, ii, iii, hit;
  a = $(id);
  for (i = 0; i < a.length; i++) {
    b = $(sel);
    for (ii = 0; ii < b.length; ii++) {
      hit = 0;
      if (b[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
        hit = 1;
      }
      c = b[ii].getElementsByTagName("*");
      for (iii = 0; iii < c.length; iii++) {
        if (c[iii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          hit = 1;
        }
      }
      if (hit == 1) {
        b[ii].style.display = "";
      } else {
        b[ii].style.display = "none";
      }
    }
  }
};
var sortHTML = function(id, sel, sortvalue) {
  var a, b, i, ii, y, bytt, v1, v2, cc, j;
  a = $(id);
  for (i = 0; i < a.length; i++) {
    for (j = 0; j < 2; j++) {
      cc = 0;
      y = 1;
      while (y == 1) {
        y = 0;
        b = a[i].querySelectorAll(sel);
        for (ii = 0; ii < (b.length - 1); ii++) {
          bytt = 0;
          if (sortvalue) {
            v1 = b[ii].querySelector(sortvalue).innerHTML.toLowerCase();
            v2 = b[ii + 1].querySelector(sortvalue).innerHTML.toLowerCase();
          } else {
            v1 = b[ii].innerHTML.toLowerCase();
            v2 = b[ii + 1].innerHTML.toLowerCase();
          }
          if ((j == 0 && (v1 > v2)) || (j == 1 && (v1 < v2))) {
            bytt = 1;
            break;
          }
        }
        if (bytt == 1) {
          b[ii].parentNode.insertBefore(b[ii + 1], b[ii]);
          y = 1;
          cc++;
        }
      }
      if (cc > 0) {break;}
    }
  }
};
function toast(inner,linkInner,href) {
  var toast = document.createElement("DIV"),
      link=document.createElement("A");
  toast.id="snackbar";
  toast.className="show";
  link.innerText=linkInner||'';
  toast.innerText=inner;
  link.href=href||'';
  document.body.appendChild(toast);
  toast.appendChild(link);
  setTimeout(function(){
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
var pagecount = (function() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.visitcount) {
            localStorage.visitcount = Number(localStorage.visitcount)+1;
        } else {
            localStorage.visitcount = 1;
        }
        return localStorage.visitcount;
    }
})();
window.onwheel=function(){
              var suspendNavigation = document.getElementById("fixedbar");//獲取待定位的元素
              window.onscroll = function(){ //綁定捲軸事件
                  suspendNavigation.style.top = (document.documentElement.scrollTop || document.body.scrollTop)/3.5 + "px";//將元素top定位
              }
          };
          var type = function(text,element,speed,mode,callback){
              var input= text,
                  i = 0,
                  to = element,
                  typesrc=element.innerHTML,
                  open=0,
									action=callback||function(){void(0)},
                  changeArrow = function(){
                      setInterval(function(){
                          if(element.className.includes('type-process-1'))element.className=element.className.replace('type-process-1','type-process-2')
                          else{element.className=element.className.replace('type-process-2','type-process-1')}
                      },410)
                  },
                  str=input.split('');
						
                  setInterval(function(){
                      if(i<str.length){
                          typesrc=typesrc+str[i];
                          i++;
                      }
                      else{
                        if (mode==true){
                            i=0;
                      }
                      else if(open==0){
                          changeArrow();
													action();
                          open=1;
                      }
                  }
                  to.innerHTML=typesrc;
                },speed)
          };
//demo only
window.onload=function(){
var w = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var h = window.innerHeight
||document.documentElement.clientHeight||document.body.clientHeight;
	type('A CSS UI Kit Based On W3.CSS',document.getElementById('typing'),120,false);
	if(w/h>1.7){addClass('#fixedimg','f-width');removeClass('#fixedimg','f-height');}
}
