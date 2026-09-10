/* Order memory and single-order result use distinct compositions. */
(function () {
  'use strict';
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function fruitImage(id, name, assets) {
    const img = el('img', 'ou-fruit');
    img.src = assets[id]?.file || '';
    img.alt = name || assets[id]?.name || '';
    return img;
  }
  function renderResult(container, options) {
    const { order = [], result = {}, assets = {}, onNext } = options;
    const success = Boolean(result.success);
    const scene = el('section', 'ou-scene ou-result-c' + (success ? '' : ' ou-result-failure'));
    scene.setAttribute('aria-label', '本单结果');
    const frame = el('div', 'ou-panel-frame');
    const panel = el('div', 'ou-panel');
    const header = el('header', 'ou-result-heading');
    const mark = el('span', 'ou-result-mark', success ? '✓' : '—');
    mark.setAttribute('aria-hidden', 'true');
    header.append(mark, el('h1', '', success ? '这单做对了' : '这单还差一点'));
    const stage = el('div', 'ou-finished-stage');
    const skewer = el('div', 'ou-finished-skewer');
    skewer.setAttribute('role', 'img');
    const stack = result.stack || [];
    skewer.setAttribute('aria-label', '本单串好的水果：' + stack.map(f => assets[f.id]?.name || f.id).join('、'));
    skewer.style.setProperty('--fruit-count', Math.max(1, stack.length));
    skewer.append(el('span', 'ou-finished-stick'));
    const fruits = el('div', 'ou-finished-fruits');
    for (const fruit of stack) fruits.append(fruitImage(fruit.id, '', assets));
    skewer.append(fruits);stage.append(skewer);
    const details = el('div', 'ou-result-details');
    if (!success) {
      const differences = [];
      for (const item of order) {
        const delta = (Number(result.got?.[item.id]) || 0) - Number(item.count);
        if (delta) differences.push((item.name || assets[item.id]?.name || item.id) + (delta < 0 ? '少了 ' : '多了 ') + Math.abs(delta) + ' 个');
      }
      const extra = new Map();
      for (const fruit of stack) if (!order.some(item => item.id === fruit.id)) extra.set(fruit.id, (extra.get(fruit.id) || 0) + 1);
      for (const [id, count] of extra) differences.push((assets[id]?.name || id) + '多了 ' + count + ' 个');
      details.append(el('p', 'ou-result-difference', differences.join('，')));
    }
    const score = el('p', 'ou-result-score');
    score.append(el('span', '', '本单得分'), el('strong', '', success ? '+' + Math.max(0, Number(result.score) || 0) : '0'));
    details.append(score);
    const footer = el('footer', 'ou-footer');
    if (result.levelMessage) footer.append(el('p', 'ou-level-message', result.levelMessage));
    const action = el('button', 'ou-action', '看下一单');action.type = 'button';
    action.addEventListener('click', () => { if (typeof onNext === 'function') onNext(); });
    footer.append(action);panel.append(header, stage, details, footer);frame.append(panel);scene.append(frame);
    container.replaceChildren(scene);
    return {element: scene, focus: () => action.focus({preventScroll: true})};
  }
  function render(container, options) {
    if (options.mode === 'result') return renderResult(container, options);
    const { mode = 'order', order = [], customer = 1, result = {}, onStart, onNext, assets = {} } = options;
    const isResult = mode === 'result';
    const success = Boolean(result.success);
    const scene = el('section', 'ou-scene' + (isResult ? ' ou-result' : ''));
    scene.setAttribute('aria-label', isResult ? '本单结果' : '顾客订单');
    const customerArea = el('div', 'ou-customer-area');
    customerArea.append(el('div', 'ou-arch'));
    const bubble = el('p', 'ou-bubble', !isResult ? '麻烦来一串这样的。' : success ? '这串正好，谢谢！' : '再试一单吧！');
    const portrait = el('img', 'ou-customer');
    const n = String(Math.min(6, Math.max(1, Number(customer) || 1))).padStart(2, '0');
    portrait.src = 'assets/customers/customer_' + n + '_' + (isResult ? success ? 'success' : 'failure' : 'waiting') + '.png';
    portrait.alt = isResult ? success ? '顾客满意地微笑' : '顾客鼓励你再试一次' : '等待点单的顾客';
    customerArea.append(portrait, bubble, el('div', 'ou-counter'));
    const frame = el('div', 'ou-panel-frame');
    const panel = el('div', 'ou-panel');
    const header = el('header', 'ou-heading');
    const title = el('h1', '', !isResult ? '请记住这一单' : success ? '这一串正好' : '这单还没配对');
    header.append(title);
    if (isResult) {
      const score = el('p', 'ou-score');
      score.append(document.createTextNode('本单 '), el('strong', '', '+' + Math.max(0, Number(result.score) || 0)));
      header.append(score);
    } else header.append(el('p', 'ou-instruction', '记好水果和数量，再开始接果'));
    const list = el('ul', 'ou-order-list');
    list.classList.toggle('ou-many', order.length >= 4);
    for (const item of order) {
      const name = item.name || assets[item.id]?.name || item.id;
      const row = el('li', 'ou-order-row');
      row.append(fruitImage(item.id, name, assets), el('span', 'ou-fruit-name', name));
      if (isResult) {
        const got = Number(result.got?.[item.id]) || 0;
        const matches = got === Number(item.count);
        row.append(el('strong', 'ou-quantity', got + ' / ' + item.count));
        const state = el('span', 'ou-row-state ' + (matches ? 'ou-correct' : 'ou-short'), matches ? '✓' : got < item.count ? '少了' : '多了');
        state.setAttribute('aria-label', matches ? '数量正确' : got < item.count ? '数量不足' : '数量超出');
        row.append(state);
      } else { const quantity = el('strong', 'ou-quantity'); quantity.append(el('span', 'ou-count-number', String(item.count)), document.createTextNode(' 个')); row.append(quantity); }
      list.append(row);
    }
    const footer = el('footer', 'ou-footer');
    if (isResult && result.wrong?.length) {
      const wrong = el('div', 'ou-wrong');
      wrong.append(el('span', 'ou-wrong-label', '接错了'));
      const grouped = new Map();
      for (const item of result.wrong) {
        const id = item.id || item;
        const existing = grouped.get(id);
        if (existing) existing.count += 1;
        else grouped.set(id, { id, name: item.name || assets[id]?.name || id, count: 1 });
      }
      for (const item of grouped.values()) {
        const chip = el('span', 'ou-wrong-chip');
        chip.append(fruitImage(item.id, item.name, assets), el('span', '', item.name + ' ×' + item.count));
        wrong.append(chip);
      }
      footer.append(wrong);
    }
    if (isResult && result.levelMessage) footer.append(el('p', 'ou-level-message', result.levelMessage));
    const action = el('button', 'ou-action', isResult ? '下一单' : '开始接果');
    action.type = 'button';
    action.addEventListener('click', () => {
      action.disabled = true;
      const callback = isResult ? onNext : onStart;
      if (typeof callback === 'function') callback();
      else action.disabled = false;
    });
    footer.append(action);
    panel.append(header, list, footer);
    frame.append(panel);
    scene.append(customerArea, frame);
    container.replaceChildren(scene);
    return { element: scene, focus: () => action.focus({ preventScroll: true }) };
  }
  window.OrderUI = Object.freeze({ render });
}());

