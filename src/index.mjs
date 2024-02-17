import { init } from 'raspi'
import { I2C } from 'raspi-i2c'

/** Main function */
async function main() {

    // Show header
    console.log('')
    console.log(' +-------------------------+')
    console.log(' |        SpiderBot        |')
    console.log(' +-------------------------+')
    console.log('')

    // Init RPI lib
    console.log('Starting RPi hardware interface...')
    await new Promise(c => init(c))

    // Start I2C
    console.log('Starting I2C...')
    const i2c = new I2C()

    // Done
    console.log('Ready')

}

// Start
main()