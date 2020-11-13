# class-names-loader

Webpack loader to transform style into classNames bindings.

Inspired by [itsmepetrov/classnames-loader](https://github.com/itsmepetrov/classnames-loader) and have a total written to introduce features and breaking changes like:

1. Written in TypeScript.
2. Support `style-loader`'s `esModule` format only.
3. Compatible both default export and named export.
4. Drop support for IE < 9 to minimize output code.
5. Produce ES module code to enable optimizations like module concatenation.

We will keep active maintain.

## Install

```shell
npm install -D class-names-loader
```

## Usage

A traditional webpack configuration looks like:

```js
{
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'class-names-loader',
                        options: {
                            // options
                        },
                    },
                    {
                        loader: 'style-loader',
                        modules: true,
                    },
                    {
                        loader: 'css-loader',
                        modules: true,
                    },
                ],
            },
        ],
    },
}
```

`style-loader >= 2` enables `esModule` option by default, and it must be enabled when combine with `class-names-loader`.

### Options

```ts
interface Options {
    // Custom classnames module path, by default it imports `classnames`
    classNamesModule?: string;
    // Use named import from style-loader
    namedImport?: boolean;
}
```

#### Custom classnames

By default we require `classnames` module to be installed and import it, you can also install a custom module and pass it's module path to `classNameModule` option.

This is especially useful when you create a custom build tool and want to encapsulate `classnames` inside this tool:

```js
// Build tool with class-names-loader and classnames installed locally
{
    loader: require.resolve('class-names-loader'),
    options: {
        classNamesModule: require.resolve('classnames'),
    },
}
```

### Named import

If you have `namedExport` option enabled in `style-loader`, you should also enable `namedImport` option to make it compatible.
