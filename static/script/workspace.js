  require(['jquery'], function () {
	var $main = $('.main');
	var $hd = $main.find('.hd');
	var $banner = $main.find('.banner');
	var $nav = $main.find('.nav');
	var $navList = $nav.find('.nav-list');
	var $bd = $main.find('.bd');
	var $sideMenu = $main.find('.side-menu');

	
	// nav
	$(document).on('click', '.nav .nav-list li a', function (e) {
		e.stopPropagation();
		var $this = $(this);
		if ($this.closest('.menu-list').size() > 0) {
			return;
		}

		var $navItem = $this.closest('li').addClass('selected');
		var $menuItems = $navList.find('.menu');
		var _index = $navItem.index();
		var $menuItem = $sideMenu.find('.menu').eq(_index).show();

		// $navItem.find('a').css('color', '#1999d7');
		$navList.find('> li').not($navItem).removeClass('selected');//.find('a').css('color', '#fff');

		$sideMenu.find('.menu').not($menuItem).hide();

		var _fullScreen = $main.hasClass('full-screen');

		if (!_fullScreen) {
			return;
		}

		$menuItem = $navItem.find('.menu');
		$menuItems.not($menuItem).slideUp(300);

		!$menuItem.is(':animated') && $menuItem.slideToggle(300);

	});

	// copy nav
	$nav.append($hd.find('.user-info').clone()).append('<a href="javascript:;" class="zoom 111"></a>');
	$navList.find('li').each(function (i) {
		$(this).append($sideMenu.find('.menu:eq(' + i + ')').clone());
	});
	// refresh
	$(document).delegate('.refresh', 'click', function()
	{
			location.reload();
	});
	// side menu
	$(document).on('click', '.side-menu .accordion h2 a', 'click', function () {
		var $accordion = $(this).closest('.accordion');
		$accordion.find('.menu-list').slideToggle(300, function () {
			$accordion.toggleClass('off');
		});
	});

	$(document).delegate('.side-menu .menu-list a, .nav .list .menu-list a', 'click', function () {
		var $this = $(this);
		var _href = $this.attr('href');

		var $alllink = $sideMenu.find('.menu-list a').add($nav.find('.menu-list a'));

		$alllink.removeClass('selected');
		$alllink.filter('[href="' + _href + '"]').addClass('selected');
		$this.addClass('selected');

	});

	// document click
	$(document).on('click', function () {
		var _dom = window.document;
		if (window.top != window) {
			_dom = window.top.document;
		}
		$('.nav .menu', _dom).slideUp(300);
	});

	// window resize
	if (window.top == window) {
		$(window).resize(function () {
			var _height = $(window).height();
			if ($main.is('full-screen')) {
				_height = _height - $banner.outerHeight() - 10;
			}
			else {
				_height = _height - $hd.outerHeight() - 10;
			}

			$bd.height(_height);

		}).trigger('resize');

		// nav
		$navList.find('> li:eq(0) > a').trigger('click')
	}

	// zoom in out
	$(document).delegate('.nav .zoom', 'click', function () {
		fullScreen();
	});

	// full screen
	function _fullScreen() {
		if ($main.is(':animated')) {
			return;
		}

		var _sideMenuWidth = $sideMenu.outerWidth();
		var _animatedTime = 300;

		if ($main.hasClass('full-screen')) {
			$main.toggleClass('full-screen');
			$banner.animate({height: 90}, _animatedTime);
			$bd.animate( _animatedTime, function () {
				$(window).trigger('resize');
			});
		}
		else {
			$banner.animate({height: 0}, _animatedTime);
			$bd.animate(_animatedTime, function () {
				$main.toggleClass('full-screen');
				$(window).trigger('resize');
			});
		}
	}

	window['fullScreen'] = _fullScreen;

	//open max window
	$(document).delegate('a[data-open="maxWindow"]', 'click', function () {
		Utils.openMaximizeWindow($(this).attr('href'));
		return false;
	});

	// create nav
	$(document).delegate('.icon-list .icon-more', 'click', function () {
		var $moreIcon = $('.more-icon');
		$moreIcon.find('.icon-list').hide();
		$moreIcon.animate({left: '0%'}, 800);
		$('.' + $(this).attr('data-more')).show();
		$('.default-icon').animate({'margin-left': '-100%'}, 800);

	});

	$(document).delegate('.more-icon .icon-back', 'click', function () {
		$('.default-icon').animate({'margin-left': '0px'}, 800);
		$('.more-icon').animate({left: '100%'}, 800);
	});

	$(document).delegate('.system-message', 'click', function () {
		var $bd = $('.message-main');

		!$bd.is(':animated') && $bd.slideToggle(100, function () {
			$bd.toggleClass('off');
			$bd.show();
			$('.off').hide();
		});
	});
	$(document).delegate('.message-close', 'click', function () {
		var $bd = $('.message-main');

		$bd.slideToggle(100, function () {
			$bd.toggleClass('off');
			$bd.show();
			$('.off').hide();
		});
	});
	$(document).delegate('.resetEvent', 'click', function(){
		var $this = $(this);
        var $content = $this.closest('.config-content');
        $this.closest('form').find('input[name="ec_ev"],input[name="ec_efn"],input[name="ec_eti"]').val('');

        $content.find(':input').filter(function()
        {
            var $this = $(this);
            if($this.is('[data-submit="true"]'))
            {
                return;
            }
            else if($this.is('[type="button"]'))
            {
                return;
            }
            else if($this.is(':checkbox') || $this.is(':radio'))
            {
                $this.prop('checked', false);
                return;
            }
            else
            {
                $this.val('');
            }
        });
        return false;
	})
}, function (err) {
	window['console'] && console.log && console.log(err.message);
});