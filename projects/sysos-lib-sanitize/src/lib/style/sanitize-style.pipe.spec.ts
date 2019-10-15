import { SanitizeStylePipe } from './sanitize-style.pipe';

describe('SanitizeStylePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeStylePipe();
    expect(pipe).toBeTruthy();
  });
});
