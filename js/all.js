$(function() {
    var chart = c3.generate({
        bindto: '#chartdiv',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    });
    var chart2 = c3.generate({
        bindto: '#chartdiv2',
        data: {
            columns: [
                ['data1', 30],
                ['data2', 50]
            ],
            type: 'pie'
        },

        pie: {
            label: {
                format: function(value, ratio, id) {
                    return d3.format('$')(value);
                }
            }
        }
    });
    $(function() {
        var tmpA = document.createElement('A');
        tmpA.download = '圖片.png';
        var svg2png = function(svg) {
            var canvas = document.createElement('canvas'),
            evt = document.createEvent('MouseEvent');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            canvg(canvas, (new XMLSerializer()).serializeToString(svg), {
                ignoreMouse: true,
                ignoreAnimation: true,
                renderCallback: function() {
                    tmpA.href = canvas.toDataURL('image/png');
                    console.log(canvas.toDataURL('image/png'));
                    $('#img1').attr('src', canvas.toDataURL('image/png'))
                    tmpA.dispatchEvent(evt);
                }
            });
        };
        var downloadBtn = $('#download');
        downloadBtn.click(function(e) {
            var me = $('#chartdiv svg');
            downloadBtn.data('svg', me[0]);
            e.preventDefault();
            svg2png(downloadBtn.data('svg'));
            return false;
        });
        var downloadBtn2 = $('#download2');
        downloadBtn2.click(function(e) {
            var me = $('#chartdiv2 svg');
            downloadBtn2.data('svg', me[0]);
            e.preventDefault();
            svg2png(downloadBtn2.data('svg'));
            return false;
        });
    });
});
