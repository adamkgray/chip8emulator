# chip8emulator

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fadamkgray%2Fchip8emulator%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/adamkgray/chip8emulator/goto?ref=main)

## To do

- [x] add resources to README
- [x] choose language and testing framework
- [x] write `Cpu` class (cpu.js)
- [x] write `fetchOpcode`
- [x] write `decodeOpcode`
- [ ] write `executeInstruction`
- [ ] test fetch, decode and execute methods
- [ ] write a better `stack` (maybe a class, throws error when maximum size exceeded etc.)
- [ ] handle display (OpenGL? Ncurses?)
- [ ] handle gamepad input

## Resources

* [Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)
* [How to write an emulator (CHIP-8 interpreter)](http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/)
* [Wikipedia](https://en.wikipedia.org/wiki/CHIP-8)
* [Chip 8 Instruction Set](https://storage.googleapis.com/wzukusers/user-34724694/documents/5ddc61256d08cO18xs1R/CHIP-8%20Instruction%20Set%20(Classic).pdf)

## Examples

* [vanilla js](https://github.com/alexanderdickson/Chip-8-Emulator)
* [python](https://github.com/craigthomas/Chip8Python)

## Development

```bash
docker run --rm -it -v $(pwd):/code node:13 bash
cd /code
```

## Dependencies

```bash
yarn install
```

## Start

``` bash
yarn run start
```

## Tests

``` bash
yarn run test
```

