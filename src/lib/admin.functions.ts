import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const ADMIN_USERNAME = "khs-superadmin";
export const ADMIN_EMAIL = "khs-superadmin@kolehiyo-admin.local";

export const getAdminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count, error } = await supabaseAdmin
    .from("user_roles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");
  if (error) throw new Error(error.message);
  return { exists: (count ?? 0) > 0 };
});

// One-time setup: only works while no admin exists yet.
export const setupAdmin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ password: z.string().min(8).max(72) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) throw new Error("Admin account already exists.");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: data.password,
      email_confirm: true,
    });
    if (error || !created.user) throw new Error(error?.message ?? "Could not create admin");
    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "admin" });
    if (roleErr) throw new Error(roleErr.message);
    return { ok: true };
  });
