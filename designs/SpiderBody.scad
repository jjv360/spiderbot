//
// SpiderBot body

include <include/roundedcube.scad>

/** Hide everything below from the customizer */
module __Customizer_Limit__ () {}

/** Main body size */
BodyWidth = 80;
BodyDepth = 130;
BodyHeight = 4;

/** RPi board size */
RPiWidth = 56.5;
RPiHeight = 85.6;

/** Adafruit PCA9685 board dimensions */
PWMBoardWidth = 62.5;
PWMBoardHeight = 25.4;

/** Servo size */
ServoWidth = 12.5;
ServoHeight = 23.5;

/** Pin */
module clipPin(shaftRadius = 1, headRadius = 1.25, height = 5) {
    
    // Shaft
    cylinder(h = height, r = shaftRadius);
    
    // Head
    translate([0, 0, height + headRadius/2])
    sphere(r = headRadius, $fn = 32);
    
}

/** Main body */
module mainBody() {
    
    // Center position of the RPi slot
    RPiX = BodyWidth/2;
    RPiY = BodyDepth/2 + 16;
    
    // Center position of the PWM board slot
    PWMBoardX = BodyWidth/2;
    PWMBoardY = BodyDepth/2 - 46;
    
    // Base
    difference() {
        
        // Base
        roundedcube(size = [BodyWidth, BodyDepth, BodyHeight], apply_to="z", radius=2.0);
    
        // RPi hole
        translate([RPiX, RPiY, 50+BodyHeight-1])
        roundedcube(size = [RPiWidth, RPiHeight, 100], apply_to="z", radius=1, center = true);
        
        // PWM board hole
        translate([PWMBoardX, PWMBoardY, 50+BodyHeight-1])
        roundedcube(size = [PWMBoardWidth, PWMBoardHeight, 100], apply_to="z", radius=1, center = true);
        
        // Top-left servo hole
        
    };
    
    // RPi text
    translate([RPiX, RPiY, BodyHeight-2])
    //color("Green")
    linear_extrude(height = 2)
    text("RPi", size=7, halign="center", valign="center");
    
    // RPi pins
    translate([RPiX - RPiWidth/2 + 3.5, RPiY + RPiHeight/2 - 23.5, BodyHeight-1]) clipPin();
    translate([RPiX + RPiWidth/2 - 3.5, RPiY + RPiHeight/2 - 23.5, BodyHeight-1]) clipPin();
    translate([RPiX - RPiWidth/2 + 3.5, RPiY - RPiHeight/2 + 3.5, BodyHeight-1]) clipPin();
    translate([RPiX + RPiWidth/2 - 3.5, RPiY - RPiHeight/2 + 3.5, BodyHeight-1]) clipPin();
    
    // PWM board text
    translate([PWMBoardX, PWMBoardY, BodyHeight-2])
    //color("Green")
    linear_extrude(height = 2)
    text("PCA9685", size=7, halign="center", valign="center");
    
    // PWM board pins
    translate([PWMBoardX - PWMBoardWidth/2 + 3, PWMBoardY + PWMBoardHeight/2 - 3.5, BodyHeight-1]) clipPin();
    translate([PWMBoardX + PWMBoardWidth/2 - 3, PWMBoardY + PWMBoardHeight/2 - 3.5, BodyHeight-1]) clipPin();
    translate([PWMBoardX - PWMBoardWidth/2 + 3, PWMBoardY - PWMBoardHeight/2 + 3.5, BodyHeight-1]) clipPin();
    translate([PWMBoardX + PWMBoardWidth/2 - 3, PWMBoardY - PWMBoardHeight/2 + 3.5, BodyHeight-1]) clipPin();
    
    
}

// Render parts
mainBody();