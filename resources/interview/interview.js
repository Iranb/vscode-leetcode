'use strict';
// Local interview bank integration. No remote services or LeetCode submission IDs.
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const bank = require('./interview-bank.json');
const prefix = 'interview:';
function attach(provider, context) {
    const all = new Map(bank.tracks.flatMap(t => t.questions.map(q => [q.id, q])));
    const originalChildren = provider.getChildren.bind(provider);
    const originalItem = provider.getTreeItem.bind(provider);
    const directory = path.join(context.globalStorageUri.fsPath, 'interview-practice');
    const fileFor = q => path.join(directory, q.id + '.py');
    const root = { id: prefix + 'root', name: '岗位面试 · CV / ML / Agent Harness' };
    provider.getChildren = function (element) {
        if (!element) {
            const result = originalChildren(element);
            const merge = nodes => [...(nodes || []), root];
            return result && typeof result.then === 'function' ? result.then(merge) : merge(result);
        }
        if (element.id === root.id) return bank.tracks.map(t => ({ id: prefix + t.id, name: t.name + ` (${t.questions.length})` }));
        if (element.id && element.id.startsWith(prefix)) {
            const key = element.id.slice(prefix.length);
            const track = bank.tracks.find(t => t.id === key);
            if (track) return ['qa', 'code'].map(kind => ({ id: prefix + key + '/' + kind, name: (kind === 'qa' ? '问答 · 基础答案' : '手写代码') + ` (${track.questions.filter(q => q.kind === kind).length})` }));
            const [trackId, kind] = key.split('/');
            const group = bank.tracks.find(t => t.id === trackId);
            if (group && (kind === 'qa' || kind === 'code')) return group.questions.filter(q => q.kind === kind).map(q => ({ id: prefix + q.id, name: q.id + ' ' + q.title, question: q }));
            return [];
        }
        return originalChildren(element);
    };
    provider.getTreeItem = function (element) {
        if (!element.id || !element.id.startsWith(prefix)) return originalItem(element);
        return { label: element.name, id: element.id,
            collapsibleState: element.question ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed,
            contextValue: 'interview-local',
            command: element.question ? { command: 'leetcode.interview.open', title: '打开面试题', arguments: [element.question.id] } : undefined };
    };
    const question = id => { const q = all.get(id); if (!q) throw new Error('未知面试题'); return q; };
    context.subscriptions.push(vscode.commands.registerCommand('leetcode.interview.open', async id => {
        const q = question(id);
        if (q.kind === 'qa') {
            const text = `# ${q.id} ${q.title}\n\n## 基础答案\n\n${q.answer}\n\n${q.followUp ? "## 面试追问\n\n" + q.followUp + "\n\n" : ""}## 延伸阅读\n\n${q.sources.map(s => '- ' + s).join('\n')}\n\n原创练习题；答案为基础要点，并非唯一标准答案。\n`;
            const doc = await vscode.workspace.openTextDocument({ language: 'markdown', content: text });
            await vscode.window.showTextDocument(doc, { preview: true });
        } else {
            fs.mkdirSync(directory, { recursive: true });
            const file = fileFor(q);
            const text = `# ${q.id} ${q.title}\n# ${q.prompt}\n# 验收示例：${q.example}\n# 提交入口尚未接入判题，不会发送到力扣。\n\n${q.template}`;
            try { fs.writeFileSync(file, text, { flag: 'wx' }); } catch (e) { if (e.code !== 'EEXIST') throw e; }
            await vscode.window.showTextDocument(await vscode.workspace.openTextDocument(vscode.Uri.file(file)), { preview: false });
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('leetcode.interview.submit', async id => {
        const q = question(id);
        if (q.kind !== 'code') return;
        const uri = vscode.Uri.file(fileFor(q));
        const doc = vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());
        if (doc && !(await doc.save())) {
            await vscode.window.showWarningMessage('文件未能保存，请先保存后重试。'); return;
        }
        await vscode.window.showInformationMessage('提交入口已预留，暂未接入判题服务；本次没有上传或判定通过。');
    }));
    context.subscriptions.push(vscode.languages.registerCodeLensProvider({ language: 'python', scheme: 'file' }, {
        provideCodeLenses(document) {
            if (path.dirname(document.uri.fsPath) !== directory) return [];
            const q = all.get(path.basename(document.uri.fsPath, '.py'));
            if (!q || q.kind !== 'code') return [];
            return [new vscode.CodeLens(new vscode.Range(0, 0, 0, 0), {
                title: '提交（预留，未接入判题）', command: 'leetcode.interview.submit', arguments: [q.id],
            })];
        },
    }));
}
exports.attach = attach;
