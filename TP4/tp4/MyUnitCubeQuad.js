/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
    this.quad = new MyQuad(scene);
    this.quad.initBuffers();
	CGFobject.call(this,scene);

};



MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {

    /* Faces paralelas a XY */
    /* Front face */
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

    /* Bottom face */
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,1,0,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

    /* Back face */
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI,1,0,0);
     this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

     /* Upper face */
    this.scene.pushMatrix();
    this.scene.rotate(3*Math.PI/2,1,0,0);
     this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

    /* Right Face */
    this.scene.pushMatrix();
    this.scene.rotate(Math.PI/2,0,1,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

     /* Left Face */
    this.scene.pushMatrix();
    this.scene.rotate(3*Math.PI/2,0,1,0);
    this.scene.translate(0,0,0.5);
    this.quad.display();
    this.scene.popMatrix();

};
