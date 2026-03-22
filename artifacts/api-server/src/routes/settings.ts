import { Router } from "express";
import { db, storeSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const settingsRouter = Router();

settingsRouter.get("/settings", async (_req, res) => {
  try {
    const rows = await db.select().from(storeSettingsTable);
    const settings: Record<string, string> = {};
    for (const row of rows) {
      settings[row.key] = row.value;
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load settings" });
  }
});

settingsRouter.post("/settings", async (req, res) => {
  try {
    const { key, value } = req.body as { key: string; value: string };
    if (!key || value === undefined) {
      res.status(400).json({ success: false, error: "key and value are required" });
      return;
    }
    await db
      .insert(storeSettingsTable)
      .values({ key, value })
      .onConflictDoUpdate({
        target: storeSettingsTable.key,
        set: { value, updatedAt: new Date() },
      });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to save setting" });
  }
});

settingsRouter.delete("/settings/:key", async (req, res) => {
  try {
    const { key } = req.params;
    await db.delete(storeSettingsTable).where(eq(storeSettingsTable.key, key));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to delete setting" });
  }
});

export default settingsRouter;
