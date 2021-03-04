#include 'collections.js'
#include 'files.js'
#include 'preconditions.js'
#include 'strings.js'
#include 'sui-dialog.js'
#include 'sui-validator.js'
#include 'sui.js'

/** Returns true if this script is running on macOS. */
function isMacOS() { return $.os.toLowerCase().indexOf('mac') >= 0 }

/**
 * Returns true if value is integer or decimal.
 * @param {String} value text to check.
 */
function isNumeric(value) { return /^-{0,1}\d*\.{0,1}\d+$/.test(value) }

/**
 * Iterate n times with provided action.
 * @param {Number} times n times to execute.
 * @param {Function} action runnable to execute.
 */
function repeat(times, action) {
    for (var i = 0; i < times; i++) {
        action(i)
    }
}