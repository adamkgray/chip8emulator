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
        this.opcode = ((upperBits << 8) | lowerBits);
        this.programCounter += 2
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
                break;
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
                        throw (`FATAL ERROR: unknown opcode '${this.opcode}' like 8XXX`);
                        break;
                }
                break;
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
                        break;
                    case 0xA1:
                        this.instruction = "EXA1";
                        break;
                    default:
                        throw (`FATAL ERROR: unknown opcode '${this.opcode}' like EXXX`);
                        break;
                }
                break;
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
                        throw (`FATAL ERROR: unknown opcode '${this.opcode}' like FXXX`);
                        break;
                }
                break;
            default:
                throw (`FATAL ERROR: unknown opcode '${this.opcode}' (no  matched pattern)`)
                break;
        }
        return;
    }

    executeInstruction() {
        const x = ((this.opcode & 0x0F00) >> 8);
        const y = ((this.opcode & 0x00F0) >> 4);
        switch (this.instruction) {
            case "00E0":
                /* Clear the Screen */
                /* TODO */
                break;
            case "00EE":
                /* Return from subroutine */
                this.programCounter = this.stack.pop();
                break;
            case "0NNN":
                /* Jump to location nnn */
                /* TODO */
                //? this.programCounter = this.opcode & 0x0FFF;
                break;
            case "1NNN":
                /* Jump to location nnn */
                this.programCounter = this.opcode & 0x0FFF;
                break;
            case "2NNN":
                /* Call subroutine at nnn */
                this.stack.push(this.programCounter);
                this.programCounter = this.opcode & 0x0FFF;
                break;
            case "3XNN":
                /* Skip next instruction if Vx = nn */
                if (this.registers[x] == (this.opcode & 0x00FF)) {
                    this.programCounter += 2;
                }
                break;
            case "4XNN":
                /* Skip next instruction if Vx != nn */
                if (this.registers[x] != (this.opcode & 0x00FF)) {
                    this.programCounter += 2;
                }
                break;
            case "5XY0":
                /* Skip next instruction if Vx = Vy */
                if (this.registers[x] == this.registers[y]) {
                    this.programCounter += 2;
                }
                break;
            case "6XNN":
                /* Set Vx = nn */
                this.registers[x] = (this.opcode & 0x00FF);
                break;
            case "7XNN":
                /* Set Vx = Vx + nn */
                this.registers[x] += (this.opcode & 0x0FF);
                break;
            case "8XY0":
                /* Set Vx = Vy */
                this.registers[x] = this.registers[y];
                break;
            case "8XY1":
                /* Set Vx = Vx OR Vy */
                this.registers[x] |= this.registers[y];
                break;
            case "8XY2":
                /* Set Vx = Vx AND Vy */
                this.registers[x] &= this.registers[y];
                break;
            case "8XY3":
                /* Set Vx = Vx XOR Vy */
                this.registers[x] ^= this.registers[y];
                break;
            case "8XY4":
                /* Add VY to VX.If result >FF, then VF=1 */
                this.registers[x] += this.registers[y];
                if (this.registers[x] > 0xFF) {
                    this.registers[0xF] = 1;
                    this.registers[x] -= 0x100;
                } else {
                    this.registers[0xF] = 0;
                }
                break;
            case "8XY5":
                /* Subtract VY from VX. If VX<VY, then VF=0 */
                this.registers[x] -= this.registers[y];
                if (this.registers[x] < 0) {
                    this.registers[0xF] = 0;
                    this.registers[x] += 0x100;
                } else {
                    this.registers[0xF] = 1;
                }
                break;
            case "8XY6":
                break;
            case "8XY7":
                break;
            case "8XYE":
                break;
            case "9XY0":
                break;
            case "ANNN":
                break;
            case "BNNN":
                break;
            case "CXNN":
                break;
            case "DXYN":
                break;
            case "EX9E":
                break;
            case "EXA1":
                break;
            case "FX07":
                break;
            case "FX0A":
                break;
            case "FX15":
                break;
            case "FX18":
                break;
            case "FX1E":
                break;
            case "FX29":
                break;
            case "FX33":
                break;
            case "FX55":
                break;
            case "FX65":
                break;
            default:
                throw (`FATAL ERROR: unknown instruction '${this.instruction}'`);
                break;
        }
        return;
    }
}

module.exports = { Cpu };
