/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Set tooltip to this children.
 * @param {String|Object} text tips to display.
 */
Image.prototype.tooltip = function(text) { Internals.setTooltip(this, Internals.stringOrResources(text)) }

/**
 * Add children to group.
 * @param {Array} size optional size or bounds.
 * @param {String} file optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {Image}
 */
Group.prototype.image = function(size, file, properties) {
  return _image(this, size, file, properties)
}

/**
 * Add children to panel.
 * @param {Array} size optional size or bounds.
 * @param {String} file optional image source.
 * @param {Object} properties optional extra properties.
 * @returns {Image}
 */
Panel.prototype.image = function(size, file, properties) {
  return _image(this, size, file, properties)
}

function _image(root, size, file, properties) {
  var child = root.add("image", Internals.sizeOrBounds(size), Internals.imageOrResources(file), properties)
  if (root.helpTips !== undefined) {
    Internals.setTooltip(child, root.helpTips)
  }
  return child
}
