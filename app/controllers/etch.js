window.EtchController = {

    index: function () {
    
        steroids.view.navigationBar.show("Etch");
    
    },
        
    etch: function () {
    
        steroids.view.navigationBar.show("");
        
        var clearButton = new steroids.buttons.NavigationBarButton();
        clearButton.title = "Clear";
        
        steroids.view.navigationBar.setButtons({
            right: [clearButton]
        });
        
        // link the new button with newCanvas() function
        clearButton.onTap = function() {
            startEtch();
        };
        
        var ctx, color = "#000";
        
        // Wait for device API libraries to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);
        
        // device APIs are available
        //
        function onDeviceReady() {
        
            // reset palette selection (css) and select the clicked color for canvas strokeStyle
            $(".palette").click(function(){
                $(".palette").css("border-color", "#777");
                $(".palette").css("border-style", "solid");
                $(this).css("border-color", "#fff");
                $(this).css("border-style", "dashed");
                color = $(this).css("background-color");
                ctx.beginPath();
                ctx.strokeStyle = color;
            });
        
            startEtch();
        }
        
        // function to setup a new canvas for drawing
        function startEtch() {
        
            //define and resize canvas
            $("#content").height($(window).height()-90);
            var canvas = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
            $("#content").html(canvas);
            
            // setup canvas
            ctx=document.getElementById("canvas").getContext("2d");
            ctx.strokeStyle = color;
            ctx.lineWidth = 5;	
            
            // setup to trigger drawing on mouse or touch
            $("#canvas").drawTouch();
            $("#canvas").drawPointer();
            $("#canvas").drawMouse();
        }
            
        // prototype to	start drawing on touch using canvas moveTo and lineTo
        $.fn.drawTouch = function() {
        	var start = function(e) {
                e = e.originalEvent;
        		ctx.beginPath();
        		x = e.changedTouches[0].pageX;
        		y = e.changedTouches[0].pageY-44;
        		ctx.moveTo(x,y);
        	};
        	var move = function(e) {
        		e.preventDefault();
                e = e.originalEvent;
        		x = e.changedTouches[0].pageX;
        		y = e.changedTouches[0].pageY-44;
        		ctx.lineTo(x,y);
        		ctx.stroke();
        	};
        	$(this).on("touchstart", start);
        	$(this).on("touchmove", move);	
        }; 
            
        // prototype to	start drawing on pointer(microsoft ie) using canvas moveTo and lineTo
        $.fn.drawPointer = function() {
        	var start = function(e) {
                e = e.originalEvent;
        		ctx.beginPath();
        		x = e.pageX;
        		y = e.pageY-44;
        		ctx.moveTo(x,y);
        	};
        	var move = function(e) {
        		e.preventDefault();
                e = e.originalEvent;
        		x = e.pageX;
        		y = e.pageY-44;
        		ctx.lineTo(x,y);
        		ctx.stroke();
            };
        	$(this).on("MSPointerDown", start);
        	$(this).on("MSPointerMove", move);
        };        
        
        // prototype to	start drawing on mouse using canvas moveTo and lineTo
        $.fn.drawMouse = function() {
        	var clicked = 0;
        	var start = function(e) {
        		clicked = 1;
        		ctx.beginPath();
        		x = e.pageX;
        		y = e.pageY-44;
        		ctx.moveTo(x,y);
        	};
        	var move = function(e) {
        		if(clicked){
        			x = e.pageX;
        			y = e.pageY-44;
        			ctx.lineTo(x,y);
        			ctx.stroke();
        		}
        	};
        	var stop = function(e) {
        		clicked = 0;
        	};
        	$(this).on("mousedown", start);
        	$(this).on("mousemove", move);
        	$(window).on("mouseup", stop);
        };
        
    }
    
};




document.addEventListener("DOMContentLoaded", function() {

    $(".opensLayer").hammer().on("tap", function() {
        // Create a new WebView that...
        webView = new steroids.views.WebView({ location: this.getAttribute("data-location") });
   
        // ...is pushed to the navigation stack, opening on top of the current WebView.
        steroids.layers.push({ view: webView });
     });

});