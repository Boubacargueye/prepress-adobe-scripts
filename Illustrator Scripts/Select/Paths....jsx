// Select all PathItem with attributes matching user input.
// When there are active selection, will only select items within those selection.

#target Illustrator
#include "../.lib/commons.js"

function listYesNo() { return [R.string.yes, R.string.no] }

var SIZE_INPUT = [110, 21]

check(Collections.isNotEmpty(document.pathItems), "No paths in this document")
var isFilterMode = Collections.isNotEmpty(selection)

var dialog = new Dialog(R.string.select_paths, "selecting-items/#select-paths")
var fillColorList, fillOverprintList
var strokeColorList, strokeWeightEdit, strokeDashedList, strokeOverprintList
var dimensionPanel
var clippingList, closedList, guidesList
var recursiveCheck
var config = configs.resolve("select/paths")

dialog.hgroup(function(main) {
  main.alignChildren = "fill"
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vpanel(R.string.fill, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_fillcolor)
        group.leftStaticText(undefined, R.string.color)
        fillColorList = group.dropDownList(SIZE_INPUT, Colors.list())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_filloverprint)
        group.leftStaticText(undefined, R.string.overprint)
        fillOverprintList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
    })
    topGroup.vpanel(R.string.stroke, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_strokecolor)
        group.leftStaticText(undefined, R.string.color)
        strokeColorList = group.dropDownList(SIZE_INPUT, Colors.list())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_strokeweight)
        group.leftStaticText(undefined, R.string.weight)
        strokeWeightEdit = group.editText(SIZE_INPUT).also(function(it) {
          it.validateUnits()
          it.activate()
        })
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_strokedashed)
        group.leftStaticText(undefined, R.string.dashed)
        strokeDashedList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_strokeoverprint)
        group.leftStaticText(undefined, R.string.overprint)
        strokeOverprintList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
    })
  })
  main.vgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    dimensionPanel = new SelectDimensionPanel(topGroup, SIZE_INPUT)
    topGroup.vpanel(R.string.others, function(panel) {
      panel.alignChildren = "right"
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_clipping)
        group.leftStaticText(undefined, R.string.clipping)
        clippingList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_closed)
        group.leftStaticText(undefined, R.string.closed)
        closedList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
      panel.hgroup(function(group) {
        group.tooltips(R.string.tip_selectpaths_guides)
        group.leftStaticText(undefined, R.string.guides)
        guidesList = group.dropDownList(SIZE_INPUT, listYesNo())
      })
    })
    if (isFilterMode) {
      recursiveCheck = new RecursiveCheck(topGroup).also(function(it) {
        it.alignment = "right"
        it.value = config.getBoolean("recursive")
      })
    }
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var fillColor = fillColorList.hasSelection() ? parseColor(fillColorList.selection.text) : undefined
  var fillOverprint = fillOverprintList.hasSelection() ? fillOverprintList.selection.text === getString(R.string.yes) : undefined
  var strokeColor = strokeColorList.hasSelection() ? parseColor(strokeColorList.selection.text) : undefined
  var strokeWeight = parseUnits(strokeWeightEdit.text)
  var strokeDashed = strokeDashedList.hasSelection() ? strokeDashedList.selection.text === getString(R.string.yes) : undefined
  var strokeOverprint = strokeOverprintList.hasSelection() ? strokeOverprintList.selection.text === getString(R.string.yes) : undefined
  var width = dimensionPanel.getWidth()
  var height = dimensionPanel.getHeight()
  var clipping = clippingList.hasSelection() ? clippingList.selection.text === getString(R.string.yes) : undefined
  var closed = closedList.hasSelection() ? closedList.selection.text === getString(R.string.yes) : undefined
  var guides = guidesList.hasSelection() ? guidesList.selection.text === getString(R.string.yes) : undefined
  selectAll(["PathItem"], function(item) {
    if (width !== undefined && parseInt(width) !== parseInt(item.width)) return false
    if (height !== undefined && parseInt(height) !== parseInt(item.height)) return false
    if (clipping !== undefined && clipping !== item.clipping) return false
    if (closed !== undefined && closed !== item.closed) return false
    if (guides !== undefined && guides !== item.guides) return false
    if (fillColor !== undefined && !isColorEqual(fillColor, item.fillColor)) return false
    if (fillOverprint !== undefined  && fillOverprint !== item.fillOverprint) return false
    if (strokeColor !== undefined && !isColorEqual(strokeColor, item.strokeColor)) return false
    if (strokeWeight !== undefined && parseInt(strokeWeight) !== parseInt(item.strokeWidth)) return false
    if (strokeDashed !== undefined && strokeDashed !== Collections.isNotEmpty(item.strokeDashes)) return false
    if (strokeOverprint !== undefined && strokeOverprint !== item.strokeOverprint) return false
    return true
  }, isFilterMode && recursiveCheck.value)

  if (isFilterMode) config.setBoolean("recursive", recursiveCheck.value)
})
dialog.show()
