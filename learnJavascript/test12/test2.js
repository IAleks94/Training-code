describe("pow", function() {
  it(`Возводит 5 в степень 1 будет 5`, function() {
    assert.equal(pow(5, 1), 5);
  });

  it.only(`Возводит 5 в степень 2 будет 25`, function() {
    assert.equal(pow(5, 2), 25);
  });

  it(`Возводит 5 в степень 3 будет 125`, function() {
    assert.equal(pow(5, 3), 125);
  });
});
