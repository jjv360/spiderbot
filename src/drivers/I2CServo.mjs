import { Pca9685Driver } from 'pca9685'

/**
 * Allows control of a servo through the I2C bridge device.
 */
export class I2CServo {

    /**
     * Driver for the Adafruit 16-channel PWM board
     * 
     * @type {Pca9685Driver}
     */
    board = null

    /** 
     * Creates a new I2C-controller servo driver. 
     * 
     * @param {I2C} i2c I2C interface
     * @param {number} address The I2C interface address
     * @param {number} index The servo index on the I2C interface.
     */
    constructor(i2c, address, index) {

        // Store values
        this.i2c = i2c
        this.address = address
        this.index = index

    }

    /**
     * Start driver
     */
    async start() {

        // Store driver interface
        this.board = await new Promise((resolve, reject) => {
            let driver = new Pca9685Driver({ i2c: this.i2c, address: this.address, frequency: 50, debug: false }, err => {
                if (err) reject(err)
                else resolve(driver)
            })
        })

    }

    /**
     * Sets the servo position.
     * 
     * @param {number} position The position to set the servo to, from 0 to 1 going from 0º to 180º.
     */
    async setPosition(position) {

        // Validate
        if (position < 0) position = 0
        if (position > 1) position = 1

        // Set PWM frequency normalized based on the position for the SG90 servo
        let pulseMax = 2600
        let pulseMin = 544
        let pulseLength = Math.round(pulseMin + (pulseMax - pulseMin) * position)
        this.board.setPulseLength(this.index, pulseLength)

    }


}