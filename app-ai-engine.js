/* ============================================
   app-ai-engine.js - 多模型 AI 引擎
   合力生态 HarmonyLink v3.3
   支持: DeepSeek / Google Gemini / OpenRouter / Groq / 离线模拟
   ============================================ */

const AI_ENGINE = {
  // 支持的模型配置（按推荐优先级排列）
  models: {
    'deepseek-chat': {
      name: 'DeepSeek Chat',
      api: 'deepseek',
      model: 'deepseek-chat',
      free: false,
      cheap: true,
      desc: '极度便宜（≈¥1/百万token），中文最强，推荐首选',
      keyUrl: 'https://platform.deepseek.com/api_keys',
      keyHint: '注册即送500万token，充值10元可用数月'
    },
    'gemini-flash': {
      name: 'Gemini 2.0 Flash',
      api: 'gemini',
      model: 'gemini-2.0-flash',
      free: true,
      cheap: true,
      desc: 'Google免费tier（15RPM/100万token/天），速度极快',
      keyUrl: 'https://aistudio.google.com/apikey',
      keyHint: '完全免费，无需绑卡，每天100万token'
    },
    'groq-llama': {
      name: 'Llama 3.3 70B (Groq)',
      api: 'groq',
      model: 'llama-3.3-70b-versatile',
      free: true,
      cheap: true,
      desc: 'Groq免费tier，极速推理，开源最强70B',
      keyUrl: 'https://console.groq.com/keys',
      keyHint: '免费注册即用，每分钟30次请求'
    },
    'openrouter-free': {
      name: 'OpenRouter 免费模型',
      api: 'openrouter',
      model: 'deepseek/deepseek-chat-v3-0324:free',
      free: true,
      cheap: true,
      desc: 'OpenRouter免费路由，自动选最优免费模型',
      keyUrl: 'https://openrouter.ai/keys',
      keyHint: '免费Key即可用，部分模型完全免费'
    },
    'simulate': {
      name: '离线模拟（无需Key）',
      api: 'simulate',
      model: '',
      free: true,
      cheap: true,
      desc: '不调用外部API，使用本地预设回复',
      keyUrl: '',
      keyHint: '开箱即用，回复较机械'
    }
  },

  // 获取用户配置
  getConfig() {
    const cfg = Store.get('aiEngineConfig') || {};
    return {
      model: cfg.model || 'simulate',
      apiKey: cfg.apiKey || '',
      geminiKey: cfg.geminiKey || '',
      deepseekKey: cfg.deepseekKey || '',
      groqKey: cfg.groqKey || '',
      openrouterKey: cfg.openrouterKey || '',
      endpoint: cfg.endpoint || '',
      systemPrompt: cfg.systemPrompt || this.getDefaultSystemPrompt(),
      enabled: cfg.enabled !== false
    };
  },

  // 获取当前模型对应的API Key
  getApiKeyForModel(modelId) {
    const cfg = Store.get('aiEngineConfig') || {};
    const modelCfg = this.models[modelId];
    if (!modelCfg) return cfg.apiKey || '';
    switch (modelCfg.api) {
      case 'deepseek': return cfg.deepseekKey || cfg.apiKey || '';
      case 'gemini': return cfg.geminiKey || cfg.apiKey || '';
      case 'groq': return cfg.groqKey || cfg.apiKey || '';
      case 'openrouter': return cfg.openrouterKey || cfg.apiKey || '';
      default: return '';
    }
  },

  // 保存用户配置
  saveConfig(cfg) {
    Store.set('aiEngineConfig', cfg);
  },

  // 默认系统提示词（合力生态人设）
  getDefaultSystemPrompt() {
    return `你是「合力生态」的 AI 助手，名叫「合力智脑」。
- 合力生态是一个基于「注意力经济」的产业叙事平台
- 用户可以赚取 HP（合力积分）、WATCH（观看积分）、EXP（经验值）等多种积分
- 平台包含综艺《智造者》、社区、商城、产业指数等板块
- 回答要专业、有逻辑、有温度，避免废话
- 如果用户问积分相关问题，可以提示：积分为纯消费型权益，不可提现、不可交易
- 如果用户问投资/股票，必须声明：本平台不构成任何投资建议
- 用换行和项目符号让回答易读
- 回答长度适中，不超过 300 字`;
  },

  // 主入口：发送消息，返回 { success, reply }
  async chat(mode, message, conversationHistory) {
    const config = this.getConfig();
    if (!config.enabled) {
      return this.simulateReply(mode, message);
    }

    const modelCfg = this.models[config.model];
    if (!modelCfg || modelCfg.api === 'simulate') {
      return this.simulateReply(mode, message);
    }

    try {
      switch (modelCfg.api) {
        case 'deepseek':
          return await this.callDeepSeek(config, message, conversationHistory);
        case 'gemini':
          return await this.callGemini(config, message, conversationHistory);
        case 'groq':
          return await this.callGroq(config, message, conversationHistory);
        case 'openrouter':
          return await this.callOpenRouter(config, message, conversationHistory);
        default:
          return this.simulateReply(mode, message);
      }
    } catch (e) {
      console.warn('[AI Engine] API 调用失败，降级到模拟回复:', e.message);
      return { success: true, reply: `⚠️ AI引擎连接失败（${e.message}），已降级为模拟回复。\n\n` + this.simulateReply(mode, message).reply };
    }
  },

  // ========== DeepSeek 调用（OpenAI兼容格式）==========
  async callDeepSeek(config, message, history) {
    const apiKey = this.getApiKeyForModel('deepseek-chat');
    if (!apiKey) {
      throw new Error('请先配置 DeepSeek API Key（我的→AI模型设置）');
    }

    const messages = this.buildMessages(config.systemPrompt, history, message);
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        max_tokens: 600,
        temperature: 0.7,
        stream: false
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`DeepSeek ${res.status}: ${err.slice(0, 100)}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== Google Gemini 调用 ==========
  async callGemini(config, message, history) {
    const apiKey = this.getApiKeyForModel('gemini-flash');
    if (!apiKey) {
      throw new Error('请先配置 Gemini API Key（我的→AI模型设置）');
    }

    // Gemini API 使用 contents 格式
    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-10).forEach(m => {
        contents.push({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.text || '' }]
        });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: config.systemPrompt }] },
          generationConfig: {
            maxOutputTokens: 600,
            temperature: 0.7
          }
        })
      }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Gemini ${res.status}: ${err.slice(0, 100)}`);
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== OpenRouter 调用 ==========
  async callOpenRouter(config, message, history) {
    const apiKey = this.getApiKeyForModel('openrouter-free');
    if (!apiKey) {
      throw new Error('请先配置 OpenRouter API Key');
    }

    const modelCfg = this.models[config.model];
    const messages = this.buildMessages(config.systemPrompt, history, message);

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': location.origin,
        'X-Title': 'HarmonyLink'
      },
      body: JSON.stringify({
        model: modelCfg.model,
        messages,
        max_tokens: 600,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenRouter ${res.status}: ${err.slice(0, 100)}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== Groq 调用 ==========
  async callGroq(config, message, history) {
    const apiKey = this.getApiKeyForModel('groq-llama');
    if (!apiKey) {
      throw new Error('请先配置 Groq API Key');
    }

    const modelCfg = this.models[config.model];
    const messages = this.buildMessages(config.systemPrompt, history, message);

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelCfg.model,
        messages,
        max_tokens: 600,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Groq ${res.status}: ${err.slice(0, 100)}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== 辅助函数 ==========
  buildMessages(systemPrompt, history, currentMessage) {
    const messages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) {
      history.slice(-10).forEach(m => {
        messages.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text || '' });
      });
    }
    messages.push({ role: 'user', content: currentMessage });
    return messages;
  },

  // ========== 模拟回复（离线降级） ==========
  simulateReply(mode, message) {
    const responses = {
      c: {
        '积分': '你目前有 HP:12800、WATCH:5600、EXP:3200、GOV:800、DATA:1200、MP:2400。\n\n积分获取建议：\n1. 观看《智造者》综艺，获取WATCH积分\n2. 发表产业分析评论，获取EXP积分\n3. 参与社区治理投票，获取GOV积分\n\n⚠️ 提醒：积分为纯消费型权益，不可提现、不可交易',
        '指数': '合力产业热度指数仅反映公众对上市公司的产业关注度与叙事热度。\n\n当前热度TOP3：\n1. 华为 96.1（未上市）\n2. 比亚迪 92.4 ↑\n3. 中芯国际 88.7 ↑\n\n⚠️ 本指数不构成任何投资建议，仅用于产业研究与品牌传播参考',
        'agent': '龙虾Agent是你的注意力资产化通道 🦞\n\n你当前是Lv.5先锋使者，可以创建个人Agent！\n\n推荐先创建「内容分析Agent」，自动分析行业研报并生成评论，每篇可获+200 EXP，一周可积累1400 EXP。\n\n要现在去创建吗？',
        'pioneer': 'Pioneer OS是合力生态的子站，专注上市公司垂直产业叙事。\n\n核心能力：\n• 将企业故事转化为可量化的产业温度数据\n• 区块链存证，不可篡改\n• 与合力指数深度联动\n\n建议你先看比亚迪的产业叙事，体验一下如何用故事驱动估值'
      },
      b: {
        '报告': '正在生成本月运营周报...\n\n📊 **5月运营摘要**\n• 月度收入：284万元（环比+18%）\n• 活跃用户：8924人（较上月+1200）\n• 品牌指数：92.4（涨3.2）\n• 注意力ROI：比传统广告高4.2倍\n\n🎯 **下月建议**\n1. 发布新一批产品券（预计带来200+订单）\n2. 参与《智造者》赞助可获品牌叙事内容\n3. 启动积分激励任务，目标召回流失用户300人',
        '策略': '根据你的用户数据，推荐以下积分激励策略：\n\n🎯 策略一：复购激励\n条件：30天内未下单用户\n激励：首单额外-200HP\n预计ROI：3.2x\n\n🎯 策略二：内容互动\n条件：看完企业纪录片\n激励：+50 WATCH积分\n预计激活率：38%\n\n🎯 策略三：转介绍奖励\n条件：成功邀请1位好友注册\n激励：双方各得+100HP\n预计增长：15%新用户'
      }
    };

    const modeKey = mode || 'c';
    const lower = message.toLowerCase();
    const respMap = responses[modeKey] || responses.c;
    let reply = '';

    for (const [key, val] of Object.entries(respMap)) {
      if (lower.includes(key)) { reply = val; break; }
    }

    if (!reply) {
      reply = modeKey === 'c'
        ? `关于「${message}」，我来帮你分析一下：\n\n在合力生态中，这个问题涉及多个维度。基于你目前 Lv.5 的等级和积分状况，建议你先了解相关的积分规则，通过观看内容和参与互动来累积更多价值。\n\n具体来说：WATCH积分通过观看综艺获取，EXP通过发表专业评论获取，MP积分是衡量你人性温度贡献的核心指标。\n\n有更具体的问题可以继续问我！`
        : `关于「${message}」的商业策略建议：\n\n结合合力生态的注意力经济模型，建议从三个维度切入：\n\n1. **内容曝光**：赞助相关综艺内容，获取精准用户注意力\n2. **积分激励**：设计合理的HP积分任务，提升用户活跃度\n3. **指数管理**：维护好品牌在合力指数中的各维度评分\n\n需要我生成具体的执行方案吗？`;
    }

    return { success: true, reply };
  },

  // ========== 测试连接 ==========
  async testConnection() {
    try {
      const result = await this.chat('c', '你好，请用一句话介绍你自己', []);
      return { success: true, reply: result.reply };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // ========== 获取模型状态信息 ==========
  getModelStatus() {
    const cfg = this.getConfig();
    const model = cfg.model || 'simulate';
    const modelCfg = this.models[model];
    const hasKey = !!this.getApiKeyForModel(model);
    return {
      model,
      name: modelCfg?.name || '未知',
      api: modelCfg?.api || 'simulate',
      isConfigured: model === 'simulate' || hasKey,
      needsKey: modelCfg && modelCfg.api !== 'simulate' && !hasKey,
      keyUrl: modelCfg?.keyUrl || '',
      keyHint: modelCfg?.keyHint || ''
    };
  }
};

// ========== AI 模型设置页面渲染 ==========
window.render_page_ai_settings = function() {
  const el = document.getElementById('ai-settings-content');
  if (!el) return;

  const cfg = AI_ENGINE.getConfig();
  const status = AI_ENGINE.getModelStatus();

  const modelCards = Object.entries(AI_ENGINE.models).map(([id, m]) => {
    const isActive = cfg.model === id;
    const needsKey = m.api !== 'simulate';
    const hasSpecificKey = needsKey && !!AI_ENGINE.getApiKeyForModel(id);
    const isReady = !needsKey || hasSpecificKey;

    return `
      <div class="ai-model-card ${isActive ? 'active' : ''} ${isReady ? 'ready' : 'needs-key'}"
           onclick="selectAIModel('${id}')">
        <div class="amc-header">
          <div class="amc-name">${m.name}</div>
          <div class="amc-badges">
            ${m.free ? '<span class="amc-badge free">免费</span>' : '<span class="amc-badge cheap">低价</span>'}
            ${isActive ? '<span class="amc-badge current">当前</span>' : ''}
            ${isReady ? '<span class="amc-badge ok">✓</span>' : '<span class="amc-badge warn">需Key</span>'}
          </div>
        </div>
        <div class="amc-desc">${m.desc}</div>
        ${needsKey && !hasSpecificKey ? `<div class="amc-key-hint">💡 ${m.keyHint}</div>` : ''}
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <div class="ais-section">
      <div class="ais-title">🤖 选择 AI 模型</div>
      <div class="ais-subtitle">不同模型需要不同的API Key，首次使用请先配置</div>
    </div>

    <div class="ais-models">
      ${modelCards}
    </div>

    <div class="ais-section" style="margin-top:16px;">
      <div class="ais-title">🔑 API Key 配置</div>
      <div class="ais-subtitle">Key仅保存在你的浏览器本地，不会上传服务器</div>
    </div>

    <div class="ais-keys">
      <div class="ais-key-group">
        <label class="ais-key-label">DeepSeek API Key</label>
        <div class="ais-key-row">
          <input type="password" id="ais-key-deepseek" class="ais-key-input"
                 value="${cfg.deepseekKey || ''}"
                 placeholder="sk-..."
                 onfocus="this.type='text'" onblur="this.type='password'">
          <a class="ais-key-link" href="https://platform.deepseek.com/api_keys" target="_blank">获取</a>
        </div>
      </div>

      <div class="ais-key-group">
        <label class="ais-key-label">Google Gemini API Key</label>
        <div class="ais-key-row">
          <input type="password" id="ais-key-gemini" class="ais-key-input"
                 value="${cfg.geminiKey || ''}"
                 placeholder="AIza..."
                 onfocus="this.type='text'" onblur="this.type='password'">
          <a class="ais-key-link" href="https://aistudio.google.com/apikey" target="_blank">获取</a>
        </div>
      </div>

      <div class="ais-key-group">
        <label class="ais-key-label">Groq API Key</label>
        <div class="ais-key-row">
          <input type="password" id="ais-key-groq" class="ais-key-input"
                 value="${cfg.groqKey || ''}"
                 placeholder="gsk_..."
                 onfocus="this.type='text'" onblur="this.type='password'">
          <a class="ais-key-link" href="https://console.groq.com/keys" target="_blank">获取</a>
        </div>
      </div>

      <div class="ais-key-group">
        <label class="ais-key-label">OpenRouter API Key</label>
        <div class="ais-key-row">
          <input type="password" id="ais-key-openrouter" class="ais-key-input"
                 value="${cfg.openrouterKey || ''}"
                 placeholder="sk-or-..."
                 onfocus="this.type='text'" onblur="this.type='password'">
          <a class="ais-key-link" href="https://openrouter.ai/keys" target="_blank">获取</a>
        </div>
      </div>
    </div>

    <div class="ais-section" style="margin-top:16px;">
      <div class="ais-title">⚙️ 高级设置</div>
    </div>

    <div class="ais-advanced">
      <div class="ais-key-group">
        <label class="ais-key-label">自定义系统提示词</label>
        <textarea id="ais-system-prompt" class="ais-textarea"
                  rows="4" placeholder="自定义AI助手人设...">${cfg.systemPrompt}</textarea>
      </div>

      <div class="ais-toggle-row">
        <span>启用AI引擎</span>
        <label class="ais-switch">
          <input type="checkbox" id="ais-enabled" ${cfg.enabled ? 'checked' : ''}>
          <span class="ais-slider"></span>
        </label>
      </div>
    </div>

    <div class="ais-actions">
      <button class="ais-btn ais-btn-save" onclick="saveAISettings()">💾 保存设置</button>
      <button class="ais-btn ais-btn-test" onclick="testAIConnection()">🧪 测试连接</button>
      <button class="ais-btn ais-btn-reset" onclick="resetAISettings()">🔄 重置</button>
    </div>

    <div id="ais-test-result" class="ais-test-result" style="display:none;"></div>

    <div class="ais-tips">
      <div class="ais-title" style="font-size:13px;">📖 推荐配置指南</div>
      <div class="ais-tip-item">
        <strong>🥇 最推荐：DeepSeek</strong><br>
        中文能力最强，价格极低（充值10元可用数月），注册送500万token。
        在 platform.deepseek.com 注册获取Key。
      </div>
      <div class="ais-tip-item">
        <strong>🥈 完全免费：Gemini Flash</strong><br>
        Google免费tier，每天100万token，无需绑卡，速度快。
        在 aistudio.google.com 获取Key。
      </div>
      <div class="ais-tip-item">
        <strong>🥉 极速推理：Groq</strong><br>
        免费tier，Llama 3.3 70B开源最强模型，推理速度最快。
        在 console.groq.com 获取Key。
      </div>
    </div>
  `;
};

// ========== AI 设置交互函数 ==========

function selectAIModel(modelId) {
  const cfg = AI_ENGINE.getConfig();
  cfg.model = modelId;
  AI_ENGINE.saveConfig(cfg);
  // 重新渲染
  render_page_ai_settings();
  showToast(`已选择: ${AI_ENGINE.models[modelId].name}`);
}

function saveAISettings() {
  const cfg = AI_ENGINE.getConfig();

  // 保存各API Key
  const dk = document.getElementById('ais-key-deepseek');
  const gk = document.getElementById('ais-key-gemini');
  const grk = document.getElementById('ais-key-groq');
  const ork = document.getElementById('ais-key-openrouter');
  const sp = document.getElementById('ais-system-prompt');
  const en = document.getElementById('ais-enabled');

  if (dk) cfg.deepseekKey = dk.value.trim();
  if (gk) cfg.geminiKey = gk.value.trim();
  if (grk) cfg.groqKey = grk.value.trim();
  if (ork) cfg.openrouterKey = ork.value.trim();
  if (sp) cfg.systemPrompt = sp.value.trim() || AI_ENGINE.getDefaultSystemPrompt();
  if (en) cfg.enabled = en.checked;

  // 兼容：同步到通用 apiKey 字段
  const modelCfg = AI_ENGINE.models[cfg.model];
  if (modelCfg) {
    cfg.apiKey = AI_ENGINE.getApiKeyForModel(cfg.model);
  }

  AI_ENGINE.saveConfig(cfg);
  showToast('✅ 设置已保存');
}

async function testAIConnection() {
  // 先保存
  saveAISettings();

  const resultEl = document.getElementById('ais-test-result');
  if (!resultEl) return;

  resultEl.style.display = 'block';
  resultEl.innerHTML = '<div class="ais-testing">⏳ 正在测试连接...</div>';

  const result = await AI_ENGINE.testConnection();

  if (result.success) {
    resultEl.innerHTML = `
      <div class="ais-test-ok">
        ✅ 连接成功！<br>
        <div class="ais-test-reply">${result.reply.replace(/\n/g, '<br>')}</div>
      </div>
    `;
  } else {
    resultEl.innerHTML = `
      <div class="ais-test-fail">
        ❌ 连接失败: ${result.error}<br>
        <div class="ais-test-hint">请检查API Key是否正确，或切换到其他模型</div>
      </div>
    `;
  }
}

function resetAISettings() {
  if (!confirm('确定要重置所有AI设置吗？')) return;
  Store.set('aiEngineConfig', {
    model: 'simulate',
    enabled: true,
    systemPrompt: AI_ENGINE.getDefaultSystemPrompt()
  });
  render_page_ai_settings();
  showToast('已重置为离线模拟模式');
}
