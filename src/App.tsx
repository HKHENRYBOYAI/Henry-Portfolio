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
  ExternalLink, 
  Award, 
  GraduationCap, 
  Briefcase,
  Instagram,
  Youtube,
  Linkedin,
  ChevronRight,
  Play,
  Smartphone,
  Layout,
  Layers
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Data ---

const PROJECTS = [
  {
    id: 1,
    title: "MoneyDive YT 頻道",
    category: "Video Editing",
    description: "負責剪輯，了解影音公司工作流程，提升與主管溝通效率。",
    image: "https://picsum.photos/seed/money/800/450",
    link: "https://youtu.be/nauW1l-nJg0",
    tags: ["Premiere Pro", "After Effects"]
  },
  {
    id: 2,
    title: "JG陪你聊財經",
    category: "Motion Graphics",
    description: "以2D動畫介紹複雜的財經知識，應用於剪輯工作中。",
    image: "https://picsum.photos/seed/finance/800/450",
    link: "https://youtu.be/nauW1l-nJg0",
    tags: ["2D Animation", "Financial Content"]
  },
  {
    id: 3,
    title: "Heineken 海報製作",
    category: "Graphic Design",
    description: "公共事務部門實習，進行媒體製作與社群管理。",
    image: "https://picsum.photos/seed/heineken/800/450",
    link: "#",
    tags: ["Photoshop", "Illustrator"]
  },
  {
    id: 4,
    title: "DUMBCAM 社群經營",
    category: "Social Media",
    description: "自行建立品牌，訓練多方面能力整合，達成3000+追蹤。",
    image: "https://picsum.photos/seed/dumbcam/800/450",
    link: "https://www.threads.com/@_dumbcam_",
    tags: ["Branding", "Content Strategy"]
  },
  {
    id: 5,
    title: "3D 建模作品",
    category: "3D Modeling",
    description: "課堂基礎建模配合網路自學，進行實踐練習。",
    image: "https://picsum.photos/seed/3d/800/450",
    link: "https://youtu.be/vTF4hk4pOIw",
    tags: ["Blender", "3D Modeling"]
  },
  {
    id: 6,
    title: "海洋保育YTR創意影競賽",
    category: "Award Winning",
    description: "《海港分局》最佳年度創作獎，從腳本到拍攝全參與。",
    image: "https://picsum.photos/seed/ocean/800/450",
    link: "https://youtu.be/T42roPDZz7E",
    tags: ["Director", "Cinematography"]
  }
];

const SKILLS = [
  { name: "影片剪輯", icon: Video, level: "Expert" },
  { name: "平面攝影", icon: Camera, level: "Advanced" },
  { name: "平面設計", icon: Palette, level: "Advanced" },
  { name: "3D 建模", icon: Box, level: "Intermediate" },
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
    date: "2024",
    company: "JG陪你聊財經",
    role: "影片剪輯",
    desc: "系列影片剪輯製作。"
  }
];

const AWARDS = [
  "海洋保育YTR創意影競賽 - 最佳年度創作獎",
  "第十屆青春有影2024學盃 - 行銷組銅獎",
  "法務部113年全國學生犯罪預防創意短片 - 銅質獎",
  "2024校園創意生活海報設計競賽 - 第一名",
  "銘傳大學MV發表會 - 最佳MV (導演與攝影)"
];

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 glass shadow-lg" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          HENRY <span className="text-blue-500">LO</span>
        </motion.div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest opacity-70">
          {["Works", "Skills", "Experience", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-500 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-blue-500 font-medium uppercase tracking-widest text-sm"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  return (
    <div className="relative">
      <Navbar />

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
            className="text-6xl md:text-9xl font-black mb-8 tracking-tighter"
          >
            盧栢賢 <span className="text-gradient">HENRY LO</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#works" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all glow flex items-center gap-2">
              View My Works <ChevronRight size={18} />
            </a>
            <a href="#contact" className="px-8 py-4 glass hover:bg-white/10 rounded-full font-bold transition-all">
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
              src="https://picsum.photos/seed/henry/600/800" 
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
              className="text-xl text-gray-400 leading-relaxed mb-8"
            >
              我是一個喜歡探索與創新的，對新事物充滿興趣，總是願意嘗試不同的風格與敘事法。我空餘時間樂於學習新技能。從設計、攝影、剪輯、AI產製等。我的想法是我有什麼是對未來工作有用的，但還沒學到的都要去學！持續進步是必須的。
            </motion.p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                  <GraduationCap className="text-blue-500" size={20} /> 教育背景
                </h4>
                <p className="text-sm text-gray-500">銘傳大學 新媒體暨傳播管理學系</p>
                <p className="text-xs text-gray-400">2022 - Now</p>
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

      {/* Works Section */}
      <section id="works" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="精選作品" subtitle="Portfolio" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative glass rounded-2xl overflow-hidden hover:glow transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-blue-600 rounded-full text-white hover:scale-110 transition-transform">
                      <Play fill="white" size={24} />
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-blue-500 font-bold uppercase tracking-widest mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
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
              <div className="mb-4 inline-flex p-4 bg-blue-600/10 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <skill.icon size={32} />
              </div>
              <h4 className="font-bold mb-1">{skill.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{skill.level}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience & Awards */}
      <section id="experience" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="工作經歷" subtitle="Experience" />
            <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full glass flex items-center justify-center z-10">
                    <Briefcase size={16} className="text-blue-500" />
                  </div>
                  <p className="text-xs text-blue-500 font-bold mb-1">{exp.date}</p>
                  <h4 className="text-xl font-bold">{exp.company}</h4>
                  <p className="text-sm text-gray-400 mb-2">{exp.role}</p>
                  <p className="text-sm text-gray-500">{exp.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="競賽與獎項" subtitle="Achievements" />
            <div className="space-y-4">
              {AWARDS.map((award, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 glass rounded-2xl flex items-start gap-4 hover:bg-white/5 transition-colors"
                >
                  <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500">
                    <Award size={20} />
                  </div>
                  <p className="text-sm font-medium text-gray-300 leading-relaxed">{award}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
          <h3 className="text-3xl font-bold mb-8">準備好開始下一個專案了嗎？</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <a href="mailto:henrypakpak@gmail.com" className="p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-all flex flex-col items-center gap-4">
              <Mail className="text-blue-500" size={32} />
              <span className="text-sm font-medium">henrypakpak@gmail.com</span>
            </a>
            <div className="p-6 bg-white/5 rounded-2xl flex flex-col items-center gap-4">
              <MapPin className="text-blue-500" size={32} />
              <span className="text-sm font-medium">新北市三重區</span>
            </div>
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

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs uppercase tracking-[0.2em]">
        <p>© 2026 HENRY LO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
