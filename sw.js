/*After a function has been stored in a variable, the variable can be used as a function:*/
var	cls = function()
{
		
	var	startAt	= 0;	
	var	lapTime	= 0;

	var	now	= function()
	{
		return (new Date()).getTime(); 
	}; 
        
	this.start = function()
	{
		startAt	= startAt ? startAt : now();
	};

	// Stop or pause
	this.stop = function()
	{
		// If running, update elapsed time otherwise keep it
		lapTime	= startAt ? lapTime + now() - startAt : lapTime;
		
		startAt	= 0; // Paused
	};

	// Reset
	this.reset = function() 
	{
		lapTime = startAt = 0;
	};

	// Duration
	this.time = function() 
	{
		return lapTime + (startAt ? now() - startAt : 0); 
	};
};

	/*When a JavaScript variable is declared with the keyword "new", the variable is created as an object:*/
	var x = new cls();
	var $time;
	var clocktimer;
    var split=["00:00:00:000" ,"00:00:00:000" , "00:00:00:000" , "00:00:00:000" , "00:00:00:000"];
	
	function pad(num, size)
	{
		var s = "00" + num;
		return s.substr(s.length - size);
	}

	function formatTime(time) 
	{
		var h = m = s = ms = 0;
		var newTime = '';

		h = Math.floor( time / (60 * 60 * 1000) );
	
		time = time % (60 * 60 * 1000);
		m = Math.floor( time / (60 * 1000) );
	
		time = time % (60 * 1000);
		s = Math.floor( time / 1000 );
	
		ms = time % 1000;

		newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
		return newTime;
	}

	function show() 
	{
	$time = document.getElementById('time').innerHTML = formatTime(x.time());
	lap2();
	}

	function start()
	{
	clocktimer = setInterval("show()", 1);
	x.start();
	}

	function stop() {
	x.stop();
	clearInterval(clocktimer);
	if(x.time()!=0)
	document.getElementById('start').innerHTML ="Resume";
	}
    
	function lap()
	{
		var i;
		for(i=4;i>=1;i--)
		{
			split[i]=split[i-1];
		}
		split[0]=formatTime(x.time());	
		lap2();
	}
	
	function lap1()
	{
		split[0]="00:00:00:000";
		for(i=1;i<5;i++)
		{
		split[i]=split[0];	
		}
		lap2();
	}
	
	function lap2()
	{
		document.getElementById('a').innerHTML ="1> "+split[0];
		document.getElementById('b').innerHTML ="2> "+split[1];
		document.getElementById('c').innerHTML ="3> "+split[2];
		document.getElementById('d').innerHTML ="4> "+split[3];
		document.getElementById('e').innerHTML ="5> "+split[4];
	}
	
	function reset() 
	{
	stop();
	x.reset();
	document.getElementById('start').innerHTML ="start";
	lap1();
	show();
	}
