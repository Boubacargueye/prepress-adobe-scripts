/*
<javascriptresource>
<menu>hide</menu>
</javascriptresource>
*/

var ABOUT_THEMES = ['Dark', 'Light']

var BOUNDS_ABOUT_TAB = [400, 75]
var MARGINS_ABOUT_TAB = [10, 0, 10, 0]

function AboutTabbedPanel(parent, clientDate) {
    var self = this
    this.statusText, this.downloadButton

    this.main = parent.tabbedPanel(function(tabbedPanel) {
        tabbedPanel.vtab('Preferences', function(tab) {
            tab.preferredSize = BOUNDS_ABOUT_TAB
            tab.margins = MARGINS_ABOUT_TAB
            tab.alignChildren = 'left'
            tab.hgroup(function(group) {
                group.tips("Defines what icon color to be used.\nThe script is dumb and can't yet know UI brightness setting across apps.")
                group.staticText(undefined, 'Theme:', 'right')
                group.dropDownList(undefined, ABOUT_THEMES).also(function(it) {
                    var theme = preferences.getString('scripts_theme')
                    if (theme !== undefined && theme !== '') {
                        it.selectText(theme)
                    }
                    it.onChange = function() {
                        preferences.setString('scripts_theme', it.selection.text)
                    }
                })
            })
        })
        tabbedPanel.vtab('Updates', function(tab) {
            tab.preferredSize = BOUNDS_ABOUT_TAB
            tab.margins = MARGINS_ABOUT_TAB
            tab.alignChildren = 'left'
            self.statusText = tab.staticText([400, 21], 'Click Check Updates to fetch data.')
            tab.hgroup(function(group) {
                group.button(undefined, 'Check Updates').also(function(it) {
                    it.maximumSize.height = 21
                    it.onClick = function() {
                        executeScript('check_updates')
                        $.sleep(3000)
                        var result = new File('~/prepress-adobe-scripts')
                        if (!result.exists) {
                            self.statusText.text = 'Unable to fetch data.'
                        } else {
                            var serverDate = parseDate(result.readLine().substringAfter('"date": "').substringBefore('"').substring(0, 10))
                            result.remove()
                            if (serverDate > clientDate) {
                                self.statusText.text = 'Latest version ' + serverDate.toISOString() + ' is available.'
                                self.downloadButton.enabled = true
                            } else {
                                self.statusText.text = 'You have the latest version.'
                            }
                        }
                    }
                })
                self.downloadButton = group.button(undefined, 'Download').also(function(it) {
                    it.maximumSize.height = 21
                    it.enabled = false
                    it.onClick = function() {
                        openURL(URL_GITHUB + '/archive/refs/heads/main.zip')
                    }
                })
            })
        })
        tabbedPanel.vtab('Licensing', function(tab) {
            tab.editText(BOUNDS_ABOUT_TAB,
                'Copyright 2021 Hendra Anggrian' +
                '\n' +
                '\nLicensed under the Apache License, Version 2.0 (the "License");' +
                '\nyou may not use this file except in compliance with the License.' +
                '\nYou may obtain a copy of the License at' +
                '\n' +
                '\n    http://www.apache.org/licenses/LICENSE-2.0' +
                '\n' +
                '\nUnless required by applicable law or agreed to in writing, software' +
                '\ndistributed under the License is distributed on an "AS IS" BASIS,' +
                '\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.' +
                '\nSee the License for the specific language governing permissions and'+
                '\nlimitations under the License.',
                { multiline: true, readonly: true, scrollable: true })
        })
    })
}