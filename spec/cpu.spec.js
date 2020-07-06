const { Cpu } = require("../src/cpu");

describe("Cpu", () => {
    beforeEach(() => {
        this.cpu = new Cpu();
    });

    it("should initialize with the program counter at memory address 0x200 (512)", () => {
        expect(this.cpu.programCounter).toEqual(0x200);
    });

    it("should fetch 16 bit opcodes from 2 consecutive 8-bit memory addresses", () => {
        this.cpu.memory[0x200] = 0x12;
        this.cpu.memory[0x200 + 1] = 0x34;
        this.cpu.fetchOpcode();
        expect(this.cpu.opcode).toEqual(0x1234);
    });

    it("should increment the program counter after fetching an opcode", () => {
        this.cpu.memory[0x200] = 0x12;
        this.cpu.memory[0x200 + 1] = 0x34;
        this.cpu.fetchOpcode();
        expect(this.cpu.programCounter).toEqual(0x200 + 2);
    });

    it("should decode 00E0", () => {
        this.cpu.memory[0x200] = 0x00;
        this.cpu.memory[0x200 + 1] = 0xE0;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("00E0");
    });

    it("should decode 00EE", () => {
        this.cpu.memory[0x200] = 0x00;
        this.cpu.memory[0x200 + 1] = 0xEE;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("00EE");
    });

    it("should decode 0NNN", () => {
        this.cpu.memory[0x200] = 0x00;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("0NNN");
    });

    it("should decode 1NNN", () => {
        this.cpu.memory[0x200] = 0x10;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("1NNN");
    });

    it("should decode 2NNN", () => {
        this.cpu.memory[0x200] = 0x20;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("2NNN");
    });

    it("should decode 3XNN", () => {
        this.cpu.memory[0x200] = 0x30;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("3XNN");
    });

    it("should decode 4XNN", () => {
        this.cpu.memory[0x200] = 0x40;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("4XNN");
    });

    it("should decode 4XNN", () => {
        this.cpu.memory[0x200] = 0x40;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("4XNN");
    });

    it("should decode 5XY0", () => {
        this.cpu.memory[0x200] = 0x50;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("5XY0");
    });

    it("should decode 6XNN", () => {
        this.cpu.memory[0x200] = 0x60;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("6XNN");
    });

    it("should decode 7XNN", () => {
        this.cpu.memory[0x200] = 0x70;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("7XNN");
    });

    it("should decode 8XY0", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY0");
    });

    it("should decode 8XY1", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x01;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY1");
    });

    it("should decode 8XY2", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x02;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY2");
    });

    it("should decode 8XY3", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x03;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY3");
    });

    it("should decode 8XY4", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x04;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY4");
    });

    it("should decode 8XY5", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x05;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY5");
    });

    it("should decode 8XY6", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x06;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY6");
    });

    it("should decode 8XY7", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x07;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XY7");
    });

    it("should decode 8XYE", () => {
        this.cpu.memory[0x200] = 0x80;
        this.cpu.memory[0x200 + 1] = 0x0E;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("8XYE");
    });

    it("should decode 9XY0", () => {
        this.cpu.memory[0x200] = 0x90;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("9XY0");
    });

    it("should decode ANNN", () => {
        this.cpu.memory[0x200] = 0xA0;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("ANNN");
    });

    it("should decode BNNN", () => {
        this.cpu.memory[0x200] = 0xB0;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("BNNN");
    });

    it("should decode CXNN", () => {
        this.cpu.memory[0x200] = 0xC0;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("CXNN");
    });

    it("should decode DXYN", () => {
        this.cpu.memory[0x200] = 0xD0;
        this.cpu.memory[0x200 + 1] = 0x00;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("DXYN");
    });

    it("should decode EX9E", () => {
        this.cpu.memory[0x200] = 0xE0;
        this.cpu.memory[0x200 + 1] = 0x9E;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("EX9E");
    });

    it("should decode EXA1", () => {
        this.cpu.memory[0x200] = 0xE0;
        this.cpu.memory[0x200 + 1] = 0xA1;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("EXA1");
    });

    it("should decode FX07", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x07;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX07");
    });

    it("should decode FX0A", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x0A;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX0A");
    });

    it("should decode FX15", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x15;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX15");
    });

    it("should decode FX18", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x18;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX18");
    });

    it("should decode FX1E", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x1E;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX1E");
    });

    it("should decode FX29", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x29;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX29");
    });

    it("should decode FX33", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x33;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX33");
    });

    it("should decode FX55", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x55;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX55");
    });

    it("should decode FX65", () => {
        this.cpu.memory[0x200] = 0xF0;
        this.cpu.memory[0x200 + 1] = 0x65;
        this.cpu.fetchOpcode();
        this.cpu.decodeOpcode();
        expect(this.cpu.instruction).toEqual("FX65");
    });
})
