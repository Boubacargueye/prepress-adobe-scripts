/**
 * 4 pages of single-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var topLeft = current
      var topRight = current + 1
      var bottomLeft = current + 2
      var bottomRight = current + 3
      artboard.name = "{0}-{1}-{2}-{3}".format(topLeft + 1, topRight + 1, bottomLeft + 1, bottomRight + 1)
      action(artboard,
        topLeft, topRight,
        bottomLeft, bottomRight)
      current += 4
    })
  }
}

/**
 * 4 pages of double-side layout.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    Collections.forEach(document.artboards, function(artboard) {
      var topLeft, topRight, bottomLeft, bottomRight
      if (isFront) {
        topLeft = current
        topRight = current + 2
        bottomLeft = current + 4
        bottomRight = current + 6
      } else {
        topLeft = current - 1
        topRight = current - 3
        bottomLeft = current + 3
        bottomRight = current + 1
      }
      artboard.name = "{0}-{1}-{2}-{3}".format(topLeft + 1, topRight + 1, bottomLeft + 1, bottomRight + 1)
      action(artboard,
        topLeft, topRight,
        bottomLeft, bottomRight)
      current += 4
      isFront = !isFront
    })
  }
}

/**
 * 4 pages of single-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpSimplexCutStackPager(document, start) {
  var current = start || 0

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var topLeft = current
      var topRight = current + artboards
      var bottomLeft = current + artboards * 2
      var bottomRight = current + artboards * 3
      artboard.name = "{0}-{1}-{2}-{3}".format(topLeft + 1, topRight + 1, bottomLeft + 1, bottomRight + 1)
      action(artboard,
        topLeft, topRight,
        bottomLeft, bottomRight)
      current++
    })
  }
}

/**
 * 4 pages of double-side layout with cut stack flow.
 * @param {Document} document to attach to, use `document` for active document.
 * @param {Number} start first page to open, the first and default is 0.
 */
function FourUpDuplexCutStackPager(document, start) {
  var current = start || 0
  var isFront = true

  /**
   * Iterate artboards.
   * @param {Function} action runnable with pages' index as parameters.
   */
  this.forEachArtboard = function(action) {
    var artboards = document.artboards.length
    Collections.forEach(document.artboards, function(artboard) {
      var topLeft, topRight, bottomLeft, bottomRight
      if (isFront) {
        topLeft = current
        topRight = current + artboards
        bottomLeft = current + artboards * 2
        bottomRight = current + artboards * 3
      } else {
        topLeft = current + artboards
        topRight = current
        bottomLeft = current + artboards * 3
        bottomRight = current + artboards * 2
      }
      artboard.name = "{0}-{1}-{2}-{3}".format(topLeft + 1, topRight + 1, bottomLeft + 1, bottomRight + 1)
      action(artboard,
        topLeft, topRight,
        bottomLeft, bottomRight)
      current++
      isFront = !isFront
    })
  }
}