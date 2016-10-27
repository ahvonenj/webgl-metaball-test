function Metaball(ctx, x, y, r)
{
	var self = this;

	this.ctx = ctx;

	this.x = x || 10;
	this.y = y || 10;
	this.r = r || 10;
	this.ox = this.x;
	this.oy = this.y;

	this.dx = chance.integer({ min: -5, max: 5 });
	this.dy = chance.integer({ min: -5, max: 5 });
	
}

Metaball.prototype.draw = function()
{
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

	this.grd = this.ctx.createRadialGradient(this.x, this.y, this.r / 2, this.x, this.y, this.r);
	this.grd.addColorStop(0, 'black');
	this.grd.addColorStop(1, 'transparent');

	this.ctx.fillStyle = this.grd;

	this.ctx.fill();
}

Metaball.prototype.update = function(dt, t)
{
	this.x += this.dx * dt;
	this.y += this.dy * dt;
}