/* =============================================
   app-qr-task.js - 扫码签到 / 观剧积分任务
   合力生态 HarmonyLink v4.0 — 流量摆渡核心模块
   ============================================= */

// ========== 观剧任务数据 ==========
const QR_TASK_EPISODES = [
  { id: 'e01', title: '第1集：灯塔工厂的诞生', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e02', title: '第2集：AI车间里的人', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e03', title: '第3集：供应链暗战', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e04', title: '第4集：工程师的逆袭', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e05', title: '第5集：绿色制造的代价', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e06', title: '第6集：出海之路', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e07', title: '第7集：新质生产力觉醒', show: '智造者 S1', points: 20, status: 'available' },
  { id: 'e08', title: '第8集：产业叙事的力量', show: '智造者 S1', points: 20, status: 'available' }
];

// ========== 页面渲染 ==========
window.render_page_qr_task = function() {
  const el = document.getElementById('qr-task-content');
  if (!el) return;

  const userCheckins = Store.get('qr_checkins') || [];
  const todayCheckins = getTodayCheckins(userCheckins);
  const totalPoints = userCheckins.reduce((s, c) => s + (c.points || 0), 0);

  // 检测是否微信环境
  const isWechat = /MicroMessenger/i.test(navigator.userAgent);
  const envTip = isWechat
    ? '<div class="qr-env-badge wechat">微信环境 · 可直接完成签到</div>'
    : '<div class="qr-env-badge browser">浏览器环境 · 亦可完成签到</div>';

  el.innerHTML = `
    <div class="qr-task-hero">
      <div class="qrth-title">📺 观剧签到</div>
      <div class="qrth-sub">观看《智造者》每集 → 签到打卡 → 领取 WATCH 积分</div>
      ${envTip}
    </div>

    <div class="qr-stats-row">
      <div class="qr-stat-item">
        <div class="qrs-num">${todayCheckins.length}</div>
        <div class="qrs-label">今日签到</div>
      </div>
      <div class="qr-stat-item">
        <div class="qrs-num">${userCheckins.length}</div>
        <div class="qrs-label">累计签到</div>
      </div>
      <div class="qr-stat-item">
        <div class="qrs-num">${totalPoints}</div>
        <div class="qrs-label">已获积分</div>
      </div>
      <div class="qr-stat-item">
        <div class="qrs-num">${8 - userCheckins.length}</div>
        <div class="qrs-label">剩余集数</div>
      </div>
    </div>

    <div class="qr-task-bonus">
      <div class="qrtb-title">🏆 追番奖励</div>
      <div class="qrtb-items">
        <div class="qrtb-item ${userCheckins.length >= 3 ? 'done' : ''}">
          <span class="qrtb-icon">${userCheckins.length >= 3 ? '✅' : '⬜'}</span>
          <span>签到3集 → +30 WATCH</span>
        </div>
        <div class="qrtb-item ${userCheckins.length >= 5 ? 'done' : ''}">
          <span class="qrtb-icon">${userCheckins.length >= 5 ? '✅' : '⬜'}</span>
          <span>签到5集 → +50 WATCH</span>
        </div>
        <div class="qrtb-item ${userCheckins.length >= 8 ? 'done' : ''}">
          <span class="qrtb-icon">${userCheckins.length >= 8 ? '✅' : '⬜'}</span>
          <span>全8集 → +100 WATCH 大奖</span>
        </div>
      </div>
    </div>

    <div class="section-header">
      <span class="section-title">剧集列表</span>
      <span class="section-badge">${userCheckins.length}/8 已签</span>
    </div>

    <div class="qr-episode-list">
      ${QR_TASK_EPISODES.map(ep => {
        const checked = userCheckins.find(c => c.episodeId === ep.id);
        const todayDone = todayCheckins.find(c => c.episodeId === ep.id);
        return `
          <div class="qr-episode-card ${checked ? 'checked' : ''}">
            <div class="qre-left">
              <div class="qre-status">${checked ? '✅' : todayDone ? '✅' : '⬜'}</div>
              <div class="qre-info">
                <div class="qre-title">${ep.title}</div>
                <div class="qre-show">${ep.show}</div>
              </div>
            </div>
            <div class="qre-right">
              <div class="qre-points">+${ep.points} WATCH</div>
              ${checked
                ? '<div class="qre-btn done">已签到</div>'
                : `<div class="qre-btn" onclick="doCheckin('${ep.id}', ${ep.points})">签到打卡</div>`
              }
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="qr-task-notice">
      <div class="qrtn-title">📋 签到说明</div>
      <ul>
        <li>每集签到可获得 <strong>20 WATCH积分</strong></li>
        <li>每日最多签到2集，防止刷分</li>
        <li>全8集签满可获 <strong>+100 WATCH 追番大奖</strong></li>
        <li>综艺每集结尾扫描二维码即可进入此页面</li>
        <li>积分仅可兑换平台商品和服务，不可提现</li>
      </ul>
    </div>
  `;
};

// ========== 签到历史 ==========
window.render_page_qr_task_history = function() {
  const el = document.getElementById('qr-task-history-content');
  if (!el) return;

  const checkins = (Store.get('qr_checkins') || []).slice().reverse();

  el.innerHTML = `
    <div class="qr-history-header">
      <div class="qrhh-title">签到历史</div>
      <div class="qrhh-sub">共 ${checkins.length} 条记录</div>
    </div>
    ${checkins.length === 0
      ? '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.4);">暂无签到记录</div>'
      : `<div class="qr-history-list">
        ${checkins.map(c => `
          <div class="qrh-item">
            <div class="qrh-left">
              <div class="qrh-ep">${c.episodeTitle}</div>
              <div class="qrh-time">${c.time}</div>
            </div>
            <div class="qrh-points">+${c.points} WATCH</div>
          </div>
        `).join('')}
      </div>`
    }
  `;
};

// ========== 签到操作 ==========
function doCheckin(episodeId, points) {
  const checkins = Store.get('qr_checkins') || [];

  // 检查是否已签到
  if (checkins.find(c => c.episodeId === episodeId)) {
    showToast('该集已签到，无需重复签到');
    return;
  }

  // 检查今日签到限制（每日最多2集）
  const todayCount = getTodayCheckins(checkins).length;
  if (todayCount >= 2) {
    showToast('今日签到已达上限（2集/天），明天再来吧');
    return;
  }

  // 获取剧集信息
  const ep = QR_TASK_EPISODES.find(e => e.id === episodeId);
  if (!ep) return;

  // 执行签到
  checkins.push({
    episodeId: ep.id,
    episodeTitle: ep.title,
    points: points,
    time: new Date().toLocaleString('zh-CN')
  });

  Store.set('qr_checkins', checkins);

  // 更新积分
  const currentPoints = Store.get('points_watch') || 0;
  Store.set('points_watch', currentPoints + points);

  showToast(`签到成功！+${points} WATCH积分 🎉`);

  // 刷新页面
  setTimeout(() => render_page_qr_task(), 500);
}

// ========== 工具函数 ==========
function getTodayCheckins(checkins) {
  const today = new Date().toDateString();
  return checkins.filter(c => new Date(c.time).toDateString() === today);
}
