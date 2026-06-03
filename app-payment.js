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

// ========== 渲染：AI支付402协议说明页（v3.3 升级版） ==========
window.render_page_ai_pay_402 = function() {
  const el = document.getElementById('ai-pay-402-content');
  if (!el) return;

  // 模拟实时交易流演示
  const demoTx = [
    { icon:'🤖', agent:'合力智脑Agent',    action:'请求产业研报',   amount:'¥49', status:'completed', hash:'0x7a9f...3e2c', t:'10:28:33' },
    { icon:'🦞', agent:'龙虾Agent #007',    action:'订阅高级对话',   amount:'¥29', status:'completed', hash:'0x4c1d...8ab1', t:'09:12:05' },
    { icon:'🚀', agent:'Pioneer OS Agent', action:'API调用额度',     amount:'¥199',status:'completed', hash:'0xe3f7...92d4', t:'昨天' },
    { icon:'🧠', agent:'DeepSeek调用',      action:'推理API token',  amount:'¥0.002',status:'completed',hash:'0x11a0...7c39',t:'2天前' }
  ];

  el.innerHTML = `
    <!-- 英雄区 -->
    <div style="background:linear-gradient(135deg,#050d1a,#0d0520);padding:32px 16px 28px;color:#fff;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(241,143,1,0.08);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(108,99,255,0.1);border-radius:50%;"></div>
      <div style="text-align:center;position:relative;">
        <div style="font-size:52px;margin-bottom:12px;filter:drop-shadow(0 0 20px rgba(241,143,1,0.4));">⚡</div>
        <div style="font-size:24px;font-weight:900;letter-spacing:-0.5px;margin-bottom:6px;">HTTP 402 · AI支付协议</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.8;max-width:280px;margin:0 auto;">
          Payment Required · 让 AI Agent 学会自主付钱<br>
          合力生态 × Pioneer OS 联合实现
        </div>
        <div style="margin-top:14px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">
          <span style="font-size:10px;background:rgba(241,143,1,0.2);color:#f18f01;padding:3px 10px;border-radius:20px;border:1px solid rgba(241,143,1,0.3);">RFC 402 标准</span>
          <span style="font-size:10px;background:rgba(108,99,255,0.2);color:#b8b0ff;padding:3px 10px;border-radius:20px;border:1px solid rgba(108,99,255,0.3);">Pioneer OS 兼容</span>
          <span style="font-size:10px;background:rgba(56,161,105,0.2);color:#68d391;padding:3px 10px;border-radius:20px;border:1px solid rgba(56,161,105,0.3);">央行合规</span>
          <span style="font-size:10px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.7);padding:3px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);">链上存证</span>
        </div>
      </div>
    </div>

    <div style="padding:16px;">

      <!-- 实时交易流演示 -->
      <div class="card" style="margin-bottom:14px;background:linear-gradient(135deg,rgba(5,13,26,0.04),rgba(13,5,32,0.04));">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div class="card-title" style="margin-bottom:0;">🔴 实时链上交易流</div>
          <span style="font-size:10px;color:var(--success);background:rgba(56,161,105,0.1);padding:2px 8px;border-radius:10px;">LIVE</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${demoTx.map(tx => `
            <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(0,0,0,0.03);border-radius:8px;">
              <div style="font-size:20px;">${tx.icon}</div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:12px;font-weight:700;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tx.agent}</div>
                <div style="font-size:10px;color:var(--text-sub);">${tx.action}</div>
                <div style="font-size:9px;color:var(--text-muted);margin-top:2px;font-family:monospace;">${tx.hash}</div>
              </div>
              <div style="text-align:right;flex-shrink:0;">
                <div style="font-size:13px;font-weight:800;color:var(--accent);">${tx.amount}</div>
                <div style="font-size:9px;color:var(--success);">✓ ${tx.t}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;margin-top:10px;">
          <span style="font-size:11px;color:var(--text-muted);">⛓️ 全部交易已上链存证，不可篡改</span>
        </div>
      </div>

      <!-- 协议流程（交互式步骤） -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">⚡ 协议工作流程</div>
        <div style="position:relative;padding-left:40px;">
          <div style="position:absolute;left:15px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,var(--primary),var(--accent),var(--pioneer),var(--success));border-radius:2px;"></div>
          ${[
            { n:'1', color:'var(--primary)', bg:'rgba(30,58,95,0.08)', title:'AI Agent 发起请求', desc:'Agent 向服务商发起 HTTP GET/POST 请求，携带身份认证 Token 和付费能力声明头部', code:'GET /api/data-report\nAuthorization: Bearer {agent_token}\nX-Payment-Capable: true' },
            { n:'2', color:'var(--accent)',   bg:'rgba(241,143,1,0.08)', title:'服务端返回 402', desc:'服务商检测到未支付，返回 HTTP 402 Payment Required，并在响应体携带支付元数据', code:'HTTP/1.1 402 Payment Required\n{\n  "price": 49,\n  "currency": "CNY",\n  "methods": ["wechat","alipay","hp_points"],\n  "expires": 300\n}' },
            { n:'3', color:'var(--pioneer)', bg:'rgba(108,99,255,0.08)', title:'客户端完成支付', desc:'用户或 Agent 选择支付方式，通过合力支付网关完成扣款，获取交易凭证（tx_hash）', code:'POST /payment/complete\n{\n  "method": "hp_points",\n  "tx_hash": "0x7a9f...3e2c",\n  "timestamp": 1748913333\n}' },
            { n:'4', color:'var(--success)', bg:'rgba(56,161,105,0.08)', title:'凭证换取服务', desc:'携带 tx_hash 重新请求，服务商验证凭证有效后返回服务结果，链上记录解锁状态', code:'GET /api/data-report\nX-Payment-Token: 0x7a9f...3e2c\n→ 200 OK: {report: "..."}' }
          ].map(s => `
            <div style="margin-bottom:16px;position:relative;">
              <div style="position:absolute;left:-32px;top:2px;width:28px;height:28px;background:${s.bg};border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${s.color};border:1.5px solid ${s.color}30;">${s.n}</div>
              <div style="font-size:14px;font-weight:700;color:var(--text-main);margin-bottom:4px;">${s.title}</div>
              <div style="font-size:12px;color:var(--text-sub);line-height:1.6;margin-bottom:8px;">${s.desc}</div>
              <div style="background:#0d1117;border-radius:8px;padding:10px;font-family:monospace;font-size:10px;color:#79c0ff;line-height:1.7;white-space:pre-wrap;overflow-x:auto;">${s.code}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 与合力生态的结合 -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">🔗 402协议 × 合力生态集成方案</div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${[
            { icon:'🦞', title:'龙虾Agent 自主采购', desc:'Agent自动识别内容创作所需数据，触发402支付购买研报、API额度，无需用户手动干预', tag:'已实现' },
            { icon:'📊', title:'HP积分原生接入', desc:'平台积分可作为402协议原生支付货币，1 HP = ¥0.02，零手续费，适合微支付场景', tag:'已实现' },
            { icon:'⛓️', title:'链上交易存证', desc:'每笔402交易生成不可篡改的链上记录，平台积分的真实消耗/获得有第三方审计保障', tag:'已实现' },
            { icon:'🤝', title:'B端API接口开放', desc:'上市公司可接入合力402网关，让AI Agent自主购买企业数据服务，打通机器经济入口', tag:'规划中' },
            { icon:'🌐', title:'跨链支付通道', desc:'USDC/USDT跨境支付通道（Stripe/Coinbase协议），覆盖境外AI服务采购场景', tag:'规划中' }
          ].map(item => `
            <div style="display:flex;gap:12px;align-items:flex-start;padding:10px;border-radius:var(--radius-sm);background:var(--bg);">
              <div style="font-size:24px;flex-shrink:0;">${item.icon}</div>
              <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
                  <div style="font-size:13px;font-weight:700;color:var(--text-main);">${item.title}</div>
                  <span style="font-size:9px;padding:2px 6px;border-radius:6px;${item.tag==='已实现' ? 'background:rgba(56,161,105,0.12);color:var(--success);' : 'background:rgba(241,143,1,0.12);color:var(--accent);'}">${item.tag}</span>
                </div>
                <div style="font-size:11px;color:var(--text-sub);line-height:1.6;">${item.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 支付方式列表 -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">💰 支付方式（402协议兼容矩阵）</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${AI_PAYMENT_METHODS.map(m => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--bg);border-radius:var(--radius-sm);${!m.supported ? 'opacity:0.55;' : ''}">
              <div style="font-size:24px;">${m.icon}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;color:var(--text-main);">${m.name}</div>
                <div style="font-size:11px;color:var(--text-sub);">${m.desc}</div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;">
                <span style="font-size:10px;padding:2px 7px;border-radius:6px;${m.supported ? 'background:rgba(56,161,105,0.1);color:var(--success);' : 'background:rgba(100,100,100,0.1);color:var(--text-muted);'}">${m.supported ? '✓ 已接入' : '即将支持'}</span>
                ${m.fee ? `<span style="font-size:10px;color:var(--text-muted);">手续费 ${m.fee}</span>` : '<span style="font-size:10px;color:var(--success);">无手续费</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 价格参考 -->
      <div class="card" style="margin-bottom:14px;">
        <div class="card-title">📊 AI服务价格参考（基于402协议）</div>
        <div style="display:flex;flex-direction:column;gap:6px;">
          ${AI_PAY_PRICE_REF.map((item,i) => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 0;${i<AI_PAY_PRICE_REF.length-1 ? 'border-bottom:1px solid rgba(0,0,0,0.04);' : ''}">
              <div style="font-size:18px;">${item.icon}</div>
              <div style="flex:1;">
                <div style="font-size:12px;font-weight:600;color:var(--text-main);">${item.service}</div>
                <div style="font-size:10px;color:var(--text-muted);">${item.desc}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:14px;font-weight:800;color:var(--accent);">${item.price}</div>
                <div style="font-size:10px;color:var(--text-muted);">${item.unit}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 合规声明 -->
      <div class="compliance-banner" style="margin-bottom:16px;">
        <strong>⚖️ 合规声明</strong>：HTTP 402 AI支付协议由合力生态平台实施，交易受智能合约约束，所有记录上链存证不可篡改。支付网关符合《非银行支付机构条例》要求，仅支持法定货币及平台积分，不涉及虚拟货币。积分严禁提现，AI支付无任何金融投资属性。
      </div>

      <div style="display:flex;gap:10px;margin-bottom:8px;">
        <button onclick="navigate('page-ai-pay-mall')" style="flex:1;padding:13px;background:linear-gradient(135deg,var(--primary),var(--primary-light));color:#fff;border:none;border-radius:var(--radius-sm);font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(30,58,95,0.25);">
          🛒 去AI支付专区
        </button>
        <button onclick="navigate('page-ai-pay-records')" style="flex:1;padding:13px;background:var(--card-bg);border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-sm);font-size:14px;font-weight:700;color:var(--text-main);cursor:pointer;">
          📋 交易记录
        </button>
      </div>
      <div style="height:40px;"></div>
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
