"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Play, Pause, SkipForward, SkipBack, Heart, Shuffle, Repeat, Camera, Send, MessageCircle, Music, Code2, Sparkles, Book, Globe, Server } from "lucide-react";

// --- TYPES ---
type Project = {
  title: string;
  category: string;
  url: string;
  description: string;
  tech: string[];
  icon: any;
};

type Track = {
  title: string;
  artist: string;
  image: string;
  url: string;
};

// --- DATA ---
const personalInfo = {
  name: "Dandi Eka Saputra",
  role: "Backend Developer",
  bio: "Backend Developer dengan spesialisasi dalam membangun sistem server-side yang tangguh. Berfokus pada skalabilitas, keamanan, dan efisiensi data menggunakan ekosistem Modern Javascript.",
  heroGif: "/thumbnail.gif", 
  birthDate: "2008-04-11",
};

// Updated Projects List
const projects: Project[] = [
  {
    title: "REST API",
    category: "Infrastructure",
    url: "https://api.danzy.web.id",
    description: "Layanan Public API berkinerja tinggi yang dirancang untuk skalabilitas. Menyediakan berbagai endpoint utilitas dengan dokumentasi lengkap.",
    tech: ["TypeScript", "Node.js", "Express", "MongoDB"],
    icon: Server
  },
  {
    title: "Class Website",
    category: "Academic Platform",
    url: "https://xiitjktb.web.id",
    description: "Platform digital terpusat untuk manajemen kelas XII TJKT B. Fitur meliputi jadwal pelajaran, galeri siswa, dan portal informasi.",
    tech: ["Next.js", "React", "Tailwind", "MongoDB"],
    icon: Globe
  },
  {
    title: "Diary",
    category: "Personal Blog",
    url: "https://sylvatica.my.id",
    description: "'Sylvatica' - Sebuah ruang digital personal untuk mencatat memori, pemikiran, dan cerita sehari-hari dengan antarmuka yang tenang.",
    tech: ["Astro", "Typescript", "MongoDB"],
    icon: Book
  },
];

const playlist: Track[] = [
  {
    title: "About You",
    artist: "The 1975",
    image: "https://i.scdn.co/image/ab67616d0000b27300702474f8e0e2b6155d48e3",
    url: "https://api.fabdl.com/spotify/download-mp3/f08d36314334858925b2f12b15d5c3f7",
  },
  {
    title: "watch",
    artist: "Billie Eilish",
    image: "https://i.scdn.co/image/ab67616d0000b273a9f6c04ba168640b48aa5795",
    url: "https://api.fabdl.com/spotify/download-mp3/6fc6fe9454a4f3ed09199f35e84a4140",
  },
  {
    title: "Strong",
    artist: "One Direction",
    image: "https://i.scdn.co/image/ab67616d0000b2732f76b797c382bedcafdf45e1",
    url: "https://api.fabdl.com/spotify/download-mp3/4f2d3cc48fb802ee304cc3b54c39b537",
  }
];

const socialMedia = [
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@danzz_yyyyyy?_r=1&_t=ZS-93J7njg239d",
    icon: Music,
    color: "group-hover:text-pink-400",
    bgColor: "hover:bg-pink-500/10 hover:border-pink-500/30"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/danzz_foryu?igsh=MXhwcHpuamY2NHgxNQ==",
    icon: Camera,
    color: "group-hover:text-purple-400",
    bgColor: "hover:bg-purple-500/10 hover:border-purple-500/30"
  },
  {
    name: "Telegram",
    url: "https://t.me/DanzzAraAra",
    icon: Send,
    color: "group-hover:text-sky-400",
    bgColor: "hover:bg-sky-500/10 hover:border-sky-500/30"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/84584810152",
    icon: MessageCircle,
    color: "group-hover:text-emerald-400",
    bgColor: "hover:bg-emerald-500/10 hover:border-emerald-500/30"
  },
  {
    name: "GitHub",
    url: "https://github.com/DanzzAraAra",
    icon: Github,
    color: "group-hover:text-white",
    bgColor: "hover:bg-white/10 hover:border-white/30"
  }
];

// --- UTILS ---
const calculateAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// --- COMPONENTS ---

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let boxes: any[] = [];
    
    // Soft warm colors for background
    const colors = ["#fbbf24", "#f472b6", "#fb7185"]; 
    const bgColor = "#0c0a09"; 

    const resize = () => {
      if (c) {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      }
    };

    const createBox = () => {
      const width = c ? c.width : window.innerWidth;
      const height = c ? c.height : window.innerHeight;
      let half_size = Math.floor((Math.random() * 20) + 10); // Smaller particles
      let x = Math.floor((Math.random() * width) + 1);
      let y = Math.floor((Math.random() * height) + 1);
      let r = Math.random() * Math.PI;
      const color = colors[Math.floor((Math.random() * colors.length))];
      const speed = (40 - half_size) / 40; // Slower movement

      return {
        x, y, r, half_size, color, speed,
        draw: () => {
          if (!ctx) return;
          ctx.beginPath();
          // Draw soft glowing circles instead of sharp squares
          ctx.arc(x, y, half_size, 0, 2 * Math.PI);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.03; // Very subtle
          ctx.fill();
          
          // Movement
          y -= speed;
          x += Math.sin(y * 0.01) * 0.5;

          if (y < -50) {
            y = height + 50;
            x = Math.random() * width;
          }
        }
      };
    };

    function draw() {
      if (!ctx || !c) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0,0, c.width, c.height);

      for (let i = 0; i < boxes.length; i++) {
        boxes[i].draw();
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    boxes = [];
    while (boxes.length < 30) {
      boxes.push(createBox());
    }
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = playlist[currentTrackIndex];
  const currentPercentage = duration ? (progress / duration) * 100 : 0;

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Autoplay blocked:", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  const handlePrev = () => setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-6 w-full max-w-[320px] mx-auto"
    >
      <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col gap-5 overflow-hidden group">
        
        {/* Soft Glow Background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex gap-4 items-center mb-6">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border border-white/10">
               <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover animate-[spin_10s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
            </div>
            <div className="flex-1 overflow-hidden">
                <h3 className="font-bold text-stone-100 text-lg truncate">{currentTrack.title}</h3>
                <p className="text-xs text-stone-400 truncate mt-1">{currentTrack.artist}</p>
            </div>
            <Heart size={20} className="text-stone-500 hover:text-rose-500 transition-colors cursor-pointer" />
          </div>

          {/* Progress Bar */}
          <div className="mb-4 group/slider">
             <div className="relative w-full h-1 bg-stone-700/30 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full"
                  style={{ width: `${currentPercentage}%` }}
                ></div>
             </div>
             <div className="flex justify-between text-[10px] text-stone-500 font-medium mt-1.5 font-mono">
                 <span>{formatTime(progress)}</span>
                 <span>{formatTime(duration)}</span>
             </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center px-1">
             <Shuffle size={16} className="text-stone-600 hover:text-stone-300" />
             <SkipBack size={24} onClick={handlePrev} className="text-stone-300 hover:text-white cursor-pointer" fill="currentColor" />
             
             <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="w-12 h-12 rounded-full bg-stone-100 text-stone-900 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
             >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </button>

             <SkipForward size={24} onClick={handleNext} className="text-stone-300 hover:text-white cursor-pointer" fill="currentColor" />
             <Repeat size={16} className="text-stone-600 hover:text-stone-300" />
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={() => audioRef.current && setProgress(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={handleNext} 
      />
    </motion.div>
  );
};

const JsonProfile = () => {
  const [age, setAge] = useState(0);
  useEffect(() => setAge(calculateAge(personalInfo.birthDate)), []);

  const stackList = [
    { name: "Node.js", color: "#86efac" }, // Soft Green
    { name: "Mongo", color: "#fde047" },   // Soft Yellow
    { name: "React", color: "#93c5fd" },   // Soft Blue
    { name: "Next", color: "#cbd5e1" },    // Soft Grey
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="font-mono text-xs md:text-sm bg-stone-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative w-full hover:border-white/10 transition-colors"
    >
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="ml-auto text-[10px] text-stone-500">profile.json</span>
      </div>

      <div className="text-stone-400 space-y-1">
        <div><span className="text-rose-400">const</span> <span className="text-amber-300">developer</span> = {"{"}</div>
        <div className="pl-4">
          <div><span className="text-purple-300">name</span>: <span className="text-stone-200">"{personalInfo.name}"</span>,</div>
          <div><span className="text-purple-300">age</span>: <span className="text-orange-300">{age}</span>,</div>
          <div><span className="text-purple-300">status</span>: <span className="text-emerald-300">"Building Dreams"</span>,</div>
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-purple-300">stack</span>: [
            {stackList.map((item, i) => (
              <span key={i} style={{ color: item.color }}>"{item.name}"{i < stackList.length - 1 ? "," : ""}</span>
            ))}
            ]
          </div>
        </div>
        <div>{"};"}</div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, active }: { project: Project; active: boolean }) => {
  const Icon = project.icon;
  return (
    <motion.div
      animate={{
        scale: active ? 1 : 0.96,
        opacity: active ? 1 : 0.6,
        filter: active ? "blur(0px)" : "blur(1px)",
      }}
      className={`group relative h-[300px] flex flex-col justify-between p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
        active 
          ? "bg-white/5 border-white/10 shadow-[0_0_30px_rgba(251,146,60,0.05)]" 
          : "bg-stone-900/20 border-white/5"
      }`}
    >
      {/* Dynamic Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-amber-200 group-hover:scale-110 transition-transform duration-300">
             <Icon size={24} />
          </div>
          <a href={project.url} target="_blank" className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <ExternalLink size={20} className="text-stone-500 group-hover:text-stone-200" />
          </a>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-stone-100 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-rose-200 transition-all">
          {project.title}
        </h3>
        
        <p className="text-sm text-stone-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
        {project.tech.map((t, i) => (
          <span 
            key={i}
            className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-stone-400 group-hover:border-white/10 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000); // Slower interval for better readability
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="w-full relative py-8" 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden w-full max-w-4xl mx-auto">
        <motion.div
          className="flex"
          animate={{ x: `calc(-${currentIndex} * 100%)` }} 
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2 md:px-12">
              <ProjectCard project={project} active={currentIndex === index} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {projects.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className="group p-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-8 bg-gradient-to-r from-amber-400 to-rose-400" 
                : "w-2 bg-stone-800 group-hover:bg-stone-700"
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 selection:bg-rose-500/30 selection:text-white font-sans overflow-x-hidden">
      
      <CanvasBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-24">
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-24"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-black font-bold text-sm">
                DS
            </div>
            <span className="font-semibold tracking-tight text-stone-300">Dandi Saputra</span>
          </div>
          <a href="https://github.com/DanzzAraAra" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <Github size={20} className="text-stone-400" />
          </a>
        </motion.nav>

        {/* Hero Section */}
        <section className="flex flex-col gap-12 mb-32">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-3 order-2 md:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-amber-300 mb-6">
                <Sparkles size={12} />
                <span>Backend Enthusiast</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white leading-[1.1]">
                Designing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300">
                  Invisible Systems
                </span>
              </h1>
              
              <p className="text-stone-400 text-lg leading-relaxed max-w-xl mb-8">
                Hi, saya Dandi. Saya membangun arsitektur backend yang aman dan efisien. 
                Mengubah logika kompleks menjadi API yang elegan menggunakan teknologi modern.
              </p>

              <div className="flex gap-4">
                 <button className="px-6 py-3 rounded-full bg-stone-100 text-stone-900 font-semibold hover:bg-white transition-colors">
                    Explore Projects
                 </button>
                 <button className="px-6 py-3 rounded-full border border-stone-800 text-stone-400 hover:border-stone-600 hover:text-stone-200 transition-all">
                    Contact Me
                 </button>
              </div>
            </motion.div>

            {/* Profile Widget Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-2 order-1 md:order-2 flex flex-col gap-6"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-rose-500/20 rounded-3xl blur-2xl group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[16/10]">
                    <img src={personalInfo.heroGif} alt="Hero" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80"></div>
                </div>
              </div>
              <JsonProfile />
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-32">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
            <p className="text-stone-500">Kumpulan proyek terbaru yang telah saya kerjakan</p>
          </div>
          <ProjectCarousel />
        </section>

        {/* Music & Socials Combined */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
           <div>
              <h3 className="text-2xl font-bold mb-6">Current Vibe</h3>
              <MusicPlayer />
           </div>
           
           <div>
              <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    className={`p-4 rounded-xl border border-stone-800 bg-stone-900/30 flex items-center gap-3 transition-all duration-300 group ${social.bgColor}`}
                  >
                    <social.icon size={20} className={`text-stone-400 transition-colors ${social.color}`} />
                    <span className="text-sm font-medium text-stone-400 group-hover:text-stone-200">{social.name}</span>
                  </a>
                ))}
              </div>
           </div>
        </section>

        <footer className="pt-10 border-t border-stone-900 text-center">
          <p className="text-stone-600 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Dandi Eka Saputra
          </p>
        </footer>

      </div>
    </div>
  );
}
