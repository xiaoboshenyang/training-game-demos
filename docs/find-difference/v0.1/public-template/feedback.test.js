import assert from 'node:assert/strict';
import {buildFeedbackBadge} from './feedback.js';
for(const scoreDelta of [10,20,80,0.5]){
 const html=buildFeedbackBadge({correct:true,scoreDelta});
 assert.ok(html.includes(`+${scoreDelta}<small>分`));assert.ok(html.includes('完成了！'));
}
for(const scoreDelta of [undefined,null,0,-1,NaN,Infinity,'20','<img>'])assert.ok(!buildFeedbackBadge({correct:true,scoreDelta}).includes('score-award'));
assert.ok(!buildFeedbackBadge({correct:false,scoreDelta:20}).includes('score-award'));
assert.ok(buildFeedbackBadge({correct:false,scoreDelta:20}).includes('没关系，我们换一题'));
assert.ok(!buildFeedbackBadge({correct:true,scoreDelta:20,tutorial:true}).includes('score-award'));
console.log('PASS: actual award, no-award, tutorial, failure and invalid score display');
