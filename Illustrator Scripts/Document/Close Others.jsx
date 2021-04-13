// Close other tabs without saving.

#target Illustrator
#include '../.lib/commons.js'

check(app.documents.length != 1, 'No other tabs')

if (confirm('Close all other documents without saving?', undefined, 'Close Others')) {
    for (var i = 0; i < app.documents.length; i++) {
        if (app.documents[i] == document) {
            continue
        }
        app.documents[i].close(SaveOptions.DONOTSAVECHANGES)
        i--
    }
}