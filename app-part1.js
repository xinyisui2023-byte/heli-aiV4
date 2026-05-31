/* =============================================
   app-part1.js - 页面渲染函数
   合力生态 HarmonyLink v3.0
   ============================================= */

// ========== 全局状态 ==========
let pageStack = [];
let currentBrainMode = 'c';
let currentRankFilter = 'all';
let currentRankDim = 'all';
let currentMallFilter = 'all';
let currentShowFilter = 'all';
let currentCommunityFilter = '全部';

// ========== 导航系统 ==========
function navigate(pageId, data) {
  const pages = document.querySelectorAll('.page');
  const currentPage = document.querySelector('.page.active');

  pages.forEach(p => {
    p.classList.remove('active', 'slide-in', 'slide-out', 'fade-in');
  });

  const target = document.getElementById(pageId);
  if (!target) return;

  target.classList.add('active', 'slide-in');
  pageStack.push({ pageId, data });

  const renderFn = window['render_' + pageId.replace(/-/g, '_')];
  if (typeof renderFn === 'function') renderFn(data);

  updateAllTabBars(pageId);
}

function goBack() {
  if (pageStack.length <= 1) return;
  pageStack.pop();
  const prev = pageStack[pageStack.length - 1];
  if (!prev) return;

  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active', 'slide-in', 'slide-out', 'fade-in'));

  const target = document.getElementById(prev.pageId);
  if (target) {
    target.classList.add('active', 'fade-in');
    const renderFn = window['render_' + prev.pageId.replace(/-/g, '_')];
    if (typeof renderFn === 'function') renderFn(prev.data);
  }
  updateAllTabBars(prev.pageId);
}

function updateAllTabBars(pageId) {
  document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
  const tabMap = {
    'page-home': ['tab-home'],
    'page-show-list': ['tab-show', 'tab-show2'],
    'page-show-detail': ['tab-show', 'tab-show2'],
    'page-community': ['tab-community', 'tab-com2'],
    'page-topic-detail': ['tab-community', 'tab-com2'],
    'page-dao-hub': ['tab-community', 'tab-com2'],
    'page-brain': [],
    'page-agent': [],
    'page-ai-writer': [],
    'page-mall': ['tab-mall', 'tab-mall2'],
    'page-product': ['tab-mall', 'tab-mall2'],
    'page-rank': ['tab-rank', 'tab-rank2'],
    'page-brand': ['tab-rank', 'tab-rank2'],
    'page-mine': ['tab-mine', 'tab-mine2']
  };
  const ids = tabMap[pageId] || [];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  });
}

// ========== 首页 ==========
window.render_page_home = function() {
  const companies = Store.get('companies').slice(0, 5);
  const listEl = document.getElementById('rank-mini-list');
  if (!listEl) return;
  listEl.innerHTML = companies.map((c, i) => `
    <div class="rank-mini-item" onclick="navigate('page-brand', {id:'${c.id}'})">
      <div class="rmi-rank ${i===0?'top1':i===1?'top2':i===2?'top3':'normal'}">${i+1}</div>
      <div class="rmi-info">
        <div class="rmi-name">${c.name}</div>
        <div class="rmi-sector">${c.sector}</div>
      </div>
      <div class="rmi-score">
        <div class="rmi-score-num">${c.index}</div>
        <div class="rmi-score-change ${c.change>=0?'up':'down'}">${c.change>=0?'▲':'▼'}${Math.abs(c.change)}</div>
      </div>
    </div>
  `).join('');
};

// ========== 飞轮详情 ==========
window.render_page_flywheel = function() {
  const el = document.getElementById('flywheel-detail-content');
  if (!el) return;
  const nodes = [
    { num: 1, title: 'C端参与', color: 'rgba(241,143,1,0.15)', border: 'rgba(241,143,1,0.5)', items: ['观看《智造者》等综艺内容', '发表指数评论和研报分析', '参与社区治理投票', '贡献个人行为数据', 'MP积分记录人性温度'] },
    { num: 2, title: '积分铸造', color: 'rgba(56,161,105,0.12)', border: 'rgba(56,161,105,0.5)', items: ['WATCH/EXP/GOV/DATA/MP五维积分同步铸造', '区块链存证，全流程可溯源', '数交所备案，合规安全', '积分即时到账，贡献值同步增长', '积分池动态平衡，防通胀机制'] },
    { num: 3, title: '合力指数上行', color: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.5)', items: ['C端注意力流向推动企业指数实时更新', '比财报早3-6个月的先行指标', 'MP维度量化企业人性温度', '激活A股失语上市公司市值管理', '成为善意资本配置的参考标准'] },
    { num: 4, title: 'B端变现', color: 'rgba(49,130,206,0.12)', border: 'rgba(49,130,206,0.5)', items: ['上市公司赞助综艺获得精准曝光', '品牌故事进入Pioneer OS叙事基础设施', '积分商城提供真实商品和服务变现', '商家后台实时查看ROI数据', '龙虾Agent API接口变现通道'] },
    { num: 5, title: '生态裂变', color: 'rgba(221,107,32,0.12)', border: 'rgba(221,107,32,0.5)', items: ['优质内容收益反哺内容创作', '更多用户被高价值内容吸引加入', 'DAO组织共建生态指数级裂变（2028）', '注意力经济全球化扩张', '人类意义网络成为独特资产类别'] }
  ];

  el.innerHTML = `
    <div style="padding:0 16px 8px; color:rgba(255,255,255,0.5); font-size:13px; background:#0A1628;">飞轮一旦转起来，后来者追赶成本极高，且扩容能力不断增强。</div>
    <div style="background:#0A1628; padding-bottom:8px;">
    ${nodes.map((n, i) => `
      <div class="fw-detail-node">
        <div class="fwdn-head" style="background:${n.color};border:1px solid ${n.border};border-radius:12px 12px 0 0;">
          <div class="fwdn-num">${n.num}</div>
          <div class="fwdn-title">${n.title}</div>
        </div>
        <div class="fwdn-body" style="background:${n.color};border:1px solid ${n.border};border-top:none;border-radius:0 0 12px 12px;">
          <div class="fwdn-items">
            ${n.items.map(item => `<div class="fwdn-item">${item}</div>`).join('')}
          </div>
        </div>
      </div>
      ${i < nodes.length - 1 ? '<div class="fw-arrow-large">↓</div>' : ''}
    `).join('')}
    </div>

    <div style="margin:16px;padding:20px;background:linear-gradient(135deg,rgba(241,143,1,0.1),rgba(241,143,1,0.05));border:1px solid rgba(241,143,1,0.3);border-radius:16px;">
      <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:10px;">📊 飞轮验证数据</div>
      <div style="display:flex;gap:24px;flex-wrap:wrap;">
        <div style="text-align:center;"><div style="font-size:22px;font-weight:900;color:var(--accent);">1.6亿</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">综艺赞助级别</div></div>
        <div style="text-align:center;"><div style="font-size:22px;font-weight:900;color:var(--accent);">95%+</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">目标用户黏性</div></div>
        <div style="text-align:center;"><div style="font-size:22px;font-weight:900;color:var(--accent);">3步</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">战略阶段</div></div>
        <div style="text-align:center;"><div style="font-size:22px;font-weight:900;color:var(--accent);">2028</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">DAO生态期</div></div>
      </div>
    </div>
  `;
};

// ========== 综艺列表 ==========
window.render_page_show_list = function() {
  filterShows(currentShowFilter, null);
};

function filterShows(type, el) {
  currentShowFilter = type;
  if (el) {
    document.querySelectorAll('#page-show-list .nbt-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const shows = Store.get('shows');
  const filtered = type === 'all' ? shows : shows.filter(s => s.type === type);
  const el2 = document.getElementById('show-list-content');
  if (!el2) return;
  el2.innerHTML = `
    <div style="padding:12px 0 8px;">
      ${filtered.map(show => `
        <div class="show-card" onclick="navigate('page-show-detail', {id:'${show.id}'})">
          <div class="sc-cover">
            <div>${show.emoji}</div>
            <div class="sc-badge">${show.badge}</div>
          </div>
          <div class="sc-info">
            <div class="sc-title">${show.title}</div>
            <div class="sc-ep">${show.subtitle}</div>
            <div class="sc-tags">${show.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <div class="sc-reward">📦 完整观看可得 ${show.total_reward} 积分</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ========== 综艺详情 ==========
window.render_page_show_detail = function(data) {
  const shows = Store.get('shows');
  const show = data && data.id ? shows.find(s => s.id === data.id) : shows[0];
  if (!show) return;

  const el = document.getElementById('show-detail-content');
  if (!el) return;

  const watchedCount = show.episodes_data.filter(e => e.watched).length;
  const progress = Math.round(watchedCount / show.episodes_data.length * 100);

  el.innerHTML = `
    <div class="show-hero">
      <div class="show-hero-back" onclick="goBack()">←</div>
      <div class="show-hero-overlay"></div>
      <div class="show-hero-content">
        <div style="font-size:14px;color:rgba(255,255,255,0.55);margin-bottom:4px;">${show.subtitle}</div>
        <div class="show-hero-title">${show.title}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;">
          ${show.tags.map(t=>`<span class="tag" style="background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.8);">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div style="padding:16px; background:#fff; margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:14px;font-weight:700;color:var(--text-main);">观看进度 ${watchedCount}/${show.episodes_data.length}集</span>
        <span style="font-size:13px;color:var(--accent);font-weight:700;">已得 ${watchedCount * show.reward_per_ep} 积分</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%;background:linear-gradient(90deg,var(--accent),var(--accent-light));"></div></div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">完整观看可获 ${show.total_reward} WATCH积分</div>
    </div>

    <div style="background:#fff;margin-bottom:8px;padding:16px;">
      <div class="card-title">节目介绍</div>
      <div class="card-sub">${show.desc}</div>
      ${show.sponsor ? `<div style="margin-top:10px;font-size:12px;color:var(--text-muted);">赞助企业：${show.sponsor}</div>` : ''}
    </div>

    <div style="background:#fff;margin-bottom:8px;">
      <div style="padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
        <span class="card-title" style="margin-bottom:0">剧集列表</span>
        <span style="font-size:13px;color:var(--primary-light);cursor:pointer;" onclick="navigate('page-episode-list', {showId:'${show.id}'})">全部 ›</span>
      </div>
      <div class="ep-grid">
        ${show.episodes_data.slice(0, 8).map(ep => `
          <div class="ep-item ${ep.watched ? 'watched' : ''}" onclick="navigate('page-episode-play', {showId:'${show.id}', epId:'${ep.id}'})">
            <div class="ep-num">${ep.num}</div>
            <div class="ep-label">${ep.watched ? '✓已看' : ep.duration}</div>
          </div>
        `).join('')}
      </div>
      ${show.episodes_data.length > 8 ? `<div style="text-align:center;padding:12px 0 8px;font-size:13px;color:var(--primary-light);cursor:pointer;" onclick="navigate('page-episode-list', {showId:'${show.id}'})">查看全部 ${show.episodes_data.length} 集 ›</div>` : ''}
    </div>

    ${show.quizzes.length > 0 ? `
    <div style="background:#fff;margin-bottom:8px;padding:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span class="card-title" style="margin-bottom:0">🎯 剧情竞猜</span>
        <span style="font-size:12px;color:var(--success);font-weight:700;">答对得 EXP积分</span>
      </div>
      ${show.quizzes.slice(0, 2).map(q => `
        <div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:10px;cursor:pointer;" onclick="navigate('page-quiz', {showId:'${show.id}', quizId:'${q.id}'})">
          <div style="font-size:14px;font-weight:600;color:var(--text-main);margin-bottom:6px;">${q.question}</div>
          <div style="font-size:12px;color:var(--accent);">答对可得 +${q.points} EXP →</div>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <div style="background:#fff;margin-bottom:8px;padding:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span class="card-title" style="margin-bottom:0">💬 评论区</span>
        <span style="font-size:12px;color:var(--success);">发评论得+30 EXP</span>
      </div>
      <div style="display:flex;gap:10px;margin-bottom:14px;">
        <input type="text" id="comment-input" style="flex:1;border:1.5px solid rgba(0,0,0,0.1);border-radius:20px;padding:8px 14px;font-size:14px;outline:none;" placeholder="发表你的看法...">
        <button style="background:var(--primary);color:#fff;border:none;padding:8px 16px;border-radius:20px;font-size:14px;cursor:pointer;" onclick="submitShowComment('${show.id}')">发送</button>
      </div>
      ${show.comments.map(c => `
        <div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;">
          <div style="font-size:22px;">${c.avatar}</div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:700;color:var(--text-main);">${c.user}</div>
            <div style="font-size:13px;color:var(--text-sub);line-height:1.5;margin-top:3px;">${c.text}</div>
            <div style="display:flex;gap:12px;margin-top:6px;">
              <span style="font-size:11px;color:var(--text-muted);">${c.time}</span>
              <span style="font-size:11px;color:var(--text-muted);">👍 ${c.likes}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    ${show.id === 'zhizaozhe' ? `
    <div style="margin:16px;padding:16px;background:linear-gradient(135deg,#1E3A5F,#2A5080);border-radius:var(--radius);color:#fff;cursor:pointer;" onclick="navigate('page-collab-show')">
      <div style="font-size:15px;font-weight:700;margin-bottom:6px;">🎥 企业合作邀约</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">邀约新质生产力领域上市公司参与《智造者》节目录制及IP深度合作，涵盖品牌曝光、产业叙事、用户连接、热度提升四大权益。</div>
      <div style="margin-top:10px;text-align:center;font-size:13px;color:var(--accent);">查看详情 →</div>
    </div>` : ''}
    ${show.id === 'suanlijijilu' ? `
    <div style="margin:16px;padding:16px;background:linear-gradient(135deg,#0D2240,#1E3A5F);border-radius:var(--radius);color:#fff;cursor:pointer;" onclick="navigate('page-collab-gov')">
      <div style="font-size:15px;font-weight:700;margin-bottom:6px;">⚡ 政企合作邀约</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">邀约各级政府机关、AI/新质生产力相关产业园区联合制作，共同打造具有行业影响力的纪实IP。</div>
      <div style="margin-top:10px;text-align:center;font-size:13px;color:var(--accent);">查看详情 →</div>
    </div>` : ''}
  `;

  const bottomBar = document.getElementById('show-bottom-bar');
  if (bottomBar) {
    bottomBar.innerHTML = `
      <button class="bab-btn ghost" onclick="navigate('page-episode-list', {showId:'${show.id}'})">剧集列表</button>
      <button class="bab-btn accent" onclick="navigate('page-episode-play', {showId:'${show.id}', epId:'${show.episodes_data[0].id}'})">▶ 开始观看</button>
    `;
  }
};

// ========== 剧集列表 ==========
window.render_page_episode_list = function(data) {
  const shows = Store.get('shows');
  const show = shows.find(s => s.id === (data && data.showId));
  if (!show) return;
  const el = document.getElementById('episode-list-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:12px 0;">
      <div style="padding:0 16px;margin-bottom:14px;font-size:14px;color:var(--text-sub);">
        已观看 ${show.episodes_data.filter(e=>e.watched).length}/${show.episodes_data.length} 集，
        已获 ${show.episodes_data.filter(e=>e.watched).length * show.reward_per_ep} WATCH积分
      </div>
      ${show.episodes_data.map(ep => `
        <div class="list-item" onclick="navigate('page-episode-play', {showId:'${show.id}', epId:'${ep.id}'})">
          <div class="li-icon" style="font-size:16px;font-weight:800;color:var(--primary);">${ep.num}</div>
          <div class="li-info">
            <div class="li-title">${ep.title}</div>
            <div class="li-sub">${ep.duration} · ${ep.desc.slice(0,30)}...</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">
            ${ep.watched ? '<span class="badge badge-success">✓ 已看</span>' : `<span style="font-size:12px;color:var(--accent);">+${ep.reward}</span>`}
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 剧集播放 ==========
window.render_page_episode_play = function(data) {
  const shows = Store.get('shows');
  const show = shows.find(s => s.id === (data && data.showId));
  if (!show) return;
  const ep = show.episodes_data.find(e => e.id === (data && data.epId));
  if (!ep) return;

  const el = document.getElementById('episode-play-content');
  if (!el) return;
  el.innerHTML = `
    <div class="player-page">
      <div class="player-video" style="aspect-ratio:16/9;position:relative;">
        <div class="player-back" onclick="goBack()">←</div>
        <div class="player-mock">
          <div style="font-size:48px;">${show.emoji}</div>
          <div class="player-play-btn" id="play-btn" onclick="playEpisode('${show.id}', '${ep.id}')">▶</div>
          <div style="color:rgba(255,255,255,0.6);font-size:13px;">点击播放 · ${ep.duration}</div>
        </div>
        <div id="play-progress" style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.2);">
          <div id="play-progress-bar" style="height:100%;background:var(--accent);width:0%;transition:width 0.1s;"></div>
        </div>
      </div>
      <div class="player-info" style="padding:16px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div>
            <div style="font-size:14px;color:var(--text-muted);margin-bottom:4px;">第${ep.num}集</div>
            <div style="font-size:18px;font-weight:800;color:var(--text-main);">${ep.title}</div>
          </div>
          ${ep.watched ? '<span class="badge badge-success">已完成</span>' : `<span style="font-size:13px;font-weight:700;color:var(--accent);">+${ep.reward} WATCH</span>`}
        </div>
        <div style="font-size:14px;color:var(--text-sub);line-height:1.7;margin-bottom:16px;">${ep.desc}</div>
        ${!ep.watched ? `
        <div style="padding:14px;background:rgba(56,161,105,0.08);border-radius:10px;border:1px solid rgba(56,161,105,0.2);">
          <div style="font-size:13px;font-weight:700;color:var(--success);margin-bottom:4px;">🎁 观看奖励</div>
          <div style="font-size:12px;color:var(--text-sub);">完整观看本集可获得 <strong>+${ep.reward} WATCH积分</strong>，快去体验吧！</div>
        </div>
        ` : '<div style="text-align:center;color:var(--success);font-size:14px;">✅ 已完整观看，积分已到账</div>'}
        <div style="margin-top:16px;">
          <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:10px;">更多剧集</div>
          <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
            ${show.episodes_data.map(e => `
              <div onclick="navigate('page-episode-play', {showId:'${show.id}', epId:'${e.id}'})"
                style="flex-shrink:0;width:56px;height:56px;border-radius:10px;background:${e.id===ep.id?'var(--primary)':e.watched?'rgba(56,161,105,0.1)':'#fff'};border:2px solid ${e.id===ep.id?'var(--primary)':e.watched?'var(--success)':'rgba(0,0,0,0.1)'};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;">
                <div style="font-size:14px;font-weight:800;color:${e.id===ep.id?'#fff':e.watched?'var(--success)':'var(--primary)'};">${e.num}</div>
                <div style="font-size:9px;color:${e.id===ep.id?'rgba(255,255,255,0.7)':'var(--text-muted)'};">${e.watched?'✓':''}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

// ========== 竞猜页 ==========
window.render_page_quiz = function(data) {
  const shows = Store.get('shows');
  const show = shows.find(s => s.id === (data && data.showId));
  if (!show) return;
  const quiz = show.quizzes.find(q => q.id === (data && data.quizId));
  if (!quiz) return;

  const el = document.getElementById('quiz-content');
  if (!el) return;
  el.innerHTML = `
    <div style="padding:20px 16px;">
      <div style="background:linear-gradient(135deg,#0A1628,#1E3A5F);border-radius:16px;padding:20px;margin-bottom:20px;">
        <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:8px;">🎯 答题得 +${quiz.points} EXP积分</div>
        <div style="font-size:18px;font-weight:700;color:#fff;line-height:1.5;">${quiz.question}</div>
      </div>
      <div id="quiz-options" style="display:flex;flex-direction:column;gap:10px;">
        ${quiz.options.map((opt, i) => `
          <div class="quiz-option" id="qopt-${i}" onclick="selectQuizOption('${show.id}', '${quiz.id}', ${i})"
            style="padding:16px;background:#fff;border-radius:12px;box-shadow:var(--shadow);border:2px solid transparent;cursor:pointer;font-size:15px;font-weight:600;color:var(--text-main);transition:all 0.2s;">
            <span style="color:var(--primary);margin-right:10px;">${['A','B','C','D'][i]}.</span>${opt}
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// ========== 合力产业热度指数 ==========
window.render_page_rank = function() {
  filterRank(currentRankFilter, null);
  renderDimSelector();
};

function renderDimSelector() {
  const dims = Store.get('indexDimensions');
  const el = document.getElementById('rank-dim-selector');
  if (!el) return;
  el.innerHTML = `
    <div class="dim-selector">
      ${dims.map(d => `
        <div class="dim-chip ${currentRankDim === d.key ? 'active' : ''}" onclick="selectDim('${d.key}', this)">
          <span class="dim-icon">${d.icon}</span>${d.name}
        </div>
      `).join('')}
    </div>
  `;
}

function selectDim(dim, el) {
  currentRankDim = dim;
  document.querySelectorAll('.dim-chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  filterRank(currentRankFilter, null);
}

function filterRank(type, el) {
  currentRankFilter = type;
  if (el) {
    document.querySelectorAll('#page-rank .nbt-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const companies = Store.get('companies');
  let filtered = type === 'all' ? companies : companies.filter(c => {
    if (type === 'ai') return ['AI视觉', 'AI'].includes(c.sector);
    if (type === 'semi') return ['半导体'].includes(c.sector);
    if (type === 'energy') return ['新能源', '储能'].includes(c.sector);
    if (type === 'mfg') return ['工程机械', '智能制造'].includes(c.sector);
    if (type === 'medical') return ['医疗器械'].includes(c.sector);
    return true;
  });

  // Sort by selected dimension
  const sortKey = currentRankDim === 'all' ? 'index' : 'dims.' + currentRankDim;
  filtered.sort((a, b) => {
    const aVal = currentRankDim === 'all' ? a.index : (a.dims && a.dims[currentRankDim]) || 0;
    const bVal = currentRankDim === 'all' ? b.index : (b.dims && b.dims[currentRankDim]) || 0;
    return bVal - aVal;
  });

  const dimLabel = currentRankDim === 'all' ? '综合热度' : (Store.get('indexDimensions').find(d => d.key === currentRankDim) || {}).name || '';

  const el2 = document.getElementById('rank-content');
  if (!el2) return;

  el2.innerHTML = `
    <div class="index-overview">
      <div class="io-title">${COMPLIANCE.indexFullname} · ${dimLabel}</div>
      <div class="io-score">${filtered.length > 0 ? (currentRankDim === 'all' ? filtered[0].index : (filtered[0].dims && filtered[0].dims[currentRankDim]) || filtered[0].index) : '--'}</div>
      <div class="io-desc">仅反映公众产业关注度 · 不构成投资建议</div>
      <div class="io-bars">
        ${Store.get('indexDimensions').filter(d => d.key !== 'all').map(d => {
          const top = filtered[0];
          const val = top && top.dims ? top.dims[d.key] : 0;
          return `
          <div class="io-bar-item">
            <div class="io-bar-label">${d.icon} ${d.name}</div>
            <div class="io-bar-track"><div class="io-bar-fill" style="width:${val}%;background:var(--accent);"></div></div>
            <div class="io-bar-val">${val}</div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <div style="padding:4px 16px 10px;">
      <div style="font-size:13px;color:var(--text-muted);">共 ${filtered.length} 家企业 · 每日更新</div>
    </div>

    ${filtered.map((c, i) => {
      const score = currentRankDim === 'all' ? c.index : (c.dims && c.dims[currentRankDim]) || c.index;
      const change = currentRankDim === 'all' ? c.change : (Math.random() > 0.5 ? +(Math.random() * 3).toFixed(1) : -(Math.random() * 2).toFixed(1));
      return `
      <div class="company-card" onclick="navigate('page-brand', {id:'${c.id}'})">
        <div class="cc-rank">${i+1}</div>
        <div class="cc-info" style="flex:1;">
          <div class="cc-name">${c.name}</div>
          <div class="cc-sector">${c.sector} · ${c.code}</div>
          <div class="cc-bar"><div class="cc-bar-fill" style="width:${score}%;"></div></div>
        </div>
        <div class="cc-score">
          <div class="cc-score-num">${score}</div>
          <div style="font-size:11px;${change>=0?'color:#E53E3E':'color:#38A169'};">${change>=0?'▲':'▼'}${Math.abs(change)}</div>
          <div class="cc-score-label">热度</div>
        </div>
      </div>`;
    }).join('')}
  `;
}

// ========== 品牌详情 ==========
window.render_page_brand = function(data) {
  const companies = Store.get('companies');
  const company = data && data.id ? companies.find(c => c.id === data.id) : companies[0];
  if (!company) return;

  const el = document.getElementById('brand-content');
  if (!el) return;

  el.innerHTML = `
    <div class="brand-hero">
      <div class="brand-hero-back" onclick="goBack()">←</div>
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,#0A1628,#1E3A5F);"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:72px;opacity:0.15;">${company.name[0]}</div>
      <div class="brand-hero-content">
        <div class="brand-hero-name">${company.name}</div>
        <div class="brand-hero-code">${company.code} · ${company.sector}</div>
      </div>
    </div>

    <div class="compliance-banner" style="margin:0;border-radius:0;">
      <strong>免责声明</strong>：以下数据仅反映公众关注度与叙事热度，不构成任何投资建议。
    </div>
    <div style="padding:16px;background:#fff;margin-bottom:8px;">
      <div class="brand-index-panel">
        <div class="bip-head">
          <div class="bip-score">${company.index}</div>
          <div class="bip-info">
            <div class="bip-label">${COMPLIANCE.indexShortname} · 综合</div>
            <div class="bip-change">${company.change>=0?'▲':'▼'}${Math.abs(company.change)} 较上月</div>
          </div>
        </div>
        ${company.dims ? `
        <div class="company-dim-grid">
          ${Store.get('indexDimensions').filter(d => d.key !== 'all').map(d => `
            <div class="company-dim-card">
              <div class="company-dim-icon">${d.icon}</div>
              <div class="company-dim-name">${d.name}</div>
              <div class="company-dim-score">${company.dims[d.key]}</div>
              <div class="company-dim-bar"><div class="company-dim-fill ${d.key}" style="width:${company.dims[d.key]}%;"></div></div>
            </div>
          `).join('')}
        </div>
        ` : `
        <div class="bip-dims">
          ${[['关注度', company.attention], ['热度', company.heat], ['MP', company.mp]].map(([label, val]) => `
            <div class="bip-dim">
              <div class="bip-dim-row"><span class="bip-dim-label">${label}</span><span class="bip-dim-val">${val}</span></div>
              <div class="bip-dim-bar"><div class="bip-dim-fill" style="width:${val}%;"></div></div>
            </div>
          `).join('')}
        </div>`}
      </div>
    </div>

    <div class="card">
      <div class="card-title">企业介绍</div>
      <div class="card-sub">${company.desc}</div>
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="card-title" style="margin-bottom:0">🎬 品牌故事</div>
        <span style="font-size:13px;color:var(--primary-light);cursor:pointer;" onclick="navigate('page-brand-story', {id:'${company.id}'})">全部 ›</span>
      </div>
      ${company.stories.map(s => `
        <div style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.04);last:no-border;" onclick="navigate('page-brand-story', {id:'${company.id}', story:'${s}'})">
          <div style="font-size:14px;color:var(--text-main);">📌 ${s}</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">点击阅读完整叙事 · 获取 EXP积分</div>
        </div>
      `).join('')}
    </div>

    <div class="card">
      <div class="card-title">Pioneer OS 叙事数据</div>
      <div style="padding:14px;background:linear-gradient(135deg,#1A0A3D,#2D1B69);border-radius:10px;">
        <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:8px;">区块链存证 · 实时更新</div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <div style="text-align:center;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.stories.length * 12}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">叙事章节</div></div>
          <div style="text-align:center;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.mp}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">人性温度MP</div></div>
          <div style="text-align:center;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.attention * 18}万</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">累计触达</div></div>
        </div>
        <div style="margin-top:12px;">
          <button onclick="navigate('page-pioneer-hub')" style="width:100%;background:rgba(108,99,255,0.2);border:1px solid rgba(108,99,255,0.4);color:var(--pioneer-light);border-radius:8px;padding:8px;font-size:13px;cursor:pointer;">进入Pioneer OS查看完整叙事 →</button>
        </div>
      </div>
    </div>
  `;

  const bottomBar = document.getElementById('brand-bottom-bar');
  if (bottomBar) {
    bottomBar.innerHTML = `
      <button class="bab-btn ghost" onclick="navigate('page-pioneer-hub')">🚀 Pioneer OS</button>
      <button class="bab-btn accent" onclick="navigate('page-ai-writer')">✍️ 写研报得EXP</button>
    `;
  }
};

// ========== 品牌故事 ==========
window.render_page_brand_story = function(data) {
  const companies = Store.get('companies');
  const company = data && data.id ? companies.find(c => c.id === data.id) : companies[0];
  if (!company) return;

  const el = document.getElementById('brand-story-content');
  if (!el) return;

  const story = data && data.story ? data.story : company.stories[0];

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#0A1628,#1E3A5F);padding:32px 20px 24px;">
      <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-bottom:6px;">${company.name} · 品牌叙事</div>
      <div style="font-size:22px;font-weight:800;color:#fff;margin-bottom:8px;">${story}</div>
      <div style="display:flex;gap:8px;">
        <span class="badge badge-accent">MP贡献故事</span>
        <span class="badge" style="background:rgba(108,99,255,0.15);color:var(--pioneer-light);">Pioneer OS存证</span>
      </div>
    </div>

    <div style="padding:20px 16px;">
      <div style="font-size:15px;line-height:1.9;color:var(--text-main);">
        <p style="margin-bottom:16px;">${generateStoryContent(company.name, story, 0)}</p>
        <p style="margin-bottom:16px;">${generateStoryContent(company.name, story, 1)}</p>
        <blockquote style="border-left:3px solid var(--accent);padding:12px 16px;background:rgba(241,143,1,0.05);border-radius:0 10px 10px 0;margin:20px 0;">
          "${generateStoryContent(company.name, story, 2)}"
        </blockquote>
        <p style="margin-bottom:16px;">${generateStoryContent(company.name, story, 3)}</p>
      </div>

      <div style="margin-top:20px;padding:16px;background:linear-gradient(135deg,#1A0A3D,#2D1B69);border-radius:12px;">
        <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:8px;">🔗 Pioneer OS 区块链存证</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);font-family:monospace;word-break:break-all;">
          Hash: 0x${Math.random().toString(16).slice(2,18)}...${Math.random().toString(16).slice(2,8)}<br>
          Time: ${formatTime()}<br>
          Chain: 长安链 (ChangAn Chain)<br>
          Status: ✓ 已确认
        </div>
      </div>

      <div style="margin-top:16px;padding:14px;background:rgba(56,161,105,0.08);border-radius:10px;border:1px solid rgba(56,161,105,0.2);">
        <div style="font-size:13px;font-weight:700;color:var(--success);margin-bottom:4px;">📖 阅读完成奖励</div>
        <div style="font-size:12px;color:var(--text-sub);">完整阅读此叙事获得 <strong>+50 EXP积分</strong>，贡献值+80</div>
        <button onclick="claimReadReward('${company.id}')" style="margin-top:8px;width:100%;background:var(--success);color:#fff;border:none;padding:8px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;">领取阅读奖励</button>
      </div>
    </div>
  `;
};

function generateStoryContent(companyName, story, idx) {
  const templates = [
    `在中国新质生产力的浪潮中，${companyName}以独特的技术路径和战略眼光，书写了属于自己的时代叙事。"${story}"不仅是一个产品或技术的故事，更是一家企业在AI时代重新定义自身价值的宣言。`,
    `从数据来看，${companyName}在注意力经济维度的表现远超传统财报所能呈现的价值。合力指数显示，其在C端用户中的品牌温度持续攀升，这种"人性化的温度"正是AI时代企业护城河的新维度。`,
    `我们不只看财报数字，更看人心的流向。${companyName}在用户心中的位置，才是真正的价值锚点。— 合力生态指数研究院`,
    `在Pioneer OS的叙事框架下，${companyName}的"${story}"已被完整记录在链上，成为可追溯、可验证的产业历史档案。这些数据将成为${COMPLIANCE.indexShortname}的重要参考，帮助公众了解真实的产业叙事。`
  ];
  return templates[idx] || templates[0];
}

// ========== 我的页面 ==========
window.render_page_mine = function() {
  const user = Store.get('user');
  const el = document.getElementById('mine-content');
  if (!el) return;

  const levelProgress = Math.min(100, Math.round((user.willpower - 70000) / (150000 - 70000) * 100));

  el.innerHTML = `
    <div class="mine-header">
      <div class="mine-user-row">
        <div class="mine-avatar">${user.avatar}</div>
        <div class="mine-user-info">
          <div class="mine-name">${user.nickname}</div>
          <div class="mine-level">${user.levelName}</div>
          <div style="margin-top:6px;"><div class="progress-bar" style="height:4px;"><div class="progress-fill" style="width:${levelProgress}%;background:var(--accent);"></div></div></div>
          <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:3px;">${formatNumber(user.willpower)} / 150,000 贡献值</div>
        </div>
        <button class="mine-checkin-btn" onclick="doCheckin()" ${user.checkinToday ? 'disabled style="opacity:0.5;"' : ''}>
          ${user.checkinToday ? '✅已签' : '📅签到'}
        </button>
      </div>
      <div class="mine-points-grid">
        <div class="mpg-item" onclick="navigate('page-points-detail')">
          <div class="mpg-num">${formatNumber(user.hp)}</div>
          <div class="mpg-label">HP消费积分</div>
        </div>
        <div class="mpg-item" onclick="navigate('page-points-detail')">
          <div class="mpg-num">${formatNumber(user.watch)}</div>
          <div class="mpg-label">WATCH观看</div>
        </div>
        <div class="mpg-item" onclick="navigate('page-points-detail')">
          <div class="mpg-num">${formatNumber(user.mp)}</div>
          <div class="mpg-label">MP意义贡献</div>
        </div>
      </div>
    </div>

    <div style="height:12px;background:var(--bg);"></div>

    <div class="mine-menu">
      <div class="mine-menu-item" onclick="navigate('page-order-list')">
        <div class="mmi-icon">📦</div>
        <div class="mmi-label">我的订单</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-willpower')">
        <div class="mmi-icon">⚡</div>
        <div class="mmi-label">意志吞吐量</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-honor-list')">
        <div class="mmi-icon">🏅</div>
        <div class="mmi-label">荣誉徽章</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-points-detail')">
        <div class="mmi-icon">💰</div>
        <div class="mmi-label">积分明细</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-points-exchange')">
        <div class="mmi-icon">🔄</div>
        <div class="mmi-label">积分兑换</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-mp-explain')">
        <div class="mmi-icon">💎</div>
        <div class="mmi-label">MP意义积分说明</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-agent')">
        <div class="mmi-icon">🦞</div>
        <div class="mmi-label">我的龙虾Agent</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-about')">
        <div class="mmi-icon">ℹ️</div>
        <div class="mmi-label">关于合力生态</div>
        <div class="mmi-arrow">›</div>
      </div>
      <div class="mine-menu-item" onclick="navigate('page-merchant-login')">
        <div class="mmi-icon">🏪</div>
        <div class="mmi-label">商家入驻</div>
        <div class="mmi-arrow">›</div>
      </div>
    </div>
  `;
};

// ========== 意志吞吐量 ==========
window.render_page_willpower = function() {
  const user = Store.get('user');
  const records = Store.get('wpRecords');
  const el = document.getElementById('willpower-content');
  if (!el) return;

  const level = Store.get('levels').find(l => user.willpower >= l.minWP && user.willpower < l.maxWP) || Store.get('levels')[5];
  const progress = Math.min(100, Math.round((user.willpower - level.minWP) / (level.maxWP - level.minWP) * 100));

  el.innerHTML = `
    <div class="wp-hero">
      <div class="wp-gauge">
        <div class="wp-gauge-circle" style="background:conic-gradient(var(--accent) 0% ${progress*3.6}deg, rgba(255,255,255,0.1) ${progress*3.6}deg 360deg);">
          <div class="wp-gauge-inner">
            <div class="wp-gauge-num">${progress}%</div>
            <div class="wp-gauge-label">进度</div>
          </div>
        </div>
      </div>
      <div class="wp-level">${level.name}</div>
      <div style="font-size:24px;font-weight:900;color:var(--accent);margin:8px 0;">${formatNumber(user.willpower)}</div>
      <div class="wp-rank">全平台排名第 <strong style="color:var(--accent);">${user.rank}</strong> 位</div>
      <div style="margin-top:12px;font-size:12px;color:rgba(255,255,255,0.45);">下一等级：${level.maxWP - user.willpower > 0 ? `还需 ${formatNumber(level.maxWP - user.willpower)} 贡献值` : '已达最高等级'}</div>
    </div>

    <div class="card">
      <div class="card-title">等级权益</div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${level.benefits.map(b => `<div style="font-size:13px;color:var(--text-sub);display:flex;align-items:center;gap:8px;"><span style="color:var(--success);">✓</span>${b}</div>`).join('')}
      </div>
    </div>

    <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;cursor:pointer;" onclick="navigate('page-honor-list')">
      <span style="font-size:15px;font-weight:700;color:var(--text-main);">🏅 荣誉兑换</span>
      <span style="font-size:13px;color:var(--primary-light);">查看全部 ›</span>
    </div>

    <div style="padding:12px 16px 0;font-size:14px;font-weight:700;color:var(--text-main);">贡献记录</div>
    <div style="background:#fff;margin-top:8px;">
      ${records.map(r => `
        <div style="display:flex;align-items:center;padding:12px 16px;gap:12px;border-bottom:1px solid rgba(0,0,0,0.04);">
          <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;background:rgba(241,143,1,0.1);">${getTypeIcon(r.type)}</div>
          <div style="flex:1;">
            <div style="font-size:14px;color:var(--text-main);">${r.action}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${r.time}</div>
          </div>
          <div style="font-size:15px;font-weight:800;color:var(--success);">+${r.amount}</div>
        </div>
      `).join('')}
    </div>
  `;
};

function getTypeIcon(type) {
  const icons = { watch: '👁', exp: '🧪', gov: '🗳', data: '📡', mp: '💎', checkin: '📅' };
  return icons[type] || '⚡';
}

// ========== 荣誉兑换 ==========
window.render_page_honor_list = function() {
  const honors = Store.get('honors');
  const user = Store.get('user');
  const el = document.getElementById('honor-list-content');
  if (!el) return;

  el.innerHTML = `
    <div style="padding:16px 0 8px;">
      <div style="padding:0 16px 12px;font-size:14px;color:var(--text-sub);line-height:1.6;">
        荣誉徽章是你在合力生态中留下的印记。每枚荣誉都需要贡献值或积分来兑换，代表你对平台的真实贡献。
      </div>
      ${honors.map(h => `
        <div class="honor-card ${h.claimed ? 'claimed' : ''}" onclick="showHonorDetail('${h.id}')">
          <div class="hc-icon">${h.icon}</div>
          <div class="hc-info">
            <div class="hc-title">${h.title}</div>
            <div class="hc-req">${h.req}</div>
            <div class="hc-cost">${h.cost} ${h.costType}</div>
          </div>
          <button class="hc-btn ${h.claimed ? 'claimed' : 'available'}" onclick="event.stopPropagation();claimHonorAction('${h.id}')">
            ${h.claimed ? '已兑换' : '兑换'}
          </button>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 积分详情 ==========
window.render_page_points_detail = function() {
  const user = Store.get('user');
  const records = Store.get('pointsRecords');
  const el = document.getElementById('points-detail-content');
  if (!el) return;

  el.innerHTML = `
    <div class="points-header">
      <div class="ph-total">
        <div class="ph-total-num">${formatNumber(user.hp)}</div>
        <div class="ph-total-label">HP 消费积分 (可用余额)</div>
      </div>
      <div class="ph-types">
        ${[['HP', user.hp, '#DD6B20'], ['WATCH', user.watch, '#3182CE'], ['EXP', user.exp, '#805AD5'], ['GOV', user.gov, '#2F855A'], ['DATA', user.data, '#2B6CB0'], ['MP', user.mp, '#D69E2E']].map(([name, val, color]) => `
          <div class="ph-type-pill" style="">
            <span style="color:${color};font-weight:800;">${name}</span>: ${formatNumber(val)}
          </div>
        `).join('')}
      </div>
    </div>

    <div style="margin:16px 16px 8px;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:14px;font-weight:700;color:var(--text-main);">积分流水</span>
      <span style="font-size:13px;color:var(--primary-light);cursor:pointer;" onclick="navigate('page-points-exchange')">兑换积分 ›</span>
    </div>
    <div style="background:#fff;">
      ${records.map(r => {
        const colors = { hp: '#DD6B20', watch: '#3182CE', exp: '#805AD5', gov: '#2F855A', data: '#2B6CB0', mp: '#D69E2E' };
        const icons = { hp: '💰', watch: '👁', exp: '🧪', gov: '🗳', data: '📡', mp: '💎' };
        const color = colors[r.type] || '#718096';
        const icon = icons[r.type] || '⚡';
        return `
          <div class="points-record">
            <div class="pr-icon" style="background:${color}20;">${icon}</div>
            <div class="pr-info">
              <div class="pr-action">${r.action}</div>
              <div class="pr-time">${r.time}</div>
            </div>
            <div style="text-align:right;">
              <div class="pr-amount ${r.amount > 0 ? 'positive' : 'negative'}" style="color:${r.amount > 0 ? '#38A169' : '#E53E3E'};">
                ${r.amount > 0 ? '+' : ''}${r.amount} ${r.cat}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
};

// ========== 积分兑换 ==========
window.render_page_points_exchange = function() {
  const user = Store.get('user');
  const el = document.getElementById('points-exchange-content');
  if (!el) return;

  const exchanges = [
    { type: 'watch', icon: '👁', name: 'WATCH → HP', rate: '100 WATCH = 20 HP', color: '#3182CE', amount: user.watch },
    { type: 'exp', icon: '🧪', name: 'EXP → HP', rate: '100 EXP = 50 HP', color: '#805AD5', amount: user.exp },
    { type: 'gov', icon: '🗳', name: 'GOV → HP', rate: '100 GOV = 120 HP', color: '#2F855A', amount: user.gov },
    { type: 'data', icon: '📡', name: 'DATA → HP', rate: '100 DATA = 80 HP', color: '#2B6CB0', amount: user.data },
    { type: 'mp', icon: '💎', name: 'MP → HP', rate: '100 MP = 150 HP', color: '#D69E2E', amount: user.mp }
  ];

  el.innerHTML = `
    <div style="padding:16px;background:linear-gradient(135deg,#0A1628,#1E3A5F);">
      <div style="font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:8px;">单向兑换：非HP积分可兑换为HP，不可反向</div>
      <div style="font-size:20px;font-weight:800;color:var(--accent);">当前 HP: ${formatNumber(user.hp)}</div>
    </div>

    <div style="padding:16px 16px 8px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:12px;">选择兑换类型</div>
      <div class="exchange-options">
        ${exchanges.map(ex => `
          <div class="exchange-card" onclick="openExchangeModal('${ex.type}')">
            <div class="exc-icon" style="color:${ex.color};">${ex.icon}</div>
            <div class="exc-name">${ex.name}</div>
            <div class="exc-rate">${ex.rate}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">余额: ${formatNumber(ex.amount)}</div>
            <button class="exc-btn" style="color:${ex.color};background:${ex.color}15;">立即兑换</button>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title">💡 兑换规则说明</div>
      <div style="font-size:13px;color:var(--text-sub);line-height:1.8;">
        • <strong>积分是平台对你贡献的凭证</strong>，HP是消费端货币<br>
        • <strong>单向兑换</strong>：各类型积分→HP，不可逆向兑换<br>
        • <strong>区块链存证</strong>：每笔兑换上链记录，可审计<br>
        • <strong>动态平衡</strong>：兑换的HP来自赞助商储备池<br>
        • 每天最多兑换10000 HP等值积分
      </div>
    </div>
  `;
};

// ========== 商城 ==========
window.render_page_mall = function() {
  filterMall(currentMallFilter, null);
};

function filterMall(type, el) {
  currentMallFilter = type;
  if (el) {
    document.querySelectorAll('#page-mall .nbt-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const products = Store.get('products');
  const user = Store.get('user');
  const filtered = type === 'all' ? products : products.filter(p => p.category === type);
  const el2 = document.getElementById('mall-content');
  if (!el2) return;

  el2.innerHTML = `
    <div class="mall-banner">
      <div class="mb-info">
        <div class="mb-title">积分商城</div>
        <div class="mb-sub">用积分兑换真实权益</div>
      </div>
      <div>
        <div style="font-size:11px;color:rgba(255,255,255,0.55);">HP余额</div>
        <div class="mb-points">${formatNumber(user.hp)}</div>
      </div>
    </div>
    <div class="product-grid">
      ${filtered.map(p => `
        <div class="product-card" onclick="navigate('page-product', {id:'${p.id}'})">
          <div class="pc-img">
            ${p.emoji}
            ${p.tags.includes('热门') || p.tags.includes('爆款') ? '<div class="pc-tag">热门</div>' : p.tags.includes('限量') ? '<div class="pc-tag" style="background:var(--pioneer);">限量</div>' : ''}
          </div>
          <div class="pc-body">
            <div class="pc-name">${p.name}</div>
            <div class="pc-company">${p.company}</div>
            <div style="display:flex;align-items:baseline;gap:4px;">
              <div class="pc-price">${formatNumber(p.price)}</div>
              <div class="pc-price-label">HP</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ========== 商品详情 ==========
window.render_page_product = function(data) {
  const products = Store.get('products');
  const product = data && data.id ? products.find(p => p.id === data.id) : products[0];
  if (!product) return;
  const user = Store.get('user');
  const canBuy = user.hp >= product.price;

  const el = document.getElementById('product-content');
  if (!el) return;

  el.innerHTML = `
    <div style="height:240px;background:linear-gradient(135deg,#F7FAFC,#EDF2F7);display:flex;align-items:center;justify-content:center;position:relative;">
      <div style="font-size:96px;">${product.emoji}</div>
      <div style="position:absolute;top:16px;left:16px;width:36px;height:36px;background:rgba(0,0,0,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;" onclick="goBack()">←</div>
      ${product.tags.includes('限量') ? '<div style="position:absolute;top:16px;right:16px;background:var(--pioneer);color:#fff;font-size:11px;padding:4px 10px;border-radius:20px;font-weight:700;">限量</div>' : ''}
    </div>

    <div style="background:#fff;padding:16px;margin-bottom:8px;">
      <div style="display:flex;gap:6px;margin-bottom:10px;">
        ${product.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div style="font-size:20px;font-weight:800;color:var(--text-main);margin-bottom:4px;">${product.name}</div>
      <div style="font-size:14px;color:var(--text-muted);margin-bottom:12px;">${product.company}</div>
      <div style="display:flex;align-items:baseline;gap:6px;">
        <div style="font-size:28px;font-weight:900;color:var(--accent);">${formatNumber(product.price)}</div>
        <div style="font-size:14px;color:var(--text-muted);">HP积分</div>
        <div style="font-size:13px;text-decoration:line-through;color:var(--text-muted);">原价 ${formatNumber(product.originalPrice)}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">商品详情</div>
      <div class="card-sub">${product.desc}</div>
      <div style="margin-top:12px;font-size:13px;color:var(--text-muted);">库存：${product.stock} 件 · 上架企业：${product.company}</div>
    </div>

    <div class="card">
      <div class="card-title">积分说明</div>
      <div style="font-size:13px;color:var(--text-sub);line-height:1.7;">
        • 消耗 HP 积分（消费积分）完成兑换<br>
        • 不足HP？可将 WATCH/EXP 等积分兑换为HP<br>
        • 兑换记录链上存证，不可撤销<br>
        • 实体商品7日内发货；数字权益即时到账
      </div>
    </div>
  `;

  const bottomBar = document.getElementById('product-bottom-bar');
  if (bottomBar) {
    bottomBar.innerHTML = `
      ${!canBuy ? `<div style="flex:1;padding:8px;text-align:center;font-size:13px;color:var(--danger);">HP不足，先去<span style="color:var(--primary);cursor:pointer;" onclick="navigate('page-points-exchange')">兑换积分</span></div>` : ''}
      <button class="bab-btn ${canBuy ? 'accent' : 'ghost'}" onclick="${canBuy ? `navigate('page-order-confirm', {productId:'${product.id}'})` : `navigate('page-points-exchange')`}">
        ${canBuy ? '立即兑换' : '去兑换积分'}
      </button>
    `;
  }
};

// ========== 订单确认 ==========
window.render_page_order_confirm = function(data) {
  const products = Store.get('products');
  const product = data && data.productId ? products.find(p => p.id === data.productId) : products[0];
  if (!product) return;
  const user = Store.get('user');

  const el = document.getElementById('order-confirm-content');
  if (!el) return;

  el.innerHTML = `
    <div class="order-confirm-body">
      <div class="oc-product-row">
        <div class="oc-product-img">${product.emoji}</div>
        <div>
          <div class="oc-product-name">${product.name}</div>
          <div class="oc-product-company">${product.company}</div>
        </div>
      </div>
      <div class="oc-detail">
        <div class="oc-row"><span class="oc-label">商品价格</span><span class="oc-value">${formatNumber(product.price)} HP</span></div>
        <div class="oc-row"><span class="oc-label">优惠</span><span class="oc-value" style="color:var(--success);">-0</span></div>
        <div class="oc-row"><span class="oc-label">当前HP</span><span class="oc-value">${formatNumber(user.hp)}</span></div>
        <div class="oc-row"><span class="oc-label">兑换后余额</span><span class="oc-value accent">${formatNumber(user.hp - product.price)}</span></div>
      </div>
      <div class="compliance-banner" style="margin:12px 0 0;">
        <strong>积分合规</strong>：HP积分为纯消费型权益，不可提现、不可交易、不可转让。兑换商品由第三方提供，平台仅提供兑换渠道。
      </div>
    </div>
  `;

  const bottomBar = document.getElementById('order-confirm-bar');
  if (bottomBar) {
    bottomBar.innerHTML = `
      <button class="bab-btn ghost" onclick="goBack()">返回</button>
      <button class="bab-btn accent" onclick="doCreateOrder('${product.id}')">确认兑换</button>
    `;
  }
};

// ========== 订单列表 ==========
window.render_page_order_list = function() {
  const user = Store.get('user');
  const el = document.getElementById('order-list-content');
  if (!el) return;

  el.innerHTML = user.orders.length === 0 ? `
    <div class="empty-state">
      <div class="empty-icon">📦</div>
      <div class="empty-title">暂无订单</div>
      <div class="empty-desc">去积分商城兑换你喜欢的商品吧</div>
      <button onclick="navigate('page-mall')" style="margin-top:16px;background:var(--primary);color:#fff;border:none;padding:10px 24px;border-radius:20px;font-size:14px;cursor:pointer;">去商城</button>
    </div>
  ` : `
    <div style="padding:12px 0;">
      ${user.orders.map(o => `
        <div class="list-item">
          <div class="li-icon">📦</div>
          <div class="li-info">
            <div class="li-title">${o.productName}</div>
            <div class="li-sub">${o.time}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:14px;font-weight:700;color:var(--accent);">-${o.total} HP</div>
            <span class="badge badge-success">${o.status}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== AI写作助手 ==========
window.render_page_ai_writer = function() {
  const el = document.getElementById('ai-writer-content');
  if (!el) return;

  const templates = [
    { icon: '📊', title: '上市公司分析报告', desc: '选择一家合力指数企业，AI辅助生成专业深度研报，获取最高+300 EXP', reward: '+300 EXP/篇' },
    { icon: '🎬', title: '综艺内容点评', desc: '观看《智造者》剧集后，写下你的深度观感与产业洞察', reward: '+100 EXP/篇' },
    { icon: '💡', title: '产业趋势洞察', desc: 'AI+X赛道深度分析，发现被市场忽视的价值信号', reward: '+200 EXP/篇' },
    { icon: '🔮', title: 'MP故事贡献', desc: '记录企业人性温度瞬间，为合力指数MP维度添砖加瓦', reward: '+50 MP/篇' }
  ];

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#0A1628,#1E3A5F);padding:28px 20px 20px;">
      <div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;">✍️ AI写作助手</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.55);">发布优质内容，赚取 EXP/MP 积分</div>
    </div>
    <div style="padding:16px 0 8px;">
      <div style="padding:0 16px 12px;font-size:14px;font-weight:700;color:var(--text-main);">选择写作模板</div>
      <div class="writer-templates">
        ${templates.map(t => `
          <div class="wt-card" onclick="openWriterTemplate('${t.title}')">
            <div class="wt-icon">${t.icon}</div>
            <div class="wt-info">
              <div class="wt-title">${t.title}</div>
              <div class="wt-desc">${t.desc}</div>
              <div class="wt-reward">🎁 ${t.reward}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// ========== MP积分说明 ==========
window.render_page_mp_explain = function() {
  const el = document.getElementById('mp-explain-content');
  if (!el) return;

  el.innerHTML = `
    <div class="mp-hero">
      <div class="mp-icon">💎</div>
      <div class="mp-title">MP · 意义贡献积分</div>
      <div class="mp-sub">衡量你在AI时代人性温度的贡献<br>从注意力到意义，从消费到共创</div>
    </div>

    <div class="card">
      <div class="card-title">什么是MP积分？</div>
      <div class="card-sub">
        MP（Meaning Point）是合力生态独创的第五维度积分。在AGI元年，99.9%的认知劳动由机器完成，但人类的温度、判断与意义，仍是无可替代的价值源泉。<br><br>
        MP积分正是对这0.1%「人性贡献」的量化与激励。它衡量你在平台上创造的情感连接、意义叙事和人性温度。
      </div>
    </div>

    <div style="padding:0 16px 8px;font-size:15px;font-weight:700;color:var(--text-main);">三大评估维度</div>
    <div class="mp-dimension">
      <div class="mpd-head"><div class="mpd-icon">🏢</div><div class="mpd-title">企业社会意义贡献度</div><div class="mpd-score">82</div></div>
      <div class="mpd-desc">评估企业在社会层面创造的真实意义：解决了什么问题？改善了哪些人的生活？创造了什么超越商业的价值？</div>
    </div>
    <div class="mp-dimension">
      <div class="mpd-head"><div class="mpd-icon">❤️</div><div class="mpd-title">品牌情感连接指数</div><div class="mpd-score">76</div></div>
      <div class="mpd-desc">用户与品牌之间形成的情感纽带强度。不只是满意度，而是共鸣度——品牌是否触动了你心底的某个角落？</div>
    </div>
    <div class="mp-dimension">
      <div class="mpd-head"><div class="mpd-icon">🤝</div><div class="mpd-title">技术人性化应用评分</div><div class="mpd-score">71</div></div>
      <div class="mpd-desc">技术应用是否让人感到被尊重、被理解？AI产品是否保留了人的主体性？这是MP最核心的测量维度。</div>
    </div>

    <div class="card">
      <div class="card-title">MP的更大价值</div>
      <div class="card-sub">
        MP积分不只是平台内的小积分，它构成了<strong>「善意资本」配置的参考标准</strong>：<br><br>
        • 为ESG基金提供量化参考<br>
        • 为影响力投资提供决策依据<br>
        • 为上市公司提供新型市值叙事框架<br>
        • 为C端个人提供意义变现通道<br><br>
        <em style="color:var(--accent);">让注意力被定价，让人性被传承。</em>
      </div>
    </div>

    <div style="height:20px;"></div>
  `;
};

// ========== 关于页面 ==========
window.render_page_about = function() {
  const el = document.getElementById('about-content');
  if (!el) return;

  el.innerHTML = `
    <div class="about-hero">
      <div class="about-logo">🔗</div>
      <div class="about-title">合力生态</div>
      <div class="about-sub">HARMONY LINKAGE<br>产业叙事与公众注意力价值平台<br><br>AI时代上市公司产业认知、叙事传播与公众关注度量化平台</div>
    </div>

    <div class="card" style="margin-top:16px;">
      <div class="card-title">我们的使命</div>
      <div class="card-sub">
        AGI元年到来，99.9%的认知劳动将由机器完成。合力生态守护AI时代最后的0.1%——<strong>人类的温度、判断与意义</strong>。<br><br>
        我们相信：公众的产业关注度是最稀缺的资源。合力生态是那个让产业叙事被看见、让公众注意力产生价值的平台。
      </div>
    </div>

    <div style="padding:16px 16px 8px;font-size:15px;font-weight:700;color:var(--text-main);">三步战略</div>

    <div class="strategy-card">
      <div class="sc-stage validate">验证期 · 2026</div>
      <div class="sc-title">验证全链路闭环</div>
      <div class="sc-desc">《智造者》第一季播出，验证综艺→积分→指数→Agent全链路闭环。开放各类合作邀约，汇聚共建力量。</div>
    </div>
    <div class="strategy-card">
      <div class="sc-stage growth">成长期 · 2027</div>
      <div class="sc-title">商城与社区规模化</div>
      <div class="sc-desc">积分商城规模化运营，更多B端企业入驻。社区共建委员会正式运作，社区治理模型成熟。龙虾Agent功能持续完善。</div>
    </div>
    <div class="strategy-card">
      <div class="sc-stage ecosystem">生态期 · 2028</div>
      <div class="sc-title">社区共建·指数级成长</div>
      <div class="sc-desc">社区共建模型全面运行，生态参与者指数级增长。打造国内领先的产业叙事与公众关注度量化平台。</div>
    </div>

    <div style="padding:16px 16px 8px;font-size:15px;font-weight:700;color:var(--text-main);">五重壁垒</div>
    <div class="card">
      ${[
        ['🤝', '团队信任基础', '长期合作积累，执行效率高'],
        ['📜', '数交所备案合规', '合规门槛高，先发合规基础'],
        ['🏢', '企业高管关系网络', '每年数场上市公司颁奖，高管关系过百'],
        ['📊', '数据飞轮沉淀', '多积分兑换体系形成数据飞轮，网络效应强'],
        ['🌐', '产业叙事先发生态位', '首个将公众产业关注度量化的新质生产力平台']
      ].map(([icon, title, desc], i) => `
        <div style="display:flex;gap:12px;${i > 0 ? 'margin-top:12px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.04);' : ''}">
          <div style="font-size:20px;">${icon}</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:2px;">${i+1}. ${title}</div>
            <div style="font-size:12px;color:var(--text-sub);">${desc}</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="era-card" style="margin-top:16px;cursor:pointer;" onclick="navigate('page-join-opportunity')">
      <div class="era-quote">"让产业叙事被看见，让公众关注有价值。合力生态期待与各方力量共建共享"</div>
      <div class="era-source">— 合力生态 创始人</div>
      <div style="margin-top:12px;display:flex;gap:12px;justify-content:center;">
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--accent);">开放</div><div style="font-size:11px;color:rgba(255,255,255,0.4);">加入机会</div></div>
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--accent);">4种</div><div style="font-size:11px;color:rgba(255,255,255,0.4);">合作形态</div></div>
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--accent);">共建</div><div style="font-size:11px;color:rgba(255,255,255,0.4);">共享未来</div></div>
      </div>
      <div style="margin-top:10px;text-align:center;font-size:13px;color:var(--accent);">点击查看 → 成为股东 / 平台共建者 / 赛道参与者 / 第三方合作</div>
    </div>
    <div style="height:20px;"></div>
  `;
};

// ========== 商家登录 ==========
window.render_page_merchant_login = function() {
  const el = document.getElementById('merchant-login-content');
  if (!el) return;
  el.innerHTML = `
    <div class="login-page">
      <div class="login-logo">
        <div class="login-logo-icon">🏪</div>
        <div class="login-logo-title">商家入驻</div>
        <div class="login-logo-sub">B端企业数据看板 · 合力智脑商家版</div>
      </div>
      <div class="login-form">
        <input type="email" id="merchant-email" class="form-input" placeholder="企业邮箱" value="byd@example.com">
        <input type="password" id="merchant-pwd" class="form-input" placeholder="密码" value="123456">
        <button class="login-btn" onclick="doMerchantLogin()">登录商家后台</button>
      </div>
      <div class="login-alt">测试账号：byd@example.com / 123456</div>
      <div style="margin-top:24px;padding:16px;background:var(--bg);border-radius:var(--radius);">
        <div style="font-size:13px;font-weight:700;color:var(--text-main);margin-bottom:8px;">商家入驻权益</div>
        ${['数据看板：实时查看品牌曝光与ROI', '合力智脑商家版：AI自动生成运营报告', '积分激励任务：驱动用户互动', '合力指数：品牌人性温度实时管理'].map(item => `
          <div style="font-size:12px;color:var(--text-sub);margin-bottom:6px;display:flex;gap:6px;"><span style="color:var(--success);">✓</span>${item}</div>
        `).join('')}
      </div>
    </div>
  `;
};

// ========== 商家后台 ==========
window.render_page_merchant_dashboard = function() {
  const merchant = Store.get('merchant');
  const d = merchant.dashboard;
  const el = document.getElementById('merchant-dashboard-content');
  if (!el) return;

  el.innerHTML = `
    <div class="compliance-banner">⚠️ 商家后台数据仅供运营参考，不构成任何投资建议或市值管理服务</div>
    <div class="merchant-header">
      <div class="mh-title">${merchant.name}</div>
      <div class="mh-sub">产业热度数据看板 · ${formatDate()}</div>
    </div>

    <div style="padding:16px 0;">
      <div style="padding:0 16px 10px;font-size:14px;font-weight:700;color:var(--text-main);">本月核心指标</div>
      <div class="dashboard-stats">
        ${[
          { icon: '💰', num: `¥${formatNumber(d.monthRevenue)}`, label: '月度收入', change: '+18%', up: true },
          { icon: '📦', num: d.monthOrders, label: '月度订单', change: '+12%', up: true },
          { icon: '👥', num: formatNumber(d.activeUsers), label: '活跃用户', change: '+16%', up: true },
          { icon: '📊', num: d.brandScore, label: '产业热度', change: '+3.2', up: true }
        ].map(item => `
          <div class="ds-card">
            <div class="ds-icon">${item.icon}</div>
            <div class="ds-num">${item.num}</div>
            <div class="ds-label">${item.label}</div>
            <div class="ds-change ${item.up ? 'up' : 'down'}">${item.up ? '↑' : '↓'} ${item.change}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="card-title" style="margin-bottom:0">注意力转化漏斗</div>
        <span style="font-size:12px;color:var(--success);">ROI 4.2x 行业均值</span>
      </div>
      ${[['曝光触达', '18,924', 100], ['内容互动', '8,347', 44], ['积分参与', '3,629', 19], ['商城转化', '1,283', 7], ['复购用户', '456', 2.4]].map(([label, num, pct]) => `
        <div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
            <span style="font-size:12px;color:var(--text-sub);">${label}</span>
            <span style="font-size:12px;font-weight:700;color:var(--text-main);">${num} (${pct}%)</span>
          </div>
          <div class="chart-bar-h"><div class="chart-bar-h-fill" style="width:${pct}%;"></div></div>
        </div>
      `).join('')}
    </div>

    <div style="padding:12px 16px 8px;font-size:14px;font-weight:700;color:var(--text-main);">快捷操作</div>
    <div style="margin:0 16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
      ${[
        { icon: '🤖', label: '合力智脑企业版', action: "navigate('page-brain')" },
        { icon: '📊', label: '导出运营报告', action: "showToast('正在生成报告...')" },
        { icon: '🎯', label: '发布积分激励任务', action: "showToast('任务发布成功！')" },
        { icon: '📈', label: '热度数据看板', action: "navigate('page-rank')" }
      ].map(btn => `
        <div onclick="${btn.action}" style="background:#fff;border-radius:var(--radius);padding:14px;display:flex;align-items:center;gap:10px;cursor:pointer;box-shadow:var(--shadow);">
          <span style="font-size:22px;">${btn.icon}</span>
          <span style="font-size:13px;font-weight:600;color:var(--text-main);">${btn.label}</span>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 产业社区 ==========
window.render_page_community = function() {
  filterCommunity(currentCommunityFilter, null);
};

function filterCommunity(category, el) {
  currentCommunityFilter = category || '全部';
  if (el) {
    document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  }
  const community = Store.get('community');
  const topics = category === '全部' ? community.topics : community.topics.filter(t => t.category === category);
  const el2 = document.getElementById('community-content');
  if (!el2) return;

  el2.innerHTML = `
    <div style="padding:12px 0 4px;">
      <div style="padding:0 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:14px;font-weight:700;color:var(--text-main);">热门话题</span>
        <span style="font-size:13px;color:var(--primary-light);cursor:pointer;" onclick="navigate('page-scholars')">👨‍🏫 学者专区 ›</span>
      </div>
      ${topics.map(t => `
        <div class="topic-card" onclick="navigate('page-topic-detail', {id:'${t.id}'})">
          <div class="topic-author-row">
            <span class="topic-avatar">${t.avatar}</span>
            <span class="topic-author-name">${t.author}</span>
            <span class="topic-time">${t.time}</span>
            <span class="topic-category">${t.category}</span>
          </div>
          <div class="topic-title ${t.hot ? 'hot' : ''}">${t.title}</div>
          <div class="topic-tags">
            ${t.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            ${t.hot ? '<span class="topic-hot-badge">HOT</span>' : ''}
          </div>
          <div class="topic-stat-row">
            <span>👍 ${t.likes}</span>
            <span>💬 ${t.comments}</span>
            <span>👁 ${formatNumber(t.views)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ========== 话题详情 ==========
window.render_page_topic_detail = function(data) {
  const community = Store.get('community');
  const topic = data && data.id ? community.topics.find(t => t.id === data.id) : community.topics[0];
  if (!topic) return;
  const el = document.getElementById('topic-detail-content');
  if (!el) return;

  el.innerHTML = `
    <div class="topic-detail-header">
      <div class="topic-category" style="margin-bottom:10px;">${topic.category}</div>
      <div class="topic-detail-title">${topic.title}</div>
      <div class="topic-detail-meta">
        <span>${topic.avatar} ${topic.author}</span>
        <span>${topic.time}</span>
        <span>👁 ${formatNumber(topic.views)}</span>
      </div>
    </div>
    <div class="compliance-banner" style="margin:0;border-radius:0;">本内容仅代表用户个人观点，不构成任何投资建议。请理性讨论，禁止发布投资建议。</div>
    <div class="topic-detail-body">
      <p>${topic.title}是当前产业讨论的热门话题。从${topic.category}的角度来看，这个问题涉及多个层面：技术创新、市场竞争、用户价值等。</p>
      <p>在${COMPLIANCE.indexShortname}中，与${topic.tags[0] || '产业'}相关的上市公司关注度持续上升，反映了公众对此领域的浓厚兴趣。</p>
      <p>欢迎在评论区分享你的观点和看法。请注意：所有讨论需遵守平台合规规范，禁止发布任何形式的投资建议。</p>
    </div>
    <div style="padding:16px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:12px;">评论区</div>
      <div style="display:flex;gap:10px;margin-bottom:14px;">
        <input type="text" style="flex:1;border:1.5px solid rgba(0,0,0,0.1);border-radius:20px;padding:8px 14px;font-size:14px;outline:none;" placeholder="发表评论（请遵守合规规范）...">
        <button style="background:var(--primary);color:#fff;border:none;padding:8px 16px;border-radius:20px;font-size:14px;cursor:pointer;" onclick="showToast('评论发布成功！AI审核中... +30 EXP')">发送</button>
      </div>
      <div style="font-size:13px;color:var(--text-muted);text-align:center;padding:20px;">暂无评论，快来发表第一条吧</div>
    </div>
  `;
};

// ========== 学者专区 ==========
window.render_page_scholars = function() {
  const scholars = Store.get('community').scholars;
  const el = document.getElementById('scholars-content');
  if (!el) return;

  el.innerHTML = `
    <div style="padding:12px 0;">
      <div style="padding:0 16px 10px;font-size:14px;color:var(--text-sub);line-height:1.6;">
        以下学者已完成实名认证，其观点仅代表个人学术判断，不构成任何投资建议。
      </div>
      ${scholars.map(s => `
        <div class="scholar-card">
          <div class="scholar-avatar">${s.avatar}</div>
          <div class="scholar-info">
            <div class="scholar-name">${s.name} <span class="scholar-verified">✓认证</span></div>
            <div class="scholar-title">${s.title} · ${s.field}</div>
            <div class="scholar-stats">
              <span>📝 ${s.articles}篇</span>
              <span>👥 ${formatNumber(s.followers)}关注</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 合规文档页面 ==========
window.render_page_compliance_agreement = function() {
  const doc = Store.get('compliance').userAgreement;
  const el = document.getElementById('agreement-content');
  if (!el) return;
  el.innerHTML = renderComplianceDoc(doc);
};

window.render_page_compliance_privacy = function() {
  const doc = Store.get('compliance').privacyPolicy;
  const el = document.getElementById('privacy-content');
  if (!el) return;
  el.innerHTML = renderComplianceDoc(doc);
};

window.render_page_compliance_methodology = function() {
  const m = Store.get('compliance').indexMethodology;
  const el = document.getElementById('methodology-content');
  if (!el) return;

  el.innerHTML = `
    <div class="compliance-page">
      <div class="compliance-page-header">
        <h2>${m.title}</h2>
        <p class="version">${m.version} · ${m.effectiveDate}</p>
      </div>

      <div class="compliance-banner">${m.description}</div>

      <div class="methodology-card">
        <h4>五维指标体系</h4>
        ${m.indicators.map(ind => `
          <div class="indicator-row">
            <div class="indicator-weight">${ind.weight}%</div>
            <div class="indicator-info">
              <div class="indicator-name">${ind.name}</div>
              <div class="indicator-desc">${ind.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="methodology-card">
        <h4>编制原则</h4>
        ${m.principles.map(p => `<div class="methodology-principle"><span>${p}</span></div>`).join('')}
      </div>

      <div style="margin:16px 0 12px;font-size:14px;font-weight:700;color:var(--text-main);">指数参数</div>
      <div class="compliance-section">
        <div class="oc-row"><span class="oc-label">更新频率</span><span class="oc-value">${m.updateFrequency}</span></div>
        <div class="oc-row"><span class="oc-label">覆盖范围</span><span class="oc-value">${m.coverage}</span></div>
        <div class="oc-row"><span class="oc-label">数据来源</span><span class="oc-value">100%客观用户行为数据</span></div>
      </div>
    </div>
  `;
};

function renderComplianceDoc(doc) {
  return `
    <div class="compliance-page">
      <div class="compliance-page-header">
        <h2>${doc.title}</h2>
        <p class="version">${doc.version} · ${doc.effectiveDate}</p>
      </div>
      ${doc.sections.map(s => `
        <div class="compliance-section">
          <h3>${s.title}</h3>
          <p>${s.content}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// ========== 合规中心Hub渲染 ==========
window.render_page_compliance_hub = function() {
  // Content is already in HTML, no dynamic rendering needed
};

// ========== 社区发布弹窗 ==========
function openPublishModal() {
  const categories = Store.get('community').categories.filter(c => c !== '全部');
  showModal(`
    <div class="publish-modal">
      <h3>✏️ 发布话题</h3>
      <div class="publish-cat-select" id="publish-cats">
        ${categories.map((c, i) => `<span class="publish-cat-opt ${i === 0 ? 'active' : ''}" onclick="selectPublishCat(this)">${c}</span>`).join('')}
      </div>
      <textarea class="publish-textarea" id="publish-text" placeholder="分享你的产业观察、公司研究、产品体验..."></textarea>
      <div class="publish-compliance">禁止发布任何形式的投资建议、股票推荐、目标价预测。违规内容将被AI审核自动拦截，严重者封号处理。</div>
      <button class="publish-submit" onclick="doPublish()">发布</button>
    </div>
  `);
}

function selectPublishCat(el) {
  document.querySelectorAll('.publish-cat-opt').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function doPublish() {
  const text = document.getElementById('publish-text');
  if (!text || !text.value.trim()) { showToast('请输入内容'); return; }
  // Simulate AI compliance check
  const banned = ['买入', '卖出', '目标价', '必涨', '推荐买入', '抄底', '止损'];
  const content = text.value;
  for (const word of banned) {
    if (content.includes(word)) {
      showToast('❌ 内容包含违禁词汇，请修改后重新发布');
      return;
    }
  }
  closeModal();
  showToast('✅ 发布成功！AI审核通过 +50 EXP积分');
}

function toggleTopicLike(el) {
  el.classList.toggle('liked');
  const icon = el.querySelector('.topic-action-icon');
  if (el.classList.contains('liked')) {
    icon.textContent = '❤️';
    el.querySelector('span:last-child').textContent = '已点赞';
  } else {
    icon.textContent = '🤍';
    el.querySelector('span:last-child').textContent = '点赞';
  }
}

// ========== v3.0 新增渲染函数 ==========

// --- 开放加入机会 ---
window.render_page_join_opportunity = function() {
  const el = document.getElementById('join-opportunity-content');
  if (!el) return;
  const items = Store.get('joinOpportunity') || MOCK_DATA.joinOpportunity;
  el.innerHTML = `
    <div class="join-hero">
      <div class="join-hero-title">🤝 开放加入合力生态</div>
      <div class="join-hero-sub">成为共建者，共享产业叙事新时代</div>
    </div>
    ${items.map(item => `
      <div class="join-card" onclick="showToast('${item.form}')">
        <div class="join-card-header">
          <div class="join-card-icon">${item.icon}</div>
          <div>
            <div class="join-card-title">${item.title}</div>
            <div class="join-card-subtitle">${item.subtitle}</div>
          </div>
        </div>
        <div class="join-card-desc">${item.desc}</div>
        <div class="join-card-req-title">加入条件</div>
        ${item.requirements.map(r => `<div class="join-card-req-item">${r}</div>`).join('')}
        <div class="join-card-form">📧 ${item.form}</div>
      </div>
    `).join('')}
    <div class="collab-contact">
      欢迎各界力量加入合力生态共建<br>
      官方邮箱：<strong>contact@heli-ai.com</strong>
    </div>
  `;
};

// --- 算力纪录片政企合作邀约 ---
window.render_page_collab_gov = function() {
  const el = document.getElementById('collab-gov-content');
  if (!el) return;
  const d = MOCK_DATA.collaboration.govDoc;
  el.innerHTML = `
    <div class="collab-hero">
      <div class="collab-hero-icon">${d.hero}</div>
      <div class="collab-hero-title">${d.title}</div>
      <div class="collab-hero-sub">${d.subtitle}</div>
    </div>
    <div class="collab-desc">${d.desc}</div>

    ${d.targets.map(t => `
      <div class="collab-section">
        <div class="collab-section-title">${t.icon} ${t.type}</div>
        <div class="collab-target-card">
          ${t.items.map(item => `<div class="collab-target-item">• ${item}</div>`).join('')}
        </div>
      </div>
    `).join('')}

    <div class="collab-section">
      <div class="collab-section-title">📋 合作形式</div>
      ${d.cooperationForms.map(f => `
        <div class="collab-form-card" onclick="showToast('合作意向已提交，3个工作日内回复')">
          <div class="collab-form-title">${f.title}</div>
          <div class="collab-form-desc">${f.desc}</div>
          <div class="collab-form-benefit">✅ ${f.benefit}</div>
        </div>
      `).join('')}
    </div>

    <div class="collab-contact">
      ${d.contact}<br>
      <strong>合作咨询：contact@heli-ai.com</strong>
    </div>
  `;
};

// --- 综艺企业合作邀约 ---
window.render_page_collab_show = function() {
  const el = document.getElementById('collab-show-content');
  if (!el) return;
  const d = MOCK_DATA.collaboration.showCoop;
  el.innerHTML = `
    <div class="collab-hero">
      <div class="collab-hero-icon">${d.hero}</div>
      <div class="collab-hero-title">${d.title}</div>
      <div class="collab-hero-sub">${d.subtitle}</div>
    </div>
    <div class="collab-desc">${d.desc}</div>

    ${d.targets.map(t => `
      <div class="collab-section">
        <div class="collab-section-title">${t.icon} ${t.type}</div>
        <div class="collab-target-card">
          ${t.items.map(item => `<div class="collab-target-item">• ${item}</div>`).join('')}
        </div>
      </div>
    `).join('')}

    <div class="collab-section">
      <div class="collab-section-title">🌟 合作权益</div>
      ${d.benefits.map(b => `
        <div class="collab-benefit-card">
          <div class="collab-benefit-title">${b.title}</div>
          <div class="collab-benefit-desc">${b.desc}</div>
          <div class="collab-benefit-detail">${b.detail}</div>
        </div>
      `).join('')}
    </div>

    <div class="collab-contact">
      ${d.contact}<br>
      <strong>节目合作：show@heli-ai.com</strong>
    </div>
  `;
};

// --- 社区共建模型 ---
window.render_page_dao_hub = function() {
  const el = document.getElementById('dao-hub-content');
  if (!el) return;
  const d = MOCK_DATA.communityGovernance;
  el.innerHTML = `
    <div class="dao-hero">
      <div class="dao-hero-icon">🏛</div>
      <div class="dao-hero-title">${d.name}</div>
      <div class="dao-hero-sub">${d.subtitle}</div>
      <div class="dao-hero-desc">${d.desc}</div>
    </div>

    <div class="dao-section">
      <div class="dao-section-title">🏗 治理架构</div>
      ${d.structure.map(s => `
        <div class="dao-structure-card">
          <div class="dao-structure-icon">${s.icon}</div>
          <div class="dao-structure-info">
            <div class="dao-structure-title">${s.title}</div>
            <div class="dao-structure-desc">${s.desc}</div>
            <div class="dao-structure-members">👥 ${s.members} 人</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="dao-section">
      <div class="dao-section-title">📅 发展里程碑</div>
      ${d.milestones.map(m => `
        <div class="dao-milestone">
          <div class="dao-milestone-phase">${m.phase}</div>
          ${m.items.map(item => `<div class="dao-milestone-item">${item}</div>`).join('')}
        </div>
      `).join('')}
    </div>

    <div class="dao-section">
      <div class="dao-section-title">📜 治理规则</div>
      ${d.governanceRules.map(rule => `
        <div class="dao-rule-card"><div class="dao-rule-text">${rule}</div></div>
      `).join('')}
    </div>

    <div class="collab-contact">
      欢迎贡献社区力量，参与共建治理<br>
      <strong>共建咨询：governance@heli-ai.com</strong>
    </div>
  `;
};

// --- 用户手册 ---
window.render_page_compliance_manual = function() {
  const el = document.getElementById('manual-content');
  if (!el) return;
  const doc = MOCK_DATA.compliance.userManual;
  el.innerHTML = `
    <div class="doc-page">
      <div class="doc-page-header">
        <h2>📖 ${doc.title}</h2>
        <div class="version">${doc.version}</div>
      </div>
      ${doc.sections.map(s => `
        <div class="doc-section">
          <div class="doc-section-title">${s.title}</div>
          <div class="doc-section-content">${s.content}</div>
        </div>
      `).join('')}
    </div>
  `;
};

// --- 积分规则 ---
window.render_page_points_rules = function() {
  const el = document.getElementById('points-rules-content');
  if (!el) return;
  const doc = MOCK_DATA.compliance.pointsRules;
  el.innerHTML = `
    <div class="doc-page">
      <div class="doc-page-header">
        <h2>💎 ${doc.title}</h2>
        <div class="version">${doc.version}</div>
      </div>
      <div class="compliance-banner" style="margin-bottom:16px;">
        <strong>合规声明</strong>：平台积分为纯消费型权益，不可提现、不可交易、不可转让，不代表任何金融资产或证券权益。
      </div>
      ${doc.sections.map(s => `
        <div class="doc-section">
          <div class="doc-section-title">${s.title}</div>
          <div class="doc-section-content">${s.content}</div>
        </div>
      `).join('')}
    </div>
  `;
};
