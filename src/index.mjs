import i2c from 'i2c-bus'
import { I2CServo } from './drivers/I2CServo.mjs'

/** Main function */
async function main() {

    // Show header
    console.log('')
    console.log(' +-------------------------+')
    console.log(' |        SpiderBot        |')
    console.log(' +-------------------------+')
    console.log('')

    // Start I2C
    console.log('Starting I2C...')
    const i2c = await i2c.openPromisified(1)

    // Done
    console.log('Creating drivers...')
    const leg1a = new I2CServo(i2c, 0x40, 0)

}

// Start
main()