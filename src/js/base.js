// Filter
$(document).ready(function () {
	function accordionVisibility(blockWithItems) {
		if ($(blockWithItems).hasClass('unvisible')) {
			$(blockWithItems).removeClass("unvisible");
		} else {
			$(blockWithItems).addClass("unvisible");
		}
	}
	function filterItem(filterCategory) {
		if ($(".portfolio__container-for-item").hasClass("first-place-in-list")) {
			$(".portfolio__container-for-item").removeClass("first-place-in-list");
		}
		$(".portfolio__container-for-item.filter-" + filterCategory).addClass("first-place-in-list");
	}
	function innerTextInCaption(caption, item) {
		$(caption).html($($(item)[0]).text());
	}


	$($("#portfolio__service-select li[data-item='1']")[0]).on("click", function () {
		filterItem("logo");
		accordionVisibility('.portfolio__service-select-block-item');
		innerTextInCaption('.portfolio__service-select-caption', "#portfolio__service-select li[data-item='1'] span");
	});

	$($("#portfolio__service-select li[data-item='2']")[0]).on("click", function () {
		filterItem("banner");
		accordionVisibility('.portfolio__service-select-block-item');
		innerTextInCaption('.portfolio__service-select-caption', "#portfolio__service-select li[data-item='2'] span");
	});

	$($("#portfolio__service-select li[data-item='3']")[0]).on("click", function () {
		filterItem("sticker");
		accordionVisibility('.portfolio__service-select-block-item');
		innerTextInCaption('.portfolio__service-select-caption', "#portfolio__service-select li[data-item='3'] span");
	});


	$($("#portfolio__sphere-select li[data-item='1']")[0]).on("click", function () {
		filterItem("restaurants");
		accordionVisibility('.portfolio__sphere-select-block-item');
		innerTextInCaption('.portfolio__sphere-select-caption', "#portfolio__sphere-select li[data-item='1'] span");
	});

	$($("#portfolio__sphere-select li[data-item='2']")[0]).on("click", function () {
		filterItem("health");
		accordionVisibility('.portfolio__sphere-select-block-item');
		innerTextInCaption('.portfolio__sphere-select-caption', "#portfolio__sphere-select li[data-item='2'] span");
	});

	// Accordion
	$(".portfolio__filter-caption-container.service").on("click", function () {
		accordionVisibility('.portfolio__service-select-block-item');
	});
	$(".portfolio__filter-caption-container.sphere").on("click", function () {
		accordionVisibility('.portfolio__sphere-select-block-item');
	});

});