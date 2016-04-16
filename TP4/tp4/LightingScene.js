var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);

}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	this.initLights();
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, 0, 1, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.cilinder = new MyCilinder(this, 6, 20);
	this.cilinder2 = new MyCilinder(this,6,20);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0.0,0.0,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	/* Material for the walls */
	this.walls = new CGFappearance(this);
	this.walls.setAmbient(0.125,0.112,0.08375,1);
	this.walls.setDiffuse(0.25,0.224,0.1675,1);
	this.walls.setSpecular(0.5,0.447,0.335,1);
	this.walls.setShininess(120);

	/* Materials for the left wall */
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.windowAppearance.loadTexture("/TP4/tp4/resources/images/window.png");
	this.windowAppearance.setAmbient(0.125,0.112,0.08375,1);
	this.windowAppearance.setDiffuse(0.25,0.224,0.1675,1);
	this.windowAppearance.setSpecular(0.5,0.447,0.335,1);
	this.windowAppearance.setShininess(120);

	/*Material for the floor */
	this.floorappearance = new CGFappearance(this);
	this.floorappearance.loadTexture("/TP4/tp4/resources/images/floor.png");
	this.floorappearance.setAmbient(0.1,0.1,0.1,1);
	this.floorappearance.setDiffuse(0.5,0.5,0.5,1);
	this.floorappearance.setSpecular(0.7,0.7,0.7,1);
	this.floorappearance.setShininess(120);

	this.slideAppearance = new CGFappearance(this);
	this.slideAppearance.loadTexture("/TP4/tp4/resources/images/slides.png");
	this.slideAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.slideAppearance.setSpecular(0.3,0.3,0.3,1);
	this.slideAppearance.setShininess(50);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("/TP4/tp4/resources/images/board.png");
	this.boardAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(200);

	this.pillarAppearance = new CGFappearance(this);
	this.pillarAppearance.loadTexture("/TP4/tp4/resources/images/pillar.jpg");
	this.pillarAppearance.setDiffuse(0.2,0.2,0.2,1);
	this.pillarAppearance.setSpecular(0.5,0.5,0.5,1);
	this.pillarAppearance.setShininess(200);
	
	

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.0,0.0,0.0, 1.0);
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);


	this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0,1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(0.2);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();

	this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.floorappearance.apply();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.windowAppearance.apply();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);		
		this.wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.walls.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		//this.tabletop.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		//this.tabletop.apply();
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slideAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Cilindro 1
	this.pushMatrix();
		this.translate(14,0,14);
		this.scale(1,5,1);	
		this.rotate(-Math.PI/2,1,0,0);

		this.pillarAppearance.apply();
		this.cilinder.display();
	this.popMatrix();

	// Cilindro 2
	this.pushMatrix();
		this.translate(2,0,14);
		this.scale(1,5,1);	
		this.rotate(-Math.PI/2,1,0,0);

		this.pillarAppearance.apply();
		this.cilinder2.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};
