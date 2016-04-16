/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
    this.cube = new MyUnitCubeQuad(scene);
    this.cube.initBuffers();
	CGFobject.call(this,scene);

	 /* Material para o tampo das mesas */
    this.scene.tabletop = new CGFappearance(this.scene);
    this.scene.tabletop.loadTexture("resources/images/table.png");
	this.scene.tabletop.setAmbient(0.33,0.162,0.045,1);
	this.scene.tabletop.setDiffuse(0.66,0.33,0.09,1);
	this.scene.tabletop.setSpecular(0.055,0.027,0.0075,1);
	this.scene.tabletop.setShininess(120);

    /* Material para as pernas das mesas */
	this.scene.tablelegs = new CGFappearance(this.scene);
	this.scene.tablelegs.setAmbient(0.3,0.3,0.3,1);
	this.scene.tablelegs.setDiffuse(0.4,0.4,0.4,1);
	this.scene.tablelegs.setSpecular(0.8,0.8,0.8,1);
	this.scene.tablelegs.setShininess(120);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
 

    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0,3.61,0);
    this.scene.scale(5,0.3,3);
    this.scene.tabletop.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto sudeste

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.71,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.tablelegs.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto sudoeste

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.tablelegs.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto noroeste

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.tablelegs.apply();
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto nordeste

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.scene.tablelegs.apply();
    this.cube.display();
    this.scene.popMatrix();

};
