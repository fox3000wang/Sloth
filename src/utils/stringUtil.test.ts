import {toLittleCamelCase, toBigCamelCase} from './stringUtil';

test('toLittleCamelCase', () => {
  expect(toLittleCamelCase('hello_world_my_jest'))
  .toBe('helloWorldMyJest');
});

test('toBigCamelCase', () => {
  expect(toBigCamelCase('hello_world_my_jest'))
  .toBe('HelloWorldMyJest');
});
