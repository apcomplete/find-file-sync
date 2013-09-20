var path = require('path')
  , find = require('../index');

describe('find', function() {

  it('should find files', function() {
    var found = find('spec/fixtures', 'test.js');

    expect(found).not.toBeNull();
    expect(found).toEqual(path.join('spec', 'fixtures', 'test.js'));
  });

  it('should ignore excluded directories', function() {
    var found = find('spec/fixtures', 'nested.js', ['ignored']);

    expect(found).not.toBeNull();
    expect(found).toEqual(path.join('spec', 'fixtures', 'nested', 'nested.js'));
  });
});