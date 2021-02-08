import { removeComment } from '../../src/render/regularTools';

test('removeComment', () => {
  expect(removeComment('<#-- just test remove comment --> '))
  .toBe('');
});

