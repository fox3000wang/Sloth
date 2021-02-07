import {toLittleCamelCase} from './stringUtil';

test('toLittleCamelCase', () => {
  expect(toLittleCamelCase('hello_world_my_jest'))
  .toBe('helloWorldMyJest');
});

test('toBigCamelCase', () => {
  expect(toLittleCamelCase('hello_world_my_jest'))
  .toBe('HelloWorldMyJest');
});
