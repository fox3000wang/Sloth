import path from 'path';
import {
    toLittleCamelCase,
    toBigCamelCase,
    toLineCase,
    removeComment,
    fileToString
} from '../../src/utils/stringUtil';


test('toLittleCamelCase', () => {
  expect(toLittleCamelCase('hello_world_my_jest'))
  .toBe('helloWorldMyJest');
});

test('toBigCamelCase', () => {
  expect(toBigCamelCase('hello_world_my_jest'))
  .toBe('HelloWorldMyJest');
});

test('toLineCase', () => {
  expect(toLineCase('HelloWorldMyJest'))
  .toBe('hello_world_my_jest');
});

test('removeComment', () => {
  expect(removeComment('<#-- just test remove comment --> '))
  .toBe('');
});

test('fileToString', () => {
  const url = path.join(__dirname, 'file.test.txt');
  expect(fileToString(url))
  .toBe(`just test the 'fileToString'`);
})
