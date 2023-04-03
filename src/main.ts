import { SerialPort } from 'serialport'
// @ts-ignore
// import Readline from "@serialport/parser-readline";
import { ReadlineParser } from '@serialport/parser-readline'
export function main() {
    let serialPort: SerialPort = new SerialPort({path: "/dev/cu.URT1", baudRate: 115200});
    
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    serialPort.on("open", () => {
        console.log("Serial port opened");

        // Send initialization commands to GRBL
        serialPort.write("$X\n"); // Reset GRBL
        serialPort.write("G21\n"); // Set units to millimeters
        serialPort.write("G90\n"); // Use absolute coordinates
    });

    parser.on("data", (data: string) => {
        console.log(`Received: ${data}`);
    });

    function sendGcode(command: string) {
        serialPort.write(`${command}\n`);
    }

// Example usage
    sendGcode("G0 X10 Y10");

}