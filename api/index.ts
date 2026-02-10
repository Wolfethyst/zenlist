// Cloudflare Worker entry point for API routes
// This will handle requests for sign-in, dashboard, and D1 database access

  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { method } = request;
    // Health check
    if (url.pathname === "/api/health") {
      return new Response("OK", { status: 200 });
    }
    // --- FAMILY MANAGEMENT ENDPOINTS ---
    // List families for a user (GET /api/families?userId=)
    if (url.pathname === "/api/families" && method === "GET") {
      const userId = url.searchParams.get("userId");
      if (!userId) return new Response("Missing userId", { status: 400 });
      const families = await env.DB.prepare(
        `SELECT f.* FROM families f JOIN family_members fm ON f.id = fm.family_id WHERE fm.user_id = ?`
      ).all(userId);
      return Response.json(families.results);
    }
    // Create a family (POST /api/families)
    if (url.pathname === "/api/families" && method === "POST") {
      const { name, owner_id } = await request.json();
      if (!name || !owner_id) return new Response("Missing name or owner_id", { status: 400 });
      const result = await env.DB.prepare(
        `INSERT INTO families (name, owner_id) VALUES (?, ?)`
      ).run(name, owner_id);
      // Add owner as member
      await env.DB.prepare(
        `INSERT INTO family_members (family_id, user_id, role) VALUES (?, ?, 'owner')`
      ).run(result.lastRowId, owner_id);
      return Response.json({ id: result.lastRowId, name, owner_id });
    }
    // Delete a family (DELETE /api/families/:id)
    if (url.pathname.startsWith("/api/families/") && method === "DELETE") {
      const id = url.pathname.split("/").pop();
      if (!id) return new Response("Missing family id", { status: 400 });
      await env.DB.prepare(`DELETE FROM family_members WHERE family_id = ?`).run(id);
      await env.DB.prepare(`DELETE FROM families WHERE id = ?`).run(id);
      return new Response("Deleted", { status: 200 });
    }
    // Join a family (POST /api/families/:id/join)
    if (url.pathname.match(/^\/api\/families\/(\d+)\/join$/) && method === "POST") {
      const id = url.pathname.split("/")[3];
      const { user_id } = await request.json();
      if (!user_id) return new Response("Missing user_id", { status: 400 });
      await env.DB.prepare(
        `INSERT OR IGNORE INTO family_members (family_id, user_id, role) VALUES (?, ?, 'member')`
      ).run(id, user_id);
      return new Response("Joined", { status: 200 });
    }
    // Leave a family (POST /api/families/:id/leave)
    if (url.pathname.match(/^\/api\/families\/(\d+)\/leave$/) && method === "POST") {
      const id = url.pathname.split("/")[3];
      const { user_id } = await request.json();
      if (!user_id) return new Response("Missing user_id", { status: 400 });
      await env.DB.prepare(
        `DELETE FROM family_members WHERE family_id = ? AND user_id = ?`
      ).run(id, user_id);
      return new Response("Left", { status: 200 });
    }
    // --- AUTH ROUTES (unchanged) ---
    if (url.pathname === "/api/auth/signin" && method === "POST") {
      // TODO: Implement sign-in logic (validate user, return token/cookie)
      return new Response("Sign-in endpoint", { status: 200 });
    }
    if (url.pathname === "/api/auth/signout" && method === "POST") {
      // TODO: Implement sign-out logic (clear token/cookie)
      return new Response("Sign-out endpoint", { status: 200 });
    }
    // Not found
    return new Response("Not found", { status: 404 });
  }
};
