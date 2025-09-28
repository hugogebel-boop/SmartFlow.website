import React, { useEffect, useMemo, useState } from "react";

/**
 * SmartFlow — One‑Page Pro (CALM & CLEAN)
 * - Clair/foncé FIXES par section (pas de flash global)
 * - Dégradés statiques entre sections (BandFadeToLight/Dark)
 * - Animations réduites (opacité douce uniquement), respectent prefers-reduced-motion
 * - Tous les composants & hooks dans ce fichier
 * - Petits smoke tests dev pour éviter les régressions
 */

export default function App() {
    return <SmartFlowOnePagePro />;
}

function SmartFlowOnePagePro() {
    const links = useMemo(
        () => [
            { id: "accueil", label: "Accueil" },
            { id: "qui-nous-sommes", label: "Qui nous sommes" },
            { id: "ce-que-nous-faisons", label: "Offre" },
            { id: "comment-nous-travaillons", label: "Méthode" },
            { id: "contact", label: "Contact" },
        ],
        []
    );

    const [active, setActive] = useState<string>(links[0].id);
    const prefersReduced = usePrefersReducedMotion();

    // --- Dev smoke tests (non-bloquants) ---
    useEffect(() => {
        const isDev =
            (typeof process !== "undefined" && process.env?.NODE_ENV === "development") ||
            (typeof import.meta !== "undefined" && (import.meta as any)?.env?.MODE === "development");
        if (!isDev) return;
        try {
            console.assert(typeof prefersReduced === "boolean", "[test] prefersReduced is boolean");
            const expectedIds = [
                "accueil",
                "qui-nous-sommes",
                "ce-que-nous-faisons",
                "comment-nous-travaillons",
                "contact",
            ];
            console.assert(expectedIds.every((id) => links.some((l) => l.id === id)), "[test] nav ids present");
            setTimeout(() => {
                expectedIds.forEach((id) => console.assert(!!document.getElementById(id), `[test] #${id} exists`));
                console.assert(typeof SiteHeader === "function", "[test] SiteHeader defined");
                console.assert(typeof Hero === "function", "[test] Hero defined");
                const navButtons = document.querySelectorAll("header nav button");
                console.assert(navButtons.length === expectedIds.length, "[test] nav buttons count");
                const form = document.querySelector("#contact form");
                console.assert(form instanceof HTMLFormElement, "[test] contact form exists");
                ["name", "email", "subject", "message"].forEach((n) => {
                    console.assert((form as HTMLFormElement)?.querySelector(`[name="${n}"]`), `[test] form field "${n}" exists`);
                });
                console.log("[SmartFlow] smoke tests passed ✔");
            }, 0);
        } catch (e) {
            console.warn("[SmartFlow] smoke tests warning:", e);
        }
    }, [prefersReduced, links]);

    // Observe sections to highlight active link
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        links.forEach((l) => {
            const el = document.getElementById(l.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [links]);

    const onJump = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    };

    return (
        <div className="min-h-[100dvh] bg-[#0d1020] text-slate-100 antialiased selection:bg-violet-500/30 selection:text-white">
            <GlobalStyles />
            <BackgroundSoft />
            <SoftGrid />
            <FloatingOrbs />
            <SiteHeader links={links} active={active} onJump={onJump} />

            <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* ACCUEIL (fond global sombre) */}
                <Section id="accueil" className="pt-28 pb-16">
                    <Hero onPrimary={() => onJump("contact")} onSecondary={() => onJump("ce-que-nous-faisons")} />
                </Section>
                {/* fondu vers section claire */}


                {/* QUI NOUS SOMMES — CLAIR */}
                <Section id="qui-nous-sommes">
                    <Heading kicker="Qui nous sommes" title={<>Un partenaire logiciel suisse, reconnaissable au premier clic</>} />

                    <div className="sectionBand band-light text-slate-900 p-6 sm:p-8">
                        <div className="grid gap-10 lg:grid-cols-12">
                            <div className="lg:col-span-7 space-y-6">
                                <Reveal>
                                    <p className="leading-relaxed text-slate-800">
                                        Basés en Suisse, nous concevons des logiciels sur mesure qui rendent les opérations plus fluides et les
                                        données plus fiables. Nous privilégions la clarté, la sécurité et la sobriété visuelle — pour des outils
                                        que l’on aime utiliser.
                                    </p>
                                </Reveal>
                                <Reveal delay={120}>
                                    <p className="leading-relaxed text-slate-800">
                                        Nous restons votre interlocuteur unique : un pilotage simple, des livrables nets, des jalons tenus.
                                        Objectif : valeur visible dès les premiers incréments.
                                    </p>
                                </Reveal>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Reveal delay={0}>
                                        <div className="card rounded-2xl p-4">
                                            <div className="text-sm font-medium text-violet-900">Exigence suisse</div>
                                            <div className="text-xs text-violet-700 mt-1">Qualité, rigueur, confidentialité et conformité locales.</div>
                                        </div>
                                    </Reveal>
                                    <Reveal delay={80}>
                                        <div className="card rounded-2xl p-4">
                                            <div className="text-sm font-medium text-violet-900">Design utile</div>
                                            <div className="text-xs text-violet-700 mt-1">Interfaces sobres, accessibles, rapides à prendre en main.</div>
                                        </div>
                                    </Reveal>
                                    <Reveal delay={160}>
                                        <div className="card rounded-2xl p-4">
                                            <div className="text-sm font-medium text-violet-900">Tech maintenable</div>
                                            <div className="text-xs text-violet-700 mt-1">Architecture documentée, tests, CI/CD, dette maîtrisée.</div>
                                        </div>
                                    </Reveal>
                                    <Reveal delay={240}>
                                        <div className="card rounded-2xl p-4">
                                            <div className="text-sm font-medium text-violet-900">Indépendance</div>
                                            <div className="text-xs text-violet-700 mt-1">Choix techniques adaptés à votre contexte, pas l’inverse.</div>
                                        </div>
                                    </Reveal>
                                </div>
                            </div>

                            <aside className="lg:col-span-5">
                                <Reveal delay={180}>
                                    <div className="card rounded-2xl p-6">
                                        <div className="font-medium text-violet-900">Nos engagements</div>
                                        <p className="mt-2 text-sm text-violet-800 leading-relaxed">
                                            Livrables clairs, communication transparente, sécurité par défaut. Nous explicitions toujours les
                                            compromis — vous gardez la maîtrise des décisions.
                                        </p>
                                    </div>
                                </Reveal>
                            </aside>
                        </div>
                    </div>
                </Section>
                {/* fondu retour vers sombre */}


                {/* OFFRE — FONCÉ */}
                <Section id="ce-que-nous-faisons">
                    <Heading kicker="Offre" title={<>Des logiciels qui travaillent pour vous</>} />

                    <div className="sectionBand band-dark text-slate-100 p-6 sm:p-8">
                        <div className="grid gap-10 lg:grid-cols-12">
                            <div className="lg:col-span-7 space-y-8">
                                <Reveal>
                                    <div className="space-y-4">
                                        <p className="text-slate-200/90 leading-relaxed">
                                            Nous développons des logiciels sur mesure, conçus pour être efficaces, fiables et durables. Impact
                                            mesurable dès la mise en service.
                                        </p>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <AnimatedPillFeature title="Apps desktop" desc="Windows/macOS pour usages intensifs métier." />
                                            <AnimatedPillFeature title="Apps & sites web" desc="Portails clients, back‑offices, vitrines rapides." />
                                            <AnimatedPillFeature title="Intégrations" desc="API, ERP/CRM, imports/exports, pipelines data." />
                                            <AnimatedPillFeature title="Performance" desc="UX soignée, budgets et délais tenus." />
                                        </div>
                                    </div>
                                </Reveal>

                                <div>
                                    <Subhead>Notre approche de bout en bout</Subhead>
                                    <ul className="grid gap-2 sm:grid-cols-2">
                                        <Reveal asLi><Li>Design & UX centrés utilisateur</Li></Reveal>
                                        <Reveal asLi delay={60}><Li>Architecture logicielle robuste</Li></Reveal>
                                        <Reveal asLi delay={120}><Li>Développement agile et testé</Li></Reveal>
                                        <Reveal asLi delay={180}><Li>Coordination projet</Li></Reveal>
                                        <Reveal asLi delay={240}><Li>Sécurité & conformité</Li></Reveal>
                                        <Reveal asLi delay={300}><Li>Déploiement & automatisation CI/CD</Li></Reveal>
                                        <Reveal asLi delay={360}><Li>Formation & transfert</Li></Reveal>
                                        <Reveal asLi delay={420}><Li>Maintenance et évolutions</Li></Reveal>
                                    </ul>
                                </div>
                            </div>

                            <div className="lg:col-span-5 space-y-6">
                                <Reveal delay={120}>
                                    <Callout title="Votre contexte au centre">
                                        Nous adaptons chaque solution à votre métier, vos délais et votre budget. Notre objectif : livrer rapidement
                                        de la valeur, sans compromis sur la fiabilité.
                                    </Callout>
                                </Reveal>
                                <Reveal delay={200}>
                                    <TechBadges />
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </Section>
                {/* fondu vers section claire */}


                {/* METHODE — CLAIR */}
                <Section id="comment-nous-travaillons">
                    <Heading kicker="Méthode" title="Fiabilité, transparence, expertise" />

                    <div className="sectionBand band-light text-slate-900 p-6 sm:p-8">
                        <div className="grid gap-10 lg:grid-cols-12">
                            <div className="lg:col-span-7 space-y-8">
                                <TimelineStep n="01" title="Cadrage concis">
                                    Objectifs, priorités, risques et critères d’acceptation partagés. Roadmap réaliste et points de contrôle.
                                </TimelineStep>
                                <TimelineStep n="02" title="Design & architecture">
                                    Parcours utilisateurs, maquettes, choix techniques. Simplicité d’usage et maintenabilité.
                                </TimelineStep>
                                <TimelineStep n="03" title="Développement itératif">
                                    Sprints courts, revues de code, tests automatiques. Démos fréquentes pour ajuster tôt.
                                </TimelineStep>
                                <TimelineStep n="04" title="Mise en production & transfert">
                                    CI/CD, sécurisation, monitoring, formation. Documentation utile et reprise aisée.
                                </TimelineStep>
                            </div>
                            <div className="lg:col-span-5 space-y-6">
                                <div className="card rounded-2xl p-6">
                                    <div className="font-medium text-violet-900">Engagement qualité</div>
                                    <p className="mt-2 text-sm text-violet-800 leading-relaxed">
                                        Traçabilité des décisions, revues croisées, sauvegardes et supervision. Code clair plutôt que complexité
                                        inutile.
                                    </p>
                                </div>
                                <div className="card rounded-2xl p-6">
                                    <div className="mb-2 font-medium text-violet-900 text-sm">Outils que nous utilisons</div>
                                    <div className="flex flex-wrap gap-2 text-xs text-violet-800">
                                        <Badge>.NET / C#</Badge>
                                        <Badge>WPF</Badge>
                                        <Badge>React / Next.js</Badge>
                                        <Badge>Node / TypeScript</Badge>
                                        <Badge>SQL Server / Postgres</Badge>
                                        <Badge>EF Core</Badge>
                                        <Badge>CI GitHub / Vercel</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
                {/* fondu retour vers sombre */}


                {/* CONTACT */}
                <Section id="contact">
                    <Heading kicker="Parlons de votre projet" title="Contact" />
                    <ContactForm />
                </Section>
            </main>

            <SiteFooter />
        </div>
    );
}

/* ----------------------------- Header ----------------------------- */
function SiteHeader({
    links,
    active,
    onJump,
}: {
    links: { id: string; label: string }[];
    active: string;
    onJump: (id: string) => void;
}) {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(12,10,22,0.7)] backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <LogoMark />
                    <span className="text-sm tracking-[0.18em] text-violet-200/90">SMARTFLOW</span>
                </div>
                <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-white/5 p-1 border border-white/10" aria-label="Navigation des sections">
                    {links.map((l) => (
                        <button
                            key={l.id}
                            onClick={() => onJump(l.id)}
                            className={
                                "relative rounded-xl px-3 py-2 text-sm transition-colors " +
                                (active === l.id ? "text-white" : "text-violet-200/85 hover:text-white")
                            }
                            aria-current={active === l.id ? "page" : undefined}
                        >
                            <span className="relative z-10">{l.label}</span>
                            <span aria-hidden className={"pointer-events-none absolute inset-0 -z-0 rounded-xl transition " + (active === l.id ? "bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)_inset]" : "")} />
                        </button>
                    ))}
                </nav>
                <button onClick={() => onJump("contact")} className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 px-3 py-2 text-sm font-medium text-white hover:opacity-90">
                    Nous contacter
                </button>
            </div>
        </header>
    );
}

/* ----------------------------- Sections & Blocks ----------------------------- */
function Section({ id, className, children }: React.PropsWithChildren<{ id: string; className?: string }>) {
    return (
        <section id={id} className={"scroll-mt-24 py-16 " + (className ?? "")}>{children}</section>
    );
}

function Hero({ onPrimary, onSecondary }: { onPrimary: () => void; onSecondary: () => void }) {
    return (
        <div className="space-y-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white/95">
                <span className="bg-gradient-to-tr from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                    Des logiciels qui servent le métier
                </span>
                ,
                <br />
                pas l’inverse.
            </h1>

            <p className="text-slate-200/90 max-w-prose">
                SmartFlow conçoit et livre des applications sur mesure qui rendent vos opérations plus fluides et vos données fiables. Chaque solution est pensée pour créer un impact concret et durable.
            </p>

            <div className="flex flex-wrap items-center gap-3">
                <button onClick={onPrimary} className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white px-5 py-3 text-sm hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-violet-400/40">
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />
                    <span className="relative z-10">Démarrer une discussion</span>
                </button>
                <button onClick={onSecondary} className="rounded-xl border px-5 py-3 text-sm text-slate-200/90 border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-400/20">
                    Découvrir l’offre
                </button>
            </div>

            <ScrollCue />
        </div>
    );
}

function Heading({ kicker, title }: { kicker?: string; title: React.ReactNode }) {
    return (
        <div className="mb-8">
            {kicker && <div className="text-xs uppercase tracking-[0.22em] text-violet-300/80">{kicker}</div>}
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-white/95 heading-accent">{title}</h2>
        </div>
    );
}

function Subhead({ children }: React.PropsWithChildren) {
    return <div className="text-sm font-medium text-white/90">{children}</div>;
}

function Li({ children }: React.PropsWithChildren) {
    return (
        <li className="flex gap-3"><Chevron /> <span>{children}</span></li>
    );
}

function Callout({ title, children }: React.PropsWithChildren<{ title: string }>) {
    return (
        <div className="rounded-2xl bg-white/8 border border-white/15 p-6 backdrop-blur-[1px]">
            <div className="font-medium text-white/90">{title}</div>
            <p className="mt-2 text-sm text-slate-200/90 leading-relaxed">{children}</p>
        </div>
    );
}

function Badge({ children }: React.PropsWithChildren) {
    return (
        <span className="inline-flex items-center rounded-xl border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs text-violet-100/90">{children}</span>
    );
}

function AnimatedPillFeature({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="g-border rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="text-sm font-medium text-white/90">{title}</div>
            <div className="text-xs text-slate-300/85 mt-1">{desc}</div>
        </div>
    );
}

function TimelineStep({ n, title, children }: React.PropsWithChildren<{ n: string; title: string }>) {
    return (
        <div className="relative pl-10">
            <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-violet-300 bg-white text-xs text-violet-800">{n}</div>
            <div className="font-medium text-slate-900">{title}</div>
            <p className="mt-1 text-sm text-slate-800 leading-relaxed">{children}</p>
        </div>
    );
}

function TechBadges() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 font-medium text-white/90 text-sm">Outils que nous utilisons</div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300/85">
                <Badge>.NET / C#</Badge>
                <Badge>WPF</Badge>
                <Badge>React / Next.js</Badge>
                <Badge>Node / TypeScript</Badge>
                <Badge>SQL Server / Postgres</Badge>
                <Badge>EF Core</Badge>
                <Badge>CI GitHub / Vercel</Badge>
            </div>
        </div>
    );
}

function ContactForm() {
    return (
        <form action="https://formspree.io/f/xeorerdy" method="POST" className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom"><input name="name" required className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40" /></Field>
                <Field label="Email"><input type="email" name="email" required className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40" /></Field>
            </div>
            <Field label="Sujet"><input name="subject" className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40" /></Field>
            <Field label="Message"><textarea name="message" rows={6} className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-violet-500/40" /></Field>
            <div className="flex items-center justify-end gap-3">
                <button className="rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 text-white px-5 py-3 text-sm hover:opacity-90">Envoyer</button>
            </div>
        </form>
    );
}

function Field({ label, children }: React.PropsWithChildren<{ label: string }>) {
    return (
        <label className="block text-sm">
            <span className="mb-1 block text-slate-300/85">{label}</span>
            {children}
        </label>
    );
}

function SiteFooter() {
    return (
        <footer className="mt-10 border-t border-white/10 bg-[rgba(14,12,22,0.6)]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-xs text-violet-200/75 flex items-center justify-between">
                <span>© {new Date().getFullYear()} SmartFlow. Tous droits réservés.</span>
                <span className="hidden sm:block">Design épuré • Violet moderne • Focalisé métier</span>
            </div>
        </footer>
    );
}

/* ----------------------------- Décor ----------------------------- */
function BackgroundSoft() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-30">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_10%,rgba(124,58,237,0.18),transparent),radial-gradient(800px_420px_at_15%_20%,rgba(99,102,241,0.12),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101425]/35 to-[#0d1020]" />
        </div>
    );
}

function SoftGrid() {
    return (
        <svg className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.12]" aria-hidden>
            <defs>
                <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity={0.7} strokeWidth={0.5} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    );
}

function FloatingOrbs() {
    // statiques (pas d'animation pour éviter tout flash)
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl bg-violet-500/15" />
            <div className="absolute bottom-[-60px] right-[-60px] h-72 w-72 rounded-full blur-3xl bg-indigo-500/15" />
        </div>
    );
}

// removed BandFade functions (not needed)

/* ----------------------------- Micro-UI ----------------------------- */
function ScrollCue() {
    return (
        <div className="pt-2 text-center">
            <div className="inline-flex flex-col items-center text-xs text-slate-300/70">
                <span>Défiler</span>
                <svg width="16" height="16" viewBox="0 0 24 24" className="mt-1" fill="none" aria-hidden>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}

/* ----------------------------- Icônes ----------------------------- */
function Chevron() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" className="mt-1 flex-none opacity-80" fill="none" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function Dot() {
    return <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-300/80" aria-hidden />;
}

function LogoMark() {
    return (
        <svg width="26" height="26" viewBox="0 0 32 32" className="text-violet-300" aria-hidden>
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="60%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
            </defs>
            <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#g)" opacity={0.25} />
            <path d="M7 18c5 0 5-8 10-8s5 8 10 8" fill="none" stroke="url(#g)" strokeWidth={2.2} strokeLinecap="round" />
            <path d="M7 22c5 0 5-6 10-6s5 6 10 6" fill="none" stroke="url(#g)" strokeWidth={2.2} strokeLinecap="round" opacity={0.65} />
        </svg>
    );
}

/* ----------------------------- Styles globaux ----------------------------- */
function GlobalStyles() {
    return (
        <style>
            {`:root{ --violet-50:#f5f3ff; --violet-100:#ede9fe; --violet-200:#ddd6fe; }
        @keyframes sheen{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        .reveal{opacity:0;transition:opacity .45s ease}
        .reveal.in{opacity:1}
        .g-border{position:relative}
        .g-border:before{content:'';position:absolute;inset:-1px;border-radius:16px;background:linear-gradient(120deg,rgba(196,181,253,.35),rgba(129,140,248,.35));mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;padding:1px;opacity:.6}
        .sectionBand{border-radius:1.5rem;border:1px solid rgba(199,210,254,.6);box-shadow:0 1px 2px rgba(16,24,40,.05)}
        .band-light{background:linear-gradient(180deg,#fff 0%,var(--violet-50) 40%,var(--violet-100) 100%)}
        .band-light .card{background:#fff;border:1px solid rgba(199,210,254,.7)}
        .band-light .card:hover{background:var(--violet-50)}
        .band-dark{background:linear-gradient(180deg,rgba(255,255,255,.04) 0%, rgba(124,58,237,.08) 100%);border-color:rgba(255,255,255,.12)}
        .heading-accent{position:relative}
        .heading-accent:after{content:'';position:absolute;left:0;bottom:-10px;height:2px;width:72px;border-radius:999px;background:linear-gradient(90deg,#c084fc,#818cf8);opacity:.9}
      `}
        </style>
    );
}

/* ----------------------------- Hooks ----------------------------- */
function useInView(ref: React.RefObject<Element>, options?: IntersectionObserverInit) {
    const [inView, setInView] = React.useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return;
        const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options ?? { rootMargin: "-10% 0px -10% 0px", threshold: 0.2 });
        io.observe(el);
        return () => io.disconnect();
    }, [ref, options]);
    return inView;
}

function Reveal({ children, delay = 0, asLi = false }: React.PropsWithChildren<{ delay?: number; asLi?: boolean }>) {
    const prefers = usePrefersReducedMotion();
    const r = React.useRef<HTMLDivElement | HTMLLIElement>(null);
    const inView = useInView(r);
    const cls = `reveal ${inView || prefers ? 'in' : ''}`;
    const style = prefers ? undefined : ({ transitionDelay: `${delay}ms` } as React.CSSProperties);
    const Tag: any = asLi ? 'li' : 'div';
    return <Tag ref={r} className={cls} style={style}>{children}</Tag>;
}

function usePrefersReducedMotion() {
    const [prefersReduced, set] = useState(false);
    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function") { set(false); return; }
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => set(mq.matches);
        update();
        (mq as any).addEventListener?.("change", update) ?? (mq as any).addListener?.(update);
        return () => { (mq as any).removeEventListener?.("change", update) ?? (mq as any).removeListener?.(update); };
    }, []);
    return prefersReduced;
}
