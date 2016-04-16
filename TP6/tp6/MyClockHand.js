/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene) {

	CGFobject.call(this,scene);
	this.initBuffers();
	this.angle = 0;
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyQuad;

MyClockHand.prototype.initBuffers = function () {
	this.vertices = [
            -0.01, 0, 0,
            0.01, 0, 0,
            -0.01, 1, 0,
            0.01, 1, 0
			];

	this.indices = [
            2, 0, 1, 
			1, 3, 2
        ];   
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,1
    ]

	this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function (angle){
    this.angle = angle;
}