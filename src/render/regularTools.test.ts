import { removeComment } from './regularTools';

test('removeComment', () => {
  expect(removeComment('<#-- just test remove comment --> '))
  .toBe('');
});

