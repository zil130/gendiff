import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expected_stylish.txt').trim();
const expectedPlain = readFile('expected_plain.txt').trim();
const expectedJson = readFile('expected_json.txt').trim();
const expectedParse = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: { key: 'value', doge: { wow: '' } },
  },
  group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
  group2: { abc: 12345, deep: { id: 45 } },
};

describe('JSON-files', () => {
  const parseResult = parse(readFile('file1.json'), 'json');
  const diffNoFormatter = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const diffStylish = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const diffPlain = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const diffJson = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');

  test('json parse', () => {
    expect(parseResult).toEqual(expectedParse);
  });

  describe.each([
    [diffNoFormatter, 'no formatter', expectedStylish],
    [diffStylish, 'stylish formatter', expectedStylish],
    [diffPlain, 'plain formatter', expectedPlain],
    [diffJson, 'json formatter', expectedJson],
  ])('', (diff, formatter, expected) => {
    test(`${formatter}`, () => {
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
    });
  });
});

describe('YAML-files', () => {
  const parseResult = parse(readFile('file1.yaml'), 'yaml');
  const diffNoFormatter = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
  const diffStylish = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'stylish');
  const diffPlain = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
  const diffJson = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'json');

  test('yaml parse', () => {
    expect(parseResult).toEqual(expectedParse);
  });

  describe.each([
    [diffNoFormatter, 'no formatter', expectedStylish],
    [diffStylish, 'stylish formatter', expectedStylish],
    [diffPlain, 'plain formatter', expectedPlain],
    [diffJson, 'json formatter', expectedJson],
  ])('', (diff, formatter, expected) => {
    test(`${formatter}`, () => {
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
      expect(diff).toBe(expected);
    });
  });
});
