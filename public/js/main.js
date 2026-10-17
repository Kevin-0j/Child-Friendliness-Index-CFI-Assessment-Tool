document.addEventListener('DOMContentLoaded', () => {
    // 0. Navbar Scroll State
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 1. Rotating Text in Hero
    const rotatingTextEl = document.getElementById('rotating-text');
    if (rotatingTextEl) {
        const words = ['child-friendly', 'safe & verified', 'nurturing', 'future-ready'];
        let wordIndex = 0;
        setInterval(() => {
            rotatingTextEl.classList.add('text-out');
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingTextEl.textContent = words[wordIndex];
                rotatingTextEl.classList.remove('text-out');
                rotatingTextEl.classList.add('text-in');
                setTimeout(() => rotatingTextEl.classList.remove('text-in'), 300);
            }, 300);
        }, 3000);
    }

    // 2. Scroll Reveal Animations
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(el => el.classList.add('visible'));
    }, 100);

    // 3. Mobile Navigation Menu Toggle
    const mainMobileMenuBtn = document.getElementById('mainMobileMenuBtn');
    const mainNavLinks = document.getElementById('mainNavLinks');
    if (mainMobileMenuBtn && mainNavLinks) {
        mainMobileMenuBtn.addEventListener('click', () => {
            mainNavLinks.classList.toggle('open');
            mainMobileMenuBtn.innerHTML = mainNavLinks.classList.contains('open') ? '&times;' : '&#9776;';
        });

        // Close menu when clicking any nav link
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('open');
                mainMobileMenuBtn.innerHTML = '&#9776;';
            });
        });
    }

    // ======================================================
    // 4. STAROOT-STYLE EDITORIAL INSIGHTS & ARTICLE READER
    // ======================================================
    const articlesData = {
        'balcony-safety': {
            category: 'Safety & Ergonomics',
            title: 'The 110cm Blind Spot: Why Standard Building Codes Overlook Children at 18 Floors',
            image: 'images/insight-balcony.jpg',
            readTime: '5 MIN READ',
            author: 'Azaani Field Research Team • Nairobi Urban Audit',
            content: `
                <p>Across Kilimani, Westlands, and Kileleshwa, Nairobi’s skyline is climbing higher every quarter. For adult buyers, high-floor balconies offer scenic views of the city’s green canopy. But for a toddler whose height is under 95cm, the architectural reality is starkly different.</p>
                
                <blockquote>"We don’t think about railings until a child pulls a chair to the edge. By then, standard architectural tolerances leave zero room for error." — Nairobi Pediatric Trauma Specialist</blockquote>

                <h3>The Physics of Toddler Climbing</h3>
                <p>Standard Kenyan building regulations dictate guardrail heights between 900mm and 1000mm. However, in our field audit of 42 high-rise developments completed between 2024 and 2026, <strong>73% featured decorative horizontal rungs</strong> or slatted metalwork. To a 3-year-old, a horizontal railing is not a barrier—it is a functional climbing ladder.</p>

                <p>Because young children have a higher center of gravity located in the upper chest, even a slight loss of balance over a 1-meter railing results in a forward pivot. The Child-Friendliness Index (CFI) framework mandates:</p>
                <ul>
                    <li><strong>Minimum 1200mm height</strong> for all residential perimeter balustrades above the 2nd floor.</li>
                    <li><strong>Strictly vertical or solid balustrades</strong> with zero horizontal footholds and gaps no wider than 95mm (preventing head entrapment).</li>
                    <li><strong>Secondary child-safety latching</strong> placed at 1500mm height on all exterior sliding doors.</li>
                </ul>

                <h3>The Retrofit Solution</h3>
                <p>The good news for existing property managers is that safety does not require structural demolition. High-impact optical-grade polycarbonate vertical shields and retrofitted secondary cable restrictors cost less than $120 per balcony while eliminating 99% of fall hazard exposure.</p>
            `
        },
        'family-roi': {
            category: 'Development Economics',
            title: 'How Child-Friendly Common Areas Transform Estate Occupancy in East Africa',
            image: 'images/insight-courtyard.jpg',
            readTime: '4 MIN READ',
            author: 'Real Estate Investment Analysis • Nairobi',
            content: `
                <p>In high-density Nairobi real estate, common wisdom has historically favored cramming every square meter with rentable apartments or subterranean parking. Play areas have often been relegated to an afterthought—a dusty 10-meter patch beside a generator house.</p>

                <p>Our 24-month retention study comparing 18 high-rise residential properties in Nairobi reveals that child-friendly developments outperform the market in three decisive ways:</p>

                <h3>1. Drastic Reduction in Tenant Turnover</h3>
                <p>In standard high-rises, young families relocate every 14 to 18 months, primarily driven by frustration over lack of safe movement for their children. In CFI-certified buildings featuring secure, car-free courtyards, <strong>average family tenure jumped to 4.2 years</strong>. Developers save an estimated 1.5 months of lost rental income per unit on turnover refurbishment and agent commissions.</p>

                <h3>2. The 22% Rental Premium</h3>
                <p>Caregivers and working parents in Nairobi are willing to pay an average premium of 22% for estates where children can step out into a secured, supervised environment without crossing vehicle driveways. In places like Kileleshwa, family-certified two-bedroom units rent out within 9 days of listing compared to the 34-day market average.</p>

                <blockquote>"When children make friends downstairs, parents don't want to move. The estate ceases to be just concrete; it becomes their village."</blockquote>
            `
        },
        'acoustic-mobility': {
            category: 'Accessible Architecture',
            title: 'Beyond Echoing Tiles: Designing Hallways That Calm Rather Than Overstimulate',
            image: 'images/insight-hallway.jpg',
            readTime: '6 MIN READ',
            author: 'Environmental Sensory Lab • Azaani Dispatches',
            content: `
                <p>Step into an average high-rise corridor in Nairobi: polished glossy ceramic tiles, bare concrete ceilings, and heavy metal security doors. Every footstep echoes like a drumbeat. For adults, it is merely sterile; for a sensory-sensitive toddler or a neurodivergent child, it is an acoustic assault.</p>

                <h3>The Hidden Dignity of 60cm Handrails</h3>
                <p>During our on-site walk-throughs with families, we observed how young children navigate high-density apartment corridors. When handrails are installed only at adult height (900mm), small children clutch caregiver trousers or cling against dusty walls.</p>
                <p>Introducing a secondary, continuous smooth oak or beechwood handrail at <strong>600mm height</strong> immediately fosters independent mobility. Children walk with confidence, grip firmly when transitioning around elevator corners, and experience their building as a space built for their bodies.</p>

                <h3>Taming Corridor Reverberation</h3>
                <p>By simply replacing high-gloss porcelain tiles in common lobbies with acoustic acoustic-damping vinyl weaves or texturized cork composites, reverberation time drops from 2.4 seconds to under 0.6 seconds. This drastically reduces toddler meltdowns during morning school runs and creates a peaceful living environment for all residents.</p>
            `
        },
        'rooftop-reclaiming': {
            category: 'Urban Innovation',
            title: 'How Nairobi Architects Are Reclaiming Rooftops for Safe Outdoor Childhoods',
            image: 'images/insight-rooftop.jpg',
            readTime: '5 MIN READ',
            author: 'The Decks Network & Azaani Urban Research',
            content: `
                <p>With Nairobi County bylaws demanding up to 1.5 vehicle parking bays per two-bedroom residential flat, the ground level in modern apartment blocks is almost entirely swallowed by tarmac and concrete ramps. Where do urban children play?</p>

                <p>The answer is looking upward: the rooftop sky-deck revolution.</p>

                <h3>Engineering High-Altitude Child Safety</h3>
                <p>Designing a rooftop play space at the 14th or 20th floor requires uncompromising engineering rigor. The Child-Friendly Index establishes strict criteria for certified rooftop decks:</p>
                <ul>
                    <li><strong>Continuous 1.8-meter tempered laminated glass balustrades:</strong> Wind buffers that provide clear visibility of the skyline while making climbing physically impossible.</li>
                    <li><strong>Biophilic buffer zones:</strong> Deep planter beds placed between the walkway and the perimeter barrier, creating a natural 1-meter safety buffer.</li>
                    <li><strong>Smart Access Control:</strong> High-mounted child-safe biometric door releases that ensure unaccompanied children under 10 cannot access the deck without an adult.</li>
                </ul>

                <p>In Westlands, pilot developments integrating rooftop sensory gardens, communal reading lawns, and weather-sheltered pergolas have turned unused flat roofs into the premier marketing feature of the building.</p>
            `
        }
    };

    // Insight Filter Buttons
    const filterBtns = document.querySelectorAll('.insight-filter-btn');
    const insightCards = document.querySelectorAll('.insight-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            insightCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Article Reader Modal
    const articleModal = document.getElementById('articleReaderModal');
    const articleCloseBtn = document.getElementById('articleCloseBtn');

    insightCards.forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.dataset.articleId;
            const article = articlesData[articleId];
            if (article && articleModal) {
                document.getElementById('modalArticleCategory').textContent = article.category;
                document.getElementById('modalArticleTitle').textContent = article.title;
                document.getElementById('modalArticleAuthor').textContent = article.author;
                document.getElementById('modalArticleReadTime').textContent = article.readTime;
                document.getElementById('modalArticleImage').src = article.image;
                document.getElementById('modalArticleContent').innerHTML = article.content;
                articleModal.classList.add('active');
            }
        });
    });

    if (articleCloseBtn && articleModal) {
        articleCloseBtn.addEventListener('click', () => articleModal.classList.remove('active'));
    }

    // ======================================================
    // 5. GAMIFICATION 1: PERSPECTIVE SIMULATOR (95cm vs 170cm)
    // ======================================================
    const toggleBtns = document.querySelectorAll('.perspective-toggle-btn');
    const simStage = document.getElementById('simulatorStage');
    const simHeightLabel = document.getElementById('simHeightLabel');
    const simScoreEl = document.getElementById('simScoreNum');
    const hotspots = document.querySelectorAll('.hotspot-pin');

    let currentSimScore = 40; // Starts at 40/100 for unmitigated child perspective

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.dataset.view;

            if (view === 'child') {
                simStage.classList.add('child-view');
                simHeightLabel.textContent = "Child Eye Level: 95cm (3'2\") • Hazards Active";
                hotspots.forEach(pin => pin.style.display = 'flex');
                updateSimScoreDisplay();
            } else {
                simStage.classList.remove('child-view');
                simHeightLabel.textContent = "Adult Eye Level: 170cm (5'8\") • Blind Spots Hidden";
                hotspots.forEach(pin => pin.style.display = 'none');
                if (simScoreEl) simScoreEl.textContent = "N/A (Adult View)";
            }
        });
    });

    hotspots.forEach(pin => {
        pin.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!pin.classList.contains('resolved')) {
                pin.classList.add('resolved');
                pin.innerHTML = '&#10003;';
                const pts = parseInt(pin.dataset.points) || 15;
                currentSimScore = Math.min(100, currentSimScore + pts);
                updateSimScoreDisplay();

                // Update tooltip text to resolved state
                const tipTitle = pin.querySelector('.tip-title');
                if (tipTitle) tipTitle.textContent = "✅ Child-Friendly Retrofit Applied!";
            }
        });
    });

    function updateSimScoreDisplay() {
        if (!simScoreEl) return;
        simScoreEl.textContent = `${currentSimScore}/100`;
        if (currentSimScore >= 85) {
            simScoreEl.style.color = '#10B981';
        } else if (currentSimScore >= 60) {
            simScoreEl.style.color = '#C5A059';
        } else {
            simScoreEl.style.color = '#E85D4E';
        }
    }

    // ======================================================
    // 6. GAMIFICATION 2: 60-SEC QUICK SPACE AUDITOR (QUIZ)
    // ======================================================
    const quizQuestions = [
        {
            title: "1. Balcony & Window Perimeter Safety",
            desc: "How are the apartment balconies and high-floor windows secured?",
            options: [
                { text: "Horizontal metal railings (ladder rungs) under 110cm high", points: 10, note: "High Risk: Toddlers climb horizontal rungs rapidly." },
                { text: "Vertical bars over 110cm, but gaps wider than 10cm", points: 18, note: "Moderate: Risk of head entrapment or dropped objects." },
                { text: "Solid 120cm+ non-climbable glass balustrades with window restrictors", points: 25, note: "CFI Certified: Meets global child safety standard." }
            ]
        },
        {
            title: "2. Vehicle & Pedestrian Traffic Separation",
            desc: "How do children access outdoor recreational or courtyard areas?",
            options: [
                { text: "Cars drive and reverse directly through children play zones", points: 8, note: "Critical Hazard: High risk of blind-spot vehicular accidents." },
                { text: "Speed bumps present, but no physical curb or barrier separation", points: 16, note: "Moderate: Relies purely on driver vigilance." },
                { text: "Strictly car-free courtyard with bollards and raised sidewalks", points: 25, note: "CFI Certified: Zero conflict between cars and children." }
            ]
        },
        {
            title: "3. Corridors, Elevators & Independent Mobility",
            desc: "How is circulation designed inside common lobbies and corridors?",
            options: [
                { text: "Echoing hard tiles, dimly lit stairs, adult-only high elevator buttons", points: 10, note: "Discourages child autonomy and causes sensory stress." },
                { text: "Well-lit with ramps, but standard adult-height hardware throughout", points: 18, note: "Functional for adults, lacks child ergonomic support." },
                { text: "Dual-height handrails (60cm), acoustic wall finishes, low clear signage", points: 25, note: "CFI Certified: Fosters confidence and independent mobility." }
            ]
        },
        {
            title: "4. Estate Community & Child-Centric Governance",
            desc: "What is the estate policy toward children using common amenities?",
            options: [
                { text: "Strict bans like 'No children playing in compound', hostile management", points: 8, note: "Anti-Family: Drives high tenant turnover." },
                { text: "Children tolerated in designated areas, but no formal safety checks", points: 16, note: "Neutral: Lacks proactive maintenance." },
                { text: "Clear child-friendly charter, responsive maintenance & active caregiver group", points: 25, note: "CFI Certified: Thriving family community culture." }
            ]
        }
    ];

    let currentStep = 0;
    let quizTotalScore = 0;

    const quizStepContainer = document.getElementById('quizStepContainer');
    const quizProgressFill = document.getElementById('quizProgressFill');
    const quizStepIndicator = document.getElementById('quizStepIndicator');
    const quizNextBtn = document.getElementById('quizNextBtn');
    let selectedOptionPoints = null;

    function renderQuizStep(stepIndex) {
        if (!quizStepContainer) return;
        const q = quizQuestions[stepIndex];
        selectedOptionPoints = null;
        if (quizNextBtn) {
            quizNextBtn.disabled = true;
            quizNextBtn.style.opacity = '0.5';
            quizNextBtn.textContent = stepIndex === quizQuestions.length - 1 ? 'Calculate My Score →' : 'Next Question →';
        }

        if (quizProgressFill) {
            quizProgressFill.style.width = `${((stepIndex + 1) / quizQuestions.length) * 100}%`;
        }
        if (quizStepIndicator) {
            quizStepIndicator.textContent = `Question ${stepIndex + 1} of ${quizQuestions.length}`;
        }

        let html = `
            <h3 class="quiz-step-title">${q.title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 20px; font-size: 15px;">${q.desc}</p>
            <div class="quiz-options-grid">
        `;

        q.options.forEach((opt, idx) => {
            html += `
                <div class="quiz-option-card" data-idx="${idx}" data-pts="${opt.points}">
                    <div style="flex: 1; padding-right: 14px;">
                        <div style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">${opt.text}</div>
                        <div style="font-size: 12.5px; color: var(--text-muted);">${opt.note}</div>
                    </div>
                    <div class="quiz-radio-circle"></div>
                </div>
            `;
        });

        html += `</div>`;
        quizStepContainer.innerHTML = html;

        quizStepContainer.querySelectorAll('.quiz-option-card').forEach(card => {
            card.addEventListener('click', () => {
                quizStepContainer.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedOptionPoints = parseInt(card.dataset.pts);
                if (quizNextBtn) {
                    quizNextBtn.disabled = false;
                    quizNextBtn.style.opacity = '1';
                }
            });
        });
    }

    if (quizNextBtn) {
        quizNextBtn.addEventListener('click', () => {
            if (selectedOptionPoints === null) return;
            quizTotalScore += selectedOptionPoints;
            currentStep++;

            if (currentStep < quizQuestions.length) {
                renderQuizStep(currentStep);
            } else {
                renderQuizResults();
            }
        });
    }

    function renderQuizResults() {
        if (!quizStepContainer) return;
        if (quizNextBtn) quizNextBtn.style.display = 'none';
        if (quizStepIndicator) quizStepIndicator.textContent = "Assessment Complete";

        let tierName = "Bronze Tier (Needs Retrofit)";
        let tierColor = "#E85D4E";
        let tierBadge = "🔨";
        let recommendation = "Your building has critical blind spots in child safety. A 3-step retrofit on balcony locks and pedestrian gates will significantly mitigate risk.";

        if (quizTotalScore >= 90) {
            tierName = "Platinum Sanctuary";
            tierColor = "#10B981";
            tierBadge = "🌟";
            recommendation = "Exemplary child-centered design! Your property qualifies for the highest CFI Certification and commands maximum rental premiums.";
        } else if (quizTotalScore >= 75) {
            tierName = "Gold Haven";
            tierColor = "#C5A059";
            tierBadge = "🌿";
            recommendation = "Strong family-friendly foundation. Minor enhancements to acoustic dampening and play equipment will push your building into top tier.";
        } else if (quizTotalScore >= 55) {
            tierName = "Silver Safe-Space";
            tierColor = "#3B82F6";
            tierBadge = "🛡️";
            recommendation = "Good basic safety in place. Recommended focus: formalize child-friendly community policies and vertical balustrade protection.";
        }

        quizStepContainer.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <div style="font-size: 50px; margin-bottom: 12px;">${tierBadge}</div>
                <div style="font-family: var(--font-heading); font-size: 13px; font-weight: 800; letter-spacing: 0.1em; color: ${tierColor}; text-transform: uppercase;">
                    Preliminary Scorecard
                </div>
                <div style="font-family: var(--font-display); font-size: 3.5rem; font-weight: 900; margin: 10px 0; color: #121316;">
                    ${quizTotalScore}<span style="font-size: 1.5rem; color: #999; font-weight: normal;">/100</span>
                </div>
                <div style="display: inline-block; background: ${tierColor}20; color: ${tierColor}; font-weight: 800; font-size: 16px; padding: 6px 18px; border-radius: 999px; margin-bottom: 20px;">
                    ${tierName}
                </div>
                <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 28px; line-height: 1.6; font-size: 15px;">
                    ${recommendation}
                </p>
                <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
                    <button id="quizBookConsultBtn" class="btn btn-primary">Book Formal Assessment &rarr;</button>
                    <button id="quizRetakeBtn" class="btn btn-secondary">Retake Quick Test</button>
                </div>
            </div>
        `;

        const retakeBtn = document.getElementById('quizRetakeBtn');
        if (retakeBtn) {
            retakeBtn.addEventListener('click', () => {
                currentStep = 0;
                quizTotalScore = 0;
                if (quizNextBtn) quizNextBtn.style.display = 'inline-flex';
                renderQuizStep(0);
            });
        }

        const consultBtn = document.getElementById('quizBookConsultBtn');
        if (consultBtn) {
            consultBtn.addEventListener('click', () => {
                const contactModal = document.getElementById('contactModal');
                if (contactModal) {
                    contactModal.classList.add('active');
                    // Switch to form tab
                    document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
                    const formTabBtn = document.getElementById('tabBtnForm');
                    if (formTabBtn) formTabBtn.classList.add('active');
                    document.getElementById('tabContentChannels').style.display = 'none';
                    document.getElementById('tabContentForm').style.display = 'block';
                }
            });
        }
    }

    // Initialize Quiz
    if (quizStepContainer) {
        renderQuizStep(0);
    }

    // ======================================================
    // 7. PROFESSIONAL "LET'S TALK" CONSULTATION MODAL OVERHAUL
    // ======================================================
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

    // Modal Tabs (Direct Channels vs Booking Form)
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

    // Booking Consultation Form Submit
    const consultationForm = document.getElementById('consultationBookingForm');
    const bookingSuccessMsg = document.getElementById('bookingSuccessMsg');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Transmitting to Azaani Team...";

            setTimeout(() => {
                consultationForm.style.display = 'none';
                if (bookingSuccessMsg) {
                    bookingSuccessMsg.style.display = 'block';
                }
            }, 800);
        });
    }

    // ======================================================
    // 8. TOOL AUTHENTICATION MODAL (Original Logic)
    // ======================================================
    const toolModal = document.getElementById('toolLoginModal');
    const openToolBtn = document.getElementById('openToolBtn');
    const toolCloseBtn = document.querySelector('.tool-close-btn');

    if (openToolBtn && toolModal) {
        openToolBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toolModal.classList.add('active');
            const pwdInput = document.getElementById('toolPassword');
            if (pwdInput) pwdInput.focus();
        });
    }

    if (toolCloseBtn && toolModal) {
        toolCloseBtn.addEventListener('click', () => toolModal.classList.remove('active'));
    }

    const submitBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('toolPassword');
    const errorMsg = document.getElementById('loginError');
    const SECRET_CODE = "0000";

    const handleLogin = () => {
        if (!passwordInput) return;
        if (passwordInput.value === SECRET_CODE || passwordInput.value.toLowerCase() === "admin") {
            window.location.href = '/dashboard';
        } else {
            if (errorMsg) errorMsg.style.display = 'block';
            passwordInput.classList.add('error');
            setTimeout(() => passwordInput.classList.remove('error'), 500);
        }
    };

    if (submitBtn) submitBtn.addEventListener('click', handleLogin);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }

    // Global Modal Click Outside & Escape Key
    window.addEventListener('click', (e) => {
        if (e.target === toolModal) toolModal.classList.remove('active');
        if (e.target === contactModal) contactModal.classList.remove('active');
        if (e.target === articleModal) articleModal.classList.remove('active');
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (toolModal) toolModal.classList.remove('active');
            if (contactModal) contactModal.classList.remove('active');
            if (articleModal) articleModal.classList.remove('active');
        }
    });
});
