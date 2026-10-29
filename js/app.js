/**
 * INET Business Analyst Interview Dashboard & 10-Min Presentation App
 * Candidate: Kornravee Sirikhan (Praew)
 */

class InterviewDashboardApp {
  constructor() {
    this.currentSlide = 1;

    // 10-Minute Presentation Timer (600 seconds)
    this.timerSeconds = 600;
    this.timerInterval = null;
    this.isTimerRunning = false;

    this.lang = 'th';
    this.thDocTitle = document.title;

    this.initDOM();
    this.buildStepper();
    this.bindEvents();
    this.updateUI(1); // Init to slide 1
    this.setLang(this.loadLang());
  }

  // ========================================================================
  // LANGUAGE (TH / EN)
  // Translatable elements carry their English HTML in data-en; the Thai
  // original is stashed in data-th on first switch so it can be restored.
  // ========================================================================
  loadLang() {
    try { return localStorage.getItem('deckLang') === 'en' ? 'en' : 'th'; }
    catch (e) { return 'th'; }
  }

  setLang(lang) {
    this.lang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach((el) => {
      if (el.dataset.th === undefined) el.dataset.th = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.th;
    });
    document.querySelectorAll('[data-en-title]').forEach((el) => {
      if (el.dataset.thTitle === undefined) el.dataset.thTitle = el.title;
      el.title = lang === 'en' ? el.dataset.enTitle : el.dataset.thTitle;
    });
    document.title = lang === 'en'
      ? 'Kornravee Sirikhan (Praew) — Business Analyst @ INET'
      : this.thDocTitle;

    if (this.langSwitch) {
      this.langSwitch.dataset.lang = lang;
      this.langSwitch.querySelectorAll('.lang-opt').forEach((btn) => {
        const on = btn.dataset.lang === lang;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', String(on));
      });
    }

    if (this.stepperContainer) {
      this.stepperContainer.querySelectorAll('.dot, .stepper-pill').forEach((pill, i) => {
        pill.title = this.slideTitle(this.slides[i]) || `Slide ${i + 1}`;
      });
    }
    this.updateUI(this.currentSlide);

    try { localStorage.setItem('deckLang', lang); } catch (e) { /* storage unavailable */ }
  }

  slideTitle(slide) {
    if (!slide) return '';
    return (this.lang === 'en' && slide.dataset.titleEn) || slide.dataset.title || '';
  }

  // ========================================================================
  // DOM REFS
  // ========================================================================
  initDOM() {
    this.deckTrack        = document.getElementById('deckTrack');
    this.slides           = Array.from(document.querySelectorAll('.h-slide'));
    this.totalSlides      = this.slides.length;

    this.topSlideBadge    = document.getElementById('topSlideBadge');
    this.topSlideTitle    = document.getElementById('topSlideTitle');
    this.headerProgress   = document.getElementById('headerProgressFill');
    this.stepperContainer = document.getElementById('stepperContainer');

    this.prevBtn          = document.getElementById('prevSlideBtn');
    this.nextBtn          = document.getElementById('nextSlideBtn');

    this.langSwitch       = document.getElementById('langSwitch');

    // Timer
    this.timerDisplay     = document.getElementById('timerDisplay');
    this.timerWidget      = document.getElementById('timerWidget');
  }

  // ========================================================================
  // BUILD BOTTOM STEPPER PILLS
  // ========================================================================
  buildStepper() {
    if (!this.stepperContainer) return;
    this.stepperContainer.innerHTML = '';
    this.slides.forEach((slide, i) => {
      const pill = document.createElement('button');
      pill.className = 'dot';
      pill.dataset.index = i + 1;
      pill.title = slide.dataset.title || `Slide ${i + 1}`;
      pill.addEventListener('click', () => this.goToSlide(i + 1));
      this.stepperContainer.appendChild(pill);
    });
  }

  // ========================================================================
  // SLIDE NAVIGATION
  // ========================================================================
  goToSlide(n) {
    if (n < 1) n = 1;
    if (n > this.totalSlides) n = this.totalSlides;
    const target = this.slides[n - 1];
    if (target && this.deckTrack) {
      this.deckTrack.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }
  }

  nextSlide() { this.goToSlide(this.currentSlide + 1); }
  prevSlide() { this.goToSlide(this.currentSlide - 1); }

  // ========================================================================
  // UPDATE UI (badge, title, progress bar, stepper, arrow buttons)
  // ========================================================================
  updateUI(n) {
    this.currentSlide = n;
    const pad = (v) => String(v).padStart(2, '0');

    // 3D Depth Glass Focus + Fade-Rise: mark the active slide so CSS can
    // bring it to the focal plane and stagger its content in. Slides
    // already passed drift forward (toward the viewer); slides still
    // ahead sit back in depth, waiting their turn.
    this.slides.forEach((slide, i) => {
      const index = i + 1;
      slide.classList.remove('slide-active', 'slide-prev', 'slide-next');
      if (index === n) slide.classList.add('slide-active');
      else if (index < n) slide.classList.add('slide-prev');
      else slide.classList.add('slide-next');
    });

    // Badge & title in top navbar
    if (this.topSlideBadge)
      this.topSlideBadge.textContent = `${pad(n)} / ${pad(this.totalSlides)}`;
    if (this.topSlideTitle)
      this.topSlideTitle.textContent = this.slideTitle(this.slides[n - 1]);

    // Progress bar (0% at slide 1, 100% at last slide)
    const pct = this.totalSlides > 1
      ? ((n - 1) / (this.totalSlides - 1)) * 100
      : 100;
    if (this.headerProgress)
      this.headerProgress.style.width = `${pct}%`;

    // Stepper dots
    if (this.stepperContainer) {
      this.stepperContainer.querySelectorAll('.dot, .stepper-pill').forEach((pill, i) => {
        pill.classList.toggle('active', i + 1 === n);
      });
    }

    // Arrow buttons disabled state
    if (this.prevBtn) this.prevBtn.disabled = n === 1;
    if (this.nextBtn) this.nextBtn.disabled = n === this.totalSlides;
  }

  // ========================================================================
  // DETECT WHICH SLIDE IS VISIBLE (from scroll position)
  // ========================================================================
  onScroll() {
    if (!this.deckTrack) return;
    const slideWidth = this.deckTrack.clientWidth;
    if (slideWidth === 0) return;
    const idx = Math.round(this.deckTrack.scrollLeft / slideWidth) + 1;
    const clamped = Math.max(1, Math.min(idx, this.totalSlides));
    if (clamped !== this.currentSlide) {
      this.updateUI(clamped);
    }
  }

  // ========================================================================
  // 10-MINUTE TIMER LOGIC
  // ========================================================================
  toggleTimer() {
    this.isTimerRunning ? this.pauseTimer() : this.startTimer();
  }

  startTimer() {
    if (this.isTimerRunning) return;
    this.isTimerRunning = true;
    if (this.timerWidget) this.timerWidget.style.borderColor = 'var(--inet-primary)';

    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        this.updateTimerDisplay();
      } else {
        this.pauseTimer();
        alert(this.lang === 'en'
          ? '⏱️ The 10-minute presentation time is up!'
          : '⏱️ ครบเวลา 10 นาทีสำหรับการนำเสนอค่ะ!');
      }
    }, 1000);
  }

  pauseTimer() {
    this.isTimerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.timerWidget) this.timerWidget.style.borderColor = 'var(--border-light)';
  }

  resetTimer() {
    this.pauseTimer();
    this.timerSeconds = 600;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    if (!this.timerDisplay) return;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = this.timerSeconds % 60;
    this.timerDisplay.textContent = `⏱️ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // ========================================================================
  // BIND EVENTS
  // ========================================================================
  bindEvents() {
    // Scroll listener (throttled with requestAnimationFrame)
    if (this.deckTrack) {
      let ticking = false;
      this.deckTrack.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.onScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // Language switch
    if (this.langSwitch) {
      this.langSwitch.querySelectorAll('.lang-opt').forEach((btn) => {
        btn.addEventListener('click', () => this.setLang(btn.dataset.lang));
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevSlide();
      }
    });

    // Mouse wheel → horizontal slide change
    if (this.deckTrack) {
      let wheelLocked = false;
      this.deckTrack.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (wheelLocked) return;
        wheelLocked = true;
        setTimeout(() => { wheelLocked = false; }, 600);
        if (e.deltaY > 0 || e.deltaX > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }, { passive: false });
    }
  }
}

// Global instantiation
window.addEventListener('DOMContentLoaded', () => {
  window.app = new InterviewDashboardApp();
});
