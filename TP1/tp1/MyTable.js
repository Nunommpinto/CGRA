/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
    this.cube = new MyUnitCubeQuad(scene);
    this.cube.initBuffers();
	CGFobject.call(this,scene);

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {

    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0,3.61,0);
    this.scene.scale(5,0.3,3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto sudeste

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.71,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto sudoeste

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto noroeste

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Perna do canto nordeste

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.70,-1.35);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

};
