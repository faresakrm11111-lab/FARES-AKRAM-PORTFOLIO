document.addEventListener('DOMContentLoaded', () => {
    // Music Player Control
  const musicBtn = document.getElementById('musicBtn');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  const musicVisualizer = document.getElementById('musicVisualizer');
  const musicPlayIcon = document.getElementById('musicPlayIcon');
  
  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        if(musicPlayIcon) musicPlayIcon.style.display = 'inline-block';
        if(musicVisualizer) musicVisualizer.style.display = 'none';
        isPlaying = false;
      } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        if(musicPlayIcon) musicPlayIcon.style.display = 'none';
        if(musicVisualizer) musicVisualizer.style.display = 'flex';
        isPlaying = true;
      }
    });
  }
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', (e) => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
        
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
          link.classList.add('active');
        }
      });
    });

    // ===== NEW UPGRADES =====

    // Preloader
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      setTimeout(() => {
        if(preloader) preloader.classList.add('hidden');
      }, 500); // Small delay to ensure smooth transition
    });

    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (cursorDot && cursorOutline && window.matchMedia("(min-width: 769px)").matches) {
      window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      });

      // Add hover effect for interactive elements
      document.querySelectorAll('a, button, .cursor-pointer, .music-btn, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorOutline.style.width = '60px';
          cursorOutline.style.height = '60px';
          cursorOutline.style.backgroundColor = 'rgba(212, 165, 116, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
          cursorOutline.style.width = '40px';
          cursorOutline.style.height = '40px';
          cursorOutline.style.backgroundColor = 'transparent';
        });
      });
    }

    // Scroll Progress
    const scrollProgress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}%`;
      if(scrollProgress) scrollProgress.style.width = scroll;
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if(themeToggle) {
      const themeIcon = themeToggle.querySelector('i');
      
      // Check saved theme
      const savedTheme = localStorage.getItem('portfolioTheme');
      if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      }

      themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
          document.body.removeAttribute('data-theme');
          themeIcon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('portfolioTheme', 'dark');
        } else {
          document.body.setAttribute('data-theme', 'light');
          themeIcon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('portfolioTheme', 'light');
        }
      });
    }

    // Typed.js Initialization
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings: ['Digital Marketing Specialist', 'Account Manager', 'Team Leader', 'Brand Strategist'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
      });
    }

    // Particles.js Initialization
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        "particles": {
          "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
          "color": { "value": "#d4a574" },
          "shape": { "type": "circle" },
          "opacity": { "value": 0.2, "random": false },
          "size": { "value": 3, "random": true },
          "line_linked": { "enable": true, "distance": 150, "color": "#d4a574", "opacity": 0.1, "width": 1 },
          "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
          "detect_on": "window",
          "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
          "modes": { "grab": { "distance": 180, "line_linked": { "opacity": 0.4 } }, "push": { "particles_nb": 3 } }
        },
        "retina_detect": true
      });
    }

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item, .work-item-image');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        workItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
            // Small timeout to allow display to apply before opacity changes for smooth transition
            setTimeout(() => {
                item.style.opacity = "1";
            }, 50);
          } else {
            item.style.opacity = "0";
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
          }
        });
      });
    });

    // Parallax Effect
    const heroImage = document.querySelector('.hero-image-main');
    const heroText = document.querySelector('.hero-text');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (heroImage && scrollY < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroText.style.transform = `translateY(${scrollY * 0.08}px)`;
      }
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.btn, .music-btn');
    magnets.forEach(magnet => {
      magnet.addEventListener('mousemove', function(e) {
        const position = magnet.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      magnet.addEventListener('mouseout', function() {
        magnet.style.transform = 'translate(0px, 0px)';
      });
    });

    // Case Study Drawer Modal
    const drawerOverlay = document.getElementById('drawerOverlay');
    const projectDrawer = document.getElementById('projectDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerLink = document.getElementById('drawerLink');
    
    const workLinks = document.querySelectorAll('.work-item a, .work-item-image');
    
    function openDrawer(title, href) {
      if(drawerTitle) drawerTitle.textContent = title || "Project Case Study";
      if(drawerLink) {
        if(href) {
            drawerLink.href = href;
            drawerLink.style.display = 'inline-block';
        } else {
            drawerLink.style.display = 'none';
        }
      }
      
      if(drawerOverlay) drawerOverlay.classList.add('active');
      if(projectDrawer) projectDrawer.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop scrolling
    }
    
    function closeDrawer() {
      if(drawerOverlay) drawerOverlay.classList.remove('active');
      if(projectDrawer) projectDrawer.classList.remove('active');
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    workLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let href = null;
        let title = "Case Study";
        
        if (link.tagName.toLowerCase() === 'a') {
          href = link.getAttribute('href');
          const overlay = link.parentElement.querySelector('.overlay-content h3');
          if (overlay) title = overlay.textContent;
        } else {
          const imgOverlay = link.querySelector('.overlay-content h3');
          if (imgOverlay) title = imgOverlay.textContent;
        }
        
        openDrawer(title, href);
      });
    });
    
    if(drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if(drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Mouse Glow Tracking
    const mouseGlow = document.getElementById('mouseGlow');
    if (mouseGlow) {
      document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
      });
    }

    // Scroll Reveal Intersection Observer
    const revealItems = document.querySelectorAll('.reveal-item');
    if (revealItems.length > 0) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // stop observing once revealed
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
      
      revealItems.forEach(item => {
        revealObserver.observe(item);
      });
    }

  });
