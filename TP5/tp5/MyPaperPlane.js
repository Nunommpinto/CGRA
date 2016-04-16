 function MyPaperPlane(scene,x,y,z) {
    CGFobject.call(this,scene);
    this.initBuffers();

    this.x = x;
    this.y = y;
    this.z = z;

    this.deltaX = 0.25;
    this.deltaY = 0.05;
    this.deltaZ = 0;
    this.angulo = -Math.PI/15;

    this.movementState = 0;
    this.time = 0;
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;



MyPaperPlane.prototype.initBuffers = function() {
    this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

 	/* Nota: O design do aviao foi inicialmente projetado pelo aluno Miguel Botelho */

	// TRIANGULO DA ESQUERDA
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(2, 1, 0);

 	// TRIANGULO DA DIREITA

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(3, 4, 5);

	// 1 TRIANGULO DE BAIXO

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(6, 7, 8);

 	// 2 TRIANGULO DE BAIXO

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(11, 10, 9);

 	// 2 TRIANGULO DA ESQUERDA
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(12, 13, 14);

 	// 2 TRIANGULO DA DIREITA

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(17, 16, 15);


	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
}

MyPaperPlane.prototype.update = function (currTime) {
    this.time++;

    if(this.movementState >= 0)
     if(this.time%1 == 0){
         this.x -= this.deltaX;
         this.y += this.deltaY; 
         this.z += this.deltaZ;
     }
    if(this.movementState == 0){  
       if(this.x <= 0.3){
        this.movementState = 1;
        this.deltaX = 0;
        this.deltaY = -0.25;
        this.deltaZ = 0;
        this.angulo = Math.PI/2;
       }
    }
    if(this.movementState == 1){  
       if(this.y <= 0.3){
        this.movementState = -1;
        this.deltaX = 0;
        this.deltaY = 0;
        this.deltaZ = 0;
        this.angulo = Math.PI;
       }
    }
}

MyPaperPlane.prototype.display = function () {
    this.scene.pushMatrix();
 	this.scene.translate(this.x,this.y,this.z);
	this.scene.rotate(this.angulo,0,0,1);
	this.drawElements(this.primitiveType);
	this.scene.popMatrix();
};