/* =============================================
   app-payment.js - AI支付402协议模块
   合力生态 HarmonyLink v3.2 · AI Payment 402 Protocol
   ============================================= */

// ========== 数据定义 ==========
const AI_PAYMENT_METHODS = [
  { id:'wechat',     name:'微信支付',   icon:'💚', desc:'微信钱包/银行卡',       supported:true,  fee:'0.6%' },
  { id:'alipay',     name:'支付宝',     icon:'💙', desc:'支付宝余额/银行卡',     supported:true,  fee:'0.6%' },
  { id:'unionpay',    name:'云闪付',     icon:'🔵', desc:'银联云闪付APP',         supported:true,  fee:'0.38%' },
  { id:'hp_points',   name:'HP积分支付', icon:'💰', desc:'使用平台HP积分抵扣',   supported:true,  fee:'' },
  { id:'blockchain',  name:'区块链支付', icon:'⛓️', desc:'USDC/USDT on-chain',  supported:false, fee:'链上Gas费' },
  { id:'credit_card', name:'信用卡',     icon:'💳', desc:'Visa/Mastercard',      supported:false, fee:'待接入' }
];

const AI_PAY_SERVICES = [
  { id:'ai-chat-premium',  name:'合力智脑高级对话',     icon:'🤖', desc:'无限次对话+优先算力通道',      price:29,  originalPrice:59,  provider:'合力生态',     hot:true,  new:false },
  { id:'agent-create-pro',   name:'Agent专业版创建',      icon:'🦞', desc:'创建3个Agent+高级任务调度',  price:99,  originalPrice:199, provider:'龙虾Agent',     hot:true,  new:false },
  { id:'pioneer-api',       name:'Pioneer OS API调用包', icon:'🚀', desc:'10万次API调用额度',          price:199, originalPrice:399, provider:'Pioneer OS',    hot:false, new:true  },
  { id:'data-report',        name:'产业数据研报',          icon:'📊', desc:'月度产业热度研报PDF+数据', price:49,  originalPrice:99,  provider:'合力生态',     hot:false, new:true  },
  { id:'nft-mint',          name:'Pioneer先行者NFT',    icon:'🃏', desc:'限量版数字藏品·链上存证',    price:0,   originalPrice:0,   provider:'Pioneer OS',    hot:false, new:true  },
  { id:'live-course',        name:'《智造者》幕后课',      icon:'🎬', desc:'12集幕后制作+产业解读',       price:19,  originalPrice:39,  provider:'合力生态',     hot:false, new:false }
];

const AI_PAY_PRICE_REF = [
  { icon:'🤖', service:'AI对话·高级版',     desc:'合力智脑优先通道/月',   price:'¥29',   unit:'次/月' },
  { icon:'🦞', service:'Agent创建·专业版',   desc:'多Agent并发+高级调度',   price:'¥99',   unit:'次' },
  { icon:'🚀', service:'Pioneer API调用',    desc:'企业级API·10万次',      price:'¥199',  unit:'包' },
  { icon:'📊', service:'产业数据研报',        desc:'月度PDF+原始数据',       price:'¥49',   unit:'份' },
  { icon:'💳', service:'HTTP 402 协议手续费', desc:'支付网关标准手续费',      price:'0.6%',  unit:'/笔' }
];

// ========== 持久化：AI支付订单 ==========
let AI_PAY_ORDERS = [];

function loadAiPayOrders() {
  try {
    const saved = localStorage.getItem('hl_aipay_orders');
    if (saved) AI_PAY_ORDERS = JSON.parse(saved);
  } catch(e) { AI_PAY_ORDERS = []; }
}

function saveAiPayOrders() {
  try { localStorage.setItem('hl_aipay_orders', JSON.stringify(AI_PAY_ORDERS)); } catch(e) {}
}

// 初始化加载
loadAiPayOrders();

// ========== 渲染：AI支付402协议说明页 ==========
window.render_page_ai_pay_402 = function() {
  const el = document.getElementById('ai-pay-402-content');
  if (!el) return;

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#0A1628,#1A0A0A);padding:32px 16px 24px;color:#fff;text-align:center;">
      <div style="font-size:48px;margin-bottom:10px;">💳</div>
      <div style="font-size:22px;font-weight:800;margin-bottom:6px;">AI支付 · HTTP 402协议</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">
        AI Agent 通用支付标准 · 机器自主交易协议层<br>
        为合力生态 AI 服务交易提供标准化支付接口
      </div>
      <div style="margin-top:14px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">
        <span style="font-size:11px;background:rgba(241,143,1,0.25);color:var(--accent);padding:3px 10px;border-radius:10px;">RFC 402 标准</span>
        <span style="font-size:11px;background:rgba(108,99,255,0.25);color:var(--pioneer);padding:3px 10px;border-radius:10px;">Pioneer OS 支持</span>
        <span style="font-size:11px;background:rgba(56,161,105,0.25);color:var(--success);padding:3px 10px;border-radius:10px;">合规审查</span>
      </div>
    </div>

    <!-- 协议核心 -->
    <div style="padding:16px;">
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">⚡ 协议核心机制</div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:32px;height:32px;background:rgba(30,58,95,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:var(--primary);font-weight:700;">1</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:3px;">请求服务</div>
              <div style="font-size:12px;color:var(--text-sub);line-height:1.6;">AI Agent 向服务商发起请求，携带身份认证与付费能力声明</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:32px;height:32px;background:rgba(241,143,1,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:var(--accent);font-weight:700;">2</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:3px;">402 响应</div>
              <div style="font-size:12px;color:var(--text-sub);line-height:1.6;">服务端返回 HTTP 402 Payment Required，携带价格、支付方式、交易哈希等元数据</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:32px;height:32px;background:rgba(108,99,255,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:var(--pioneer);font-weight:700;">3</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:3px;">完成支付</div>
              <div style="font-size:12px;color:var(--text-sub);line-height:1.6;">客户端（或 Agent）通过合力支付网关完成支付，获取交易凭证</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;align-items:flex-start;">
            <div style="width:32px;height:32px;background:rgba(56,161,105,0.08);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;color:var(--success);font-weight:700;">4</div>
            <div style="flex:1;">
              <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:3px;">获取服务</div>
              <div style="font-size:12px;color:var(--text-sub);line-height:1.6;">持交易凭证重新请求，服务商验证后返回服务结果</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">💰 支持支付方式（402协议兼容）</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${AI_PAYMENT_METHODS.map(m => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg);border-radius:var(--radius-sm);">
              <div style="font-size:24px;">${m.icon}</div>
              <div style="flex:1;">
                <div style="font-size:14px;font-weight:700;color:var(--text-main);">${m.name}</div>
                <div style="font-size:11px;color:var(--text-sub);">${m.desc}</div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;">
                <span style="font-size:10px;padding:2px 7px;border-radius:6px;${m.supported ? 'background:rgba(56,161,105,0.1);color:var(--success);' : 'background:rgba(229,62,62,0.1);color:var(--danger);'}">${m.supported ? '✓ 已支持' : '即将支持'}</span>
                ${m.fee ? `<span style="font-size:10px;color:var(--text-muted);">手续费 ${m.fee}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 价格参考 -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">📊 典型服务价格参考</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${AI_PAY_PRICE_REF.map(item => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.04);">
              <div style="font-size:18px;">${item.icon}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;color:var(--text-main);">${item.service}</div>
                <div style="font-size:11px;color:var(--text-muted);">${item.desc}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:14px;font-weight:700;color:var(--accent);">${item.price}</div>
                <div style="font-size:10px;color:var(--text-muted);">${item.unit}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 合规声明 -->
      <div class="compliance-banner" style="margin-bottom:14px;">
        <strong>⚖️ 合规声明</strong>：AI支付402协议交易受智能合约约束，所有交易记录上链存证。支付网关通过中国人民银行合规审查，支持主流支付方式。积分不可提现，AI支付使用法定货币或平台代币。
      </div>

      <div style="display:flex;gap:10px;">
        <button onclick="navigate('page-ai-pay-mall')" style="flex:1;padding:12px;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:#fff;border:none;border-radius:var(--radius-sm);font-size:14px;font-weight:700;cursor:pointer;">
          🛒 AI支付专区
        </button>
        <button onclick="navigate('page-ai-pay-records')" style="flex:1;padding:12px;background:var(--bg);border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-sm);font-size:14px;font-weight:700;color:var(--text-main);cursor:pointer;">
          📋 交易记录
        </button>
      </div>
    </div>
  `;
};

// ========== 渲染：AI支付专区（商城补充） ==========
window.render_page_ai_pay_mall = function() {
  const el = document.getElementById('ai-pay-mall-content');
  if (!el) return;
  const user = Store.get('user');

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#0A1628,#1A0A3A);padding:24px 16px 20px;color:#fff;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
        <div style="font-size:20px;">💳</div>
        <div>
          <div style="font-size:18px;font-weight:800;">AI 支付专区</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.5);">HTTP 402 协议 · 主流支付方式</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <div style="flex:1;background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:18px;font-weight:800;color:var(--accent);">${formatNumber(user.hp)}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">我的 HP 积分</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:18px;font-weight:800;color:var(--pioneer-light);">${AI_PAY_ORDERS.filter(o => o.status === 'completed').length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">已完成交易</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,0.08);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:18px;font-weight:800;color:var(--success);">${AI_PAYMENT_METHODS.filter(m => m.supported).length}/${AI_PAYMENT_METHODS.length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">支付方式</div>
        </div>
      </div>
    </div>

    <!-- 支付方式快捷入口 -->
    <div style="padding:14px 16px 0;">
      <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:10px;">💳 选择支付方式</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${AI_PAYMENT_METHODS.filter(m => m.supported).map(m => `
          <div onclick="showToast('即将跳转${m.name}支付...')" style="flex-shrink:0;min-width:90px;background:var(--card-bg);border-radius:var(--radius-sm);padding:12px 10px;text-align:center;box-shadow:var(--shadow);cursor:pointer;border:2px solid transparent;transition:all 0.2s;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='transparent'">
            <div style="font-size:22px;margin-bottom:4px;">${m.icon}</div>
            <div style="font-size:11px;font-weight:600;color:var(--text-main);">${m.name}</div>
            <div style="font-size:9px;color:var(--text-muted);margin-top:2px;">${m.fee || '无手续费'}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- AI服务商品列表 -->
    <div style="padding:14px 16px 0;">
      <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:10px;">🤖 AI 服务（402协议直付）</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${AI_PAY_SERVICES.filter(s => s.price > 0).map(s => `
          <div class="ai-pay-service-card" onclick="openAiPayModal('${s.id}')" style="background:var(--card-bg);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);cursor:pointer;display:flex;gap:12px;align-items:flex-start;">
            <div style="font-size:32px;flex-shrink:0;">${s.icon}</div>
            <div style="flex:1;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                <div style="font-size:14px;font-weight:700;color:var(--text-main);">${s.name}</div>
                ${s.hot ? '<span class="badge badge-accent" style="font-size:9px;">热门</span>' : ''}
                ${s.new ? '<span class="badge badge-primary" style="font-size:9px;">NEW</span>' : ''}
              </div>
              <div style="font-size:12px;color:var(--text-sub);margin-bottom:8px;line-height:1.5;">${s.desc}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div>
                  <span style="font-size:16px;font-weight:800;color:var(--accent);">¥${s.price}</span>
                  ${s.originalPrice ? `<span style="font-size:11px;color:var(--text-muted);text-decoration:line-through;margin-left:6px;">¥${s.originalPrice}</span>` : ''}
                </div>
                <div style="font-size:10px;color:var(--text-muted);">${s.provider}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 402协议说明入口 -->
    <div style="margin:14px 16px;border-radius:var(--radius-sm);background:linear-gradient(135deg,rgba(30,58,95,0.06),rgba(108,99,255,0.06));padding:14px;cursor:pointer;" onclick="navigate('page-ai-pay-402')">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="font-size:24px;">⚡</div>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:var(--text-main);">了解 HTTP 402 支付协议</div>
          <div style="font-size:11px;color:var(--text-sub);">AI Agent 通用支付标准，助力机器经济</div>
        </div>
        <div style="color:var(--text-muted);font-size:14px;">→</div>
      </div>
    </div>

    <div style="height:80px;"></div>
  `;
};

// ========== 渲染：AI支付交易记录 ==========
window.render_page_ai_pay_records = function() {
  const el = document.getElementById('ai-pay-records-content');
  if (!el) return;
  const orders = AI_PAY_ORDERS;

  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--primary),#0A1628);padding:24px 16px 20px;color:#fff;">
      <div style="font-size:18px;font-weight:800;margin-bottom:4px;">📋 AI支付交易记录</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.5);">HTTP 402 协议 · 所有交易上链存证</div>
      <div style="display:flex;gap:8px;margin-top:14px;">
        <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:16px;font-weight:800;">${orders.length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">总交易</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:16px;font-weight:800;color:var(--success);">${orders.filter(o => o.status==='completed').length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">已完成</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:10px;padding:10px;text-align:center;">
          <div style="font-size:16px;font-weight:800;color:var(--accent);">¥${orders.filter(o => o.status==='completed').reduce((s,o)=>s+o.amount,0)}</div>
          <div style="font-size:10px;color:rgba(255,255,255,0.5);">总支付(元)</div>
        </div>
      </div>
    </div>

    <div style="padding:14px 16px;">
      ${orders.length === 0 ? `
        <div style="text-align:center;padding:40px 0;color:var(--text-muted);">
          <div style="font-size:40px;margin-bottom:10px;">📭</div>
          <div style="font-size:14px;">暂无AI支付交易记录</div>
          <div style="font-size:12px;margin-top:6px;">在AI支付专区完成支付后，记录将出现在此处</div>
          <button onclick="navigate('page-ai-pay-mall')" style="margin-top:14px;padding:10px 24px;background:var(--primary);color:#fff;border:none;border-radius:20px;font-size:13px;cursor:pointer;">去支付</button>
        </div>
      ` : `
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${orders.map(o => `
            <div style="background:var(--card-bg);border-radius:var(--radius-sm);padding:14px;box-shadow:var(--shadow);">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:8px;">
                <div style="font-size:14px;font-weight:700;color:var(--text-main);">${o.serviceName}</div>
                <span class="badge ${o.status==='completed' ? 'badge-success' : o.status==='pending' ? 'badge-warning' : 'badge-danger'}" style="font-size:10px;">
                  ${o.status==='completed' ? '已完成' : o.status==='pending' ? '处理中' : '已取消'}
                </span>
              </div>
              <div style="font-size:12px;color:var(--text-sub);margin-bottom:8px;">${o.method} · ${o.provider}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="font-size:12px;color:var(--text-muted);">${o.time}</div>
                <div style="font-size:15px;font-weight:700;color:var(--accent);">¥${o.amount}</div>
              </div>
              ${o.txHash ? `<div style="font-size:10px;color:var(--text-muted);margin-top:6px;word-break:break-all;">链上凭证: ${o.txHash}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
};

// ========== 弹窗：AI支付确认 ==========
window.openAiPayModal = function(serviceId) {
  const service = AI_PAY_SERVICES.find(s => s.id === serviceId);
  if (!service) { showToast('服务不存在'); return; }
  const methods = AI_PAYMENT_METHODS.filter(m => m.supported);
  let selectedMethod = methods.length > 0 ? methods[0].id : '';

  const modalHtml = `
    <div style="padding:20px 16px 16px;text-align:center;">
      <div style="font-size:36px;margin-bottom:8px;">${service.icon}</div>
      <div style="font-size:17px;font-weight:800;color:var(--text-main);margin-bottom:4px;">确认支付</div>
      <div style="font-size:13px;color:var(--text-sub);margin-bottom:16px;">${service.name}</div>
    </div>

    <div style="padding:0 16px 16px;">
      <div style="background:var(--bg);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;text-align:center;">
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">支付金额</div>
        <div style="font-size:28px;font-weight:800;color:var(--accent);">¥${service.price}</div>
        <div style="font-size:11px;color:var(--text-sub);margin-top:4px;">${service.desc}</div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;color:var(--text-main);margin-bottom:8px;">选择支付方式</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${methods.map(m => `
            <div onclick="selectAiPayMethod('${m.id}')" id="aipay-method-${m.id}"
                 style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg);border-radius:10px;border:2px solid ${selectedMethod===m.id ? 'var(--accent)' : 'transparent'};cursor:pointer;transition:all 0.2s;">
              <div style="font-size:22px;">${m.icon}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:600;color:var(--text-main);">${m.name}</div>
                <div style="font-size:10px;color:var(--text-muted);">${m.desc}</div>
              </div>
              <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${selectedMethod===m.id ? 'var(--accent)' : 'rgba(0,0,0,0.15)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                ${selectedMethod===m.id ? '<div style="width:10px;height:10px;border-radius:50%;background:var(--accent);"></div>' : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="font-size:11px;color:var(--text-muted);margin-bottom:16px;text-align:center;">
        * 支付完成后，服务将通过HTTP 402协议自动开通<br>
        * 所有交易记录上链存证，可在交易记录中查看
      </div>

      <div style="display:flex;gap:10px;">
        <button onclick="closeModal()" style="flex:1;padding:11px;border:1px solid rgba(0,0,0,0.1);background:var(--bg);border-radius:var(--radius-sm);font-size:14px;cursor:pointer;">取消</button>
        <button onclick="doAiPay('${service.id}')" style="flex:1;padding:11px;background:linear-gradient(135deg,var(--accent),var(--accent-light));color:#fff;border:none;border-radius:var(--radius-sm);font-size:14px;font-weight:700;cursor:pointer;">确认支付 ¥${service.price}</button>
      </div>
    </div>
  `;

  document.getElementById('modal-content').innerHTML = modalHtml;
  document.getElementById('modal').classList.add('active');
  document.getElementById('overlay').classList.add('active');
};

let selectedAiPayMethod = '';

window.selectAiPayMethod = function(methodId) {
  selectedAiPayMethod = methodId;
  document.querySelectorAll('[id^="aipay-method-"]').forEach(el => {
    const id = el.id.replace('aipay-method-','');
    el.style.borderColor = id === methodId ? 'var(--accent)' : 'transparent';
  });
};

// ========== 执行AI支付 ==========
window.doAiPay = async function(serviceId) {
  const methodId = selectedAiPayMethod;
  if (!methodId) { showToast('请选择支付方式'); return; }

  const service = AI_PAY_SERVICES.find(s => s.id === serviceId);
  const method = AI_PAYMENT_METHODS.find(m => m.id === methodId);
  if (!service || !method) { showToast('参数错误'); return; }

  closeModal();
  showToast('正在调起支付...');
  await sleep(1200);

  // 模拟支付成功
  const newOrder = {
    id: 'aipo_' + Date.now(),
    serviceId: serviceId,
    serviceName: service.name,
    provider: service.provider,
    method: method.name,
    amount: service.price,
    status: 'completed',
    time: formatTime(),
    txHash: '0x' + Math.random().toString(16).substr(2, 40)
  };

  AI_PAY_ORDERS.unshift(newOrder);
  saveAiPayOrders();

  showToast(`✅ 支付成功！${service.name}已开通`);
  setTimeout(() => navigate('page-ai-pay-records'), 1500);
};
