initTest($)

test('formatUnits', function() {
  assertTrue('2.5 mm', formatUnits('2.5', UnitType.MM, 1))
  assertTrue('2.55 mm', formatUnits('2.55', UnitType.MM, 2))
})

test('parseUnits', function() {
  assertEquals('7', parseUnits('2.5 mm').round())
})
