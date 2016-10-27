function Program()
{
	var self = this;

	this.canvas = document.getElementById('canvas');

	Global.width = this.canvas.offsetWidth;
	Global.height = this.canvas.offsetHeight;

	this.canvas.setAttribute('width', Global.width);
	this.canvas.setAttribute('height', Global.height);

	this.ctx = this.canvas.getContext('2d');

	this.metaprocessor = new Metaprocessor(this);


	this.metaballs = [];


	/*this.ivl = setInterval(function()
	{
		var r = chance.integer({ min: 45, max: 80 });

		self.metaballs.push(new Metaball
		(
			self.ctx, 
			chance.integer({ min: r, max: Global.width - r }), 
			chance.integer({ min: r, max: Global.height - r }), 
			r
		));

	}, 500);*/

	for(var i = 0; i < 35; i++)
	{
		var r = chance.integer({ min: 45, max: 100 });

		self.metaballs.push(new Metaball
		(
			self.ctx, 
			chance.integer({ min: r, max: Global.width - r }), 
			chance.integer({ min: r, max: Global.height - r }), 
			r
		));
	}

	requestAnimationFrame(function(t) { self.animate(self); });
}

Program.prototype.animate = function(program)
{
	Time.now = JSUtil.timestamp();
	Time.ft = Time.now - Time.last;

	if(Time.ft > 0.25)
		Time.ft = 0.25;

	Time.last = Time.now; 
	Time.acc += Time.ft;

	while(Time.acc >= Time.dt) 
	{
		program.update(Time.dt, Time.time);

		Time.time += Time.dt;
		Time.acc -= Time.dt;
	}

	program.render();

	requestAnimationFrame(function(t) { program.animate(program); });
}

Program.prototype.update = function(dt, t)
{
	for(var i = 0; i < this.metaballs.length; i++)
	{
		this.metaballs[i].update(dt, t);
	}
}

Program.prototype.render = function()
{
	

	this.ctx.clearRect(0, 0, Global.width, Global.height);

	for(var i = 0; i < this.metaballs.length; i++)
	{
		this.metaballs[i].draw();
	}

	this.metaprocessor.process();
}