/// <reference types="vite/client" />
// 網站內容都在這個檔案。新增或修改作品只需要改這裡。
//
// 作品點擊後的行為由連結自動判斷：
// - link 是 YouTube → 站內彈出播放
// - 有 pages（圖片陣列）→ 站內攝影集翻頁
// - 其他（Drive、IG、Google Sites…）→ 開新分頁

export type Category = 'direct' | 'edit' | 'photo' | 'design' | 'brand';

export interface Work {
  id: string;
  cat: Category;
  title: string;
  role: string;
  meta: string;
  img: string;
  link: string;
  award?: string;
  pages?: string[];
  pos?: string; // 縮圖裁切位置，例如 'center 55%'
}

const base = import.meta.env.BASE_URL;
const fencing = Array.from({ length: 7 }, (_, i) => `${base}photos/fencing/${String(i + 3).padStart(2, '0')}.jpg`);

export const CATEGORIES: { key: Category | 'all'; label: string; note: string }[] = [
  { key: 'all', label: '全部', note: '依專長篩選。影片可在站內播放，攝影作品可直接翻閱。' },
  { key: 'direct', label: '導演・劇情', note: '我自編自導、負責到底的作品。' },
  { key: 'edit', label: '剪輯', note: '以剪接為主要角色的商業與頻道案。' },
  { key: 'photo', label: '攝影', note: '人像、運動、商業與短片攝影。' },
  { key: 'design', label: '設計・動態', note: '平面、動畫、3D 與轉播圖像。' },
  { key: 'brand', label: '品牌・社群', note: '品牌方合作與自媒體經營。' },
];

export const WORKS: Work[] = [
  { id: 'alien', cat: 'direct', title: '我的阿嬤是外星人', role: '導演・編劇・攝影・剪輯', meta: '劇情長片', img: 'https://i.postimg.cc/Y0nNGNVL/Still-2025-09-12-011601-1-36-1.png', link: 'https://youtu.be/yNSRkhTBXkA', award: '第51屆藝美獎 最佳長片' },
  { id: 'harbor', cat: 'direct', title: '海港分局', role: '編劇・導演・攝影・剪輯', meta: '2024', img: 'https://i.ytimg.com/vi/T42roPDZz7E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKfmiz77w8xZmsA2tASRHQDzyYRg', link: 'https://youtu.be/T42roPDZz7E', award: '海洋保育YTR 最佳年度創作獎' },
  { id: 'noop', cat: 'direct', title: '無止 Noop', role: '編劇・導演・攝影・剪輯', meta: '2023', img: 'https://i.postimg.cc/MZ1PGgd3/maxresdefault.jpg', link: 'https://youtu.be/6Q1uCk1cN88', award: '校園金馬獎 佳作' },
  { id: 'road', cat: 'direct', title: '有你的路上', role: '導演・攝影', meta: '2025', img: 'https://i.postimg.cc/9Q0szJ4y/ying-mu-jie-tu-2026-04-21-ling-chen2-07-29.png', link: 'https://youtu.be/ypIa8XxrBMc', award: '職涯輔導心得競賽 評審獎' },
  { id: 'dark', cat: 'direct', title: '職場的黑暗序曲', role: '導演・攝影・剪輯｜個人微電影', meta: '短片', img: 'https://i.postimg.cc/0yHRCLg5/ying-mu-jie-tu-2026-04-21-ling-chen2-06-04.png', link: 'https://youtu.be/-9LCZ8lpLhs' },
  { id: 'same', cat: 'direct', title: '同樣一個你', role: '導演・攝影・剪輯｜銘傳電視台', meta: 'MV・2023', img: 'https://i.postimg.cc/NG89FxTf/ying-mu-jie-tu-2026-04-21-ling-chen1-45-25.png', link: 'https://youtu.be/hOnRCdSDy0w', award: 'MV 發表會 最佳MV' },
  { id: 'leaf', cat: 'direct', title: '阿桑《葉子》綺 Miranda 翻唱', role: '製片・導演・攝影・剪輯', meta: 'MV', img: 'https://i.postimg.cc/mgFQ6sv5/ye-zi-MV.png', link: 'https://youtu.be/Ov70xCmE3JI' },
  { id: 'wanna', cat: 'direct', title: '好想愛這個世界啊', role: '導演・攝影・剪輯', meta: 'MV', img: 'https://i.postimg.cc/76dCzB9W/ying-mu-jie-tu-2026-04-21-ling-chen1-32-02.png', link: 'https://youtu.be/unIt62LbXbE' },
  { id: 'caspia', cat: 'direct', title: 'Caspia Lili KOL 參訪 Reels', role: '導演・剪輯', meta: 'KOL 合作', img: 'https://i.postimg.cc/9Xy8fsJv/ying-mu-jie-tu-2026-04-21-ling-chen1-54-32.png', link: 'https://www.instagram.com/reel/C4nj_mwySrg/' },

  { id: 'jg', cat: 'edit', title: 'JG陪你聊財經 EP8・10・12–16', role: '剪輯・2D 動畫', meta: 'YouTube・2024', img: 'https://i.postimg.cc/SKFcBPqz/JG-pei-ni-liao-cai-jing.png', link: 'https://youtu.be/nauW1l-nJg0' },
  { id: 'moneydive', cat: 'edit', title: '潛經濟 MoneyDive', role: '剪輯', meta: 'YouTube', img: 'https://i.postimg.cc/SNKRgb2k/ying-mu-jie-tu-2026-04-21-ling-chen1-15-37.png', link: 'https://drive.google.com/file/d/1Lvbac1dWg7JjRY8bcYeeHcEw4eNLB0BQ/view?usp=sharing' },
  { id: 'cw', cat: 'edit', title: '天下學習 有庠創新論壇精華', role: '剪輯', meta: '2024', img: 'https://i.postimg.cc/mknsdqJZ/ying-mu-jie-tu-2026-04-21-ling-chen1-18-11.png', link: 'https://youtu.be/bzA_cWS6s4c' },
  { id: 'falifali', cat: 'edit', title: '花蓮 Fali Fali 音樂節', role: '精華剪輯｜花蓮市政府', meta: '2023', img: 'https://i.postimg.cc/bvpKRprH/ying-mu-jie-tu-2026-04-21-ling-chen1-20-22.png', link: 'https://drive.google.com/file/d/1SiWBkzgqwofdam4AqxE_jpky5TSGD4sx/view?usp=sharing' },
  { id: 'water', cat: 'edit', title: '《水的記憶》沉浸式音樂會', role: '完整紀錄剪接', meta: '2023', img: 'https://i.postimg.cc/Hkdg6QPN/VS-You-Tube-0-15.jpg', link: 'https://youtu.be/ochgz0hZHKk' },
  { id: 'hallo', cat: 'edit', title: '《哈囉台》校園街訪', role: '企劃・剪輯', meta: '校內', img: 'https://i.postimg.cc/T2jL1cmb/ying-mu-jie-tu-2026-04-21-ling-chen1-39-52.png', link: 'https://youtu.be/rQGYjaJSk80' },
  { id: 'podcast', cat: 'edit', title: '《無界》性平議題 Podcast', role: '企劃・攝影・剪輯', meta: '校內', img: 'https://i.postimg.cc/y6hgxT9T/ying-mu-jie-tu-2026-04-21-ling-chen1-43-40.png', link: 'https://youtu.be/fI4A_cIn0B8' },

  { id: 'food', cat: 'photo', title: '海邊有刺 美食攝影', role: '商品攝影・後製', meta: '2026', img: `${base}photos/food/02.jpg`, pos: 'center 45%', link: 'https://www.instagram.com/c.pause_tw/', pages: [1, 2, 3, 4].map((n) => `${base}photos/food/0${n}.jpg`) },
  { id: 'fencing', cat: 'photo', title: '全中運／全大運 擊劍', role: '轉播團隊攝影', meta: '運動攝影', img: 'https://i.postimg.cc/kgtxhCrJ/quan-zhong-yun-she-ying.png', link: 'https://drive.google.com/drive/folders/1GHPm56-B7MPqOGDLDF0G27n1HNKKkxN1?usp=sharing', pages: fencing },
  { id: 'formosa', cat: 'photo', title: 'Formosa Clash', role: '攝影｜全英文指導外籍模特', meta: '畢業製作攝影集', img: 'https://i.postimg.cc/0Q32zbnr/ying-mu-jie-tu-2026-04-21-ling-chen2-48-48.png', link: 'https://drive.google.com/drive/folders/142T-IZTDtFBm84C7p5QI3cQ1KHYcCprP?usp=sharing', pages: [
    'https://i.postimg.cc/LXFmv6kM/ying-mu-jie-tu-2026-04-29-xia-wu1-02-58.png',
    'https://i.postimg.cc/wTqTSvCt/ying-mu-jie-tu-2026-04-29-xia-wu1-03-19.png',
    'https://i.postimg.cc/tCk7TP3s/ying-mu-jie-tu-2026-04-29-xia-wu1-03-39.png',
    'https://i.postimg.cc/7YwfwX2h/ying-mu-jie-tu-2026-04-29-xia-wu1-03-55.png',
    'https://i.postimg.cc/J4xtnJN0/ying-mu-jie-tu-2026-04-29-xia-wu1-04-05.png',
    'https://i.postimg.cc/5Nb6bpCt/ying-mu-jie-tu-2026-04-29-xia-wu1-04-26.png',
  ] },
  { id: 'pakyau', cat: 'photo', title: 'pakyau_photography', role: '人像・商品・紀錄', meta: '個人攝影帳號', img: 'https://i.postimg.cc/wvkQHYQh/ying-mu-jie-tu-2026-04-21-ling-chen2-44-18.png', link: 'https://www.instagram.com/pakyau_photography/' },
  { id: 'tunnel', cat: 'photo', title: '隧道盡頭的光', role: '攝影｜「拍桃園」橫式短片', meta: '短片', img: 'https://i.postimg.cc/YCm1yH5D/sui-dao-de-jin-tou-de-guang.png', link: 'https://youtu.be/Ql2GR9lwoHU', award: '佳作' },
  { id: 'wudeng', cat: 'photo', title: '五燈有請', role: '攝影｜新北校園廣告人', meta: '2025', img: 'https://i.postimg.cc/rwtSYkBb/wu-deng-jiang.png', link: 'https://youtu.be/irGChK3z9jk', award: '30強入圍' },
  { id: 'chiyin', cat: 'photo', title: '痴癮', role: '燈光｜犯罪預防創意短片', meta: '2024', img: 'https://i.postimg.cc/QtCDDhQr/VS-You-Tube-113-0-09.jpg', link: 'https://youtu.be/1hFn1yuq1kc', award: '大學專組銅質獎' },
  { id: 'wedding', cat: 'photo', title: '婚禮主持人行銷短影音', role: '拍攝・剪輯', meta: '短影音', img: 'https://i.postimg.cc/RFYBVyR8/ying-mu-jie-tu-2026-04-21-ling-chen2-02-32.png', link: 'https://www.instagram.com/reels/DPd-1nVCayX/' },
  { id: 'liveenglish', cat: 'photo', title: 'Live English 英語課程廣告', role: '拍攝・剪輯', meta: '廣告', img: 'https://i.postimg.cc/W47PRtCC/ying-mu-jie-tu-2026-04-21-ling-chen1-19-02.png', link: 'https://drive.google.com/file/d/1czH9GzLWd3NmWs0JGVSw75irpvMWh-TZ/view' },
  { id: 'ycoo', cat: 'photo', title: 'ycoorobot 玩具廣告', role: '拍攝・剪接｜定格動畫', meta: 'Reels', img: 'https://i.postimg.cc/8kLKCxt3/ying-mu-jie-tu-2026-04-21-ling-chen1-49-59.png', link: 'https://www.instagram.com/reel/C0jltvYM-ev/' },

  { id: 'dream', cat: 'design', title: '這裡是夢想開始的地方', role: '整體設計・繪圖・攝影', meta: '海報・2024', img: 'https://i.postimg.cc/0QK8m9bk/unnamed.jpg', link: 'https://sites.google.com/view/2024posterdesign/%E5%BE%97%E7%8D%8E%E4%BD%9C%E5%93%81', award: '校園創意生活海報 第一名', pages: ['https://i.postimg.cc/0QK8m9bk/unnamed.jpg'] },
  { id: 'tradition', cat: 'design', title: '傳統中創新', role: '平面設計・圖片調光', meta: '海報・2023', img: 'https://i.postimg.cc/L605pRgr/1149-3095.jpg', link: 'https://i.postimg.cc/L605pRgr/1149-3095.jpg', award: '金匠獎設計賽 入圍', pages: ['https://i.postimg.cc/L605pRgr/1149-3095.jpg'] },
  { id: 'teacher', cat: 'design', title: '教育部師鐸獎 表揚大會', role: '背景動畫・動態特效', meta: '2024', img: 'https://i.postimg.cc/2SB4XYpN/shi-yi-jiang.png', link: 'https://drive.google.com/file/d/1tRapIRMu4WzXr-j-qBHiL3pdk7kPM9Mb/view?usp=sharing' },
  { id: 'wmg', cat: 'design', title: '2025 雙北世壯運 轉播', role: 'Graphics Operator・虛擬攝影棚', meta: '2025', img: 'https://i.postimg.cc/wjshbzKB/shi-zhuang-yun.png', link: 'https://youtu.be/47Q5yZvX-pw' },
  { id: '3d', cat: 'design', title: '3D 個人作品', role: 'Blender 建模・動態', meta: '3D', img: 'https://i.postimg.cc/s2d5kLyQ/3D.png', link: 'https://youtu.be/vTF4hk4pOIw' },
  { id: 'loser', cat: 'design', title: '《LOSER》', role: '2D 平面動畫', meta: '動畫', img: 'https://i.postimg.cc/nhP3Xx7X/ying-mu-jie-tu-2026-04-21-ling-chen1-25-10.png', link: 'https://youtu.be/rX4QVuttz8A' },

  { id: 'cpause', cat: 'brand', title: '海邊有刺｜刺日談', role: '社群選題・內容企劃・限動與貼文製作', meta: '2026', img: `${base}photos/cpause.jpg`, pos: 'center 52%', link: 'https://www.instagram.com/c.pause_tw/' },
  { id: 'heineken', cat: 'brand', title: '海尼根 社群與短影音', role: '內容企劃・社群經營', meta: '2025', img: 'https://i.postimg.cc/MZRGrYgq/2a0f6ec65c8f24847e8131e07f6492f7.png', link: 'https://www.instagram.com/reel/DQqDTnvk6yx/' },
  { id: 'dawu', cat: 'brand', title: '海尼根 × 大武山職場新人獎', role: '開場影片 拍攝・剪輯', meta: '2025', img: 'https://i.postimg.cc/tCp9vGhP/ying-mu-jie-tu-2026-04-21-shang-wu11-45-10.png', link: 'https://drive.google.com/file/d/1swMAm-KPya1MJ3SMtWv6M91dgSdbezCH/view?usp=sharing' },
  { id: 'heinekendesign', cat: 'brand', title: '海尼根 平面設計與素材整合', role: '海報・平面・素材', meta: '2025', img: 'https://i.postimg.cc/VkbjHwyS/hai-ni-gen-she-ji.png', link: 'https://i.postimg.cc/VkbjHwyS/hai-ni-gen-she-ji.png', pages: ['https://i.postimg.cc/VkbjHwyS/hai-ni-gen-she-ji.png'] },
  { id: 'dumbcam', cat: 'brand', title: 'DUMBCAM 傻瓜機', role: '網站・品牌・文案・社群', meta: '2024 — 至今', img: 'https://i.postimg.cc/vZJWRZfN/ying-mu-jie-tu-2026-04-21-ling-chen1-26-45.png', link: 'https://www.threads.com/@_dumbcam_' },
];

// 精選作品：第一個是大圖，第 2–3 個在右側，第 4–6 個在下排
export const FEATURED: { id: string; badge?: string; desc: string }[] = [
  { id: 'alien', badge: '第 51 屆藝美獎 電視戲劇類最佳長片', desc: '劇情長片｜導演・編劇・攝影・剪輯。第一次拍多主角長片，從規劃到執行的嘗試。' },
  { id: 'harbor', badge: '海洋保育 YTR 最佳年度創作獎', desc: '編劇・導演・攝影・剪輯｜2024' },
  { id: 'dawu', badge: '品牌特案', desc: '頒獎開場影片 拍攝・剪輯｜2025' },
  { id: 'jg', desc: '剪輯・2D 動畫解析財經知識｜2024' },
  { id: 'wmg', desc: 'Graphics Operator・虛擬攝影棚' },
  { id: 'dream', badge: '校園創意生活海報 第一名', desc: '整體設計・繪圖・攝影｜2024' },
];

export const EXPERIENCE = [
  { date: '2025.06 — 2025.12', org: '海尼根台灣股份有限公司', role: '公共事務部實習生', desc: '負責媒體內容製作與社群管理，製作海報、平面與活動素材，並參與大武山職場新人獎等特案執行。' },
  { date: '2024.08 — 至今', org: '傻瓜機 DUMBCAM', role: '社群經營', desc: '自建攝影教學品牌，一手包辦網站、品牌設計、文案與 IG／Threads 經營，從 0 累積到 3,000+ 追蹤。' },
  { date: '2024.06 — 2025.06', org: '錨點影音股份有限公司', role: '攝影助理', desc: '專案攝影與剪輯，熟悉影音公司的製作流程與主管溝通方式。' },
  { date: '2024', org: 'JG說真的', role: '影片剪輯', desc: '《JG陪你聊財經》系列影片（EP8、10、12–16）剪輯，以 2D 動畫解析複雜的財經知識。' },
  { date: '2021 — 2023', org: 'Live English 香港活學英語', role: 'YouTube 拍攝與剪輯', desc: '課程廣告與頻道影片的拍攝計畫、拍攝與剪輯。' },
];

export const AWARDS = [
  { year: '2026', event: '第 51 屆藝美獎 電視戲劇類', result: '最佳長片', work: '《我的阿嬤是外星人》' },
  { year: '2025', event: '114 年大專校院職涯輔導學生心得競賽', result: '評審獎', work: '《有你的路上》' },
  { year: '2025', event: '新北校園廣告人', result: '30 強入圍', work: '《五燈有請》' },
  { year: '2024', event: '海洋保育 YTR 創意影音競賽', result: '最佳年度創作獎', work: '《海港分局》' },
  { year: '2024', event: '第十屆青春有影 大學盃', result: '行銷組銅獎・百大精選', work: '《海港分局》' },
  { year: '2024', event: '113 年全國學生犯罪預防創意短片', result: '大學專組銅質獎', work: '《痴癮》' },
  { year: '2024', event: '校園創意生活海報設計競賽', result: '第一名', work: '《這裡是夢想開始的地方》' },
  { year: '2023', event: '銘傳大學 MV 發表會', result: '最佳 MV', work: '《同樣一個你》' },
  { year: '2023', event: '校園金馬獎', result: '佳作', work: '《無止 Noop》' },
  { year: '2023', event: '金匠獎設計賽', result: '入圍', work: '《傳統中創新》' },
  { year: '—', event: '「拍桃園」短片徵件 橫式短片組', result: '佳作', work: '《隧道盡頭的光》' },
];

export const SHOWREEL = 'https://youtu.be/yjDfz0IFROA';
export const HERO_STILL = 'https://i.postimg.cc/Y0nNGNVL/Still-2025-09-12-011601-1-36-1.png';
export const PORTRAIT = `${base}photos/portrait.jpg`;
