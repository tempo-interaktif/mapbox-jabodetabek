// var zoom = d3.zoom().scaleExtent([1,8]).on('zoom', function() {
//     g_provinsi.attr("transform", d3.event.transform); 
// });

var svg = d3.select("#ina-map");
var g_provinsi = svg.select('.regions')

$(document).on('click','.btn-map', function(e) {
    var duration = 0;
    if (g_provinsi.attr('transform') != null) {
        duration = 750;
    }
    g_provinsi.transition().duration(750).attr("transform", "translate(0,0) scale(1)");
    var kab = $(this).data('kab')
    setTimeout(function(){ 
        switch (kab) {
            case 'kab-jkt':
                g_provinsi.transition().duration(750).attr("transform", "translate(-1744.32, -715.631) scale(4.5, 4.5)");
                break;
            case 'kab-bgr':
                g_provinsi.transition().duration(750).attr("transform", "translate(-569.121, -463.633) scale(2.25, 2.25)");
                break;
            case 'kab-dpk':
                g_provinsi.transition().duration(750).attr("transform", "translate(-1880.62, -1091.21) scale(4.84, 4.84)");
                break;
            case 'kab-tgr':
                g_provinsi.transition().duration(750).attr("transform", "translate(-828.683, -405.028) scale(3.3, 3.3)");
                break;
            case 'kab-bks':
                g_provinsi.transition().duration(750).attr("transform", "translate(-887.34, -242.05) scale(2.4, 2.4)");
                break;
            default:
                g_provinsi.transition().duration(750).attr("transform", "translate(0,0) scale(1)");
                break;
        }
     }, duration);
    // zoom.scaleBy(svg.transition().duration(750), 0.8);
})
