import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Eye, Lock, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAdminPrincipal,
  useInitAdmin,
  useIsAdmin,
} from "../hooks/use-backend";

// ── Status type ────────────────────────────────────────────────────────────────

type AdminStatus = "checking" | "is-admin" | "unclaimed" | "unauthorized";

// ── Loading skeleton ───────────────────────────────────────────────────────────

function LoginSkeleton() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-sm" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="bg-card border border-border rounded-md p-8 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AdminLogin() {
  const { login, loginStatus, identity, isInitializing, clear } =
    useInternetIdentity();
  const navigate = useNavigate();
  const isLoggedIn = !!identity && !isInitializing;

  const { data: isAdminData, isLoading: isAdminLoading } = useIsAdmin();
  const { data: adminPrincipalText, isLoading: isPrincipalLoading } =
    useAdminPrincipal();
  const { mutate: initAdmin, isPending: isInitingAdmin } = useInitAdmin();

  const [adminStatus, setAdminStatus] = useState<AdminStatus>("checking");

  // Once we have identity + admin data, determine status
  useEffect(() => {
    if (!isLoggedIn) return;
    if (isAdminLoading || isPrincipalLoading) return;

    if (isAdminData === true) {
      setAdminStatus("is-admin");
    } else if (adminPrincipalText === "" || adminPrincipalText === undefined) {
      // Admin seat not yet claimed
      setAdminStatus("unclaimed");
    } else {
      setAdminStatus("unauthorized");
    }
  }, [
    isLoggedIn,
    isAdminData,
    isAdminLoading,
    adminPrincipalText,
    isPrincipalLoading,
  ]);

  // Auto-redirect if confirmed admin
  useEffect(() => {
    if (adminStatus === "is-admin") {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [adminStatus, navigate]);

  const isLoggingIn = loginStatus === "logging-in";

  // ── Not yet logged in ──────────────────────────────────────────────────────

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4"
        data-ocid="admin-login-page"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-sm bg-primary flex items-center justify-center shadow-lg">
                <Shield className="w-9 h-9 text-accent" strokeWidth={2.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Lock
                  className="w-3 h-3 text-accent-foreground"
                  strokeWidth={3}
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-widest text-foreground uppercase">
                Bharat Netra
              </h1>
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mt-1">
                Admin Access Portal
              </p>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                No Godi. No Chatukar. Only Truth.
              </p>
            </div>
          </div>

          <div
            className="bg-card border border-border rounded-md p-8 space-y-6 shadow-sm"
            data-ocid="admin-login-card"
          >
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-sm">
                <Eye className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-black text-accent uppercase tracking-wider">
                  Journalist &amp; Admin Only
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-semibold leading-relaxed">
                Authenticate with Internet Identity to access the Bharat Netra
                admin panel.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                className="w-full font-black uppercase tracking-widest text-sm h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                onClick={() => login()}
                disabled={isLoggingIn}
                data-ocid="admin-login-btn"
              >
                {isLoggingIn ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Authenticating…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Login with Internet Identity
                  </span>
                )}
              </Button>
              <p className="text-[11px] text-center text-muted-foreground/70 font-medium leading-relaxed">
                Secured by Internet Identity — decentralized, zero-knowledge
                authentication. No passwords. No tracking.
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground font-semibold">
            Restricted to verified journalists and administrators of the{" "}
            <span className="text-foreground font-bold">
              Vishwodya Foundation
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  // ── Logged in — checking admin status ─────────────────────────────────────

  if (adminStatus === "checking" || isAdminLoading || isPrincipalLoading) {
    return (
      <div
        className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4"
        data-ocid="admin-checking"
      >
        <LoginSkeleton />
      </div>
    );
  }

  // ── Redirecting to dashboard ────────────────────────────────────────────────

  if (adminStatus === "is-admin") {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <ShieldCheck className="w-12 h-12 text-chart-1" />
          <p className="text-sm font-bold text-foreground">
            Verified admin. Redirecting…
          </p>
        </div>
      </div>
    );
  }

  // ── Admin seat unclaimed — show Claim Admin Seat ────────────────────────────

  if (adminStatus === "unclaimed") {
    return (
      <div
        className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4"
        data-ocid="admin-claim-page"
      >
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Shield className="w-9 h-9 text-accent" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-widest text-foreground uppercase">
                Admin Seat Available
              </h1>
              <p className="text-xs text-muted-foreground mt-2 font-semibold">
                No admin has been assigned yet. Claim the admin seat to manage
                Bharat Netra.
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-8 space-y-6">
            <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-sm">
              <Eye className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-xs font-semibold text-foreground leading-relaxed">
                Once claimed, this principal becomes the sole administrator.
                Only this principal can submit, publish, and manage content on
                Bharat Netra.
              </p>
            </div>
            <Button
              type="button"
              className="w-full h-12 font-black uppercase tracking-widest text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
              onClick={() =>
                initAdmin(undefined, {
                  onSuccess: (result) => {
                    if (result.__kind__ === "ok") {
                      toast.success("Admin seat claimed successfully!");
                      void navigate({ to: "/admin/dashboard" });
                    } else {
                      toast.error(`Failed: ${result.err}`);
                    }
                  },
                  onError: (err) => toast.error(`Error: ${err.message}`),
                })
              }
              disabled={isInitingAdmin}
              data-ocid="claim-admin-btn"
            >
              {isInitingAdmin ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Claiming…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Claim Admin Seat
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 font-bold uppercase tracking-wide text-xs"
              onClick={() => clear()}
            >
              Cancel &amp; Logout
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Unauthorized ───────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4"
      data-ocid="admin-unauthorized"
    >
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground uppercase tracking-widest">
              403 — Unauthorized
            </h1>
            <p className="text-sm text-muted-foreground font-semibold mt-2 max-w-xs mx-auto leading-relaxed">
              Your principal is not the registered Bharat Netra administrator.
              Access is restricted.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md p-6 space-y-4">
          <div className="px-3 py-2 bg-muted/40 rounded-sm">
            <p className="text-xs font-mono text-muted-foreground break-all">
              Admin principal: {adminPrincipalText}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-10 font-bold uppercase tracking-wide text-xs gap-2"
            onClick={() => {
              clear();
            }}
            data-ocid="unauthorized-logout-btn"
          >
            <Lock className="w-3.5 h-3.5" />
            Logout &amp; Return
          </Button>
        </div>
      </div>
    </div>
  );
}
