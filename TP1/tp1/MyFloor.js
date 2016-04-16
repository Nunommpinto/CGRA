/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
    this.cube = new MyUnitCubeQuad(scene);
    this.cube.initBuffers();
	CGFobject.call(this,scene);

};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor=MyFloor;

MyFloor.prototype.display = function () {

    //Chao
    this.scene.pushMatrix();
    this.scene.scale(8,0.1,6);
    this.cube.display();
    this.scene.popMatrix();

};
