/**
 * Allows control of a servo through the I2C bridge device.
 */
export class I2CServo {

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
     * Sets the servo position.
     * 
     * @param {number} position The position to set the servo to, from 0 to 1.
     */
    async setPosition(position) {

        // Validate
        if (position < 0 || position > 1) {
            throw new Error('Position must be between 0 and 1.')
        }

        // Convert to 0-255
        let valueByte = Math.floor(position * 255)

        // Set position
        await new Promise((resolve, reject) => this.i2c.writeByte(this.address, this.index, valueByte, err => {
            if (err) reject(err)
            else resolve()
        }))

    }


}