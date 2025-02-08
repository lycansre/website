/************************************************************
 * 1) Translations for i18n (Internationalization)
 ************************************************************/
const translations = {
    en: {
      "nav.brand": "My Portfolio",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.skills": "Skills",
      "nav.contact": "Contact",
      "nav.darkMode": "Dark Mode",
  
      "hero.title": "Hello, I'm Meshall",
      "hero.subtitle": "A passionate programmer & designer who crafts elegant solutions with code.",
      "hero.button": "Discover More",
  
      "about.title": "About Me",
      "about.text": "I’m a dedicated developer with a passion for both the artistic and technical sides of programming. I love creating visually stunning experiences that blend smooth user interfaces with well-structured code.",
  
      "projects.title": "Projects",
      "projects.items.0.title": "Artful Web App",
      "projects.items.0.description": "A web app that showcases dynamic paintings generated with JavaScript and canvas. It harnesses 2D rendering to produce unique designs every time.",
      "projects.items.0.link": "View on GitHub",
      "projects.items.1.title": "Portfolio Site",
      "projects.items.1.description": "A modern portfolio theme built with React and CSS animations for a fluid user experience.",
      "projects.items.1.link": "View on GitHub",
  
      "skills.title": "Skills",
      "skills.items.0": "HTML/CSS",
      "skills.items.1": "JavaScript",
      "skills.items.2": "Flutter",
      "skills.items.3": "Responsive Design",
      "skills.items.4": "IOS Developer",
      
  
      "contact.title": "Contact",
      "contact.subtitle": "Interested in working together or just want to say hello?",
      "contact.githubLabel": "GitHub:",
  
      "footer.name": "Meshall",
      "footer.crafted": "Crafted with",
      "footer.andCode": "and Code"
    },
  
    ar: {
      "nav.brand": "ملفي الشخصي",
      "nav.home": "الرئيسية",
      "nav.about": "من أنا",
      "nav.projects": "مشاريعي",
      "nav.skills": "مهاراتي",
      "nav.contact": "تواصل معي",
      "nav.darkMode": "الوضع الليلي",
  
      "hero.title": "مرحباً، اسمي [مشعل]",
      "hero.subtitle": "مبرمج ومصمم شغوف أصنع حلولًا أنيقة باستخدام البرمجة.",
      "hero.button": "اكتشف المزيد",
  
      "about.title": "من أنا",
      "about.text": "أنا مطور متحمس للجوانب الفنية والتقنية في البرمجة. أحب إنشاء تجارب مرئية مذهلة تجمع بين واجهات سلسة وشيفرة منظمة.",
  
      "projects.title": "مشاريعي",
      "projects.items.0.title": "تطبيق ويب فني",
      "projects.items.0.description": "تطبيق ويب يعرض لوحات ديناميكية تم إنشاؤها باستخدام جافاسكربت وcanvas. يقدم تصاميم فريدة في كل مرة.",
      "projects.items.0.link": "عرض على GitHub",
      "projects.items.1.title": "موقع بورتفوليو",
      "projects.items.1.description": "قالب حديث لموقع شخصي مبني باستخدام React ورسوم متحركة في CSS لواجهة مستخدم سلسة.",
      "projects.items.1.link": "عرض على GitHub",
  
      "skills.title": "مهاراتي",
      "skills.items.0": "HTML/CSS",
      "skills.items.1": "جافاسكربت",
      "skills.items.2": "Flutter",
      "skills.items.3": "تصميم تفاعلي",
  
      "contact.title": "تواصل معي",
      "contact.subtitle": "مهتم بالعمل معًا أو تريد فقط إلقاء التحية؟",
      "contact.githubLabel": "جيت هب:",
  
      "footer.name": "مشعل",
      "footer.crafted": "صنع بإتقان",
      "footer.andCode": "و البرمجة"
    },
  };
  
  /************************************************************
   * 2) APPLY TRANSLATIONS BASED ON data-i18n
   ************************************************************/
  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      element.textContent = translations[lang][key];
    });
    // Update <html> lang attribute
    document.getElementById("html-root").setAttribute("lang", lang);
  
    // If Arabic, switch direction to RTL; otherwise remove
    if (lang === "ar") {
      document.body.setAttribute("dir", "rtl");
    } else {
      document.body.removeAttribute("dir");
    }
  }
  
  /************************************************************
   * 3) THEME DETECTION & TOGGLING
   ************************************************************/
  function initTheme() {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      // Check system preference if not stored
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        storedTheme = "dark";
      } else {
        storedTheme = "light";
      }
      localStorage.setItem("theme", storedTheme);
    }
    setTheme(storedTheme);
  }
  
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  
    // Update button text
    const themeBtnText = document.querySelector("#theme-toggle-btn span");
    const currentLang = document.getElementById("html-root").getAttribute("lang");
    if (theme === "dark") {
      themeBtnText.textContent = (currentLang === "ar") ? "الوضع النهاري" : "Light Mode";
    } else {
      themeBtnText.textContent = (currentLang === "ar") ? "الوضع الليلي" : "Dark Mode";
    }
  }
  
  /************************************************************
   * 4) ON DOMContentLoaded
   ************************************************************/
  document.addEventListener("DOMContentLoaded", () => {
    // (A) INIT THEME
    initTheme();
  
    // (B) INIT LANGUAGE
    let storedLang = localStorage.getItem("language");
    if (!storedLang) {
      storedLang = "en"; // default
      localStorage.setItem("language", "en");
    }
    const languageSelect = document.getElementById("language-select");
    languageSelect.value = storedLang;
    applyTranslations(storedLang);
  
    // Language change event
    languageSelect.addEventListener("change", (e) => {
      const chosenLang = e.target.value;
      localStorage.setItem("language", chosenLang);
      applyTranslations(chosenLang);
      // Refresh theme button text after language switch
      const currentTheme = localStorage.getItem("theme");
      setTheme(currentTheme);
    });
  
    // THEME TOGGLE BUTTON
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    themeToggleBtn.addEventListener("click", () => {
      let currentTheme = localStorage.getItem("theme") || "light";
      currentTheme = (currentTheme === "light") ? "dark" : "light";
      setTheme(currentTheme);
    });
  
    // HAMBURGER MENU TOGGLE
    const menuToggleBtn = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    menuToggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  
    // Optionally close menu after clicking a link on mobile
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
      });
    });
  });
  
  /************************************************************
   * 5) SMOOTH SCROLL FUNCTION
   ************************************************************/
  function scrollToSection(selector) {
    const section = document.querySelector(selector);
    section.scrollIntoView({ behavior: "smooth" });
  }
  