export class Memory {
    public static MAX_MEMORY: number = 0xFFFF;
    public static MAX_DATA: number = 0xFFFF;

    private memory: number[]

    constructor() {
        this.initMemory();
        console.log(this.memory)
    }

    public read(position: number) {
        if (position < 0x0000 || position > Memory.MAX_MEMORY)
            throw new RangeError(`Invalid memory position ${position}`);

        return this.memory[position];
    }

    public readWord(position: number) {
        if (position < 0x0000 || position > Memory.MAX_MEMORY - 1)
            throw new RangeError(`Invalid memory position ${position}`);

        return this.memory[position + 1] << 8 | this.memory[position];
    }

    public write(position: number, data: number) {
        if (position < 0x0000 || position > Memory.MAX_MEMORY)
            throw new RangeError(`Invalid memory position ${position}`);

        if (position < 0x00 || position > Memory.MAX_DATA)
            throw new RangeError(`Invalid memory block ${data}`);

        return this.memory[position] = data;
    }

    private initMemory() {
        this.memory = [];

        for (var i = 0x0000; i < Memory.MAX_MEMORY; i++) {
            this.memory[i] = null;
        }
    }
}