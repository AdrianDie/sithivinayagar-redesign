/* Shared interactions for the temple site */
(function () {
  // Header shadow/blur on scroll
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile drawer (drawer is a sibling of header -> no backdrop-filter ancestor)
  var burger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.drawer');
  var scrim = document.querySelector('.scrim');
  var closeBtn = document.querySelector('.drawer-close');
  function openMenu() { drawer && drawer.classList.add('open'); scrim && scrim.classList.add('open'); burger && burger.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { drawer && drawer.classList.remove('open'); scrim && scrim.classList.remove('open'); burger && burger.classList.remove('open'); document.body.style.overflow = ''; }
  burger && burger.addEventListener('click', function () { drawer.classList.contains('open') ? closeMenu() : openMenu(); });
  closeBtn && closeBtn.addEventListener('click', closeMenu);
  scrim && scrim.addEventListener('click', closeMenu);
  drawer && drawer.querySelectorAll('a.d-link').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Scroll reveal (GSAP if present, else IntersectionObserver fallback)
  var reveals = document.querySelectorAll('.reveal');
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    reveals.forEach(function (el) {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }
})();
