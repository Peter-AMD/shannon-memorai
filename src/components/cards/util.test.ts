import {
  getImagesName,
  doubleArray,
  fisherYatesShuffleArray,
  arrayToCardObject,
} from './util';

const arrayString = ['1', '2', '3'];

describe('getImagesName', () => {
  test('returns array of stringed numbers from 1-9', () => {
    const result = getImagesName();
    const expected = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    expect(result).toEqual(expected);
  });
});

describe('doubleArray', () => {
  test('should duplicate and double the array passed as arguments', () => {
    const result = doubleArray(arrayString);
    const expected = ['1', '2', '3', '1', '2', '3'];

    expect(result).toEqual(expected);
  });
});

describe('fisherYatesShuffleArray', () => {
  test('should randomized array positions passed', () => {
    const longArray = [
      ...arrayString,
      ...arrayString,
      ...arrayString,
      ...arrayString,
    ];
    const result = fisherYatesShuffleArray(longArray);

    expect(result).not.toEqual(longArray);
  });
});

describe('arrayToCardObject', () => {
  test('should return array with new object as props', () => {
    const result = arrayToCardObject(arrayString);
    const expected = [
      {
        key: 0,
        matched: false,
        name: '1',
        open: false,
      },
      {
        key: 1,
        matched: false,
        name: '2',
        open: false,
      },
      {
        key: 2,
        matched: false,
        name: '3',
        open: false,
      },
    ];

    expect(result).toEqual(expected);
  });
});
