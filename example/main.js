$(function() {
  $('.vimeo-vid').vimeo_oembed_playlist({
    width: 765,
    height: 430
  }, function() {
    // Notify when playlist items are added to the dom
    $('#vimeo-playlist').jcarousel();

    $('#vimeo-playlist-prev').jcarouselControl({
      target: '-=1'
    });

    $('#vimeo-playlist-next').jcarouselControl({
      target: '+=1'
    });
  });
});
