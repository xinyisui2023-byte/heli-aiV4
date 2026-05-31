/* =============================================
   app-invite.js - 邀请裂变模块
   合力生态 HarmonyLink v4.0 — 社交裂变获客
   ============================================= */

// ========== 生成用户ID（模拟） ==========
function getMyUserId() {
  let userId = Store.get('user_id');
  if (!userId) {
    userId = 'HL' + Math.random().toString(36).substring(2, 8).toUpperCase();
    Store.set('user_id', userId);
  }
  return userId;
}

// ========== 检测链接中的邀请参数 ==========
function detectReferral() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (ref && ref !== getMyUserId()) {
    // 记录被邀请来源
    const inviter = Store.get('invited_by');
    if (!inviter) {
      Store.set('invited_by', ref);
      showToast('你已通过好友邀请进入合力生态！');
    }
  }
}

// ========== 邀请页渲染 ==========
window.render_page_invite = function() {
  const el = document.getElementById('invite-content');
  if (!el) return;

  const userId = getMyUserId();
  const inviteCount = Store.get('invite_count') || 0;
  const invitePoints = Store.get('invite_points') || 0;
  const invites = Store.get('my_invites') || [];
  const baseUrl = window.location.origin + window.location.pathname;

  el.innerHTML = `
    <div class="invite-hero">
      <div class="invh-title">🔗 邀请好友 加入合力生态</div>
      <div class="invh-sub">每成功邀请1位好友注册，双方各获得 <strong>+30 WATCH</strong> 积分</div>
    </div>

    <div class="invite-stats-row">
      <div class="inv-stat">
        <div class="invs-num">${inviteCount}</div>
        <div class="invs-label">已邀请好友</div>
      </div>
      <div class="inv-stat">
        <div class="invs-num">${invitePoints}</div>
        <div class="invs-label">邀请获积分</div>
      </div>
      <div class="inv-stat">
        <div class="invs-num">${inviteCount * 30}</div>
        <div class="invs-label">好友获积分</div>
      </div>
    </div>

    <!-- 我的邀请链接 -->
    <div class="section-header">
      <span class="section-title">我的邀请链接</span>
    </div>
    <div class="invite-link-box">
      <div class="ilb-url">${baseUrl}?ref=${userId}</div>
      <div class="ilb-actions">
        <button class="ilb-btn" onclick="copyInviteLink()">复制链接</button>
        <button class="ilb-btn wechat" onclick="shareToWechat()">分享到微信</button>
      </div>
    </div>

    <!-- 邀请海报 -->
    <div class="section-header">
      <span class="section-title">邀请海报</span>
    </div>
    <div class="invite-poster">
      <div class="invp-card">
        <div class="invp-logo">🔗 合力生态</div>
        <div class="invp-slogan">让产业叙事被看见<br>让注意力有价值</div>
        <div class="invp-divider"></div>
        <div class="invp-benefits">
          <div>👁 观看综艺签到领积分</div>
          <div>📊 产业热度指数实时追踪</div>
          <div>🤖 AI产业叙事助手</div>
          <div>💎 五维积分体系</div>
        </div>
        <div class="invp-qr-placeholder">
          <div class="invp-qr-box">📷</div>
          <div class="invp-qr-text">邀请码: ${userId}</div>
        </div>
        <div class="invp-cta">扫码注册 · 双方各得 +30 WATCH</div>
      </div>
      <button class="invp-save-btn" onclick="showToast('海报已保存到相册（模拟）')">保存海报</button>
    </div>

    <!-- 邀请奖励阶梯 -->
    <div class="section-header">
      <span class="section-title">邀请奖励阶梯</span>
    </div>
    <div class="invite-tier-list">
      <div class="inv-tier ${inviteCount >= 3 ? 'done' : ''}">
        <div class="invt-level">Lv.1</div>
        <div class="invt-req">邀请3人</div>
        <div class="invt-reward">额外 +50 EXP</div>
        <div class="invt-status">${inviteCount >= 3 ? '✅ 已达成' : `${inviteCount}/3`}</div>
      </div>
      <div class="inv-tier ${inviteCount >= 10 ? 'done' : ''}">
        <div class="invt-level">Lv.2</div>
        <div class="invt-req">邀请10人</div>
        <div class="invt-reward">额外 +200 EXP + 限定徽章</div>
        <div class="invt-status">${inviteCount >= 10 ? '✅ 已达成' : `${inviteCount}/10`}</div>
      </div>
      <div class="inv-tier ${inviteCount >= 50 ? 'done' : ''}">
        <div class="invt-level">Lv.3</div>
        <div class="invt-req">邀请50人</div>
        <div class="invt-reward">额外 +1000 EXP + 综艺探班名额</div>
        <div class="invt-status">${inviteCount >= 50 ? '✅ 已达成' : `${inviteCount}/50`}</div>
      </div>
    </div>

    <!-- 邀请记录 -->
    ${invites.length > 0 ? `
      <div class="section-header">
        <span class="section-title">邀请记录</span>
      </div>
      <div class="invite-record-list">
        ${invites.slice(-10).reverse().map(inv => `
          <div class="inv-record">
            <div class="invr-avatar">👤</div>
            <div class="invr-info">
              <div class="invr-name">用户${inv.id.substring(0, 6)}</div>
              <div class="invr-time">${inv.time}</div>
            </div>
            <div class="invr-reward">双方 +30 WATCH</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="invite-notice">
      <div class="invn-title">📋 邀请规则</div>
      <ul>
        <li>分享邀请链接或海报给好友，好友注册后双方各获得 <strong>30 WATCH积分</strong></li>
        <li>同一设备/IP 最多注册3个账号，防止刷号</li>
        <li>邀请奖励积分可叠加阶梯奖励</li>
        <li>积分仅限平台内兑换，不可提现</li>
        <li>邮件邀请链接自动携带邀请参数</li>
      </ul>
    </div>
  `;
};

// ========== 邀请排行榜 ==========
window.render_page_invite_rank = function() {
  const el = document.getElementById('invite-rank-content');
  if (!el) return;

  const myCount = Store.get('invite_count') || 0;
  const myRank = Math.max(42 - myCount * 3, 1); // 模拟排名

  // 模拟排行榜数据
  const rankData = [
    { rank: 1, name: '产业观察者A', count: 56, badge: '🥇' },
    { rank: 2, name: '智造先锋B', count: 43, badge: '🥈' },
    { rank: 3, name: '叙事达人C', count: 38, badge: '🥉' },
    { rank: 4, name: '生态共建者D', count: 27, badge: '' },
    { rank: 5, name: '先导用户E', count: 22, badge: '' },
    { rank: 6, name: '产业研究员F', count: 18, badge: '' },
    { rank: 7, name: '热度追踪者G', count: 15, badge: '' },
    { rank: 8, name: '叙事贡献者H', count: 12, badge: '' },
    { rank: 9, name: '生态体验官I', count: 9, badge: '' },
    { rank: 10, name: '新质探索者J', count: 7, badge: '' },
  ];

  el.innerHTML = `
    <div class="inv-rank-hero">
      <div class="invrh-title">🏆 邀请排行榜</div>
      <div class="invrh-sub">邀请好友最多的用户</div>
    </div>

    <div class="inv-rank-my">
      <div class="invrm-rank">#${myRank}</div>
      <div class="invrm-info">
        <div class="invrm-name">我（${getMyUserId()}）</div>
        <div class="invrm-count">已邀请 ${myCount} 人</div>
      </div>
      <div class="invrm-highlight" onclick="navigate('page-invite')">去邀请 →</div>
    </div>

    <div class="inv-rank-list">
      ${rankData.map(r => `
        <div class="invr-item">
          <div class="invr-rank">${r.badge || '#' + r.rank}</div>
          <div class="invr-name">${r.name}</div>
          <div class="invr-count">${r.count}人</div>
        </div>
      `).join('')}
    </div>
  `;
};

// ========== 操作函数 ==========
function copyInviteLink() {
  const userId = getMyUserId();
  const baseUrl = window.location.origin + window.location.pathname;
  const link = baseUrl + '?ref=' + userId;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(link).then(() => {
      showToast('邀请链接已复制！');
    });
  } else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = link;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('邀请链接已复制！');
  }
}

function shareToWechat() {
  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  if (isWechat) {
    showToast('请点击右上角「...」分享给好友');
  } else {
    showToast('请在微信中打开此页面进行分享');
  }
}

// 模拟被邀请好友注册（测试用）
function simulateInviteRegister() {
  const userId = getMyUserId();
  const invites = Store.get('my_invites') || [];
  const newFriend = {
    id: 'U' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    time: new Date().toLocaleString('zh-CN')
  };
  invites.push(newFriend);
  Store.set('my_invites', invites);
  Store.set('invite_count', invites.length);
  Store.set('invite_points', invites.length * 30);
  showToast(`好友注册成功！双方各获得 +30 WATCH`);
  render_page_invite();
}

// 初始化时检测邀请参数
detectReferral();
