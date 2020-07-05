exports.decodeOpcode = (opcode) => {
    /* opcodes are classified mostly by the leftmost 4 bits, which you can isolate with 0xF000 */
    if ((opcode & 0xF000) == 0x0000) {
        if (opcode == 0x00E0) {
            return "00E0";
        } else if (opcode == 0x00EE) {
            return "00EE";
        } else {
            return "0NNN";
        }
    } else if ((opcode & 0xF000) == 0x1000) {
        return "1NNN";
    } else if ((opcode & 0xF000) == 0x2000) {
        return "2NNN";
    } else if ((opcode & 0xF000) == 0x3000) {
        return "3XNN";
    } else if ((opcode & 0xF000) == 0x4000) {
        return "4XNN";
    } else if ((opcode & 0xF000) == 0x5000) {
        return "5XY0";
    } else if ((opcode & 0xF000) == 0x6000) {
        return "6XNN";
    } else if ((opcode & 0xF000) == 0x7000) {
        return "7XNN";
    } else if ((opcode & 0xF000) == 0x8000) {
        if ((opcode & 0xF) == 0x0) {
            return "8XY0";
        } else if ((opcode & 0xF) == 0x1) {
            return "8XY1";
        } else if ((opcode & 0xF) == 0x2) {
            return "8XY2";
        } else if ((opcode & 0xF) == 0x3) {
            return "8XY3";
        } else if ((opcode & 0xF) == 0x4) {
            return "8XY4";
        } else if ((opcode & 0xF) == 0x5) {
            return "8XY5";
        } else if ((opcode & 0xF) == 0x6) {
            return "8XY6";
        } else if ((opcode & 0xF) == 0x7) {
            return "8XY7";
        } else if ((opcode & 0xF) == 0xE) {
            return "8XYE";
        } else {
            throw (`FATAL ERROR: unknown opcode ${opcode} in 8???`)
        }
    } else if ((opcode & 0xF000) == 0x9000) {
        return "9XY0";
    } else if ((opcode & 0xF000) == 0xA000) {
        return "ANNN";
    } else if ((opcode & 0xF000) == 0xB000) {
        return "BNNN";
    } else if ((opcode & 0xF000) == 0xC000) {
        return "CXNN";
    } else if ((opcode & 0xF000) == 0xD000) {
        return "DXYN";
    } else if ((opcode & 0xF000) == 0xE000) {
        if ((opcode & 0xFF) == 0x9E) {
            return "EX9E";
        } else if ((opcode & 0xFF) == 0xA1) {
            return "EXA1";
        } else {
            throw (`FATAL ERROR: unknown opcode ${opcode} in E???`)
        }
    } else if ((opcode & 0xF000) == 0xF000) {
        if ((opcode & 0xFF) == 0x07) {
            return "FX07";
        } else if ((opcode & 0xFF) == 0x0A) {
            return "FX0A";
        } else if ((opcode & 0xFF) == 0x15) {
            return "FX15";
        } else if ((opcode & 0xFF) == 0x18) {
            return "FX18";
        } else if ((opcode & 0xFF) == 0x1E) {
            return "FX1E";
        } else if ((opcode & 0xFF) == 0x29) {
            return "FX29";
        } else if ((opcode & 0xFF) == 0x33) {
            return "FX33";
        } else if ((opcode & 0xFF) == 0x55) {
            return "FX55";
        } else if ((opcode & 0xFF) == 0x65) {
            return "FX65";
        } else {
            throw (`FATAL ERROR: unknown opcode ${opcode} in F???`)
        }
    }
}
