/**
 * @author Ryan Van Etten
 * @see http://ryanve.com/lab/dimensions/
 */
!function(a,b,c){"undefined"!=typeof module&&module.exports?module.exports=c():a[b]=c()}(this,"verge",function(){function a(){return{width:k(),height:l()}}function b(a,b){var c={};return b=+b||0,c.width=(c.right=a.right+b)-(c.left=a.left-b),c.height=(c.bottom=a.bottom+b)-(c.top=a.top-b),c}function c(a,c){return a=a&&!a.nodeType?a[0]:a,a&&1===a.nodeType?b(a.getBoundingClientRect(),c):!1}function d(b){b=null==b?a():1===b.nodeType?c(b):b;var d=b.height,e=b.width;return d="function"==typeof d?d.call(b):d,e="function"==typeof e?e.call(b):e,e/d}var e={},f="undefined"!=typeof window&&window,g="undefined"!=typeof document&&document,h=g&&g.documentElement,i=f.matchMedia||f.msMatchMedia,j=i?function(a){return!!i.call(f,a).matches}:function(){return!1},k=e.viewportW=function(){var a=h.clientWidth,b=f.innerWidth;return b>a?b:a},l=e.viewportH=function(){var a=h.clientHeight,b=f.innerHeight;return b>a?b:a};return e.mq=j,e.matchMedia=i?function(){return i.apply(f,arguments)}:function(){return{}},e.viewport=a,e.scrollX=function(){return f.pageXOffset||h.scrollLeft},e.scrollY=function(){return f.pageYOffset||h.scrollTop},e.rectangle=c,e.aspect=d,e.inX=function(a,b){var d=c(a,b);return!!d&&d.right>=0&&d.left<=k()},e.inY=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.top<=l()},e.inViewport=function(a,b){var d=c(a,b);return!!d&&d.bottom>=0&&d.right>=0&&d.top<=l()&&d.left<=k()},e});

var initSizeLab = null;
verge = window.verge; // npm: verge
viewportW = verge['viewportW'];
console.log("viewportW="+viewportW());

var sizelab = new Object;

(function(window, document, screen) {
  jQuery(function($) {
    function _initSizeLab(){
      //console.log("----------------------------------------->sizelabinit")
    var docElem = document.documentElement
      , $html = $(docElem)
      , $win = $(window)
      , $doc = $(document)
      , verge = window.verge // npm: verge
      , viewportW = verge['viewportW']
      , viewportH = verge['viewportH']
      , mM = window['matchMedia'] || window['msMatchMedia']
      , $style = $('<style></style>').appendTo(document.head)
      , outputs = []
      , prev = [];

    /**
     * @link http://gist.github.com/ryanve/7924792 for a more robust method
     * @param {string} feature (e.g. "min-width")
     * @param {string=} unit
     * @param {number=} init
     * @param {number=} step
     * @return {number} the highest value that (feature:value) matches
     */
    function maxMedia(feature, unit, init, step) {
      if (typeof init != 'number') init = 0;
      if (!mM) return init;
      if (typeof unit != 'string') unit = '';
      if (typeof step != 'number') step = 1;
      while (mM.call(window, '(' + feature + ':' + (init+=step) + unit + ')')['matches']) {}
      return init-step;
    }

    function makeTestMq(feature, px, selector, rule) {
      return '@media (' + feature + ':' + px + 'px) { ' + selector + '{' + rule + '} }';
    }

    function update() {
      console.log("--------update--------------");
      var l, i = 0, updates = [], prefix = '#output-';
      updates[1] = $win.width();
      updates[2] = updates[25] = docElem.clientWidth;
      updates[3] = window.innerWidth;
      updates[4] = window.outerWidth;
      updates[5] = $doc.width();
      updates[6] = $win.height();
      updates[7] = updates[26] = docElem.clientHeight;
      updates[8] = window.innerHeight;
      updates[9] = window.outerHeight;
      updates[10] = $doc.height();
      updates[11] = screen.width;
      updates[12] = screen.availWidth;
      updates[13] = screen.height;
      updates[14] = screen.availHeight;
      updates[15] = document.body.clientWidth;
      updates[16] = document.body.clientHeight;
      updates[17] = docElem.scrollWidth;
      updates[18] = document.body.scrollWidth;
      updates[19] = docElem.scrollHeight;
      updates[20] = document.body.scrollHeight;
      updates[21] = docElem.offsetWidth;
      updates[22] = document.body.offsetWidth;
      updates[23] = docElem.offsetHeight;
      updates[24] = document.body.offsetHeight;
      updates[27] = maxMedia('min-width', 'px');
      updates[28] = maxMedia('min-height', 'px');
      updates[29] = maxMedia('min-device-width', 'px');
      updates[30] = maxMedia('min-device-height', 'px');
      updates[31] = viewportW();
      updates[32] = viewportH();

      if( typeof( window.innerWidth ) == 'number' ) {
      updates[27] = window.innerWidth;
      updates[28] = window.innerHeight;
      } else if( typeof( window.innerWidth ) == 'number' ){
      updates[27] = document.documentElement.clientWidth;
      updates[28] = document.documentElement.clientHeight;
      }  else {
      updates[27] = document.body.offsetWidth;
      updates[28] = document.body.offsetHeight;
      }
      //updates[27]  = parseInt($('.main').css('width'));
      //updates[28]  = parseInt($('.main').css('height'));

      for(var x=0;x<updates.length;x++)
      {
        console.log("updates["+x+"]="+updates[x])
      }
     // console.log("-------->gPortraitDegree = "+gPortraitDegree);
      //console.log("-------->typeof(gPortraitDegree1)  = "+ ((typeof gPortraitDegree1) == 'undefined'));
      if((typeof gPortraitDegree != 'undefined') && (gPortraitDegree == 270 || gPortraitDegree == 90) && bEnablePortraitMode == true)
      {
        console.log("gPortraitDegree in sizelab = "+gPortraitDegree);
        console.log("sizelab in Portait mode");
        sizelab.width = updates[28];
        sizelab.height = updates[27];
      }else
      {
        sizelab.width = updates[27];
        sizelab.height = updates[28];
      }
      console.log("sizelab --> sizelab.width = "+sizelab.width);
      console.log("sizelab --> sizelab.height = "+sizelab.height);
     // $('#goog').append("sizelab="+sizelab.width+"x"+sizelab.height);

      $('.sizelab_height').each(function(n)
      {
          var percent_height = parseFloat($(this).attr("sizelabHeight"));
          //console.log(percent_height);
          $(this).css('height',parseInt(sizelab.height*(percent_height/100))+"px");

      });

      $('.sizelab_top').each(function(n)
      {
          var percent_height = parseFloat($(this).attr("sizelabTop"));
          //console.log(percent_height);
          $(this).css('top',parseInt(sizelab.height*(percent_height/100))+"px");

      });
      $('.sizelab_left').each(function(n)
      {
          var percent_width = parseFloat($(this).attr("sizelabLeft"));
          //console.log(percent_height);
          $(this).css('left',parseInt(sizelab.width*(percent_width/100))+"px");

      });
      $('.sizelab_width').each(function(n)
      {
          var percent_width = parseFloat($(this).attr("sizelabWidth"));
          //console.log(percent_height);
          $(this).css('width',parseInt(sizelab.width*(percent_width/100))+"px");

      });

      $('.sizelab_lineheight').each(function(n)
      {
          var percent_lineheight = parseFloat($(this).attr("sizelabLineHeight"));
          //console.log(percent_height);
          $(this).css('line-height',parseInt(sizelab.height*(percent_lineheight/100))+"px");

      });
      $('.sizelab_borderRadius').each(function(n)
      {
          var percent_borderradius = parseFloat($(this).attr("sizelabBorderRadius"));
          //console.log(percent_height);
          $(this).css('border-radius',parseInt(sizelab.width*(percent_borderradius/100))+"px");

      });
      $('.sizelab_borderWidth').each(function(n)
      {
          var percent_borderwidth = parseFloat($(this).attr("sizelabBorderWidth"));
          //console.log(percent_height);
          $(this).css('border-width',parseInt(sizelab.width*(percent_borderwidth/100))+"px");

      });
      $('.sizelab_font').each(function(n)
      {
          var percent_width = parseFloat($(this).attr("sizelabFont"));
          $(this).css('font-size',parseInt(sizelab.width*(percent_width/100))+"px");

      });
      $('.sizelab_marginTop').each(function(n)
      {
          var percent_width = parseFloat($(this).attr("sizelabMarginTop"));
          $(this).css('margin-top',parseInt(sizelab.height*(percent_width/100))+"px");

      });
      $('.sizelab_marginBottom').each(function(n)
      {
          var percent_width = parseFloat($(this).attr("sizelabMarginBottom"));
          $(this).css('margin-bottom',parseInt(sizelab.height*(percent_width/100))+"px");

      });
      $('.sizelab_reCssWidth').each(function(n)
      {
          if($(this).attr("reCssWidth") == undefined)
          {

            $(this).attr("reCssWidth",parseInt($(this).css("width")));
          }
          var width = parseInt($(this).attr("reCssWidth"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('width',parseInt(width*(sizelab.width/baseWidth))+"px");
           //$('#goog').append("width="+parseInt(width*(sizelab.width/baseWidth))+"px");
      });
      $('.sizelab_reCssHeight').each(function(n)
      {
          if($(this).attr("reCssHeight") == undefined)
          {

            $(this).attr("reCssHeight",parseInt($(this).css("height")));
          }
          var height = parseInt($(this).attr("reCssHeight"));
          if($(this).attr("baseHeight") == undefined)
          {
            var baseHeight = parseInt(sizelab_baseHeight);
          }else
          {
            var baseHeight = parseInt($(this).attr("baseHeight"));
          }
          $(this).css('height',parseInt(height*(sizelab.height/baseHeight))+"px");

      });
      $('.sizelab_reCssFont').each(function(n)
      {
          if($(this).attr("reCssFont") == undefined)
          {

            $(this).attr("reCssFont",parseInt($(this).css("font-size")));
          }
          var width = parseInt($(this).attr("reCssFont"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('font-size',parseInt(width*(sizelab.width/baseWidth))+"px");
          //$('#goog').append("font-size="+parseInt(width*(sizelab.width/baseWidth))+"px ");
      });
      $('.sizelab_reCssFontByHeight').each(function(n)
      {
          if($(this).attr("reCssFont") == undefined)
          {

            $(this).attr("reCssFont",parseInt($(this).css("font-size")));
          }
          var height = parseInt($(this).attr("reCssFont"));
          if($(this).attr("baseHeight") == undefined)
          {
            var baseHeight = parseInt(sizelab_baseHeight);
          }else
          {
            var baseHeight = parseInt($(this).attr("baseHeight"));
          }
          $(this).css('font-size',parseInt(height*(sizelab.height/baseHeight))+"px");
          //$('#goog').append("font-size="+parseInt(width*(sizelab.width/baseWidth))+"px ");
      });
      $('.sizelab_reCssLineHeight').each(function(n)
      {
          if($(this).attr("reCssLineHeight") == undefined)
          {

            $(this).attr("reCssLineHeight",parseInt($(this).css("line-height")));
          }
          var width = parseInt($(this).attr("reCssLineHeight"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('line-height',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      $('.sizelab_reCssPaddingTop').each(function(n)
      {
          if($(this).attr("reCssPaddingTop") == undefined)
          {

            $(this).attr("reCssPaddingTop",parseInt($(this).css("padding-top")));
          }
          var width = parseInt($(this).attr("reCssPaddingTop"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('padding-top',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      $('.sizelab_reCssPaddingBottom').each(function(n)
      {
          if($(this).attr("reCssPaddingBottom") == undefined)
          {

            $(this).attr("reCssPaddingBottom",parseInt($(this).css("padding-bottom")));
          }
          var width = parseInt($(this).attr("reCssPaddingBottom"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('padding-bottom',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      $('.sizelab_reCssPaddingRight').each(function(n)
      {
          if($(this).attr("reCssPaddingRight") == undefined)
          {

            $(this).attr("reCssPaddingRight",parseInt($(this).css("padding-right")));
          }
          var width = parseInt($(this).attr("reCssPaddingRight"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('padding-right',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      $('.sizelab_reCssPaddingLeft').each(function(n)
      {
          if($(this).attr("reCssPaddingLeft") == undefined)
          {

            $(this).attr("reCssPaddingLeft",parseInt($(this).css("padding-left")));
          }
          var width = parseInt($(this).attr("reCssPaddingLeft"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('padding-left',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      $('.sizelab_reCssBorderRadius').each(function(n)
      {
          if($(this).attr("reCssBorderRadius") == undefined)
          {

            $(this).attr("reCssBorderRadius",parseInt($(this).css("border-radius")));
          }
          var width = parseInt($(this).attr("reCssBorderRadius"));
          if($(this).attr("baseWidth") == undefined)
          {
            var baseWidth = parseInt(sizelab_baseWidth);
          }else
          {
            var baseWidth = parseInt($(this).attr("baseWidth"));
          }
          $(this).css('border-radius',parseInt(width*(sizelab.width/baseWidth))+"px");

      });
      //$('.verticalmiddle-wrapper').css('width',($('.verticalmiddle-ot').width()-20)+"px");
      $('.sizelab-verticalmiddle-parent').each(function(n)
      {
          $(this).children('.sizelab-verticalmiddle-child').css('width',parseInt($(this).width()-20)+"px");
      });
      // Update changed outputs
      /*
      for (l = updates.length; i < l; i++) {
        if (i in updates && updates[i] !== prev[i]) {
          (outputs[i] = outputs[i] || $(prefix + i)).text(updates[i]);
        }
      }


      // Inject exact media queries to confirm the calculated viewport size.
      $style.text([
          makeTestMq('width', updates[27], '#output-27', 'font-weight:bold')
        , makeTestMq('height', updates[28], '#output-28', 'font-weight:bold')
        , makeTestMq('device-width', updates[29], '#output-29', 'font-weight:bold')
        , makeTestMq('device-height', updates[30], '#output-30', 'font-weight:bold')
      ].join('\n'));
      */
      // Prepare for next update.
      prev = updates;
    }

    update();
    $win.on('resize', update);

    }

    initSizeLab = _initSizeLab;
    _initSizeLab();
    //$html.removeClass('no-js').addClass('js');
    //mM && $('a.match-media').attr('data-via', mM === window['matchMedia'] ? 'matchMedia' : 'msMatchMedia');

  });
}(window, document, screen));
