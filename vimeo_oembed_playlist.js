(function($) {

  var endpoint = 'http://www.vimeo.com/api/oembed.json';
  var video_base = 'http://vimeo.com/';

  var videos_list = promises_list = [];
  var request_url = '';

  $.fn.vimeo_oembed_playlist = function(options, callback) {

    var settings = $.extend({
      // These are the defaults.
      width: 765,
      height: 430,
      thumb_width: 100,
      thumb_height: 100,
      thumb_title: false,
      player_target: $('#vimeo-player'),
      playlist_target: $('#vimeo-playlist')
    }, options );

    // Pass index to the scope
    // We need this to make sure vides will be rendered in the same order
    // as defined in the dom
    var promise_success = function(index) {
      return function(data, textStatus, jqXHR) {
        videos_list[index] = data;
      }
    }

    var i = 0;
    this.each(function() {
      // Hide selected elements
      $(this).css('display', 'none');

      request_url = endpoint + '?url=' + encodeURIComponent(video_base + $(this).html().trim()) + '&width=' + settings.width + '&height' + settings.height;
      promises_list[i] = $.get(request_url, promise_success(i), 'jsonp');
      i++;
    });

    // Execute this function when all ajax requsts were completed
    if (promises_list.length > 0) {
      $.when.apply(this, promises_list).then(function() {
        prepare_container();
        render_player(videos_list[0].html);
        render_playlist(videos_list);
      });
    }

    var prepare_container = function() {
      settings.playlist_target.append('<div id="vimeo-playlist-wrapper"></div>');
    }
    
    var render_player = function(embed) {
      settings.player_target.html(embed);
    }

    var render_playlist = function(videos_list) {
      var thumb_title = thumb_html = '';
      $.each(videos_list, function(index, item) {

        var el_class = '';
        if (index == 0) {
          el_class = 'active'; 
        }

        if (settings.thumb_title) {
          thumb_title = '<div class="vimeo-thumb-title">' + item.title + '</div>';
        }

        if (settings.thumb_html) {
          thumb_html = settings.thumb_html;
        }

        $('#vimeo-playlist-wrapper').append('<div style="height:' + settings.thumb_height + 'px;width=' + settings.thumb_width + 'px" class="vimeo-thumb ' + el_class + '" data-video-src="' + encodeURIComponent(item.html) + '"><img height="' + settings.thumb_height + '" width="' + settings.thumb_width + '" src="' + item.thumbnail_url + '"/>' + thumb_html + thumb_title + '</div>');
      });

      $('.vimeo-thumb').bind('click', function() {
        if (!$(this).hasClass('active')) {
          // Reset active class pointers
          $(this).parent().find('.vimeo-thumb').removeClass('active');
          $(this).addClass('active');

          render_player(decodeURIComponent($(this).attr('data-video-src')));
        }
      }); 

      // Allow other plugins to manipulate rendered items
      // by returning to the caller function
      if (typeof callback == 'function') {
        callback();
      }
    }
  };


}(jQuery));
