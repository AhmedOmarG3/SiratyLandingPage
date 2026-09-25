// ==========================================================================
// SIRATY LANDING PAGE - INTERACTIONS & SHARING
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const storeUrl = 'https://play.google.com/store/apps/details?id=com.ahmed.siraty';

  const shareTextContent = `🌸 *تطبيق سيرتي - رفيقك الإسلامي اليومي* 🌸
تطبيق إسلامي شامل ومميز بدون أي إعلانات نهائياً:
📖 القرآن الكريم بالرسم العثماني والتفسير وحفظ موضع القراءة
🕌 مواقيت الصلاة الدقيقة وتنبيهات الأذان
🎧 تلاوات كبار القراء مع تحميل سور وآيات وإدارة الذاكرة وحذفها من الإعدادات
📿 أذكار الصباح والمساء، وحصن المسلم، وسبحة ذكية
🧭 اتجاه القبلة الدقيق
🎥 أحكام التجويد ودورات مرئية ميسرة للمبتدئين

📱 حمله مجاناً من متجر Google Play:
${storeUrl}`;

  // Toast Functionality
  const toast = document.getElementById('toastMessage') || document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copy to Clipboard Helper
  async function copyText(text, successMsg) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMsg);
    } catch (err) {
      showToast('يرجى تحديد النص ونسخه يدوياً');
    }
  }

  // Copy Share Text & Link Button
  const copyShareBtn = document.getElementById('copyShareBtn');
  const copyBtnText = document.getElementById('copyBtnText') || document.getElementById('copyBtnLabel');
  if (copyShareBtn) {
    copyShareBtn.addEventListener('click', () => {
      copyText(shareTextContent, 'تم نسخ الرسالة التسويقية ورابط المتجر! 📋');
      if (copyBtnText) {
        const originalText = copyBtnText.textContent;
        copyBtnText.textContent = 'تم النسخ بنجاح ✓';
        setTimeout(() => {
          copyBtnText.textContent = originalText;
        }, 2500);
      }
    });
  }

  // Copy Store Link Only
  const copyStoreLinkBtn = document.getElementById('copyStoreLinkBtn') || document.getElementById('copyDirectLinkBtn');
  if (copyStoreLinkBtn) {
    copyStoreLinkBtn.addEventListener('click', () => {
      copyText(storeUrl, 'تم نسخ رابط متجر Google Play بنجاح! 🔗');
    });
  }

  // Trigger Native Share (Mobile)
  const triggerNativeShare = document.getElementById('triggerNativeShare') || document.getElementById('nativeShareBtn');
  const heroShareBtn = document.getElementById('heroShareBtn') || document.getElementById('heroShareTrigger');
  const navShareBtn = document.getElementById('navShareBtn') || document.getElementById('topShareBtn');

  async function handleShareAction() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'تطبيق سيرتي - رفيقك الإسلامي اليومي',
          text: shareTextContent,
          url: storeUrl,
        });
        showToast('جزاك الله خيراً على مشاركة الخير! 🌸');
      } catch (err) {
        if (err.name !== 'AbortError') {
          scrollToShareSection();
        }
      }
    } else {
      scrollToShareSection();
    }
  }

  function scrollToShareSection() {
    const section = document.getElementById('share-section') || document.getElementById('share-hub');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      showToast('اختر وسيلة المشاركة المفضلة لديك أدناه ✨');
    }
  }

  if (triggerNativeShare) triggerNativeShare.addEventListener('click', handleShareAction);
  if (heroShareBtn) heroShareBtn.addEventListener('click', handleShareAction);
  if (navShareBtn) navShareBtn.addEventListener('click', handleShareAction);

  // Configure Social Sharing Links
  const encodedShareText = encodeURIComponent(shareTextContent);
  const encodedUrl = encodeURIComponent(storeUrl);

  const shareWhatsapp = document.getElementById('shareWhatsapp') || document.getElementById('btnWhatsapp');
  if (shareWhatsapp) {
    shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodedShareText}`;
  }

  const shareTelegram = document.getElementById('shareTelegram') || document.getElementById('btnTelegram');
  if (shareTelegram) {
    shareTelegram.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent('تطبيق سيرتي - رفيقك الإسلامي اليومي بدون إعلانات')}`;
  }

  const shareFacebook = document.getElementById('shareFacebook') || document.getElementById('btnFacebook');
  if (shareFacebook) {
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  }

  const shareTwitter = document.getElementById('shareTwitter') || document.getElementById('btnTwitter');
  if (shareTwitter) {
    shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodedShareText}`;
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu') || document.getElementById('navLinks');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link, .nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('topHeader') || document.getElementById('navbar');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 1. Scroll Reveal with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 2. 3D Mouse Parallax Tilt for Hero Banner
  const heroVisual = document.querySelector('.hero-visual');
  const bannerFrame = document.getElementById('heroBannerFrame');
  if (heroVisual && bannerFrame && window.matchMedia('(hover: hover)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / (rect.height / 2)) * 10;
      const rotateY = (x / (rect.width / 2)) * 10;

      bannerFrame.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      bannerFrame.style.transform = '';
    });
  }

  // 3. Interactive Mini Tasbeeh Demo
  const tasbeehBtn = document.getElementById('tasbeehInteractiveBtn');
  const tasbeehText = document.getElementById('tasbeehText');
  const tasbeehCounter = document.getElementById('tasbeehCounter');
  if (tasbeehBtn && tasbeehCounter) {
    let count = 0;
    const phrases = [
      'سُبْحَانَ اللَّهِ',
      'الْحَمْدُ لِلَّهِ',
      'لا إِلَهَ إِلا اللَّهُ',
      'اللَّهُ أَكْبَرُ',
      'أَسْتَغْفِرُ اللَّهَ'
    ];
    let phraseIndex = 0;

    tasbeehBtn.addEventListener('click', () => {
      count++;
      tasbeehCounter.textContent = count;
      tasbeehCounter.classList.add('pop');
      setTimeout(() => tasbeehCounter.classList.remove('pop'), 200);

      if (navigator.vibrate) {
        navigator.vibrate(35);
      }

      if (count % 33 === 0) {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        if (tasbeehText) {
          tasbeehText.textContent = phrases[phraseIndex];
        }
        showToast(`أتممت ${count} تسبيحة.. تقبل الله طاعتكم! 📿✨`);
      }
    });
  }

  // 4. Subtle Ripple Click Effect on Action Buttons
  document.querySelectorAll('.btn, .tasbeeh-interactive-btn, .social-btn').forEach(btn => {
    btn.classList.add('btn-ripple');
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
});

