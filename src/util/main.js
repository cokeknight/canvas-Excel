require.config({　　　　
	  
　　　　 paths: {　　　　　　
			"jquery": "../js/lib/jquery",
            "underscore":"lib/underscore",
    		"base":"utils/base",
    		"template":"utils/template",
    		"chart": "utils/chart",
    		"highcharts": "lib/highchart/highcharts",
    		"Url":"utils/url"　
        },
        shim: {
            "highcharts": {
                "exports": "Highcharts",
                "deps": [ "jquery"]
            }
        }
});