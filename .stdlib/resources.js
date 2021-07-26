/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var _resourcesLight

/**
 * Refer to a file from `.res` directory.
 * @param {String} name file name with extension.
 * @returns {File}
 */
function getResource(name) {
    if (_resourcesLight === undefined) {
        _resourcesLight = preferences.getString('scripts_theme') === 'Light'
    }
    var lightFile
    if (_resourcesLight) {
        lightFile = new File(libPath + '/../.res-light/' + name)
    }
    return _resourcesLight && lightFile.exists ? lightFile : new File(libPath + '/../.res/' + name)
}