/* =============================================
   app-pioneer.js - Pioneer OS 子站逻辑
   上市公司垂直产业叙事基础设施
   v2.1 合规版 - 移除市值管理表述
   ============================================= */

// ========== Pioneer OS 主页面渲染 ==========
window.render_page_pioneer_hub = function() {
  const mode = Store.get('pioneerMode') || 'c';
  renderPioneerContent(mode);
};

function renderPioneerContent(mode) {
  const el = document.getElementById('pioneer-main-content');
  if (!el) return;

  if (mode === 'c') renderPioneerC(el);
  else if (mode === 'b') renderPioneerB(el);
  else if (mode === 'gov') renderPioneerGov(el);
}

// ========== C端个人版 ==========
function renderPioneerC(el) {
  const companies = Store.get('companies');
  el.innerHTML = `
    <div class="pioneer-hero">
      <div class="ph-hero-title">发现被市场忽视的<br>产业温度信号</div>
      <div class="ph-hero-sub">Pioneer OS是上市公司垂直产业叙事的基础设施，帮你深入了解财报背后的企业文化与产业价值，独立发现真实企业温度。</div>
    </div>

    <!-- 内容中心 -->
    <div class="pioneer-module">
      <div class="pm-title">📡 实时信号流</div>
      <div id="pioneer-signal-feed" style="display:flex;flex-direction:column;gap:8px;">
        ${generateSignalFeed()}
      </div>
    </div>

    <!-- 热门叙事 -->
    <div class="pioneer-module">
      <div class="pm-title">🔥 热门产业叙事</div>
      ${companies.slice(0, 4).map(c => `
        <div class="pioneer-card" onclick="navigate('page-pioneer-narrative', {companyId:'${c.id}', mode:'c'})">
          <div class="pc-head">
            <div class="pc-icon" style="font-size:20px;font-weight:900;color:var(--pioneer-light);">${c.name[0]}</div>
            <div class="pc-title">${c.name}</div>
            <div class="pc-badge">${c.sector}</div>
          </div>
          <div class="pc-desc">${c.desc}</div>
          <div class="pc-stats">
            <div class="pc-stat"><div class="pc-stat-num">${c.index}</div><div class="pc-stat-label">产业热度指数</div></div>
            <div class="pc-stat"><div class="pc-stat-num">${c.mp}</div><div class="pc-stat-label">MP温度</div></div>
            <div class="pc-stat"><div class="pc-stat-num">${c.stories.length}</div><div class="pc-stat-label">叙事章节</div></div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 个人积分 -->
    <div class="pioneer-module">
      <div class="pm-title">💎 我的叙事贡献</div>
      <div class="pioneer-card" onclick="navigate('page-mp-explain')">
        <div class="pc-head">
          <div class="pc-icon">💎</div>
          <div class="pc-title">MP意义积分余额</div>
        </div>
        <div style="font-size:36px;font-weight:900;color:var(--pioneer-light);margin:8px 0;">${formatNumber(Store.get('user').mp)}</div>
        <div class="pc-desc">通过阅读叙事、发表评论、贡献故事获取MP积分。MP积分是合力指数MP维度的核心数据来源。</div>
        <div style="margin-top:10px;">
          <button onclick="navigate('page-ai-writer');event.stopPropagation();" style="background:rgba(108,99,255,0.2);border:1px solid rgba(108,99,255,0.4);color:var(--pioneer-light);border-radius:8px;padding:8px 16px;font-size:13px;cursor:pointer;">✍️ 写叙事得MP</button>
        </div>
      </div>
    </div>

    <!-- 算力积分说明 -->
    <div class="pioneer-module">
      <div class="pm-title">⚡ 算力积分 TC</div>
      <div class="pioneer-card">
        <div class="pc-head">
          <div class="pc-icon">⚡</div>
          <div class="pc-title">训力券 (TC)</div>
          <div class="pc-badge" style="background:rgba(56,161,105,0.2);color:#68D391;">1 TC = ¥1算力</div>
        </div>
        <div class="pc-desc">Pioneer OS独有的算力积分体系。通过内容消费和知识贡献获取TC训力券，直接抵扣算力使用费用。</div>
        <div class="pc-stats">
          <div class="pc-stat"><div class="pc-stat-num">¥128万</div><div class="pc-stat-label">本月核销</div></div>
          <div class="pc-stat"><div class="pc-stat-num">2,847</div><div class="pc-stat-label">活跃用户</div></div>
          <div class="pc-stat"><div class="pc-stat-num">142万</div><div class="pc-stat-label">API调用</div></div>
        </div>
      </div>
    </div>
  `;
}

// ========== B端企业版 ==========
function renderPioneerB(el) {
  const companies = Store.get('companies');
  el.innerHTML = `
    <div class="pioneer-hero">
      <div class="ph-hero-title">构建你的企业<br>产业叙事基础设施</div>
      <div class="ph-hero-sub">Pioneer OS帮助上市公司将品牌故事转化为可量化的产业温度数据，重新激活A股价值叙事，构建基于公众关注度的企业形象传播体系。</div>
    </div>

    <!-- 月度看板 -->
    <div class="pioneer-module">
      <div class="pm-title">📊 月度运营看板</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${[
          { icon: '👁', num: '18,924', label: '品牌触达', change: '+24%' },
          { icon: '❤️', num: '8.4', label: '产业热度指数', change: '+1.2' },
          { icon: '🔗', num: '142万', label: 'API调用', change: '+35%' },
          { icon: '💰', num: '¥32万', label: '算力补贴核销', change: '+18%' }
        ].map(item => `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;">
            <div style="font-size:22px;margin-bottom:6px;">${item.icon}</div>
            <div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${item.num}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);">${item.label}</div>
            <div style="font-size:11px;color:#68D391;margin-top:2px;">↑ ${item.change}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 叙事章节管理 -->
    <div class="pioneer-module">
      <div class="pm-title">📝 叙事章节管理</div>
      ${companies.slice(0, 3).map(c => `
        <div class="pioneer-card" onclick="navigate('page-pioneer-narrative', {companyId:'${c.id}', mode:'b'})">
          <div class="pc-head">
            <div style="width:32px;height:32px;background:rgba(108,99,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:var(--pioneer-light);">${c.name[0]}</div>
            <div class="pc-title">${c.name}</div>
            <div class="pc-badge">${c.stories.length} 章节</div>
          </div>
          <div style="display:flex;gap:16px;margin-top:8px;">
            ${[['触达', c.attention * 18 + '万'], ['MP分', c.mp], ['热度', c.heat]].map(([l,v]) => `
              <div><div style="font-size:14px;font-weight:700;color:var(--pioneer-light);">${v}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">${l}</div></div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div class="pioneer-card" style="border-style:dashed;cursor:pointer;text-align:center;" onclick="showToast('企业入驻申请已提交，我们将在24小时内联系您')">
        <div style="font-size:24px;margin-bottom:8px;">+</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.5);">申请入驻 Pioneer OS</div>
      </div>
    </div>

    <!-- 转化漏斗 -->
    <div class="pioneer-module">
      <div class="pm-title">🎯 公众关注度转化漏斗</div>
      <div class="pioneer-card">
        ${[['内容曝光', 100, '18,924'], ['叙事触达', 62, '11,733'], ['深度阅读', 35, '6,623'], ['积分互动', 18, '3,406'], ['权益消费', 7, '1,325']].map(([label, pct, num]) => `
          <div style="margin-bottom:10px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
              <span style="font-size:12px;color:rgba(255,255,255,0.55);">${label}</span>
              <span style="font-size:12px;color:rgba(255,255,255,0.7);font-weight:600;">${num} (${pct}%)</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--pioneer),var(--pioneer-light));border-radius:3px;transition:width 1s ease;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ========== 政务版 ==========
function renderPioneerGov(el) {
  el.innerHTML = `
    <div class="pioneer-hero">
      <div class="ph-hero-title">算力政策落地<br>可量化可溯源</div>
      <div class="ph-hero-sub">Pioneer OS为政府监管提供可信数据底座，将算力补贴从"14天核销"压缩至"3天自动完成"，自动化率92%。</div>
    </div>

    <!-- 政策核心指标 -->
    <div class="pioneer-module">
      <div class="pm-title">📋 政策落地核心指标</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${[
          { icon: '⚡', num: '¥128万', label: '训力券核销金额', change: '本月' },
          { icon: '🏢', num: '68家', label: '受益企业数量', change: '累计' },
          { icon: '👥', num: '2,847', label: '平台活跃用户', change: '月活' },
          { icon: '🔗', num: '142万', label: 'API调用次数', change: '本月' }
        ].map(item => `
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px;">
            <div style="font-size:22px;margin-bottom:6px;">${item.icon}</div>
            <div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${item.num}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.4);">${item.label}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.25);margin-top:2px;">${item.change}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 飞轮政策逻辑 -->
    <div class="pioneer-module">
      <div class="pm-title">🔄 政策受益飞轮路径</div>
      <div class="pioneer-card">
        ${[
          { step: '①', title: 'C端用户内容消费', desc: '观看纪录片、发表研报评论，产生真实的平台使用行为' },
          { step: '②', title: 'API调用上链存证', desc: '每次行为触发API调用，数据上链（长安链），不可篡改' },
          { step: '③', title: '算力消耗核算', desc: '智能合约自动核算算力消耗，形成标准化核销凭证' },
          { step: '④', title: '政府自动核销', desc: '核销时间从14天→3天，自动化率92%，防欺诈机制内置' },
          { step: '⑤', title: '补贴回流企业', desc: '算力补贴精准到达受益企业，生态形成可持续正向飞轮' }
        ].map(item => `
          <div style="display:flex;gap:10px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.06);last-child:border-0;">
            <div style="width:24px;height:24px;background:var(--pioneer);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0;margin-top:2px;">${item.step}</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px;">${item.title}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.5;">${item.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 技术合规说明 -->
    <div class="pioneer-module">
      <div class="pm-title">🔒 技术合规架构</div>
      ${[
        { icon: '⛓️', title: '区块链存证', sub: '基于长安链/BSN', desc: '每次API调用上链，核销凭证不可篡改，政府核查零成本' },
        { icon: '⚡', title: '智能合约自动化', sub: '自动化率92%', desc: '算力消耗达标→自动触发核销申请→自动通知受益企业' },
        { icon: '🔐', title: '隐私计算', sub: '联邦学习+TEE', desc: '企业数据"可用不可见"，平衡监管透明与商业隐私保护' }
      ].map(item => `
        <div class="pioneer-card" style="margin-bottom:8px;">
          <div class="pc-head">
            <div class="pc-icon">${item.icon}</div>
            <div>
              <div class="pc-title">${item.title}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);">${item.sub}</div>
            </div>
          </div>
          <div class="pc-desc">${item.desc}</div>
        </div>
      `).join('')}
    </div>

    <!-- 数交所备案 -->
    <div class="pioneer-module">
      <div class="pioneer-card" style="background:rgba(56,161,105,0.08);border-color:rgba(56,161,105,0.25);">
        <div style="font-size:13px;color:#68D391;font-weight:700;margin-bottom:8px;">✓ 数交所备案状态</div>
        <div style="font-size:24px;font-weight:800;color:#fff;margin-bottom:4px;">合规认证中</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.4);">Pioneer OS已向数据交易所提交备案申请，预计2026Q3完成全部合规认证流程，法务团队全程跟进。</div>
      </div>
    </div>
  `;
}

// ========== 产业叙事详情 ==========
window.render_page_pioneer_narrative = function(data) {
  const companies = Store.get('companies');
  const company = data && data.companyId ? companies.find(c => c.id === data.companyId) : companies[0];
  if (!company) return;

  const titleEl = document.getElementById('pioneer-narrative-title');
  if (titleEl) titleEl.textContent = company.name + ' · 产业叙事';

  const el = document.getElementById('pioneer-narrative-content');
  if (!el) return;

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#0A1628,#1A0A3D);padding:24px 16px;">
      <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-bottom:6px;">Pioneer OS · 产业叙事档案</div>
      <div style="font-size:24px;font-weight:800;color:#fff;margin-bottom:4px;">${company.name}</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.5);">${company.sector} · ${company.code}</div>
      <div style="display:flex;gap:12px;margin-top:14px;">
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.index}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">合力指数</div></div>
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.mp}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">MP人性温度</div></div>
        <div style="text-align:center;flex:1;"><div style="font-size:20px;font-weight:800;color:var(--pioneer-light);">${company.stories.length * 4}</div><div style="font-size:10px;color:rgba(255,255,255,0.35);">叙事条目</div></div>
      </div>
    </div>

    <div style="padding:16px 0;">
      ${company.stories.map((story, idx) => `
        <div style="margin:0 16px 12px;background:#fff;border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);">
          <div style="padding:16px;cursor:pointer;" onclick="navigate('page-brand-story', {id:'${company.id}', story:'${story}'})">
            <div style="display:flex;align-items:flex-start;gap:10px;">
              <div style="width:32px;height:32px;background:linear-gradient(135deg,var(--pioneer),var(--pioneer-light));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;flex-shrink:0;">${idx+1}</div>
              <div style="flex:1;">
                <div style="font-size:15px;font-weight:700;color:var(--text-main);margin-bottom:4px;">${story}</div>
                <div style="font-size:12px;color:var(--text-muted);">Pioneer OS · 叙事章节 · 区块链存证</div>
              </div>
              <div style="font-size:14px;color:var(--text-muted);">›</div>
            </div>
          </div>
          <div style="padding:0 16px 14px;">
            <div style="font-size:13px;color:var(--text-sub);line-height:1.6;">${generateNarrativePreview(company.name, story)}</div>
            <div style="margin-top:10px;display:flex;gap:8px;">
              <span class="badge badge-primary">阅读得+50 EXP</span>
              <span class="badge" style="background:rgba(108,99,255,0.1);color:var(--pioneer);">Pioneer存证</span>
            </div>
          </div>
        </div>
      `).join('')}

      <div style="margin:16px;padding:16px;background:linear-gradient(135deg,#1A0A3D,#2D1B69);border-radius:var(--radius);">
        <div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:8px;">🔗 区块链数据总览</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.4);line-height:1.7;">
          总叙事条目：${company.stories.length * 4} 条<br>
          最近更新：${formatDate()}<br>
          区块链：长安链 (ChangAn Chain) · ${company.code.includes('HK') ? 'BSN香港节点' : 'BSN主网节点'}<br>
          状态：<span style="color:#68D391;">✓ 全部存证完成</span>
        </div>
      </div>
    </div>
  `;
};

function generateNarrativePreview(companyName, story) {
  return `${companyName}在${story}方面的进展，体现了企业的技术实力与产业价值观。这段产业叙事被Pioneer OS完整记录，成为合力产业热度指数MP维度的重要数据来源。以上内容基于公开信息整理，仅作产业叙事参考，不构成任何投资建议。`;
}

// ========== 实时信号流生成 ==========
function generateSignalFeed() {
  const companies = Store.get('companies');
  const signals = [
    { time: '1分钟前', emoji: '📊', text: `${companies[0].name}产业热度指数今日涨幅+3.2，公众关注度持续攀升` },
    { time: '5分钟前', emoji: '✍️', text: `用户「${Store.get('user').nickname}」为${companies[1].name}贡献叙事章节，获+50 EXP` },
    { time: '12分钟前', emoji: '🔗', text: `${companies[2].name}「麒麟电池」叙事章节完成区块链存证` },
    { time: '23分钟前', emoji: '⚡', text: `本月训力券核销达¥128万，同比增长47%` },
    { time: '1小时前', emoji: '🏆', text: `${companies[4].name}日日新3.5 发布，产业热度单日+4.7` }
  ];

  return signals.map(s => `
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:10px 12px;display:flex;gap:8px;align-items:flex-start;">
      <div style="font-size:18px;flex-shrink:0;">${s.emoji}</div>
      <div style="flex:1;">
        <div style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.5;">${s.text}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:3px;">${s.time}</div>
      </div>
    </div>
  `).join('');
}
