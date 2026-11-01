import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AWARDS, CATEGORIES, EXPERIENCE, FEATURED, HERO_STILL, PORTRAIT, SHOWREEL, WORKS,
  type Category, type Work,
} from './data';

// ---------- helpers ----------

function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
    if (u.hostname.endsWith('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const m = u.pathname.match(/^\/(?:embed|shorts)\/([^/?]+)/);
      if (m) return m[1];
    }
  } catch { /* not a URL */ }
  return null;
}

type Viewer =
  | { kind: 'video'; id: string; title: string; link: string }
  | { kind: 'book'; pages: string[]; title: string; link: string };

function viewerFor(w: Work): Viewer | null {
  if (w.pages && w.pages.length) return { kind: 'book', pages: w.pages, title: w.title, link: w.link };
  const id = youtubeId(w.link);
  if (id) return { kind: 'video', id, title: w.title, link: w.link };
  return null;
}

const catLabel = (c: Category) => CATEGORIES.find((x) => x.key === c)?.label ?? '';

// ---------- small pieces ----------

function PlayBadge({ kind }: { kind: 'video' | 'book' | 'link' }) {
  const label = kind === 'video' ? '播放' : kind === 'book' ? '翻閱' : '開啟';
  return (
    <span className="badge" aria-hidden="true">
      {kind === 'video' && <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>}
      {kind === 'book' && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" /></svg>}
      {kind === 'link' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17 17 7M8 7h9v9" /></svg>}
      {label}
    </span>
  );
}

function WorkLink({ work, onOpen, className, children }: {
  work: Work; onOpen: (v: Viewer) => void; className?: string; children?: any; key?: string;
}) {
  const v = viewerFor(work);
  return (
    <a
      className={className}
      href={work.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        if (!v || e.metaKey || e.ctrlKey || e.shiftKey) return; // 讓 ⌘/Ctrl+點擊仍可開新分頁
        e.preventDefault();
        onOpen(v);
      }}
    >
      {children}
    </a>
  );
}

function Thumb({ work, pos }: { work: Work; pos?: string }) {
  const v = viewerFor(work);
  return (
    <div className="thumb-wrap">
      <img className="thumb" src={work.img} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" style={pos ? { objectPosition: pos } : undefined} />
      <PlayBadge kind={v ? v.kind : 'link'} />
    </div>
  );
}

// ---------- viewer (video / photobook) ----------

function ViewerModal({ viewer, onClose }: { viewer: Viewer; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = viewer.kind === 'book' ? viewer.pages.length : 0;

  const go = useCallback((d: 1 | -1) => {
    setPage((p) => {
      const n = p + d;
      if (n < 0 || n >= total) return p;
      setDir(d);
      return n;
    });
  }, [total]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose, go]);

  // 只預載下一頁，不一次載入整本
  useEffect(() => {
    if (viewer.kind === 'book' && page + 1 < total) {
      const img = new Image();
      img.src = viewer.pages[page + 1];
    }
  }, [viewer, page, total]);

  // 手機左右滑動翻頁
  const touchX = useRef<number | null>(null);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={viewer.title} onClick={onClose}>
      <div className="modal-bar" onClick={(e) => e.stopPropagation()}>
        <p className="modal-title">{viewer.title}</p>
        <div className="modal-actions">
          <a href={viewer.link} target="_blank" rel="noopener noreferrer" className="ghost-btn">原始連結</a>
          <button ref={closeRef} type="button" className="icon-btn" aria-label="關閉" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </div>

      {viewer.kind === 'video' ? (
        <div className="video-box" onClick={(e) => e.stopPropagation()}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${viewer.id}?autoplay=1&rel=0&playsinline=1`}
            title={viewer.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className="book"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <button type="button" className="icon-btn book-nav" aria-label="上一頁" disabled={page === 0} onClick={() => go(-1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <div className="page-stage">
            {failed[page] ? (
              <div className="page-error">
                <p>這一頁的圖片暫時無法載入。</p>
                <a href={viewer.link} target="_blank" rel="noopener noreferrer" className="pill outline">到原始連結看完整作品</a>
              </div>
            ) : (
              <img
                key={page}
                className={`page ${dir === 1 ? 'flip-next' : 'flip-prev'}`}
                src={viewer.pages[page]}
                alt={`${viewer.title} 第 ${page + 1} 頁`}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setFailed((f) => ({ ...f, [page]: true }))}
              />
            )}
          </div>
          <button type="button" className="icon-btn book-nav" aria-label="下一頁" disabled={page === total - 1} onClick={() => go(1)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
          </button>
          {total > 1 && <p className="page-count">{page + 1} / {total}</p>}
        </div>
      )}
    </div>
  );
}

// ---------- page ----------

export default function App() {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const close = useCallback(() => setViewer(null), []);

  const byId = useMemo(() => Object.fromEntries(WORKS.map((w) => [w.id, w])), []);
  const shown = filter === 'all' ? WORKS : WORKS.filter((w) => w.cat === filter);
  const note = CATEGORIES.find((c) => c.key === filter)?.note;
  const featured = FEATURED.map((f) => ({ ...f, work: byId[f.id] })).filter((f) => f.work);
  const showreelId = youtubeId(SHOWREEL);

  return (
    <div className="site">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="主選單">
          <a href="#top" className="logo">
            <span className="logo-zh">盧栢賢</span>
            <span className="mono logo-en">HENRY LO</span>
          </a>
          <div className="nav-links">
            <a href="#works">作品</a>
            <a href="#experience">經歷</a>
            <a href="#awards">獲獎</a>
            <a href="#about">關於</a>
            <a href="#contact" className="pill accent">與我聯絡</a>
          </div>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="container hero">
          <p className="mono kicker accent-text">CONTENT CREATOR</p>
          <h1 className="hero-title">盧栢賢 <span className="hero-en">Henry Lo</span></h1>
          <p className="skills-line">
            {['影片企劃', '影片剪接', '動態攝影', '平面攝影', '圖片後製'].map((s, i) => (
              <span key={s}>{i > 0 && <span className="sep" aria-hidden="true">|</span>}{s}</span>
            ))}
          </p>
          <div className="hero-ctas">
            <button
              type="button"
              className="pill light"
              onClick={() => showreelId && setViewer({ kind: 'video', id: showreelId, title: 'Showreel', link: SHOWREEL })}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z" /></svg>
              看 Showreel
            </button>
            <a href="#works" className="pill outline">瀏覽全部作品</a>
          </div>
        </section>

        <section className="container" aria-label="代表劇照">
          <figure className="still">
            <div className="still-frame">
              <img src={HERO_STILL} alt="《我的阿嬤是外星人》劇照" fetchPriority="high" referrerPolicy="no-referrer" />
            </div>
            <figcaption className="mono caption">
              <span>STILL — 《我的阿嬤是外星人》 劇情長片</span>
              <span>導演・編劇・攝影・剪輯</span>
            </figcaption>
          </figure>
        </section>

        <section className="container facts" aria-label="重點資訊">
          <div className="facts-grid">
            <div><p className="mono label">NOW</p><p className="strong">政大傳播碩士學位學程</p><p className="muted sm">碩一在學</p></div>
            <div><p className="mono label">RECENT</p><p className="strong">海尼根台灣 公共事務部</p><p className="muted sm">實習生，2025.06–12</p></div>
            <div><p className="mono label">AWARD</p><p className="strong">藝美獎 最佳長片</p><p className="muted sm">另有 10 項競賽得獎／入圍</p></div>
            <div><p className="mono label">SIDE PROJECT</p><p className="strong">DUMBCAM 傻瓜機</p><p className="muted sm">從 0 經營到 3,000+ 追蹤</p></div>
          </div>
        </section>

        {/* FEATURED */}
        <section className="container section" aria-labelledby="featured-h">
          <div className="section-head">
            <h2 id="featured-h" className="h2">精選作品</h2>
            <p className="mono label">SELECTED WORKS 01—06</p>
          </div>
          <div className="featured-top">
            {featured.slice(0, 1).map((f, i) => (
              <WorkLink key={f.id} work={f.work} onOpen={setViewer} className="card feat-main">
                <Thumb work={f.work} />
                <div className="card-row">
                  <span className="mono num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    {f.badge && <p className="award">{f.badge}</p>}
                    <h3 className="ctitle feat-title">《{f.work.title}》</h3>
                    <p className="muted">{f.desc}</p>
                  </div>
                </div>
              </WorkLink>
            ))}
            <div className="feat-side">
              {featured.slice(1, 3).map((f, i) => (
                <WorkLink key={f.id} work={f.work} onOpen={setViewer} className="card">
                  <Thumb work={f.work} />
                  <div className="card-row">
                    <span className="mono num">{String(i + 2).padStart(2, '0')}</span>
                    <div>
                      {f.badge && <p className="award">{f.badge}</p>}
                      <h3 className="ctitle h3">{f.work.title}</h3>
                      <p className="muted sm">{f.desc}</p>
                    </div>
                  </div>
                </WorkLink>
              ))}
            </div>
          </div>
          <div className="featured-bottom">
            {featured.slice(3).map((f, i) => (
              <WorkLink key={f.id} work={f.work} onOpen={setViewer} className="card">
                <Thumb work={f.work} pos={f.id === 'dream' ? 'center 30%' : undefined} />
                <div className="card-row">
                  <span className="mono num">{String(i + 4).padStart(2, '0')}</span>
                  <div>
                    {f.badge && <p className="award">{f.badge}</p>}
                    <h3 className="ctitle h3">{f.work.title}</h3>
                    <p className="muted sm">{f.desc}</p>
                  </div>
                </div>
              </WorkLink>
            ))}
          </div>
        </section>

        {/* INDEX */}
        <section id="works" className="container section">
          <div className="section-head">
            <h2 className="h2">全部作品</h2>
            <p className="mono label">INDEX — {WORKS.length} PROJECTS</p>
          </div>
          <div className="filters" role="group" aria-label="依專長篩選">
            {CATEGORIES.map((c) => {
              const n = c.key === 'all' ? WORKS.length : WORKS.filter((w) => w.cat === c.key).length;
              const active = filter === c.key;
              return (
                <button key={c.key} type="button" aria-pressed={active} className={`chip ${active ? 'active' : ''}`} onClick={() => setFilter(c.key)}>
                  {c.label} <span className="mono count">{n}</span>
                </button>
              );
            })}
          </div>
          {note && <p className="muted sm filter-note">{note}</p>}
          <div className="grid">
            {shown.map((w) => (
              <WorkLink key={w.id} work={w} onOpen={setViewer} className="card">
                <Thumb work={w} />
                <p className="mono meta">{catLabel(w.cat)} · {w.meta}</p>
                <h3 className="ctitle h4">{w.title}</h3>
                <p className="muted sm">{w.role}</p>
                {w.award && <p className="award sm-award">{w.award}</p>}
              </WorkLink>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="container section split">
          <div className="split-head">
            <h2 className="h2">經歷</h2>
            <p className="mono label">EXPERIENCE</p>
          </div>
          <ol className="timeline">
            {EXPERIENCE.map((e) => (
              <li key={e.org}>
                <span className="mono date">{e.date}</span>
                <div>
                  <h3 className="h3">{e.org} <span className="muted normal">／ {e.role}</span></h3>
                  <p className="soft">{e.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* AWARDS */}
        <section id="awards" className="container section split">
          <div className="split-head">
            <h2 className="h2">獲獎</h2>
            <p className="mono label">AWARDS</p>
          </div>
          <div className="table-box">
            <table className="awards">
              <thead>
                <tr className="mono"><th scope="col">YEAR</th><th scope="col">競賽</th><th scope="col">成績</th><th scope="col">作品</th></tr>
              </thead>
              <tbody>
                {AWARDS.map((a) => (
                  <tr key={a.event + a.work}>
                    <td className="mono muted">{a.year}</td>
                    <td>{a.event}</td>
                    <td className="accent-text strong">{a.result}</td>
                    <td className="soft">{a.work}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="container section split">
          <div className="split-head about-side">
            <h2 className="h2">關於我</h2>
            <p className="mono label">ABOUT</p>
            <img className="portrait" src={PORTRAIT} alt="盧栢賢的個人照" loading="lazy" referrerPolicy="no-referrer" />
          </div>
          <div className="about-main">
            <p className="about-lead">我喜歡探索與創新，願意嘗試不同的風格與敘事手法。從設計、攝影、剪輯到 AI 產製。</p>
            <div className="about-grid">
              <div>
                <h3 className="mono label">EDUCATION</h3>
                <ul className="plain">
                  <li><p className="strong">國立政治大學</p><p className="muted sm">傳播學院 傳播碩士學位學程｜2026 — 在學</p></li>
                  <li><p className="strong">銘傳大學</p><p className="muted sm">新媒體暨傳播管理學系｜2022 — 2026｜GPA 3.9 / 4.0</p></li>
                  <li><p className="strong">香港知專設計學院</p><p className="muted sm">APL 電影及超媒體｜2020 — 2021｜應用學習獎學金</p></li>
                </ul>
              </div>
              <div>
                <h3 className="mono label">WHAT I DO</h3>
                <ul className="plain">
                  <li><p className="strong">影像</p><p className="muted sm">影片企劃、導演、動態攝影、剪接（以剪輯構築故事、掌控節奏）</p></li>
                  <li><p className="strong">設計與動態</p><p className="muted sm">平面設計、圖片後製、2D 動畫、3D 建模</p></li>
                  <li><p className="strong">品牌傳播</p><p className="muted sm">自媒體經營、社群內容企劃、文案</p></li>
                </ul>
              </div>
              <div>
                <h3 className="mono label">TOOLS</h3>
                <p className="soft sm loose">Premiere Pro・After Effects・DaVinci Resolve・Lightroom・Photoshop・Illustrator・InDesign・Blender・Canva・Strikingly</p>
              </div>
              <div>
                <h3 className="mono label">CERTIFICATES</h3>
                <p className="soft sm loose">多益 760 分<br />Google Analytics Certification<br />語言：中文、粵語、英文</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="container contact-inner">
          <p className="mono kicker accent-text">CONTACT</p>
          <h2 className="contact-title">聯絡方式</h2>
          <dl className="contact-list">
            <div>
              <dt className="mono label">EMAIL</dt>
              <dd><a href="mailto:henrypakpak@gmail.com">henrypakpak@gmail.com</a></dd>
            </div>
            <div>
              <dt className="mono label">手機</dt>
              <dd><a href="tel:+886933921903">0933 921 903</a></dd>
            </div>
            <div>
              <dt className="mono label">LINE</dt>
              <dd>@hkhenryboy</dd>
            </div>
          </dl>
        </div>
        <footer className="container mono footer">
          <span>© 2026 HENRY LO 盧栢賢</span>
          <span>新北市・台北</span>
        </footer>
      </section>

      {viewer && <ViewerModal viewer={viewer} onClose={close} />}
    </div>
  );
}
