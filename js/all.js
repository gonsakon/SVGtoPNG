
$(function() {
  $('.savePNG').on('click',function(e){
    e.preventDefault;
    createChartImages();
  });
   var chart = c3.generate({
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]]
        },point: {
        show: false
    }
    });

   var styles;
   var createChartImages = function() {
       // Zoom! Enhance!
       // $('#chart > svg').attr('transform', 'scale(2)');

       // Remove all defs, which botch PNG output
       $('defs').remove();
       // Copy CSS styles to Canvas
       inlineAllStyles();
       // Create PNG image
       var canvas = $('#canvas').empty()[0];
       canvas.width = $('#chart').width() * 2;
       canvas.height = $('#chart').height() * 2;

       var canvasContext = canvas.getContext('2d');
       var svg = $.trim($('#chart > svg')[0].outerHTML);
       canvasContext.drawSvg(svg, 0, 0);
       $(".savePNG").attr("href", canvas.toDataURL("png"))
           .attr("download", function() {
               return "_llamacharts.png";
           });

   };
   var inlineAllStyles = function() {
       var chartStyle, selector;
       // Get rules from c3.css
       for (var i = 0; i <= document.styleSheets.length - 1; i++) {
           if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf('c3.css') !== -1) {
               if (document.styleSheets[i].rules !== undefined) {
                   chartStyle = document.styleSheets[i].rules;
               } else {
                   chartStyle = document.styleSheets[i].cssRules;
               }
           }

       }
       if (chartStyle !== null && chartStyle !== undefined) {
           // SVG doesn't use CSS visibility and opacity is an attribute, not a style property. Change hidden stuff to "display: none"
           var changeToDisplay = function() {
               if ($(this).css('visibility') === 'hidden' || $(this).css('opacity') === '0') {
                   $(this).css('display', 'none');
               }
           };
           // Inline apply all the CSS rules as inline
           for (i = 0; i < chartStyle.length; i++) {

               if (chartStyle[i].type === 1) {
                   selector = chartStyle[i].selectorText;
                   styles = makeStyleObject(chartStyle[i]);
                   $('svg *').each(changeToDisplay);
                   // $(selector).hide();
                   $(selector).not($('.c3-chart path')).css(styles);
               }
               $('.c3-chart path')
                   .filter(function() {
                       return $(this).css('fill') === 'none';
                   })
                   .attr('fill', 'none');

               $('.c3-chart path')
                   .filter(function() {
                       return !$(this).css('fill') === 'none';
                   })
                   .attr('fill', function() {
                       return $(this).css('fill');
                   });
           }
       }
   };
   // Create an object containing all the CSS styles.
   // TODO move into inlineAllStyles
   var makeStyleObject = function(rule) {
       var styleDec = rule.style;
       var output = {};
       var s;
       for (s = 0; s < styleDec.length; s++) {
           output[styleDec[s]] = styleDec[styleDec[s]];
       }
       return output;
   };
   
});
