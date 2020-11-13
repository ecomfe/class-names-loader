import path from 'path';
import {loader} from 'webpack';
import loaderUtils from 'loader-utils';

export interface Options {
    classNamesModule?: string;
    namedImport?: boolean;
}

type InternalOptions = Required<Options>;

const getOptions = (context: loader.LoaderContext): InternalOptions => {
    const {
        classNamesModule = 'classnames',
        namedImport = false,
    } = loaderUtils.getOptions(context) as Options;
    return {classNamesModule, namedImport};
};

const resolveClassNamesBind = (target: string) => {
    const directory = path.extname(target) ? path.dirname(target) : target;
    return `${directory}/bind`;
};

/* istanbul ignore next */
const classNamesLoader: loader.Loader = function classNamesLoader(source, map) {
    this.callback(null, source, map);
};

classNamesLoader.pitch = function classNamesLoaderPitch(remainingRequest) {
    const options = getOptions(this);
    const dependency = resolveClassNamesBind(options.classNamesModule);
    this.cacheable();
    this.addDependency(dependency);

    const remaining = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);

    return `
        // class-names-loader generated code for ${this.resourcePath}
        import classNames from ${loaderUtils.stringifyRequest(this, '!' + dependency)};
        import ${options.namedImport ? '* as locals' : 'locals'} from ${remaining};

        const hasOwn = Object.prototype.hasOwnProperty;

        const css = classNames.bind(locals);
        for (var style in locals) {
            if (hasOwn.call(locals, style)) {
                Object.defineProperty(css, style, {value: locals[style]});
            }
        }

        export default css;
    `;
};


module.exports = classNamesLoader;
