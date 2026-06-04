# Design System: HarmonyLink 合力生态 v3.0

## 1. Visual Theme & Atmosphere

合力生态是一个"AI时代上市公司产业叙事与公众注意力价值平台"——它站在金融科技、AI智能体和内容社区的交叉地带。视觉语言必须同时传达三个核心信号：**专业可信**（投资级精度）、**智能前沿**（AI原生体验）、**温暖人文**（产业叙事社区感）。

设计哲学是 **"Trusted Intelligence"（可信智能）**：在深海军蓝的信任底色上，琥珀橙的品牌之火与靛蓝紫的AI之光交相辉映。页面在浅色模式下呈现带微蓝底调的温暖白色（`#F8F9FC`），在深色模式下采用Linear式的亮度阶梯递进（`#0A1628` → `#0F1B2E` → `#162438`）。卡片和容器使用Vercel式的shadow-as-border技术结合Stripe的蓝色调多层阴影，创造既有金融级信任感又有科技级轻盈感的视觉层次。

排版体系遵循"压缩标题、舒展正文"原则：标题字重600-700配负字间距营造工程感，正文1.6行高提供杂志级阅读舒适度。5种积分色（观察/体验/治理/数据/市价）构成平台的视觉信息编码系统，每种色都有80%/15%/5%三级透明度变体用于背景/边框/点缀。

**Key Characteristics:**
- 深化海军蓝（`#0F2942`）为主色——比原#1E3A5F更深沉权威，金融级信任
- 琥珀橙（`#E8850C`）为品牌强调色——比原#F18F01更成熟精炼
- 靛蓝紫（`#6366F1`）为AI特征色——AI Agent/智能体功能的专属视觉标识
- 蓝色调多层阴影系统——借鉴Stripe的`rgba(15,41,66,0.x)`色调阴影
- Shadow-as-border技术——Vercel式`0px 0px 0px 1px`零偏移阴影替代传统边框
- 亮度阶梯深色模式——Linear式通过bg亮度递进而非阴影来表达层级
- 5色积分编码系统——观察蓝/体验紫/治理绿/数据青/市价金各有三级变体
- 压缩式标题排版——负字间距+600-700字重的工程感标题

## 2. Color Palette & Roles

### Primary Brand
- **Deep Navy** (`#0F2942`): 主品牌色，全局导航背景、标题色、主按钮背景。比原#1E3A5F更深沉，传达金融级权威感。
- **Amber Orange** (`#E8850C`): 品牌强调色，CTA按钮、品牌标识、热度指标、品牌徽章。比原#F18F01更精炼成熟。
- **Amber Light** (`#F5A623`): 橙色亮调变体，渐变终止色、悬停态、浅色模式强调。

### AI & Intelligence
- **Indigo AI** (`#6366F1`): AI Agent专属色——AI对话气泡、智能体标识、AI支付协议标识、Pioneer OS品牌色。
- **Indigo Light** (`#818CF8`): AI色亮调变体，悬停态、浅底色上的AI标识。
- **Indigo Dim** (`rgba(99,102,241,0.12)`): AI色背景色，AI功能区域卡片底色。

### Surface & Background
- **Canvas** (`#F8F9FC`): 主页面背景——带微蓝底调的温暖白色，不是纯白（#ffffff太刺眼）也不是原#F0F4F8（太灰）。
- **Ivory** (`#FFFFFF`): 卡片表面、浮层内容区、最大对比度元素。
- **Sand Warm** (`#F1F3F8`): 次级表面——分割区域背景、表头背景、轻微区分的容器。

### Dark Mode Surfaces
- **Abyss** (`#0A1628`): 最深层背景——启动屏、深色Hero区、暗黑模式页面底色。
- **Midnight** (`#0F1B2E`): 暗黑模式面板/侧边栏底色——亮度阶梯Level 1。
- **Elevated Dark** (`#162438`): 暗黑模式卡片/浮层底色——亮度阶梯Level 2。
- **Surface Dark** (`#1E3050`): 暗黑模式最高层级表面——亮度阶梯Level 3。

### Text Hierarchy
- **Ink** (`#0F172A`): 主文本色——比纯黑温暖，带极微蓝底调的深色。
- **Slate** (`#475569`): 二级文本——描述、副标题、辅助信息。
- **Mist** (`#94A3B8`): 三级文本——时间戳、占位符、禁用态文本。
- **Ghost** (`#CBD5E1`): 最淡文本——水印、极端弱化信息。

### Five-Point Index Colors (积分五维色)
- **Watch Blue** (`#3B82F6`): 观察力积分——蓝色系。变体: `rgba(59,130,246,0.12)` bg / `rgba(59,130,246,0.4)` border
- **Experience Purple** (`#8B5CF6`): 体验力积分——紫色系。变体: `rgba(139,92,246,0.12)` bg / `rgba(139,92,246,0.4)` border
- **Governance Green** (`#10B981`): 治理力积分——绿色系。变体: `rgba(16,185,129,0.12)` bg / `rgba(16,185,129,0.4)` border
- **Data Cyan** (`#06B6D4`): 数据力积分——青色系。变体: `rgba(6,182,212,0.12)` bg / `rgba(6,182,212,0.4)` border
- **Market Gold** (`#F59E0B`): 市价力积分——金色系。变体: `rgba(245,158,11,0.12)` bg / `rgba(245,158,11,0.4)` border

### Semantic Colors
- **Success** (`#22C55E`): 成功状态、合规通过、正向变动。
- **Danger** (`#EF4444`): 错误、违规警告、负向变动。
- **Warning** (`#F59E0B`): 注意事项、风险提示。
- **Info** (`#3B82F6`): 信息提示、引导说明。

### Border & Shadow Colors
- **Border Light** (`#E2E8F0`): 浅色模式标准边框。
- **Border Warm** (`#CBD5E1`): 浅色模式强调边框、分割线。
- **Border Dark** (`rgba(255,255,255,0.08)`): 深色模式标准边框——半透明白。
- **Border Dark Subtle** (`rgba(255,255,255,0.05)`): 深色模式弱边框。
- **Shadow Blue** (`rgba(15,41,66,0.12)`): 蓝色调主阴影——品牌色投射的阴影。
- **Shadow Black** (`rgba(0,0,0,0.08)`): 中性辅助阴影层。
- **Shadow Warm** (`rgba(0,0,0,0.05)`): 温和环境阴影。

### Gradient System
- **Brand Gradient**: `linear-gradient(135deg, #0F2942 0%, #162D50 50%, #0D2240 100%)` — Hero区背景
- **Accent Gradient**: `linear-gradient(135deg, #E8850C, #F5A623)` — 主CTA按钮
- **AI Gradient**: `linear-gradient(135deg, #6366F1, #818CF8)` — AI功能区域
- **Hero Glow**: `radial-gradient(ellipse at 80% 20%, rgba(232,133,12,0.15) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.10) 0%, transparent 45%)` — Hero区光晕

## 3. Typography Rules

### Font Family
- **Primary**: `-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`
- **Monospace** (数据展示): `'SF Mono', 'Cascadia Code', 'Fira Code', Menlo, monospace`
- **Numbers** (金融数据): `font-variant-numeric: tabular-nums` — 等宽数字

### Hierarchy (Mobile-First 430px)

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Hero Title | 26-28px | 700 | 1.25 | -0.5px | 首页主标题，压缩感 |
| Page Title | 20-22px | 700 | 1.30 | -0.3px | 页面标题、导航栏标题 |
| Section Title | 17-18px | 700 | 1.35 | -0.2px | 区域标题 |
| Card Title | 15-16px | 600 | 1.40 | normal | 卡片标题 |
| Body Large | 15px | 400 | 1.60 | normal | 引言段落、重点描述 |
| Body | 14px | 400 | 1.60 | normal | 标准正文 |
| Body Small | 13px | 400 | 1.55 | normal | 次级正文 |
| Caption | 12px | 400-500 | 1.50 | 0.1px | 元数据、标签 |
| Micro | 10-11px | 500 | 1.40 | 0.2px | 微标签、角标 |
| Data Display | 18-24px | 700 | 1.20 | tabular-nums | 金融数据、统计数字 |
| Data Label | 11px | 500 | 1.40 | 0.3px | 数据指标名称 |

### Principles
- **压缩标题 + 舒展正文**: 标题用负字间距和tight行高创造工程密度感；正文1.6行高确保舒适阅读。
- **三字重体系**: 400(阅读) / 600(强调/UI) / 700(标题/数据)——没有800-900，避免厚重感。
- **等宽数字**: 所有金融数据、排名数字、时间戳使用`tabular-nums`，保证对齐。
- **中文字间距**: 中文内容letter-spacing保持-0.5px到normal，避免过松或过紧。
- **渐进缩放**: 移动端标题不大于28px，保证430px视口内的信息密度。

## 4. Component Stylings

### Buttons

**Primary CTA (Gradient)**
- Background: `linear-gradient(135deg, #E8850C, #F5A623)`
- Text: `#FFFFFF`
- Padding: 12px 20px
- Radius: 10px
- Shadow: `0 4px 14px rgba(232,133,12,0.35)`
- Font: 14px weight 600
- Hover: shadow `0 6px 20px rgba(232,133,12,0.45)`
- Active: `transform: scale(0.97)`
- Use: 主操作按钮

**Primary Solid**
- Background: `#0F2942`
- Text: `#FFFFFF`
- Padding: 10px 16px
- Radius: 8px
- Shadow: `0 2px 8px rgba(15,41,66,0.25)`
- Font: 14px weight 600
- Use: 次要操作、确认按钮

**AI Button**
- Background: `linear-gradient(135deg, #6366F1, #818CF8)`
- Text: `#FFFFFF`
- Padding: 10px 16px
- Radius: 10px
- Shadow: `0 4px 14px rgba(99,102,241,0.30)`
- Font: 14px weight 600
- Use: AI功能触发、智能体交互

**Ghost / Outlined**
- Background: `transparent`
- Text: `#0F2942`
- Padding: 10px 16px
- Radius: 8px
- Border: `1px solid #CBD5E1`
- Font: 14px weight 500
- Hover: `background: rgba(15,41,66,0.04)`
- Use: 次级操作

**Dark Ghost (on dark bg)**
- Background: `rgba(255,255,255,0.06)`
- Text: `rgba(255,255,255,0.85)`
- Padding: 10px 16px
- Radius: 8px
- Border: `1px solid rgba(255,255,255,0.15)`
- Use: 深色背景上的次级按钮

### Cards & Containers

**Standard Card**
- Background: `#FFFFFF`
- Border: via shadow — `rgba(15,41,66,0.08) 0px 0px 0px 1px`
- Radius: 12px
- Shadow stack: `rgba(15,41,66,0.08) 0px 0px 0px 1px, rgba(15,41,66,0.04) 0px 2px 4px, rgba(0,0,0,0.03) 0px 8px 16px -4px`
- Hover: shadow intensifies, add `rgba(15,41,66,0.06) 0px 4px 12px`

**Elevated Card (Featured)**
- Background: `#FFFFFF`
- Radius: 14px
- Shadow stack: `rgba(15,41,66,0.12) 0px 0px 0px 1px, rgba(15,41,66,0.06) 0px 4px 8px, rgba(0,0,0,0.05) 0px 16px 32px -8px`
- Use: 综艺卡、重点内容卡

**Dark Card (on dark bg)**
- Background: `rgba(255,255,255,0.04)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Radius: 12px
- No additional shadow — 用bg亮度递进表达层级

**Tinted Card (Color-coded)**
- Background: `{color}.12` (如 `rgba(59,130,246,0.12)`)
- Border: `1px solid {color}.25` (如 `rgba(59,130,246,0.25)`)
- Radius: 12px
- Use: 积分类型卡片、分类卡片

### Badges / Pills / Tags

**Brand Badge**
- Background: `rgba(232,133,12,0.12)`
- Text: `#E8850C`
- Border: `1px solid rgba(232,133,12,0.25)`
- Radius: 20px
- Font: 11px weight 600
- Use: 品牌标识、热度标签

**Status Badge**
- Background: `{semantic-color}.12`
- Text: `{semantic-color}`
- Radius: 6px
- Font: 11px weight 600
- Use: 状态指示

**Pill Tab**
- Background: `transparent` / active: `#0F2942`
- Text: `#475569` / active: `#FFFFFF`
- Radius: 20px
- Padding: 6px 14px
- Border: `1px solid #E2E8F0` / active: none
- Font: 13px weight 500/600

### Inputs & Forms
- Border: `1px solid #E2E8F0`
- Radius: 10px
- Focus: `1px solid #6366F1` + `0 0 0 3px rgba(99,102,241,0.15)`
- Label: `#475569`, 13px weight 500
- Text: `#0F172A`
- Placeholder: `#94A3B8`

### Navigation

**Top Nav**
- Background: `#0F2942`
- Height: 44px
- Shadow: `0 1px 8px rgba(0,0,0,0.15)`
- Logo: 16px weight 700, #FFFFFF
- Right items: 14px weight 600, `rgba(255,255,255,0.7)`
- Active: `color: #E8850C`, `background: rgba(232,133,12,0.12)`

**Tab Bar**
- Background: `#FFFFFF`
- Height: 68px (含safe area)
- Top border: via shadow — `rgba(15,41,66,0.08) 0px -1px 0px, rgba(0,0,0,0.04) 0px -4px 16px`
- Active label: `#0F2942`, weight 700
- Inactive label: `#94A3B8`, weight 500

### Modal & Overlay
- Backdrop: `rgba(10,22,40,0.60)` with `backdrop-filter: blur(8px)`
- Modal background: `#FFFFFF`
- Modal radius: 16px (top corners)
- Modal shadow: `0 -8px 40px rgba(0,0,0,0.15)`

## 5. Layout Principles

### Spacing System (8px Base)
- **4px**: Inline micro gaps
- **8px**: Compact internal padding
- **12px**: Standard gaps, card internal padding
- **16px**: Section horizontal padding, standard gaps
- **20px**: Card padding, comfortable gaps
- **24px**: Section vertical spacing (compact)
- **32px**: Section vertical spacing (standard)
- **48px**: Section vertical spacing (generous)

### Mobile Container
- Max width: 430px, centered
- Horizontal padding: 16px
- Card margin: 0 16px
- Section header padding: 20px 16px 10px

### Whitespace Philosophy
- **数据密集、框架宽松**: 飞轮、排行榜、指数等数据组件内部紧凑排列，但周围留白充足
- **呼吸式节奏**: 列表页每3-4项后插入小间距，避免视觉疲劳
- **暗色分区自然分割**: 深色Hero区与浅色内容区交替，利用背景色差替代分割线

### Border Radius Scale
- **6px**: Small badges, inline tags
- **8px**: Buttons, inputs, functional elements
- **10px**: Primary buttons, emphasized inputs
- **12px**: Cards, containers, panels
- **14px**: Featured cards, hero elements
- **16px**: Modals, large panels
- **20px**: Pill shapes, badges
- **50%**: Circle avatars, icon buttons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Page background, text blocks |
| Whisper (1) | `rgba(15,41,66,0.08) 0px 0px 0px 1px` | Shadow-as-border for subtle containment |
| Light (2) | Whisper + `rgba(0,0,0,0.03) 0px 2px 4px` | Standard cards, quick-grid items |
| Standard (3) | Whisper + `rgba(15,41,66,0.04) 0px 4px 8px` + `rgba(0,0,0,0.04) 0px 12px 24px -6px` | Elevated cards, show promos |
| Elevated (4) | `rgba(15,41,66,0.12) 0px 0px 0px 1px` + `rgba(15,41,66,0.06) 0px 8px 16px` + `rgba(0,0,0,0.06) 0px 24px 48px -12px` | Modals, floating panels, popovers |
| Dark Elevation | Background luminance stepping: `#0A1628` → `#0F1B2E` → `#162438` → `#1E3050` | Dark mode surfaces (Linear-style) |
| Focus | `0 0 0 2px #6366F1` + `0 0 0 4px rgba(99,102,241,0.20)` | Keyboard/accessibility focus ring |

**Shadow Philosophy**: 合力生态的阴影系统融合了Stripe的蓝色调阴影和Vercel的shadow-as-border技术。主阴影色`rgba(15,41,66,...)`取自品牌深海军蓝，使阴影成为品牌色的自然延伸而非中性灰。零偏移1px扩散的阴影层替代传统边框，让卡片和容器拥有更精细的视觉控制。在深色模式下，采用Linear的亮度阶梯模型而非阴影——通过bg递进表达层级更符合暗黑环境下的视觉逻辑。

## 7. Do's and Don'ts

### Do
- 使用蓝色调阴影（`rgba(15,41,66,...)`）——品牌色投射的阴影传达信任
- 使用shadow-as-border替代传统border——更精细的视觉控制
- AI功能统一使用Indigo紫（`#6366F1`）——建立AI视觉标识
- 积分五维色严格按照编码系统使用——视觉信息一致性
- 深色模式用亮度阶梯而非阴影表达层级——Linear式优雅
- 金融数据使用`tabular-nums`——数字对齐的专业感
- 标题使用负字间距——压缩感传达工程精度
- 正文1.6行高——阅读舒适度

### Don't
- 不使用纯黑（`#000000`）做标题色——使用Ink（`#0F172A`）
- 不使用纯白（`#FFFFFF`）做页面背景——使用Canvas（`#F8F9FC`）
- 不在浅色模式使用灰色阴影——必须带蓝色调
- 不在深色模式使用drop shadow表达层级——用bg亮度递进
- 不使用800+字重——最高700，避免厚重
- 不使用超过20px的border-radius做卡片——12-14px足够
- 不在AI功能区域使用橙色——橙色是品牌色，靛蓝紫才是AI标识
- 不在积分五维色之间混用——每种积分严格对应专属色

## 8. Responsive Behavior

### Mobile-First (430px Container)
- 所有设计以430px为基准视口
- 单列布局为主，宫格最多4列
- 触摸目标最小44x44px
- TabBar固定底部68px高度

### Desktop Scaling
- 当视口>430px时，容器居中显示
- 两侧留黑底（`#000`），模拟手机屏幕
- 阴影加深以增强容器感：`0 0 60px rgba(0,0,0,0.5)`

### Touch Targets
- 按钮: 最小44px高度，12px+垂直padding
- 列表项: 最小48px高度
- Tab项: 最小44x44px触摸区域
- 卡片: 整体可点，:active缩放0.97

### Interaction Patterns
- 页面切换: slideIn 0.28s / slideOut 0.25s / fadeIn 0.22s
- 按钮反馈: :active scale(0.97)
- 卡片反馈: :active scale(0.95)
- 滚动: -webkit-overflow-scrolling: touch, 隐藏滚动条
- 加载: dotPulse脉冲动画1.2s

## 9. Agent Prompt Guide

### Quick Color Reference
- Brand Primary: Deep Navy (`#0F2942`)
- Brand Accent: Amber Orange (`#E8850C`)
- AI Feature: Indigo (`#6366F1`)
- Page Background: Canvas (`#F8F9FC`)
- Card Surface: Ivory (`#FFFFFF`)
- Primary Text: Ink (`#0F172A`)
- Secondary Text: Slate (`#475569`)
- Muted Text: Mist (`#94A3B8`)
- Border: `rgba(15,41,66,0.08) 0px 0px 0px 1px`
- Focus Ring: `0 0 0 2px #6366F1`

### Example Component Prompts
- "创建首页Hero区：背景渐变 linear-gradient(160deg, #0A1628 0%, #0F2942 60%, #162D50 100%)，叠加Hero Glow光晕。标题28px weight 700 letter-spacing -0.5px #FFFFFF。副标题14px weight 400 rgba(255,255,255,0.6) line-height 1.6。主CTA按钮: Accent Gradient背景 10px radius, 0 4px 14px rgba(232,133,12,0.35)阴影。幽灵按钮: rgba(255,255,255,0.08)背景 rgba(255,255,255,0.2)边框。"
- "设计标准卡片：#FFFFFF背景，shadow-as-border rgba(15,41,66,0.08) 0px 0px 0px 1px + rgba(0,0,0,0.03) 0px 2px 4px。12px radius。标题15px weight 600 #0F172A。正文14px weight 400 #475569 line-height 1.6。"
- "构建积分类型卡片：观察力蓝色 rgba(59,130,246,0.12)背景 + rgba(59,130,246,0.25)边框。12px radius。标题15px weight 600 #3B82F6。数值24px weight 700 #0F172A font-variant-numeric tabular-nums。"
- "创建AI对话气泡：AI侧 rgba(99,102,241,0.12)背景 + 1px solid rgba(99,102,241,0.25)边框 14px radius(4px左下角0)。用户侧 #0F2942背景 #FFFFFF文字 14px radius(4px右下角0)。"
- "设计TabBar：#FFFFFF背景 rgba(15,41,66,0.08)顶部阴影。活跃Tab: #0F2942文字 weight 700 + scale(1.1)图标。非活跃Tab: #94A3B8文字 weight 500。"

### Iteration Guide
1. Shadow-as-border是基础——所有卡片容器先用`rgba(15,41,66,0.08) 0px 0px 0px 1px`
2. 阴影颜色必须带蓝色调——`rgba(15,41,66,...)`不是`rgba(0,0,0,...)`
3. AI功能统一Indigo紫`#6366F1`——不要在AI区域使用橙色
4. 积分色严格对应——观察蓝/体验紫/治理绿/数据青/市价金
5. 深色模式用bg亮度递进不靠阴影——#0A1628 → #0F1B2E → #162438 → #1E3050
6. 字重上限700——不使用800/900
7. 正文行高1.6——不要压缩到1.4以下
8. 金融数据必须`tabular-nums`——数字对齐是专业感的基础
