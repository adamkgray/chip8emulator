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
        switch (this.opcode & 0xF000) {
            case 0x0000:
                switch (this.opcode) {
                    case 0x00E0:
                        this.instruction = "00E0";
                        break;
                    case 0x0EE:
                        this.instruction = "00EE";
                        break;
                    default:
                        this.instruction = "0NNN";
                        break;
                }
            case 0x1000:
                this.instruction = "1NNN";
                break;
            case 0x2000:
                this.instruction = "2NNN";
                break;
            case 0x3000:
                this.instruction = "3XNN";
                break;
            case 0x4000:
                this.instruction = "4XNN";
                break;
            case 0x5000:
                this.instruction = "5XY0";
                break;
            case 0x6000:
                this.instruction = "6XNN";
                break;
            case 0x7000:
                this.instruction = "7XNN";
                break;
            case 0x8000:
                switch (this.opcode & 0xF) {
                    case 0x0:
                        this.instruction = "8XY0";
                        break;
                    case 0x1:
                        this.instruction = "8XY1";
                        break;
                    case 0x2:
                        this.instruction = "8XY2";
                        break;
                    case 0x3:
                        this.instruction = "8XY3";
                        break;
                    case 0x4:
                        this.instruction = "8XY4";
                        break;
                    case 0x5:
                        this.instruction = "8XY5";
                        break;
                    case 0x6:
                        this.instruction = "8XY6";
                        break;
                    case 0x7:
                        this.instruction = "8XY7";
                        break;
                    case 0xE:
                        this.instruction = "8XYE";
                        break;
                    default:
                        throw (`FATAL ERROR: unknown opcode '${opcode}' like 8XXX`);
                        break;
                }
            case 0x9000:
                this.instruction = "9XY0";
                break;
            case 0xA000:
                this.instruction = "ANNN";
                break;
            case 0xB000:
                this.instruction = "BNNN";
                break;
            case 0xC000:
                this.instruction = "CXNN";
                break;
            case 0xD000:
                this.instruction = "DXYN";
                break;
            case 0xE000:
                switch (this.opcode & 0xFF) {
                    case 0x9E:
                        this.instruction = "EX9E";
                    case 0xA1:
                        this.instruction = "EXA1";
                    default:
                        throw (`FATAL ERROR: unknown opcode '${opcode}' like EXXX`);
                        break;
                }
            case 0xF000:
                switch (this.opcode & 0xFF) {
                    case 0x07:
                        this.instruction = "FX07";
                        break;
                    case 0x0A:
                        this.instruction = "FX0A";
                        break;
                    case 0x15:
                        this.instruction = "FX15";
                        break;
                    case 0x18:
                        this.instruction = "FX18";
                        break;
                    case 0x1E:
                        this.instruction = "FX1E";
                        break;
                    case 0x29:
                        this.instruction = "FX29";
                        break;
                    case 0x33:
                        this.instruction = "FX33";
                        break;
                    case 0x55:
                        this.instruction = "FX55";
                        break;
                    case 0x65:
                        this.instruction = "FX65";
                        break;
                    default:
                        throw (`FATAL ERROR: unknown opcode '${opcode}' like FXXX`);
                        break;

                }
            default:
                throw (`FATAL ERROR: unknown opcode '${opcode}' (no  matched pattern)`)
                break;
        }
    }

    executeInstruction() {
        return;
    }

}

module.exports = { Cpu };
