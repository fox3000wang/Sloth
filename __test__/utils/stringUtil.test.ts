import { toLittleCamelCase, toBigCamelCase, toLineCase } from '../../src/utils/stringUtil';

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
