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
    const assignModule = loaderUtils.stringifyRequest(
        this,
        `!${path.join(__dirname, 'assign.js')}`
    );
    this.cacheable();

    const remaining = loaderUtils.stringifyRequest(this, '!!' + remainingRequest);

    return `
        // class-names-loader generated code for ${this.resourcePath}
        import classNames from ${loaderUtils.stringifyRequest(this, '!' + dependency)};
        import ${options.namedImport ? '* as locals' : 'locals'} from ${remaining};
        import assign from ${assignModule};

        var css = classNames.bind(locals);
        assign(locals, css);

        export default css;
    `;
};


module.exports = classNamesLoader;
