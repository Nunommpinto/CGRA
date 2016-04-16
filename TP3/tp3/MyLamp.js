/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyCilinder;

 MyLamp.prototype.initBuffers = function() {
	
 	var angulo = 2*Math.PI/this.slices;
 	var tetaDelta = Math.PI / this.stacks;
 	var fiDelta = 2*Math.PI / this.slices;
 	var raio = (Math.PI/2)/this.stacks;


	this.vertices=[];
 	this.normals=[];

 	for(i = 0; i < this.stacks+1;i++){
 		for(j = 0; j < this.slices;j++){
 			/* As normais passam a ser iguais as coordenadas dos pontos */
 			this.vertices.push(Math.cos(i*raio)*Math.cos(j*angulo), Math.sin(i*raio)*Math.sin(j*angulo), raio * i/this.stacks);
 			this.normals.push(Math.cos(j*fiDelta),Math.sin(j*fiDelta),0);
 		}
 	}

 	this.indices=[/*0,1,this.slices+1,0,this.slices+1,this.slices*/];

	for(i=0; i < this.stacks;i++){
		for(j=0; j < this.slices;j++){
			this.indices.push(i*this.slices+j,i*this.slices+((j+1)%this.slices),(i+1)*this.slices+(j+1)%this.slices);
			this.indices.push(i*this.slices+j,(i+1)*this.slices+((j+1)%this.slices),(i+1)*this.slices+j);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
