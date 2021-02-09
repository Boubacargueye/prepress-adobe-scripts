// Relink all selected PlacedItem with the same file name to different folder.
// Only tested on images, not documents.

#target Illustrator
#include '../.lib/commons.js'
#include '../.lib/picker.js'

checkHasSelection()
var items = selection.mapItemNotNull(function(it) {
    return it.typename == 'PlacedItem'
        ? it
        : null
})
check(items.isNotEmpty(), 'No links found in selection.')

var dialog = new Dialog("Change Links' Folder")
dialog.picker = new Picker(dialog.main, [0, 0, 45, 21], dialog.title, null, true)

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    items.forEach(function(item) {
        item.relink(dialog.picker.file.getFiles()
            .filter(function(file) { return file.name == item.file.name })
            .first())
    })
})
dialog.show()