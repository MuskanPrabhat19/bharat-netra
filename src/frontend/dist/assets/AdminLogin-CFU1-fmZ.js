import { c as createLucideIcon, f as useInternetIdentity, h as useNavigate, r as reactExports, j as jsxRuntimeExports, e as Shield, E as Eye, S as Skeleton } from "./index-CL-FxwHs.js";
import { B as Button } from "./button-HWhoFiqx.js";
import { u as ue } from "./index-DRyHavz7.js";
import { e as useIsAdmin, f as useAdminPrincipal, g as useInitAdmin } from "./use-backend-D5H3Go86.js";
import { S as ShieldAlert } from "./shield-alert-BdRYHVKj.js";
import "./index-Cjzqe9wX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function LoginSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-md" })
    ] })
  ] });
}
function AdminLogin() {
  const { login, loginStatus, identity, isInitializing, clear } = useInternetIdentity();
  const navigate = useNavigate();
  const isLoggedIn = !!identity && !isInitializing;
  const { data: isAdminData, isLoading: isAdminLoading } = useIsAdmin();
  const { data: adminPrincipalText, isLoading: isPrincipalLoading } = useAdminPrincipal();
  const { mutate: initAdmin, isPending: isInitingAdmin } = useInitAdmin();
  const [adminStatus, setAdminStatus] = reactExports.useState("checking");
  reactExports.useEffect(() => {
    if (!isLoggedIn) return;
    if (isAdminLoading || isPrincipalLoading) return;
    if (isAdminData === true) {
      setAdminStatus("is-admin");
    } else if (adminPrincipalText === "" || adminPrincipalText === void 0) {
      setAdminStatus("unclaimed");
    } else {
      setAdminStatus("unauthorized");
    }
  }, [
    isLoggedIn,
    isAdminData,
    isAdminLoading,
    adminPrincipalText,
    isPrincipalLoading
  ]);
  reactExports.useEffect(() => {
    if (adminStatus === "is-admin") {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [adminStatus, navigate]);
  const isLoggingIn = loginStatus === "logging-in";
  if (!isLoggedIn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4",
        "data-ocid": "admin-login-page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-sm bg-primary flex items-center justify-center shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-9 h-9 text-accent", strokeWidth: 2.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Lock,
                {
                  className: "w-3 h-3 text-accent-foreground",
                  strokeWidth: 3
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black tracking-widest text-foreground uppercase", children: "Bharat Netra" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-accent uppercase tracking-widest mt-1", children: "Admin Access Portal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 font-medium", children: "No Godi. No Chatukar. Only Truth." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-md p-8 space-y-6 shadow-sm",
              "data-ocid": "admin-login-card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 text-accent" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-black text-accent uppercase tracking-wider", children: "Journalist & Admin Only" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold leading-relaxed", children: "Authenticate with Internet Identity to access the Bharat Netra admin panel." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      className: "w-full font-black uppercase tracking-widest text-sm h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth",
                      onClick: () => login(),
                      disabled: isLoggingIn,
                      "data-ocid": "admin-login-btn",
                      children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }),
                        "Authenticating…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                        "Login with Internet Identity"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-center text-muted-foreground/70 font-medium leading-relaxed", children: "Secured by Internet Identity — decentralized, zero-knowledge authentication. No passwords. No tracking." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground font-semibold", children: [
            "Restricted to verified journalists and administrators of the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-bold", children: "Vishwodya Foundation" }),
            "."
          ] })
        ] })
      }
    );
  }
  if (adminStatus === "checking" || isAdminLoading || isPrincipalLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4",
        "data-ocid": "admin-checking",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginSkeleton, {})
      }
    );
  }
  if (adminStatus === "is-admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-8rem)] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 text-chart-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Verified admin. Redirecting…" })
    ] }) });
  }
  if (adminStatus === "unclaimed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4",
        "data-ocid": "admin-claim-page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-9 h-9 text-accent", strokeWidth: 2.5 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black tracking-widest text-foreground uppercase", children: "Admin Seat Available" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 font-semibold", children: "No admin has been assigned yet. Claim the admin seat to manage Bharat Netra." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-8 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-accent shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground leading-relaxed", children: "Once claimed, this principal becomes the sole administrator. Only this principal can submit, publish, and manage content on Bharat Netra." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                className: "w-full h-12 font-black uppercase tracking-widest text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth",
                onClick: () => initAdmin(void 0, {
                  onSuccess: (result) => {
                    if (result.__kind__ === "ok") {
                      ue.success("Admin seat claimed successfully!");
                      void navigate({ to: "/admin/dashboard" });
                    } else {
                      ue.error(`Failed: ${result.err}`);
                    }
                  },
                  onError: (err) => ue.error(`Error: ${err.message}`)
                }),
                disabled: isInitingAdmin,
                "data-ocid": "claim-admin-btn",
                children: isInitingAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }),
                  "Claiming…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" }),
                  "Claim Admin Seat"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "w-full h-10 font-bold uppercase tracking-wide text-xs",
                onClick: () => clear(),
                children: "Cancel & Logout"
              }
            )
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[calc(100vh-8rem)] flex items-center justify-center px-4",
      "data-ocid": "admin-unauthorized",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md space-y-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-black text-foreground uppercase tracking-widest", children: "403 — Unauthorized" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-semibold mt-2 max-w-xs mx-auto leading-relaxed", children: "Your principal is not the registered Bharat Netra administrator. Access is restricted." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-6 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 bg-muted/40 rounded-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground break-all", children: [
            "Admin principal: ",
            adminPrincipalText
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "w-full h-10 font-bold uppercase tracking-wide text-xs gap-2",
              onClick: () => {
                clear();
              },
              "data-ocid": "unauthorized-logout-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
                "Logout & Return"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
export {
  AdminLogin as default
};
