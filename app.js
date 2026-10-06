import { complexes, apartments } from './data.js';
import { createCard, createRow } from './render.js';

const zhk = document.getElementById('zhk');
complexes.forEach(item => zhk.append(createCard(item)));

const apts = document.getElementById('apt-body');
apartments.forEach(item => apts.append(createRow(item)));