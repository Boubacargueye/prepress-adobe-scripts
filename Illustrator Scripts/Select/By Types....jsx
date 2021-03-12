// Select all items with multiple allowed types.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include '../.lib/commons.js'

var dialog = new Dialog('Select by Types')

var bounds = [0, 0, 115, 15]

dialog.imports = dialog.main.addVPanel('Imports', 'fill')
dialog.imports.row1 = dialog.imports.addHGroup()
dialog.imports.placedCheck = dialog.imports.row1.addCheckBox(bounds, 'Linked file')
dialog.imports.nonNativeCheck = dialog.imports.row1.addCheckBox(bounds, 'Non-native art')
dialog.imports.row2 = dialog.imports.addHGroup()
dialog.imports.rasterCheck = dialog.imports.row2.addCheckBox(bounds, 'Image')
dialog.imports.pluginCheck = dialog.imports.row2.addCheckBox(bounds, 'Plugin')

dialog.paths = dialog.main.addVPanel('Paths', 'fill')
dialog.paths.row1 = dialog.paths.addHGroup()
dialog.paths.pathCheck = dialog.paths.row1.addCheckBox(bounds, 'Path')
dialog.paths.compoundPathCheck = dialog.paths.row1.addCheckBox(bounds, 'Compound path')

dialog.types = dialog.main.addVPanel('Types', 'fill')
dialog.types.row1 = dialog.types.addHGroup()
dialog.types.textFrameCheck = dialog.types.row1.addCheckBox(bounds, 'Text frame')
dialog.types.legacyTextCheck = dialog.types.row1.addCheckBox(bounds, 'Legacy text')

dialog.others = dialog.main.addVPanel('Others', 'fill')
dialog.others.row1 = dialog.others.addHGroup()
dialog.others.symbolCheck = dialog.others.row1.addCheckBox(bounds, 'Symbol')
dialog.others.meshCheck = dialog.others.row1.addCheckBox(bounds, 'Mesh')
dialog.others.row2 = dialog.others.addHGroup()
dialog.others.graphCheck = dialog.others.row2.addCheckBox(bounds, 'Graph')

dialog.setNegativeButton('Cancel')
dialog.setPositiveButton(function() {
    var types = []
    if (dialog.paths.compoundPathCheck.value) types.push('CompoundPathItem')
    if (dialog.others.graphCheck.value) types.push('GraphItem')
    if (dialog.types.legacyTextCheck.value) types.push('LegacyTextItem')
    if (dialog.others.meshCheck.value) types.push('MeshItem')
    if (dialog.imports.nonNativeCheck.value) types.push('NonNativeItem')
    if (dialog.paths.pathCheck.value) types.push('PathItem')
    if (dialog.imports.placedCheck.value) types.push('PlacedItem')
    if (dialog.imports.pluginCheck.value) types.push('PluginItem')
    if (dialog.imports.rasterCheck.value) types.push('RasterItem')
    if (dialog.others.symbolCheck.value) types.push('SymbolItem')
    if (dialog.types.textFrameCheck.value) types.push('TextFrame')
    selectAll(types)
})
dialog.show()