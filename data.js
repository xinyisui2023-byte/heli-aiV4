/* =============================================
   data.js - Mock数据层 + Store + API
   合力生态 HarmonyLink v3.0
   AI时代上市公司产业叙事与公众注意力价值平台
   ============================================= */

// ========== 合规常量 ==========
const COMPLIANCE = {
  disclaimer: '本平台所有内容与指数仅反映公众对上市公司的产业关注度与叙事热度，不构成任何投资建议。平台不提供证券投资咨询服务，所有用户观点不代表平台立场。股市有风险，投资需谨慎，请勿据此做出任何交易决策。',
  redLines: [
    '禁止任何形式的"买入/持有/卖出"投资建议、目标价预测、选股推荐',
    '禁止指数名称/描述中出现"投资价值""看涨/看跌""推荐"等词汇',
    '禁止积分提现、交易、转让、升值承诺、股权绑定',
    '禁止与上市公司进行"付费刷分""付费提升排名""付费删差评"合作',
    '禁止引导用户进行A股/H股股票交易'
  ],
  indexFullname: '合力产业热度指数',
  indexShortname: '合力热度指数',
  platformPosition: '国内首个将公众注意力转化为可量化产业价值的新质生产力平台',
  platformMission: '通过UGC产业评价、AI辅助叙事、积分权益体系，连接产学研学者、普通公众与上市公司，打造"产业认知-注意力-品牌价值"的正向循环'
};

// ========== MOCK DATA ==========
const MOCK_DATA = {
  user: {
    id: 'hl_001',
    nickname: '先行者Nebula',
    avatar: '🦁',
    hp: 12800,
    exp: 3200,
    watch: 5600,
    gov: 800,
    data: 1200,
    mp: 2400,
    willpower: 72400,
    willpowerMonthly: 8600,
    rank: 128,
    level: 5,
    levelName: 'Lv.5 先锋使者',
    honorsClaimed: [],
    orders: [],
    checkinToday: false,
    agentCreated: false,
    agentName: '',
    agentType: ''
  },

  levels: [
    { level: 1, name: '觉醒者', minWP: 0, maxWP: 5000, benefits: ['基础积分兑换', '参与投票'] },
    { level: 2, name: '探索者', minWP: 5000, maxWP: 15000, benefits: ['EXP积分解锁', '研报评论权'] },
    { level: 3, name: '先行者', minWP: 15000, maxWP: 35000, benefits: ['GOV积分解锁', '社区治理票'] },
    { level: 4, name: '建设者', minWP: 35000, maxWP: 70000, benefits: ['DATA积分解锁', '数据上链'] },
    { level: 5, name: '先锋使者', minWP: 70000, maxWP: 150000, benefits: ['MP积分解锁', '龙虾Agent'] },
    { level: 6, name: '意义创造者', minWP: 150000, maxWP: 999999, benefits: ['全部权益', 'DAO治理权'] }
  ],

  pointsPool: {
    totalHP: 50000000,
    circulatingHP: 32000000,
    destroyedHP: 8000000,
    sponsorReserve: 10000000
  },

  shows: [
    {
      id: 'zhizaozhe',
      type: 'season1',
      title: '《智造者》第一季',
      subtitle: '新质生产力上市公司探秘之旅',
      emoji: '🏭',
      status: 'upcoming',
      badge: 'Q3开机',
      episodes: 12,
      watchedEps: 0,
      sponsor: '比亚迪、中芯国际、华为等',
      desc: '首个聚焦新质生产力的S级综艺节目。流量艺人深入灯塔工厂，探索中国制造的智慧升级。每集完播奖励WATCH积分，限量发行企业联名徽章。',
      tags: ['灯塔工厂', '新质生产力', '流量艺人', 'S级制作'],
      reward_per_ep: 100,
      total_reward: 1200,
      episodes_data: [
        { id: 'e1', num: 1, title: '比亚迪：智能座舱革命', duration: '48分钟', watched: false, reward: 100, desc: '深入比亚迪仰望超级工厂，探秘智能座舱的AI进化' },
        { id: 'e2', num: 2, title: '中芯国际：芯片之战', duration: '52分钟', watched: false, reward: 100, desc: '揭秘中国芯片制造最前线，7nm工艺背后的故事' },
        { id: 'e3', num: 3, title: '华为：AI算力帝国', duration: '45分钟', watched: false, reward: 100, desc: '华为昇腾算力中心开放参观，AI时代的算力基础设施' },
        { id: 'e4', num: 4, title: '宁德时代：储能新世界', duration: '50分钟', watched: false, reward: 100, desc: '全球最大动力电池工厂，储能革命正在发生' },
        { id: 'e5', num: 5, title: '商汤科技：感知未来', duration: '44分钟', watched: false, reward: 100, desc: '计算机视觉领域的AI先锋，感知技术重塑世界' },
        { id: 'e6', num: 6, title: '海康威视：智慧眼', duration: '47分钟', watched: false, reward: 100, desc: '全球领先的视频技术企业，AI安防如何守护城市' },
        { id: 'e7', num: 7, title: '科大讯飞：语音的力量', duration: '46分钟', watched: false, reward: 100, desc: '语音AI的中国力量，讯飞如何让机器听懂中文' },
        { id: 'e8', num: 8, title: '三一重工：重工智能化', duration: '53分钟', watched: false, reward: 100, desc: '全球最大工程机械企业，重工业的智能化转型' },
        { id: 'e9', num: 9, title: '迈瑞医疗：生命守护者', duration: '48分钟', watched: false, reward: 100, desc: '中国医疗设备龙头，AI如何帮助医生救死扶伤' },
        { id: 'e10', num: 10, title: '隆基绿能：光伏新纪元', duration: '50分钟', watched: false, reward: 100, desc: '全球最大光伏企业，新能源如何重塑能源格局' },
        { id: 'e11', num: 11, title: '中国移动：5G覆盖', duration: '44分钟', watched: false, reward: 100, desc: '5G网络背后的建设者，数字中国的通信基础' },
        { id: 'e12', num: 12, title: '综合：新质生产力的未来', duration: '60分钟', watched: false, reward: 200, desc: '年度总结特辑，12家企业的智造故事与未来展望' }
      ],
      quizzes: [
        { id: 'q1', epId: 'e1', question: '比亚迪仰望U8采用了哪项核心技术实现原地转向？', options: ['四轮独立电驱', '液压转向系统', '传统转向助力', '线控转向'], answer: 0, points: 50 },
        { id: 'q2', epId: 'e2', question: '中芯国际目前最先进制程节点是？', options: ['28nm', '14nm', '7nm', '5nm'], answer: 2, points: 50 },
        { id: 'q3', epId: 'e3', question: '华为昇腾910B的算力相当于多少张NVIDIA A100？', options: ['1张', '0.5张', '1.5-2张', '3张'], answer: 2, points: 80 }
      ],
      comments: [
        { id: 'c1', user: '科技观察家', avatar: '🔬', text: '期待《智造者》开播！中国智造的故事值得被世界看见', time: '2026-05-20', likes: 234 },
        { id: 'c2', user: '先行者王总', avatar: '👨‍💼', text: '比亚迪那集最期待，超级工厂太震撼了', time: '2026-05-21', likes: 187 },
        { id: 'c3', user: 'AI投资人', avatar: '💼', text: '这个节目模式很创新，把上市公司和综艺结合，品牌曝光效果一定爆炸', time: '2026-05-22', likes: 156 }
      ]
    },
    {
      id: 'suanlijijilu',
      type: 'doc',
      title: '算力纪录片《先行者》',
      subtitle: 'Q2先行转化，铺垫热度',
      emoji: '⚡',
      status: 'airing',
      badge: '热播中',
      episodes: 4,
      watchedEps: 2,
      sponsor: '华为、商汤科技',
      desc: 'Q2推出的算力主题纪录片，每集约15分钟，讲述AI算力产业的先行者故事。完播奖励50 CP积分，引导用户进入完整的积分经济体系。',
      tags: ['算力', '纪录片', 'AI产业', '先行转化'],
      reward_per_ep: 50,
      total_reward: 200,
      episodes_data: [
        { id: 'ed1', num: 1, title: '算力时代序章', duration: '15分钟', watched: true, reward: 50, desc: '从CPU到GPU，从云计算到AI算力，一场静悄悄的算力革命' },
        { id: 'ed2', num: 2, title: '大模型背后的算力战争', duration: '16分钟', watched: true, reward: 50, desc: '训练一个GPT-4级模型需要多少算力？背后的商业与政治博弈' },
        { id: 'ed3', num: 3, title: '中国算力的突围', duration: '15分钟', watched: false, reward: 50, desc: '在算力卡脖子的压力下，中国如何构建自主算力体系' },
        { id: 'ed4', num: 4, title: '算力普惠的未来', duration: '18分钟', watched: false, reward: 50, desc: '当算力像水电一样普及，每个人都能拥有AI超能力' }
      ],
      quizzes: [],
      comments: [
        { id: 'cc1', user: '算力爱好者', avatar: '⚡', text: '前两集看完了，制作很扎实，数据翔实', time: '2026-05-10', likes: 89 }
      ]
    }
  ],

  companies: [
    { id: 'byd', name: '比亚迪', code: '002594.SZ', sector: '新能源汽车', index: 92.4, change: +3.2, attention: 95, heat: 89, mp: 78, desc: '全球新能源汽车龙头，智能座舱+电动化双驱动', stories: ['智能座舱革命', '刀片电池技术突破', '全球工厂扩张'], rank: 1, dims: { innovate: 94, govern: 88, product: 96, brand: 95, industry: 89 } },
    { id: 'smic', name: '中芯国际', code: '688981.SH', sector: '半导体', index: 88.7, change: +1.8, attention: 91, heat: 85, mp: 82, desc: '中国最先进的集成电路晶圆代工企业', stories: ['7nm工艺突破', '国产替代加速', '扩产计划公告'], rank: 2, dims: { innovate: 92, govern: 85, product: 86, brand: 89, industry: 91 } },
    { id: 'catl', name: '宁德时代', code: '300750.SZ', sector: '储能', index: 86.3, change: -0.5, attention: 88, heat: 82, mp: 75, desc: '全球最大动力电池及储能电池生产商', stories: ['麒麟电池发布', '储能出海战略', '固态电池研发'], rank: 3, dims: { innovate: 91, govern: 84, product: 88, brand: 86, industry: 83 } },
    { id: 'hikvision', name: '海康威视', code: '002415.SZ', sector: 'AI视觉', index: 84.1, change: +2.1, attention: 85, heat: 79, mp: 73, desc: '全球视频监控龙头，AIoT智能物联网布局', stories: ['萤石云上市', 'AIoT新业务', '海外市场开拓'], rank: 4, dims: { innovate: 86, govern: 82, product: 84, brand: 83, industry: 81 } },
    { id: 'sensetime', name: '商汤科技', code: '0020.HK', sector: 'AI', index: 82.8, change: +4.7, attention: 87, heat: 83, mp: 88, desc: '亚洲最大AI软件公司，日日新大模型领跑', stories: ['日日新3.5发布', 'AI眼镜战略', '算力中心扩建'], rank: 5, dims: { innovate: 95, govern: 78, product: 80, brand: 82, industry: 79 } },
    { id: 'iflytek', name: '科大讯飞', code: '002230.SZ', sector: 'AI', index: 80.5, change: +1.2, attention: 82, heat: 77, mp: 71, desc: '中文语音AI技术引领者，教育+医疗双赛道', stories: ['讯飞星火4.0', '讯飞医疗AI', '教育大模型'], rank: 6, dims: { innovate: 88, govern: 80, product: 82, brand: 78, industry: 75 } },
    { id: 'longi', name: '隆基绿能', code: '601012.SH', sector: '新能源', index: 78.9, change: -1.3, attention: 78, heat: 71, mp: 69, desc: '全球最大太阳能电池制造商，BC技术领先', stories: ['HPBC电池效率', 'BC组件全球发货', '氢能战略'], rank: 7, dims: { innovate: 83, govern: 76, product: 80, brand: 74, industry: 72 } },
    { id: 'sanyi', name: '三一重工', code: '600031.SH', sector: '工程机械', index: 77.2, change: +0.8, attention: 76, heat: 70, mp: 66, desc: '全球工程机械Top3，电动化智能化转型', stories: ['灯塔工厂认证', '电动挖掘机', '出海东南亚'], rank: 8, dims: { innovate: 79, govern: 78, product: 76, brand: 72, industry: 70 } },
    { id: 'huawei', name: '华为', code: '未上市', sector: '通信/AI', index: 96.1, change: +5.2, attention: 98, heat: 95, mp: 92, desc: '全球ICT基础设施与智能终端领导者', stories: ['昇腾算力突破', '鸿蒙原生生态', '智能汽车合作'], rank: 0, dims: { innovate: 98, govern: 90, product: 95, brand: 97, industry: 94 } },
    { id: 'mindray', name: '迈瑞医疗', code: '300760.SZ', sector: '医疗器械', index: 76.8, change: +1.5, attention: 80, heat: 74, mp: 70, desc: '中国医疗器械龙头，AI辅助诊断领先', stories: ['海外并购', 'AI超声', '生命信息监护'], rank: 9, dims: { innovate: 84, govern: 79, product: 82, brand: 76, industry: 71 } },
    { id: 'camc', name: '中国移动', code: '600941.SH', sector: '通信', index: 75.3, change: +0.3, attention: 74, heat: 68, mp: 62, desc: '全球最大电信运营商，5G+算力网络', stories: ['5G-A商用', '算力网络', 'AI+通信'], rank: 10, dims: { innovate: 72, govern: 82, product: 74, brand: 76, industry: 69 } },
    { id: 'midea', name: '美的集团', code: '000333.SZ', sector: '家电/机器人', index: 74.6, change: +0.6, attention: 72, heat: 66, mp: 64, desc: '全球家电龙头，库卡机器人智能制造', stories: ['库卡整合', '智能家居生态', '海外产能扩张'], rank: 11, dims: { innovate: 78, govern: 77, product: 80, brand: 73, industry: 65 } }
  ],

  // 产业热度指数维度定义
  indexDimensions: [
    { key: 'all', name: '总热度榜', icon: '🔥', desc: '综合五维度加权排名' },
    { key: 'innovate', name: '创新热度', icon: '💡', desc: '公众对公司技术创新、产品研发的关注度' },
    { key: 'govern', name: '治理热度', icon: '🏛', desc: '公众对公司治理、社会责任、信息透明度的关注度' },
    { key: 'product', name: '产品热度', icon: '📦', desc: '公众对公司产品服务、用户体验的关注度' },
    { key: 'brand', name: '品牌热度', icon: '🏷', desc: '公众对公司品牌形象、市场口碑的关注度' },
    { key: 'industry', name: '产业热度', icon: '🏭', desc: '公司所在行业的整体公众关注度' }
  ],

  // 行业分类
  sectors: [
    { key: 'all', name: '全市场', icon: '🌐' },
    { key: 'ai', name: '人工智能', icon: '🤖' },
    { key: 'new', name: '新质生产力', icon: '⚡' },
    { key: 'energy', name: '新能源', icon: '🔋' },
    { key: 'semi', name: '半导体', icon: '🔬' },
    { key: 'medical', name: '医疗器械', icon: '🏥' },
    { key: 'mfg', name: '智能制造', icon: '🏭' },
    { key: 'consume', name: '消费', icon: '🛒' }
  ],

  // 产业社区内容
  community: {
    topics: [
      { id: 't1', title: '比亚迪第五代DM技术发布，能颠覆混动格局吗？', category: '产业观察', author: '新能源研究社', avatar: '🔬', likes: 1247, comments: 386, views: 28500, time: '2小时前', tags: ['新能源汽车', '技术创新'], hot: true },
      { id: 't2', title: '从财报看中芯国际：国产替代的进度到底如何？', category: '公司研究', author: '芯片观察家', avatar: '💻', likes: 892, comments: 234, views: 19200, time: '5小时前', tags: ['半导体', '财报分析'], hot: true },
      { id: 't3', title: '我在宁德时代工厂体验了储能系统', category: '产品体验', author: '产业探访者', avatar: '👤', likes: 634, comments: 178, views: 15800, time: '1天前', tags: ['储能', '用户体验'], hot: false },
      { id: 't4', title: '华为昇腾生态现状分析：开发者怎么说？', category: '行业动态', author: 'AI产业联盟', avatar: '🤖', likes: 1563, comments: 445, views: 34600, time: '3小时前', tags: ['AI', '算力', '华为'], hot: true },
      { id: 't5', title: '商汤科技日日新大模型：实测报告与产业应用', category: '公司研究', author: 'AI评测室', avatar: '📊', likes: 1024, comments: 312, views: 24100, time: '8小时前', tags: ['AI大模型', '商汤'], hot: false },
      { id: 't6', title: '上市公司ESG评级上升，能否带动治理热度？', category: '治理讨论', author: 'ESG研究员', avatar: '🌍', likes: 456, comments: 123, views: 9800, time: '1天前', tags: ['ESG', '公司治理'], hot: false },
      { id: 't7', title: '《智造者》预热的背后：综艺如何赋能产业叙事？', category: '行业动态', author: '传媒观察', avatar: '🎬', likes: 789, comments: 267, views: 18700, time: '6小时前', tags: ['综艺', '产业叙事'], hot: true },
      { id: 't8', title: '隆基绿能BC电池转换效率新纪录意味着什么？', category: '产业观察', author: '光伏研究院', avatar: '☀', likes: 567, comments: 189, views: 12300, time: '12小时前', tags: ['光伏', '新能源'], hot: false }
    ],
    categories: ['全部', '产业观察', '公司研究', '产品体验', '治理讨论', '行业动态'],
    scholars: [
      { id: 's1', name: '李教授', title: '清华大学经管学院', avatar: '👨‍🏫', articles: 48, followers: 12500, verified: true, field: '产业经济' },
      { id: 's2', name: '王博士', title: '中金公司首席分析师', avatar: '👨‍💼', articles: 126, followers: 34800, verified: true, field: '半导体' },
      { id: 's3', name: '张研究员', title: '中科院AI研究所', avatar: '👩‍🔬', articles: 67, followers: 18900, verified: true, field: '人工智能' },
      { id: 's4', name: '陈院长', title: '国家制造强国战略咨询委', avatar: '👨‍⚖', articles: 35, followers: 8900, verified: true, field: '智能制造' }
    ]
  },

  // 法务合规文档
  compliance: {
    userAgreement: {
      title: '用户服务协议',
      version: 'v2.1',
      effectiveDate: '2026-05-25',
      sections: [
        { title: '第一条 总则', content: '欢迎使用合力生态平台（以下简称"本平台"）。本协议是您（以下简称"用户"）与合力生态平台运营方之间关于使用本平台服务的法律协议。您在使用本平台服务前，应当认真阅读本协议。一旦您以任何方式使用本平台服务，即表示您已充分阅读、理解并同意接受本协议的全部内容。\n\n本平台定位为AI时代上市公司产业叙事与公众注意力价值平台，通过UGC产业评价、AI辅助叙事、积分权益体系，连接产学研学者、普通公众与上市公司。' },
        { title: '第二条 合规声明', content: '2.1 本平台所有内容与指数仅反映公众对上市公司的产业关注度与叙事热度，不构成任何投资建议。\n\n2.2 本平台不提供证券投资咨询服务，所有用户发布的内容仅代表用户个人观点，不代表平台立场。\n\n2.3 本平台严禁用户发布任何形式的投资建议，包括但不限于：\n（一）买入、持有或卖出特定证券的建议\n（二）目标价预测或价格走势判断\n（三）选股推荐或投资组合建议\n（四）引导他人进行证券交易的内容\n\n2.4 用户应充分理解：股市有风险，投资需谨慎。请勿根据本平台任何内容做出交易决策。' },
        { title: '第三条 积分规则', content: '3.1 本平台积分（WATCH/EXP/GOV/DATA/MP）为纯消费型积分，不具备任何金融属性。\n\n3.2 积分仅可通过免费行为获取，禁止任何付费购买渠道。\n\n3.3 积分不可提现、不可交易、不可转让、不可继承。\n\n3.4 积分有效期为1年，到期自动清零，不可延期。\n\n3.5 积分商城所有商品均由上市公司或第三方商家提供，平台仅提供兑换渠道。\n\n3.6 平台有权对异常积分获取行为进行清零处理，包括但不限于机器刷分、虚假体验等。' },
        { title: '第四条 用户行为规范', content: '4.1 用户不得发布任何投资建议内容。\n\n4.2 用户不得利用本平台进行操纵市场、内幕交易等违法活动。\n\n4.3 用户不得发布虚假信息、恶意诽谤上市公司或他人。\n\n4.4 用户须为实名认证用户，一人一号，禁止多账号操作。\n\n4.5 违规用户将面临警告、禁言、封号等处罚，情节严重者将移交司法机关。' },
        { title: '第五条 知识产权', content: '5.1 用户在本平台发布的原创内容，知识产权归用户所有。\n\n5.2 用户授予平台非独占的、免费的、全球范围内的使用许可。\n\n5.3 平台AI辅助生成的内容，用户享有使用权，但不得用于商业用途。' },
        { title: '第六条 免责声明', content: '6.1 本平台对用户发布的内容不承担任何法律责任。\n\n6.2 本平台指数仅反映公众关注度，不构成任何投资评级或建议。\n\n6.3 用户因参考本平台内容进行投资决策所造成的损失，本平台不承担任何责任。\n\n6.4 因不可抗力（包括但不限于政策变化、监管要求）导致的服务中断，本平台不承担责任。' }
      ]
    },
    privacyPolicy: {
      title: '隐私保护政策',
      version: 'v2.1',
      effectiveDate: '2026-05-25',
      sections: [
        { title: '第一条 信息收集', content: '1.1 我们收集的信息包括：\n（一）注册信息：手机号、昵称、头像\n（二）身份信息：实名认证时提供的身份证信息\n（三）行为数据：浏览记录、互动记录、积分记录\n（四）设备信息：设备型号、操作系统、IP地址\n\n1.2 我们不会收集用户的金融账户信息、交易记录等敏感数据。' },
        { title: '第二条 信息使用', content: '2.1 我们使用收集的信息用于：\n（一）提供和改善平台服务\n（二）计算产业热度指数（仅使用脱敏聚合数据）\n（三）防范作弊和违规行为\n（四）遵守法律法规要求\n\n2.2 我们不会将用户个人信息出售给任何第三方。' },
        { title: '第三条 信息保护', content: '3.1 我们采用行业标准的加密技术保护用户数据。\n\n3.2 用户行为数据在用于指数计算前，会进行严格的脱敏和聚合处理。\n\n3.3 我们不会将可识别个人身份的数据提供给上市公司或第三方机构。\n\n3.4 用户有权随时查看、修改、删除个人信息。' }
      ]
    },
    indexMethodology: {
      title: '合力产业热度指数编制方法',
      version: 'v2.1',
      effectiveDate: '2026-05-25',
      description: '合力产业热度指数是合力生态平台核心的数据产品，旨在通过量化公众对上市公司的关注度，为产业研究、品牌传播提供客观数据参考。本指数不构成任何投资建议。',
      indicators: [
        { name: '独立用户参与数', weight: 35, desc: '对该公司进行过打分、评论、发文的唯一实名认证用户数' },
        { name: '原创内容产出量', weight: 25, desc: '用户发布的产业分析、产品体验、治理观察类原创文章数' },
        { name: '内容互动总量', weight: 20, desc: '文章阅读量、点赞量、评论量、分享量总和' },
        { name: '官方账号活跃度', weight: 10, desc: '上市公司官方账号发布内容的频率与互动量' },
        { name: '综艺曝光度', weight: 10, desc: '公司在《智造者》等平台综艺中的曝光时长与互动量' }
      ],
      principles: [
        '所有计算逻辑完全公开透明，定期发布指数编制白皮书',
        '所有数据均来自用户客观行为，无任何人工干预或主观评分',
        '指数数据仅用于产业研究与品牌传播',
        '禁止任何媒体/机构将本平台指数解读为"投资评级"或"股价预测"',
        '定期接受第三方审计，接受监管部门监督检查'
      ],
      updateFrequency: '每日更新，保留历史数据曲线',
      coverage: '覆盖A股全部上市公司 + 重点H股上市公司'
    },

    // 用户手册
    userManual: {
      title: '用户手册',
      version: 'v3.0',
      sections: [
        { title: '第一章 平台概述', content: '合力生态（HarmonyLink）是AI时代上市公司产业叙事与公众注意力价值平台。平台通过UGC产业评价、AI辅助叙事、积分权益体系，连接产学研学者、普通公众与上市公司，打造"产业认知-注意力-品牌价值"的正向循环。\n\n核心功能：\n• 《智造者》综艺 — 聚焦新质生产力的S级综艺节目\n• 产业热度指数 — 量化公众对上市公司的产业关注度\n• 产业社区 — 用户共创的产业讨论空间\n• 积分商城 — 用行为积分兑换企业权益\n• 龙虾Agent — AI辅助产业内容创作' },
        { title: '第二章 积分体系', content: '平台设有6类积分：\n\nWATCH（观看积分）：通过观看综艺/纪录片获取\nEXP（经验积分）：通过发表产业评论获取\nGOV（治理积分）：通过参与社区治理获取\nDATA（数据积分）：通过贡献行为数据获取\nMP（意义积分）：通过贡献"人性温度"叙事获取\nHP（合力积分）：通用兑换积分，通过上述积分按比例兑换获得\n\n积分核心规则：\n• 所有积分仅可通过免费行为获取\n• 积分为纯消费型权益，不具备金融属性\n• 积分不可提现、不可交易、不可转让、不可继承\n• 积分有效期为12个月，到期自动清零\n• 积分可在积分商城兑换商品和服务' },
        { title: '第三章 社区共建模型', content: '合力生态采用"社区共建委员会"治理模型，由平台运营方、认证学者、活跃用户代表三方组成。\n\n共建层级：\nLv.1 觉醒者 — 基础参与：浏览、评论、点赞\nLv.2 探索者 — 深度参与：发表原创分析、参与话题讨论\nLv.3 先行者 — 社区治理：参与规则投票、内容审核\nLv.4 建设者 — 生态贡献：数据贡献、平台优化建议\nLv.5 先锋使者 — 核心共建：龙虾Agent运营、内容共创\nLv.6 意义创造者 — 战略共建：社区共建委员会成员\n\n共建机制说明：\n• 共建权益基于社区贡献排名，不可购买或转让\n• 社区共建委员会每月召开线上会议，审议平台规则\n• 所有规则变更需公示7天并经半数以上委员同意' },
        { title: '第四章 内容规范', content: '发布内容须知：\n• 内容须围绕上市公司产业叙事、技术发展、产品体验等主题\n• 禁止发布任何形式的投资建议（买入/卖出/持有推荐）\n• 禁止发布虚假信息、恶意诽谤、侵权内容\n• 内容经AI初审+人工复核后发布\n• 违规内容将被删除，多次违规将封禁账号\n\n推荐内容方向：\n• 上市公司技术突破与产品体验\n• 行业趋势分析与产业观察\n• 企业ESG实践与公司治理\n• 综艺观感与产业叙事讨论' },
        { title: '第五章 争议处理', content: '如对以下事项有异议，可通过合规中心提交申诉：\n\n1. 积分争议：积分计算错误、兑换失败等\n   处理时效：3个工作日内回复\n\n2. 内容争议：内容被误删、账号被误封等\n   处理时效：1个工作日内初审，5个工作日内终审\n\n3. 商品争议：兑换商品质量问题、发货延迟等\n   处理时效：由商品提供方在7个工作日内处理\n\n4. 隐私争议：个人信息泄露、数据使用异议等\n   处理时效：24小时内初步响应\n\n申诉渠道：合规中心 → 争议申诉 → 填写表单\n\n最终解释权归合力生态平台运营方所有。' }
      ]
    },

    // 积分规则
    pointsRules: {
      title: '积分规则详细说明',
      version: 'v3.0',
      sections: [
        { title: '积分获取规则', content: 'WATCH积分：\n• 观看《智造者》单集：+100 WATCH\n• 观看算力纪录片单集：+50 WATCH\n• 每日签到：+20 HP（折算）\n\nEXP积分：\n• 发表产业评论：+30 EXP\n• 发表深度分析文章：+100~200 EXP\n• 参与竞猜答题：+50~80 EXP\n\nGOV积分：\n• 参与社区投票：+80 GOV/次\n• 提交规则建议被采纳：+200 GOV\n\nDATA积分：\n• 授权行为数据：+60 DATA/天\n• 参与数据确权：+100 DATA\n\nMP积分：\n• 撰写产业叙事文章：+150 MP/篇\n• 贡献品牌故事章节：+200 MP/章' },
        { title: '积分兑换规则', content: '兑换比例（→ HP通用积分）：\n• 100 WATCH → 20 HP\n• 100 EXP → 50 HP\n• 100 GOV → 120 HP\n• 100 DATA → 80 HP\n• 100 MP → 150 HP\n\nHP积分用途：\n• 在积分商城兑换企业商品和服务\n• HP为最终兑换媒介，不可反向兑换\n\n积分有效期：所有积分自获取日起12个月有效，到期自动清零。' },
        { title: '积分限制与合规', content: '积分红线（严格执行）：\n• 严禁积分提现，平台不提供任何提现渠道\n• 严禁积分交易或转让，任何私下交易均无效\n• 严禁付费购买积分，所有积分须通过平台行为获取\n• 严禁使用机器刷分、虚假体验等手段获取积分\n• 违规积分将被清零，严重者封禁账号\n\n积分上限：单用户单日获取上限为各类型500积分。' }
      ]
    }
  },

  // 社区共建模型（DAO合规化）
  communityGovernance: {
    name: '社区共建委员会',
    subtitle: 'Community Co-governance Council',
    desc: '合力生态采用去中心化社区共建模型，由平台运营方、认证学者、活跃用户代表三方组成治理体系。共建权益基于社区贡献排名获取，不可购买或转让。',
    structure: [
      { level: 1, title: '社区共建委员会', icon: '🏛', desc: '最高治理机构，由Lv.6意义创造者组成，每月审议平台重大规则', members: 12 },
      { level: 2, title: '内容审核组', icon: '✅', desc: '负责AI初审复核、内容质量把控、违规处理申诉', members: 30 },
      { level: 3, title: '积分规则组', icon: '⚖', desc: '负责积分获取/兑换规则优化、反作弊机制设计', members: 20 },
      { level: 4, title: '产业研究组', icon: '🔬', desc: '负责热度指数方法论更新、行业分类维护、数据质量', members: 25 },
      { level: 5, title: '社区运营组', icon: '💬', desc: '负责话题运营、活动策划、新用户引导', members: 15 }
    ],
    milestones: [
      { phase: '启动期 2026', items: ['核心用户邀请制', '基础治理框架搭建', '首批共建委员任命', '社区公约发布'] },
      { phase: '成长期 2027', items: ['共建委员会选举制度上线', '内容审核组扩大', '积分规则组独立运作', '产业研究组学术合作'] },
      { phase: '成熟期 2028', items: ['全面民主选举', '跨平台治理经验输出', '产业影响力报告发布', '国际合作网络建立'] }
    ],
    governanceRules: [
      '所有规则变更需公示7天并经半数以上委员同意',
      '委员任期6个月，可连任一届',
      '重大事项（积分规则变更、合作方引入）需三分之二以上委员同意',
      '委员退出需提前30天书面通知',
      '每月第一个周一召开线上治理会议'
    ]
  },

  // 合作邀约数据
  collaboration: {
    govDoc: {
      title: '算力纪录片《先行者》政企合作邀约',
      subtitle: '联合制作 · 共同呈现中国算力产业崛起之路',
      hero: '⚡',
      desc: '《先行者》是合力生态出品的算力主题纪录片，讲述AI算力产业先行者的故事。现邀约各级政府机关、AI/新质生产力相关产业园区联合制作，共同打造具有行业影响力的纪实IP。',
      targets: [
        { type: '政府机关', icon: '🏛', items: ['各级发改委（数字经济/新质生产力方向）', '各级工信厅/局（AI/半导体/新能源产业）', '各级科技厅/局（AI算力/大模型方向）', '国家级/省级高新区管委会'] },
        { type: '产业园区', icon: '🏢', items: ['AI算力产业园区', '半导体/集成电路产业园', '新能源/储能产业园', '智能制造/灯塔工厂产业园', '数字经济示范区'] }
      ],
      cooperationForms: [
        { title: '联合出品', desc: '共同策划纪录片选题，共享版权，联合宣发', benefit: '提升区域产业知名度，吸引优质企业入驻' },
        { title: '拍摄支持', desc: '提供园区/企业拍摄场景和采访协调', benefit: '展示园区企业实力，打造产业名片' },
        { title: '政策支持', desc: '纳入地方新质生产力宣传计划，提供政策补贴', benefit: '获得主流媒体曝光，提升政策影响力' },
        { title: '产业对接', desc: '通过纪录片连接园区企业与综艺/商城生态', benefit: '拓展企业合作渠道，促进招商引资' }
      ],
      contact: '商务合作请通过合力生态官方邮箱联系：business@heli-ai.com'
    },
    showCoop: {
      title: '《智造者》企业合作邀约',
      subtitle: 'S级综艺 · 新质生产力上市公司探秘之旅',
      hero: '🎬',
      desc: '《智造者》是首个聚焦新质生产力的S级综艺节目，流量艺人深入灯塔工厂，探索中国制造的智慧升级。现邀约新质生产力领域上市公司参与节目录制及IP深度合作。',
      targets: [
        { type: '录制参与', icon: '🎥', items: ['新质生产力领域A股/H股上市公司', '拥有灯塔工厂/智能制造标杆产线的企业', '在AI、新能源、半导体、高端装备等领域有突出成果的企业', '企业高管愿意出镜分享的品牌'] },
        { type: 'IP合作', icon: '🤝', items: ['综艺冠名/赞助合作', '企业联名徽章/数字藏品', '产业沙龙/研学营联合举办', '平台商城入驻提供商品/服务'] }
      ],
      benefits: [
        { title: '品牌曝光', desc: 'S级综艺制作，覆盖数百万产业关注者', detail: '单集预计观看量50万+，平台全链路曝光' },
        { title: '产业叙事', desc: '将品牌故事转化为可量化的产业温度', detail: '通过Pioneer OS叙事引擎，打造深度品牌内容' },
        { title: '用户连接', desc: '直接触达高价值产业用户群体', detail: '综艺观众→平台用户→积分商城→品牌服务闭环' },
        { title: '热度提升', desc: '合力产业热度指数多维度提升', detail: '综艺曝光度占比10%，有效提升品牌关注度' }
      ],
      contact: '节目合作请通过合力生态官方邮箱联系：show@heli-ai.com'
    }
  },

  // 开放加入机会
  joinOpportunity: [
    {
      id: 'shareholder',
      title: '成为股东',
      icon: '📈',
      subtitle: '与合力生态共同成长',
      desc: '合力生态正处于验证期向成长期过渡的关键阶段，欢迎认可"产业叙事+公众注意力"长期价值的机构投资者成为平台股东，共享新质生产力赛道的成长红利。',
      requirements: ['认同合力生态平台定位与合规理念', '具备产业投资经验或上市公司资源', '能提供战略资源支持（产业/媒体/政策等）'],
      form: '请通过官方邮箱 investor@heli-ai.com 提交机构简介与合作意向'
    },
    {
      id: 'co-builder',
      title: '平台共建者',
      icon: '🏗',
      subtitle: 'B端企业深度合作',
      desc: '欢迎上市公司、行业龙头企业成为合力生态共建伙伴，通过入驻平台商城、参与综艺录制、开放产业研学等多种形式，共建产业叙事生态。',
      requirements: ['A股/H股上市公司或行业龙头企业', '在新质生产力领域有突出成果', '愿意开放产线/工厂用于综艺拍摄或研学', '提供商城商品/服务供用户积分兑换'],
      form: '请通过官方邮箱 business@heli-ai.com 提交企业简介与合作意向'
    },
    {
      id: 'participant',
      title: '赛道参与者',
      icon: '🏃',
      subtitle: 'C端用户/创作者',
      desc: '每一位关注产业发展、愿意分享产业洞察的人，都是合力生态的赛道参与者。通过观看综艺、发表评论、参与社区共建，用你的注意力为产业叙事贡献力量。',
      requirements: ['对产业发展有真实兴趣和见解', '愿意实名认证参与平台活动', '遵守平台内容规范，不发布投资建议', '积极参与社区讨论和治理投票'],
      form: '立即注册成为合力生态用户，开启你的产业叙事之旅 →'
    },
    {
      id: 'partner',
      title: '第三方合作',
      icon: '🌐',
      subtitle: '产业园/政府/媒体/学术机构',
      desc: '合力生态致力于构建开放合作的产业叙事网络，欢迎各级政府机关、产业园区、主流媒体、高等院校及研究机构等多方力量共同参与。',
      requirements: ['政府机关：数字经济/新质生产力政策相关部门', '产业园区：AI/半导体/新能源/智能制造等方向', '媒体机构：财经/产业/科技类主流媒体', '学术机构：经管/产业经济/AI等相关领域'],
      form: '请通过官方邮箱 partner@heli-ai.com 提交合作方案与资源介绍'
    }
  ],

  products: [
    { id: 'byd-service', name: '比亚迪汽车服务券', company: '比亚迪', emoji: '🚗', category: 'service', price: 800, originalPrice: 1500, stock: 50, desc: '比亚迪任意车型保养服务券一次，含机油更换及全车检查', tags: ['热门', '限量'] },
    { id: 'huawei-trade', name: '华为手机以旧换新券', company: '华为', emoji: '📱', category: 'service', price: 1200, originalPrice: 2000, stock: 30, desc: '华为任意手机以旧换新，额外补贴500元', tags: ['爆款'] },
    { id: 'smic-salon', name: '中芯国际产业沙龙票', company: '中芯国际', emoji: '🎫', category: 'show', price: 300, originalPrice: 500, stock: 100, desc: '月度产业洞察沙龙，限量参会票，与芯片大佬面对面', tags: ['知识', '稀缺'] },
    { id: 'zhizaozhe-ticket', name: '《智造者》首映票', company: '合力生态', emoji: '🎬', category: 'show', price: 200, originalPrice: 500, stock: 200, desc: '《智造者》第一集北京首映式，含礼品袋和明星见面机会', tags: ['首映', '独家'] },
    { id: 'catl-camp', name: '宁德时代研学营名额', company: '宁德时代', emoji: '🔋', category: 'service', price: 2000, originalPrice: 4000, stock: 20, desc: '参观宁德时代工厂，学习电池技术，获颁研学证书', tags: ['高端', '教育'] },
    { id: 'ai-credit', name: '算力使用券100元', company: '合力生态', emoji: '⚡', category: 'digital', price: 500, originalPrice: 800, stock: 500, desc: '平台算力资源使用券，可用于龙虾Agent训练和API调用', tags: ['数字权益'] },
    { id: 'pioneer-nft', name: 'Pioneer OS先行者NFT', company: 'Pioneer OS', emoji: '🚀', category: 'digital', price: 3000, originalPrice: 5000, stock: 100, desc: '限量版Pioneer OS先行者数字藏品，持有者享受平台永久VIP权益', tags: ['NFT', '限量', '珍藏'] },
    { id: 'sensetime-api', name: '商汤AI API体验包', company: '商汤科技', emoji: '🤖', category: 'digital', price: 800, originalPrice: 1200, stock: 300, desc: '商汤科技API接口30天体验包，含图像识别、人脸分析等接口', tags: ['API', '开发者'] }
  ],

  honors: [
    { id: 'h1', title: '《智造者》早鸟观众', icon: '🎬', desc: '完整观看《智造者》第一季所有剧集', req: '观看12集并全部完成', cost: 5000, costType: 'willpower', claimed: false, rare: 'legendary' },
    { id: 'h2', title: 'Pioneer先行者', icon: '🚀', desc: '访问Pioneer OS并完成首次叙事互动', req: '访问Pioneer OS子站', cost: 1000, costType: 'mp', claimed: false, rare: 'epic' },
    { id: 'h3', title: '合力指数分析师', icon: '📊', desc: '对5家企业发表深度分析评论', req: '发表5篇分析', cost: 2000, costType: 'exp', claimed: false, rare: 'rare' },
    { id: 'h4', title: '龙虾Agent创建者', icon: '🦞', desc: '成功创建并激活个人龙虾Agent', req: '创建Agent', cost: 3000, costType: 'willpower', claimed: false, rare: 'epic' },
    { id: 'h5', title: '积分大师', icon: '💎', desc: '五种积分类型各达到1000以上', req: '全积分类型达标', cost: 5000, costType: 'willpower', claimed: false, rare: 'legendary' },
    { id: 'h6', title: '飞轮贡献者', icon: '🔄', desc: '参与平台生态建设，完成飞轮各节点贡献', req: '完成5个飞轮节点任务', cost: 2500, costType: 'gov', claimed: false, rare: 'rare' }
  ],

  wpRecords: [
    { id: 'w1', action: '观看《先行者》第2集', amount: 80, time: '2026-05-22 21:30', type: 'watch' },
    { id: 'w2', action: '发表指数分析：比亚迪', amount: 200, time: '2026-05-22 15:00', type: 'exp' },
    { id: 'w3', action: '社区投票：积分规则升级', amount: 150, time: '2026-05-21 18:00', type: 'gov' },
    { id: 'w4', action: '数据贡献：上传行为数据', amount: 100, time: '2026-05-21 10:00', type: 'data' },
    { id: 'w5', action: '意义贡献：MP积分达标', amount: 300, time: '2026-05-20 16:00', type: 'mp' },
    { id: 'w6', action: '每日签到奖励', amount: 50, time: '2026-05-20 09:00', type: 'checkin' }
  ],

  pointsRecords: [
    { id: 'p1', action: '观看《先行者》奖励', amount: +50, type: 'watch', cat: 'WATCH', time: '2026-05-22 21:30' },
    { id: 'p2', action: '发表深度评论', amount: +100, type: 'exp', cat: 'EXP', time: '2026-05-22 15:00' },
    { id: 'p3', action: '参与治理投票', amount: +80, type: 'gov', cat: 'GOV', time: '2026-05-21 18:00' },
    { id: 'p4', action: '数据贡献确权', amount: +60, type: 'data', cat: 'DATA', time: '2026-05-21 10:00' },
    { id: 'p5', action: 'WATCH→HP兑换', amount: -500, type: 'watch', cat: 'WATCH', time: '2026-05-20 14:00' },
    { id: 'p6', action: 'WATCH→HP兑换', amount: +100, type: 'hp', cat: 'HP', time: '2026-05-20 14:00' },
    { id: 'p7', action: '每日签到', amount: +20, type: 'hp', cat: 'HP', time: '2026-05-20 09:00' }
  ],

  merchant: {
    name: '比亚迪品牌营销部',
    email: 'byd@example.com',
    loggedIn: false,
    dashboard: {
      monthRevenue: 2840000,
      monthOrders: 1283,
      activeUsers: 8924,
      brandScore: 92.4,
      conversionRate: 3.8,
      attentionGrowth: 24.5
    }
  },

  pioneerMode: 'c',

  agentTemplates: [
    { id: 'content', name: '内容分析Agent', icon: '📝', desc: '自动分析行业研报、上市公司公告，生成深度评论获取EXP积分', reward: '+200 EXP/篇', available: true },
    { id: 'watch', name: '观看守护Agent', icon: '👁', desc: '自动提醒新剧集上线，智能追踪观看进度，最大化WATCH积分获取', reward: '+50 WATCH/集', available: true },
    { id: 'gov', name: '治理参与Agent', icon: '🗳', desc: '分析社区提案，根据你的偏好自动参与投票，获取GOV积分', reward: '+100 GOV/次', available: true },
    { id: 'data', name: '数据贡献Agent', icon: '📡', desc: '在保护隐私的前提下，将你的行为数据上链确权，获取DATA积分', reward: '+60 DATA/天', available: false }
  ],

  brainMessages: {
    c: [
      { role: 'assistant', text: '你好！我是合力智脑，你的专属积分管家 🤖\n\n我可以帮你：\n• 制定个性化积分增长计划\n• 分析你的积分健康度\n• 推荐适合你的内容和荣誉\n• 解答合力生态一切问题\n\n有什么我能帮到你的？', time: '09:35' }
    ],
    b: [
      { role: 'assistant', text: '您好！我是合力智脑商家版 🏪\n\n我可以为您：\n• 自动生成月度运营报告\n• 分析用户行为数据\n• 制定积分激励策略\n• 优化品牌曝光路径\n\n请问您今天有什么商业需求？', time: '09:35' }
    ]
  }
};

// ========== Store ==========
const Store = {
  _data: {},
  _listeners: [],

  init() {
    const saved = localStorage.getItem('hl_store_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this._data = { ...MOCK_DATA, ...parsed };
        // 深度合并user
        this._data.user = { ...MOCK_DATA.user, ...parsed.user };
      } catch(e) {
        this._data = { ...MOCK_DATA };
      }
    } else {
      this._data = { ...MOCK_DATA };
      // 深拷贝数组
      this._data.shows = JSON.parse(JSON.stringify(MOCK_DATA.shows));
      this._data.products = JSON.parse(JSON.stringify(MOCK_DATA.products));
      this._data.companies = JSON.parse(JSON.stringify(MOCK_DATA.companies));
      this._data.honors = JSON.parse(JSON.stringify(MOCK_DATA.honors));
      this._data.wpRecords = JSON.parse(JSON.stringify(MOCK_DATA.wpRecords));
      this._data.pointsRecords = JSON.parse(JSON.stringify(MOCK_DATA.pointsRecords));
      this._data.brainMessages = JSON.parse(JSON.stringify(MOCK_DATA.brainMessages));
    }
  },

  get(key) {
    return this._data[key];
  },

  set(key, val) {
    this._data[key] = val;
    this._save();
    this._notify();
  },

  update(key, fn) {
    this._data[key] = fn(this._data[key]);
    this._save();
    this._notify();
  },

  _save() {
    try {
      localStorage.setItem('hl_store_v2', JSON.stringify(this._data));
    } catch(e) {}
  },

  _notify() {
    this._listeners.forEach(fn => fn());
  },

  subscribe(fn) {
    this._listeners.push(fn);
  }
};

// ========== API ==========
const API = {
  async checkin() {
    await sleep(400);
    const user = Store.get('user');
    if (user.checkinToday) return { success: false, msg: '今日已签到' };
    const hpGain = 20 + Math.floor(Math.random() * 30);
    const wpGain = 50;
    Store.update('user', u => ({
      ...u,
      hp: u.hp + hpGain,
      willpower: u.willpower + wpGain,
      willpowerMonthly: u.willpowerMonthly + wpGain,
      checkinToday: true
    }));
    const records = Store.get('pointsRecords');
    records.unshift({ id: 'p_' + Date.now(), action: '每日签到', amount: +hpGain, type: 'hp', cat: 'HP', time: formatTime() });
    Store.set('pointsRecords', records);
    return { success: true, hp: hpGain, wp: wpGain, msg: `签到成功！+${hpGain} HP +${wpGain} 贡献值` };
  },

  async watchEpisode(showId, epId) {
    await sleep(600);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const ep = show.episodes_data.find(e => e.id === epId);
    if (!ep || ep.watched) return { success: false, msg: '已领取过奖励' };
    ep.watched = true;
    show.watchedEps = show.episodes_data.filter(e => e.watched).length;
    Store.set('shows', shows);
    Store.update('user', u => ({
      ...u,
      watch: u.watch + ep.reward,
      willpower: u.willpower + Math.floor(ep.reward * 0.8),
      willpowerMonthly: u.willpowerMonthly + Math.floor(ep.reward * 0.8)
    }));
    return { success: true, reward: ep.reward, msg: `观看完成！+${ep.reward} WATCH积分` };
  },

  async submitComment(showId, text) {
    await sleep(500);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const user = Store.get('user');
    show.comments.unshift({ id: 'c_' + Date.now(), user: user.nickname, avatar: user.avatar, text, time: formatDate(), likes: 0 });
    Store.set('shows', shows);
    Store.update('user', u => ({ ...u, exp: u.exp + 30, willpower: u.willpower + 50 }));
    return { success: true, msg: '+30 EXP积分' };
  },

  async submitQuiz(showId, quizId, optionIdx) {
    await sleep(600);
    const shows = Store.get('shows');
    const show = shows.find(s => s.id === showId);
    if (!show) return { success: false };
    const quiz = show.quizzes.find(q => q.id === quizId);
    if (!quiz) return { success: false };
    const correct = optionIdx === quiz.answer;
    if (correct) {
      Store.update('user', u => ({ ...u, exp: u.exp + quiz.points, willpower: u.willpower + 100 }));
    }
    return { success: true, correct, points: correct ? quiz.points : 0, correctOption: quiz.answer, msg: correct ? `答对了！+${quiz.points} EXP` : '答错了，继续加油！' };
  },

  async exchangePoints(fromType, fromAmount) {
    await sleep(500);
    const rates = { watch: 0.2, exp: 0.5, gov: 1.2, data: 0.8, mp: 1.5 };
    const rate = rates[fromType];
    if (!rate) return { success: false };
    const user = Store.get('user');
    if (user[fromType] < fromAmount) return { success: false, msg: '积分不足' };
    const hpGain = Math.floor(fromAmount * rate);
    Store.update('user', u => ({ ...u, [fromType]: u[fromType] - fromAmount, hp: u.hp + hpGain }));
    return { success: true, hp: hpGain, msg: `兑换成功！+${hpGain} HP` };
  },

  async createOrder(productId, qty) {
    await sleep(700);
    const products = Store.get('products');
    const product = products.find(p => p.id === productId);
    if (!product) return { success: false };
    const user = Store.get('user');
    const total = product.price * qty;
    if (user.hp < total) return { success: false, msg: 'HP积分不足' };
    Store.update('user', u => ({
      ...u,
      hp: u.hp - total,
      orders: [{ id: 'o_' + Date.now(), productId, productName: product.name, qty, total, status: '已下单', time: formatTime() }, ...u.orders]
    }));
    return { success: true, msg: `订单创建成功，消耗 ${total} HP` };
  },

  async claimHonor(honorId) {
    await sleep(600);
    const honors = Store.get('honors');
    const honor = honors.find(h => h.id === honorId);
    if (!honor || honor.claimed) return { success: false, msg: '荣誉已兑换' };
    const user = Store.get('user');
    const costKey = honor.costType === 'willpower' ? 'willpower' : honor.costType;
    if (user[costKey] < honor.cost) return { success: false, msg: `${honor.costType}不足` };
    honor.claimed = true;
    Store.set('honors', honors);
    Store.update('user', u => ({
      ...u,
      [costKey]: u[costKey] - honor.cost,
      honorsClaimed: [...u.honorsClaimed, honorId]
    }));
    return { success: true, msg: `🎖 获得「${honor.title}」` };
  },

  async merchantLogin(email, pwd) {
    await sleep(800);
    if (email === 'byd@example.com' && pwd === '123456') {
      Store.update('merchant', m => ({ ...m, loggedIn: true }));
      return { success: true };
    }
    return { success: false, msg: '邮箱或密码错误' };
  },

  async brainChat(mode, message) {
    await sleep(800 + Math.random() * 600);
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

    const msgs = Store.get('brainMessages');
    const modeKey = mode || 'c';
    const lower = message.toLowerCase();
    let reply = '';
    const respMap = responses[modeKey] || responses.c;

    for (const [key, val] of Object.entries(respMap)) {
      if (lower.includes(key)) { reply = val; break; }
    }

    if (!reply) {
      reply = modeKey === 'c'
        ? `关于「${message}」，我来帮你分析一下：\n\n在合力生态中，这个问题涉及多个维度。基于你目前 Lv.5 的等级和积分状况，建议你先了解相关的积分规则，通过观看内容和参与互动来累积更多价值。\n\n具体来说：WATCH积分通过观看综艺获取，EXP通过发表专业评论获取，MP积分是衡量你人性温度贡献的核心指标。\n\n有更具体的问题可以继续问我！`
        : `关于「${message}」的商业策略建议：\n\n结合合力生态的注意力经济模型，建议从三个维度切入：\n\n1. **内容曝光**：赞助相关综艺内容，获取精准用户注意力\n2. **积分激励**：设计合理的HP积分任务，提升用户活跃度\n3. **指数管理**：维护好品牌在合力指数中的各维度评分\n\n需要我生成具体的执行方案吗？`;
    }

    return { success: true, reply };
  }
};

// ========== 工具函数 ==========
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatTime() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatDate() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function pad(n) { return n < 10 ? '0' + n : n; }

function formatNumber(n) {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + '亿';
  if (n >= 10000) return (n / 10000).toFixed(1) + '万';
  if (n >= 1000) return n.toLocaleString();
  return n.toString();
}
