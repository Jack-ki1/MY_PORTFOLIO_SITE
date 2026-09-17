import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AccordionItem } from './components/Accordion';
import { ThemeSelector, ThemeName } from './components/ThemeSelector';
import { SERVICES, PROJECTS, FAQS, BLOGS, SKILLS } from './constants';
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Star,
  Plus,
  ChevronRight,
  Phone,
  Sun,
  Moon,
  Terminal,
  Database,
  Cpu,
  BarChart3,
  Code2
} from 'lucide-react';

export default function App() {
  const [isLight, setIsLight] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('ocean');
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });

  // Filter projects by section
  const githubProjects = PROJECTS.filter(p => p.section === 'github');
  const huggingfaceProjects = PROJECTS.filter(p => p.section === 'huggingface');
  const documentUrl = (fileName: string) => new URL(`${fileName}?v=20260908`, document.baseURI).toString();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      const sections = ['home', 'about', 'projects', 'blogs'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 300 && rect.bottom >= 300;
        }
        return false;
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    // Remove all theme classes first
    document.documentElement.classList.remove('light', 'theme-ocean', 'theme-sunset', 'theme-forest', 'theme-purple', 'theme-golden');
    
    // Add light mode if enabled
    if (isLight) {
      document.documentElement.classList.add('light');
    }
    
    // Add theme class if not default
    if (currentTheme !== 'default') {
      document.documentElement.classList.add(`theme-${currentTheme}`);
    }
    
    // Save preferences to localStorage
    localStorage.setItem('theme-preferences', JSON.stringify({ isLight, currentTheme }));
  }, [isLight, currentTheme]);

  // Load saved theme preferences
  useEffect(() => {
    const saved = localStorage.getItem('theme-preferences');
    if (saved) {
      try {
        const { isLight: savedLight, currentTheme: savedTheme } = JSON.parse(saved);
        setIsLight(savedLight);
        setCurrentTheme(savedTheme);
      } catch (e) {
        console.error('Failed to load theme preferences:', e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-bg text-foreground selection:bg-accent selection:text-black">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-accent focus:text-black focus:font-bold">Skip to content</a>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-[var(--nav-bg)] border border-[var(--border-color)] rounded-full px-8 py-4 flex items-center gap-8 md:gap-12 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 rounded-full bg-accent"
            />
            <span className="font-bold tracking-tighter text-lg">JACK</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'text-accent after:w-full' : ''}`}>Home</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'text-accent after:w-full' : ''}`}>About</a>
            <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'text-accent after:w-full' : ''}`}>Projects</a>
            <a href="#blogs" className={`nav-link ${activeSection === 'blogs' ? 'text-accent after:w-full' : ''}`}>Blogs</a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector 
              currentTheme={currentTheme}
              isLight={isLight}
              onThemeChange={setCurrentTheme}
              onModeToggle={() => setIsLight(!isLight)}
            />
            <button className="bg-foreground text-bg px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-300 shadow-xl">
              Contact
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main id="main">
      <section id="home" className="relative pt-48 pb-24 px-6 flex flex-col items-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-right order-2 md:order-1"
          >
            <h1 className="text-6xl md:text-8xl leading-none text-gradient">JACKSON</h1>
            <h1 className="text-7xl md:text-9xl text-[var(--border-color)] leading-none -mt-4">KIMOTHO</h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-1 md:order-2 flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-64 md:w-80 aspect-[3/4] bg-zinc-800 rounded-3xl overflow-hidden border border-[var(--border-color)] transition-all duration-500 cursor-pointer shadow-2xl"
            >
              <img
                src="images/jack1.webp"
                alt="Jackson Kimotho"
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 bg-zinc-800"
              />
            </motion.div>
            <motion.div
              animate={{ rotate: [-15, -10, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-black font-anton text-3xl shadow-2xl"
            >
              Hi
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-3"
          >
            <h1 className="text-7xl md:text-9xl text-[var(--border-color)] leading-none -mt-4">DATA</h1>
            <h1 className="text-7xl md:text-8xl leading-tight text-gradient pr-4">SCIENTIST</h1>
            <div className="mt-6 bg-zinc-900 border border-[var(--border-color)] rounded-2xl p-6 font-mono text-[10px] md:text-xs text-accent/80 max-w-xs mx-auto md:mx-0 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <p className="leading-relaxed">
                <span className="text-white">$</span> git status<br />
                <span className="text-green-400">On branch master</span><br />
                <span className="text-white">$</span> python3 analyze.py<br />
                <span className="animate-pulse">_ Processing datasets...</span>
              </p>
            </div>
            <p className="mt-8 text-[var(--semi)] max-w-xs mx-auto md:mx-0 leading-relaxed text-lg">
              I'm a Data Scientist and AI Engineer
              (With additinal expertise in DATA ANALYSIS)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          <h2 className="text-4xl md:text-6xl max-w-md text-gradient">WHAT I CAN DO FOR YOU</h2>
          <p className="text-[var(--semi)] max-w-md self-end text-lg">
            As a data scientist, I am a data storyteller, crafting insights that drive impact and spark innovation.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-[var(--border-color)]"
        >
          {SERVICES.map((service) => (
            <AccordionItem
              key={service.id}
              number={service.id}
              title={service.title}
              content={service.description}
            />
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-8 text-gradient">ABOUT ME</h2>
            <p className="text-xl text-[var(--semi)] leading-relaxed mb-12">
              Hi, I'm Jackson a Data Analyst, Data Scientist, and Data Engineer with a passion for turning raw data into actionable insights. I specialize in Python, SQL, and Machine Learning to build intelligent solutions that drive business value.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <motion.div whileHover={{ y: -5 }}>
                <div className="text-5xl font-anton text-accent">3</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mt-2">Years of Experience</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <div className="text-5xl font-anton text-accent">30+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mt-2">Completed Projects</div>
              </motion.div>
              <motion.div whileHover={{ y: -5 }}>
                <div className="text-5xl font-anton text-accent">8+</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mt-2">Clients Worldwide</div>
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-12 mb-12">
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mb-2">Call Today :</div>
                <div className="font-bold text-lg">+254748515345</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-[var(--muted)] mb-2">Email :</div>
                <div className="font-bold text-lg">kimothojackson1125@gmail.com</div>
              </div>
            </div>
            <div className="flex gap-4 mb-12">
              <a href="https://www.linkedin.com/in/jackson-kimotho1/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/Jack-ki1" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="flex gap-4">
              <button className="btn-outline group relative overflow-hidden" onClick={() => window.open(documentUrl('JACK_CV_V1.pdf'), '_blank')}>
                <span className="relative z-10">MY CV</span>
              </button>
              <button className="btn-outline group relative overflow-hidden" onClick={() => window.open(documentUrl('JK_RESUME_V2.pdf'), '_blank')}>
                <span className="relative z-10">RESUME</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[var(--border-color)]">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          <h2 className="text-4xl md:text-6xl uppercase font-anton tracking-tighter text-gradient">Technical Arsenal</h2>
          <p className="text-[var(--semi)] max-w-md self-end text-lg">
            My toolkit is built for precision and scale. From statistical modeling to deep learning deployment, I leverage the best tools for the job.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10, borderColor: 'var(--accent)' }}
              className="bg-[var(--card)]/40 backdrop-blur-md border border-[var(--border-color)] p-8 rounded-3xl flex flex-col justify-between group transition-all duration-500 shadow-lg"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  {skill.category}
                </div>
                <div className="text-xs font-mono text-accent/60">{skill.level}%</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                <div className="w-full h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-accent shadow-[0_0_10px_var(--accent)]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GitHub Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-8 h-8 text-accent" />
            <h2 className="text-4xl md:text-6xl text-gradient">GITHUB PROJECTS</h2>
          </div>
          <p className="text-[var(--semi)] max-w-md text-lg">
            Open-source repositories showcasing core ML/AI algorithms, data engineering pipelines, and production-ready applications.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {githubProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => project.link && window.open(project.link, '_blank')}
              className="project-card-container rounded-3xl overflow-hidden group cursor-pointer border border-[var(--border-color)] shadow-lg"
            >
              {/* Fixed background image with stable dimensions */}
              <div className="aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-100 group-hover:opacity-60"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-accent text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4 max-w-xs text-white font-anton uppercase tracking-tighter leading-none">{project.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest border border-accent/30 px-4 py-1 rounded-full hover:bg-accent hover:text-black transition-colors">
                    View Project <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              
              {/* Static label */}
              <div className="bg-[var(--card)] border-t border-[var(--border-color)] p-4">
                <h3 className="text-sm font-anton text-foreground uppercase tracking-wider">{project.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hugging Face Projects Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[var(--border-color)]">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-accent" />
            <h2 className="text-4xl md:text-6xl text-gradient">HUGGING FACE SPACES</h2>
          </div>
          <p className="text-[var(--semi)] max-w-md text-lg">
            Interactive web applications powered by Streamlit and Gradio—live demos of cutting-edge AI and data science solutions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {huggingfaceProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => project.link && window.open(project.link, '_blank')}
              className="project-card-container rounded-3xl overflow-hidden group cursor-pointer border border-accent/30 shadow-lg hover:shadow-accent/20 transition-all"
            >
              {/* Fixed background image with stable dimensions - reduced size */}
              <div className="aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-indigo-900/30 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-100 group-hover:opacity-60"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-accent text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4 max-w-xs text-white font-anton uppercase tracking-tighter leading-none">{project.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-3 mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest border border-accent/30 px-4 py-1 rounded-full hover:bg-accent hover:text-black transition-colors">
                    Try Live <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              
              {/* Static label with accent border */}
              <div className="bg-[var(--card)] border-t-2 border-accent/50 p-4">
                <h3 className="text-sm font-anton text-foreground uppercase tracking-wider">{project.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Links Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="btn-outline flex items-center gap-2 group" onClick={() => window.open('https://github.com/Jack-ki1', '_blank')}>
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> VIEW ALL ON GITHUB
          </button>
          <button className="btn-outline flex items-center gap-2 group" onClick={() => window.open('https://huggingface.co/spaces/Jack-ki1', '_blank')}>
            <Star className="w-4 h-4 group-hover:scale-110 transition-transform" /> EXPLORE HUGGING FACE
          </button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-8 text-gradient">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-[var(--semi)] leading-relaxed mb-8 text-lg">
              Here are answers to some of the most common questions I receive as a data consultant. If you don't see your question here, feel free to reach out — I'm happy to help!
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-t border-[var(--border-color)]"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} title={faq.q} content={faq.a} number={(i + 1).toString()} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blogs" className="py-24 px-6 max-w-7xl mx-auto border-t border-[var(--border-color)]">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl mb-4 uppercase text-gradient">events & insights</h2>
          <p className="text-[var(--semi)] max-w-md text-lg">
            Sharing my journey through the world of data, machine learning, and AI. Borrowed from my latest LinkedIn discussions and industry events.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => blog.link && window.open(blog.link, '_blank')}
              className="project-card-container rounded-3xl overflow-hidden group cursor-pointer border border-[var(--border-color)] shadow-lg"
            >
              {/* Fixed background image with stable dimensions - matching projects section */}
              <div className="aspect-[4/3] md:aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-100 group-hover:opacity-60"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-8">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-accent text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4 max-w-xs text-white font-anton uppercase tracking-tighter leading-none">{blog.title}</h3>
                  <p className="text-white/70 text-xs md:text-sm line-clamp-3 mb-6">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-widest border border-accent/30 px-4 py-1 rounded-full hover:bg-accent hover:text-black transition-colors">
                    Read More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              
              {/* Static label */}
              <div className="bg-[var(--card)] border-t border-[var(--border-color)] p-4">
                <h3 className="text-sm font-anton text-foreground uppercase tracking-wider">{blog.title}</h3>
                <p className="text-xs text-[var(--muted)] mt-1">{blog.category} • {blog.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button className="btn-outline flex items-center gap-2" onClick={() => window.open('https://www.linkedin.com/in/jackson-kimotho1/', '_blank')}>
            <Plus className="w-4 h-4" /> VIEW MORE
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-[var(--border-color)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-xl max-w-sm mx-auto"
            >
              <img src="images/jack2.png" alt="Work together" loading="lazy" decoding="async" className="w-full h-full object-cover transition-all duration-700 bg-zinc-800" />
            </motion.div>
            <motion.div
              animate={{ rotate: [-15, -10, -15] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center text-black font-anton text-3xl shadow-2xl"
            >
              BYE
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 leading-none text-gradient">LET'S WORK TOGETHER</h2>
            <p className="text-[var(--semi)] mb-12 text-lg">
              Let's build something impactful together, whether it's your data strategy, your machine learning models, or your next big AI idea.
            </p>
            <div className="glass-card">
              <form 
                className="space-y-6"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormState('loading');
                  try {
                    const res = await fetch('https://formsubmit.co/ajax/kimothojackson1125@gmail.com', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                      body: JSON.stringify({
                        ...formData,
                        _subject: `Portfolio enquiry from ${formData.name}`,
                        _replyto: formData.email,
                        _captcha: 'false'
                      })
                    });
                    if (res.ok) {
                      setFormState('success');
                      setFormData({ name: '', email: '', service: '', message: '' });
                    } else {
                      setFormState('error');
                    }
                  } catch (err) {
                    setFormState('error');
                  }
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-accent/60">Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Smith" className="w-full bg-black/40 border border-[var(--border-color)] rounded-2xl px-4 py-3 text-foreground placeholder-[var(--muted)] focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-accent/60">Email</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="johnsmith@gmail.com" className="w-full bg-black/40 border border-[var(--border-color)] rounded-2xl px-4 py-3 text-foreground placeholder-[var(--muted)] focus:outline-none focus:border-accent transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-accent/60">Service Needed ?</label>
                  <select value={formData.service} required onChange={e => setFormData({...formData, service: e.target.value})} className="w-full bg-black/40 border border-[var(--border-color)] rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors">
                    <option value="">Select...</option>
                    <option value="Data Analysis">Data Analysis</option>
                    <option value="Data Visualization">Data Visualization</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="MLOPs">MLOPs</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-accent/60">What Can I Help You...</label>
                  <textarea rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Hello, I'd like to enquire about..." className="w-full bg-black/40 border border-[var(--border-color)] rounded-2xl px-4 py-3 text-foreground placeholder-[var(--muted)] focus:outline-none focus:border-accent transition-colors resize-none" />
                </div>
                <button disabled={formState === 'loading' || formState === 'success'} className="btn-primary w-full shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  {formState === 'loading' ? 'SENDING...' : formState === 'success' ? 'SENT SUCCESSFULLY' : 'SUBMIT'}
                </button>
                {formState === 'error' && <p className="text-red-400 text-[10px] uppercase font-bold tracking-widest text-center mt-2">Error sending message. Please try again.</p>}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-black py-12 px-6 border-t border-accent/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Email :</div>
            <div className="font-bold">kimothojackson1125@gmail.com</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Call Today :</div>
            <div className="font-bold">+254748515345</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Social :</div>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/jackson-kimotho1/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://github.com/Jack-ki1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <div>© Copyright 2026. All Rights Reserved by <span className="underline">jack</span></div>
          <div>Created by <span className="underline">Jack Data</span></div>
        </div>
      </footer>
      </main>

      {/* Back to top feature */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-accent text-black shadow-2xl hover:scale-110 transition-transform z-50 disabled:opacity-50"
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}
    </div>
  );
}
