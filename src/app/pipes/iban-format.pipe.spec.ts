import {IbanFormatPipe} from './iban-format.pipe';

describe('IbanFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new IbanFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
