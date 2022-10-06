/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

/**
 * Construct a new palette.
 * @param {number} stop
 * @param {?string|Object=} status starting message.
 */
function ProgressPalette(stop, status) {
  status = (status || getString(R.string.please_wait)) + '...'

  var self = new Window('palette', R.string.please_wait)
  self.orientation = 'column'
  self.statusText, self.countText, self.progressBar

  Internals.addGroup(self, 'row', function(group) {
    group.alignment = 'fill'

    self.statusText = group.staticText(undefined, status /* initial */).also(function(it) {
      it.alignment = ['left', 'center']
      it.justify = 'left'
    })
    self.countText = group.staticText(undefined, '0/' + stop).also(function(it) {
      it.alignment = ['right', 'center']
      it.justify = 'right'
    })
  })
  self.progressBar = Internals.addSlider(self, [400, 21], 0, 0, stop) // progressbar won't update in palette, use slider instead

  /**
   * Add progression to dialog with optional status.
   * @param {!Array<*>} arguments
   */
  self.increment = function() {
    if (Collections.isNotEmpty(arguments)) {
      self.statusText.text = Array.prototype.shift.call(arguments)
      self.statusText.text = Internals.formatString(self.statusText.text, arguments) + '...'
    }
    self.progressBar.value++
    self.countText.text = self.progressBar.value + '/' + stop
    if (self.progressBar.value < stop) {
      self.update()
    } else {
      self.close()
    }
  }

  // show dialog on creation
  self.show()
  if (dialog !== undefined) {
    self.location = [
      dialog.location.x + (dialog.bounds.width - self.bounds.width) / 2,
      dialog.location.y - 130
    ]
  }

  return self
}
