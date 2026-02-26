gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

window.addEventListener("load", () => {

  /*================ PRELOADER TIMELINE ===============*/
  const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

  // INITIAL
  tl.from(".text", {
     opacity: 0,
      scale: 0.8,
       duration: 1 
      })

  // DOT DROP
  .from(".dot", {
    y: -window.innerHeight,
    duration: 1.2,
    ease: "bounce.out"
  }, "-=0.5")

  // REVEAL  HOMEPAGE
  .addLabel("reveal")


.to(".dot", {
  scale: 100,
  duration: 1.6
}, "reveal")

.to(".text", {
  opacity: 0,
  duration: 0.4
}, "reveal")

.to(".preloader", {
  opacity: 0,
  duration: 0.6,
  onComplete: () => {
    document.querySelector(".preloader").style.display = "none";
    document.body.style.overflow = "auto";

    initScrollAnimations();
  }
}, "-=0.8")

// navbar and video 
.from(".navbar", {
  opacity: 0,
  y: -20,
  duration: 0.8
}, "-=0.3")

// headline wipe 
.from(".hero-line", {
  yPercent: 100,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power4.out"
}, "-=0.2")

// move content
.to(".hero-content", {
  top: "40%",
  left: "15%",
  transform: "translateX(0)",
  textAlign: "left",
  duration: 1.2,
  ease: "power3.inOut"
}, "-=0.6")

// red dot fade in
.from(".red-dot", {
  opacity: 0,
  scale: 0,
  duration: 0.5,
  ease: "back.out(1.7)"
}, "-=0.4")

// cta fade in
.from(".hero-cta", {
  opacity: 0,
  y: 30,
  duration: 0.8
}, "-=0.3");
  function initScrollAnimations() {

    ScrollTrigger.refresh();

    /*--------- HERO PIN ---------*/
    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: 1,
      refreshPriority: 2,
      onUpdate: (self) => {
        gsap.set(".hero .overlay", {
          background: `rgba(0,0,0,${0.55 + self.progress * 0.3})`
        });
      }
    });

    /* ===== HERO SECTION 2 (DARKEN OVERLAY) ===== */
    const hs2Overlay = document.querySelector(".hero-section .section-overlay");

    if (hs2Overlay) {
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top center",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(hs2Overlay, {
            background: `rgba(0,0,0,${0.55 + self.progress * 0.33})`
          });
        }
      });
    }

    /* ========== HERO SECTION 2  ===========*/

    const track = document.querySelector(".hs2-cards-track");

    if (track) {

      const cards = Array.from(track.children);

      // clone 
      cards.forEach(card => {
        track.appendChild(card.cloneNode(true));
      });

      requestAnimationFrame(() => {

        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
          x: -totalWidth,
          duration: 30,      
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
          }
        });

      });
    }

    /* ========== NUMBER STATS  ========== */

    const numTitle = document.querySelector(".numbers-title");
    if (numTitle) {
      numTitle.style.overflow = "hidden";
      numTitle.style.display  = "block";

      gsap.fromTo(numTitle,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".numbers-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(".numbers-title .scroll-anchor",
        { y: -60, opacity: 1, display: "inline-block" },
        {
          y: 0,
          opacity: 0,
          duration: 0.8,
          ease: "bounce.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: ".numbers-section",
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    gsap.utils.toArray(".stat-item").forEach((item, i) => {
      const number = item.querySelector(".stat-number");
      const text   = item.querySelector(".stat-text");

      if (!number || !text) return;

      const baseDelay = i * 0.12;

      gsap.fromTo(number,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
          delay: baseDelay,
          scrollTrigger: {
            trigger: ".numbers-section",
            start: "top 65%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(text,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: baseDelay + 0.18,
          scrollTrigger: {
            trigger: ".numbers-section",
            start: "top 65%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    /* ========== ETHOS SECTION ========== */

    const ethosTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ethos-section",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    ethosTl.from(".ethos-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    });

    ethosTl.from(".ethos-line", {
      yPercent: 110,
      duration: 1,
      stagger: 0.13,
      ease: "expo.out"
    }, "-=0.2");

    ethosTl.from(".ethos-main-title .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.5");

    ethosTl.from(".anniversary-badge", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.4");

    ethosTl.from(".ethos-image-container", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");

    ethosTl.from(
      [".ethos-content p", ".learn-more-btn"],
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"
      },
      "-=0.6"
    );


    /* ========== ADVANTAGE SECTION ========== */

    const advTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".advantage-section",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    advTl.from(".advantage-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    });

    advTl.from(".adv-line", {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out"
    }, "-=0.2");

    advTl.from(".advantage-main-title .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.3");

    advTl.from(".advantage-item", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.3");


    /* ========== CONNECTIONS SECTION ========== */

    const connTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".connections-section",
        start: "top 70%",
        toggleActions: "play none none none"
      }
    });

    connTl.from(".conn-line", {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.1,
      ease: "power4.out"
    });

    connTl.from(".connections-title .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.3");

    connTl.from(".top-text", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.2");

    connTl.from(".pdu-image-wrapper", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out"
    }, "-=0.4");

    connTl.from(".future-title", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.4");

    connTl.from(".feature-description p", {
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.12,
      ease: "power3.out"
    }, "-=0.3");

    connTl.from(".partner-logos", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

    connTl.from(".connections-section .universal-learn-btn", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");


    /* ========== TRUST SECTION ========== */

    const trustTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".trust-section",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // TITLE
    trustTl.from(".trust-title", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    });

    // RED DOT
    trustTl.from(".trust-title .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.1");

    //  PARAGRAPHS 
    trustTl.from(".trust-intro", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.2");

    
    //  LOGO
    trustTl.fromTo(".trust-section .partner-logo",
      { opacity: 0, x: 20 },
      {
        opacity: 0.8,
        x: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out"
      }
    , "-=0.2");


    /* ========== AWARDS ========== */

    const awardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".awards-title",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    awardsTl.from(".awards-line", {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.12,
      ease: "power4.out"
    });

    awardsTl.from(".awards-title .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.3");

    awardsTl.from(".awards-text", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

    awardsTl.from(".btn-red-award", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");

    awardsTl.from(".award-badge", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.3");

    awardsTl.from(".award-sub-text", {
      opacity: 0,
      y: 15,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.3");


    /* ========== TESTIMONIALS SECTION ========== */

    const testTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".feedback-section",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    //  CARD 
    testTl.fromTo(".testimonial-card",
      {
        opacity: 0,
        rotateX: -25,
        transformOrigin: "top center",
        transformPerspective: 1000
      },
      {
        opacity: 1,
        rotateX: 0,
        duration: 1,
        ease: "power3.out"
      }
    );

    // TITLE LINES WIPE
    testTl.from(".test-line", {
      yPercent: 110,
      duration: 0.7,
      stagger: 0.08,
      ease: "power4.out"
    }, "-=0.5");

    //  RED DOT 
    testTl.from(".testimonial-heading .scroll-anchor", {
      y: -50,
      duration: 0.6,
      ease: "bounce.out"
    }, "-=0.3");

    //  CTA
    testTl.from(".btn-testimonial-cta", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.3");

    //  TEXT
    testTl.from([".quote-text", ".quote-author"], {
      opacity: 0,
      y: 25,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.4");


    /*========== NAVBAR  =========*/

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      onEnter:      () => gsap.to(".navbar", { opacity: 1, duration: 0.5 }),
      onLeave:      () => gsap.to(".navbar", { opacity: 0, duration: 0.5 }),
      onEnterBack:  () => gsap.to(".navbar", { opacity: 1, duration: 0.5 }),
      onLeaveBack:  () => gsap.to(".navbar", { opacity: 0, duration: 0.5 })
    });

    const prodCards = gsap.utils.toArray(".prod-card");
    const prodDots  = gsap.utils.toArray(".prod-dot");
    const numCards  = prodCards.length;

    gsap.set(prodCards, { yPercent: 100, opacity: 1 });

    let activeProdCard = -1;

    function setProdDot(index) {
      if (index === activeProdCard) return;
      activeProdCard = index;
      prodDots.forEach((d, i) => d.classList.toggle("active", i <= index));
    }

   ScrollTrigger.create({
      id: "products-pin",
      trigger: ".products-section",
      start: "top top",
      end: () => `+=${numCards * window.innerHeight}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: 1,
      onUpdate: (self) => {
        const step = 1 / numCards;
        prodCards.forEach((card, i) => {
          const cardStart = i * step;
          const localProg = Math.min(1, Math.max(0, (self.progress - cardStart) / step));
          const enterProg = Math.min(1, localProg / 0.5);
          gsap.set(card, {
            yPercent: 100 * (1 - enterProg),
            zIndex: i + 1
          });
          if (enterProg >= 1) setProdDot(i);
        });
      },
      onLeaveBack: () => {
        gsap.set(prodCards, { yPercent: 100 });
        prodDots.forEach(d => d.classList.remove("active"));
        activeProdCard = -1;
      }
    });

    prodDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const st = ScrollTrigger.getById("products-pin");
        if (!st) return;
        const step     = 1 / numCards;
        const progress = i * step + step * 0.5;
        const target   = st.start + progress * (st.end - st.start);
        gsap.to(window, { scrollTo: target, duration: 0.8, ease: "power2.inOut" });
      });
    });


    /* ============ UNIVERSAL SECTION ========== */

    const universalWrapper = document.querySelector(".universal-wrapper");

    if (universalWrapper) {

      
      gsap.set(".universal-section", {
        scale: 0.8,
        transformOrigin: "center center"
      });

      gsap.to(".universal-section", {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".universal-wrapper",
          start: "top bottom",
          end: "top top",
          scrub: 1.5
        }
      });

      // CONTENT
      const univTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".universal-wrapper",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      univTl.fromTo(".universal-title",
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      univTl.fromTo(".universal-subtitle",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      );

      univTl.fromTo(".universal-body p",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" },
        "-=0.3"
      );

      // 
      univTl.fromTo(
        [".cta-text", ".universal-section .universal-learn-btn"],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out" },
        "-=0.3"
      );

    }


   
    /*============== FLOATING SCROLL DOT =============== */

    const scrollDot = document.querySelector(".scroll-dot");

    if (scrollDot) {

      gsap.set(scrollDot, { opacity: 0, scale: 0, xPercent: -50, yPercent: -50 });

      gsap.to(scrollDot, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        delay: 4.5
      });

      const setX = gsap.quickSetter(scrollDot, "left", "px");
      const setY = gsap.quickSetter(scrollDot, "top",  "px");

      let dotCurrentX = 0;
      let dotCurrentY = 0;
      let dotTargetX  = 0;
      let dotTargetY  = 0;

      gsap.ticker.add(() => {
        dotCurrentX += (dotTargetX - dotCurrentX) * 0.08;
        dotCurrentY += (dotTargetY - dotCurrentY) * 0.08;
        setX(dotCurrentX);
        setY(dotCurrentY);
      });

      const anchorPoints = [
        { trigger: ".hero",                element: ".hero .scroll-anchor" },
        { trigger: ".welcome-section",     element: ".welcome-section .scroll-anchor" },
        { trigger: ".numbers-section",     element: ".numbers-section .scroll-anchor" },
        { trigger: ".ethos-section",       element: ".ethos-section .scroll-anchor" },
        { trigger: ".advantage-section",   element: ".advantage-section .scroll-anchor" },
        { trigger: ".universal-section",   element: ".universal-section .scroll-anchor" },
        { trigger: ".connections-section", element: ".connections-section .scroll-anchor" },
        { trigger: ".products-section",    element: ".products-header .scroll-anchor" },
        { trigger: ".trust-section",       element: ".trust-section .scroll-anchor" },
        { trigger: ".awards-title",        element: ".awards-title"},
        { trigger: ".feedback-section",    element: ".feedback-section .scroll-anchor"},
        { trigger: ".newsletter-section",  element: ".newsletter-section .scroll-anchor"}
      
      ];

      let activeTarget = null;

      window.addEventListener("scroll", () => {
        if (!activeTarget) return;
        const rect = activeTarget.getBoundingClientRect();
        dotTargetX = rect.left + rect.width  / 2;
        dotTargetY = rect.top  + rect.height / 2;
      }, { passive: true });

      anchorPoints.forEach((point) => {
        const triggerEl = document.querySelector(point.trigger);
        const targetEl  = document.querySelector(point.element);

        if (!triggerEl || !targetEl) return;

        ScrollTrigger.create({
          trigger: triggerEl,
          start: "top 70%",
          end: "bottom 30%",
          onToggle: (self) => {
            if (self.isActive) {
              activeTarget = targetEl;
              const rect = activeTarget.getBoundingClientRect();
              dotTargetX = rect.left + rect.width  / 2;
              dotTargetY = rect.top  + rect.height / 2;
            }
          }
        });
      });

    }

    /*=============== WELCOME HEADING REVEAL ===============*/

    gsap.set(".thor-heading-line", { clearProps: "all" });
    gsap.set(".thor-heading-line", { yPercent: 120, opacity: 0 });

    gsap.to(".thor-heading-line", {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".welcome-section",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    gsap.to(".welcome-section .red-dot", {
      opacity: 1,
      duration: 0.6,
      delay: 0.8,
      scrollTrigger: {
        trigger: ".welcome-section",
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    /*=============== PRODUCTS MOBILE MATCHMEDIA ===============*/

    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      const st = ScrollTrigger.getById("products-pin");
      if (st) st.kill();
      gsap.set(".prod-card", { clearProps: "all" });
    });

  }

  /*============== NEWSLETTER & FOOTER SEQUENCE ============*/

  const newsletterT2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#newsletter",
      start: "top 75%",
      toggleActions: "play none none reverse"
    }
  });

  newsletterT2
    .from(".join-line span", {
      y: "-110%",
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    })
    .from(".newsletter-section p, .newsletter-form", {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.3");

  // FOOTER PARALLAX 
  gsap.from(".main-footer", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".main-footer",
      start: "top bottom",
      end: "bottom bottom",
      scrub: true
    }
  });

});