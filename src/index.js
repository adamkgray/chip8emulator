const fs = require("fs");
const { fetchOpcode } = require("../src/helpers/fetchOpcode");
const { decodeOpcode } = require("../src/helpers/decodeOpcode");
const { executeInstruction } = require("../src/helpers/executeInstruction");
const cpu = {
    display: new Array(0x40 * 0x20), // 64 * 32
    memory: new Uint8Array(0x1000), // 4KB (4,096 bytes) of RAM
    registers: new Array(0x10), // 16 general purpose 8-bit registers, usually referred to as Vx
    delayTimer: 0x0, // delay timer
    soundTimer: 0x0, //sound timer
    programCounter: 0x200, // the currently executing address, starts at 512
    stack: new Array(), // an array of 16 16-bit values, stores the address that the interpreter should return to when finished with a subroutine
    opcode: null
}

/* open the binary game file */
fs.open('games/spaceInvaders.ch8', 'r', (err, fd) => {
    /* return if the file could not be read */
    if (err) {
        console.log(err.message);
        return;
    }
    /* read the file into memory */
    fs.read(fd, cpu.memory, 0x200, 0x0E00, 0x0, () => { /* (fd, buffer, offset, length, position, callback) */
        while (true) {
            const opcode = fetchOpcode(cpu);
            const instruction = decodeOpcode(opcode);
            executeInstruction(instruction, cpu);
            break;
        }
    });
});
