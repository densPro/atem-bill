import { BillFormatConverter } from './BillFormatConverter';

describe(BillFormatConverter, () => {
  let converter: BillFormatConverter;
  beforeEach(() => {
    converter = new BillFormatConverter();
  });
  it('should format the bills as espected', () => {
    const expected =
      '6820690011	00006947	383401300574564	25/03/2023	42.00	E0-D4-D2-DB-24';
    const result = converter.convert(
      '6820690011 |00006947|383401300574564|25/03/2023|42.00|42.00|E0-D4-D2-DB-24|12808223|0|0|0|0'
    );
    expect(result).toEqual(expected);
  });
});
