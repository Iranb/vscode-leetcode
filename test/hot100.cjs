// Exercise compiled production modules without starting a VS Code host.
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');
function load(file, deps) {
    const exports = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../out/src', file), 'utf8'), {
        exports, require: name => { if (name in deps) return deps[name]; throw Error(name); },
    });
    return exports;
}
const vscode = { env: { appName: 'VS Code' }, Uri: { from: x => x },
    EventEmitter: class {}, TreeItemCollapsibleState: { None: 0, Collapsed: 1 } };
const shared = load('shared.js', { vscode });
const nodes = load('explorer/LeetCodeNode.js', { vscode });
const plan = require('../out/src/explorer/hot100');
const ids = plan.hot100Groups.flatMap(g => [...g.ids]);
assert.equal(plan.hot100Groups.length, 17);
assert.equal(ids.length, 100);
assert.equal(new Set(ids).size, 100);
assert.deepStrictEqual([...plan.hot100RandomOrder].sort(), [...ids].sort());
assert.notDeepStrictEqual([...plan.hot100RandomOrder], ids);
let hide = false;
let signedIn = true;
const problems = [...ids, '999999'].map(id => ({ ...shared.defaultProblem, id, name: id,
    state: id === '1' ? shared.ProblemState.AC : shared.ProblemState.Unknown }));
const moduleManager = load('explorer/explorerNodeManager.js', {
    lodash: {}, '../commands/list': { listProblems: async () => problems },
    '../commands/plugin': { getSortingStrategy: () => shared.SortingStrategy.None },
    '../shared': shared, '../utils/settingUtils': { shouldHideSolvedProblem: () => hide },
    './LeetCodeNode': nodes, './hot100': plan,
});
const manager = moduleManager.explorerNodeManager;
const provider = load('explorer/LeetCodeTreeDataProvider.js', {
    os: require('os'), path, vscode, '../shared': shared,
    '../leetCodeManager': { leetCodeManager: { getUser: () => signedIn } },
    './explorerNodeManager': moduleManager, './LeetCodeNode': nodes,
    '../globalState': { globalState: { getUserStatus: () => ({}) } },
}).leetCodeTreeDataProvider;
provider.initialize({ asAbsolutePath: x => x });
(async () => {
    await manager.refreshCache();
    assert.equal(provider.getChildren().length, 7);
    assert.equal(manager.getAllNodes().length, 101);
    const groups = provider.getChildren({ id: 'Hot100' });
    assert.equal(groups.length, 17);
    groups.forEach((g, i) => assert.deepStrictEqual(Array.from(provider.getChildren(g), n => n.id), [...plan.hot100Groups[i].ids]));
    const shuffled = () => provider.getChildren({ id: 'Hot100Random' });
    assert.deepStrictEqual(Array.from(shuffled(), n => n.id), [...plan.hot100RandomOrder]);
    for (const n of shuffled()) {
        assert.strictEqual(n, manager.getNodeById(n.id));
        assert.equal(provider.getTreeItem(n).command.command, 'leetcode.previewProblem');
        assert.strictEqual(provider.getTreeItem(n).command.arguments[0], n);
    }
    assert(provider.getTreeItem({ id: 'Hot100Random', name: 'Random' }).tooltip.includes('Total: 100'));
    await manager.refreshCache();
    assert.deepStrictEqual(Array.from(shuffled(), n => n.id), [...plan.hot100RandomOrder]);
    hide = true;
    await manager.refreshCache();
    assert.deepStrictEqual(Array.from(shuffled(), n => n.id), plan.hot100RandomOrder.filter(id => id !== '1'));
    assert.equal(provider.getChildren(groups[0]).length, 2);
    assert.equal(manager.getChildrenNodesById('Hot100.999').length, 0);
    assert.equal(manager.getChildrenNodesById('Hot100.invalid').length, 0);
    signedIn = false;
    assert.equal(provider.getChildren()[0].id, 'notSignIn');
    console.log('PASS: 100 unique problems, 17 groups, stable shuffle, commands, refresh, hide-solved and sign-in');
})().catch(e => { console.error(e); process.exitCode = 1; });
