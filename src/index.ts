declare var require: (a: string) => any

import { Intel8080 } from './intel8080'

const invaders_h = require('./../rom/invaders.h');
const invaders_e = require('./../rom/invaders.e');
const invaders_f = require('./../rom/invaders.f');
const invaders_g = require('./../rom/invaders.g');


var cpu = new Intel8080();
cpu.load(invaders_h, 0x0000);
cpu.load(invaders_g, 0x0800);
cpu.load(invaders_f, 0x1000);
cpu.load(invaders_e, 0x1800);

cpu.run();
