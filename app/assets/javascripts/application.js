// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require dispatcher
//= require media_magick/plupload_it
//= require media_magick/toggleSortable
//= require_tree ../../../vendor/assets/javascripts
//= require_self
//= require_tree .


App = {};

App.helpers = {
  setSortable: function () {
    $('#list-sortable').sortable({
      items: '.sortable',
      axis: 'y',
      stop: function(event, ui) {
        var resource_class = $(this).data('resource_class');
        var resources_ids  = [];        
        
        $('.sortable').each(function(index) {
          resources_ids.push($(this).data('id'));
        });

        $.ajax({
           url: '/sortable/update_order',
           type: 'PUT',
           data: {resources_ids: resources_ids, resource_class: resource_class}
        });
      }
    });
  },
};

App.before = function () {
  
  $(document).ready(function () {
    $(".attachmentUploader").pluploadIt();
    
    $("#header ul.navMaster").click(function () {
      $(this).toggleClass('open');
    });

    $("a.imagesToggleSortable").bind('click', function () {
      mediaMagick.toggleSortable($("div.attachmentUploader.images .loadedAttachments"), '/update_priority', {
        linkSelector: 'a.imagesToggleSortable', 
        loadData: function () { 
          return {
            elements: function () {
              return $("div.attachmentUploader.images .loadedAttachments").sortable('toArray');
            },
            model: function () {
              return $("div.attachmentUploader.images .loadedAttachments").parent().data('model');
            },
            model_id: function () {
              return $("div.attachmentUploader.images .loadedAttachments").parent().data('id');
            },
            relation: function () {
              return $("div.attachmentUploader.images .loadedAttachments").parent().data('relation');
            }
          };
        },
        messagingEngine: false
      });
    });
  $('ul.header-menu').click(function(e) {
    var $e = $(e.target),
        target = $e;
    if (!target.is("ul")) {
      target = $(target).parents("ul.header-menu");
    } 
    if (target.hasClass('current')) {
      $('ul.header-menu').removeClass('current');
      $('ul.header-menu').css('border-bottom', '1px solid silver');
      target.children("li.subitem").hide();
      $('ul.header-menu').slideDown(400);
    }
    else {
      target.addClass('current');
      $('ul.header-menu').not('.current').slideUp(200);
      $('ul.header-menu').css('border-bottom', '1px solid white');
      $('ul.current').slideDown(400);
      target.children("li").fadeIn(400);
    }
  });
  
  });
  
};