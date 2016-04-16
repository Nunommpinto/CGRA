/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene,x,y,z,angulo) {
	CGFobject.call(this,scene);

	this.angulo = angulo;
	this.time=0;
	this.robotState = 0;
	this.jumpSpeed = 0.4;
	
	this.armLength=1.5;
	this.armWidth=0.4;
	
	this.body = new MyCilinder(this.scene,20,20);
	this.circle = new MyCircle(this.scene,20);
	this.wheelL = new MyWheel(this.scene);
	this.wheelR = new MyWheel(this.scene);
	this.head = new MyLamp(this.scene,20,20);
	this.armR = new MyArm(this.scene,this.armLength,this.armWidth);
	this.armL = new MyArm(this.scene,this.armLength,this.armWidth);

	this.rotation=0;
	this.position=[x,z,y];
	this.speed=this.scene.speed;

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

	/* R2-D2 */

	/* Textura do corpo */
 	this.r2d2Body = new CGFappearance(this.scene);
	this.r2d2Body.loadTexture("resources/images/r2d2-body.jpg");
	this.r2d2Body.setDiffuse(0.5,0.5,0.5,1);
	this.r2d2Body.setSpecular(0.5,0.5,0.5,1);
	this.r2d2Body.setShininess(500);

	/* Textura da cabeca */
 	this.r2d2Head = new CGFappearance(this.scene);
	this.r2d2Head.loadTexture("resources/images/r2d2-head2.png");
	this.r2d2Head.setDiffuse(0.5,0.5,0.5,1);
	this.r2d2Head.setSpecular(0.5,0.5,0.5,1);
	this.r2d2Head.setShininess(500);

	/* Woody */

	/* Cabeca */

	this.woody = new CGFappearance(this.scene);
	this.woody.loadTexture("resources/images/table.png");
	this.woody.setDiffuse(0.5,0.5,0.5,1);
	this.woody.setSpecular(0.5,0.5,0.5,1);
	this.woody.setShininess(500);

	this.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2,
			];

	this.indices = [
            0, 1, 2,
        ];    
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyRobot.prototype.moveRobot = function (direction){
	if(this.robotState == 0){
		switch(direction){
			case 0:
				console.log(this.scene.speed);
				this.x+= (1 + this.scene.speed / 10) * (Math.sin(this.angulo));
				this.z+= (1 + this.scene.speed / 10) * (Math.cos(this.angulo));
				if (this.scene.speed<0){
					this.speed+=0.03-(Math.abs(this.scene.speed)/200);
				}
				else this.speed+=0.02+(this.scene.speed/20);
				break;
			case 1:
				console.log(this.scene.speed);
				this.x+= -(1 + this.scene.speed / 10) * (Math.sin(this.angulo));
				this.z+= -(1 + this.scene.speed / 10) * (Math.cos(this.angulo));
				if (this.scene.speed<0){
					this.speed-=0.03-(Math.abs(this.scene.speed)/200);
				}
				else this.speed-=0.02+(this.scene.speed/20);
				break;
			case 2:
				this.rotation+=Math.PI/10;
				break;
			case 3:
				this.rotation-=Math.PI/10;
				break;
		}
	}
}

MyRobot.prototype.update = function (currTime) {
    this.time++;
    if(this.robotState == 1){
    	this.position[2]+=this.jumpSpeed;
    	this.jumpSpeed-=0.05;
    	if (this.position[2] <= 0.1){
    		this.robotState = 0;
    		this.jumpSpeed = 0.4;
    	}
    }
}

MyRobot.prototype.jump = function () {
	if(this.robotState == 0)
		this.robotState = 1;
}

MyRobot.prototype.display = function () {

	this.scene.pushMatrix();
		this.position[0] += (this.speed)*Math.sin(this.rotation);
		this.position[1] += (this.speed)*Math.cos(this.rotation);
		this.speed *= 0.95; //credits for Joao Costa and Joao Almeida
		
		this.scene.translate(this.position[0],this.position[2],this.position[1]);
		this.scene.rotate(this.rotation,0,1,0);
		
		this.wheelL.addRotation(this.speed/2);
		this.wheelR.addRotation(-this.speed/2);
		
		this.armR.addRot(this.speed/2);
		this.armL.addRot(this.speed/2);
		
	
	/* Corpo */
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(1,1,4);
		if(this.scene.currRobotAppearance == 'R2D2'|| this.scene.currRobotAppearance == 0)
			this.r2d2Body.apply();
		else if(this.scene.currRobotAppearance == 'Woody')
			this.woody.apply();
		this.body.display();
	this.scene.popMatrix();

	/* Topo do corpo (circulo) */
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();

	/* Roda Direita */
	
	this.scene.pushMatrix();
    this.scene.translate(-1, 0.75, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.wheelR.display();
	this.scene.popMatrix();

	/* Roda Esquerda */
	
	this.scene.pushMatrix();
    this.scene.translate(1, 0.75, 0);
    this.wheelL.display();
	this.scene.popMatrix();

	/* Cabeca */

	this.scene.pushMatrix();
		this.scene.translate(0,4,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		if(this.scene.currRobotAppearance == 'R2D2' || this.scene.currRobotAppearance == 0)
			this.r2d2Head.apply();
		else if(this.scene.currRobotAppearance == 'Woody')
			this.woody.apply();
		this.head.display();
	this.scene.popMatrix();

	/* Braco Direito */
	
	this.scene.pushMatrix();
    this.scene.translate(-0.9, 2.8, 0);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
    this.armR.display();

    this.scene.popMatrix();

	/* Braco Esquerdo */

	this.scene.pushMatrix();
		this.scene.translate(0.9,2.8,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.armL.display();
	this.scene.popMatrix();
};

MyRobot.prototype.rightRot = function ()
{
    this.rotation -= 2;
    this.wheelL.addRotation(0.06);
    this.wheelR.addRotation(-0.06);
};

MyRobot.prototype.leftRot = function ()
{
    this.rotation += 2;
    this.wheelL.addRotation(-0.06);
    this.wheelR.addRotation(0.06);
};

MyRobot.prototype.waveO = function()
{
    this.armR.waveO();
};
