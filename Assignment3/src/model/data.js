/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/
/*
#######################################################################
# DO NOT MODIFY THIS FILE
#######################################################################
*/
import Leaf from './Leaf';
import Branch from './Branch';

// Generates a lint error which will go away when you use it
const data = [
  new Branch('97a09cf8-16a8-4829-851f-40aef9150dd8', 'Folder 1', [
    new Leaf('b6f9ab35-4877-4eb1-b77c-a08ab33e977f', 'File 1'),
    new Leaf('b7b01a45-431d-40c4-b3f3-64502646cfea', 'File 2'),
    new Leaf('09715229-f003-4295-bb92-631a6828630a', 'File 3'),
    new Branch('3b7b83ae-b491-49f4-9c12-e6d7ab047212', 'Folder 2', [
      new Leaf('a38f4b60-f54a-4a7e-ac56-f1316c7647ae', 'File 4', true),
      new Leaf('087a1fb0-f0fd-44de-9b87-ab67e8f66cc7', 'File 5'),
      new Leaf('8007f70d-d20e-42c4-87ad-0b52a9ff7a0b', 'File 6', true, true),
    ]),
  ]),
  new Leaf('3c671ff7-8ec1-4999-a574-3596fe4cc477', 'File 7'),
  new Leaf('a47771a1-f101-4443-96bb-4605208c4fd2', 'File 8', true, true),
  new Leaf('3e067e9a-23e3-49fb-9b63-81ca28f2c97c', 'File 9', true),
  new Leaf('445a8071-32e9-491b-afca-0185e7696842', 'File 10'),
  new Branch('7f646bab-ad29-4dc9-a079-8297e28b337f', 'Folder 3', [
    new Leaf('d2c1ca2e-5c5e-4551-a7a4-e95599ec9713', 'File 11'),
    new Leaf('b2c852f4-8674-4521-87b5-aa83eaac8c18', 'File 12'),
  ], true, true, true),
  new Leaf('f803bc0b-fea1-401a-9dec-d8e2c4fb9fe8', 'File 13'),
  new Leaf('c16ae54d-ec52-403c-b1f9-a567124d84f4', 'File 14', true, true),
];

export default data;
