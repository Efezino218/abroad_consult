(function ($) {

	"use strict";

	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-top');
			if (windowpos >= 110) {
				siteHeader.addClass('fixed-header');
				scrollLink.addClass('open');
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.removeClass('open');
			}
		}
	}

	headerStyle();

	// dropdown menu
	var mobileWidth = 992;
	var navcollapse = $('.navigation li.dropdown');

	$(window).on('resize', function () {
		navcollapse.children('ul').hide();
	});

	navcollapse.hover(function () {
		if ($(window).innerWidth() >= mobileWidth) {
			$(this).children('ul').stop(true, false, true).slideToggle(300);
		}
	});

	//Submenu Dropdown Toggle
	if ($('.main-header .navigation li.dropdown ul').length) {
		$('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

		//Dropdown Button
		$('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
			$(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function (e) {
			e.preventDefault();
		});
	}

	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1000);

		});
	}

	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW({
			mobile: false
		});
		wow.init();
	}

	//Contact Form Validation
	if ($("#contact-form").length) {
		$("#contact-form").validate({
			submitHandler: function (form) {
				var form_btn = $(form).find('button[type="submit"]');
				var form_result_div = '#form-result';
				$(form_result_div).remove();
				form_btn.before('<div id="form-result" class="alert alert-success" role="alert" style="display: none;"></div>');
				var form_btn_old_msg = form_btn.html();
				form_btn.html(form_btn.prop('disabled', true).data("loading-text"));
				$(form).ajaxSubmit({
					dataType: 'json',
					success: function (data) {
						if (data.status == 'true') {
							$(form).find('.form-control').val('');
						}
						form_btn.prop('disabled', false).html(form_btn_old_msg);
						$(form_result_div).html(data.message).fadeIn('slow');
						setTimeout(function () { $(form_result_div).fadeOut('slow') }, 6000);
					}
				});
			}
		});
	}

	// Fact Counter
	function factCounter() {
		if ($('.fact-counter').length) {
			$('.fact-counter .column.animated').each(function () {

				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function () {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function () {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}

			});
		}
	}

	// Fact Counter
	function factCounter_1() {
		if ($('.counter-style-two').length) {
			$('.counter-style-two .column.animated').each(function () {

				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function () {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function () {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}

			});
		}
	}


	//Sortable Masonary with Filters
	function enableMasonry() {
		if ($('.sortable-masonry').length) {

			var winDow = $(window);
			// Needed variables
			var $container = $('.sortable-masonry .items-container');
			var $filter = $('.filter-btns');

			$container.isotope({
				filter: '*',
				masonry: {
					columnWidth: 2
				},
				animationOptions: {
					duration: 500,
					easing: 'linear'
				}
			});


			// Isotope Filter 
			$filter.find('li').on('click', function () {
				var selector = $(this).attr('data-filter');

				try {
					$container.isotope({
						filter: selector,
						animationOptions: {
							duration: 500,
							easing: 'linear',
							queue: false
						}
					});
				} catch (err) {

				}
				return false;
			});


			winDow.bind('resize', function () {
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});
			});


			var filterItemA = $('.filter-btns li');

			filterItemA.on('click', function () {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}


	//LightBox / Fancybox
	if ($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect: 'elastic',
			closeEffect: 'elastic',
			helpers: {
				media: {}
			}
		});
	}

	// tab-content
	function customTabProductPageTab() {
		if ($('.custom-tab-title').length) {
			var tabWrap = $('.tab-details-content');
			var tabClicker = $('.custom-tab-title ul li');

			tabWrap.children('div').hide();
			tabWrap.children('div').eq(0).show();
			tabClicker.on('click', function () {
				var tabName = $(this).data('tab-name');
				tabClicker.removeClass('active');
				$(this).addClass('active');
				var id = '#' + tabName;
				tabWrap.children('div').not(id).hide();
				tabWrap.children('div' + id).fadeIn('500');
				return false;
			});
		}
	}


	//three-column-carousel
	if ($('.three-column-carousel').length) {
		$('.three-column-carousel').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: ['<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>'],
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 1
				},
				600: {
					items: 1
				},
				800: {
					items: 2
				},
				1024: {
					items: 3
				}
			}
		});
	}

	//three-column-carousel
	if ($('.related-event-carousel').length) {
		$('.related-event-carousel').owlCarousel({
			loop: true,
			margin: 20,
			nav: true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: ['<span class="flaticon-back"></span>', '<span class="flaticon-right-arrow-angle"></span>'],
			responsive: {
				0: {
					items: 1
				},
				480: {
					items: 1
				},
				600: {
					items: 2
				},
				800: {
					items: 2
				},
				1024: {
					items: 3
				}
			}
		});
	}


	// single-item-carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: ['<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>'],
			responsive: {
				0: {
					items: 1
				},
				400: {
					items: 1
				},
				600: {
					items: 1
				},
				800: {
					items: 1
				},
				1200: {
					items: 1
				}
			}
		});
	}

	// brand-carousel
	if ($('.brand-carousel').length) {
		$('.brand-carousel').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: ['<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>'],
			responsive: {
				0: {
					items: 1
				},
				400: {
					items: 2
				},
				600: {
					items: 3
				},
				800: {
					items: 4
				},
				1200: {
					items: 4
				}
			}
		});
	}


	// brand-carousel
	if ($('.five-item-carousel').length) {
		$('.five-item-carousel').owlCarousel({
			loop: true,
			margin: 30,
			nav: true,
			smartSpeed: 3000,
			autoplay: 4000,
			navText: ['<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>'],
			responsive: {
				0: {
					items: 1
				},
				400: {
					items: 2
				},
				600: {
					items: 3
				},
				800: {
					items: 4
				},
				1200: {
					items: 5
				}
			}
		});
	}

	//Main Slider Carousel
	if ($('.main-slider-carousel').length) {
		$('.main-slider-carousel').owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			animateOut: 'slideOutDown',
			animateIn: 'fadeIn',
			active: true,
			smartSpeed: 1000,
			autoplay: 5000,
			navText: ['<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 1
				},
				1200: {
					items: 1
				}
			}
		});
	}


	//Search Box Toggle
	if ($('.search-toggle').length) {
		//Dropdown Button
		$('.search-toggle').on('click', function () {
			$(this).toggleClass('active');
			$(this).next('.search-box').toggleClass('now-visible');
		});
	}

	//Custom Seclect Box
	if ($('.custom-select-box').length) {
		$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	}

	//31.donate popup
	function donatepopup() {
		if ($('#donate-popup').length) {

			//Show Popup
			$('.donate-box-btn').on('click', function () {
				$('#donate-popup').addClass('popup-visible');
			});

			//Hide Popup
			$('.close-donate').on('click', function () {
				$('#donate-popup').removeClass('popup-visible');
			});
		}
	}

	//11.progressBarConfig
	function progressBarConfig() {
		var progressBar = $('.progress');
		if (progressBar.length) {
			progressBar.each(function () {
				var Self = $(this);
				Self.appear(function () {
					var progressValue = Self.data('value');

					Self.find('.progress-bar').animate({
						width: progressValue + '%'
					}, 100);

					Self.find('span.value').countTo({
						from: 0,
						to: progressValue,
						speed: 100
					});
				});
			})
		}
	}

	function priceFilter() {
		if ($('.range-slider-price').length) {

			var priceRange = document.getElementById('range-slider-price');

			noUiSlider.create(priceRange, {
				start: [120, 300],
				limit: 300,
				behaviour: 'drag',
				connect: true,
				range: {
					'min': 120,
					'max': 700
				}
			});

			var limitFieldMin = document.getElementById('min-value-rangeslider');
			var limitFieldMax = document.getElementById('max-value-rangeslider');

			priceRange.noUiSlider.on('update', function (values, handle) {
				(handle ? limitFieldMax : limitFieldMin).value = values[handle];
			});
		};
	}


	/*	=========================================================================
	When document is Scrollig, do
	========================================================================== */

	jQuery(document).on('ready', function () {
		(function ($) {
			// add your functions
			customTabProductPageTab();
			donatepopup();
			progressBarConfig();
			priceFilter();
		})(jQuery);
	});



	/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

	$(window).on('scroll', function () {
		headerStyle();
		factCounter();
		factCounter_1();
	});



	/* ==========================================================================
   When document is loaded, do
   ========================================================================== */

	$(window).on('load', function () {
		handlePreloader();
		enableMasonry();
	});



})(window.jQuery);


// Loan Form Javascript Functionality//
document.addEventListener("DOMContentLoaded", function () {
	const loanBtn = document.getElementById("get-loan-btn");
	const loanFormContainer = document.getElementById("loan-form-container");
	const arrow = loanBtn.querySelector(".arrow");
	const form = document.getElementById("loan-form");

	// Toggle form visibility
	loanBtn.addEventListener("click", function () {
		if (loanFormContainer.style.display === "none" || !loanFormContainer.style.display) {
			loanFormContainer.style.display = "block";
			arrow.style.transform = "rotate(180deg)";
		} else {
			loanFormContainer.style.display = "none";
			arrow.style.transform = "rotate(0deg)";
		}
	});

	// Handle form submission
	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the default form submission

		// Perform validation
		let isValid = true;
		const inputs = document.querySelectorAll('#loan-form input[required], #loan-form select[required]');
		inputs.forEach(function (input) {
			if (!input.value.trim()) {
				isValid = false;
				input.style.borderColor = '#db0303'; // Highlight empty fields
			} else {
				input.style.borderColor = '#ccc'; // Reset field border color
			}
		});

		if (!isValid) {
			return; // Stop the form submission if validation fails
		}

		// Submit the form using fetch
		fetch('https://formspree.io/f/meojedvj', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'first-name': document.getElementById('first-name').value,
				'surname': document.getElementById('surname').value,
				'email': document.getElementById('email').value,
				'phone': document.getElementById('phone').value,
				'qualification': document.getElementById('qualification').value
			})
		}).then(function (response) {
			if (response.ok) {
				// Show a loading indicator
				const submitButton = document.querySelector('.submit-btn');
				submitButton.textContent = 'Submitting...'; // Change button text
				submitButton.disabled = true; // Disable button to prevent multiple submissions

				// Wait for 2 seconds before redirecting
				setTimeout(function () {
					window.location.href = 'success.html'; // Redirect to the success page
				}, 2000);
			} else {
				console.error('Form submission error:', response);
			}
		}).catch(function (error) {
			console.error('Form submission error:', error);
		});
	});
});






// survey//
document.addEventListener('DOMContentLoaded', function () {
	var banner = document.querySelector('.notification-banner');
	var closeBtn = document.querySelector('.close-banner');
	var handIcon = document.querySelector('.hand-animation');

	// Function to hide the banner
	function hideBanner() {
		banner.style.display = 'none';
	}

	// Close the banner when the user clicks the close button
	closeBtn.addEventListener('click', hideBanner);

	// Simulate a hand animation to grab attention after 3 seconds
	setTimeout(function () {
		handIcon.style.transform = 'translateX(100px) translateY(-10px)';  // Hand moves towards link
	}, 3000); // Trigger after 3 seconds

	// Hide the banner after 30 seconds
	setTimeout(hideBanner, 30000); // 30 seconds
});




// Client Rating//
document.addEventListener('DOMContentLoaded', function () {
	var customRateButton = document.getElementById('customRateButton');

	// Function to show and hide the button in 10-second intervals
	function toggleButtonVisibility() {
		// Show the button
		customRateButton.classList.add('show');

		// Hide the button after 10 seconds
		setTimeout(function () {
			customRateButton.classList.remove('show');
		}, 10000); // Button stays visible for 10 seconds
	}

	// Initial delay before the button first shows (after 10 seconds)
	setTimeout(function () {
		toggleButtonVisibility(); // First popup after 10 seconds

		// Then continue showing and hiding the button every 20 seconds (10s visible, 10s hidden)
		setInterval(toggleButtonVisibility, 20000); // Repeats every 20 seconds
	}, 500); // 10000 Initial 10-second delay before the first show
});



