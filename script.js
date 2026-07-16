 document.getElementById('link-email').addEventListener('click', function() {
            window.location.href = 'mailto:jorrigalaakhil7@gmail.com';
        });
        document.getElementById('link-phone').addEventListener('click', function() {
            window.location.href = 'tel:+919951640488';
        });
        document.getElementById('link-whatsapp').addEventListener('click', function() {
            window.open('https://wa.me/919951640488?text=Hi%20Akhil%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!', '_blank', 'noopener,noreferrer');
        });
        document.getElementById('link-linkedin').addEventListener('click', function() {
            window.open('https://www.linkedin.com/in/akhil-jorrigala-a50639261/', '_blank', 'noopener,noreferrer');
        });

        /* ─────────────────────────────────────────
           SMOOTH SCROLL FOR NAV + HERO BUTTONS
        ───────────────────────────────────────── */
        document.querySelectorAll('a[href^="#"]').forEach(function(a) {
            a.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        document.getElementById('nav-logo').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        /* ─────────────────────────────────────────
           RIPPLE EFFECT
        ───────────────────────────────────────── */
        document.querySelectorAll('.btn, .contact-link, .nav-links a').forEach(function(el) {
            el.addEventListener('click', function(e) {
                var r = document.createElement('span');
                r.className = 'ripple';
                var rect = this.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height) * 2;
                r.style.width = size + 'px';
                r.style.height = size + 'px';
                r.style.left = (e.clientX - rect.left - size / 2) + 'px';
                r.style.top = (e.clientY - rect.top - size / 2) + 'px';
                this.appendChild(r);
                setTimeout(function() {
                    r.remove();
                }, 700);
            });
        });

        /* ─────────────────────────────────────────
           PARTICLE CANVAS
        ───────────────────────────────────────── */
        (function() {
            var canvas = document.getElementById('bg-canvas');
            var ctx = canvas.getContext('2d');
            var W, H, particles = [];
            var mouse = {
                x: -999,
                y: -999
            };

            function resize() {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);
            window.addEventListener('mousemove', function(e) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            function Particle() {
                this.x = Math.random() * W;
                this.y = Math.random() * H;
                this.r = Math.random() * 1.2 + 0.3;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.alpha = Math.random() * 0.5 + 0.1;
            }
            Particle.prototype.update = function() {
                var dx = this.x - mouse.x,
                    dy = this.y - mouse.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < 90) {
                    this.x += dx / d * 1.8;
                    this.y += dy / d * 1.8;
                }
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0) this.x = W;
                if (this.x > W) this.x = 0;
                if (this.y < 0) this.y = H;
                if (this.y > H) this.y = 0;
            };
            Particle.prototype.draw = function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,212,255,' + this.alpha + ')';
                ctx.fill();
            };

            for (var i = 0; i < 100; i++) particles.push(new Particle());

            function loop() {
                ctx.clearRect(0, 0, W, H);
                for (var i = 0; i < particles.length; i++) {
                    for (var j = i + 1; j < particles.length; j++) {
                        var dx = particles[i].x - particles[j].x;
                        var dy = particles[i].y - particles[j].y;
                        var dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = 'rgba(0,212,255,' + ((1 - dist / 120) * 0.1) + ')';
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                    particles[i].update();
                    particles[i].draw();
                }
                requestAnimationFrame(loop);
            }
            loop();
        })();

        /* ─────────────────────────────────────────
           CUSTOM CURSOR
        ───────────────────────────────────────── */
        (function() {
            var cur = document.getElementById('cur');
            var ring = document.getElementById('cur-ring');
            var mx = 0,
                my = 0,
                rx = 0,
                ry = 0;

            document.addEventListener('mousemove', function(e) {
                mx = e.clientX;
                my = e.clientY;
                cur.style.left = mx + 'px';
                cur.style.top = my + 'px';
            });

            (function animRing() {
                rx += (mx - rx) * 0.13;
                ry += (my - ry) * 0.13;
                ring.style.left = rx + 'px';
                ring.style.top = ry + 'px';
                requestAnimationFrame(animRing);
            })();

            var hoverEls = document.querySelectorAll('a, button, .skill-card, .okta-card, .cert-card, .info-card, .contact-link, .nav-logo, .btn');
            hoverEls.forEach(function(el) {
                el.addEventListener('mouseenter', function() {
                    document.body.classList.add('cursor-hover');
                });
                el.addEventListener('mouseleave', function() {
                    document.body.classList.remove('cursor-hover');
                });
            });

            document.addEventListener('mousedown', function() {
                document.body.classList.add('cursor-click');
            });
            document.addEventListener('mouseup', function() {
                document.body.classList.remove('cursor-click');
            });
        })();

        /* ─────────────────────────────────────────
           SCROLL REVEAL — JS hides then reveals
        ───────────────────────────────────────── */
        (function() {
            var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

            // Only apply hide-then-reveal if the page is scrollable (not iframe-locked)
            function init() {
                // Hide all off-screen elements
                els.forEach(function(el) {
                    if (el.getBoundingClientRect().top > window.innerHeight - 40) {
                        el.classList.add('hidden');
                    }
                });
            }

            function check() {
                var vh = window.innerHeight;
                els.forEach(function(el) {
                    if (el.getBoundingClientRect().top < vh - 60) {
                        el.classList.remove('hidden');
                        el.classList.add('visible');
                    }
                });
            }

            // Wait briefly to let page layout settle, then init
            setTimeout(init, 100);
            window.addEventListener('scroll', check, {
                passive: true
            });
            setTimeout(check, 300);
            setTimeout(check, 800);
            setTimeout(check, 1500);
        })();

        /* ─────────────────────────────────────────
           OKTA CARDS STAGGER
        ───────────────────────────────────────── */
        (function() {
            var cards = document.querySelectorAll('.okta-card');

            function initOkta() {
                cards.forEach(function(c, i) {
                    if (c.getBoundingClientRect().top > window.innerHeight - 40) {
                        c.style.opacity = '0';
                        c.style.transform = 'translateY(28px)';
                        c.style.transition = 'opacity .6s ease ' + (i * 60) + 'ms, transform .6s ease ' + (i * 60) + 'ms, border-color .3s, box-shadow .3s';
                    }
                });
            }

            function checkOkta() {
                cards.forEach(function(c) {
                    if (c.getBoundingClientRect().top < window.innerHeight - 40) {
                        c.style.opacity = '1';
                        c.style.transform = 'translateY(0)';
                    }
                });
            }

            setTimeout(initOkta, 120);
            window.addEventListener('scroll', checkOkta, {
                passive: true
            });
            setTimeout(checkOkta, 400);
            setTimeout(checkOkta, 900);
        })();

        /* ─────────────────────────────────────────
           NAV SHRINK + ACTIVE LINK
        ───────────────────────────────────────── */
        (function() {
            var nav = document.getElementById('navbar');
            var links = document.querySelectorAll('.nav-links a');
            var sections = document.querySelectorAll('section[id]');

            function updateNav() {
                nav.classList.toggle('scrolled', window.scrollY > 60);
                var current = '';
                sections.forEach(function(s) {
                    if (window.scrollY >= s.offsetTop - 230) current = s.id;
                });
                links.forEach(function(a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
                });
            }

            window.addEventListener('scroll', updateNav, {
                passive: true
            });
            updateNav();
        })();

        /* ─────────────────────────────────────────
           COUNT-UP STATS
        ───────────────────────────────────────── */
        (function() {
            var done = false;
            var c1 = document.getElementById('c1');
            var c2 = document.getElementById('c2');
            var c3 = document.getElementById('c3');

            function countUp(el, target, isDecimal, suffix) {
                var duration = 1400;
                var start = performance.now();
                (function frame(now) {
                    var p = Math.min((now - start) / duration, 1);
                    var e = 1 - Math.pow(1 - p, 3);
                    el.textContent = isDecimal ? (e * target).toFixed(1) : Math.floor(e * target);
                    if (p < 1) requestAnimationFrame(frame);
                    else el.textContent = isDecimal ? target.toFixed(1) : target + (suffix || '');
                })(start);
            }

            function check() {
                if (done) return;
                var rect = c1.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    done = true;
                    countUp(c1, 3, false, '+');
                    countUp(c2, 8.5, true, '');
                    countUp(c3, 4, false, '');
                }
            }

            window.addEventListener('scroll', check, {
                passive: true
            });
            setTimeout(check, 600);
        })();

        /* ─────────────────────────────────────────
           TYPED TEXT IN HERO TAG
        ───────────────────────────────────────── */
        (function() {
            var phrases = ['Open to Work', 'Okta Administrator', 'IAM Engineer', 'Open to New Opportunities'];
            var el = document.getElementById('typed-text');
            if (!el) return;
            var pi = 0,
                ci = 0,
                deleting = false;

            function type() {
                var phrase = phrases[pi];
                el.textContent = deleting ? phrase.slice(0, ci) : phrase.slice(0, ci);
                if (!deleting) {
                    if (ci < phrase.length) {
                        ci++;
                        setTimeout(type, 65);
                    } else {
                        deleting = true;
                        setTimeout(type, 2000);
                    }
                } else {
                    if (ci > 0) {
                        ci--;
                        setTimeout(type, 38);
                    } else {
                        deleting = false;
                        pi = (pi + 1) % phrases.length;
                        setTimeout(type, 400);
                    }
                }
            }
            setTimeout(type, 1400);
        })();

        /* ───────────────────────────────────────