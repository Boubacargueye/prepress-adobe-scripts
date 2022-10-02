/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Give Java-like methods namely `values` and `valueOf` for enumeration.
 * There is also `list` for displaying `ListItem` in `DropDownList` or `ListBox`.
 * Every enumeration field must contain property `name` and optionally `image`.
 * @param {Object} object JSON object.
 * @param {Array} separatorIndices array of numbers indicating where ListItem separator should be.
 */
function Enum(object, separatorIndices) {
  checkNotNull(object)
  separatorIndices = getOrDefault(separatorIndices, [])
  for (var key in object) {
    this[key] = object[key]
  }
  this.separatorIndices = separatorIndices || []
}

/**
 * Returns an array of enum fields.
 * @return {Array}
 */
Enum.prototype.values = function() {
  var result = []
  for (var key in this) {
    if (!key.isUpperCase()) {
      continue
    }
    result.push(this[key])
  }
  return result
}

/**
 * Returns an array of for `DropDownList` or `ListBox`.
 * @return {Array}
 */
Enum.prototype.list = function() {
  var result = []
  var withImage = undefined
  var i = 0
  for (var key in this) {
    if (!key.isUpperCase()) {
      continue
    }
    var field = this[key]
    if (withImage === undefined) {
      withImage = field.image !== undefined
    }
    result.push(!withImage ? field.name : [field.name, field.image])
    if (Collections.contains(this.separatorIndices, i++)) {
      result.push(!withImage ? "-" : ["-", undefined])
    }
  }
  return result
}

/**
 * Returns an enum field, given the string or list selection.
 * @return {Array}
 */
Enum.prototype.valueOf = function(name) {
  checkNotNull(name)
  if (name instanceof ListItem) {
    name = name.text
  }
  for (var key in this) {
    if (!key.isUpperCase()) {
      continue
    }
    var field = this[key]
    if (field.name == name) {
      return field
    }
  }
  error("No field with name " + name + " found in this enum")
}
