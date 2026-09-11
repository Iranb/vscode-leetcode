const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm');
const bundle=path.join(__dirname, '../resources/interview');
const bank=JSON.parse(fs.readFileSync(path.join(bundle,'interview-bank.json')));
const commands=new Map(), documents=[], messages=[];
let lenses, shown, loggedIn=true;
const directory=fs.mkdtempSync(path.join(require('os').tmpdir(), 'interview-test-'));fs.mkdirSync(directory,{recursive:true});
const uri=p=>({fsPath:p,toString:()=>p});
const vscode={TreeItemCollapsibleState:{None:0,Collapsed:1},Uri:{file:uri},Range:class{},CodeLens:class{constructor(range,command){this.command=command;}},
commands:{registerCommand:(id,f)=>{commands.set(id,f);return {dispose(){}};}},
languages:{registerCodeLensProvider:(filter,p)=>{lenses=p;return {dispose(){}};}},
workspace:{textDocuments:documents,openTextDocument:async x=>{const doc=x.fsPath?{uri:x,getText:()=>fs.readFileSync(x.fsPath,'utf8'),save:async()=>true}:{uri:uri('untitled'),getText:()=>x.content,save:async()=>true};documents.push(doc);return doc;}},
window:{showTextDocument:async doc=>{shown=doc;},showInformationMessage:async t=>messages.push(t),showWarningMessage:async t=>messages.push(t)}};
const exportsModule={};vm.runInNewContext(fs.readFileSync(path.join(bundle,'interview.js'),'utf8'),{exports:exportsModule,require:n=>n==='vscode'?vscode:n==='./interview-bank.json'?bank:require(n)});
const provider={getChildren:e=>e?[]:[{id:loggedIn?'Hot100Random':'notSignIn'}],getTreeItem:e=>({label:e.id})};
exportsModule.attach(provider,{globalStorageUri:uri(directory),subscriptions:[]});
(async()=>{
const roots=provider.getChildren();assert.equal(roots.length,2);const tracks=provider.getChildren(roots[1]);assert.equal(tracks.length,3);
let qa=0,code=0;const ids=new Set();
for(const t of tracks)for(const g of provider.getChildren(t))for(const node of provider.getChildren(g)){
 assert(t.name.endsWith('(120)'));assert(g.name.endsWith(node.question.kind==='qa'?'(100)':'(20)'));
 assert(!ids.has(node.question.id));ids.add(node.question.id);
 const item=provider.getTreeItem(node);assert.equal(item.collapsibleState,0);
 await commands.get(item.command.command)(...item.command.arguments);
 if(node.question.kind==='qa'){qa++;assert(shown.getText().includes(node.question.answer));assert(!shown.getText().includes('undefined'));assert(shown.getText().includes(node.question.sources[0]));}
 else {code++;assert(shown.getText().includes('NotImplementedError'));assert.equal(lenses.provideCodeLenses(shown).length,1);
 const file=shown.uri.fsPath;fs.writeFileSync(file,'# user solution\n');await commands.get('leetcode.interview.open')(node.question.id);assert.equal(shown.getText(),'# user solution\n');
 await commands.get('leetcode.interview.submit')(node.question.id);assert(messages[messages.length - 1].includes('没有上传'));}
}
assert.equal(qa,300);assert.equal(code,60);assert.equal(lenses.provideCodeLenses({uri:uri('/tmp/unrelated.py')}).length,0);
loggedIn=false;assert.equal(provider.getChildren()[0].id,'notSignIn');assert.equal(provider.getChildren()[1].id,'interview:root');
assert.equal(provider.getTreeItem({id:'Hot100Random'}).label,'Hot100Random');
console.log('PASS: 360 unique leaves, 300 answers, 60 templates, preservation of user code, scoped CodeLens, offline roots, submission placeholder and LeetCode delegation');
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>fs.rmSync(directory,{recursive:true,force:true}));
