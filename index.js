// Optionally, you can add smooth scrolling using JavaScript if not using the "scroll-behavior" in CSS.

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  /* Check External Source: bvambient.js */ 
document.addEventListener("DOMContentLoaded", function() {
  var demo1 = new BVAmbient({
selector: "#ambient",
fps: 60,
max_transition_speed: 12000,
min_transition_speed: 8000,
particle_number: 80,
particle_maxwidth: 60,
particle_minwidth: 10,
particle_radius: 50,
particle_opacity: true,
particle_colision_change: true,
  // changed to cyan to match site accent (was green)
  particle_background: "#0ea5e9",
particle_image: {
image: false,
src: ""
},
responsive: [
{
 breakpoint: 768,
 settings: {
   particle_number: "15"
 }
},
{
 breakpoint: 480,
 settings: {
   particle_number: "10"
 }
}
]
});
});

// Navbar improvements: close on link click, aria updates, active link highlighting, scroll indicator
document.addEventListener('DOMContentLoaded', () => {
  const navbarCollapse = document.getElementById('navbarNav');
  const toggler = document.querySelector('.navbar-toggler');
  const navLinks = document.querySelectorAll('.nav-link');
  const indicator = document.querySelector('.nav-scroll-indicator');

  if (navbarCollapse && toggler) {
    // Close collapse when link clicked (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const instance = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        if (getComputedStyle(toggler).display !== 'none') {
          instance.hide();
          toggler.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Sync ARIA on show/hide
    navbarCollapse.addEventListener('show.bs.collapse', () => {
      toggler.setAttribute('aria-expanded', 'true');
      navbarCollapse.classList.add('show');
    });

    navbarCollapse.addEventListener('hide.bs.collapse', () => {
      toggler.setAttribute('aria-expanded', 'false');
      navbarCollapse.classList.remove('show');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const instance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (instance && navbarCollapse.classList.contains('show')) instance.hide();
      }
    });
  }

  // Highlight active nav link based on section in view
  const sections = document.querySelectorAll('section[id]');
  if (sections && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
          if (link) link.classList.add('active');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
  }

  // Scroll progress indicator across the top of nav (improved calculation)
  if (indicator) {
    const getScrollTop = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const updateIndicator = () => {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop = getScrollTop();
      const docHeight = Math.max(body.scrollHeight, doc.scrollHeight, body.offsetHeight, doc.offsetHeight, body.clientHeight, doc.clientHeight) - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      indicator.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
    };

    window.addEventListener('scroll', updateIndicator, { passive: true });
    window.addEventListener('resize', updateIndicator);
    window.addEventListener('load', updateIndicator);

    const imgs = document.images;
    if (imgs && imgs.length) {
      for (let i = 0; i < imgs.length; i++) {
        if (!imgs[i].complete) {
          imgs[i].addEventListener('load', () => updateIndicator());
          imgs[i].addEventListener('error', () => updateIndicator());
        }
      }
    }

    updateIndicator();
  }
});

// Magnetic cursor attraction effect for navbar and home section elements
document.addEventListener('DOMContentLoaded', () => {
  const magneticElements = document.querySelectorAll('.magnetic-attraction');

  if (!magneticElements || magneticElements.length === 0) return;

  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - elementCenterX, 2) +
        Math.pow(mouseY - elementCenterY, 2)
      );

      // Pull strength: max 12px at close range (reduced from 30px)
      const pullStrength = Math.max(0, 1 - distance / 100) * 12;

      if (distance < 100) {
        const angle = Math.atan2(mouseY - elementCenterY, mouseX - elementCenterX);
        const moveX = Math.cos(angle) * pullStrength;
        const moveY = Math.sin(angle) * pullStrength;

        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        element.style.transform = 'translate(0, 0)';
      }
    });
  });

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    magneticElements.forEach(element => {
      element.style.transform = 'translate(0, 0)';
    });
  });
});

// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navbarCollapse = document.getElementById('navbarNav');

  if (navToggle && navbarCollapse) {
    navToggle.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });

    // Close menu when a link is clicked
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
      });
    });
  }
});