/**
 * MyWheel
 * @constructor
 */
function MyWheel(scene){
	  CGFobject.call(this,scene);

    this.wheels = new MyCilinder(this.scene,20,20);
	this.circle = new MyCircle(this.scene,20);

    this.rotation = 0;

    /* Textura das jantes */
 	this.rims = new CGFappearance(this.scene);
	this.rims.loadTexture("resources/images/rim.jpg");
	this.rims.setDiffuse(0.2,0.2,0.2,1);
	this.rims.setSpecular(0.5,0.5,0.5,1);
	this.rims.setShininess(500);

	/* Textura das rodas */
 	this.wheel = new CGFappearance(this.scene);
	this.wheel.loadTexture("resources/images/wheel.png");
	this.wheel.setDiffuse(0.2,0.2,0.2,1);
	this.wheel.setSpecular(0.5,0.5,0.5,1);
	this.wheel.setShininess(500);

};

MyWheel.prototype = Object.create(CGFobject.prototype);
MyWheel.prototype.constructor = MyWheel;

MyWheel.prototype.display = function()
{
    this.scene.pushMatrix();
	this.scene.translate(0, 0, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
	this.scene.scale(0.8,0.8,0.5);
	this.scene.rotate(this.rotation,0,0,1);
	this.wheel.apply();
    this.wheels.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI/2, 0, 1,0);
		this.scene.scale(0.8,0.8,0.5);
		this.scene.rotate(this.rotation,0,0,1);
		this.rims.apply();
		this.circle.display();
	this.scene.popMatrix();
	return;
};

MyWheel.prototype.addRotation = function(value)
{
    this.rotation += value;
    if (this.rotation >= 2*Math.PI) this.rotation -= 2*Math.PI;
    else if (this.rotation <= 0) this.rotation += 2*Math.PI;
};