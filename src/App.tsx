/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Video, 
  Camera, 
  Palette, 
  Box, 
  Mail, 
  MapPin, 
  Award, 
  GraduationCap, 
  Briefcase,
  Instagram,
  Youtube,
  Linkedin,
  Play,
  Smartphone,
  Layout,
  Layers,
  Phone,
  ArrowLeft,
  Tv,
  MonitorPlay,
  X,
  Book,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

// --- Data ---

const PROJECTS = [
  {
    id: 35,
    title: "海尼根社群經營及短影音企劃",
    category: "社群經營",
    description: "負責海尼根官方社群內容規劃、短影音企劃與執行。",
    image: "https://i.postimg.cc/MZRGrYgq/2a0f6ec65c8f24847e8131e07f6492f7.png",
    link: "https://www.instagram.com/reel/DQqDTnvk6yx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    tags: ["社群經營", "短影音", "海尼根"]
  },
  {
    id: 36,
    title: "海尼根 X 大武山職場新人獎 影片拍攝及剪輯",
    category: "工作與專案經歷",
    description: "負責海尼根與大武山合作之職場新人獎影片拍攝與後期剪輯。",
    image: "https://i.postimg.cc/tCp9vGhP/ying-mu-jie-tu-2026-04-21-shang-wu11-45-10.png",
    link: "https://drive.google.com/file/d/1swMAm-KPya1MJ3SMtWv6M91dgSdbezCH/view?usp=sharing",
    tags: ["影片拍攝", "影片剪輯", "獲獎專案"]
  },
  // 工作與專案經歷
  {
    id: 34,
    title: "《傳統中創新》2023 金匠獎設計賽",
    category: "競賽與獎項",
    description: "入圍作品。擔任整體的平面設計與圖片調光，學到了平面設計和主題結合的實作。",
    image: "https://i.postimg.cc/L605pRgr/1149-3095.jpg",
    link: "https://i.postimg.cc/L605pRgr/1149-3095.jpg",
    tags: ["平面設計", "圖片調光"],
    isImage: true
  },
  {
    id: 2,
    title: "【JG陪你聊財經】YT頻道系列剪輯",
    category: "工作與專案經歷",
    description: "系列剪輯 (EP8,10,12-16)，以2D動畫介紹複雜的財經知識。",
    image: "https://i.postimg.cc/SKFcBPqz/JG-pei-ni-liao-cai-jing.png",
    link: "https://youtu.be/nauW1l-nJg0",
    tags: ["影片剪輯", "2D動畫"]
  },
  {
    id: 1,
    title: "潛經濟 MoneyDive YT 頻道",
    category: "工作與專案經歷",
    description: "負責剪輯，了解影音公司工作流程，提升與主管溝通效率。",
    image: "https://i.postimg.cc/SNKRgb2k/ying-mu-jie-tu-2026-04-21-ling-chen1-15-37.png",
    link: "https://drive.google.com/file/d/1Lvbac1dWg7JjRY8bcYeeHcEw4eNLB0BQ/view?usp=sharing",
    tags: ["影片剪輯"]
  },
  {
    id: 3,
    title: "天下學習 2024有庠創新論壇精華影片",
    category: "工作與專案經歷",
    description: "負責論壇精華影片剪輯，掌握活動節奏與重點呈現。",
    image: "https://i.postimg.cc/mknsdqJZ/ying-mu-jie-tu-2026-04-21-ling-chen1-18-11.png",
    link: "https://youtu.be/bzA_cWS6s4c",
    tags: ["影片剪輯"]
  },
  {
    id: 4,
    title: "LIVEENGLISH 英語課程廣告",
    category: "工作與專案經歷",
    description: "英語課程廣告製作，負責拍攝與剪輯。",
    image: "https://i.postimg.cc/W47PRtCC/ying-mu-jie-tu-2026-04-21-ling-chen1-19-02.png",
    link: "https://drive.google.com/file/d/1czH9GzLWd3NmWs0JGVSw75irpvMWh-TZ/view",
    tags: ["廣告製作", "拍攝剪輯"]
  },
  {
    id: 5,
    title: "花蓮falifali音樂節精華影片",
    category: "工作與專案經歷",
    description: "音樂節活動紀錄与精華剪輯。",
    image: "https://i.postimg.cc/bvpKRprH/ying-mu-jie-tu-2026-04-21-ling-chen1-20-22.png",
    link: "https://drive.google.com/file/d/1SiWBkzgqwofdam4AqxE_jpky5TSGD4sx/view?usp=sharing",
    tags: ["活動紀錄", "影片剪輯"]
  },
  {
    id: 6,
    title: "《水的記憶》音樂會完整紀錄影片",
    category: "工作與專案經歷",
    description: "沉浸式音樂會影片剪接與完整紀錄。",
    image: "https://i.postimg.cc/Hkdg6QPN/VS-You-Tube-0-15.jpg",
    link: "https://youtu.be/ochgz0hZHKk",
    tags: ["影片剪接"]
  },
  {
    id: 7,
    title: "婚禮主持人行銷短影音",
    category: "工作與專案經歷",
    description: "婚禮主持人行銷宣傳短片製作。",
    image: "https://i.postimg.cc/RFYBVyR8/ying-mu-jie-tu-2026-04-21-ling-chen2-02-32.png",
    link: "https://www.instagram.com/reels/DPd-1nVCayX/",
    tags: ["短影音", "行銷"]
  },
  {
    id: 8,
    title: "世壯運轉播",
    category: "工作與專案經歷",
    description: "擔任轉播團隊 Graphics Operator，參與國際性體育賽事。",
    image: "https://i.postimg.cc/wjshbzKB/shi-zhuang-yun.png",
    link: "https://youtu.be/47Q5yZvX-pw",
    tags: ["轉播製作"]
  },
  {
    id: 9,
    title: "全中運 / 全大運（擊劍攝影）",
    category: "工作與專案經歷",
    description: "負責運動賽事現場攝影與紀錄。",
    image: "https://i.postimg.cc/kgtxhCrJ/quan-zhong-yun-she-ying.png",
    link: "https://drive.google.com/drive/folders/1GHPm56-B7MPqOGDLDF0G27n1HNKKkxN1?usp=sharing",
    tags: ["運動攝影"]
  },
  {
    id: 10,
    title: "113年度教育部師鐸獎 背景動畫製作",
    category: "工作與專案經歷",
    description: "負責頒獎典禮背景動態特效與動畫製作。",
    image: "https://i.postimg.cc/2SB4XYpN/shi-yi-jiang.png",
    link: "https://drive.google.com/file/d/1tRapIRMu4WzXr-j-qBHiL3pdk7kPM9Mb/view?usp=sharing",
    tags: ["動態特效", "動畫製作"]
  },
  {
    id: 11,
    title: "Caspia Lili KOL 參訪Reels",
    category: "工作與專案經歷",
    description: "KOL 參訪活動短片導演與剪輯。",
    image: "https://i.postimg.cc/9Xy8fsJv/ying-mu-jie-tu-2026-04-21-ling-chen1-54-32.png",
    link: "https://www.instagram.com/reel/C4nj_mwySrg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    tags: ["導演", "剪輯"]
  },
  {
    id: 12,
    title: "ycoorobot玩具廠商廣告",
    category: "工作與專案經歷",
    description: "玩具產品廣告拍攝與剪接。",
    image: "https://i.postimg.cc/8kLKCxt3/ying-mu-jie-tu-2026-04-21-ling-chen1-49-59.png",
    link: "https://www.instagram.com/reel/C0jltvYM-ev/",
    tags: ["拍攝", "剪接"]
  },
  // 社群經營
  {
    id: 13,
    title: "DUMBCAMBLOG（IG、Threads）",
    category: "社群經營",
    description: "自行建立品牌，經營網誌平台與社群媒體。",
    image: "https://i.postimg.cc/vZJWRZfN/ying-mu-jie-tu-2026-04-21-ling-chen1-26-45.png",
    link: "https://www.threads.com/@_dumbcam_?xmt=AQF0GsIrOdPcBdVDe-FfxiXpnpyo6rOjZuv7NpOkOywmGII",
    tags: ["社群經營", "品牌建立"]
  },
  // 2D及3D動畫作品
  {
    id: 14,
    title: "動態3D個人作品",
    category: "2D及3D動畫作品",
    description: "3D 建模與動態呈現練習。",
    image: "https://i.postimg.cc/s2d5kLyQ/3D.png",
    link: "https://www.youtube.com/watch?v=vTF4hk4pOIw",
    tags: ["3D建模", "Blender"]
  },
  {
    id: 33,
    title: "3D 建模設計作品",
    category: "2D及3D動畫作品",
    description: "3D 建模基礎與進階整合練習。",
    image: "https://i.postimg.cc/25Rnstmz/3D-jian-mo.png",
    link: "https://youtu.be/vTF4hk4pOIw",
    tags: ["3D Modeling", "Design"]
  },
  {
    id: 15,
    title: "《LOSER》平面動畫個人作品",
    category: "2D及3D動畫作品",
    description: "2D 平面動畫個人整合實踐作品。",
    image: "https://i.postimg.cc/nhP3Xx7X/ying-mu-jie-tu-2026-04-21-ling-chen1-25-10.png",
    link: "https://youtu.be/rX4QVuttz8A",
    tags: ["2D動畫", "個人作品"]
  },
  // 競賽與獎項
  {
    id: 16,
    title: "《痴癮》113年全國學生犯罪預防創意短片",
    category: "競賽與獎項",
    description: "大學專組銅質獎，負責燈光與實踐。",
    image: "https://i.postimg.cc/QtCDDhQr/VS-You-Tube-113-0-09.jpg",
    link: "https://youtu.be/1hFn1yuq1kc",
    tags: ["銅質獎", "燈光"]
  },
  {
    id: 17,
    title: "《海港分局》2024海洋保育YTR創意影音競賽",
    category: "競賽與獎項",
    description: "最佳年度創作獎，參與腳本、導演、攝影與剪輯。",
    image: "https://i.ytimg.com/vi/T42roPDZz7E/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDKfmiz77w8xZmsA2tASRHQDzyYRg",
    link: "https://youtu.be/T42roPDZz7E",
    tags: ["最佳年度創作獎"]
  },
  {
    id: 18,
    title: "《無止 Noop》2023校園鑫馬獎",
    category: "競賽與獎項",
    description: "校園鑫馬獎佳作，擔任編劇、導演、攝影與剪輯。",
    image: "https://i.postimg.cc/MZ1PGgd3/maxresdefault.jpg",
    link: "https://youtu.be/6Q1uCk1cN88",
    tags: ["佳作", "導演"]
  },
  {
    id: 19,
    title: "《隧道盡頭的光》「拍桃園」短片徵件",
    category: "競賽與獎項",
    description: "橫式短片組佳作，負責攝影。",
    image: "https://i.postimg.cc/YCm1yH5D/sui-dao-de-jin-tou-de-guang.png",
    link: "https://youtu.be/Ql2GR9lwoHU",
    tags: ["佳作", "攝影"]
  },
  {
    id: 20,
    title: "《五燈有請》2025新北校園廣告人",
    category: "競賽與獎項",
    description: "30強入圍，負責攝影。",
    image: "https://i.postimg.cc/rwtSYkBb/wu-deng-jiang.png",
    link: "https://youtu.be/irGChK3z9jk",
    tags: ["30強入圍", "攝影"]
  },
  {
    id: 21,
    title: "《有你的路上》114年大專校院職涯輔導學生心得競賽",
    category: "競賽與獎項",
    description: "評審獎，擔任導演與攝影。",
    image: "https://i.postimg.cc/9Q0szJ4y/ying-mu-jie-tu-2026-04-21-ling-chen2-07-29.png",
    link: "https://youtu.be/ypIa8XxrBMc",
    tags: ["評審獎", "導演"]
  },
  {
    id: 22,
    title: "《這裡是夢想開始的地方》2024校園創意生活海報設計競賽",
    category: "競賽與獎項",
    description: "第一名，負責整體設計、繪圖與攝影。",
    image: "https://i.postimg.cc/0QK8m9bk/unnamed.jpg",
    link: "https://sites.google.com/view/2024posterdesign/%E5%BE%97%E7%8D%8E%E4%BD%9C%E5%93%81",
    tags: ["第一名", "平面設計"]
  },
  {
    id: 23,
    title: "「職場的黑暗序曲」微電影個人創作",
    category: "競賽與獎項",
    description: "短片創作，擔任導演、攝影與剪輯。",
    image: "https://i.postimg.cc/0yHRCLg5/ying-mu-jie-tu-2026-04-21-ling-chen2-06-04.png",
    link: "https://youtu.be/-9LCZ8lpLhs",
    tags: ["短片創作", "導演"]
  },
  // 劇情長片 / 攝影
  {
    id: 24,
    title: "《我的阿嬤是外星人》劇情片",
    category: "劇情長片 / 攝影",
    description: "獲得第51屆藝美獎「電視戲劇類最佳長片」。擔任導演、攝影與剪輯。",
    image: "https://i.postimg.cc/Y0nNGNVL/Still-2025-09-12-011601-1-36-1.png",
    link: "https://youtu.be/yNSRkhTBXkA",
    tags: ["最佳長片", "劇情片", "導演"]
  },
  {
    id: 25,
    title: "畢業製作攝影集",
    category: "劇情長片 / 攝影",
    description: "畢業製作主題攝影集，紀錄光影與情感的瞬間。",
    image: "https://i.postimg.cc/0Q32zbnr/ying-mu-jie-tu-2026-04-21-ling-chen2-48-48.png",
    link: "https://drive.google.com/drive/folders/142TIZTDtFBm84C7p5QI3cQ1KHYcCprP?usp=sharing",
    tags: ["攝影集", "攝影"],
    isBook: true,
    pages: [
      "https://i.postimg.cc/LXFmv6kM/ying-mu-jie-tu-2026-04-29-xia-wu1-02-58.png",
      "https://i.postimg.cc/wTqTSvCt/ying-mu-jie-tu-2026-04-29-xia-wu1-03-19.png",
      "https://i.postimg.cc/tCk7TP3s/ying-mu-jie-tu-2026-04-29-xia-wu1-03-39.png",
      "https://i.postimg.cc/7YwfwX2h/ying-mu-jie-tu-2026-04-29-xia-wu1-03-55.png",
      "https://i.postimg.cc/J4xtnJN0/ying-mu-jie-tu-2026-04-29-xia-wu1-04-05.png",
      "https://i.postimg.cc/5Nb6bpCt/ying-mu-jie-tu-2026-04-29-xia-wu1-04-26.png"
    ]
  },
  {
    id: 26,
    title: "pakyau_photography 個人攝影帳戶",
    category: "劇情長片 / 攝影",
    description: "個人攝影作品展示帳戶。",
    image: "https://i.postimg.cc/wvkQHYQh/ying-mu-jie-tu-2026-04-21-ling-chen2-44-18.png",
    link: "https://www.instagram.com/pakyau_photography/",
    tags: ["個人攝影"]
  },
  // 校內作品
  {
    id: 27,
    title: "《同樣一個你》2023銘傳電視台MV發表會",
    category: "校內作品",
    description: "獲「最佳MV」，擔任導演、攝影與剪輯。",
    image: "https://i.postimg.cc/NG89FxTf/ying-mu-jie-tu-2026-04-21-ling-chen1-45-25.png",
    link: "https://youtu.be/hOnRCdSDy0w",
    tags: ["最佳MV", "導演"]
  },
  {
    id: 28,
    title: "阿桑《葉子》綺Miranda翻唱MV",
    category: "校內作品",
    description: "合作MV製作，擔任製片、導演、攝影與剪輯。",
    image: "https://i.postimg.cc/mgFQ6sv5/ye-zi-MV.png",
    link: "https://youtu.be/Ov70xCmE3JI",
    tags: ["MV製作", "導演"]
  },
  {
    id: 29,
    title: "《哈囉台》校園街訪",
    category: "校內作品",
    description: "校園街訪影片，負責剪輯與企劃。",
    image: "https://i.postimg.cc/T2jL1cmb/ying-mu-jie-tu-2026-04-21-ling-chen1-39-52.png",
    link: "https://youtu.be/rQGYjaJSk80",
    tags: ["街訪", "剪輯"]
  },
  {
    id: 30,
    title: "《無界》性平議題PODCAST",
    category: "校內作品",
    description: "PODCAST 製作，負責剪輯、攝影與企劃。",
    image: "https://i.postimg.cc/y6hgxT9T/ying-mu-jie-tu-2026-04-21-ling-chen1-43-40.png",
    link: "https://youtu.be/fI4A_cIn0B8",
    tags: ["PODCAST", "剪輯"]
  },
  {
    id: 31,
    title: "好想愛這個世界啊 創作MV",
    category: "校內作品",
    description: "個人創作MV，擔任導演、攝影與剪輯。",
    image: "https://i.postimg.cc/76dCzB9W/ying-mu-jie-tu-2026-04-21-ling-chen1-32-02.png",
    link: "https://youtu.be/unIt62LbXbE",
    tags: ["MV創作", "導演"]
  },
  {
    id: 32,
    title: "Heineken 海尼根內部設計",
    category: "工作與專案經歷",
    description: "公共事務部媒體製作、素材整合與社群管理案例。",
    image: "https://i.postimg.cc/VkbjHwyS/hai-ni-gen-she-ji.png",
    link: "https://i.postimg.cc/VkbjHwyS/hai-ni-gen-she-ji.png",
    tags: ["平面設計", "海尼根"],
    isImage: true
  }
];

const SKILLS = [
  { name: "影片剪輯", icon: Video, level: "Expert" },
  { name: "平面攝影", icon: Camera, level: "Advanced" },
  { name: "平面設計", icon: Palette, level: "Advanced" },
  { name: "2D 平面動畫", icon: Layout, level: "Advanced" },
  { name: "動態攝影", icon: Video, level: "Advanced" },
  { name: "圖片後製", icon: Layers, level: "Expert" },
  { name: "社群經營", icon: Smartphone, level: "Expert" },
  { name: "平面動畫", icon: Layout, level: "Advanced" },
];

const EXPERIENCE = [
  {
    date: "2025.06 - 2025.12",
    company: "海尼根台灣股份有限公司",
    role: "公共事務部實習生",
    desc: "媒體製作、社群管理、公關行政。"
  },
  {
    date: "2024.06 - 2025.06",
    company: "錨點影音股份有限公司",
    role: "攝影助理",
    desc: "專案攝影與剪輯協助。"
  },
  {
    date: "2024.08 - now",
    company: "傻瓜機DUMBCAM",
    role: "社群經營者",
    desc: "品牌建立、美術設計、文案撰寫。"
  },
  {
    date: "2024",
    company: "JG陪你聊財經",
    role: "影片剪輯",
    desc: "系列影片剪輯與2D動畫製作。"
  }
];

const AWARDS = [
  "第51屆藝美獎 - 電視戲劇類最佳長片 (《我的阿嬤是外星人》)",
  "海洋保育YTR創意影競賽 - 最佳年度創作獎",
  "第十屆青春有影2024學盃 - 行銷組銅獎",
  "法務部113年全國學生犯罪預防創意短片 - 銅質獎",
  "2024校園創意生活海報設計競賽 - 第一名",
  "銘傳大學MV發表會 - 最佳MV (導演與攝影)",
  "2025新北校園廣告人 - 30強入圍"
];

const TOOLS = [
  {
    category: "Video & Motion",
    items: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Blender"]
  },
  {
    category: "Design & Photo",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Adobe Lightroom", "Canva"]
  },
  {
    category: "Web & AI Tools",
    items: ["Strikingly", "Claude", "Seedance 2.0", "Google AI Studio"]
  }
];

// --- Components ---

const VideoModal = ({ isOpen, onClose, videoUrl }: { isOpen: boolean; onClose: () => void; videoUrl: string }) => {
  if (!isOpen) return null;

  // Convert YouTube normal URL to embed URL
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtu.be')) {
        const id = url.split('/').pop()?.split('?')[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return `https://www.youtube.com/embed/${urlParams.get('v')}?autoplay=1`;
      }
    } catch (e) {
      console.error("Invalid URL", e);
    }
    return url;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-5xl aspect-video glass rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 glass rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={24} />
          </button>
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ImageModal = ({ isOpen, onClose, project }: { isOpen: boolean; onClose: () => void; project: any }) => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isOpen) setCurrentPage(0);
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const isBook = project.isBook && project.pages && project.pages.length > 0;
  const currentImage = isBook ? project.pages[currentPage] : project.image;

  const nextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage < project.pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-3 glass rounded-full hover:bg-white/10 transition-colors text-white shadow-2xl"
        >
          <X size={32} />
        </button>
        
        <div className="relative w-full max-w-5xl flex items-center justify-center gap-4">
          {isBook && currentPage > 0 && (
            <button 
              onClick={prevPage}
              className="absolute left-0 z-[110] p-4 glass rounded-full text-white hover:bg-white/10 transition-all -translate-x-full hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <motion.div
            key={currentPage}
            initial={{ 
              rotateY: isBook ? -90 : -20, 
              scale: 0.8, 
              opacity: 0,
              originX: 0
            }}
            animate={{ 
              rotateY: 0, 
              scale: 1, 
              opacity: 1 
            }}
            exit={{ 
              rotateY: isBook ? 90 : 20, 
              scale: 0.8, 
              opacity: 0 
            }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative group border-l-8 border-black/40 shadow-[30px_0_60px_rgba(0,0,0,0.6)] rounded-r-xl overflow-hidden bg-[#111]">
              <img 
                src={currentImage} 
                alt={`${project.title} - Page ${currentPage + 1}`} 
                className="max-w-full max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
              
              {isBook && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-[10px] text-white/80 font-bold">
                  {currentPage + 1} / {project.pages.length}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center gap-6">
              {isBook && (
                <div className="flex gap-4">
                  <button 
                    disabled={currentPage === 0}
                    onClick={prevPage}
                    className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${currentPage === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    上一頁
                  </button>
                  <button 
                    disabled={currentPage === project.pages.length - 1}
                    onClick={nextPage}
                    className={`px-6 py-2 rounded-full font-bold text-xs transition-all ${currentPage === project.pages.length - 1 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
                  >
                    下一頁
                  </button>
                </div>
              )}
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full font-bold text-xs text-white/60 transition-all flex items-center gap-2"
              >
                <ExternalLink size={14} /> 查看原始連結
              </a>
            </div>
          </motion.div>

          {isBook && currentPage < project.pages.length - 1 && (
            <button 
              onClick={nextPage}
              className="absolute right-0 z-[110] p-4 glass rounded-full text-white hover:bg-white/10 transition-all translate-x-full hidden md:block"
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || !isHome ? "py-4 glass shadow-lg" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          HENRY <span className="text-blue-500">LO</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest opacity-70">
          {isHome ? (
            <>
              {["Works", "Experience", "Skills", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-500 transition-colors">
                  {item}
                </a>
              ))}
              <Link to="/works" className="text-blue-500 hover:text-blue-400 font-bold">All Works</Link>
            </>
          ) : (
            <Link to="/" className="hover:text-blue-500 transition-colors">Back to Home</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8 md:mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-blue-500 font-medium uppercase tracking-[0.2em] text-[10px] md:text-sm"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const ProjectCard = ({ project, idx, onOpenModal }: { project: any; idx: number; onOpenModal?: (p: any) => void; key?: any }) => {
  const handleClick = (e: any) => {
    if ((project.isBook || project.isImage) && onOpenModal) {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="group relative"
      style={{ perspective: "1200px" }}
    >
      <div className={`glass rounded-2xl overflow-hidden hover:glow transition-all duration-700 ${project.isBook ? 'origin-left group-hover:rotate-y-[-15deg] group-hover:translate-x-4' : 'hover:-translate-y-2'}`}>
        <div className="aspect-video overflow-hidden relative" onClick={handleClick}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {project.isBook && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-blue-600/90 text-[8px] md:text-[10px] text-white font-bold rounded flex items-center gap-1 shadow-lg z-20">
              <Book size={10} /> 翻閱攝影集
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
            {project.isBook || project.isImage ? (
              <button
                onClick={handleClick}
                className="p-4 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform flex items-center gap-2 font-bold text-sm"
              >
                {project.isBook ? <Book size={20} /> : <Palette size={20} />}
                {project.isBook ? "開啟圖集" : "放大閱讀"}
              </button>
            ) : (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform flex items-center gap-2 font-bold text-sm"
              >
                <Play fill="white" size={24} />
              </a>
            )}
          </div>
        </div>
        <div className="p-4 md:p-6" onClick={handleClick}>
          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1 md:mb-2">{project.category}</p>
          <h3 className="text-[11px] md:text-xl font-bold mb-1 md:mb-2 leading-tight">{project.title}</h3>
          <p className="text-[10px] md:text-sm text-gray-400 mb-3 md:mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {project.tags.map((tag: string) => (
              <span key={tag} className="px-1.5 py-0.5 bg-white/5 rounded text-[9px] text-gray-500 uppercase font-bold tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/cinema/1920/1080?blur=5" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#050505]" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-500 font-semibold uppercase tracking-[0.3em] mb-4"
          >
            Content Creator & Visual Artist
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-9xl font-black mb-8 tracking-tighter"
          >
            盧栢賢 <span className="text-gradient">HENRY LO</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            <Link to="/works" className="px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm md:text-base font-bold transition-all glow flex items-center gap-2">
              View My Works <ChevronRight size={18} />
            </Link>
            <a href="#contact" className="px-6 py-3 md:px-8 md:py-4 glass hover:bg-white/10 rounded-full text-sm md:text-base font-bold transition-all">
              Get In Touch
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://i.postimg.cc/0Nnswb83/WEDQ83332.png" 
              alt="Henry Lo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
          </motion.div>
          <div>
            <SectionHeading title="個人簡介" subtitle="About Me" />
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed mb-6 md:mb-8"
            >
              我是一個喜歡探索與創新的，對新事物充滿興趣，總是願意嘗試不同的風格與敘事法。我空餘時間樂於學習新技能。從設計、攝影、剪輯、AI產製等。我的想法是我有什麼是對未來工作有用的，但還沒學到的都要去學！持續進步是必須的。
            </motion.p>
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <GraduationCap className="text-blue-500" size={20} /> 教育背景
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-300 font-bold">國立政治大學</p>
                    <p className="text-xs text-gray-500">傳播學院傳播碩士學位學程</p>
                    <p className="text-[10px] text-blue-500/80 font-medium tracking-wider">已錄取，2026年入學</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-bold">銘傳大學</p>
                    <p className="text-xs text-gray-500">新媒體暨傳播管理學系</p>
                    <p className="text-[10px] text-gray-400">2022 - 2026</p>
                    <p className="text-[10px] text-blue-400 font-bold">GPA : 3.9 / 4.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-bold">香港知專設計學院</p>
                    <p className="text-xs text-gray-500">APL電影及超媒體</p>
                    <p className="text-[10px] text-gray-400">2020 - 2021</p>
                    <p className="text-[10px] text-yellow-500/80 font-bold italic">榮獲應用學習獎學金</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <MapPin className="text-blue-500" size={20} /> 所在地
                </h4>
                <p className="text-sm text-gray-500">新北市三重區</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Awards */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="工作經歷" subtitle="Experience" />
          <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-10 relative before:hidden md:before:block before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative md:pl-12"
                >
                  <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-full glass items-center justify-center z-10">
                    <Briefcase size={16} className="text-blue-500" />
                  </div>
                  <p className="text-[10px] md:text-xs text-blue-500 font-bold mb-1">{exp.date}</p>
                  <h4 className="text-sm md:text-xl font-bold leading-tight">{exp.company}</h4>
                  <p className="text-[11px] md:text-sm text-gray-400 mb-1 md:mb-2">{exp.role}</p>
                  <p className="text-[10px] md:text-sm text-gray-500 line-clamp-3">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="競賽與獎項" subtitle="Achievements" />
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {AWARDS.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-3 md:p-6 glass rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 hover:bg-white/5 transition-colors text-center md:text-left"
                >
                  <div className="p-2 md:p-3 bg-blue-600/10 rounded-xl text-blue-500">
                    <Award size={16} className="md:w-5 md:h-5" />
                  </div>
                  <p className="text-[10px] md:text-sm font-medium text-gray-300 leading-tight">{award}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Works Section (Featured) */}
      <section id="works" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <SectionHeading title="精選作品" subtitle="Portfolio" />
            <Link to="/works" className="mb-12 text-blue-500 hover:text-blue-400 font-bold flex items-center gap-2 group">
              View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[2, 7, 8, 36, 13, 24].map((id, idx) => {
              const project = PROJECTS.find(p => p.id === id);
              return project ? <ProjectCard key={project.id} project={project} idx={idx} onOpenModal={setSelectedProject} /> : null;
            })}
          </div>
        </div>
      </section>

      <ImageModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
      
      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto bg-[#080808] rounded-3xl mb-12">
      <SectionHeading title="專業技能" subtitle="Expertise" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {SKILLS.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="p-8 glass rounded-2xl text-center hover:bg-white/5 transition-colors group"
          >
            <div className="mb-3 md:mb-4 inline-flex p-3 md:p-4 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <skill.icon size={24} className="md:w-8 md:h-8" />
            </div>
            <h4 className="font-bold mb-0.5 md:mb-1 text-sm md:text-base">{skill.name}</h4>
            <p className="text-[9px] md:text-xs text-gray-500 uppercase tracking-widest">{skill.level}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Tools Section */}
    <section className="py-24 px-6 max-w-7xl mx-auto mb-24">
      <SectionHeading title="使用軟體與工具" subtitle="Software & Tools" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {TOOLS.map((toolGroup, idx) => (
          <motion.div
            key={toolGroup.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 md:p-8 rounded-3xl border border-white/5"
          >
            <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-blue-500">{toolGroup.category}</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {toolGroup.items.map((tool) => (
                <span 
                  key={tool} 
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-full text-[11px] md:text-sm font-medium text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-default"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto text-center">
      <SectionHeading title="與我聯繫" subtitle="Contact" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-12 rounded-3xl max-w-3xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <a href="mailto:henrypakpak@gmail.com" className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all flex flex-col items-center gap-4">
            <Mail className="text-blue-500" size={32} />
            <span className="text-sm font-medium">henrypakpak@gmail.com</span>
          </a>
          <a href="tel:0933921903" className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all flex flex-col items-center gap-4">
            <Phone className="text-blue-500" size={32} />
            <span className="text-sm font-medium">0933921903</span>
          </a>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://linktr.ee/pakyau" target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-full hover:text-blue-500 transition-all">
            <ExternalLink size={24} />
          </a>
          <a href="#" className="p-4 glass rounded-full hover:text-blue-500 transition-all">
            <Instagram size={24} />
          </a>
          <a href="#" className="p-4 glass rounded-full hover:text-blue-500 transition-all">
            <Youtube size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  </div>
  );
};

const WorksPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const customOrder = [
    "社群經營",
    "工作與專案經歷",
    "劇情長片 / 攝影",
    "校內作品",
    "競賽與獎項",
    "2D及3D動畫作品"
  ];

  // Get all unique categories
  const allCategories = Array.from(new Set(PROJECTS.map(p => p.category)));
  
  // Sort based on customOrder, put any unknown categories at the end
  const categories = allCategories.sort((a, b) => {
    const indexA = customOrder.indexOf(a);
    const indexB = customOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const showreelUrl = "https://youtu.be/yjDfz0IFROA";

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
      </Link>
      
      <SectionHeading title="所有作品" subtitle="All Works" />
      
      {/* Category Jump Menu */}
      <div className="mb-12 flex flex-wrap gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map(category => (
          <a
            key={category}
            href={`#${category}`}
            className="px-6 py-2 glass rounded-full text-sm font-bold whitespace-nowrap hover:bg-blue-600 hover:text-white transition-all"
          >
            {category}
          </a>
        ))}
      </div>
      
      <div className="space-y-24">
        {categories.map(category => (
          <div key={category} id={category} className="scroll-mt-32">
            <h3 className="text-sm md:text-2xl font-bold mb-4 md:mb-8 border-l-4 border-blue-500 pl-4 uppercase tracking-wider">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {PROJECTS.filter(p => p.category === category).map((project, idx) => (
                <ProjectCard key={project.id} project={project} idx={idx} onOpenModal={setSelectedProject} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-16">
        <SectionHeading title="精華作品" subtitle="Visual Showreel" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer aspect-video rounded-3xl overflow-hidden glass glow shadow-2xl border border-white/5"
          onClick={() => setSelectedVideo(showreelUrl)}
        >
          <img 
            src="https://i.ytimg.com/vi/yjDfz0IFROA/maxresdefault.jpg" 
            alt="Showreel Preview" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
              <Play fill="white" size={40} className="ml-2" />
            </div>
            <div className="absolute bottom-8 left-8 text-left">
              <h3 className="text-2xl md:text-4xl font-bold mb-2">My Visual Showreel</h3>
              <p className="text-white/60 font-medium tracking-widest uppercase text-sm">Click to play in-site</p>
            </div>
          </div>
        </motion.div>
      </div>

      <VideoModal 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        videoUrl={selectedVideo || ""} 
      />

      <ImageModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<WorksPage />} />
        </Routes>
        {/* Footer */}
        <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs uppercase tracking-[0.2em]">
          <p>© 2026 HENRY LO. ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
