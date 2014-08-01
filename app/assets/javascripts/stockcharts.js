var realTimeInterval = null;

function realTime(ticker){
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Create the chart
    $('#stockchart').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            events: {
                load: function () {
                    var series = this.series[0];

                    function getCurrentPrice() {
                        $.ajax({
                            url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%3D%22AAPL%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=',
                            dataType: "json",
                            success: function (data) {
                                // get the time from the JSON response
                                var dateString = data.query.created; // 2014-07-25T16:00:00Z"
                                var date = new Date(dateString);
                                date.setHours(date.getHours() + 4);
                                var x = date.getTime();
                                // get the stock price from the JSON response
                                var y = data.query.results.quote.AskRealtime;
                                series.addPoint([x, parseFloat(y)], true, true);
                            },
                            error: function () {
                                alert('error');
                            }
                        });
                    }

                    // set up the updating of the chart each second
                    series = this.series[0];
                    realTimeInterval = setInterval(getCurrentPrice, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title: {
            text: 'Real Time Stock Data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        exporting: {
            enabled: false
        },

        series: [{
            name: 'Google Data',
            data: [
                [1, 1],
                [2, 2],
                [3, 1],
                [4, 2]
            ]
        }]
    });
};

function historical(ticker){
  Highcharts.setOptions({

    global : {
      useUTC : false

    }
  });
  
  var lastTime = null;

  // google finance API for retrieving past week of closing prices
  $.ajax({
      url: "historical/GOOG.json",
      success: function (csvData) {

      // start with lastTime being the latest x coordinate
          var chart;
            $('#stockchart').highcharts({
                chart: {
                    type: 'spline',
                    turboThreshold: 0,
                    animation: Highcharts.svg, // don't animate in old IE
                    marginRight: 10,
                    events: {
                      load : function() {

                        // set up the updating of the chart each second
                      }
                    }
                },
                title: {
                    text: ticker+' Historical Stock Price'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 150
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    formatter: function() {
                            return '<b>'+ this.series.name +'</b><br/>'+
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                            Highcharts.numberFormat(this.y, 2);
                    }
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                series: [{
                    name: 'Historical Stock Price For GOOG',
                    data: csvData
                }],

            });
        }
    });
};

function fillChart(){ 
  var tick = $('.user-heading h2').html();
  var date = new Date();
  var stringTime = date.getHours().toString() + '.' + date.getMinutes().toString();
  var time = parseFloat(stringTime);
  var day = date.getDay();
  if(time > 9.3 && time < 16 && day != 6 && day != 7 ){
    var tick = $('.user-heading h2').html();
    realTime(tick)
    setTimeout(function() { $('text').last().html(""); }, 400);
  }else{
    historical(tick);
    setTimeout(function() { $('text').last().html(""); }, 400);
    $('.stat-btn').not(this).toggleClass('active');
  };
  
};

$(document).on('page:change', function() {
  fillChart();

  $('.stat-btn').click(function() {
    $('.stat-btn').not(this).removeClass('active');
    $(this).addClass('active');
    var tick = $('.user-heading h2').html();

    // if there is an active interval to get prices, clear it as we are changing the chart
    if (realTimeInterval !== null) {
        clearInterval(realTimeInterval);
        realTimeInterval = null;
    }

    if($(this).find( "i" ).attr("class").split(' ')[1] === 'fa-clock-o'){
      historical(tick);
    }else{
      realTime(tick);
    }
  });
});
