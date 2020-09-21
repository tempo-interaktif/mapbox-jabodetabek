// // var zoom = d3.zoom().scaleExtent([1,8]).on('zoom', function() {
// //     g_provinsi.attr("transform", d3.event.transform); 
// // });

// var svg = d3.select("#ina-map");
// var g_provinsi = svg.select('.regions')

// $(document).on('click','.btn-map', function(e) {
//     // var duration = 0;
//     // if (g_provinsi.attr('transform') != null) {
//     //     duration = 750;
//     // }
//     // g_provinsi.transition().duration(750).attr("transform", "translate(0,0) scale(1)");
//     // var kab = $(this).data('kab')
//     // setTimeout(function(){ 
//     //     switch (kab) {
//     //         case 'kab-jkt':
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(-1744.32, -715.631) scale(4.5, 4.5)");
//     //             break;
//     //         case 'kab-bgr':
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(-569.121, -463.633) scale(2.25, 2.25)");
//     //             break;
//     //         case 'kab-dpk':
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(-1880.62, -1091.21) scale(4.84, 4.84)");
//     //             break;
//     //         case 'kab-tgr':
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(-828.683, -405.028) scale(3.3, 3.3)");
//     //             break;
//     //         case 'kab-bks':
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(-887.34, -242.05) scale(2.4, 2.4)");
//     //             break;
//     //         default:
//     //             g_provinsi.transition().duration(750).attr("transform", "translate(0,0) scale(1)");
//     //             break;
//     //     }
//     //  }, duration);
//     zoom.scaleBy(svg.transition().duration(750), 0.8);
// })

// // var mymap = L
// //   .map('mapid')
// //   .setView([106, -6], 4);

// // // Add a tile to the map = a background. Comes from OpenStreetmap
// // L.tileLayer(
// //     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
// //     maxZoom: 6,
// //     }).addTo(mymap);


// var map = new L.Map("map", {center: [-6.2, 106.8], zoom: 10})
//     .addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));

// var svg = d3.select(map.getPanes().overlayPane).append("svg"),
//     g = svg.append("g").attr("class", "leaflet-zoom-hide");

// d3.json("ina.json", function(error, json) {
//     if (error) throw error;
//     var feature = g.selectAll("path")
//     .data(json.features)
//     .enter().append("path").attr("d", path);
//     // code here
// });

// function projectPoint(x, y) {
//     var point = map.latLngToLayerPoint(new L.LatLng(y, x));
//     this.stream.point(point.x, point.y);
// }

// var transform = d3.geoTransform({point: projectPoint}),
//     path = d3.geoPath().projection(transform);

// // var bounds = path.bounds(json),
// // topLeft = bounds[0],
// // bottomRight = bounds[1];
// // g.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

!(function(){
    "use strict"
    
    var map //leaflet obj
    var width = document.body.getBoundingClientRect().width
    if (width > 500) {
        var zoomAwal = 10
        var zoomJkt = 11
        var zoomBgr = 11
        var zoomDpk = 12
        var zoomTgr = 11
        var zoomBks = 11
    } else {
        var zoomAwal = 9
        var zoomJkt = 10
        var zoomBgr = 10
        var zoomDpk = 11
        var zoomTgr = 10
        var zoomBks = 10
    }
    
    d3.json("ina.json",main)
    
    function main(json) {
        addLmaps()
        drawFeatures(json)
    }
    
    function addLmaps(lat,long) {
        //Leaflet初期設定
        map = L.map('map', { zoomControl: false }).setView([-6.4, 106.8], zoomAwal);
        
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

        //Leafletに用意されたsvgを使う 
        map._initPathRoot();	
        map.dragging.disable();
        map.scrollWheelZoom.disable();
    }
    
    //位置→座標変換
    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }
    
    function drawFeatures(json) {
        var svg = d3.select("#map").select("svg").attr("id","ina-map").attr("data-status","new");
        var g = svg.append("g").attr("class", "leaflet-zoom-hide");
        
        var transform = d3.geoTransform({point: projectPoint});
        var path = d3.geoPath().projection(transform)
    
        var featureElement = g.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("stroke", "gray")
            .attr("fill", "#949494")
            .attr("fill-opacity", 0.8)
            .attr("class",function(d) {return 'kab-'+d.properties.ID_1})
            .attr("data-kab",function(d) {return d.properties.ID_1})
    
            map.on("viewreset", update);

            update();
    
        //pathのd属性を更新
        function update() {
            featureElement.attr("d", path);
        } 
    }
    
    $(document).on('click','.kab-perbatasan-kab-jkt, .kab-perbatasan-kab-tgr, .kab-perbatasan-kab-bgr, .kab-dpk, .kab-perbatasan-kab-bks, .btn-change', function(e) {
        var kab = $(this).data('kab')
        $('.kab-perbatasan-kab-jkt, .kab-perbatasan-kab-tgr, .kab-perbatasan-kab-bgr, .kab-dpk, .kab-perbatasan-kab-bks').css('stroke','red').css('stroke-width','1px').removeClass('active')
        $('.kab-'+kab).addClass('active')
        $('.box').attr('class','box show')
        $('#keterangan').html($('#ket-'+kab).html())
        switch (kab) {
            case 'perbatasan-kab-jkt':
                map.setView([-6.23016, 106.84929], zoomJkt);
                $("#ina-map").data("status","change")
                $('#nama-daerah').html('Jakarta')
                $('#daerah-selanjutnya').data('kab','perbatasan-kab-bgr')
                break;
            case 'perbatasan-kab-bgr':
                map.setView([-6.54678, 106.80019], zoomBgr);
                $("#ina-map").data("status","change")
                $('#nama-daerah').html('Bogor')
                $('#daerah-selanjutnya').data('kab','dpk')
                break;
            case 'dpk':
                map.setView([-6.38684, 106.80538], zoomDpk);
                $("#ina-map").data("status","change")
                $('#nama-daerah').html('Depok')
                $('#daerah-selanjutnya').data('kab','perbatasan-kab-tgr')
                break;
            case 'perbatasan-kab-tgr':
                map.setView([-6.18915, 106.58367], zoomTgr);
                $("#ina-map").data("status","change")
                $('#nama-daerah').html('Tangerang')
                $('#daerah-selanjutnya').data('kab','perbatasan-kab-bks')
                break;
            case 'perbatasan-kab-bks':
                map.setView([-6.24844, 107.04090], zoomBks);
                $("#ina-map").data("status","change")
                $('#nama-daerah').html('Bekasi')
                $('#daerah-selanjutnya').data('kab','perbatasan-kab-jkt')
                break;
            default:
                map.setView([-6.4, 106.8], zoomAwal);
                $('.box').attr('class','box hide')
                break;
        }
        var boxHeight = $('.box').height()
        console.log(boxHeight)
        $('.box').css('margin-top','-'+boxHeight/2+'px')
    })
}());

$(document).on('mouseenter','.kab-perbatasan-kab-jkt, .kab-perbatasan-kab-tgr, .kab-perbatasan-kab-bgr, .kab-dpk, .kab-perbatasan-kab-bks', function(e) {
    $('.'+$(this).attr('class')).css('stroke','red').css('stroke-width','5px')
})
$(document).on('mouseout','.kab-perbatasan-kab-jkt, .kab-perbatasan-kab-tgr, .kab-perbatasan-kab-bgr, .kab-dpk, .kab-perbatasan-kab-bks', function(e) {
    $('.kab-perbatasan-kab-jkt, .kab-perbatasan-kab-tgr, .kab-perbatasan-kab-bgr, .kab-dpk, .kab-perbatasan-kab-bks').css('stroke','red').css('stroke-width','1px')
})