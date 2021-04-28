var SELECTED = function(toggle) { toggle.value = true }

/** 
 * Add check box to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {CheckBox}
 */
Dialog.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this.main, bounds, text, configuration, properties)
}

/** 
 * Add check box to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {CheckBox}
 */
Group.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this, bounds, text, configuration, properties)
}

/** 
 * Add check box to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {CheckBox}
 */
Panel.prototype.checkBox = function(bounds, text, configuration, properties) {
    return _checkBox(this, bounds, text, configuration, properties)
}

function _checkBox(parent, bounds, text, configuration, properties) {
    var checkBox = parent.add('checkbox', _expandBounds(bounds), text, properties)
    if (parent.helpTips !== undefined) {
        checkBox.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(checkBox)
    }
    return checkBox
}

/** 
 * Add radio button to dialog.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {RadioButton}
 */
 Dialog.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this.main, bounds, text, configuration, properties)
}

/** 
 * Add radio button to group.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {RadioButton}
 */
Group.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

/** 
 * Add radio button to panel.
 * @param {Bounds} bounds size of this object, may be null.
 * @param {String} text text to display.
 * @param {Function} configuration optional setup after creation.
 * @param {String} properties optional setup before creation.
 * @return {RadioButton}
 */
Panel.prototype.radioButton = function(bounds, text, configuration, properties) {
    return _radioButton(this, bounds, text, configuration, properties)
}

function _radioButton(parent, bounds, text, configuration, properties) {
    var radioButton = parent.add('radiobutton', _expandBounds(bounds), text, properties)
    if (parent.helpTips !== undefined) {
        radioButton.helpTip = parent.helpTips
    }
    if (configuration !== undefined) {
        configuration(radioButton)
    }
    return radioButton
}