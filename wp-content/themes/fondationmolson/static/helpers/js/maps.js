/**
 * Created by Fleo on 23/06/2017.
 */

jQuery(document).ready(function() {
    var lat = $('#map').data('lat');
    var long = $('#map').data('long');
    var mapTitle = $('#map').data('title') || '';
    var mapAddress = $('#map').data('address') || '';

    var myLatlng = new google.maps.LatLng(lat, long);

    var defaultStyle = [
        {
            featureType: 'landscape',
            stylers: [
                { hue: '#FFBB00' },
                { saturation: 43.400000000000006 },
                { lightness: 37.599999999999994 },
                { gamma: 1 },
            ],
        },
        {
            featureType: 'road.highway',
            stylers: [
                { hue: '#FFC200' },
                { saturation: -61.8 },
                { lightness: 45.599999999999994 },
                { gamma: 1 },
            ],
        },
        {
            featureType: 'road.arterial',
            stylers: [
                { hue: '#FF0300' },
                { saturation: -100 },
                { lightness: 51.19999999999999 },
                { gamma: 1 },
            ],
        },
        {
            featureType: 'road.local',
            stylers: [{ hue: '#FF0300' }, { saturation: -100 }, { lightness: 52 }, { gamma: 1 }],
        },
        {
            featureType: 'water',
            stylers: [
                { hue: '#0078FF' },
                { saturation: -13.200000000000003 },
                { lightness: 2.4000000000000057 },
                { gamma: 1 },
            ],
        },
        {
            featureType: 'poi',
            stylers: [
                { hue: '#00FF6A' },
                { saturation: -1.0989010989011234 },
                { lightness: 11.200000000000017 },
                { gamma: 1 },
            ],
        },
    ];

    var greyStyle = [
        { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#d3d3d3' }] },
        { featureType: 'transit', stylers: [{ color: '#808080' }, { visibility: 'off' }] },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ visibility: 'on' }, { color: '#b3b3b3' }],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'on' }, { color: '#ffffff' }, { weight: 1.8 }],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#d7d7d7' }],
        },
        {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'on' }, { color: '#ebebeb' }],
        },
        { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#a7a7a7' }] },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ffffff' }],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'on' }, { color: '#efefef' }],
        },
        { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#696969' }] },
        {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{ visibility: 'on' }, { color: '#737373' }],
        },
        { featureType: 'poi', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#d6d6d6' }],
        },
        { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
        {},
        { featureType: 'poi', elementType: 'geometry.fill', stylers: [{ color: '#dadada' }] },
    ];

    var styles = $('#map').data('style') === 'grey' ? greyStyle : defaultStyle;

    var mapOptions = {
        zoom: 12,
        center: myLatlng,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        draggable: !('ontouchend' in document),
        styles: styles,
    };

    var map = new google.maps.Map($('#map').get(0), mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: '<h5 style="line-height:1; font-size: 18px; margin: 5px 0;">' + mapTitle + '</h5><span style="line-height:1.2;">' + mapAddress +'</span>',
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: '/app/images/marker.svg',
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
});