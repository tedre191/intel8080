import { Memory } from './memory';
import { State } from "./state";

export class Intel8080 {
    private memory: Memory;
    private state: State;

    private instructions: { [opcode: number]: () => void } = {
        0x00: () => { console.log('NOP'); this.state.pc++; },
        0x05: () => {
            if (this.state.b == 0) {
                this.state.b = 0xff;
            } else {
                this.state.b = this.state.b - 1;
            }

            this.state.pc += 1;

            console.log('DCR B');
        },
        0x06: () => {
            this.state.b = this.memory.read(this.state.pc + 1);
            this.state.pc += 2;

            console.log('MVI B 0x' + this.state.b.toString(16));
        },
        0x11: () => {
            this.state.de(this.memory.readWord(this.state.pc + 1));
            this.state.pc += 3;

            console.log('LXI D 0x' + this.memory.readWord(this.state.pc + 1).toString(16));
        },
        0x13: () => {
            this.state.de(this.state.de() + 1);
            this.state.pc += 1;

            console.log('INX D');
        },
        0x1a: () => {
            this.state.a = this.memory.read(this.state.de());
            this.state.pc += 1;

            console.log('LDAX D 0x' + this.state.a.toString(16));
        },
        0x21: () => {
            this.state.hl(this.memory.readWord(this.state.pc + 1));
            this.state.pc += 3;

            console.log('LXI H 0x' + this.memory.readWord(this.state.pc + 1).toString(16));
        },
        0x23: () => {
            this.state.hl(this.state.hl() + 1);
            this.state.pc += 1;

            console.log('INX H');
        },
        0x31: () => {
            this.state.sp = this.memory.readWord(this.state.pc + 1);
            this.state.pc += 3;

            console.log('LXI SP 0x' + this.state.sp.toString(16));
        },
        0x77: () => {
            this.memory.write(this.state.hl(), this.state.a);
            this.state.pc++;

            console.log('MOV 0x' + this.state.hl().toString(16) + ' 0x' + this.state.a.toString(16));
        },
        0xc3: () => {
            this.state.pc = this.memory.readWord(this.state.pc + 1);
            console.log('JPM 0x' + this.state.pc.toString(16));
        },
        0xcd: () => {
            this.memory.write(this.state.sp - 1, this.state.pc >> 8 & 0xff);
            this.memory.write(this.state.sp - 2, this.state.pc & 0xff);
            this.state.sp -= 2;
            this.state.pc = this.memory.readWord(this.state.pc + 1);

            console.log('CALL 0x' + this.state.pc.toString(16));
        }
    };

    constructor() {
        this.memory = new Memory();
        this.state = new State();
    }

    public load(program: number[], startPos = 0x00) {
        program.forEach((opcode, pos) => {
            this.memory.write(startPos + pos, opcode);
        });
    }

    public run() {
        var failsafe = 1000;
        while (failsafe != 0) {
            var opcode = this.memory.read(this.state.pc);

            if (!this.instructions[opcode])
                throw new Error(`Opcode 0x${opcode.toString(16)} not implemented`);


            this.instructions[this.memory.read(this.state.pc)]();
            this.state.printState();

            // failsafe
            failsafe--;
        }
    }
}