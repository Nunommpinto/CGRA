 function MyClock(scene, slices) {

    CGFobject.call(this,scene);
    this.slices=slices;
    this.time = 0;

    /* Textura do relogio */
 	this.clock = new CGFappearance(this.scene);
	this.clock.loadTexture("resources/images/clock.png");
	this.clock.setDiffuse(0.2,0.2,0.2,1);
	this.clock.setSpecular(0.5,0.5,0.5,1);
	this.clock.setShininess(200);

    /* Material para os ponteiros do relogio */
	this.clockHand = new CGFappearance(this.scene);
	this.clockHand.setAmbient(0.0,0.0,0.0,1);
	this.clockHand.setDiffuse(0.0,0.0,0.0,1);
	this.clockHand.setSpecular(0.0,0.0,0.0,1);
	this.clockHand.setShininess(120);

	/* Material para o ponteiro dos segundos do relogio */
	this.clockHandSeconds = new CGFappearance(this.scene);
	this.clockHandSeconds.setAmbient(0.8,0.0,0.0,1);
	this.clockHandSeconds.setDiffuse(0.8,0.0,0.0,1);
	this.clockHandSeconds.setSpecular(0.8,0.0,0.0,1);
	this.clockHandSeconds.setShininess(120);


    this.cilinder = new MyCilinder(this.scene,slices,1);
    this.circle = new MyCircle(this.scene,slices);
    this.horas = new MyClockHand(this.scene);
    this.horas.setAngle(90);
    this.minutos = new MyClockHand(this.scene);
    this.minutos.setAngle(180);
    this.segundos = new MyClockHand(this.scene);
    this.segundos.setAngle(270);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyCircle;


MyClock.prototype.update = function (currTime) {
    this.time++;
    if(this.time%10 == 0) {
        this.segundos.setAngle(this.segundos.angle + 6);
        this.minutos.setAngle(this.minutos.angle + 6/60);
        this.horas.setAngle(this.horas.angle + 6/60/60);
    }

}

MyClock.prototype.display = function () {

 	/* Cilindro */
 	this.scene.pushMatrix();
    this.scene.rotate(Math.PI,0,0,1);
    this.scene.materialDefault.apply();
    this.cilinder.display();
	this.scene.popMatrix();

    /* Circulo */
	this.scene.pushMatrix();
    this.scene.translate(0,0,1);
    this.scene.rotate(Math.PI,0,0,1);
    this.clock.apply();
    this.circle.display();
	this.scene.popMatrix();

	/* Horas */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.horas.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.4,1)
    this.clockHand.apply();
    this.horas.display();
	this.scene.popMatrix();

	/* Minutos */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.minutos.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.7,1);
    this.clockHand.apply();
    this.minutos.display();
	this.scene.popMatrix();

	/* Segundos */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.segundos.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.8,1);
    this.clockHandSeconds.apply();
    this.segundos.display();
	this.scene.popMatrix();

};