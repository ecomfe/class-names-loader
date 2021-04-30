/* eslint-disable no-var */
var hasOwn = Object.prototype.hasOwnProperty;

export default function assignLocals(locals, css) {
    for (var style in locals) {
        if (hasOwn.call(locals, style)) {
            try {
                Object.defineProperty(css, style, {value: locals[style]});
            }
            catch (ex) {
                console.warn(
                    'Unable to assign class name "' + style + '" to function, '
                    + 'change your class name or avoid use .' + style + ' from exported object of stylesheets. '
                    + 'See https://github.com/ecomfe/class-names-loader/wiki/Unsafe-class-names for detail.'
                );
            }
        }
    }
}
