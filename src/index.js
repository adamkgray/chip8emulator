const memory = new Array(0x1000); // 4KB (4,096 bytes) of RAM

const registers = new Array(0x10); // 16 general purpose 8-bit registers, usually referred to as Vx

let delayTimer = 0x0; // delay timer

let soundTimer = 0x0; //sound timer

let programCounter = 0x0; // the currently executing address

const stack = new Array(); // an array of 16 16-bit values, stores the address that the interpreter shoud return to when finished with a subroutine

const display = new Array(0x40 * 0x20) // 64 * 32

const main = () => {
    console.log("chip8");
}
main();
