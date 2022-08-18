#target Illustrator
#include "../../.lib/commons.js"

var COLOR_MODELS = ["Default", "Grayscale", "Bitmap"]

var BOUNDS_TEXT = [80, 21]
var BOUNDS_EDIT = [200, 21]
var BOUNDS_EDIT_SMALL = [70, 21]

checkHasSelection()

var dialog = new Dialog("Rasterize Each", "resizing-rasterizing-each/#rasterize-each")
var prefill = Collections.first(selection)
var colorModelList, resolutionEdit
var backgroundPanel, backgroundWhiteRadio, backgroundTransparentRadio
var antiAliasingPanel, antiAliasingNoneRadio, antiAliasingArtRadio, antiAliasingTypeRadio
var backgroundBlackCheck, clippingMaskCheck, convertSpotColorsCheck, convertTextToOutlinesCheck, includeLayersCheck, paddingEdit
var recursiveCheck, keepSizeCheck
var prefs = preferences2.resolve("objects/rasterize_each")

dialog.vgroup(function(main) {
  main.hgroup(function(group) {
    group.tooltips("The color model for the rasterization")
    group.staticText(BOUNDS_TEXT, "Color Model:").also(JUSTIFY_RIGHT)
    colorModelList = group.dropDownList(BOUNDS_EDIT, COLOR_MODELS).also(function(it) {
      it.selectText("Default")
    })
  })
  main.hgroup(function(group) {
    group.tooltips("The rasterization resolution in dots-per-inch (dpi)")
    group.staticText(BOUNDS_TEXT, "Resolution:").also(JUSTIFY_RIGHT)
    resolutionEdit = group.editText(BOUNDS_EDIT, "300").also(function(it) {
      it.validateDigits()
      it.activate()
    })
  })
  main.hgroup(function(topGroup) {
    topGroup.alignChildren = "fill"
    topGroup.vgroup(function(innerGroup) {
      innerGroup.alignChildren = "fill"
      backgroundPanel = innerGroup.vpanel("Background", function(panel) {
        panel.alignChildren = "fill"
        panel.tooltips("Should the resulting image use transparency")
        backgroundWhiteRadio = panel.radioButton(undefined, "White")
        backgroundTransparentRadio = panel.radioButton(undefined, "Transparent")
        panel.selectRadioText(prefs.getString("background", "White"))
      })
      antiAliasingPanel = innerGroup.vpanel("Anti-Aliasing", function(panel) {
        panel.alignChildren = "fill"
        panel.tooltips("The type of antialiasing method")
        antiAliasingNoneRadio = panel.radioButton(undefined, "None")
        antiAliasingArtRadio = panel.radioButton(undefined, "Art Optimized")
        antiAliasingTypeRadio = panel.radioButton(undefined, "Type Optimized")
        panel.selectRadioText(prefs.getString("anti_aliasing", "Art Optimized"))
      })
    })
    topGroup.vpanel("Options", function(panel) {
      panel.alignChildren = "fill"
      backgroundBlackCheck = panel.checkBox(undefined, "Against Black Background").also(function(it) {
        it.tooltip("Should rasterize against a black background instead of white")
        it.value = prefs.getBoolean("option1")
      })
      clippingMaskCheck = panel.checkBox(undefined, "Create Clipping Mask").also(function(it) {
        it.tooltip("Should a clipping mask be created for the resulting image")
        it.value = prefs.getBoolean("option2")
      })
      convertSpotColorsCheck = panel.checkBox(undefined, "Convert Spot Colors").also(function(it) {
        it.tooltip("Whether to convert all spot colors to process colors in the resulting image")
        it.value = prefs.getBoolean("option3")
      })
      convertTextToOutlinesCheck = panel.checkBox(undefined, "Convert Text to Outlines").also(function(it) {
        it.tooltip("Should all text be converted to outlines before rasterization")
        it.value = prefs.getBoolean("option4")
      })
      includeLayersCheck = panel.checkBox(undefined, "Include Layers").also(function(it) {
        it.tooltip("Should the resulting image incorporates the layer attributes (such as opacity and blend mode)")
        it.value = prefs.getBoolean("option5")
      })
      panel.hgroup(function(group) {
        group.tooltips("The amount of white space (in points) to be added around the object during rasterization")
        group.staticText(undefined, "Add")
        paddingEdit = group.editText(BOUNDS_EDIT_SMALL, unitsOf("0 mm")).also(VALIDATE_UNITS)
        group.staticText(undefined, "Around Object")
      })
    })
  })
  main.hgroup(function(it) {
    it.alignment = "right"
    recursiveCheck = new RecursiveCheck(it).also(function(it) {
      it.main.value = prefs.getBoolean("recursive")
    })
    keepSizeCheck = new KeepSizeCheck(it).also(function(it) {
      it.main.value = prefs.getBoolean("keep_size")
    })
  })
})
dialog.setCancelButton()
dialog.setDefaultButton(undefined, function() {
  var options = new RasterizeOptions()
  if (colorModelList.selection.text === "Default") {
    options.colorModel = RasterizationColorModel.DEFAULTCOLORMODEL
  } else if (colorModelList.selection.text === "Grayscale") {
    options.colorModel = RasterizationColorModel.GRAYSCALE
  } else {
    options.colorModel = RasterizationColorModel.BITMAP
  }
  options.resolution = parseInt(resolutionEdit.text)
  options.transparency = backgroundTransparentRadio.value
  if (antiAliasingNoneRadio.value) {
    options.antiAliasingMethod = AntiAliasingMethod.None
  } else if (antiAliasingArtRadio.value) {
    options.antiAliasingMethod = AntiAliasingMethod.ARTOPTIMIZED
  } else {
    options.antiAliasingMethod = AntiAliasingMethod.TYPEOPTIMIZED
  }
  options.backgroundBlack = backgroundBlackCheck.value
  options.clippingMask = clippingMaskCheck.value
  options.convertSpotColors = convertSpotColorsCheck.value
  options.convertTextToOutlines = convertTextToOutlinesCheck.value
  options.includeLayers = includeLayersCheck.value
  options.padding = parseUnits(paddingEdit.text)

  var selectQueues = []
  var action = function(item, i) {
    print(i + ". ")
    var width = item.width
    var height = item.height
    var position = item.position
    var newItem = document.rasterize(item, item.geometricBounds, options)
    selectQueues.push(newItem)
    if (keepSizeCheck.isSelected() && item.typename !== "TextFrame") {
      print("Keep size, ")
      newItem.width = width + options.padding * 2
      newItem.height = height + options.padding * 2
      newItem.position = position
    }
    println("Done.")
  }
  if (recursiveCheck.isSelected()) {
    Collections.forEachItem(selection, action)
  } else {
    Collections.forEach(selection, action)
  }
  selection = selectQueues

  prefs.setString("background", backgroundPanel.getSelectedRadioText())
  prefs.setString("anti_aliasing", antiAliasingPanel.getSelectedRadioText())
  prefs.setBoolean("option1", backgroundBlackCheck.value)
  prefs.setBoolean("option2", clippingMaskCheck.value)
  prefs.setBoolean("option3", convertSpotColorsCheck.value)
  prefs.setBoolean("option4", convertTextToOutlinesCheck.value)
  prefs.setBoolean("option5", includeLayersCheck.value)
  prefs.setBoolean("recursive", recursiveCheck.isSelected())
  prefs.setBoolean("keep_size", keepSizeCheck.isSelected())
})
dialog.show()
