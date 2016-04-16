/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'ControlPanel');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	var group2=this.gui.addFolder("Clock");
	var group3=this.gui.addFolder("Texture");
	var group4=this.gui.addFolder("Window");
	group.open();
	group2.open();
	group3.open();
	group4.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	//add the clock button

	group2.add(this.scene, 'clockMoving')

	//add the textures dropdown menu

	group3.add(this.scene, 'currRobotAppearance', this.scene.robotAppearanceList);


	//add the window open/close menu

	group4.add(this.scene, 'windowOpen')
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (97):	
		case (65):	
			this.scene.robot.moveRobot(2);
			break;
		case (100):
		case (68):	
			this.scene.robot.moveRobot(3);
			break;
		case (119):	
		case (87):
			this.scene.robot.moveRobot(0);
			break;
		case (115):
		case (83):	
			this.scene.robot.moveRobot(1);
			break;
		case (111):
			this.scene.robot.waveO();
			break;
		case (32):	
			this.scene.robot.jump();
			break;	
	};
};
