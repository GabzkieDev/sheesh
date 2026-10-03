import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL, ADMIN_USERNAME, getAdminStatus, setupAdmin } from "@/lib/admin.functions";
import {
  contentQueryKey,
  courseImage,
  defaults,
  useContent,
  type ContentKey,
  type ContentValue,
  type CourseEntry,
} from "@/lib/site-content";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Kolehiyo ng Heneral Santos" },
      { name: "description", content: "Website administration for Kolehiyo ng Heneral Santos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — Kolehiyo ng Heneral Santos" },
      { property: "og:description", content: "Website administration." },
    ],
  }),
  component: AdminPage,
});

const input =
  "w-full rounded-sm border border-navy/20 bg-card px-3 py-2 text-sm text-navy outline-none focus:border-gold";
const btn =
  "rounded-sm bg-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50";
const btnGhost = "rounded-sm border border-navy/20 px-4 py-2 text-xs font-semibold text-navy";

function useIsAdmin() {
  const [state, setState] = useState<"loading" | "out" | "admin" | "notadmin">("loading");
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return setState("out");
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setState(role ? "admin" : "notadmin");
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_IN" || e === "SIGNED_OUT") check();
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return state;
}

function AdminPage() {
  const state = useIsAdmin();
  return (
    <main className="min-h-[70vh] bg-silver/20 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {state === "loading" && <p className="text-sm text-navy/60">Loading…</p>}
        {(state === "out" || state === "notadmin") && <Login />}
        {state === "admin" && <Dashboard />}
      </div>
    </main>
  );
}

function Login() {
  const status = useServerFn(getAdminStatus);
  const setup = useServerFn(setupAdmin);
  const { data, refetch } = useQuery({ queryKey: ["admin-status"], queryFn: () => status() });
  const [username, setUsername] = useState(ADMIN_USERNAME);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const first = data && !data.exists;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== ADMIN_USERNAME) {
      toast.error("Wrong username or password");
      return;
    }
    setBusy(true);
    try {
      if (first) {
        await setup({ data: { password } });
        await refetch();
      }
      const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
      if (error) toast.error("Wrong username or password");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-sm bg-card p-8 shadow-sm">
      <h1 className="font-display text-2xl">Admin sign in</h1>
      <div className="h-1 w-10 bg-gold" />
      {first && (
        <p className="text-xs text-navy/70">
          First-time setup: choose a password (at least 8 characters) for the admin account.
        </p>
      )}
      <label className="block text-xs font-semibold">
        Username
        <input className={`${input} mt-1`} value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="block text-xs font-semibold">
        Password
        <input
          type="password"
          className={`${input} mt-1`}
          value={password}
          minLength={8}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className={`${btn} w-full`} disabled={busy}>
        {busy ? "Please wait…" : first ? "Create admin & sign in" : "Sign in"}
      </button>
    </form>
  );
}

function useSave<K extends ContentKey>(key: K) {
  const qc = useQueryClient();
  return async (value: ContentValue<K>) => {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value: value as never, updated_at: new Date().toISOString() });
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.setQueryData(contentQueryKey(key), value);
    toast.success("Saved");
  };
}

async function uploadImage(file: File): Promise<string | null> {
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, { upsert: true });
  if (error) {
    toast.error(error.message);
    return null;
  }
  const { data, error: e2 } = await supabase.storage
    .from("site-images")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (e2 || !data) {
    toast.error(e2?.message ?? "Upload failed");
    return null;
  }
  return data.signedUrl;
}

function ImagePicker({ label, src, onChange }: { label: string; src: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold">{label}</p>
      <img src={src} alt={label} className="aspect-video w-full rounded-sm object-cover" />
      <label className={`${btnGhost} inline-block cursor-pointer`}>
        {busy ? "Uploading…" : "Replace photo"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setBusy(true);
            const url = await uploadImage(f);
            setBusy(false);
            if (url) onChange(url);
          }}
        />
      </label>
    </div>
  );
}

const tabs = ["Photos", "Courses", "Bulletin", "Contact", "About"] as const;

function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Photos");
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Website admin</h1>
        <button className={btnGhost} onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
      </div>
      <div className="mb-8 flex flex-wrap gap-2 border-b border-navy/10">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${
              tab === t ? "border-b-2 border-gold text-navy" : "text-navy/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Photos" && <PhotosTab />}
      {tab === "Courses" && <CoursesTab />}
      {tab === "Bulletin" && <NewsTab />}
      {tab === "Contact" && <ContactTab />}
      {tab === "About" && <AboutTab />}
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="space-y-4 rounded-sm bg-card p-6 shadow-sm">{children}</div>;
}

function PhotosTab() {
  const images = useContent("images");
  const save = useSave("images");
  return (
    <Card>
      <div className="grid gap-6 md:grid-cols-2">
        <ImagePicker label="Home page banner" src={images.heroBg} onChange={(u) => save({ ...images, heroBg: u })} />
        <ImagePicker
          label="Main campus photo (Home & About)"
          src={images.campusMain}
          onChange={(u) => save({ ...images, campusMain: u })}
        />
      </div>
      <p className="text-xs text-navy/60">Course photos are changed in the Courses tab.</p>
    </Card>
  );
}

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function CoursesTab() {
  const current = useContent("courses");
  const save = useSave("courses");
  const [list, setList] = useState<CourseEntry[]>(current);
  useEffect(() => setList(current), [current]);
  const update = (i: number, patch: Partial<CourseEntry>) =>
    setList((l) => l.map((c, j) => (j === i ? { ...c, ...patch } : c)));

  return (
    <div className="space-y-6">
      {list.map((c, i) => (
        <Card key={i}>
          <div className="grid gap-4 md:grid-cols-2">
            <ImagePicker label="Course photo" src={courseImage(c)} onChange={(u) => update(i, { image: u })} />
            <div className="space-y-3">
              <Field label="Name" value={c.name} onChange={(v) => update(i, { name: v })} />
              <Field
                label="Web address (letters and dashes)"
                value={c.slug}
                onChange={(v) => update(i, { slug: v.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
              />
              <Field label="College" value={c.college} onChange={(v) => update(i, { college: v })} />
              <Field label="Duration" value={c.duration} onChange={(v) => update(i, { duration: v })} />
            </div>
          </div>
          <Field label="Short description" value={c.short} onChange={(v) => update(i, { short: v })} />
          <Field label="Overview" area value={c.overview} onChange={(v) => update(i, { overview: v })} />
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Highlights (one per line)" area value={c.highlights.join("\n")} onChange={(v) => update(i, { highlights: lines(v) })} />
            <Field label="Subjects (one per line)" area value={c.subjects.join("\n")} onChange={(v) => update(i, { subjects: lines(v) })} />
            <Field label="Careers (one per line)" area value={c.careers.join("\n")} onChange={(v) => update(i, { careers: lines(v) })} />
          </div>
          <button className={btnGhost} onClick={() => setList((l) => l.filter((_, j) => j !== i))}>
            Remove course
          </button>
        </Card>
      ))}
      <div className="flex gap-3">
        <button
          className={btnGhost}
          onClick={() =>
            setList((l) => [
              ...l,
              { slug: `new-course-${l.length + 1}`, name: "New course", short: "", college: "", duration: "4 years", overview: "", highlights: [], subjects: [], careers: [] },
            ])
          }
        >
          + Add course
        </button>
        <button className={btn} onClick={() => save(list)}>Save courses</button>
      </div>
    </div>
  );
}

function NewsTab() {
  const current = useContent("news");
  const save = useSave("news");
  const [list, setList] = useState(current);
  useEffect(() => setList(current), [current]);
  const update = (i: number, patch: Partial<(typeof list)[number]>) =>
    setList((l) => l.map((n, j) => (j === i ? { ...n, ...patch } : n)));
  return (
    <div className="space-y-6">
      <button
        className={btnGhost}
        onClick={() => setList((l) => [{ date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }), tag: "News", title: "", body: "" }, ...l])}
      >
        + New announcement
      </button>
      {list.map((n, i) => (
        <Card key={i}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Date" value={n.date} onChange={(v) => update(i, { date: v })} />
            <Field label="Tag" value={n.tag} onChange={(v) => update(i, { tag: v })} />
          </div>
          <Field label="Title" value={n.title} onChange={(v) => update(i, { title: v })} />
          <Field label="Details" area value={n.body} onChange={(v) => update(i, { body: v })} />
          <button className={btnGhost} onClick={() => setList((l) => l.filter((_, j) => j !== i))}>Remove</button>
        </Card>
      ))}
      <button className={btn} onClick={() => save(list)}>Save bulletin</button>
    </div>
  );
}

function ContactTab() {
  const current = useContent("contact");
  const save = useSave("contact");
  const [c, setC] = useState(current);
  useEffect(() => setC(current), [current]);
  return (
    <Card>
      <Field label="Address" value={c.address} onChange={(v) => setC({ ...c, address: v })} />
      <Field label="Email" value={c.email} onChange={(v) => setC({ ...c, email: v })} />
      <Field label="Facebook link" value={c.facebook} onChange={(v) => setC({ ...c, facebook: v })} />
      <Field label="Office hours" area value={c.hours} onChange={(v) => setC({ ...c, hours: v })} />
      <p className="pt-2 text-xs font-bold uppercase tracking-wider text-navy/50">Offices</p>
      {c.offices.map((o, i) => (
        <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
          {(["name", "email", "phone"] as const).map((f) => (
            <input
              key={f}
              className={input}
              placeholder={f}
              value={o[f]}
              onChange={(e) => setC({ ...c, offices: c.offices.map((x, j) => (j === i ? { ...x, [f]: e.target.value } : x)) })}
            />
          ))}
          <button className={btnGhost} onClick={() => setC({ ...c, offices: c.offices.filter((_, j) => j !== i) })}>Remove</button>
        </div>
      ))}
      <div className="flex gap-3">
        <button className={btnGhost} onClick={() => setC({ ...c, offices: [...c.offices, { name: "", email: "", phone: "" }] })}>+ Add office</button>
        <button className={btn} onClick={() => save(c)}>Save contact</button>
      </div>
    </Card>
  );
}

function AboutTab() {
  const current = useContent("about");
  const save = useSave("about");
  const [a, setA] = useState(current);
  useEffect(() => setA(current), [current]);
  return (
    <Card>
      <Field label="Mission" area value={a.mission} onChange={(v) => setA({ ...a, mission: v })} />
      <Field label="Vision" area value={a.vision} onChange={(v) => setA({ ...a, vision: v })} />
      <Field label="Mandate" area value={a.mandate} onChange={(v) => setA({ ...a, mandate: v })} />
      <div className="flex gap-3">
        <button className={btn} onClick={() => save(a)}>Save</button>
        <button className={btnGhost} onClick={() => setA(defaults.about)}>Reset to original text</button>
      </div>
    </Card>
  );
}

function Field({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  return (
    <label className="block text-xs font-semibold">
      {label}
      {area ? (
        <textarea className={`${input} mt-1 min-h-24`} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={`${input} mt-1`} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
