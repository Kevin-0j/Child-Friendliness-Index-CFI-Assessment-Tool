document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ==========================================================================
    const mainMobileMenuBtn = document.getElementById('mainMobileMenuBtn');
    const mainNavLinks = document.getElementById('mainNavLinks');

    if (mainMobileMenuBtn && mainNavLinks) {
        mainMobileMenuBtn.addEventListener('click', () => {
            mainNavLinks.classList.toggle('open');
            mainMobileMenuBtn.innerHTML = mainNavLinks.classList.contains('open') ? '&times;' : '&#9776;';
        });

        // Close menu when clicking a link
        mainNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNavLinks.classList.remove('open');
                mainMobileMenuBtn.innerHTML = '&#9776;';
            });
        });
    }

    // ==========================================================================
    // 2. INTERACTIVE PERSPECTIVE SWITCHER (Adult 170cm vs Child 95cm)
    // ==========================================================================
    const btnAdultView = document.getElementById('btnAdultView');
    const btnChildView = document.getElementById('btnChildView');
    const simStageBox = document.getElementById('simStageBox');
    const simEyeLabel = document.getElementById('simEyeLabel');
    const simScoreNum = document.getElementById('simScoreNum');
    const hotspots = document.querySelectorAll('.sim-interactive-pin');
    
    let currentScore = 40;

    function setPerspective(view) {
        if (view === 'child') {
            btnChildView.classList.add('active');
            btnAdultView.classList.remove('active');
            simStageBox.classList.add('child-view');
            simEyeLabel.textContent = "Child Perspective (95cm): 3 blind-spot hazards detected.";
            hotspots.forEach(p => p.style.display = 'flex');
            simScoreNum.textContent = `${currentScore} / 100`;
            simScoreNum.style.color = currentScore >= 80 ? 'var(--emerald)' : 'var(--accent)';
        } else {
            btnAdultView.classList.add('active');
            btnChildView.classList.remove('active');
            simStageBox.classList.remove('child-view');
            simEyeLabel.textContent = "Adult Perspective (170cm): Space appears safe from standing height.";
            hotspots.forEach(p => p.style.display = 'none');
            simScoreNum.textContent = "N/A (Adult)";
            simScoreNum.style.color = 'var(--text-muted)';
        }
    }

    if (btnAdultView && btnChildView) {
        btnAdultView.addEventListener('click', () => setPerspective('adult'));
        btnChildView.addEventListener('click', () => setPerspective('child'));
    }

    // Interactive retrofits when clicking pins
    hotspots.forEach(pin => {
        pin.addEventListener('click', () => {
            if (!pin.classList.contains('resolved')) {
                pin.classList.add('resolved');
                pin.innerHTML = '&#10003;';
                const pts = parseInt(pin.dataset.points) || 20;
                currentScore = Math.min(100, currentScore + pts);
                
                if (simScoreNum) {
                    simScoreNum.textContent = `${currentScore} / 100`;
                    if (currentScore >= 80) simScoreNum.style.color = 'var(--emerald)';
                }

                const tip = pin.querySelector('.pin-tip');
                if (tip) {
                    tip.innerHTML = `<strong>&check; Retrofit Installed (+${pts} pts)</strong><br>Now compliant with UNICEF child-safety benchmark.`;
                }
            }
        });
    });

    // ==========================================================================
    // 3. CASE STUDY READER MODAL
    // ==========================================================================
    const articleData = {
        balcony: {
            title: "The 110cm Blind Spot: Why Standard Balustrades Fail Children",
            category: "Balcony Ergonomics & Safety",
            readTime: "5 min read",
            image: "images/insight-balcony.jpg",
            content: `
                <p>Standard architectural building codes across East Africa require balcony guardrails between 900mm and 1000mm in height. While sufficient for adult stability, this parameter introduces severe pediatric hazards in residential high-rises.</p>
                <blockquote>"When an adult leans against a balcony, their center of gravity rests comfortably below the top rail. A four-year-old child, possessing a higher center of mass and natural exploratory climb instincts, perceives horizontal railing slats as an intuitive ladder."</blockquote>
                <h3>The 3 Critical High-Rise Interventions</h3>
                <p>During our 2026 assessment of 42 residential developments across Kilimani and Kileleshwa, our team documented three primary retrofit standards:</p>
                <ul>
                    <li><strong>1200mm Minimum Height:</strong> Elevated perimeter height with zero horizontal footholds or intermediate climbing ledges.</li>
                    <li><strong>Tempered Laminated Glass Panels:</strong> Solid vertical optical barriers that preserve panoramic cityscape views without providing toe holds.</li>
                    <li><strong>Child-Resistant Secondary Egress Latches:</strong> Biometric or 1500mm-high mechanical locks on all sliding balcony doors to prevent unmonitored egress.</li>
                </ul>
            `
        },
        courtyard: {
            title: "The 22% Rental Premium: Why Family-First Developments Win Long-Term",
            category: "Community Architecture & Financial ROI",
            readTime: "4 min read",
            image: "images/insight-courtyard.jpg",
            content: `
                <p>High-density residential towers in Nairobi frequently sacrifice central open space to satisfy parking minimums and vehicular turnaround circles. Our longitudinal analysis demonstrates that developments prioritizing child-friendly communal courtyards consistently command superior tenant retention.</p>
                <blockquote>"Over a 24-month audit across Nairobi developments, estates with certified car-free courtyards experienced half the annual tenancy turnover of conventional developments, generating an average 22% yield advantage over five years."</blockquote>
                <h3>Core Principles of a Child-Friendly Courtyard</h3>
                <ul>
                    <li><strong>Complete Vehicle Physical Separation:</strong> Perimeter bollards and perimeter drop-offs ensuring children can run freely without parent anxiety.</li>
                    <li><strong>Caregiver Sightlines:</strong> Shaded, biophilic perimeter seating giving caregivers 360-degree visual oversight from any bench.</li>
                    <li><strong>Inclusive Sensory Ground Materials:</strong> Shock-absorbent rubberized and grassy ground surfaces mitigating injury from normal developmental play.</li>
                </ul>
            `
        },
        hallway: {
            title: "Beyond Echoing Tiles: Hallways That Calm Instead of Overstimulate",
            category: "Corridor Acoustics & Ergonomics",
            readTime: "6 min read",
            image: "images/insight-hallway.jpg",
            content: `
                <p>Standard apartment corridors are designed as utilitarian transit tunnels: hard porcelain tiles, concrete ceilings, and narrow passage corridors. For young children, especially those with sensory sensitivity, these spaces act as disorienting echo chambers with reverberation times exceeding 2.4 seconds.</p>
                <blockquote>"Corridors are the daily transition between the chaotic outside city and the calm sanctuary of home. Simple ergonomic adjustments turn sterile tunnels into reassuring passageways."</blockquote>
                <h3>The 60cm Handrail and Acoustic Buffering</h3>
                <ul>
                    <li><strong>Secondary 600mm Handrails:</strong> Installing a warm secondary wooden handrail at child height allows toddlers to navigate stairs and corridors autonomously with balance and dignity.</li>
                    <li><strong>Acoustic Ceiling Buffers:</strong> Perforated timber and acoustic felt baffles bring corridor reverberation time below 0.6 seconds, eliminating frightening echoes.</li>
                    <li><strong>Glare-Free Indirect Illumination:</strong> Soft wall-wash lighting at pediatric eye level replaces harsh downward LED spotlights.</li>
                </ul>
            `
        },
        rooftop: {
            title: "Reclaiming Open Space: Converting Roofs into Family Sanctuaries",
            category: "Urban Rooftop Design",
            readTime: "5 min read",
            image: "images/insight-rooftop.jpg",
            content: `
                <p>In high-density districts such as Westlands, land values make sprawling ground parks unfeasible. Forward-thinking architects are reclaiming underutilized rooftop slabs, transforming them from utility equipment zones into high-altitude sky parks for resident families.</p>
                <blockquote>"A rooftop sky-park demands uncompromising perimeter engineering. When properly baffled against high-altitude winds, it becomes the most cherished communal asset in the building."</blockquote>
                <h3>Essential Engineering Guidelines</h3>
                <ul>
                    <li><strong>1800mm Vertical Wind Buffers:</strong> Structural tempered glass screens that suppress wind gusts while granting children safe, unobstructed views of the horizon.</li>
                    <li><strong>Wide Vegetative Setback Buffers:</strong> Deep 1-meter raised planter boxes separating walkways from perimeter edges, preventing any child from approaching the exterior boundary.</li>
                    <li><strong>Shaded Weather Pavilions:</strong> Weather-protected micro-climate zones allowing year-round outdoor play regardless of tropical sun or rain.</li>
                </ul>
            `
        }
    };

    const articleModal = document.getElementById('articleModal');
    const articleCloseBtn = document.getElementById('articleCloseBtn');
    const articleModalContent = document.getElementById('articleModalContent');
    const insightCards = document.querySelectorAll('.insight-card');

    insightCards.forEach(card => {
        card.addEventListener('click', () => {
            const articleKey = card.dataset.article;
            const article = articleData[articleKey];
            if (article && articleModal && articleModalContent) {
                articleModalContent.innerHTML = `
                    <img src="${article.image}" alt="${article.title}" class="article-reader-img">
                    <span class="badge-tag">${article.category} &bull; ${article.readTime}</span>
                    <h2 style="font-size: 26px; line-height: 1.25; margin: 12px 0 20px; color: var(--text-primary);">${article.title}</h2>
                    <div class="article-prose">
                        ${article.content}
                    </div>
                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
                        <span style="font-size: 13.5px; color: var(--text-muted);">Azaani Environmental Research &bull; Nairobi Fieldwork</span>
                        <a href="#" class="btn btn-primary open-contact-btn" onclick="document.getElementById('articleModal').classList.remove('active'); document.getElementById('contactModal').classList.add('active'); return false;">
                            Request Full Whitepaper &rarr;
                        </a>
                    </div>
                `;
                articleModal.classList.add('active');
            }
        });
    });

    if (articleCloseBtn && articleModal) {
        articleCloseBtn.addEventListener('click', () => articleModal.classList.remove('active'));
    }

    // ==========================================================================
    // 4. 60-SEC QUICK SPACE AUDITOR (QUIZ)
    // ==========================================================================
    const quizOptions = document.querySelectorAll('.quiz-option-item');
    const quizScoreResult = document.getElementById('quizScoreResult');
    const quizTierLabel = document.getElementById('quizTierLabel');

    const pointsState = { q1: 25, q2: 25 };

    quizOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const group = opt.dataset.group;
            document.querySelectorAll(`.quiz-option-item[data-group="${group}"]`).forEach(el => el.classList.remove('selected'));
            opt.classList.add('selected');
            pointsState[group] = parseInt(opt.dataset.pts) || 10;

            // Base calibration is 50 points
            const total = (pointsState.q1 || 10) + (pointsState.q2 || 10) + 50;

            if (quizScoreResult) {
                quizScoreResult.textContent = `${total} / 100`;
            }

            if (quizTierLabel) {
                if (total >= 90) {
                    quizTierLabel.textContent = "PLATINUM SANCTUARY • CFI CERTIFIED READY";
                    quizTierLabel.style.color = "var(--emerald)";
                } else if (total >= 75) {
                    quizTierLabel.textContent = "GOLD HAVEN • HIGH SAFETY COMPLIANCE";
                    quizTierLabel.style.color = "var(--gold)";
                } else {
                    quizTierLabel.textContent = "SILVER • RETROFIT RECOMMENDED";
                    quizTierLabel.style.color = "var(--accent)";
                }
            }
        });
    });

    // ==========================================================================
    // 5. PROFESSIONAL "LET'S TALK" CONSULTATION MODAL
    // ==========================================================================
    const contactModal = document.getElementById('contactModal');
    const openContactBtns = document.querySelectorAll('.open-contact-btn');
    const contactCloseBtn = document.getElementById('contactCloseBtn');
    const consultationBookingForm = document.getElementById('consultationBookingForm');

    openContactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactModal) contactModal.classList.add('active');
        });
    });

    if (contactCloseBtn && contactModal) {
        contactCloseBtn.addEventListener('click', () => contactModal.classList.remove('active'));
    }

    if (consultationBookingForm) {
        consultationBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            consultationBookingForm.innerHTML = `
                <div style="background: var(--emerald-light); padding: 24px; border-radius: var(--radius-sm); border: 1px solid var(--emerald); text-align: center;">
                    <div style="font-size: 28px; margin-bottom: 8px;">&#10003;</div>
                    <h4 style="font-size: 17px; color: var(--emerald); margin-bottom: 6px;">Callback Request Received</h4>
                    <p style="font-size: 14px; color: var(--text-secondary); margin: 0;">
                        Our lead architectural assessor will contact you directly via phone / WhatsApp within 2 business hours.
                    </p>
                </div>
            `;
        });
    }

    // ==========================================================================
    // 6. TOOL LOGIN MODAL (Access Code: 0000 or child2024 -> /dashboard)
    // ==========================================================================
    const toolLoginModal = document.getElementById('toolLoginModal');
    const openToolBtns = document.querySelectorAll('#openToolBtn, .open-tool-trigger');
    const toolLoginCloseBtn = document.getElementById('toolLoginCloseBtn');
    const submitPasswordBtn = document.getElementById('submitPassword');
    const toolPasswordInput = document.getElementById('toolPassword');
    const loginError = document.getElementById('loginError');

    openToolBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (toolLoginModal) {
                toolLoginModal.classList.add('active');
                if (toolPasswordInput) {
                    toolPasswordInput.value = '';
                    toolPasswordInput.focus();
                }
                if (loginError) loginError.style.display = 'none';
            }
        });
    });

    if (toolLoginCloseBtn && toolLoginModal) {
        toolLoginCloseBtn.addEventListener('click', () => toolLoginModal.classList.remove('active'));
    }

    function authenticateTool() {
        if (!toolPasswordInput) return;
        const code = toolPasswordInput.value.trim();
        if (code === '0000' || code === 'child2024') {
            window.location.href = '/dashboard';
        } else {
            if (loginError) loginError.style.display = 'block';
        }
    }

    if (submitPasswordBtn) {
        submitPasswordBtn.addEventListener('click', authenticateTool);
    }

    if (toolPasswordInput) {
        toolPasswordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') authenticateTool();
        });
    }

    // Modal click outside to close
    window.addEventListener('click', (e) => {
        if (e.target === contactModal) contactModal.classList.remove('active');
        if (e.target === articleModal) articleModal.classList.remove('active');
        if (e.target === toolLoginModal) toolLoginModal.classList.remove('active');
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (contactModal) contactModal.classList.remove('active');
            if (articleModal) articleModal.classList.remove('active');
            if (toolLoginModal) toolLoginModal.classList.remove('active');
        }
    });

    // ==========================================================================
    // 7. MOBILE SECTION COLLAPSE / ACCORDION CONTROLS
    // ==========================================================================
    const collapseBtns = document.querySelectorAll('.mobile-collapse-btn');
    collapseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.dataset.target;
            const targetEl = document.querySelector(targetSelector);
            if (!targetEl) return;

            const isCurrentlyCollapsed = targetEl.classList.contains('is-collapsed');
            if (isCurrentlyCollapsed) {
                targetEl.classList.remove('is-collapsed');
                btn.setAttribute('aria-expanded', 'true');
                btn.innerHTML = '<span class="collapse-icon">&#9650;</span> <span class="collapse-label">Collapse Section</span>';
            } else {
                targetEl.classList.add('is-collapsed');
                btn.setAttribute('aria-expanded', 'false');
                btn.innerHTML = '<span class="collapse-icon">&#9660;</span> <span class="collapse-label">Expand Section</span>';
            }
        });
    });
});
