# chip8emulator

## Resources

* [How to write an emulator (CHIP-8 interpreter)](http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/)
* [Wikipedia](https://en.wikipedia.org/wiki/CHIP-8)
* [Chip 8 Instruction Set](https://storage.googleapis.com/wzukusers/user-34724694/documents/5ddc61256d08cO18xs1R/CHIP-8%20Instruction%20Set%20(Classic).pdf)

## Examples

* [vanilla js](https://github.com/alexanderdickson/Chip-8-Emulator)
* [python](https://github.com/craigthomas/Chip8Python)

## Development

Use docker to develop in a live environment. Open a new shell and run `docker run --rm -it -v $(pwd):/code node:13 bash` and `cd /code`. You will then be able to write source code locally and run it in the docker container.

## Dependencies

Dependencies can be installed with `yarn install`.

## Tests

Tests are written with Jest, and can be run with `yarn run test`.

