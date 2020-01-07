var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $("#navigation").css("top", "0");
  } else {
    $("#navigation").css("top", "-62px");
  }
  prevScrollpos = currentScrollPos;
}

var animateHTML = function () {
  var elems;
  var windowHeight;

  function init() {

    elems = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
    addEventHandlers();
    checkPosition();
  }

  function addEventHandlers() {
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);
  }

  function checkPosition() {
    for (var i = 0; i < elems.length; i++) {
      var positionFromTop = elems[i].getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= 0) {
        elems[i].className = elems[i].className.replace(
          'hidden',
          'fadeInUp'
        );
      }
    }
  }

  return {
    init: init
  };
};

$('a[href^="#"]').on('click', function (event) {
  var hash = '#' + $(this).attr('href').split('#')[1]
  var element = $(hash)
  if (element.length) {
    event.preventDefault();
    history.pushState(hash, undefined, hash)
    $('html, body').animate({ scrollTop: element.offset().top }, 500)
  }
});

window.addEventListener('popstate', function (e) {
  if (e.state && e.state.startsWith('#') && $(e.state).length) {
    $('html, body').animate({ scrollTop: $(e.state).offset().top }, 500)
  }
});

$('html, body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
  $('html, body').stop();
  $('.navbar-collapse').collapse('hide');
});

$('.navbar-nav>a').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});