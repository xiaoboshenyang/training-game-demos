/* Order and result share one customer/order composition. No game state is retained here. */
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
  function render(container, options) {
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
      } else row.append(el('strong', 'ou-quantity', '× ' + item.count));
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

