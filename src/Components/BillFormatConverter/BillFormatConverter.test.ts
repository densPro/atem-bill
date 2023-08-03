import { BillFormatConverter } from './BillFormatConverter';

// npx jest BillFormatConverter

describe(BillFormatConverter, () => {
  let converter: BillFormatConverter;
  beforeEach(() => {
    converter = new BillFormatConverter();
  });

  it('should format the bills as espected', () => {
    const expected =
      '6820690011	3495	383401300574564	25/03/2023	42.00	E0-D4-D2-DB-24';
    const result = converter.convert(
      '6820690011 |3495|383401300574564|25/03/2023|42.00|42.00|E0-D4-D2-DB-24|12808223|0|0|0|0'
    );
    expect(result).toEqual(expected);
  });

  it('should remove unneeded Zeros from bill number', () => {
    // bill number is 00000003 should be converted to just 3
    const expected =
      '6465612012	3	387401300666441	24/06/2023	34.00	13-6E-27-99-58';
    const result = converter.convert(
      '6465612012|00000003|387401300666441|24/06/2023|34.00|34.00|13-6E-27-99-58|12808223|0.00|0.00|0.00|0.00'
    );
    expect(result).toEqual(expected);
  });

  it('should not remove needed Zeros from bill number', () => {
    // bill number is 00000050 should be converted to just 50
    const expected =
      '6465612012	50	387401300666441	24/06/2023	34.00	13-6E-27-99-58';
    const result = converter.convert(
      '6465612012|00000050|387401300666441|24/06/2023|34.00|34.00|13-6E-27-99-58|12808223|0.00|0.00|0.00|0.00'
    );
    expect(result).toEqual(expected);
  });
});
