function showNav() {
	$('.sidenav-overlay').on('click', function() {
        $(this).hide();
        $('.dashboard-section__leftNav').removeClass('active');
    });

    $('.mobile-nav').on('click', function() {
        $('.sidenav-overlay').show();
        $('.dashboard-section__leftNav').addClass('active');
    });
}

function search() {
	$('.headeNav__search img').on('click', function() {
		$('.search-overlay').show();
		if( $(window).width() > 767) {
			$('.headeNav__search input').css({'width': '20rem', 'opacity': '1',});
		} else {
			$('.headeNav__search input').css({'width': 'calc(100vw - 30px)', 'opacity': '1',});
		}
		
	});

	$('.search-overlay').on('click', function() {
        $(this).hide();
        $('.headeNav__search input').css({'width': '0rem', 'opacity': '0'});
    });
}

function select() {
	$('.selectpicker').selectpicker();
}

function datePicker() {
	if($('.datetimepicker').length > 0){
		$('.datetimepicker').datetimepicker({
	        format: 'DD/MM/YY'
	   	});
	}
}

function datetableResponsive() {
	var table = $('.searchDetail_table').DataTable( {
		responsive: true,
		"autoWidth": false
    });
}

function openDataTable() {
	var panelHeading = $('#accordion .panel-heading');
	panelHeading.on('click', function() {
		var table = $('.table').DataTable( {
			responsive: true,
			"autoWidth": false
	    });
	});
}

function popup() {
	$('.popup-btn').on('click', function() {
		$(".custom-model").addClass('in');
	})
}

function editShow() {
	$('.modify-icon').on('click', function() {
		$(this).siblings('.modify-block').fadeIn();
	});
}

function editHide() {
	$('.modify-block__close').on('click', function() {
		$(this).parents('.modify-block').fadeOut();
	});
}

// Equal Height Function
function equalHeights(classname) {
	var findClass = document.querySelectorAll(classname);
	var maxHeight = 0;

	for(var i=0; i<findClass.length; i++) {
		var element = findClass[i];
		var elementHeight = element.offsetHeight;
		maxHeight = (elementHeight > maxHeight ? elementHeight : maxHeight);
	}
	
	for(var i=0; i<findClass.length; i++) {
		findClass[i].style.height = maxHeight + "px";
	}
}

function toolTip() {
	$('[data-toggle="tooltip"]').tooltip()
}

function graph() {
	if( $('#myChart').length > 0) {
		var ctx = document.getElementById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
		    type: 'bar',
		    data: {
		        labels: ["Jan", "Feb", "March", "April"],
		        datasets: [{
		            label: false,
		            data: [65, 15, 10, 50],
		            backgroundColor: [
		                '#fb9107',
		                '#92d050',
		                '#ff3300',
		                '#0ab3c8'
		            ]
		        }]
		    },
		    options: {
		        scales: {
		            yAxes: [{
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
	}
}

function circleChart() {
	if( $('#circleChart').length == 1) {
		var gaugeChart = AmCharts.makeChart("circleChart", {
			"type": "gauge",
			"theme": "none",
			"axes": [{
				"axisAlpha": 0,
				"tickAlpha": 0,
				"labelsEnabled": false,
				"startValue": 0,
				"endValue": 100,
				"startAngle": 0,
				"endAngle": 270,
				"bands": [{
					"color": "#5b9bd5",
					"startValue": 75,
					"endValue": 190,
					"radius": "100%",
					"innerRadius": "90%",
					"balloonText": "90%"
				},{
					"color": "#92d050",
					"startValue": 75,
					"endValue": 175,
					"radius": "80%",
					"innerRadius": "70%",
					"balloonText": "85%"
				},{
					"color": "#e4007d",
					"startValue": 75,
					"endValue": 130,
					"radius": "60%",
					"innerRadius": "50%",
					"balloonText": "75%"
				}]
			}],
			// "allLabels": [{
			// 	"text": "Shift 1",
			// 	"x": "45%",
			// 	"y": "2%",
			// 	"size": 14,
			// 	"color": "#f6bb43",
			// 	"align": "right"
			// }, {
			// 	"text": "Shift 2",
			// 	"x": "45%",
			// 	"y": "12%",
			// 	"size": 14,
			// 	"color": "#e8573e",
			// 	"align": "right"
			// }, {
			// 	"text": "Shift 3",
			// 	"x": "45%",
			// 	"y": "22%",
			// 	"size": 14,
			// 	"color": "#40bf9f",
			// 	"align": "right"
			// }],
		});
	}
}

function tempHouresChart() {
	if($('#chartContainer').length > 0) {
		var chart = new CanvasJS.Chart("chartContainer", {
		    theme: "light2", // "light1", "light2", "dark1", "dark2"
		    animationEnabled: true,
		    
		    axisX: {
		        interval: 1,
		        intervalType: "month",
		        valueFormatString: "MMM"
		    },
		    axisY:{
		        title: "Temp (in hours)",
		        valueFormatString: "#0"
		    },
		    data: [{        
		        type: "line",
		        markerSize: 12,
		        xValueFormatString: "MMM, YYYY",
		        yValueFormatString: "###.#",
		        dataPoints: [        
		            { x: new Date(2016, 00, 1), y: 11},
		            { x: new Date(2016, 01, 1), y: 71},
		        ]
		    }]
		});
		chart.render();
	}
}

function myTemps() {
	if($('#demo-pie-1').length > 0) {
		$('#demo-pie-1').pieChart({
	        barColor: '#e4007d',
	        trackColor: '#f8f8f8',
	        lineCap: 'butt',
	        lineWidth: 10,
	        onStep: function (from, to, percent) {
	            $(this.element).find('.pie-value').text(Math.round(percent) + '%');
	        }
	    });
	}
    if($('#demo-pie-2').length > 0) {
		$('#demo-pie-2').pieChart({
	        barColor: '#92d050',
	        trackColor: '#f8f8f8',
	        lineCap: 'butt',
	        lineWidth: 10,
	        onStep: function (from, to, percent) {
	            $(this.element).find('.pie-value').text(Math.round(percent) + '%');
	        }
	    });
	}    
}

function reorderWidget() {
	$('.modify-block__edit-block--edit').on('click', function() {
		$(this).parents('.dashboard-section__right-part').addClass('sortable ui-sortable');
		$(this).parents('.modify-block').fadeOut();
		$( ".sortable" ).sortable({
			revert: true
		});
		$( ".col-md-6" ).disableSelection();
	});
}

function deleteWidget() {
	$('.modify-block__edit-block--delete').on('click', function() {
		$(this).parents('.col-sm-12').fadeOut();
	});
}

function timeEdit() {
	$('.time-blockEdit').on('click', function() {
		$(this).parents('fieldset').removeAttr('disabled');
		$(this).siblings('input:first').focus();
	});
}

$(document).ready(function() {
	showNav();
	search();
	datePicker();
	datetableResponsive();
	popup();
	editShow();
	editHide();
	toolTip();
	openDataTable();
	graph();
	circleChart();
	tempHouresChart();
	myTemps();
	reorderWidget();
	deleteWidget();
	timeEdit();


	if( $(window).width() > 991 ) {
		equalHeights('.dashboard-section__right-part--singleElement');
	}
});

// Call function on RESIZE
window.onresize = function() {
	var findClass = document.querySelectorAll('.dashboard-section__right-part--singleElement');
	for(var i=0; i<findClass.length; i++) {
		findClass[i].style.height = "auto";
	}
	equalHeights();
}