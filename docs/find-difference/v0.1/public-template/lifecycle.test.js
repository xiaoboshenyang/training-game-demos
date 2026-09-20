import assert from 'node:assert/strict';
import {Lifecycle} from './lifecycle.js';
let m=new Lifecycle(),called=0;m.state='game';m.wait('feedback',1500,()=>{called++;m.state='game';});m.advance(600);assert.equal(m.remainingMs,119400);m.pause();m.advance(9000);assert.equal(m.remainingMs,119400);assert.equal(m.pending.remainingMs,900);m.resume();m.advance(899);assert.equal(called,0);m.advance(1);assert.equal(called,1);
m.remainingMs=200;m.wait('feedback',1500,()=>called++);assert.equal(m.advance(300),'expired');assert.equal(called,1);assert.equal(m.state,'timeup');assert.equal(m.pending,null);
m.reset();m.state='game';m.advance(120001,true);assert.equal(m.remainingMs,120000);assert.equal(m.state,'game');
m.reset();m.state='tutorial';m.advance(5000);assert.equal(m.remainingMs,120000);m.state='countdown';m.advance(5000);assert.equal(m.remainingMs,120000);
console.log('PASS: feedback elapsed/resume, deadline priority, external single clock, tutorial/countdown excluded');
