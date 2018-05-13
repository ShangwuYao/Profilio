/**
 * Homepage utilities.
 *
 * Author:  David Qiu
 * Email:   david@davidqiu.com
 * Website: http://www.davidqiu.com/
 *
 * Copyright (C) 2016, David Qiu. All rights reserved.
 */


// Handler for ability item mouse over event
function handler_onAbilityItemMouseOver (event, sender) {
  $(sender).css('background-color', '#eeb');
  $(sender).find('.rate').find('.star').stop();
  $(sender).find('.rate').find('.star').animate({'margin-left': '4px'}, 100, 'linear');
}


// Handler for ability item mouse out event
function handler_onAbilityItemMouseOut (event, sender) {
  $(sender).css('background-color', '');
  $(sender).find('.rate').find('.star').stop();
  $(sender).find('.rate').find('.star').animate({'margin-left': '2px'}, 100, 'linear');
}


(function ($) {

  /**
   * Refresh view layouts.
   */
  var refreshViewLayouts = function () {
    var winHeight = $(window).height();
    var winWidth  = $(window).width();

    var coverTitleIndent = 20;
    var coverTitleHeight = parseInt($($('.d-homecover .d-homecover-title')[0]).css('height'));
    var coverTitleTop = winHeight / 2 - coverTitleHeight - coverTitleIndent / 2;
    var coverSubtitleHeight = parseInt($($('.d-homecover .d-homecover-subtitle')[0]).css('height'));
    var coverSubtitleTop = winHeight / 2 + coverTitleIndent / 2;
    var coverHintScrollHeight = parseInt($($('.d-homecover .d-homecover-hint-scroll')[0]).css('height'));
    var coverHintScrollTop = winHeight - coverHintScrollHeight;
    $('.d-homecover .d-homecover-title').css('top', coverTitleTop + 'px');
    $('.d-homecover .d-homecover-subtitle').css('top', coverSubtitleTop + 'px');
    $('.d-homecover .d-homecover-hint-scroll').css('top', coverHintScrollTop + 'px');

    var coverLeftWidthMax = winHeight * 1520 / 1280;
    var coverLeftWidth = coverLeftWidthMax < winWidth ? coverLeftWidthMax : winWidth;
    var coverRightWidth = winWidth - coverLeftWidth;
    $('.d-homecover-left,.d-homecover-right').css('min-height', winHeight + 'px');
    $('.d-homecover-left').css('width', coverLeftWidth + 'px');
    $('.d-homecover-right').css('width', coverRightWidth + 'px');

    $('.d-coral.d-coral-homecover-background').css('width', winWidth + 'px');

    var peoplePhotoWidth = parseInt($($('.d-coral-people .d-people-item .photo')[0]).css('width'));
    var peoplePhotoHeight = peoplePhotoWidth * 0.75;
    $('.d-coral-people .d-people-item .photo').css('height', peoplePhotoHeight + 'px');

    var projectImageWidth = parseInt($($('.d-coral-projects .d-project-item .image')[0]).css('width'));
    var projectImageHeight = projectImageWidth;
    $('.d-coral-projects .d-project-item .image').css('height', projectImageHeight + 'px');
  }


  /**
   * Refresh page background.
   */
  var refreshPageBackground = function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var winScrollTop = $(window).scrollTop();
    var background = $('.d-coral.d-coral-homecover-background');

    var opacity = winScrollTop / winHeight;
    if (opacity < 0.01) opacity = 0.01;
    if (opacity > 1) opacity = 1;

    background.css('opacity', opacity);
  }


  /**
   * Initialize view layouts.
   */
  var initializeViewLayouts = function () {
    var winHeight = $(window).height();
    var winWidth  = $(window).width();

    // Load: Configurations
    $.ajax({ url: '/api/configurations', success: function (configurations) {
      // Initialize corals
      var colorLightBackground = '#fff';
      var colorDarkBackground = '#eeb';
      var countActiveCorals = 0;
      for (var o in configurations.corals) {
        if (configurations.corals.hasOwnProperty(o)) {
          var coral = configurations.corals[o];
          if (coral.visible) {
            var selector = '.d-coral.' + coral.class;
            if (countActiveCorals % 2 == 0) {
              $(selector).css('background-color', colorLightBackground);
            } else {
              $(selector).css('background-color', colorDarkBackground);
            }
            $(selector).show();
            ++countActiveCorals;
          }
        }
      }
      // Initialize homecover
      $('.d-homecover .d-homecover-title').text(configurations.homecover.title);
      $('.d-homecover .d-homecover-subtitle').text(configurations.homecover.subtitle);
      $('.d-homecover .d-homecover-left').css('background-image', 'url(' + configurations.homecover.left +')');
      $('.d-homecover .d-homecover-right').css('background-image', 'url(' + configurations.homecover.right +')');
      // Refresh view layouts
      refreshViewLayouts();
    }});

    // Load: Profile
    $.ajax({ url: '/api/profile', success: function (profile) {
      var templateDetailItem = $($('.d-coral-profile .d-template.d-template-profile-detail-item')[0]);
      $('.d-coral-profile .d-profile-introduction').text(profile.introduction);
      for (var o in profile.details) {
        if (profile.details.hasOwnProperty(o)) {
          var detailItem = profile.details[o];
          var newDetailItem = templateDetailItem.children().clone();
          newDetailItem.find('.icon').addClass(detailItem.icon);
          newDetailItem.find('.title').text(detailItem.title);
          newDetailItem.find('.text').text(detailItem.text);
          templateDetailItem.before(newDetailItem);
        }
      }
    }});

    // Load: Experiences
    $.ajax({ url: '/api/experiences', success: function (experiences) {
      var templateAnchor = $($('.d-coral-experiences .d-template.d-template-experience-anchor')[0]);
      var templateSection = $($('.d-coral-experiences .d-template.d-template-experience-section')[0]);
      var templateItem = $($('.d-coral-experiences .d-template.d-template-experience-item')[0]);
      var templateIndent = $($('.d-coral-experiences .d-template.d-template-experience-item-indent')[0]);
      //todo: add indent
      for (var o in experiences) {
        if (experiences.hasOwnProperty(o)) {
          var section = experiences[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.d-experience-institution').text(item.institution);
            newItem.find('.d-experience-position').text(item.position);
            newItem.find('.d-experience-description').text(item.description);
            newItem.find('.d-experience-location').find('.text').text(item.location);
            newItem.find('.d-experience-date').find('.text').text(item.date);
            if (item.link) {
              newItem.find('.d-experience-link').find('a').attr('href', item.link);
              newItem.find('.d-experience-link').find('.text').text(item.link);
              newItem.find('.d-experience-link').show();
            }
            if (i > 0) {
              var newIndent = templateIndent.children().clone();
              templateAnchor.before(newIndent);
            }
            templateAnchor.before(newItem);
          }
        }
      }
    }});

    // Load: Abilities
    $.ajax({ url: '/api/abilities', success: function (abilities) {
      var templateAnchor = $($('.d-coral-abilities .d-template.d-template-ability-anchor')[0]);
      var templateSection = $($('.d-coral-abilities .d-template.d-template-ability-section')[0]);
      var templateItem = $($('.d-coral-abilities .d-template.d-template-ability-item')[0]);
      var templateStarSolid = $($('.d-coral-abilities .d-template.d-template-ability-item-star-solid')[0]);
      var templateStarEmpty = $($('.d-coral-abilities .d-template.d-template-ability-item-star-empty')[0]);
      for (var o in abilities) {
        if (abilities.hasOwnProperty(o)) {
          var section = abilities[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.d-ability-item .name').text(item.name);
            for (var j=0; j<item.rate; ++j) {
              templateStarSolid.children().clone().appendTo(newItem.find('.d-ability-item .rate'));
            }
            for (var j=0; j<5-item.rate; ++j) {
              templateStarEmpty.children().clone().appendTo(newItem.find('.d-ability-item .rate'));
            }
            templateAnchor.before(newItem);
          }
        }
      }
    }});

    // Load: Projects
    $.ajax({ url: '/api/projects', success: function (projects) {
      var templateAnchor = $($('.d-coral-projects .d-template.d-template-project-anchor')[0]);
      var templateItem = $($('.d-coral-projects .d-template.d-template-project-item')[0]);
      var templateIndent = $($('.d-coral-projects .d-template.d-template-project-item-indent')[0]);
      for (var i=0; i<projects.items.length; ++i) {
        var item = projects.items[i];
        if (item.visible) {
          var newItem = templateItem.children().clone();
          newItem.find('.name').text(item.name);
          newItem.find('.organization').text(item.organization);
          newItem.find('.description').text(item.description);
          newItem.find('.date .text').text(item.date);
          newItem.find('.location .text').text(item.location);
          if (item.link) {
            newItem.find('.link a').attr('href', item.link);
            newItem.find('.link .text').text(item.link);
            newItem.find('.link').css('display', '');
            newItem.find('a.link-mobile').attr('href', item.link);
          }
          newItem.find('.image').css('background-image', 'url(' + item.image + ')');
          if (item.imageBackgroundColor) {
            newItem.find('.image').css('background-color', item.imageBackgroundColor);
          }
          if (i > 0) {
            var newIndent = templateIndent.children().clone();
            templateAnchor.before(newIndent);
          }
          templateAnchor.before(newItem);
        }
      }
      refreshViewLayouts();
    }});

    // Load: Honors
    $.ajax({ url: '/api/honors', success: function (honors) {
      var templateAnchor = $($('.d-coral-honors .d-template.d-template-honor-anchor')[0]);
      var templateSection = $($('.d-coral-honors .d-template.d-template-honor-section')[0]);
      var templateItem = $($('.d-coral-honors .d-template.d-template-honor-item')[0]);
      var templateIndent = $($('.d-coral-honors .d-template.d-template-honor-item-indent')[0]);
      for (var o in honors) {
        if (honors.hasOwnProperty(o)) {
          var section = honors[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          newSection.find('.d-honor-section-institution').text(section.institution);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.prize').text(item.prize);
            newItem.find('.activity').text(item.activity);
            newItem.find('.location .text').text(item.location);
            newItem.find('.date .text').text(item.date);
            if (item.host) {
              newItem.find('.host').text(item.host);
              newItem.find('.host').css('display', '');
            }
            if (item.link) {
              newItem.find('.link a').attr('href', item.link);
              newItem.find('.link-wrap').css('display', '');
            }
            if (i > 0) {
              var newIndent = templateIndent.children().clone();
              templateAnchor.before(newIndent);
            }
            templateAnchor.before(newItem);
          }
        }
      }
    }});

    // Load: Activities
    $.ajax({ url: '/api/activities', success: function (activities) {
      var templateAnchor = $($('.d-coral-activities .d-template.d-template-activity-anchor')[0]);
      var templateSection = $($('.d-coral-activities .d-template.d-template-activity-section')[0]);
      var templateItem = $($('.d-coral-activities .d-template.d-template-activity-item')[0]);
      var templateIndent = $($('.d-coral-activities .d-template.d-template-activity-item-indent')[0]);
      for (var o in activities) {
        if (activities.hasOwnProperty(o)) {
          var section = activities[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          newSection.find('.d-activity-section-institution').text(section.institution);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.position').text(item.position);
            newItem.find('.activity').text(item.activity);
            newItem.find('.location .text').text(item.location);
            newItem.find('.date .text').text(item.date);
            if (item.host) {
              newItem.find('.host').text(item.host);
              newItem.find('.host').css('display', '');
            }
            if (item.link) {
              newItem.find('.link a').attr('href', item.link);
              newItem.find('.link-wrap').css('display', '');
            }
            if (i > 0) {
              var newIndent = templateIndent.children().clone();
              templateAnchor.before(newIndent);
            }
            templateAnchor.before(newItem);
          }
        }
      }
    }});

    // Load: People
    $.ajax({ url: '/api/people', success: function (people) {
      var templateAnchor = $($('.d-coral-people .d-template.d-template-people-anchor')[0]);
      var templateSection = $($('.d-coral-people .d-template.d-template-people-section')[0]);
      var templateItem = $($('.d-coral-people .d-template.d-template-people-item')[0]);
      var templateIndent = $($('.d-coral-people .d-template.d-template-people-item-indent')[0]);
      for (var o in people) {
        if (people.hasOwnProperty(o)) {
          var section = people[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          newSection.find('.d-people-section-institution').text(section.institution);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.name').text(item.name);
            newItem.find('.position').text(item.position);
            newItem.find('.institution').text(item.institution);
            newItem.find('.description').text(item.description);
            newItem.find('.photo').css('background-image', 'url(' + item.photo + ')');
            if (i > 0) {
              var newIndent = templateIndent.children().clone();
              templateAnchor.before(newIndent);
            }
            templateAnchor.before(newItem);
          }
        }
      }
      refreshViewLayouts();
    }});

    // Load: Supplements
    $.ajax({ url: '/api/supplements', success: function (supplements) {
      var templateAnchor = $($('.d-coral-supplements .d-template.d-template-supplement-anchor')[0]);
      var templateSection = $($('.d-coral-supplements .d-template.d-template-supplement-section')[0]);
      var templateItem = $($('.d-coral-supplements .d-template.d-template-supplement-item')[0]);
      for (var o in supplements) {
        if (supplements.hasOwnProperty(o)) {
          var section = supplements[o];
          var newSection = templateSection.children().clone();
          newSection.find('.d-coral-subtitle').text(section.title);
          templateAnchor.before(newSection);
          for (var i=0; i<section.items.length; ++i) {
            var item = section.items[i];
            var newItem = templateItem.children().clone();
            newItem.find('.icon').addClass(item.icon);
            newItem.find('.title').text(item.title);
            newItem.find('a').attr('href', item.link);
            templateAnchor.before(newItem);
          }
        }
      }
    }});

    // Load: Contact
    $.ajax({ url: '/api/contact', success: function (contact) {
      var template = $($('.d-coral-contact .d-template.d-template-contact-way')[0]);
      for (var o in contact.ways) {
        if (contact.ways.hasOwnProperty(o)) {
          var way = contact.ways[o];
          var newElem = template.children().clone();
          newElem.find('.d-contact-item .icon').addClass(way.icon);
          newElem.find('.d-contact-item .text').text(way.text);
          if (way.link) {
            newElem.find('.d-contact-item .link').attr('href', way.link);
          }
          template.before(newElem);
        }
      }
    }});

    // Initialize: Homecover hint scroll effect
    (function () {
      function animateHintScrollEffect () {
        $('.d-homecover .d-homecover-hint-scroll .icon').animate({ opacity: '0.01' }, 500, function () {
          $('.d-homecover .d-homecover-hint-scroll .icon').animate({ opacity: '0.99' }, 1000, function () {
            animateHintScrollEffect();
          });
        });
      }
      animateHintScrollEffect();
    })();

    // Initialize: Copyright year
    (function () {
      var minYear = 2016;
      var curYear = (new Date()).getFullYear();
      if (curYear > minYear) {
        $('.d-copyright-year').text('' + minYear + ' - ' + curYear);
      } else {
        $('.d-copyright-year').text('' + minYear);
      }
    })();
  }


  // Handler for window resize event
  var handler_onWindowResize = function (event) {
    refreshViewLayouts();
  }


  // Handler for window load event
  var handler_onWindowLoad = function (event) {
    initializeViewLayouts();
    refreshViewLayouts();
  }


  // Handler for window scroll event
  var handler_onWindowScroll = function (event) {
    refreshPageBackground();
  }


  /**
   * Register events.
   */
  var registerEvents = function () {
    // Register: Window load event handler
    $(window).load(handler_onWindowLoad);

    // Register: Window resize event handler
    $(window).resize(handler_onWindowResize);

    // Register: Window scroll event handler
    $(window).scroll(handler_onWindowScroll);
  }


  // Register events
  registerEvents();

})(jQuery);


