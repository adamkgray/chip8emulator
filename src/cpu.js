class Cpu {
    constructor() {
        this.display = new Array(0x40 * 0x20); // 64 * 32
        this.memory = new Uint8Array(0x1000); // 4KB (4,096 bytes) of RAM
        this.registers = new Array(0x10); // 16 general purpose 8-bit registers, usually referred to as Vx
        this.delayTimer = 0x0; // delay timer
        this.soundTimer = 0x0; //sound timer
        this.programCounter = 0x200; // the currently executing address, starts at 512
        this.stack = new Array(); // an array of 16 16-bit values, stores the address that the interpreter should return to when finished with a subroutine
        this.opcode = null;
        this.instruction = null;
    }

    fetchOpcode() {
        const upperBits = this.memory[this.programCounter];
        const lowerBits = this.memory[this.programCounter + 1];
        this.opcode = (upperBits << 8) | (lowerBits);
        this.programCounter += 2;
    }

    decodeOpcode() {
        /* opcodes are classified mostly by the leftmost 4 bits, which you can isolate with 0xF000 */
        if ((this.opcode & 0xF000) == 0x0000) {
            if (this.opcode == 0x00E0) {
                this.instruction = "00E0";
            } else if (this.opcode == 0x00EE) {
                this.instruction = "00EE";
            } else {
                this.instruction = "0NNN";
            }
        } else if ((this.opcode & 0xF000) == 0x1000) {
            this.instruction = "1NNN";
        } else if ((this.opcode & 0xF000) == 0x2000) {
            this.instruction = "2NNN";
        } else if ((this.opcode & 0xF000) == 0x3000) {
            this.instruction = "3XNN";
        } else if ((this.opcode & 0xF000) == 0x4000) {
            this.instruction = "4XNN";
        } else if ((this.opcode & 0xF000) == 0x5000) {
            this.instruction = "5XY0";
        } else if ((this.opcode & 0xF000) == 0x6000) {
            this.instruction = "6XNN";
        } else if ((this.opcode & 0xF000) == 0x7000) {
            this.instruction = "7XNN";
        } else if ((this.opcode & 0xF000) == 0x8000) {
            if ((this.opcode & 0xF) == 0x0) {
                this.instruction = "8XY0";
            } else if ((this.opcode & 0xF) == 0x1) {
                this.instruction = "8XY1";
            } else if ((this.opcode & 0xF) == 0x2) {
                this.instruction = "8XY2";
            } else if ((this.opcode & 0xF) == 0x3) {
                this.instruction = "8XY3";
            } else if ((this.opcode & 0xF) == 0x4) {
                this.instruction = "8XY4";
            } else if ((this.opcode & 0xF) == 0x5) {
                this.instruction = "8XY5";
            } else if ((this.opcode & 0xF) == 0x6) {
                this.instruction = "8XY6";
            } else if ((this.opcode & 0xF) == 0x7) {
                this.instruction = "8XY7";
            } else if ((this.opcode & 0xF) == 0xE) {
                this.instruction = "8XYE";
            } else {
                throw (`FATAL ERROR: unknown opcode ${opcode} in 8???`)
            }
        } else if ((opcode & 0xF000) == 0x9000) {
            this.instruction = "9XY0";
        } else if ((this.opcode & 0xF000) == 0xA000) {
            this.instruction = "ANNN";
        } else if ((this.opcode & 0xF000) == 0xB000) {
            this.instruction = "BNNN";
        } else if ((this.opcode & 0xF000) == 0xC000) {
            this.instruction = "CXNN";
        } else if ((this.opcode & 0xF000) == 0xD000) {
            this.instruction = "DXYN";
        } else if ((this.opcode & 0xF000) == 0xE000) {
            if ((this.opcode & 0xFF) == 0x9E) {
                this.instruction = "EX9E";
            } else if ((this.opcode & 0xFF) == 0xA1) {
                this.instruction = "EXA1";
            } else {
                throw (`FATAL ERROR: unknown opcode ${opcode} in E???`)
            }
        } else if ((this.opcode & 0xF000) == 0xF000) {
            if ((this.opcode & 0xFF) == 0x07) {
                this.instruction = "FX07";
            } else if ((this.opcode & 0xFF) == 0x0A) {
                this.instruction = "FX0A";
            } else if ((this.opcode & 0xFF) == 0x15) {
                this.instruction = "FX15";
            } else if ((this.opcode & 0xFF) == 0x18) {
                this.instruction = "FX18";
            } else if ((this.opcode & 0xFF) == 0x1E) {
                this.instruction = "FX1E";
            } else if ((this.opcode & 0xFF) == 0x29) {
                this.instruction = "FX29";
            } else if ((this.opcode & 0xFF) == 0x33) {
                this.instruction = "FX33";
            } else if ((this.opcode & 0xFF) == 0x55) {
                this.instruction = "FX55";
            } else if ((this.opcode & 0xFF) == 0x65) {
                this.instruction = "FX65";
            } else {
                throw (`FATAL ERROR: unknown opcode ${opcode} in F???`)
            }
        } else {
            throw (`FATAL ERROR: unknown opcode ${opcode} (matched no pattern)`)
        }
    }

    executeInstruction() {
        return;
    }

}

module.exports = { Cpu };
