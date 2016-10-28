function Metaball(ctx, x, y, r)
{
	var self = this;

	this.ctx = ctx;

	this.x = x || 10;
	this.y = y || 10;
	this.r = r || 10;
	this.or = this.r;
	this.ox = this.x;
	this.oy = this.y;

	this.dx = chance.integer({ min: 1, max: 3 }) * (chance.bool() ? 1 : -1);
	this.dy = chance.integer({ min: 1, max: 3 }) * (chance.bool() ? 1 : -1);
	
	this.rot = chance.integer({ min: 1, max: 5 }) * (chance.bool() ? 1 : -1);

	this.c = tinycolor.random().toHexString();
	this.c2 = tinycolor(this.c).lighten().toHexString();

}

Metaball.prototype.draw = function()
{
	//this.ctx.globalCompositeOperation = 'color';
	//this.ctx.imageSmoothingEnabled = true;

	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);

	this.grd = this.ctx.createRadialGradient(this.x, this.y, 5, this.x, this.y, this.r);
	this.grd.addColorStop(0, this.c);
	//this.grd.addColorStop(0.5, this.c2);
	this.grd.addColorStop(1, 'transparent');

	this.ctx.fillStyle = this.grd;

	this.ctx.fill();
}

Metaball.prototype.update = function(dt, t)
{
	//this.x += this.dx * dt;
	//this.y += this.dy * dt;

	this.x = this.ox + Math.cos(t * this.rot * dt) * this.r * 2;
	this.y = this.oy + Math.sin(t * this.rot * dt) * this.r * 2;

	//this.r = Math.abs(Math.sin(t * this.rot * dt) * 50);
}