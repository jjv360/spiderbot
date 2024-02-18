import I2C from 'i2c-bus'
import { I2CServo } from './drivers/I2CServo.mjs'

/**
 * Main entry point for the spider bot.
 */
export class SpiderBot {

    /**
     * Drivers
     */
    drivers = []

    /** Register a device driver */
    async registerDriver(deviceID, driver) {

        // Store ID
        driver.bot = this
        driver.deviceID = deviceID

        // Add it
        this.drivers.push(driver)

        // Start driver
        await driver.start()

    }

    /** Get a driver with the specified ID */
    driver(id) {
        return this.drivers.find(d => d.deviceID === id)
    }

    /** Start the bot */
    async start() {

        // Show header
        console.log('')
        console.log(' +-------------------------+')
        console.log(' |        SpiderBot        |')
        console.log(' +-------------------------+')
        console.log('')
    
        // Start I2C
        console.log('Starting I2C...')
        const i2c = await I2C.openSync(1)

        // Register drivers
        console.log('Registering drivers...')
        await this.registerDriver('leg.topleft.rotation', new I2CServo(i2c, 0x40, 0))

        // Move leg
        console.log('Moving leg...')
        for (let i = 0 ; i < 99999 ; i++) {
            await this.driver('leg.topleft.rotation').setPosition((i % 5) / 4)
            await new Promise(c => setTimeout(c, 1000))
        }

        // Stay awake
        // await new Promise(c => setTimeout(c, 60 * 1000))

    }

}