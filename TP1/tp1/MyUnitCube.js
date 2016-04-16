/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, -0.5, -0.5,
            0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5
			];

	this.indices = [
			//Face de baixo
            6, 4, 2, 
			4, 0, 2,

			//Face de cima
			3, 5, 7, 
			3, 1, 5,

			//Face da frente
			4, 1, 0,
			4, 5, 1,

			//Face de tras
			2, 3, 7,
			7, 6, 2,

			//Face da direita
			2, 1, 3,
			2, 0, 1,

			//Face da esquerda
			4, 7, 5,
			4, 6 ,7  
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
