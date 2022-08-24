initTest($)

test("indexOf", function() {
  var a = [1, 2, 3]
  assertEquals(1, Collections.indexOf(a, 2))
})

test("lastIndex", function() {
  var a = [1, 2, 3]
  assertEquals(2, Collections.lastIndex(a))
})

test("isEmpty", function() {
  var a = [1, 2, 3]
  assertTrue(Collections.isEmpty([]))
  assertFalse(Collections.isEmpty(a))
})

test("isNotEmpty", function() {
  var a = [1, 2, 3]
  assertFalse(Collections.isNotEmpty([]))
  assertTrue(Collections.isNotEmpty(a))
})

test("contains", function() {
  var a = [1, 2, 3]
  assertTrue(Collections.contains(a, 2))
  assertFalse(Collections.contains(a, 4))
})

test("distinct", function() {
  var a = Collections.distinct([1, 2, 2, 3, 3, 3])
  assertEquals(1, a[0])
  assertEquals(2, a[1])
  assertEquals(3, a[2])
})

test("forEach", function() {
  var a = [1, 2, 3]
  var result = []
  Collections.forEach(a, function(it) { result.push(it) })
  assertEquals(1, result[0])
  assertEquals(3, result[2])
})

test("forEachReversed", function() {
  var a = [1, 2, 3]
  var result = []
  Collections.forEachReversed(a, function(it) { result.push(it) })
  assertEquals(3, result[0])
  assertEquals(1, result[2])
})