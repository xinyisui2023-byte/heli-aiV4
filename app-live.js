/* =============================================
   app-live.js - 直播入口模块
   合力生态 HarmonyLink v4.0 — 直播互动与积分回流
   ============================================= */

// ========== 直播数据（模拟） ==========
const LIVE_SCHEDULE = [
  {
    id: 'live001',
    title: '《智造者》先导直播 · 灯塔工厂探秘',
    date: '2026-07-15 20:00',
    status: 'upcoming',  // upcoming / live / ended
    guests: ['产业观察员', '知名UP主'],
    points: 50,
    desc: '提前探班《智造者》录制现场，与嘉宾互动赢积分',
    platform: '视频号'
  },
  {
    id: 'live002',
    title: '合力产业热度指数 · 月度解读',
    date: '2026-08-01 19:30',
    status: 'upcoming',
    guests: ['AI研究员', '证券分析师'],
    points: 30,
    desc: '产业热度指数月度变化深度解读，互动问答赢积分',
    platform: '视频号'
  },
  {
    id: 'live003',
    title: '新质生产力对话 · CEO特别场',
    date: '2026-09-10 20:00',
    status: 'upcoming',
    guests: ['上市公司CEO', '产业投资人'],
    points: 80,
    desc: '与上市公司CEO面对面，探讨产业叙事与价值创造',
    platform: '视频号'
  }
];

// ========== 直播页渲染 ==========
window.render_page_live = function() {
  const el = document.getElementById('live-content');
  if (!el) return;

  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  const wechatTip = isWechat
    ? '<div class="live-env-badge wechat">微信环境 · 可直接进入视频号直播</div>'
    : '<div class="live-env-badge browser">建议在微信中打开，获得最佳直播体验</div>';

  el.innerHTML = `
    <div class="live-hero">
      <div class="liveh-title">📡 直播间</div>
      <div class="liveh-sub">观看直播 → 弹幕互动 → 获得 WATCH 积分</div>
      ${wechatTip}
    </div>

    <!-- 当前/最近直播 -->
    <div class="section-header">
      <span class="section-title">直播预告</span>
      <span class="section-badge">共${LIVE_SCHEDULE.length}场</span>
    </div>

    <div class="live-schedule-list">
      ${LIVE_SCHEDULE.map(live => `
        <div class="live-card ${live.status === 'live' ? 'live-now' : ''}">
          <div class="lc-top">
            ${live.status === 'live'
              ? '<div class="lc-badge live">🔴 直播中</div>'
              : live.status === 'ended'
                ? '<div class="lc-badge ended">已结束</div>'
                : '<div class="lc-badge upcoming">即将开始</div>'
            }
            <div class="lc-platform">${live.platform}</div>
          </div>
          <div class="lc-title">${live.title}</div>
          <div class="lc-desc">${live.desc}</div>
          <div class="lc-meta">
            <div class="lc-date">📅 ${live.date}</div>
            <div class="lc-guests">🎤 ${live.guests.join(' · ')}</div>
          </div>
          <div class="lc-bottom">
            <div class="lc-points">🎁 观看互动 +${live.points} WATCH</div>
            ${live.status === 'live'
              ? '<button class="lc-btn primary" onclick="enterLive(\'' + live.id + '\')">进入直播</button>'
              : live.status === 'ended'
                ? '<button class="lc-btn disabled" disabled>已结束</button>'
                : '<button class="lc-btn" onclick="remindLive(\'' + live.id + '\')">预约提醒</button>'
            }
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 直播积分说明 -->
    <div class="section-header">
      <span class="section-title">直播积分规则</span>
    </div>
    <div class="live-rules-card">
      <div class="lrc-title">📊 直播互动如何获得积分？</div>
      <div class="lrc-items">
        <div class="lrc-item">
          <div class="lrci-icon">👁</div>
          <div class="lrci-info">
            <div class="lrci-title">观看直播</div>
            <div class="lrci-desc">观看满15分钟 +10 WATCH</div>
          </div>
        </div>
        <div class="lrc-item">
          <div class="lrci-icon">💬</div>
          <div class="lrci-info">
            <div class="lrci-title">弹幕互动</div>
            <div class="lrci-desc">有效弹幕评论 +5 WATCH/条（上限5条）</div>
          </div>
        </div>
        <div class="lrc-item">
          <div class="lrci-icon">❓</div>
          <div class="lrci-info">
            <div class="lrci-title">问答互动</div>
            <div class="lrci-desc">回答直播提问 +20 WATCH/题</div>
          </div>
        </div>
        <div class="lrc-item">
          <div class="lrci-icon">🔗</div>
          <div class="lrci-info">
            <div class="lrci-title">分享直播</div>
            <div class="lrci-desc">分享直播间 +15 WATCH</div>
          </div>
        </div>
      </div>
      <div class="lrc-notice">
        积分在直播结束后自动发放到你的 WATCH 积分账户
      </div>
    </div>

    <!-- 往期回放 -->
    <div class="section-header">
      <span class="section-title">往期精彩</span>
    </div>
    <div class="live-replay-list">
      <div class="lrp-item">
        <div class="lrp-thumb">🎬</div>
        <div class="lrp-info">
          <div class="lrp-title">合力生态发布会回顾</div>
          <div class="lrp-meta">2026-05-20 · 观看1.2万</div>
        </div>
        <div class="lrp-points">+20 WATCH</div>
      </div>
      <div class="lrp-item">
        <div class="lrp-thumb">🎬</div>
        <div class="lrp-info">
          <div class="lrp-title">AI与产业叙事沙龙</div>
          <div class="lrp-meta">2026-04-15 · 观看8,600</div>
        </div>
        <div class="lrp-points">+20 WATCH</div>
      </div>
    </div>

    <div class="live-notice">
      <div class="liven-title">📋 直播说明</div>
      <ul>
        <li>直播在视频号进行，点击"进入直播"将跳转至视频号直播间</li>
        <li>观看直播需在合力生态注册账号，积分自动发放</li>
        <li>弹幕和互动需在视频号内完成，积分在直播结束后24小时内结算</li>
        <li>积分仅可兑换平台商品和服务，不可提现</li>
      </ul>
    </div>
  `;
};

// ========== 直播操作 ==========
function enterLive(liveId) {
  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  if (isWechat) {
    // 微信环境 - 尝试打开视频号小程序
    showToast('正在跳转视频号直播间...');
    // 实际部署时替换为真实的视频号小程序链接
    // window.location.href = 'weixin://dl/business/?appid=xxx&path=xxx';
  } else {
    showToast('请在微信中打开此页面观看直播');
  }
}

function remindLive(liveId) {
  const reminders = Store.get('live_reminders') || [];
  if (reminders.includes(liveId)) {
    showToast('已设置提醒，直播开始前将通知您');
    return;
  }
  reminders.push(liveId);
  Store.set('live_reminders', reminders);
  showToast('直播提醒已设置！');
}
