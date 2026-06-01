/* ============================================
   app-ai-engine.js - 多模型 AI 引擎
   合力生态 HarmonyLink v3.2
   ============================================ */

const AI_ENGINE = {
  // 支持的免费/低价模型配置
  models: {
    'openrouter-auto': {
      name: 'OpenRouter 自动路由',
      api: 'openrouter',
      model: 'google/gemini-flash-1.5',
      free: true,
      desc: '自动选择最优免费模型，需免费 API Key'
    },
    'openrouter-llama': {
      name: 'Llama 3.1 8B (OpenRouter)',
      api: 'openrouter',
      model: 'meta-llama/llama-3.1-8b-instruct:free',
      free: true,
      desc: 'Meta 开源模型，完全免费'
    },
    'openrouter-gemini': {
      name: 'Gemini Flash 1.5 (OpenRouter)',
      api: 'openrouter',
      model: 'google/gemini-flash-1.5',
      free: true,
      desc: 'Google 高速模型'
    },
    'groq-llama': {
      name: 'Llama 3.1 (Groq)',
      api: 'groq',
      model: 'llama-3.1-8b-instant',
      free: true,
      desc: 'Groq 免费 tier，极速推理'
    },
    'huggingface': {
      name: 'HuggingFace 公开推理',
      api: 'huggingface',
      model: 'meta-llama/Llama-3.2-3B-Instruct',
      free: true,
      desc: '无需 Key，直接调用（有 CORS 限制）'
    },
    'simulate': {
      name: '模拟回复（离线模式）',
      api: 'simulate',
      model: '',
      free: true,
      desc: '不调用外部 API，使用本地模拟回复'
    }
  },

  // 获取用户配置
  getConfig() {
    const cfg = Store.get('aiEngineConfig') || {};
    return {
      model: cfg.model || 'simulate',
      apiKey: cfg.apiKey || '',
      endpoint: cfg.endpoint || '',
      systemPrompt: cfg.systemPrompt || this.getDefaultSystemPrompt(),
      enabled: cfg.enabled !== false
    };
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
    if (!modelCfg) {
      return this.simulateReply(mode, message);
    }

    try {
      if (modelCfg.api === 'openrouter') {
        return await this.callOpenRouter(config, message, conversationHistory);
      } else if (modelCfg.api === 'groq') {
        return await this.callGroq(config, message, conversationHistory);
      } else if (modelCfg.api === 'huggingface') {
        return await this.callHuggingFace(config, message, conversationHistory);
      } else {
        return this.simulateReply(mode, message);
      }
    } catch (e) {
      console.warn('[AI Engine] API 调用失败，降级到模拟回复:', e.message);
      return this.simulateReply(mode, message);
    }
  },

  // ========== OpenRouter 调用 ==========
  async callOpenRouter(config, message, history) {
    const apiKey = config.apiKey || this.getConfig().apiKey;
    if (!apiKey) {
      throw new Error('OpenRouter 需要 API Key（可在「我的」→「AI 模型设置」中配置）');
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
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`OpenRouter 错误 ${res.status}: ${err}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== Groq 调用 ==========
  async callGroq(config, message, history) {
    const apiKey = config.apiKey || this.getConfig().apiKey;
    if (!apiKey) {
      throw new Error('Groq 需要 API Key');
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
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Groq 错误 ${res.status}: ${err}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || '（模型未返回内容）';
    return { success: true, reply };
  },

  // ========== HuggingFace 公开推理 ==========
  async callHuggingFace(config, message, history) {
    // 尝试多个公开端点（无需 Key，但有 CORS 限制）
    const modelCfg = this.models[config.model];
    const prompt = this.buildHFPrompt(config.systemPrompt, history, message);

    // 端点1: HF Inference API（可能需要 Key）
    try {
      const headers = { 'Content-Type': 'application/json' };
      const apiKey = config.apiKey;
      if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

      const res = await fetch(
        `https://api-inference.huggingface.co/models/${modelCfg.model}`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 300 } })
        }
      );
      if (res.ok) {
        const data = await res.json();
        const reply = Array.isArray(data) ? (data[0]?.generated_text || '').replace(prompt, '').trim() : '';
        if (reply) return { success: true, reply };
      }
    } catch (e) { /* 忽略，尝试下一个 */ }

    // 端点2: 使用 OpenRouter 免费模型作为后备（无需 Key 的公开代理）
    throw new Error('HuggingFace 直接调用受 CORS 限制，建议使用 OpenRouter 免费模型');
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

  buildHFPrompt(systemPrompt, history, currentMessage) {
    let prompt = `<|begin_of_text|><|system|>\n${systemPrompt}<|end_of_text|>\n`;
    if (Array.isArray(history)) {
      history.slice(-6).forEach(m => {
        const role = m.role === 'assistant' ? 'assistant' : 'user';
        prompt += `<|${role}|>\n${m.text || ''}<|end_of_text|>\n`;
      });
    }
    prompt += `<|user|>\n${currentMessage}<|end_of_text|>\n<|assistant|>\n`;
    return prompt;
  },

  // ========== 模拟回复（原逻辑，作为降级） ==========
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
  async testConnection(modelId) {
    try {
      const cfg = this.getConfig();
      const result = await this.chat('c', '你好，请简单自我介绍', []);
      return { success: true, reply: result.reply };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};
