const fs = require("fs");
const { Cpu } = require("./cpu")
const cpu = new Cpu();

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
            cpu.fetchOpcode();
            cpu.decodeOpcode();
            cpu.executeInstruction();
            break;
        }
    });
});
