/**
 * MyCilinder
 * @constructor
 */
 function MyCilinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function() {
	
 	var angulo = 2*Math.PI/this.slices;
 	

	this.vertices=[];
 	this.normals=[];

 	for(i = 0; i < this.stacks+1;i++){
 		for(j = 0; j < this.slices;j++){
 			/* As normais passam a ser iguais as coordenadas dos pontos */
 			this.vertices.push(Math.cos(j*angulo),Math.sin(j*angulo),i/this.stacks);
 			this.normals.push(Math.cos(j*angulo),Math.sin(j*angulo),0);
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
