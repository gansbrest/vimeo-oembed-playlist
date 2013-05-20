vimeo-oembed-playlist
=====================

Simple jquery plugin to generate player and playlist using vimeo oembed api. Very useful for private videos.

Basically I created this plugin, because there was nothing out there which would support paivate vimeo videos (if you have vimeo plus or pro for example).

At the moment pluin support only individual videos, not albums, groups or chanels. This functionality may be added in the future - feel free to contribute as well.

##### How to use 

There is example folder with simple use case. Just clone and open vimeo_jquery_test.html in the browser.

1 - You need some html structrure, to specify video ids:

```html
<span class="vimeo-vid">66341888</span>
<span class="vimeo-vid">66341887</span>
```

2 - Then include vimeo_oembed_playlist.js plugin.

3 - In your main js file (main.js in the example) we intialize plugin

```javascript
$(function() {
  $('.vimeo-vid').vimeo_oembed_playlist({
    width: 765,
    height: 430
  })
});
```
That's about it for the simplest use case. At this point we have all required html elements (player and playlist with thumbs) in the dom.

To turn all of this into real playlist you can use any other jquery plugin ( see example folder for jcarusel example ). You just need to initialize your 3rd party plugin inside callback function, which will be called only after all thumbs were added to the dom.

```javascript
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
)
});
```
( don't forget to add html elements for navigation links )
