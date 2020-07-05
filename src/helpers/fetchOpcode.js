exports.fetchOpcode = (cpu) => {
    const upperBits = cpu.memory[cpu.programCounter];
    const lowerBits = cpu.memory[cpu.programCounter + 1];
    const opcode = (upperBits << 8) | (lowerBits);
    cpu.programCounter += 2;
    return opcode;
}
