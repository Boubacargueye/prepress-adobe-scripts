/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Returns true if both files point to the same location.
 * @return {Boolean}
 */
File.prototype.equalTo = function(other) { return this.absoluteURI === checkNotNull(other).absoluteURI }

/**
 * Returns file name without extension.
 * @return {String}
 */
File.prototype.getNameWithoutExtension = function() { return unescape(this.name).substringBeforeLast(".") }

/**
 * Returns file extension in lower-case without `.`.
 * @return {String}
 */
File.prototype.getExtension = function() { return unescape(this.name).substringAfterLast(".").toLowerCase() }

/**
 * Returns true if this file is PDF type, and should be opened with `PDFFileOptions`.
 * Non-template Illustrator files are PDF-compatible.
 * @return {Boolean}
 */
File.prototype.isPdf = function() { return this.getExtension().let(function(it) { return it == "ai" || it == "pdf" }) }

/**
 * Reads the file content as a string.
 * @param {String} charset default is `UTF-8`.
 * @return {String}
 */
File.prototype.readText = function(charset) {
  charset = getOrDefault(charset, "UTF-8")
  return this.use("r", function(it) {
    it.charset = charset
    return it.read()
  })
}

/**
 * Writes string content to file.
 * @param {String} charset default is `UTF-8`.
 */
File.prototype.writeText = function(text, charset) {
  charset = getOrDefault(charset, "UTF-8")
  this.use("w", function(it) {
    it.charset = charset
    it.write(text)
  })
}

/**
 * Executes the given block function on this resource and then closes it down.
 * @param {String} openArg either 'r' or 'w', for read or write access.
 * @param {Function} block action with return value.
 * @return {Object}
 */
File.prototype.use = function(openArg, block) {
  checkNotNull(openArg)
  checkNotNull(block)
  this.open(openArg)
  this.lineFeed = "Unix"
  var result = block(this)
  this.close()
  return result
}
