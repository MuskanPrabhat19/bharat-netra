import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { BarChart2, Eye, Menu, Radio, Shield, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "News Feed", path: "/news-feed", icon: Eye },
  { label: "Live Video", path: "/live", icon: Radio },
  { label: "Intelligence", path: "/dashboard", icon: BarChart2 },
  { label: "Admin", path: "/admin/login", icon: Shield },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col dark bg-background text-foreground">
      {/* ── Header ── */}
      <header
        className="bg-primary border-b border-border shadow-sm sticky top-0 z-50"
        data-ocid="nav-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link to="/news-feed" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-accent">
                <Shield
                  className="w-5 h-5 text-accent-foreground"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-widest text-foreground uppercase">
                  BHARAT NETRA
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  No Godi. No Chatukar. Only Truth.
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              data-ocid="nav-links"
            >
              {NAV_LINKS.map(({ label, path, icon: Icon }) => {
                const active = pathname.startsWith(path);
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-bold transition-smooth",
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                    )}
                    data-ocid={`nav-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={2.5} />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              data-ocid="nav-mobile-toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-primary px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, path, icon: Icon }) => {
              const active = pathname.startsWith(path);
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-bold transition-smooth",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* ── Main ── */}
      <main className="flex-1 bg-background" data-ocid="main-content">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-card border-t border-border" data-ocid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" strokeWidth={2.5} />
                <span className="text-sm font-black tracking-widest text-foreground uppercase">
                  BHARAT NETRA
                </span>
              </div>
              <p className="text-xs font-semibold text-muted-foreground italic">
                No Godi. No Chatukar. Only Truth.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Powered &amp; Funded by{" "}
                <span className="font-bold text-foreground">
                  Vishwodya Foundation
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Founder:{" "}
                <span className="font-bold text-foreground">
                  Prabhat Priyadarshi
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} All Rights Reserved — Vishwodya
                Foundation
              </p>
              <p className="text-xs text-muted-foreground">
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-accent hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
