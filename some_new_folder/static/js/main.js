jQuery(document).ready(function($) {

  page = 1;
  pageCount = Math.ceil($('.more-post').attr('data-posts-count')/5);
  $('.more-post').on('click', function(){
    while (page < pageCount) {
      page += 1;
      ajaxCall({page: page});
      if (page == pageCount) {
        $(this).addClass('visuallyhidden');
      }
      return false;
    };
  });

  jCarouseled('.vertical');

  function jCarouseled(selector) {
    $(selector).jcarousel({
      vertical: true
    });

    $(selector).find('.prev')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '-=1'
      });

    $(selector).find('.next')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '+=1'
      });
  }

  function ajaxCall(elem) {

    $.ajax({
      url: window.location.pathname,
      type: 'POST',
      data: JSON.stringify(elem),
      contentType: 'application/json;charset=UTF-8',
      success: function(e) {
        $.each(e.result, function(key){
          if (e.result[key].category == 'development') {
            var cat_class = 'icon-dev';
          }else if (e.result[key].category == 'analytics') {
            var cat_class = 'icon-analytics';
          }else if (e.result[key].category == 'testing') {
            var cat_class = 'icon-testing';
          };
          $post = $('<article><div class="article-type '+ cat_class +'"></div><h1>'+ e.result[key].header +'</h1><div class="article-content">'+ e.result[key].body +'</div><div class="article-date">'+ e.result[key].publish +'</div></article>');
          $post.insertBefore($('.more-post'));
          jCarouseled('.vertical');
          jCarouseled('.horizontal');
        });
      },
      error: function(e) {
        console.log('error ->', e.result);
      }
    }); 
  }
});
