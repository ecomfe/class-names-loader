const compiler = require('./compiler');

test('default options', async () => {
    const result = await compiler();
    expect(result.warnings.length).toBe(0);
});

test('named import and export', async () => {
    const result = await compiler({namedImport: true}, {namedExport: true});
    expect(result.warnings.length).toBe(0);
});

test('unmatched loader options', async () => {
    const result = await compiler({namedImport: false}, {namedExport: true});
    expect(result.warnings.length).toBeGreaterThan(0);
});

test('custom classnames', async () => {
    const result = await compiler({classNamesModule: require.resolve('./customClassNames')});
    expect(result.warnings.length).toBe(0);
    expect(result.modules.some(m => m.name.includes('customClassNames'))).toBe(true);
});
