/**
 * Jecky Samani — Personal Portfolio Interactive Controller
 * Native ES6 JavaScript - High performance, smooth animations, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initStickyHeader();
  initMobileMenu();
  initActiveNavObserver();
  initStatsCounter();
  initTechInspector();
  initArchitecturePlayground();
  initDeveloperTerminal();
  initResumeModal();
  initContactForm();
  initScreenToggleTabs();
});

/* ==========================================================================
   1. SCROLL PROGRESS & STICKY HEADER
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

function initStickyHeader() {
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      toggleBtn.classList.remove('active');
    });
  });
}

function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. SCREEN PREVIEW TOGGLE TABS (POS & TenSquare)
   ========================================================================== */
function initScreenToggleTabs() {
  // POS Screen Toggle
  const posTabs = document.querySelectorAll('.screen-tab[data-screen]');
  const posImgs = document.querySelectorAll('.pos-screen-img');

  posTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      posTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const screenKey = tab.getAttribute('data-screen');
      posImgs.forEach(img => {
        if (img.id === `tcb-img-${screenKey}`) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
  });

  // TenSquare Screen Toggle
  const tenTabs = document.querySelectorAll('.screen-tab[data-tenscreen]');
  const tenImgs = document.querySelectorAll('.tensquare-screen-img');

  tenTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tenTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const screenKey = tab.getAttribute('data-tenscreen');
      tenImgs.forEach(img => {
        if (img.id === `ten-img-${screenKey}`) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. STATS COUNT-UP ANIMATION
   ========================================================================== */
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statValues.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const unit = el.getAttribute('data-unit') || '';
          let current = 0;
          const step = target / 30;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            if (Number.isInteger(target)) {
              el.textContent = Math.round(current) + (unit ? ` ${unit}` : '') + suffix;
            } else {
              el.textContent = current.toFixed(1) + (unit ? ` ${unit}` : '') + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   4. TECH INSPECTOR POPOVER DATA & LOGIC
   ========================================================================== */
const TECH_DATA = {
  android: {
    name: 'Native Android SDK',
    cat: 'Mobile OS Platform',
    desc: 'Deep architecture experience using Java & Kotlin, Activity/Fragment lifecycles, Android Jetpack, BroadcastReceivers, and Services.',
    projects: 'The Crazy Beauty POS, TenSquare, KOnverge Now, GC Merchandising, Laddoo, BookMyBai'
  },
  java: {
    name: 'Java',
    cat: 'Programming Language',
    desc: 'Core language utilized across legacy and modern Android enterprise codebases for high stability, OOP principles, and thread management.',
    projects: 'The Crazy Beauty POS, KOnverge Now, Enterprise SDKs'
  },
  kotlin: {
    name: 'Kotlin',
    cat: 'Primary Android Language',
    desc: 'Modern language for clean Android development with Coroutines, Flows, Extension Functions, Data Classes, and null-safe API handling.',
    projects: 'TenSquare, The Crazy Beauty POS, KOnverge Now'
  },
  flutter: {
    name: 'Flutter Framework',
    cat: 'Cross-Platform Engine',
    desc: '6 months of professional production Flutter development for iOS & Android with fast 60fps UI rendering and single-codebase velocity.',
    projects: 'UrbanCook, Rozgar Sathi'
  },
  dart: {
    name: 'Dart',
    cat: 'Flutter Language',
    desc: 'Object-oriented, strongly typed language featuring sound null safety, async/await streams, and optimized JIT/AOT compilation.',
    projects: 'UrbanCook, Rozgar Sathi'
  },
  rest: {
    name: 'RESTful API Architecture',
    cat: 'Networking & Data Protocols',
    desc: 'Designing and consuming HTTP JSON APIs with robust request validation, header authentication, error code handling, and retry strategies.',
    projects: 'UrbanCook, Rozgar Sathi, TenSquare, KOnverge Now, POS'
  },
  retrofit: {
    name: 'Retrofit HTTP Client',
    cat: 'Android Networking',
    desc: 'Type-safe HTTP client for Android & Java/Kotlin, integrated with OkHttp interceptors, Gson/Moshi converters, and response logging.',
    projects: 'TenSquare, The Crazy Beauty POS, KOnverge Now'
  },
  volley: {
    name: 'Volley Networking Library',
    cat: 'Android Networking',
    desc: 'Asynchronous HTTP request queuing library used for fast memory caching, string/JSON requests, and background data synchronization.',
    projects: 'KOnverge Now, Legacy Enterprise Modules'
  },
  firebase: {
    name: 'Firebase Suite',
    cat: 'Backend Cloud Services',
    desc: 'Comprehensive BaaS integration including Firebase Authentication, Realtime Database, Cloud Firestore, Cloud Messaging (FCM), and Analytics.',
    projects: 'UrbanCook, Rozgar Sathi, TenSquare'
  },
  razorpay: {
    name: 'Razorpay Payment Gateway',
    cat: 'Fintech Integration',
    desc: 'Full payment SDK integration handling checkout flows, payment verification hashes, subscription plans, and refund webhooks.',
    projects: 'UrbanCook'
  },
  googlemaps: {
    name: 'Google Maps API',
    cat: 'Location & GIS Services',
    desc: 'Interactive map rendering, custom marker clustering, user geofencing, route polylines, reverse geocoding, and distance calculations.',
    projects: 'UrbanCook, KOnverge Now, GC Merchandising'
  },
  firebasechat: {
    name: 'Firebase Realtime Chat',
    cat: 'Messaging Engine',
    desc: 'In-app messaging system powered by Firebase Realtime DB with message timestamps, read receipts, and push notifications.',
    projects: 'Rozgar Sathi, Laddoo'
  },
  pushnotifications: {
    name: 'Push Notification Engine',
    cat: 'User Engagement',
    desc: 'FCM push notification dispatcher with deep-linking payload parsing, custom notification channels, and background message handlers.',
    projects: 'UrbanCook, Rozgar Sathi, TenSquare, POS'
  },
  sqlite: {
    name: 'SQLite Database',
    cat: 'Local Data Storage',
    desc: 'Relational embedded database implementation for offline caching, transaction logs, relational tables, and fast query execution.',
    projects: 'The Crazy Beauty POS, TenSquare'
  },
  androidstudio: {
    name: 'Android Studio IDE',
    cat: 'Development Environment',
    desc: 'Primary IDE utilized for code refactoring, Layout Inspector, Memory Profiler, Gradle build customization, and APK/AAB bundle signing.',
    projects: 'All Native Android & Flutter Projects'
  },
  git: {
    name: 'Git Version Control',
    cat: 'Source Control & CI/CD',
    desc: 'Branching strategies (Git Flow), pull requests, merge conflict resolution, code reviews, and tagged production releases.',
    projects: 'All 10+ Commercial Projects'
  },
  jira: {
    name: 'Atlassian JIRA',
    cat: 'Agile Project Management',
    desc: 'Sprint planning, backlog grooming, bug tracking, time estimation, and feature delivery reporting in team workflows.',
    projects: 'Xceptive Solutions LLP Enterprise Workflows'
  },
  xml: {
    name: 'Android XML Layouts',
    cat: 'UI Design Format',
    desc: 'Crafting responsive layouts using ConstraintLayout, CoordinatorLayout, RecyclerView item templates, styles, themes, and vector drawables.',
    projects: 'The Crazy Beauty POS, TenSquare, KOnverge Now'
  }
};

function initTechInspector() {
  const chips = document.querySelectorAll('.tech-chip');
  const nameEl = document.getElementById('inspector-name');
  const catEl = document.getElementById('inspector-cat');
  const descEl = document.getElementById('inspector-desc');
  const projEl = document.getElementById('inspector-projects');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const techKey = chip.getAttribute('data-tech');
      const info = TECH_DATA[techKey];

      if (info && nameEl) {
        nameEl.textContent = info.name;
        catEl.textContent = info.cat;
        descEl.textContent = info.desc;
        projEl.textContent = info.projects;
      }
    });
  });
}

/* ==========================================================================
   5. MOBILE ARCHITECTURE PLAYGROUND LOGIC
   ========================================================================== */
const ARCH_LAYERS_DATA = {
  ui: {
    title: 'UI Layer (Views & Widgets)',
    does: 'Renders user interface screens, captures touch events, and observes view states without containing business logic.',
    why: 'Decouples layout definition from underlying data processing, ensuring responsive 60fps rendering and clean UI code updates.',
    example: 'Used in UrbanCook for category filters and in Rozgar Sathi for responsive multi-language screen rendering.'
  },
  viewmodel: {
    title: 'ViewModel / Business Logic Layer',
    does: 'Executes state management, holds UI data state, processes user actions, and communicates with repositories.',
    why: 'Prevents state loss during configuration changes (orientation shifts) and maintains single-responsibility principles.',
    example: 'Used in TenSquare to manage practice test timer states and student performance score calculations.'
  },
  repository: {
    title: 'Repository Layer',
    does: 'Acts as the single source of truth for app data, orchestrating data flow between local databases and network APIs.',
    why: 'Abstracts data origins from the UI layer, enabling transparent offline-first fallbacks and seamless caching.',
    example: 'Used in Rozgar Sathi to fetch wallet balances over network while caching offline transaction history.'
  },
  rest: {
    title: 'REST API Client Layer',
    does: 'Executes HTTP requests (GET, POST, PUT, DELETE) using Retrofit or Volley, serializing JSON responses into data models.',
    why: 'Ensures structured, type-safe API communication with secure headers, tokens, and unified network error handling.',
    example: 'Used in KOnverge Now for daily field sales submission and regional leaderboard payload retrieval.'
  },
  thirdparty: {
    title: 'Firebase & Third-Party Services',
    does: 'Integrates specialized external SDKs for authentication, real-time messaging, payment processing, and mapping.',
    why: 'Accelerates development by leveraging enterprise-grade cloud capabilities without re-inventing infrastructure.',
    example: 'In UrbanCook, Razorpay SDK manages subscription checkout while Google Maps renders nearby cook locations.'
  },
  storage: {
    title: 'Local Storage & Persistence',
    does: 'Stores user preferences, session tokens, and relational app data on disk using SQLite databases or Shared Preferences.',
    why: 'Enables offline functionality, immediate app launch rendering, and secure persistence of confidential credentials.',
    example: 'In The Crazy Beauty POS, SQLite stores local salon appointment logs and offline billing transaction history.'
  }
};

function initArchitecturePlayground() {
  const layers = document.querySelectorAll('.arch-layer');
  const titleEl = document.getElementById('arch-layer-title');
  const doesEl = document.getElementById('arch-does');
  const whyEl = document.getElementById('arch-why');
  const exampleEl = document.getElementById('arch-example');

  layers.forEach(layer => {
    layer.addEventListener('click', () => {
      layers.forEach(l => l.classList.remove('active'));
      layer.classList.add('active');

      const layerKey = layer.getAttribute('data-layer');
      const info = ARCH_LAYERS_DATA[layerKey];

      if (info && titleEl) {
        titleEl.textContent = info.title;
        doesEl.textContent = info.does;
        whyEl.textContent = info.why;
        exampleEl.textContent = info.example;
      }
    });
  });
}

/* ==========================================================================
   6. DEVELOPER TERMINAL INTERACTION
   ========================================================================== */
function initDeveloperTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const scBtns = document.querySelectorAll('.term-sc-btn');

  if (!input || !output) return;

  function runCommand(cmdText) {
    const cleanCmd = cmdText.trim().toLowerCase();
    
    const cmdLine = document.createElement('div');
    cmdLine.className = 'term-line';
    cmdLine.innerHTML = `<span class="term-prompt">jecky@portfolio:~$</span> ${cmdText}`;
    output.appendChild(cmdLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'term-response';

    switch (cleanCmd) {
      case 'help':
        responseLine.innerHTML = `
          Available Commands:<br>
          - <span class="cmd-highlight">about</span> : Brief overview of Jecky Samani<br>
          - <span class="cmd-highlight">skills</span> : Summary of core mobile technologies<br>
          - <span class="cmd-highlight">experience</span> : Career history & timeline<br>
          - <span class="cmd-highlight">projects</span> : List of production apps built<br>
          - <span class="cmd-highlight">architecture</span> : Mobile architecture principles<br>
          - <span class="cmd-highlight">contact</span> : Email, phone, and LinkedIn info<br>
          - <span class="cmd-highlight">clear</span> : Clear terminal output window
        `;
        break;

      case 'about':
        responseLine.innerHTML = `
          <strong>Jecky Samani</strong><br>
          Android Developer (4.5 Years) | Flutter Developer (6 Months)<br>
          Location: Ahmedabad, India<br>
          Focus: Production mobile applications with REST APIs, Firebase, Razorpay, Google Maps, and POS integrations.
        `;
        break;

      case 'skills':
        responseLine.innerHTML = `
          Primary: Android, Java, Kotlin, Flutter, Dart<br>
          Integrations: REST APIs, Retrofit, Volley, Firebase, Razorpay, Google Maps<br>
          Database & Tools: SQLite, Android Studio, Git, JIRA, XML
        `;
        break;

      case 'experience':
        responseLine.innerHTML = `
          <strong>Xceptive Solutions LLP (Ahmedabad, India)</strong><br>
          Duration: March 2021 — Present<br>
          Role: Android Developer &rarr; Flutter Developer<br>
          Focus: 4.5 Yrs Native Android + 6 Mos Cross-Platform Flutter development for commercial products.
        `;
        break;

      case 'projects':
        responseLine.innerHTML = `
          1. <strong>UrbanCook</strong> [Flutter] — Cook discovery & Razorpay subscription platform<br>
          2. <strong>Rozgar Sathi</strong> [Flutter] — Maid referral & wallet earning platform<br>
          3. <strong>The Crazy Beauty POS</strong> [Android] — Salon POS & billing system<br>
          4. <strong>TenSquare</strong> [Android] — Exam prep & question bank platform<br>
          5. <strong>KOnverge Now</strong> [Android Enterprise] — Coca-Cola India field sales app<br>
          6. GC Merchandising, Laddoo, BookMyBai
        `;
        break;

      case 'architecture':
        responseLine.innerHTML = `
          Mobile Architecture Flow:<br>
          UI Layer &rarr; ViewModel / Business Logic &rarr; Repository Layer &rarr; REST API / Firebase &rarr; SQLite Storage
        `;
        break;

      case 'contact':
        responseLine.innerHTML = `
          Email: <a href="mailto:Jeckysamani11@gmail.com">Jeckysamani11@gmail.com</a><br>
          Phone: +91-9904472193<br>
          Location: Ahmedabad, India<br>
          LinkedIn: <a href="https://www.linkedin.com/in/jeckysamani/" target="_blank">linkedin.com/in/jeckysamani</a>
        `;
        break;

      case 'clear':
        output.innerHTML = '';
        return;

      default:
        responseLine.innerHTML = `Command not recognized: "${cmdText}". Type <span class="cmd-highlight">help</span> for valid commands.`;
    }

    output.appendChild(responseLine);
    output.scrollTop = output.scrollHeight;
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    }
  });

  scBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      runCommand(cmd);
    });
  });
}

/* ==========================================================================
   7. RESUME MODAL CONTROLLER
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const closeBtns = [
    document.getElementById('close-resume-btn'),
    document.getElementById('close-resume-btn-2')
  ].filter(Boolean);

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM DISPATCHER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    const mailtoUrl = `mailto:Jeckysamani11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    window.location.href = mailtoUrl;
  });
}
