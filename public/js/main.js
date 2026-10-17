document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. THEME SWITCHER (Maker's Warm Stationery ⇄ Super Travel Luxury)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('cfi_design_theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        updateThemeBtnLabel(savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'super-travel' ? 'stationery' : 'super-travel';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('cfi_design_theme', newTheme);
            updateThemeBtnLabel(newTheme);
        });
    }

    function updateThemeBtnLabel(theme) {
        if (!themeToggleBtn) return;
        if (theme === 'super-travel') {
            themeToggleBtn.innerHTML = 'Switch: 🖋️ Stationery';
        } else {
            themeToggleBtn.innerHTML = 'Switch: 🌸 Super Travel';
        }
    }

    // ==========================================================================
    // 2. THE TRAVELLING PRODUCT (Keyframed Position Interpolation on Scroll)
    // ==========================================================================
    const travellingProduct = document.getElementById('travelling-product');
    const spreadWordmark = document.getElementById('spreadWordmark');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Stops: scrollThreshold, x (vw), y (vh), scale, rotation (deg), opacity
    const stops = [
        { scroll: 0,    x: 58, y: 16, scale: 1.0,  rot: -8,  opacity: 1 },
        { scroll: 650,  x: 10, y: 28, scale: 0.85, rot: 14,  opacity: 1 },
        { scroll: 1400, x: 62, y: 38, scale: 0.88, rot: -4,  opacity: 1 },
        { scroll: 2100, x: 16, y: 48, scale: 0.78, rot: 10,  opacity: 0.9 },
        { scroll: 2700, x: 16, y: 55, scale: 0.65, rot: 0,   opacity: 0 }
    ];

    function handleScrollAnimations() {
        const scrollY = window.scrollY;

        // 2a. Travelling Product Interpolation
        if (travellingProduct && !prefersReducedMotion && window.innerWidth > 860) {
            let activeIndex = 0;
            for (let i = 0; i < stops.length - 1; i++) {
                if (scrollY >= stops[i].scroll && scrollY <= stops[i + 1].scroll) {
                    activeIndex = i;
                    break;
                }
            }

            if (scrollY > stops[stops.length - 1].scroll) {
                travellingProduct.style.opacity = '0';
                travellingProduct.style.visibility = 'hidden';
            } else {
                travellingProduct.style.visibility = 'visible';
                const s1 = stops[activeIndex];
                const s2 = stops[activeIndex + 1];
                const progress = Math.min(1, Math.max(0, (scrollY - s1.scroll) / (s2.scroll - s1.scroll)));

                // Linear interpolation with smooth cubic easing
                const eased = progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                const curX = s1.x + (s2.x - s1.x) * eased;
                const curY = s1.y + (s2.y - s1.y) * eased;
                const curScale = s1.scale + (s2.scale - s1.scale) * eased;
                const curRot = s1.rot + (s2.rot - s1.rot) * eased;
                const curOp = s1.opacity + (s2.opacity - s1.opacity) * eased;

                travellingProduct.style.transform = `translate3d(${curX}vw, ${curY}vh, 0) rotate(${curRot}deg) scale(${curScale})`;
                travellingProduct.style.opacity = curOp;
            }
        }

        // 2b. Spread Wordmark at Hero foot (Spread outward from center & sink)
        if (spreadWordmark && scrollY <= 800) {
            const spreadProgress = Math.min(1, scrollY / 600);
            const extraTracking = spreadProgress * 0.18; // expands letter spacing
            const sinkY = 12 + spreadProgress * 45;      // sinks down from 12% to 57%
            spreadWordmark.style.transform = `translateY(${sinkY}%)`;
            spreadWordmark.style.letterSpacing = `${extraTracking}em`;
        }
    }

    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    handleScrollAnimations(); // Initial run

    // ==========================================================================
    // 3. DEMONSTRATION THAT DRAWS ITSELF (Self-Drawing SVG + Variant Picker)
    // ==========================================================================
    const variantButtons = document.querySelectorAll('.variant-btn');
    const drawingPath = document.getElementById('demoDrawingPath');
    const factKicker1 = document.getElementById('factKicker1');
    const factText1 = document.getElementById('factText1');
    const factKicker2 = document.getElementById('factKicker2');
    const factText2 = document.getElementById('factText2');
    const factKicker3 = document.getElementById('factKicker3');
    const factText3 = document.getElementById('factText3');

    // SVG paths and facts for each variant
    const variantData = [
        {
            // Variant 0: Balcony Perimeter & 120cm Barrier
            path: 'M 60,320 L 220,320 L 220,120 L 320,120 L 320,320 L 520,320 L 520,100 L 740,100 L 740,320',
            strokeWidth: 2.4,
            facts: [
                { kicker: 'FACT 01: 1200MM PERIMETER', text: 'Mandatory non-climbable vertical balustrade height above ground' },
                { kicker: 'FACT 02: 0MM CLIMBABLE SLATS', text: 'Strict elimination of horizontal rungs that double as child footholds' },
                { kicker: 'FACT 03: 95MM MAX APERTURE', text: 'Maximum baluster clearance preventing pediatric head entrapment' }
            ]
        },
        {
            // Variant 1: Car-Free Courtyard Radius
            path: 'M 100,200 C 100,90 260,90 400,90 C 540,90 700,90 700,200 C 700,310 540,310 400,310 C 260,310 100,310 100,200 Z',
            strokeWidth: 2.2,
            facts: [
                { kicker: 'FACT 01: ZERO TRAFFIC INGRESS', text: 'Bollard-shielded central courtyard completely detached from driveways' },
                { kicker: 'FACT 02: 100% SIGHTLINE COVERAGE', text: 'Direct visibility from perimeter shaded caregiver seating' },
                { kicker: 'FACT 03: 4.2-YEAR TENANT RETENTION', text: 'Average family tenancy length recorded in car-free certified estates' }
            ]
        },
        {
            // Variant 2: 60cm Dual Handrail Transit
            path: 'M 60,280 L 740,280 M 60,190 L 740,190 M 180,120 L 180,340 M 620,120 L 620,340',
            strokeWidth: 2.6,
            facts: [
                { kicker: 'FACT 01: 600MM CHILD RAIL', text: 'Smooth secondary oak handrail positioned at independent child reach' },
                { kicker: 'FACT 02: 0.60S ACOUSTIC CEILING', text: 'Acoustic-damping finishes taming corridor echo and sensory distress' },
                { kicker: 'FACT 03: 1800MM PASSAGE WIDTH', text: 'Barrier-free corridor allowance accommodating side-by-side strollers' }
            ]
        },
        {
            // Variant 3: Rooftop Sky-Deck Wind Buffer
            path: 'M 80,300 L 260,300 L 260,80 L 540,80 L 540,300 L 720,300 M 260,80 L 540,80',
            strokeWidth: 2.4,
            facts: [
                { kicker: 'FACT 01: 1800MM TEMPERED GLASS', text: 'Full-height laminated glass wind buffer with anti-climb smooth finish' },
                { kicker: 'FACT 02: 1000MM VEGETATIVE SETBACK', text: 'Deep planter buffer preventing children from leaning over balustrade' },
                { kicker: 'FACT 03: 1500MM BIOMETRIC LATCH', text: 'High-mounted smart egress control ensuring accompanied child access' }
            ]
        }
    ];

    function drawPath(pathElement) {
        if (!pathElement) return;
        const length = pathElement.getTotalLength();
        pathElement.style.strokeDasharray = length;
        pathElement.style.strokeDashoffset = length;
        pathElement.getBoundingClientRect(); // Trigger layout
        pathElement.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
        pathElement.style.strokeDashoffset = '0';
    }

    function setVariant(index) {
        const v = variantData[index];
        if (!v || !drawingPath) return;

        variantButtons.forEach((btn, i) => {
            btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
        });

        drawingPath.setAttribute('d', v.path);
        drawingPath.style.strokeWidth = v.strokeWidth;
        drawPath(drawingPath);

        // Update facts
        if (factKicker1 && factText1) {
            factKicker1.textContent = v.facts[0].kicker;
            factText1.textContent = v.facts[0].text;
        }
        if (factKicker2 && factText2) {
            factKicker2.textContent = v.facts[1].kicker;
            factText2.textContent = v.facts[1].text;
        }
        if (factKicker3 && factText3) {
            factKicker3.textContent = v.facts[2].kicker;
            factText3.textContent = v.facts[2].text;
        }
    }

    variantButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => setVariant(idx));
    });

    // Draw on entry via IntersectionObserver
    const demoSection = document.getElementById('demonstration');
    if (demoSection) {
        let hasDrawn = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasDrawn) {
                    hasDrawn = true;
                    setVariant(0);
                    observer.unobserve(demoSection);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(demoSection);
    }

    // ==========================================================================
    // 4. GAMIFIED SIMULATOR: CHILD VIEW (95cm) vs ADULT VIEW (170cm)
    // ==========================================================================
    const simViewBtns = document.querySelectorAll('.sim-view-btn');
    const simStageBox = document.getElementById('simStageBox');
    const simEyeLabel = document.getElementById('simEyeLabel');
    const simScoreNum = document.getElementById('simScoreNum');
    const hotspots = document.querySelectorAll('.hotspot-pin');
    let simScore = 40;

    simViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            simViewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;

            if (view === 'child') {
                simStageBox.classList.add('child-view');
                simEyeLabel.textContent = "PERSPECTIVE: 95CM (TODDLER EYE LEVEL) • HAZARDS ACTIVE";
                hotspots.forEach(p => p.style.display = 'flex');
                if (simScoreNum) simScoreNum.textContent = `${simScore}/100`;
            } else {
                simStageBox.classList.remove('child-view');
                simEyeLabel.textContent = "PERSPECTIVE: 170CM (ADULT EYE LEVEL) • BLIND SPOTS HIDDEN";
                hotspots.forEach(p => p.style.display = 'none');
                if (simScoreNum) simScoreNum.textContent = "N/A (ADULT VIEW)";
            }
        });
    });

    hotspots.forEach(pin => {
        pin.addEventListener('click', () => {
            if (!pin.classList.contains('resolved')) {
                pin.classList.add('resolved');
                pin.textContent = '✓';
                const pts = parseInt(pin.dataset.points) || 15;
                simScore = Math.min(100, simScore + pts);
                if (simScoreNum) simScoreNum.textContent = `${simScore}/100`;
                const tip = pin.querySelector('.pin-tooltip');
                if (tip) tip.innerHTML = `<strong>RETROFIT APPLIED (+${pts} PTS)</strong><br>Complies with Child-Friendly Index standards.`;
            }
        });
    });

    // ==========================================================================
    // 5. 60-SEC QUICK SPACE AUDITOR (QUIZ)
    // ==========================================================================
    const auditorOptions = document.querySelectorAll('.auditor-option');
    const quizScoreResult = document.getElementById('quizScoreResult');
    const quizTierLabel = document.getElementById('quizTierLabel');

    let auditorPoints = { q1: 0, q2: 0 };

    auditorOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const group = opt.dataset.group;
            document.querySelectorAll(`.auditor-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            auditorPoints[group] = parseInt(opt.dataset.pts) || 0;

            const total = (auditorPoints.q1 || 0) + (auditorPoints.q2 || 0) + 50; // base calibration
            if (quizScoreResult) quizScoreResult.textContent = `${total}/100`;

            if (quizTierLabel) {
                if (total >= 90) {
                    quizTierLabel.textContent = "PLATINUM SANCTUARY (CERTIFIED)";
                } else if (total >= 75) {
                    quizTierLabel.textContent = "GOLD HAVEN (HIGH COMPLIANCE)";
                } else {
                    quizTierLabel.textContent = "SILVER (RETROFIT RECOMMENDED)";
                }
            }
        });
    });

    // ==========================================================================
    // 6. PROFESSIONAL CONSULTATION SUITE MODAL
    // ==========================================================================
    const contactModal = document.getElementById('contactModal');
    const openContactBtns = document.querySelectorAll('.open-contact-btn');
    const contactCloseBtn = document.getElementById('contactCloseBtn');

    openContactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactModal) contactModal.classList.add('active');
        });
    });

    if (contactCloseBtn && contactModal) {
        contactCloseBtn.addEventListener('click', () => contactModal.classList.remove('active'));
    }

    const tabBtnChannels = document.getElementById('tabBtnChannels');
    const tabBtnForm = document.getElementById('tabBtnForm');
    const tabContentChannels = document.getElementById('tabContentChannels');
    const tabContentForm = document.getElementById('tabContentForm');

    if (tabBtnChannels && tabBtnForm && tabContentChannels && tabContentForm) {
        tabBtnChannels.addEventListener('click', () => {
            tabBtnChannels.classList.add('active');
            tabBtnForm.classList.remove('active');
            tabContentChannels.style.display = 'block';
            tabContentForm.style.display = 'none';
        });

        tabBtnForm.addEventListener('click', () => {
            tabBtnForm.classList.add('active');
            tabBtnChannels.classList.remove('active');
            tabContentChannels.style.display = 'none';
            tabContentForm.style.display = 'block';
        });
    }

    // Modal click outside & escape
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.remove('active');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal) contactModal.classList.remove('active');
    });

    // Mobile nav toggle
    const mainMobileMenuBtn = document.getElementById('mainMobileMenuBtn');
    const mainNavLinks = document.getElementById('mainNavLinks');
    if (mainMobileMenuBtn && mainNavLinks) {
        mainMobileMenuBtn.addEventListener('click', () => {
            mainNavLinks.classList.toggle('open');
            mainMobileMenuBtn.textContent = mainNavLinks.classList.contains('open') ? '[ CLOSE ]' : '[ MENU ]';
        });
    }
});
