/**
 * MyArm
 * @constructor
 */
function MyArm(scene, armLength, armWidth){
	  CGFobject.call(this,scene);

    this.armLength = armLength || 0.4;
    this.armWidth = armWidth || 0.1;

    this.arm = new MyCilinder(this.scene,20,20);
	this.circle = new MyCircle(this.scene,20);

    this.rotation = 0;
    this.rotForward = true;

    this.speedO = 0.05;
    this.rotationO = 0;
    this.waving = false;
    this.direccionO = 1;
    this.countO = 0;

};

MyArm.prototype = Object.create(CGFobject.prototype);
MyArm.prototype.constructor = MyArm;

MyArm.prototype.display = function()
{
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
	this.scene.scale(0.5,1,0.5);
	this.scene.translate(0,this.armLength/2,0);
	if(this.waving){ //credits for Joao Costa and Joao Almeida
		this.wave();
		this.scene.rotate(this.rotationO,0,0,-1);
	}
	else this.scene.rotate(this.rotation, 0, 0, 1);
	this.scene.translate(0,-this.armLength/2,0);
    this.arm.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0, 0, -this.armWidth);
		this.scene.rotate(-Math.PI, 0, 1,0);
		this.scene.scale(0.5,1,0.5);
		this.scene.translate(0,this.armLength/2,0);
		if(this.waving){ //credits for Joao Costa and Joao Almeida
		this.wave();
		this.scene.rotate(this.rotationO,0,0,-1);
		}
		else this.scene.rotate(this.rotation, 0, 0, 1);
		this.scene.translate(0,-this.armLength/2,0);
		this.circle.display();
	this.scene.popMatrix();
	return;
};

MyArm.prototype.addRot = function(value)
{
    if (Math.abs(value) <= 0.001)
    {
        this.rotation += (0-this.rotation)/20;
        return;
    }

    value = Math.abs(value);

    if (this.rotForward)
    {
        this.rotation += value;
        if (this.rotation >= Math.PI/4)
        {
            this.rotation = Math.PI/4;
            this.rotForward = false;
        }
    }
    else
    {
        this.rotation -= value;
        if (this.rotation <= -Math.PI/4)
        {
            this.rotation = -Math.PI/4;
            this.rotForward = true;
        }
    }
};

MyArm.prototype.waveO = function()
{
    if (!this.waving)
    {
        this.rotationO = this.rotation;
        this.waving = true;
        this.countO = 0;
        this.direccionO = 0;
    }
};

MyArm.prototype.wave = function()
{
    if (this.countO < 3)
    {
        this.waving = true;
        if (this.direccionO == 0)
        {
            this.rotationO -= this.speedO;
            if (this.rotationO <= -Math.PI-Math.PI/6)
                this.direccionO = 1;
        }
        else if (this.direccionO == 1)
        {
            this.rotationO += this.speedO;
            if (this.rotationO >= -Math.PI+Math.PI/6){
                this.direccionO = 0;
                ++this.countO;
            }
        }
    }
    else
    {
        if (Math.abs(this.rotationO - this.rotation) > 0.1)
        {
            this.rotationO += this.speedO;
            return;
        }
        this.countO = 0;
        this.waving = false;
    }
};