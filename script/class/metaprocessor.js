function Metaprocessor(program)
{
	var self = this;

	this.program = program || null;

	this.l = false;

	if(findGetParameter('debug'))
	{
		this.d = true;
	}
	else
	{
		this.d = false;
	}
}

Metaprocessor.prototype.process = function()
{
	var metaballs = this.program.metaballs;
	var globaldata = this.program.ctx.getImageData(0, 0, Global.width, Global.height);

	for(var i = 3; i < globaldata.data.length; i += 4)
	{
		if(globaldata.data[i] <= 255 && globaldata.data[i] >= Global.metaball.merge_treshold)
		{
			if(this.d)
			{
				globaldata.data[i] = 255;
				globaldata.data[i-3] = 255;
			}
			else
			{
				globaldata.data[i] = 180;
			}
		} 
		else if(globaldata.data[i] < Global.metaball.merge_treshold)
		{
			globaldata.data[i] = 0;
		}
	}


	/*for(var i = 2; i < metaballs.length; i++)
	{
		var metaball = metaballs[i];

		var bx = metaball.x - metaball.r;
		var by = metaball.y - metaball.r;

		var data = this.program.ctx.getImageData(
			metaball.x - metaball.r, 
			metaball.y - metaball.r, 
			metaball.x + metaball.r,
			metaball.y + metaball.r
		);

		for(var i = 0; i < data.data.length; i ++)
		{
			//if(data.data[i] < 255 && data.data[i] > 150)
			//{
				globaldata.data[(bx * by + i) * 4] = 255;
			//} 
		}

		
	}*/

	if(!this.l)
	{
		console.log(globaldata.data)
		this.l =true;
	}
	

	this.program.ctx.putImageData(globaldata, 0, 0);

	//[0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a]
	
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}