import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import {
  BookOpen, Users, Award, BarChart3, CheckCircle,
  GraduationCap, Layers, ClipboardList, Code2, ArrowRight,
  Globe, Clock, UserCheck,
  Github, Linkedin, Mail,
  Building2, GraduationCap as GradCap, User,
} from "lucide-react";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── GLOBAL KEYFRAMES ── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes floatBadge1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        @keyframes floatBadge2 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50%       { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes floatBadge3 {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes blobPulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.18; }
          50%       { transform: scale(1.08) rotate(6deg); opacity: 0.28; }
        }
        @keyframes blobPulse2 {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.12; }
          50%       { transform: scale(1.05) rotate(-4deg); opacity: 0.22; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(120deg) translateX(80px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(80px) rotate(-480deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(240deg) translateX(50px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(50px) rotate(-600deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dotMove {
          0%   { background-position: 0 0; }
          100% { background-position: 28px 28px; }
        }
        @keyframes trainMove {
          0%   { transform: translateX(-120px); }
          100% { transform: translateX(calc(100vw + 120px)); }
        }
        @keyframes trainSmoke {
          0%   { opacity: 0.7; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-30px) scale(2); }
        }
        @keyframes trackDash {
          0%   { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }
        @keyframes stationPop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes particleDrift {
          0%   { transform: translate(0,0) scale(1); opacity: 0.6; }
          50%  { opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .dot-bg {
          background-image: radial-gradient(circle, hsl(var(--primary)/0.35) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          animation: dotMove 3s linear infinite;
        }
        .founder-particle {
          position: absolute;
          border-radius: 50%;
          background: hsl(var(--primary)/0.4);
          animation: particleDrift 4s ease-in-out infinite;
        }
        }
        .animate-float      { animation: float 4s ease-in-out infinite; }
        .animate-float2     { animation: float2 5s ease-in-out infinite; }
        .animate-badge1     { animation: floatBadge1 3.5s ease-in-out infinite; }
        .animate-badge2     { animation: floatBadge2 4.2s ease-in-out infinite 0.5s; }
        .animate-badge3     { animation: floatBadge3 3.8s ease-in-out infinite 1s; }
        .animate-blob1      { animation: blobPulse 7s ease-in-out infinite; }
        .animate-blob2      { animation: blobPulse2 9s ease-in-out infinite 1s; }
        .animate-fadeup     { animation: fadeUp 0.7s ease both; }
        .animate-fadeup-1   { animation: fadeUp 0.7s ease 0.1s both; }
        .animate-fadeup-2   { animation: fadeUp 0.7s ease 0.25s both; }
        .animate-fadeup-3   { animation: fadeUp 0.7s ease 0.4s both; }
        .animate-fadeup-4   { animation: fadeUp 0.7s ease 0.55s both; }
        .animate-spin-slow  { animation: spinSlow 18s linear infinite; }
        .animate-orbit1     { animation: orbit  6s linear infinite; }
        .animate-orbit2     { animation: orbit2 8s linear infinite; }
        .animate-orbit3     { animation: orbit3 5s linear infinite; }
        .animate-count      { animation: countUp 0.6s ease both; }
        .shimmer-text {
          background: linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.5) 40%, hsl(var(--primary)) 60%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .feature-card:hover .feature-icon {
          animation: float 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="w-full px-8 md:px-16 h-16 flex items-center justify-between bg-background border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">Axiom</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#founder" className="hover:text-foreground transition-colors">About</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
            Login
          </Link>
          <Link to="/signup" className="text-sm font-semibold px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="w-full min-h-[calc(100vh-64px)] flex flex-col relative overflow-hidden">

        {/* Animated moving dotted background — removed */}

        {/* Blue blob top-right — animated */}
        <div
          className="absolute top-0 right-0 w-[55%] h-[75%] bg-primary/10 -z-0 animate-blob1"
          style={{ borderRadius: "0 0 0 60% / 0 0 0 50%", transformOrigin: "top right" }}
        />
        {/* Second blob accent — animated */}
        <div
          className="absolute top-[10%] right-[5%] w-[42%] h-[65%] bg-primary/20 -z-0 animate-blob2"
          style={{ borderRadius: "50% 40% 60% 40% / 40% 50% 50% 60%", transformOrigin: "center" }}
        />
        {/* Floating particles */}
        {[
          { top: "15%", left: "8%",  size: 8,  delay: "0s",   dur: "4s" },
          { top: "30%", left: "3%",  size: 5,  delay: "1s",   dur: "5s" },
          { top: "60%", left: "6%",  size: 10, delay: "0.5s", dur: "6s" },
          { top: "20%", right: "8%", size: 6,  delay: "1.5s", dur: "4.5s" },
          { top: "70%", right: "4%", size: 8,  delay: "0.8s", dur: "5.5s" },
          { top: "45%", left: "12%", size: 4,  delay: "2s",   dur: "3.5s" },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full bg-primary/30 -z-0"
            style={{
              top: p.top, left: (p as any).left, right: (p as any).right,
              width: p.size, height: p.size,
              animation: `float ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col md:flex-row items-center w-full flex-1 px-8 md:px-16 pt-12 pb-0 gap-8">

          {/* LEFT — text */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-3 mb-4 animate-fadeup">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
                Axiom
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-5 animate-fadeup-1">
              A truth so{" "}
              <span className="shimmer-text">fundamental</span>,<br />
              it needs no proof.
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-3 max-w-md animate-fadeup-2">
              In mathematics, an axiom is a foundational statement accepted as true —
              the bedrock everything else is built upon.
            </p>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 max-w-md animate-fadeup-3">
              We named our platform <span className="font-semibold text-foreground">Axiom</span> because
              great education should work the same way: clear, structured, and self-evident —
              no proof required.
            </p>

            <div className="flex items-center gap-4 flex-wrap animate-fadeup-4">
              <Link to="/signup"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login"
                className="px-8 py-4 border-2 rounded-full font-bold text-base hover:bg-muted transition-colors">
                Know More
              </Link>
            </div>
          </div>

          {/* RIGHT — SVG student illustration */}
          <div className="flex-1 flex items-end justify-center relative min-h-[420px] md:min-h-[520px] animate-fadeup-2">
            {/* Orbiting ring behind student */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full border-2 border-primary/20 border-dashed animate-spin-slow" />
            </div>
            <div className="animate-float2 w-full">
              <StudentSVG />
            </div>
          </div>
        </div>

        {/* ── FEATURE CHIPS — bottom of hero ── */}
        <div className="relative z-10 w-full px-8 md:px-16 pb-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe,       label: "Learn Anywhere",  sub: "Access from any device",      delay: "0s" },
              { icon: CheckCircle, label: "Lifetime Access", sub: "Never lose your progress",    delay: "0.1s" },
              { icon: Clock,       label: "24/7 Support",    sub: "Always here to help",         delay: "0.2s" },
              { icon: UserCheck,   label: "Expert Faculty",  sub: "University-grade teaching",   delay: "0.3s" },
            ].map(({ icon: Icon, label, sub, delay }) => (
              <div key={label}
                style={{ animation: `fadeUp 0.6s ease ${delay} both` }}
                className="flex items-center gap-4 bg-primary rounded-2xl px-5 py-4 text-primary-foreground shadow-md shadow-primary/20 hover:scale-105 transition-transform cursor-default">
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs opacity-80 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y bg-muted/30">
        <div className="w-full px-8 md:px-16 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          {[
            { value: "10+",   label: "Universities" },
            { value: "500+",  label: "Courses" },
            { value: "20k+",  label: "Students" },
            { value: "99.9%", label: "Uptime" },
          ].map((s, i) => (
            <div key={s.label} style={{ animation: `countUp 0.5s ease ${i * 0.12}s both` }}>
              <p className="text-4xl font-extrabold text-primary">{s.value}</p>
              <p className="text-base text-muted-foreground mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="w-full px-8 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-base mb-2">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Everything a university needs</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From course management to assessments, Axiom covers the full academic lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen,      title: "Course Management",     desc: "Create courses with lectures, resources, and structured sections per semester." },
              { icon: ClipboardList, title: "Quizzes & Assessments", desc: "Auto-graded MCQ quizzes with explanations, attempt limits, and instant results." },
              { icon: Layers,        title: "Programs & Batches",    desc: "Map courses to programs and semesters. Students see exactly what's relevant." },
              { icon: Users,         title: "Role-Based Access",     desc: "Admin, Faculty, and Student roles with fine-grained permissions everywhere." },
              { icon: BarChart3,     title: "Analytics & Progress",  desc: "Track completion, assignment scores, and quiz performance institution-wide." },
              { icon: Code2,         title: "Coding Exercises",      desc: "Programming challenges tied to courses with difficulty levels and language filters." },
              { icon: Award,         title: "Certifications",        desc: "Issue and track certifications for completed programs and skill milestones." },
              { icon: GraduationCap, title: "Faculty Tools",         desc: "Post assignments, create quizzes, and notify enrolled students instantly." },
              { icon: CheckCircle,   title: "Smart Notifications",   desc: "Auto-notify students on new content. Admins see all activity in one view." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="feature-card border rounded-2xl p-6 bg-card hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all group">
                <div className="feature-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — train + sequential card reveal ── */}
      <HowItWorks />

      {/* ── FOUNDER — full width ── */}
      <section id="founder" className="w-full relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-primary/12 -z-10" />
        {/* Moving dotted layer — removed */}
        {/* Floating particles */}
        {[
          { size: 12, top: "10%", left: "5%",  dx: "30px",  dy: "-40px", delay: "0s",   dur: "5s" },
          { size: 8,  top: "20%", left: "15%", dx: "-20px", dy: "-50px", delay: "1s",   dur: "6s" },
          { size: 16, top: "60%", left: "8%",  dx: "40px",  dy: "-30px", delay: "0.5s", dur: "4s" },
          { size: 10, top: "80%", left: "20%", dx: "-30px", dy: "-60px", delay: "2s",   dur: "7s" },
          { size: 14, top: "15%", right: "8%", dx: "-40px", dy: "-35px", delay: "0.8s", dur: "5.5s" },
          { size: 6,  top: "40%", right: "5%", dx: "20px",  dy: "-45px", delay: "1.5s", dur: "4.5s" },
          { size: 18, top: "70%", right: "12%",dx: "-25px", dy: "-55px", delay: "0.3s", dur: "6.5s" },
          { size: 9,  top: "50%", left: "50%", dx: "35px",  dy: "-40px", delay: "2.5s", dur: "5s" },
        ].map((p, i) => (
          <div key={i} className="founder-particle"
            style={{
              width: p.size, height: p.size,
              top: p.top, left: (p as any).left, right: (p as any).right,
              "--dx": p.dx, "--dy": p.dy,
              animationDelay: p.delay, animationDuration: p.dur,
            } as React.CSSProperties}
          />
        ))}
        {/* Pulse rings */}
        {[
          { top: "20%", left: "10%", delay: "0s" },
          { top: "70%", right: "8%", delay: "1.5s" },
          { top: "45%", left: "45%", delay: "3s" },
        ].map((r, i) => (
          <div key={i} className="absolute w-16 h-16 rounded-full border-2 border-primary/30 -z-10"
            style={{
              top: r.top, left: (r as any).left, right: (r as any).right,
              animation: `pulseRing 3s ease-out ${r.delay} infinite`,
            }}
          />
        ))}

        <div className="w-full px-8 md:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

            {/* LEFT — identity */}
            <div>
              <p className="text-primary font-semibold text-base mb-3">The Person Behind It</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Meet the Founder</h2>

              {/* Avatar + name */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-extrabold ring-4 ring-primary/20 shadow-lg shrink-0 animate-float">
                  MG
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold">Mayank Gupta</h3>
                  <p className="text-primary font-semibold mt-0.5">Founder & Builder, Axiom LMS</p>
                  <p className="text-muted-foreground text-sm mt-1">ICPC Regionalist · Codeforces Expert · Loves Challenges</p>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-5 text-lg text-muted-foreground leading-relaxed mb-8 italic">
                "I built Axiom because universities deserve software as rigorous as the education they deliver.
                In mathematics, an axiom is a statement accepted as true without proof —
                that's the standard I hold this platform to: it should just work, every time, for everyone."
              </blockquote>

              {/* Contact */}
              <div className="space-y-2 text-sm text-muted-foreground mb-8">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href="mailto:mayankgupta0875@gmail.com" className="hover:text-foreground transition-colors">mayankgupta0875@gmail.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 text-primary shrink-0 text-center font-bold text-xs">📞</span>
                  <a href="tel:+917878945238" className="hover:text-foreground transition-colors">+91 78789 45238</a>
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { href: "https://github.com/Mayank0875",                    label: "GitHub",      icon: <Github className="w-4 h-4" /> },
                  { href: "https://www.linkedin.com/in/mayank0875/",          label: "LinkedIn",    icon: <Linkedin className="w-4 h-4" /> },
                  { href: "https://codeforces.com/profile/one_unknown",       label: "Codeforces",  icon: <span className="text-xs font-black">CF</span> },
                  { href: "https://leetcode.com/u/Mayank_0875/",              label: "LeetCode",    icon: <Code2 className="w-4 h-4" /> },
                  { href: "https://www.instagram.com/mayankgupta_0875/",      label: "Instagram",   icon: <span className="text-xs font-black">IG</span> },
                  { href: "mailto:mayankgupta0875@gmail.com",                 label: "Email",       icon: <Mail className="w-4 h-4" /> },
                ].map(({ href, label, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT — 2×2 founder story cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                {
                  value: "ICPC",
                  label: "Regionalist",
                  sub: "Competed at regional level in ICPC",
                },
                {
                  value: "Expert",
                  label: "Codeforces",
                  sub: "Rated Expert — loves hard problems",
                },
                {
                  value: "Why LMS?",
                  label: "The Problem",
                  sub: "Universities using email, paper & spreadsheets",
                },
                {
                  value: "Axiom",
                  label: "The Solution",
                  sub: "One platform built the way universities work",
                },
              ].map(({ value, label, sub }, i) => (
                <div key={label}
                  style={{ animation: `fadeUp 0.6s ease ${i * 0.12}s both` }}
                  className="border rounded-2xl p-6 bg-card hover:shadow-md hover:border-primary/30 hover:-translate-y-1 transition-all">
                  <p className="text-2xl font-extrabold text-primary mb-1">{value}</p>
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </div>
              ))}

              {/* Why Axiom — full width */}
              <div className="col-span-2 border rounded-2xl p-6 bg-primary/5 border-primary/20"
                style={{ animation: "fadeUp 0.6s ease 0.5s both" }}>
                <p className="text-sm font-semibold text-primary mb-2">Why "Axiom"?</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  In mathematics, an <strong className="text-foreground">axiom</strong> is a foundational truth
                  requiring no proof — the bedrock everything else is built upon.
                  That's what education should be: not an afterthought, but the foundation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t bg-primary w-full px-8 md:px-16 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-foreground mb-4">Ready to get started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-10">Join universities already running on Axiom. Setup takes minutes.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/signup"
              className="flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-full font-bold text-base hover:opacity-90 transition-opacity shadow-lg">
              Create your account <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login"
              className="px-8 py-4 border-2 border-primary-foreground/40 rounded-full text-base font-bold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER — inspired by reference layout ── */}
      <footer className="border-t bg-muted/20 w-full">
        {/* Main footer grid */}
        <div className="w-full px-8 md:px-16 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-extrabold text-lg">Axiom LMS</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Empowering universities with a platform as rigorous as the education they deliver.
              Built on the mathematical principle of axioms — foundational truths that need no proof.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span>📍</span> India
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:mayankgupta0875@gmail.com" className="hover:text-foreground transition-colors">
                  mayankgupta0875@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Quick Links</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Home", "Features", "How it works", "About"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-primary transition-colors hover:translate-x-1 inline-block transition-transform">
                    {item}
                  </a>
                </li>
              ))}
              <li><Link to="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Col 3 — Platform */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Platform</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Course Management", "Quizzes & Assessments", "Assignments", "Programs & Batches", "Analytics", "Notifications"].map((item) => (
                <li key={item}><span className="hover:text-primary transition-colors cursor-default">{item}</span></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Connect</h4>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { label: "GitHub",      href: "https://github.com/Mayank0875" },
                { label: "LinkedIn",    href: "https://www.linkedin.com/in/mayank0875/" },
                { label: "Codeforces", href: "https://codeforces.com/profile/one_unknown" },
                { label: "LeetCode",   href: "https://leetcode.com/u/Mayank_0875/" },
                { label: "Instagram",  href: "https://www.instagram.com/mayankgupta_0875/" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t w-full px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Axiom LMS. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <span className="text-red-500">♥</span> by{" "}
            <a href="https://github.com/Mayank0875" target="_blank" rel="noreferrer"
              className="font-semibold text-primary hover:underline">
              Mayank Gupta
            </a>
          </p>
          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/Mayank0875",               icon: <Github className="w-4 h-4" /> },
              { href: "https://www.linkedin.com/in/mayank0875/",     icon: <Linkedin className="w-4 h-4" /> },
              { href: "mailto:mayankgupta0875@gmail.com",            icon: <Mail className="w-4 h-4" /> },
            ].map(({ href, icon }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer"
                className="w-8 h-8 border rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

// ── How It Works — train + sequential station reveal ─────────────────────────
const STATIONS = [
  {
    id: "university",
    label: "University",
    icon: Building2,
    tag: "Foundation",
    desc: "Admin sets up the university — programs, batches, semesters, and user roles. Everything starts here.",
    steps: ["Create university profile", "Set up programs & semesters", "Invite admins and faculty"],
  },
  {
    id: "faculty",
    label: "Faculty",
    icon: GradCap,
    tag: "Teaching",
    desc: "Faculty build courses, post assignments and quizzes. Students enrolled in the course get notified instantly.",
    steps: ["Create courses & lectures", "Post assignments and quizzes", "Students notified automatically"],
  },
  {
    id: "student",
    label: "Student",
    icon: User,
    tag: "Learning",
    desc: "Students browse their semester, attempt quizzes, submit assignments, and track their progress — all in one place.",
    steps: ["Browse courses by semester", "Attempt quizzes & submit work", "Track scores and progress"],
  },
];

// Train duration per cycle in ms — card i appears at i/3 of the cycle
const TRAIN_CYCLE = 7000;

const HowItWorks = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const [started, setStarted] = useState(false);

  // Start revealing cards after a short delay, then loop
  useEffect(() => {
    const start = () => {
      setVisible([]);
      setStarted(true);
      STATIONS.forEach((_, i) => {
        setTimeout(() => {
          setVisible((v) => [...v, i]);
        }, 800 + i * (TRAIN_CYCLE / STATIONS.length));
      });
    };

    // First run
    const t0 = setTimeout(start, 400);

    // Loop every cycle
    const interval = setInterval(() => {
      setVisible([]);
      setTimeout(start, 100);
    }, TRAIN_CYCLE + 1200);

    return () => { clearTimeout(t0); clearInterval(interval); };
  }, []);

  return (
    <section id="how" className="border-y w-full overflow-hidden relative bg-background">
      {/* Subtle dot bg — removed */}

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center px-8 md:px-16 pt-20 pb-12">
        <p className="text-primary font-semibold text-base mb-2">Simple Process</p>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3">How Axiom works</h2>
        <p className="text-muted-foreground text-lg">
          The train never stops — and neither does learning.
        </p>
      </div>

      {/* ── TRACK + TRAIN — clean zigzag ── */}
      <div className="relative w-full overflow-hidden" style={{ height: 160 }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1400 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground fill under track */}
          <path
            d="M0,160 L0,106 C100,106 140,46 280,46 C420,46 460,126 600,126 C740,126 780,46 920,46 C1060,46 1100,116 1240,116 C1340,116 1380,86 1400,86 L1400,160 Z"
            fill="hsl(var(--muted)/0.3)"
          />

          {/* Rail 1 */}
          <path
            d="M0,100 C100,100 140,40 280,40 C420,40 460,120 600,120 C740,120 780,40 920,40 C1060,40 1100,110 1240,110 C1340,110 1380,80 1400,80"
            fill="none" stroke="hsl(var(--border))" strokeWidth="3" strokeLinecap="round"
          />
          {/* Rail 2 */}
          <path
            d="M0,112 C100,112 140,52 280,52 C420,52 460,132 600,132 C740,132 780,52 920,52 C1060,52 1100,122 1240,122 C1340,122 1380,92 1400,92"
            fill="none" stroke="hsl(var(--border))" strokeWidth="3" strokeLinecap="round"
          />

          {/* Sleepers — simple evenly spaced vertical marks */}
          {Array.from({ length: 28 }).map((_, i) => {
            const x = (i / 27) * 1400;
            const t = i / 27;
            const seg = Math.min(Math.floor(t * 4), 3);
            const st = t * 4 - seg;
            const ys = [100, 40, 120, 40, 110];
            const y = ys[seg] + (ys[seg + 1] - ys[seg]) * st;
            return (
              <rect key={i} x={x - 5} y={y - 8} width="10" height="22"
                rx="2" fill="hsl(var(--border))" opacity="0.4" />
            );
          })}

          {/* Station markers — clean dots with label above */}
          {([
            { cx: 350, cy: 40, label: "Admin" },
            { cx: 700, cy: 126, label: "Faculty" },
            { cx: 1050, cy: 46, label: "Student" },
          ] as { cx: number; cy: number; label: string }[]).map(({ cx, cy, label }, i) => (
            <g key={i}>
              <text x={cx} y={cy - 16} textAnchor="middle"
                style={{ fontSize: 11, fontWeight: 700, fontFamily: "system-ui",
                  fill: visible.includes(i) ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                  transition: "fill 0.4s ease" }}>
                {label}
              </text>
              <line x1={cx} y1={cy - 10} x2={cx} y2={cy - 2}
                stroke="hsl(var(--border))" strokeWidth="1.5" />
              <circle cx={cx} cy={cy + 6} r="8"
                fill={visible.includes(i) ? "hsl(var(--primary))" : "hsl(var(--card))"}
                stroke="hsl(var(--border))" strokeWidth="2"
                style={{ transition: "fill 0.5s ease" }} />
              <circle cx={cx} cy={cy + 6} r="3"
                fill={visible.includes(i) ? "hsl(var(--primary-foreground))" : "hsl(var(--border))"}
                style={{ transition: "fill 0.5s ease" }} />
            </g>
          ))}

          {/* ── TRAIN on zigzag path ── */}
          {started && (() => {
            const PATH = "M0,106 C100,106 140,46 280,46 C420,46 460,126 600,126 C740,126 780,46 920,46 C1060,46 1100,116 1240,116 C1340,116 1380,86 1400,86";
            const DUR = `${TRAIN_CYCLE}ms`;
            return (
              <>
                {/* Engine */}
                <g>
                  <animateMotion dur={DUR} repeatCount="indefinite" rotate="auto" path={PATH} />
                  <rect x="-38" y="-13" width="54" height="20" rx="5" fill="hsl(var(--primary))" />
                  <rect x="-34" y="-21" width="24" height="13" rx="3" fill="hsl(var(--primary))" />
                  <rect x="-26" y="-27" width="8" height="8" rx="2" fill="hsl(var(--primary)/0.65)" />
                  <rect x="-30" y="-18" width="13" height="8" rx="2" fill="hsl(var(--primary-foreground)/0.8)" />
                  <circle cx="15" cy="-3" r="4" fill="hsl(var(--primary-foreground))" opacity="0.9" />
                  <circle cx="-26" cy="8" r="7" fill="hsl(var(--foreground)/0.75)" />
                  <circle cx="-26" cy="8" r="3" fill="hsl(var(--primary)/0.5)" />
                  <circle cx="-6"  cy="8" r="7" fill="hsl(var(--foreground)/0.75)" />
                  <circle cx="-6"  cy="8" r="3" fill="hsl(var(--primary)/0.5)" />
                  <circle cx="-22" cy="-30" r="4" fill="hsl(var(--muted-foreground)/0.25)"
                    style={{ animation: "trainSmoke 1.1s ease-out infinite" }} />
                  <circle cx="-30" cy="-34" r="3" fill="hsl(var(--muted-foreground)/0.18)"
                    style={{ animation: "trainSmoke 1.1s ease-out 0.4s infinite" }} />
                </g>
                {/* Carriage 1 */}
                <g>
                  <animateMotion dur={DUR} repeatCount="indefinite" rotate="auto"
                    keyPoints="0;1" keyTimes="0;1" calcMode="linear"
                    begin={`${TRAIN_CYCLE * 0.055}ms`} path={PATH} />
                  <rect x="-32" y="-11" width="58" height="18" rx="4"
                    fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
                  {[-20, -2, 16].map((x, j) => (
                    <rect key={j} x={x} y="-7" width="12" height="7" rx="1.5"
                      fill="hsl(var(--primary)/0.2)" />
                  ))}
                  <circle cx="-18" cy="8" r="6" fill="hsl(var(--foreground)/0.7)" />
                  <circle cx="-18" cy="8" r="2.5" fill="hsl(var(--primary)/0.4)" />
                  <circle cx="18"  cy="8" r="6" fill="hsl(var(--foreground)/0.7)" />
                  <circle cx="18"  cy="8" r="2.5" fill="hsl(var(--primary)/0.4)" />
                </g>
                {/* Carriage 2 */}
                <g>
                  <animateMotion dur={DUR} repeatCount="indefinite" rotate="auto"
                    keyPoints="0;1" keyTimes="0;1" calcMode="linear"
                    begin={`${TRAIN_CYCLE * 0.11}ms`} path={PATH} />
                  <rect x="-32" y="-11" width="58" height="18" rx="4"
                    fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
                  {[-20, -2, 16].map((x, j) => (
                    <rect key={j} x={x} y="-7" width="12" height="7" rx="1.5"
                      fill="hsl(var(--primary)/0.12)" />
                  ))}
                  <circle cx="-18" cy="8" r="6" fill="hsl(var(--foreground)/0.7)" />
                  <circle cx="-18" cy="8" r="2.5" fill="hsl(var(--primary)/0.3)" />
                  <circle cx="18"  cy="8" r="6" fill="hsl(var(--foreground)/0.7)" />
                  <circle cx="18"  cy="8" r="2.5" fill="hsl(var(--primary)/0.3)" />
                </g>
              </>
            );
          })()}
        </svg>
      </div>

      {/* ── STATION CARDS — appear as train passes ── */}
      <div className="max-w-5xl mx-auto px-8 md:px-16 pt-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STATIONS.map(({ id, label, icon: Icon, tag, desc, steps }, i) => (
            <div key={id}
              className="relative border rounded-2xl bg-card overflow-hidden transition-all duration-700"
              style={{
                opacity: visible.includes(i) ? 1 : 0,
                transform: visible.includes(i) ? "translateY(0) scale(1)" : "translateY(32px) scale(0.96)",
                transitionDelay: "0ms",
              }}
            >
              {/* Top accent line */}
              <div className="h-1 w-full bg-primary/60" />

              <div className="p-6">
                {/* Icon + tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full border border-border bg-muted text-muted-foreground uppercase tracking-wider">
                    {tag}
                  </span>
                </div>

                {/* Station number + label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-extrabold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-extrabold">{label}</h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>

                {/* Steps */}
                <ul className="space-y-2">
                  {steps.map((s, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pulse ring when card appears */}
              {visible.includes(i) && (
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 pointer-events-none"
                  style={{ animation: "pulseRing 0.8s ease-out forwards" }} />
              )}
            </div>
          ))}
        </div>

        {/* Track label */}
        <p className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-border inline-block" />
          Cards reveal as the train passes each station — then the journey repeats
          <span className="w-8 h-px bg-border inline-block" />
        </p>
      </div>
    </section>
  );
};

// ── Student SVG illustration ──────────────────────────────────────────────────
// Clean vector student figure with books and backpack — matches the reference style
const StudentSVG = () => (
  <svg viewBox="0 0 420 520" xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto drop-shadow-xl"
    aria-hidden="true">
    <defs>
      <style>{`
        .skin  { fill: #FBBF7C; }
        .shirt { fill: hsl(var(--primary)/0.15); stroke: hsl(var(--primary)); stroke-width: 1.5; }
        .jeans { fill: hsl(var(--primary)/0.25); stroke: hsl(var(--primary)/0.6); stroke-width: 1.5; }
        .book1 { fill: hsl(var(--primary)); }
        .book2 { fill: hsl(var(--primary)/0.6); }
        .book3 { fill: hsl(var(--primary)/0.4); }
        .bag   { fill: hsl(var(--primary)/0.3); stroke: hsl(var(--primary)); stroke-width: 1.5; }
        .hair  { fill: #1a1a1a; }
        .shoe  { fill: #333; }
        .stripe{ fill: none; stroke: hsl(var(--primary)); stroke-width: 2; opacity: 0.5; }
        .headp { fill: none; stroke: #555; stroke-width: 4; stroke-linecap: round; }
        .headp2{ fill: #555; }
      `}</style>
    </defs>

    {/* Shadow */}
    <ellipse cx="210" cy="510" rx="100" ry="12" fill="hsl(var(--primary)/0.1)" />

    {/* ── BACKPACK ── */}
    <rect x="155" y="195" width="55" height="80" rx="10" className="bag" />
    <rect x="162" y="205" width="41" height="30" rx="6" fill="hsl(var(--primary)/0.5)" stroke="hsl(var(--primary))" strokeWidth="1" />
    <line x1="182" y1="275" x2="182" y2="310" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
    <line x1="195" y1="275" x2="195" y2="310" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />

    {/* ── BODY / SHIRT ── */}
    {/* Torso */}
    <path d="M175,220 Q165,230 162,270 L162,340 L258,340 L258,270 Q255,230 245,220 Z" className="shirt" />
    {/* Shirt stripes */}
    {[235,248,261].map((x, i) => (
      <line key={i} x1={x} y1={220} x2={x - 5} y2={340} className="stripe" />
    ))}
    {/* Collar */}
    <path d="M195,220 L210,240 L225,220" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

    {/* ── JEANS ── */}
    <path d="M162,340 L162,430 L185,430 L210,370 L235,430 L258,430 L258,340 Z" className="jeans" />
    {/* Jeans crease */}
    <line x1="210" y1="340" x2="210" y2="430" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />

    {/* ── SHOES ── */}
    <ellipse cx="175" cy="435" rx="22" ry="10" className="shoe" />
    <ellipse cx="245" cy="435" rx="22" ry="10" className="shoe" />
    <rect x="153" y="425" width="44" height="12" rx="6" className="shoe" />
    <rect x="223" y="425" width="44" height="12" rx="6" className="shoe" />

    {/* ── NECK ── */}
    <rect x="200" y="195" width="20" height="28" rx="8" className="skin" />

    {/* ── HEAD ── */}
    <ellipse cx="210" cy="170" rx="48" ry="52" className="skin" />

    {/* ── HAIR ── */}
    <path d="M162,155 Q165,105 210,108 Q255,105 258,155 Q250,130 210,128 Q170,130 162,155 Z" className="hair" />
    {/* Afro texture bumps */}
    {[170,185,200,215,230,245].map((x, i) => (
      <ellipse key={i} cx={x} cy={128 + (i % 2) * 4} rx={10} ry={8} className="hair" />
    ))}

    {/* ── FACE ── */}
    {/* Eyes */}
    <ellipse cx="193" cy="168" rx="7" ry="8" fill="#fff" />
    <ellipse cx="227" cy="168" rx="7" ry="8" fill="#fff" />
    <ellipse cx="194" cy="169" rx="4" ry="5" fill="#333" />
    <ellipse cx="228" cy="169" rx="4" ry="5" fill="#333" />
    <ellipse cx="195" cy="167" rx="1.5" ry="1.5" fill="#fff" />
    <ellipse cx="229" cy="167" rx="1.5" ry="1.5" fill="#fff" />
    {/* Glasses */}
    <rect x="183" y="161" width="22" height="16" rx="5" fill="none" stroke="#555" strokeWidth="2" />
    <rect x="215" y="161" width="22" height="16" rx="5" fill="none" stroke="#555" strokeWidth="2" />
    <line x1="205" y1="169" x2="215" y2="169" stroke="#555" strokeWidth="2" />
    <line x1="161" y1="166" x2="183" y2="166" stroke="#555" strokeWidth="2" />
    <line x1="237" y1="166" x2="258" y2="166" stroke="#555" strokeWidth="2" />
    {/* Smile */}
    <path d="M196,185 Q210,198 224,185" fill="none" stroke="#c0845a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Nose */}
    <path d="M207,175 Q210,182 213,175" fill="none" stroke="#c0845a" strokeWidth="1.5" strokeLinecap="round" />

    {/* ── HEADPHONES ── */}
    <path d="M162,158 Q162,118 210,118 Q258,118 258,158" className="headp" />
    <rect x="154" y="155" width="14" height="20" rx="7" className="headp2" />
    <rect x="252" y="155" width="14" height="20" rx="7" className="headp2" />

    {/* ── ARMS ── */}
    {/* Left arm (holding books) */}
    <path d="M162,230 Q140,260 138,300 L155,305 Q158,270 175,245 Z" className="shirt" />
    {/* Right arm (raised slightly) */}
    <path d="M258,230 Q278,250 282,285 L265,290 Q262,260 245,240 Z" className="shirt" />

    {/* ── HANDS ── */}
    <ellipse cx="146" cy="308" rx="12" ry="10" className="skin" />
    <ellipse cx="273" cy="292" rx="12" ry="10" className="skin" />

    {/* ── BOOKS (held in left arm) ── */}
    <rect x="118" y="295" width="52" height="10" rx="3" className="book1" transform="rotate(-8,144,300)" />
    <rect x="120" y="307" width="52" height="10" rx="3" className="book2" transform="rotate(-5,146,312)" />
    <rect x="122" y="319" width="52" height="10" rx="3" className="book3" transform="rotate(-3,148,324)" />
    {/* Book spines */}
    <rect x="118" y="295" width="6" height="10" rx="1" fill="hsl(var(--primary)/0.8)" transform="rotate(-8,144,300)" />
    <rect x="120" y="307" width="6" height="10" rx="1" fill="hsl(var(--primary)/0.5)" transform="rotate(-5,146,312)" />
    <rect x="122" y="319" width="6" height="10" rx="1" fill="hsl(var(--primary)/0.3)" transform="rotate(-3,148,324)" />

    {/* ── FLOATING BADGES — animated ── */}
    {/* Quiz badge */}
    <g className="animate-badge1" style={{ transformOrigin: "345px 182px" }}>
      <rect x="290" y="160" width="110" height="44" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="345" y="178" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 10, fontWeight: 700, fill: "hsl(var(--primary))" }}>Quiz Score</text>
      <text x="345" y="196" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 900, fill: "hsl(var(--foreground))" }}>95 / 100</text>
    </g>

    {/* Course badge */}
    <g className="animate-badge2" style={{ transformOrigin: "70px 222px" }}>
      <rect x="10" y="200" width="120" height="44" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="70" y="218" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 10, fontWeight: 700, fill: "hsl(var(--primary))" }}>Courses Enrolled</text>
      <text x="70" y="236" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 16, fontWeight: 900, fill: "hsl(var(--foreground))" }}>6 Active</text>
    </g>

    {/* Assignment badge */}
    <g className="animate-badge3" style={{ transformOrigin: "352px 302px" }}>
      <rect x="295" y="280" width="115" height="44" rx="12" fill="hsl(var(--primary))" />
      <text x="352" y="298" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 10, fontWeight: 700, fill: "hsl(var(--primary-foreground))" }}>Assignment Due</text>
      <text x="352" y="316" textAnchor="middle" style={{ fontFamily: "system-ui", fontSize: 13, fontWeight: 900, fill: "hsl(var(--primary-foreground))" }}>Tomorrow 11PM</text>
    </g>
  </svg>
);

export default LandingPage;
