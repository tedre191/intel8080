export class State {
    public pc: number = 0x00;
    public sp: number = 0x00;

    public a: number = 0x00;
    public b: number = 0x00;
    public c: number = 0x00;
    public d: number = 0x00;
    public e: number = 0x00;
    public f: number = 0x00;
    public h: number = 0x00;
    public l: number = 0x00;

    public af(value?: number): number {
        if (value) {
            this.a = value >> 8 & 0xff
            this.f = value & 0xff

            return this.af();
        } else {
            return (this.a << 8 | this.f);
        }
    }

    public de(value?: number): number {
        if (value) {
            this.d = value >> 8 & 0xff
            this.e = value & 0xff

            return this.de();
        } else {
            return (this.e | (this.d << 8));
        }
    }

    public hl(value?: number): number {
        if (value) {
            this.h = value >> 8 & 0xff
            this.l = value & 0xff

            return this.hl();
        } else {
            return (this.l | (this.h << 8));
        }
    }

    constructor() {
        this.pc = 0x00;
    }

    public printState() {
        console.log(`af: ${this.af().toString(16)}, de: ${this.de().toString(16)}, hl: ${this.hl().toString(16)}, pc: ${this.pc.toString(16)}, sp: ${this.sp.toString(16)}`)
    }
}