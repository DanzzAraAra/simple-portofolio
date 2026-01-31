"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Github, Zap, Play, Pause, SkipForward, SkipBack, Heart, ListMusic, Repeat, Shuffle, Music, Camera, Send, MessageCircle, Mail } from "lucide-react";

type Project = {
  title: string;
  category: string;
  url: string;
  description: string;
  tech: string[];
};

type Track = {
  title: string;
  artist: string;
  image: string;
  url: string;
};

const personalInfo = {
  name: "Dandi Eka Saputra",
  role: "Backend Developer",
  bio: "Backend Developer dengan spesialisasi dalam membangun sistem server-side yang tangguh dan pipeline data yang efisien. Berpengalaman dalam pengembangan REST API, integrasi database, dan optimasi performa sistem. Menggunakan MongoDB sebagai database backend untuk solusi yang skalabel dan fleksibel.",
  heroGif: "/thumbnail.gif", 
  birthDate: "2008-04-11",
};

const projects: Project[] = [
  {
    title: "REST API",
    category: "Backend Infrastructure",
    url: "https://api.danzy.web.id",
    description: "Robust REST API service built with Express.js and TypeScript, featuring comprehensive documentation.",
    tech: ["Express.js", "Typescript", "HTML", "CSS"],
  },
  {
    title: "Class Website",
    category: "Full Stack",
    url: "https://xiitjktb.web.id",
    description: "Dynamic class management platform with server-side rendering for educational collaboration.",
    tech: ["EJS", "Typescript", "MongoDB"],
  },
  {
    title: "Diary",
    category: "Web Application",
    url: "https://sylvatica.my.id",
    description: "Personal diary application with modern architecture using Astro framework and MongoDB database.",
    tech: ["Astro", "Typescript", "MongoDB"],
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
    color: "hover:text-[#FF0050]",
    bgColor: "bg-gradient-to-br from-[#FF0050]/10 to-[#FF0050]/5"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/danzz_foryu?igsh=MXhwcHpuamY2NHgxNQ==",
    icon: Camera,
    color: "hover:text-[#E4405F]",
    bgColor: "bg-gradient-to-br from-[#E4405F]/10 to-[#833AB4]/5"
  },
  {
    name: "Telegram",
    url: "https://t.me/DanzzAraAra",
    icon: Send,
    color: "hover:text-[#26A5E4]",
    bgColor: "bg-gradient-to-br from-[#26A5E4]/10 to-[#0088cc]/5"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/84584810152",
    icon: MessageCircle,
    color: "hover:text-[#25D366]",
    bgColor: "bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/5"
  },
  {
    name: "GitHub",
    url: "https://github.com/DanzzAraAra",
    icon: Github,
    color: "hover:text-white",
    bgColor: "bg-gradient-to-br from-stone-800/30 to-stone-900/20"
  }
];

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

const CanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    interface Point { x: number; y: number; }
    
    interface Box {
      half_size: number;
      x: number;
      y: number;
      r: number;
      shadow_length: number;
      color: string;
      speed: number;
      getDots: () => { p1: Point; p2: Point; p3: Point; p4: Point };
      rotate: () => void;
      draw: () => void;
      drawShadow: () => void;
    }

    let boxes: Box[] = [];
    
    // Warna yang lebih lembut: lavender, pastel pink, pastel blue
    const colors = ["#C4B5FD", "#FBCFE8", "#BFDBFE"]; 
    const bgColor = "#FAFAF9"; // stone-50 yang lebih lembut
    const lightColor = "#E7E5E4"; // stone-200 yang lembut
    
    const light = { x: 160, y: 200 };

    const resize = () => {
      if (c) {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
      }
    };

    function drawLight() {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
      let gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
      gradient.addColorStop(0, lightColor); 
      gradient.addColorStop(1, bgColor);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
      gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 15);
      gradient.addColorStop(0, "#FFFFFF");
      gradient.addColorStop(1, lightColor);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    const createBox = (): Box => {
      const width = c ? c.width : window.innerWidth;
      const height = c ? c.height : window.innerHeight;

      let half_size = Math.floor((Math.random() * 15) + 25);
      let x = Math.floor((Math.random() * width) + 1);
      let y = Math.floor((Math.random() * height) + 1);
      let r = Math.random() * Math.PI;
      const shadow_length = 2000;
      const color = colors[Math.floor((Math.random() * colors.length))];
      const speed = (60 - half_size) / 25;

      const getDots = () => {
        const full = (Math.PI * 2) / 4;
        const p1 = { x: x + half_size * Math.sin(r), y: y + half_size * Math.cos(r) };
        const p2 = { x: x + half_size * Math.sin(r + full), y: y + half_size * Math.cos(r + full) };
        const p3 = { x: x + half_size * Math.sin(r + full * 2), y: y + half_size * Math.cos(r + full * 2) };
        const p4 = { x: x + half_size * Math.sin(r + full * 3), y: y + half_size * Math.cos(r + full * 3) };
        return { p1, p2, p3, p4 };
      };

      const rotate = () => {
        r += speed * 0.002;
        x += speed;
        y += speed;
      };

      const draw = () => {
        if (!ctx || !c) return;
        const dots = getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.fillStyle = color;
        ctx.fill();

        if (y - half_size > c.height) { 
          y = -half_size;
          x = Math.random() * c.width;
        }
        if (x - half_size > c.width) { 
          x = -half_size;
          y = Math.random() * c.height;
        }
      };

      const drawShadow = () => {
        if (!ctx) return;
        const dots = getDots();
        const points: { endX: number; endY: number; startX: number; startY: number }[] = [];

        Object.values(dots).forEach((dot) => {
          const angle = Math.atan2(light.y - dot.y, light.x - dot.x);
          const endX = dot.x + shadow_length * Math.sin(-angle - Math.PI / 2);
          const endY = dot.y + shadow_length * Math.cos(-angle - Math.PI / 2);
          points.push({ endX, endY, startX: dot.x, startY: dot.y });
        });

        for (let i = points.length - 1; i >= 0; i--) {
          const n = i === 3 ? 0 : i + 1;
          ctx.beginPath();
          ctx.moveTo(points[i].startX, points[i].startY);
          ctx.lineTo(points[n].startX, points[n].startY);
          ctx.lineTo(points[n].endX, points[n].endY);
          ctx.lineTo(points[i].endX, points[i].endY);
          ctx.fillStyle = bgColor; 
          ctx.fill();
        }
      };

      return {
        get half_size() { return half_size; },
        set half_size(val) { half_size = val; },
        get x() { return x; },
        set x(val) { x = val; },
        get y() { return y; },
        set y(val) { y = val; },
        get r() { return r; },
        set r(val) { r = val; },
        get shadow_length() { return shadow_length; },
        get color() { return color; },
        get speed() { return speed; },
        getDots,
        rotate,
        draw,
        drawShadow
      };
    };

    function draw() {
      if (!ctx || !c) return;
      ctx.clearRect(0, 0, c.width, c.height);
      drawLight();

      for (let i = 0; i < boxes.length; i++) {
        boxes[i].rotate();
        boxes[i].drawShadow();
      }
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].draw();
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    boxes = [];
    while (boxes.length < 8) {
      boxes.push(createBox());
    }
    draw();

    const handleResize = () => resize();
    const handleMouseMove = (e: MouseEvent) => {
      light.x = e.clientX;
      light.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      id="canvas"
      className="fixed inset-0 z-0 w-full h-full bg-[#FAFAF9]"
      style={{ display: "block" }}
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-6 w-full max-w-[320px] mx-auto"
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[32px] border border-stone-200/50 shadow-xl p-6 flex flex-col gap-5 overflow-hidden group hover:border-lavender-300 transition-all duration-500">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 rounded-[32px]">
           <img src={currentTrack.image} alt="blur" className="w-full h-full object-cover blur-3xl opacity-20 scale-150" />
           <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/80 to-white"></div>
        </div>

        <div className="relative z-10 flex flex-col">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/30 mb-6 relative group/image">
             <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-white/10 group-hover/image:bg-transparent transition-colors"></div>
          </div>

          <div className="flex justify-between items-end mb-4 px-1">
            <div className="flex-1 overflow-hidden mr-4">
                <motion.h3 
                  key={currentTrack.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-stone-800 text-xl truncate leading-tight"
                >
                  {currentTrack.title}
                </motion.h3>
                <motion.p 
                  key={currentTrack.artist}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-stone-600 truncate mt-1"
                >
                  {currentTrack.artist}
                </motion.p>
            </div>
            <button className="text-stone-500 hover:text-lavender-600 hover:scale-110 active:scale-90 transition-all">
                <Heart size={24} />
            </button>
          </div>

          <div className="mb-6 group/slider">
             <div className="relative w-full h-1 bg-stone-300/50 rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-lavender-500 rounded-full"
                  style={{ width: `${currentPercentage}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div 
                   className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity pointer-events-none"
                   style={{ left: `${currentPercentage}%`, transform: `translate(-50%, -50%)` }}
                ></div>
             </div>
             <div className="flex justify-between text-[10px] text-stone-500 font-medium mt-2 font-mono">
                 <span>{formatTime(progress)}</span>
                 <span>{formatTime(duration)}</span>
             </div>
          </div>

          <div className="flex justify-between items-center px-2">
             <button className="text-stone-500 hover:text-stone-700 transition-colors">
                <Shuffle size={18} />
             </button>

             <div className="flex items-center gap-6">
               <button onClick={handlePrev} className="text-stone-600 hover:text-stone-900 transition-colors">
                  <SkipBack size={26} fill="currentColor" />
               </button>
               
               <button 
                  onClick={() => setIsPlaying(!isPlaying)} 
                  className="w-14 h-14 rounded-full bg-stone-800 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-stone-300/50"
               >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
               </button>

               <button onClick={handleNext} className="text-stone-600 hover:text-stone-900 transition-colors">
                  <SkipForward size={26} fill="currentColor" />
               </button>
             </div>

             <button className="text-stone-500 hover:text-stone-700 transition-colors">
                <Repeat size={18} />
             </button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.url} onTimeUpdate={handleTimeUpdate} onEnded={handleNext} />
    </motion.div>
  );
};

const JsonProfile = () => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    setAge(calculateAge(personalInfo.birthDate));
  }, []);

  const stackList = [
    { name: "Go", color: "#4F46E5", opacityCycle: [0.3, 0.8, 0.3] },
    { name: "TS", color: "#3B82F6", opacityCycle: [0.4, 0.9, 0.4] },
    { name: "JS", color: "#F59E0B", opacityCycle: [0.5, 1, 0.5] },
    { name: "React", color: "#06B6D4", opacityCycle: [0.3, 0.8, 0.3] },
    { name: "Node.js", color: "#10B981", opacityCycle: [0.4, 0.9, 0.4] },
    { name: "MongoDB", color: "#047857", opacityCycle: [0.5, 1, 0.5] },
    { name: "Vite", color: "#8B5CF6", opacityCycle: [0.3, 0.8, 0.3] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="font-mono text-sm bg-white/90 backdrop-blur-md p-5 rounded-xl border border-lavender-200 shadow-xl relative group w-full hover:border-lavender-300 transition-all duration-500"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 border-b border-lavender-200 pb-2">
        <div className="w-3 h-3 rounded-full bg-lavender-400 animate-pulse" />
        <div
          className="w-3 h-3 rounded-full bg-pink-300 animate-pulse"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-3 h-3 rounded-full bg-blue-300 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-lavender-600 font-bold">
          profile.json
        </span>
        <div className="ml-auto flex gap-1">
          <div className="w-1 h-1 rounded-full bg-lavender-400/60" />
          <div className="w-1 h-1 rounded-full bg-lavender-400/40" />
          <div className="w-1 h-1 rounded-full bg-lavender-400/20" />
        </div>
      </div>

      {/* JSON Content */}
      <div className="text-stone-700">
        <span className="text-lavender-600">{`{`}</span>

        <motion.div
          className="pl-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="py-0.5">
            <span className="text-amber-600">"name"</span>:{" "}
            <span className="text-stone-900">"{personalInfo.name}"</span>,
          </motion.div>

          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1 }}
            className="py-0.5"
          >
            <span className="text-amber-600">"age"</span>:{" "}
            <span className="text-lavender-600 font-medium">{age}</span>,
          </motion.div>

          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
            className="py-0.5"
          >
            <span className="text-amber-600">"status"</span>:{" "}
            <span className="text-stone-900">"Wong Mumet"</span>,
          </motion.div>

          <motion.div
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
            className="py-0.5"
          >
            <span className="text-amber-600">"stack"</span>:{" "}
            <span className="text-lavender-600">[</span>

            <div className="inline ml-1">
              {stackList.map((item, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: item.opacityCycle }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                  className="inline-block ml-1 font-medium"
                  style={{ color: item.color }}
                >
                  "{item.name}"
                  {i < stackList.length - 1 && (
                    <span className="text-lavender-600">,</span>
                  )}
                </motion.span>
              ))}
            </div>

            <span className="text-lavender-600 ml-1">]</span>
          </motion.div>
        </motion.div>

        <span className="text-lavender-600">{`}`}</span>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, active }: { project: Project; active: boolean }) => (
  <motion.div
    animate={{
      scale: active ? 1 : 0.95,
      opacity: active ? 1 : 0.5,
    }}
    transition={{ duration: 0.4 }}
    className={`group relative h-full flex flex-col justify-between p-6 bg-gradient-to-br rounded-2xl border transition-all duration-500 overflow-hidden ${
      active 
        ? "from-white/80 to-stone-50/90 border-lavender-300/50 shadow-2xl shadow-lavender-200/30" 
        : "from-white/50 to-stone-50/70 border-lavender-100/30"
    }`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
      active 
        ? "opacity-20 from-lavender-200/40 via-transparent to-pink-100/30" 
        : "opacity-0"
    }`}></div>
    
    <div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="text-[10px] font-bold tracking-widest text-lavender-600 uppercase bg-gradient-to-r from-lavender-100/80 to-pink-100/60 px-3 py-1.5 rounded-full border border-lavender-200/50">
          {project.category}
        </span>
        <a href={project.url} target="_blank" className="z-20">
          <motion.div whileHover={{ rotate: 90, scale: 1.2 }} transition={{ duration: 0.2 }}>
            <ExternalLink size={16} className="text-stone-500 group-hover:text-lavender-500 transition-colors" />
          </motion.div>
        </a>
      </div>
      
      <h3 className={`text-xl font-bold mb-3 transition-colors relative ${
        active ? "text-stone-800 group-hover:text-lavender-700" : "text-stone-600"
      }`}>
        {project.title}
      </h3>
      
      <p className={`text-sm mb-5 leading-relaxed transition-all duration-300 line-clamp-3 ${
        active ? "text-stone-600" : "text-stone-500 text-xs"
      }`}>{project.description}</p>
    </div>
    
    <div className="flex flex-wrap gap-2 relative z-10">
      {project.tech.map((t, i) => (
        <span 
          key={i}
          className={`text-[10px] px-3 py-1 rounded-full uppercase transition-all ${
            active 
              ? "text-stone-600 border border-stone-300 bg-white/60 group-hover:border-lavender-300" 
              : "text-stone-500 border border-stone-200 bg-white/40"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <div 
      className="w-full relative px-4" 
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden w-full max-w-4xl mx-auto py-8">
        <motion.div
          className="flex gap-4 md:gap-8"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={handleDragEnd}
          initial={false}
          animate={{ x: `calc(-${currentIndex} * (100% + 1rem))` }} 
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 25,
            mass: 0.8
          }}
          style={{ cursor: "grab", width: "100%" }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="w-full md:w-[45%] flex-shrink-0"
              style={{ pointerEvents: "auto" }}
            >
              <ProjectCard project={project} active={currentIndex === index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        {projects.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)} className="focus:outline-none p-2">
            <motion.div
              className={`h-1.5 rounded-full transition-colors duration-300 ${
                index === currentIndex 
                  ? "bg-lavender-500 w-8" 
                  : "bg-stone-300 w-2 hover:bg-stone-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const SocialMediaButtons = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center gap-4 md:gap-6 mt-8 flex-wrap px-4"
    >
      {socialMedia.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, y: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 md:p-4 rounded-2xl ${social.bgColor} backdrop-blur-sm border border-stone-200/50 ${social.color} transition-all duration-300 group relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-current transition-opacity duration-300"></div>
          <social.icon size={22} className="text-stone-600 group-hover:text-current transition-colors duration-300 relative z-10" />
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 group-hover:bottom-[-25px] transition-all duration-300 whitespace-nowrap text-stone-700">
            {social.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-stone-700 selection:bg-lavender-200/50 font-sans overflow-x-hidden">
      
      <CanvasBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-20">
        
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-between items-center mb-20 md:mb-32 backdrop-blur-sm bg-white/70 rounded-full p-3 border border-stone-200/50"
        >
          <motion.span 
            className="text-xl font-black tracking-tighter text-stone-800"
            whileHover={{ scale: 1.05 }}
          >
            DANDI<span className="text-lavender-500">.</span>
          </motion.span>
          <div className="flex gap-5">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}>
              <Github size={20} className="text-stone-500 hover:text-lavender-500 transition-colors cursor-pointer" />
            </motion.div>
          </div>
        </motion.nav>

        <section className="flex flex-col gap-12 mb-20 md:mb-32">
          <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-3 order-2 md:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tighter text-stone-800 leading-[0.9]">
                  BACKEND <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-lavender-500 via-pink-400 to-blue-400"
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    DEVELOPER
                  </motion.span>
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-stone-600 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Hi, I'm <span className="font-semibold">Dandi Eka Saputra</span> — usually called <span className="font-semibold">Dandi</span>. 
                I'm a Backend Developer specializing in building robust server-side systems and efficient data pipelines. 
                With expertise in <span className="text-[#3B82F6] font-medium">TypeScript</span>, <span className="text-[#F59E0B] font-medium">JavaScript</span>, and <span className="text-[#4F46E5] font-medium">Go</span>, 
                I architect scalable solutions that handle high-concurrency demands. 
                I leverage <span className="text-[#047857] font-medium">MongoDB</span> for database backend to create flexible, 
                high-performance data storage solutions. Passionate about clean code, system optimization, 
                and continuously learning new technologies to solve complex problems.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="md:col-span-2 order-1 md:order-2"
            >
              <motion.div 
                className="relative aspect-[16/10] bg-gradient-to-br from-white to-stone-100 rounded-3xl overflow-hidden border border-lavender-200/50 shadow-2xl shadow-lavender-100/30 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-lavender-300/30 rounded-3xl transition-all duration-500"></div>
                <motion.img 
                  src={personalInfo.heroGif} 
                  alt="Work Atmosphere" 
                  className="w-full h-full object-cover opacity-90"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60"></div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full grid md:grid-cols-2 gap-6"
          >
            <JsonProfile />
            <div className="flex justify-center md:justify-end">
               <MusicPlayer />
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="p-2 bg-gradient-to-br from-lavender-100/50 to-pink-100/30 rounded-lg border border-lavender-200/50"
              >
                <Code2 size={20} className="text-lavender-500" />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold text-stone-800">My Project</h2>
            </div>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-lavender-200/60 via-stone-300/60 to-transparent" />
          </motion.div>

          <ProjectCarousel />
        </section>

        <section className="mt-20 md:mt-40">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-lg md:text-xl font-bold text-stone-800 mb-4 md:mb-6">Connect With Me</h3>
            <SocialMediaButtons />
          </motion.div>
        </section>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 md:mt-20 text-center py-8 md:py-10 border-t border-stone-200/50"
        >
          <p className="text-stone-500 text-[10px] tracking-[0.3em] uppercase">
            © • {new Date().getFullYear()} • DANDI
          </p>
          <motion.div 
            className="flex justify-center gap-1 mt-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1 h-1 rounded-full bg-lavender-400/50"></div>
            <div className="w-1 h-1 rounded-full bg-pink-300/50"></div>
            <div className="w-1 h-1 rounded-full bg-blue-300/50"></div>
          </motion.div>
        </motion.footer>

      </div>
    </div>
  );
}
