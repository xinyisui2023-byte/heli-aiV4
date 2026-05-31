/* =============================================
   app-part2.js - 交互逻辑层
   合力生态 HarmonyLink v2.1 合规版
   ============================================= */

// ========== 龙虾Agent ==========
window.render_page_agent = function() {
  const user = Store.get('user');
  const templates = Store.get('agentTemplates');
  const el = document.getElementById('agent-content');
  if (!el) return;

  el.innerHTML = `
    <div class="agent-hero" style="background:linear-gradient(135deg,#1A0A0A,#4A1010);">
      <div class="agent-hero-icon">🦞</div>
      <div class="agent-hero-title">龙虾Agent</div>
      <div class="agent-hero-sub">产业叙事智能助手<br>辅助生成产业分析文章，整理上市公司公开信息，积累平台积分</div>
      <div class="agent-stat-row">
        <div class="asr-item"><div class="asr-num">${user.agentCreated ? '已创建' : '未创建'}</div><div class="asr-label">Agent状态</div></div>
        <div class="asr-item"><div class="asr-num">${formatNumber(user.mp)}</div><div class="asr-label">MP积分余额</div></div>
        <div class="asr-item"><div class="asr-num">${user.level}</div><div class="asr-label">当前等级</div></div>
      </div>
    </div>

    ${user.agentCreated ? `
    <div style="margin:16px;padding:16px;background:linear-gradient(135deg,rgba(56,161,105,0.1),rgba(56,161,105,0.05));border:1px solid rgba(56,161,105,0.3);border-radius:16px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <div style="font-size:28px;">🦞</div>
        <div>
          <div style="font-size:16px;font-weight:800;color:var(--text-main);">${user.agentName}</div>
          <div style="font-size:12px;color:var(--success);">● 运行中</div>
        </div>
        <div style="margin-left:auto;">
          <span class="badge badge-success">已激活</span>
        </div>
      </div>
      <div style="font-size:13px;color:var(--text-sub);">你的Agent正在自动运行，积分持续积累中。积分仅限平台内消费，不可提现或转让。</div>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button style="flex:1;padding:8px;background:var(--primary);color:#fff;border:none;border-radius:8px;font-size:13px;cursor:pointer;" onclick="navigate('page-agent-market')">浏览Agent市场</button>
        <button style="flex:1;padding:8px;background:var(--bg);border:1px solid rgba(0,0,0,0.1);border-radius:8px;font-size:13px;cursor:pointer;" onclick="showToast('Agent数据同步中...')">查看收益</button>
      </div>
    </div>
    ` : `
    <div style="margin:16px;padding:16px;background:rgba(241,143,1,0.06);border:1px dashed rgba(241,143,1,0.3);border-radius:16px;text-align:center;">
      <div style="font-size:32px;margin-bottom:8px;">🦞</div>
      <div style="font-size:15px;font-weight:700;color:var(--text-main);margin-bottom:6px;">还未创建个人Agent</div>
      <div style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">创建你的专属龙虾Agent，辅助产业叙事内容创作，通过参与平台活动积累积分</div>
      <button onclick="navigate('page-agent-create')" style="background:linear-gradient(135deg,var(--accent),var(--accent-light));color:#fff;border:none;padding:10px 24px;border-radius:20px;font-size:14px;font-weight:700;cursor:pointer;">+ 创建我的Agent</button>
    </div>
    `}

    <div style="padding:16px 16px 10px;">
      <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:4px;">Agent能力类型</div>
      <div style="font-size:13px;color:var(--text-sub);margin-bottom:14px;">选择你的Agent类型，自动执行对应任务，积累平台积分（积分不可提现，仅限平台消费）</div>
      <div class="agent-type-grid">
        ${templates.map(t => `
          <div class="agent-type-card ${!t.available ? 'opacity-50' : ''}">
            <div class="atc-icon">${t.icon}</div>
            <div class="atc-title">${t.name}</div>
            <div class="atc-desc">${t.desc}</div>
            <div class="atc-reward">🎁 ${t.reward}</div>
            ${!t.available ? '<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">即将开放</div>' : ''}
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title">🔑 三大技术支柱</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[
          ['⛓️', '区块链存证', '每次操作上链记录，积分凭证不可篡改'],
          ['⚡', '智能合约自动化', '行为达标自动触发积分铸造，自动化率92%'],
          ['🔒', '隐私计算', '联邦学习+TEE，数据可用不可见']
        ].map(([icon, title, desc]) => `
          <div style="display:flex;gap:10px;align-items:flex-start;">
            <div style="font-size:20px;">${icon}</div>
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text-main);">${title}</div>
              <div style="font-size:12px;color:var(--text-sub);margin-top:2px;">${desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
};

// ========== Agent创建 ==========
window.render_page_agent_create = function() {
  const templates = Store.get('agentTemplates').filter(t => t.available);
  const el = document.getElementById('agent-create-content');
  if (!el) return;

  el.innerHTML = `
    <div style="padding:20px 16px;">
      <div style="font-size:20px;font-weight:800;color:var(--text-main);margin-bottom:6px;">创建你的龙虾Agent</div>
      <div style="font-size:13px;color:var(--text-sub);margin-bottom:20px;">命名你的Agent，选择主要能力，辅助完成产业内容创作，积累平台积分</div>

      <div style="margin-bottom:16px;">
        <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:8px;">Agent名称</div>
        <input type="text" id="agent-name-input" class="form-input" placeholder="例如：我的内容分析助手" style="width:100%;">
      </div>

      <div style="margin-bottom:20px;">
        <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:8px;">选择主要能力</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${templates.map(t => `
            <div class="agent-type-card" id="agent-type-${t.id}" onclick="selectAgentType('${t.id}', this)" style="display:flex;gap:12px;align-items:flex-start;">
              <div style="font-size:28px;flex-shrink:0;">${t.icon}</div>
              <div style="flex:1;">
                <div class="atc-title">${t.name}</div>
                <div class="atc-desc">${t.desc}</div>
                <div class="atc-reward">${t.reward}</div>
              </div>
              <div id="agent-type-check-${t.id}" style="width:20px;height:20px;border-radius:50%;border:2px solid rgba(0,0,0,0.15);flex-shrink:0;display:flex;align-items:center;justify-content:center;"></div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="padding:14px;background:rgba(241,143,1,0.06);border-radius:10px;border:1px solid rgba(241,143,1,0.2);">
        <div style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:6px;">⚠️ 创建须知</div>
        <div style="font-size:12px;color:var(--text-sub);line-height:1.7;">
          • Agent创建后可随时暂停，不会有任何费用<br>
          • Agent操作受智能合约约束，不会超出授权范围<br>
          • 所有数据处理基于联邦学习，保护你的隐私<br>
          • 积分收益实时到账，可在积分明细查看<br>
          • <strong>平台积分仅限站内消费，不可提现、不可转让、不可交易</strong>
        </div>
      </div>
    </div>
  `;

  const bottomBar = document.getElementById('agent-create-bar');
  if (bottomBar) {
    bottomBar.innerHTML = `
      <button class="bab-btn ghost" onclick="goBack()">取消</button>
      <button class="bab-btn accent" onclick="doCreateAgent()">创建Agent</button>
    `;
  }
};

let selectedAgentType = null;

function selectAgentType(typeId, el) {
  selectedAgentType = typeId;
  document.querySelectorAll('.agent-type-card').forEach(c => {
    c.classList.remove('active');
    const check = c.querySelector('[id^="agent-type-check-"]');
    if (check) { check.innerHTML = ''; check.style.border = '2px solid rgba(0,0,0,0.15)'; check.style.background = 'transparent'; }
  });
  if (el) {
    el.classList.add('active');
    const check = el.querySelector(`#agent-type-check-${typeId}`);
    if (check) { check.innerHTML = '✓'; check.style.background = 'var(--accent)'; check.style.border = '2px solid var(--accent)'; check.style.color = '#fff'; check.style.fontSize = '12px'; }
  }
}

function doCreateAgent() {
  const nameInput = document.getElementById('agent-name-input');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) { showToast('请输入Agent名称'); return; }
  if (!selectedAgentType) { showToast('请选择Agent能力类型'); return; }
  Store.update('user', u => ({ ...u, agentCreated: true, agentName: name, agentType: selectedAgentType }));
  showToast(`🦞 「${name}」创建成功！`);
  setTimeout(() => navigate('page-agent'), 1500);
}

// ========== Agent市场 ==========
window.render_page_agent_market = function() {
  const el = document.getElementById('agent-market-content');
  if (!el) return;

  const marketAgents = [
    { name: '产业研报分析师', icon: '📊', creator: '合力生态官方', desc: '专门分析上市公司研报，生成深度产业评论，内容经AI合规审核', usage: 8924, reward: '+200 EXP/篇', certified: true },
    { name: '综艺互动王', icon: '🎬', creator: '超级用户_Nebula', desc: '全自动追踪《智造者》更新，参与互动积累积分', usage: 5632, reward: '+100 EXP/集', certified: false },
    { name: '产业热度追踪者', icon: '📈', creator: '量化策略组', desc: '实时监控合力产业热度指数变化，第一时间推送热度动态', usage: 3291, reward: '+50 EXP/推送', certified: true },
    { name: '产业叙事家', icon: '✍️', creator: '合力创作者联盟', desc: '辅助企业撰写产业温度叙事文章，积累MP积分', usage: 1847, reward: '+150 MP/篇', certified: true }
  ];

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#1A0A0A,#4A1010);padding:28px 16px 20px;">
      <div style="font-size:20px;font-weight:800;color:#fff;margin-bottom:4px;">🦞 Agent市场</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.55);">发现并订阅优质Agent，加速积分积累，积分仅限平台内消费</div>
    </div>
    <div style="padding:16px 0;">
      ${marketAgents.map(a => `
        <div style="margin:0 16px 12px;background:#fff;border-radius:var(--radius);padding:16px;box-shadow:var(--shadow);cursor:pointer;" onclick="showToast('即将接入该Agent的授权流程')">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <div style="font-size:32px;">${a.icon}</div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:6px;">
                <div style="font-size:15px;font-weight:700;color:var(--text-main);">${a.name}</div>
                ${a.certified ? '<span class="badge badge-primary" style="font-size:10px;">✓ 认证</span>' : ''}
              </div>
              <div style="font-size:11px;color:var(--text-muted);">by ${a.creator} · ${formatNumber(a.usage)}人使用</div>
            </div>
          </div>
          <div style="font-size:13px;color:var(--text-sub);margin-bottom:10px;">${a.desc}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-size:12px;color:var(--success);font-weight:600;">${a.reward}</span>
            <button style="background:var(--primary);color:#fff;border:none;padding:6px 16px;border-radius:16px;font-size:12px;font-weight:600;cursor:pointer;">订阅</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 合力智脑 ==========
window.render_page_brain = function() {
  renderBrainMessages();
  renderBrainQuickBtns();
};

function renderBrainMessages() {
  const msgs = Store.get('brainMessages');
  const mode = currentBrainMode;
  const el = document.getElementById('brain-chat-messages');
  if (!el) return;

  const msgList = msgs[mode] || [];
  el.innerHTML = msgList.map(m => `
    <div class="chat-msg ${m.role}">
      <div class="chat-bubble">${m.text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</div>
      <div class="chat-msg-time">${m.time || ''}</div>
    </div>
  `).join('');
  el.scrollTop = el.scrollHeight;
}

function renderBrainQuickBtns() {
  const el = document.getElementById('brain-quick-btns');
  if (!el) return;
  const btns = currentBrainMode === 'c'
    ? ['帮我分析积分', '查看产业热度指数', '龙虾Agent教程', 'Pioneer OS是什么']
    : ['生成运营报告', '制定积分激励策略', '分析用户数据', '产业叙事方案'];
  el.innerHTML = btns.map(b => `<button class="chat-qbtn" onclick="sendQuickMsg('${b}')">${b}</button>`).join('');
}

function switchBrain(mode, el) {
  currentBrainMode = mode;
  document.querySelectorAll('#page-brain .nbt-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderBrainMessages();
  renderBrainQuickBtns();
}

function sendQuickMsg(text) {
  const input = document.getElementById('brain-input');
  if (input) input.value = text;
  sendBrainMessage();
}

async function sendBrainMessage() {
  const input = document.getElementById('brain-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const user = Store.get('user');
  const now = new Date();
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  // 添加用户消息
  const msgs = Store.get('brainMessages');
  if (!msgs[currentBrainMode]) msgs[currentBrainMode] = [];
  msgs[currentBrainMode].push({ role: 'user', text, time });
  Store.set('brainMessages', msgs);
  renderBrainMessages();

  // 打字中动画
  const el = document.getElementById('brain-chat-messages');
  if (el) {
    const typing = document.createElement('div');
    typing.id = 'brain-typing';
    typing.className = 'chat-msg assistant';
    typing.innerHTML = '<div class="brain-typing"><span></span><span></span><span></span></div>';
    el.appendChild(typing);
    el.scrollTop = el.scrollHeight;
  }

  const res = await API.brainChat(currentBrainMode, text);

  // 移除打字动画
  const typingEl = document.getElementById('brain-typing');
  if (typingEl) typingEl.remove();

  // 添加回复
  const msgs2 = Store.get('brainMessages');
  msgs2[currentBrainMode].push({ role: 'assistant', text: res.reply, time });
  Store.set('brainMessages', msgs2);
  renderBrainMessages();
}

// ========== 竞猜交互 ==========
async function selectQuizOption(showId, quizId, optionIdx) {
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(o => o.style.pointerEvents = 'none');

  const selected = document.getElementById(`qopt-${optionIdx}`);
  if (selected) selected.style.background = 'rgba(30,58,95,0.08)';

  const res = await API.submitQuiz(showId, quizId, optionIdx);

  opts.forEach((o, i) => {
    if (i === res.correctOption) {
      o.style.background = 'rgba(56,161,105,0.12)';
      o.style.borderColor = 'var(--success)';
      o.style.color = 'var(--success)';
    } else if (i === optionIdx && !res.correct) {
      o.style.background = 'rgba(229,62,62,0.08)';
      o.style.borderColor = 'var(--danger)';
      o.style.color = 'var(--danger)';
    }
  });

  setTimeout(() => {
    showToast(res.msg);
    if (res.correct) {
      showModal(`<div class="modal-handle"></div>
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:48px;margin-bottom:12px;">🎉</div>
          <div style="font-size:18px;font-weight:800;color:var(--success);margin-bottom:6px;">答对了！</div>
          <div style="font-size:14px;color:var(--text-sub);">获得 +${res.points} EXP积分</div>
          <button onclick="closeModal()" style="margin-top:20px;background:var(--accent);color:#fff;border:none;padding:12px 32px;border-radius:20px;font-size:15px;font-weight:700;cursor:pointer;">太棒了</button>
        </div>`);
    }
  }, 500);
}

// ========== 签到 ==========
async function doCheckin() {
  const res = await API.checkin();
  showToast(res.msg);
  if (res.success) render_page_mine();
}

// ========== 评论 ==========
async function submitShowComment(showId) {
  const input = document.getElementById('comment-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) { showToast('请输入评论内容'); return; }
  const res = await API.submitComment(showId, text);
  showToast(res.msg);
  input.value = '';
  navigate('page-show-detail', { id: showId });
}

// ========== 播放剧集 ==========
let playInterval = null;

async function playEpisode(showId, epId) {
  const btn = document.getElementById('play-btn');
  if (btn) btn.innerHTML = '⏸';
  if (playInterval) clearInterval(playInterval);

  let progress = 0;
  const progressBar = document.getElementById('play-progress-bar');

  playInterval = setInterval(() => {
    progress += 2;
    if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
    if (progress >= 100) {
      clearInterval(playInterval);
      API.watchEpisode(showId, epId).then(res => {
        if (res.success) {
          showToast(res.msg);
          const btn2 = document.getElementById('play-btn');
          if (btn2) btn2.innerHTML = '▶';
        }
      });
    }
  }, 200);
}

// ========== 订单 ==========
async function doCreateOrder(productId) {
  const res = await API.createOrder(productId, 1);
  if (res.success) {
    showToast(res.msg);
    setTimeout(() => navigate('page-order-list'), 1200);
  } else {
    showToast(res.msg || '兑换失败');
  }
}

// ========== 荣誉 ==========
async function claimHonorAction(honorId) {
  const res = await API.claimHonor(honorId);
  showToast(res.msg);
  if (res.success) render_page_honor_list();
}

function showHonorDetail(honorId) {
  const honors = Store.get('honors');
  const honor = honors.find(h => h.id === honorId);
  if (!honor) return;
  showModal(`
    <div class="modal-handle"></div>
    <div style="text-align:center;padding:10px 0 20px;">
      <div style="font-size:56px;margin-bottom:12px;">${honor.icon}</div>
      <div style="font-size:18px;font-weight:800;color:var(--text-main);margin-bottom:6px;">${honor.title}</div>
      <div style="font-size:14px;color:var(--text-sub);margin-bottom:16px;">${honor.desc}</div>
      <div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:16px;text-align:left;">
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">兑换条件</div>
        <div style="font-size:14px;color:var(--text-main);">${honor.req}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:8px;margin-bottom:4px;">兑换消耗</div>
        <div style="font-size:16px;font-weight:800;color:var(--accent);">${honor.cost} ${honor.costType}</div>
      </div>
      ${honor.claimed ? 
        '<div style="color:var(--success);font-weight:600;">✅ 已兑换</div>' :
        `<button onclick="claimHonorAction('${honor.id}');closeModal();" style="width:100%;background:var(--accent);color:#fff;border:none;padding:12px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;">立即兑换</button>`
      }
    </div>
  `);
}

// ========== 积分兑换弹窗 ==========
function openExchangeModal(type) {
  const user = Store.get('user');
  const rates = { watch: { rate: 0.2, name: 'WATCH', color: '#3182CE' }, exp: { rate: 0.5, name: 'EXP', color: '#805AD5' }, gov: { rate: 1.2, name: 'GOV', color: '#2F855A' }, data: { rate: 0.8, name: 'DATA', color: '#2B6CB0' }, mp: { rate: 1.5, name: 'MP', color: '#D69E2E' } };
  const info = rates[type];
  if (!info) return;
  const balance = user[type] || 0;

  showModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">${info.name} → HP 兑换</div>
    <div style="text-align:center;margin-bottom:16px;">
      <div style="font-size:14px;color:var(--text-muted);">当前余额：${formatNumber(balance)} ${info.name}</div>
      <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">兑换汇率：100 ${info.name} = ${info.rate * 100} HP</div>
    </div>
    <div style="padding:10px 12px;background:rgba(241,143,1,0.07);border:1px solid rgba(241,143,1,0.25);border-radius:10px;margin-bottom:14px;">
      <div style="font-size:12px;color:var(--accent);font-weight:600;">⚠️ 积分合规说明</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;line-height:1.6;">平台积分（含WATCH/EXP/GOV/DATA/MP/HP）为纯消费型权益，<strong>不可提现、不可转让、不可交易</strong>，有效期12个月，不代表任何金融资产或证券权益。</div>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:8px;">兑换数量</div>
      <input type="number" id="exchange-amount" class="form-input" placeholder="输入${info.name}数量" value="100" style="width:100%;">
    </div>
    <div id="exchange-preview" style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;margin-bottom:16px;">
      <span style="font-size:16px;font-weight:700;color:${info.color};">100 ${info.name}</span>
      <span style="font-size:14px;color:var(--text-muted);"> → </span>
      <span style="font-size:16px;font-weight:700;color:var(--hp-color);">${info.rate * 100} HP</span>
    </div>
    <button onclick="doExchange('${type}')" style="width:100%;background:var(--primary);color:#fff;border:none;padding:12px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;">确认兑换</button>
  `);

  const amountInput = document.getElementById('exchange-amount');
  const preview = document.getElementById('exchange-preview');
  if (amountInput && preview) {
    amountInput.addEventListener('input', () => {
      const amt = parseInt(amountInput.value) || 0;
      const hp = Math.floor(amt * info.rate);
      preview.innerHTML = `<span style="font-size:16px;font-weight:700;color:${info.color};">${formatNumber(amt)} ${info.name}</span><span style="font-size:14px;color:var(--text-muted);"> → </span><span style="font-size:16px;font-weight:700;color:var(--hp-color);">${formatNumber(hp)} HP</span>`;
    });
  }
}

async function doExchange(type) {
  const amountInput = document.getElementById('exchange-amount');
  const amount = parseInt(amountInput ? amountInput.value : 0);
  if (!amount || amount <= 0) { showToast('请输入有效数量'); return; }
  closeModal();
  const res = await API.exchangePoints(type, amount);
  showToast(res.msg);
  if (res.success) navigate('page-points-detail');
}

// ========== 写作助手弹窗 ==========
function openWriterTemplate(title) {
  showModal(`
    <div class="modal-handle"></div>
    <div class="modal-title">✍️ ${title}</div>
    <div style="margin-bottom:12px;">
      <div style="font-size:14px;color:var(--text-muted);margin-bottom:8px;">AI将辅助你整理公开信息，生成产业叙事内容草稿，发布前经人工审核即可获得积分。<span style="color:var(--danger);font-size:12px;">内容不构成投资建议，请勿发布涉及个股买卖推荐的内容。</span></div>
      ${title.includes('上市公司') ? `
        <div style="margin-bottom:10px;">
          <select class="form-input" style="width:100%;">
            ${Store.get('companies').map(c => `<option>${c.name}（${c.code}）</option>`).join('')}
          </select>
        </div>
      ` : ''}
      <textarea id="writer-input" style="width:100%;min-height:100px;border:1.5px solid rgba(0,0,0,0.12);border-radius:10px;padding:12px;font-size:14px;outline:none;resize:vertical;" placeholder="输入你的初步想法或角度，AI将帮你扩展成完整分析..."></textarea>
    </div>
    <button onclick="generateAIContent()" style="width:100%;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:#fff;border:none;padding:12px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;">🤖 AI辅助生成</button>
  `);
}

async function generateAIContent() {
  closeModal();
  showToast('🤖 AI正在生成内容...');
  await sleep(2000);
  showToast('✅ 内容已生成！发布后获得积分');
  Store.update('user', u => ({ ...u, exp: u.exp + 200, willpower: u.willpower + 300 }));
}

// ========== 商家登录 ==========
async function doMerchantLogin() {
  const email = document.getElementById('merchant-email').value;
  const pwd = document.getElementById('merchant-pwd').value;
  showToast('登录中...');
  const res = await API.merchantLogin(email, pwd);
  if (res.success) {
    showToast('✅ 登录成功');
    setTimeout(() => navigate('page-merchant-dashboard'), 800);
  } else {
    showToast(res.msg);
  }
}

// ========== Pioneer模式 ==========
function setPioneerMode(mode, el) {
  Store.update('pioneerMode', () => mode);
  document.querySelectorAll('.ph-mode').forEach(m => m.classList.remove('active'));
  if (el) el.classList.add('active');
  renderPioneerContent(mode);
}

// ========== 阅读奖励 ==========
async function claimReadReward(companyId) {
  Store.update('user', u => ({ ...u, exp: u.exp + 50, willpower: u.willpower + 80 }));
  showToast('+50 EXP积分 +80 贡献值');
}

// ========== 工具函数 ==========
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function showModal(content) {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !overlay || !modalContent) return;
  modalContent.innerHTML = content;
  modal.classList.add('show');
  overlay.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  if (modal) modal.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
}

function closeOverlay() {
  closeModal();
}
