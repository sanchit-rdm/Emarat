/**
 * Migrate string/text fields that were changed to blockContent on 2026-06-15.
 * Safe to re-run: only patches a field if it's still a plain string.
 *
 * Run once:
 *   npx sanity exec scripts/migrate-strings-to-blockcontent.ts --with-user-token
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) throw new Error("Set SANITY_TOKEN env var before running this script.");

const client = createClient({
  projectId: "k6lgt7ii",
  dataset: "production",
  apiVersion: "2024-05-25",
  useCdn: false,
  token,
});

let _n = Date.now();
const key = () => `mig${(_n++).toString(36)}`;

function strToBC(val: unknown): unknown {
  if (!val || typeof val !== "string") return val;
  const lines = val.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return val;
  return lines.map((line) => ({
    _key: key(),
    _type: "block",
    style: "normal",
    markDefs: [],
    children: [{ _key: key(), _type: "span", text: line.trim(), marks: [] }],
  }));
}

type Doc = Record<string, unknown>;

async function migrateDoc(id: string, build: (doc: Doc) => Doc) {
  const doc: Doc | null = await client.fetch(`*[_id == $id][0]`, { id });
  if (!doc) { console.log(`  skip: ${id} not found`); return; }
  const patch = build(doc);
  if (Object.keys(patch).length === 0) { console.log(`  ${id}: nothing to migrate`); return; }
  await client.patch(id).set(patch).commit();
  console.log(`  ${id}: migrated → ${Object.keys(patch).join(", ")}`);
}

async function main() {
  console.log("Starting migration…");

  // ── homePage ──────────────────────────────────────────────────────────────
  await migrateDoc("homePage", (doc) => {
    const patch: Doc = {};
    const about    = doc.about    as Doc | undefined;
    const approach = doc.approach as Doc | undefined;
    const contact  = doc.contact  as Doc | undefined;
    const location = doc.location as Doc | undefined;
    const statement = doc.statement as Doc | undefined;
    const designTwo = doc.designTwo as Doc | undefined;
    const principles = designTwo?.principles as Doc | undefined;

    if (typeof about?.heading1 === "string")     patch["about.heading1"]     = strToBC(about.heading1);
    if (typeof about?.heading2 === "string")     patch["about.heading2"]     = strToBC(about.heading2);
    if (typeof about?.description === "string")  patch["about.description"]  = strToBC(about.description);

    if (typeof approach?.heading1 === "string")  patch["approach.heading1"]  = strToBC(approach.heading1);
    if (typeof approach?.heading2 === "string")  patch["approach.heading2"]  = strToBC(approach.heading2);
    if (typeof approach?.heading3 === "string")  patch["approach.heading3"]  = strToBC(approach.heading3);

    if (Array.isArray(approach?.values)) {
      const vals = approach!.values as Doc[];
      patch["approach.values"] = vals.map((v) => ({
        ...v,
        title: typeof v.title === "string" ? strToBC(v.title) : v.title,
        body:  typeof v.body  === "string" ? strToBC(v.body)  : v.body,
      }));
    }

    if (typeof contact?.heading1 === "string")   patch["contact.heading1"]   = strToBC(contact.heading1);
    if (typeof contact?.heading2 === "string")   patch["contact.heading2"]   = strToBC(contact.heading2);
    if (typeof contact?.address  === "string")   patch["contact.address"]    = strToBC(contact.address);
    if (typeof contact?.lead     === "string")   patch["contact.lead"]       = strToBC(contact.lead);

    if (Array.isArray(location?.places)) {
      const places = location!.places as Doc[];
      patch["location.places"] = places.map((p) => ({
        ...p,
        headingLine1: typeof p.headingLine1 === "string" ? strToBC(p.headingLine1) : p.headingLine1,
        headingLine2: typeof p.headingLine2 === "string" ? strToBC(p.headingLine2) : p.headingLine2,
        feature:      typeof p.feature      === "string" ? strToBC(p.feature)      : p.feature,
      }));
    }

    if (typeof statement?.eyebrow === "string")  patch["statement.eyebrow"]  = strToBC(statement.eyebrow);
    if (typeof statement?.lead    === "string")  patch["statement.lead"]     = strToBC(statement.lead);
    if (typeof statement?.rest    === "string")  patch["statement.rest"]     = strToBC(statement.rest);
    if (typeof statement?.body    === "string")  patch["statement.body"]     = strToBC(statement.body);

    if (typeof principles?.heading1 === "string") patch["designTwo.principles.heading1"] = strToBC(principles.heading1);
    if (typeof principles?.heading2 === "string") patch["designTwo.principles.heading2"] = strToBC(principles.heading2);
    if (typeof principles?.heading3 === "string") patch["designTwo.principles.heading3"] = strToBC(principles.heading3);

    return patch;
  });

  // ── aboutPage ─────────────────────────────────────────────────────────────
  await migrateDoc("aboutPage", (doc) => {
    const patch: Doc = {};
    const intro      = doc.intro      as Doc | undefined;
    const community  = doc.community  as Doc | undefined;
    const leadership = doc.leadership as Doc | undefined;

    if (typeof intro?.heading1  === "string") patch["intro.heading1"]  = strToBC(intro.heading1);
    if (typeof intro?.heading2  === "string") patch["intro.heading2"]  = strToBC(intro.heading2);
    if (typeof intro?.paragraph === "string") patch["intro.paragraph"] = strToBC(intro.paragraph);

    if (typeof community?.heading1 === "string") patch["community.heading1"] = strToBC(community.heading1);
    if (typeof community?.heading2 === "string") patch["community.heading2"] = strToBC(community.heading2);
    if (typeof community?.blurb    === "string") patch["community.blurb"]    = strToBC(community.blurb);

    if (Array.isArray(community?.initiatives)) {
      const inits = community!.initiatives as Doc[];
      patch["community.initiatives"] = inits.map((i) => ({
        ...i,
        body: typeof i.body === "string" ? strToBC(i.body) : i.body,
      }));
    }

    if (typeof leadership?.quote === "string") patch["leadership.quote"] = strToBC(leadership.quote);
    if (typeof leadership?.body  === "string") patch["leadership.body"]  = strToBC(leadership.body);

    return patch;
  });

  // ── careersPage ───────────────────────────────────────────────────────────
  await migrateDoc("careersPage", (doc) => {
    const patch: Doc = {};
    const pillarsHeading = doc.pillarsHeading as Doc | undefined;
    const areasHeading   = doc.areasHeading   as Doc | undefined;
    const apply          = doc.apply          as Doc | undefined;

    if (typeof pillarsHeading?.heading1 === "string") patch["pillarsHeading.heading1"] = strToBC(pillarsHeading.heading1);
    if (typeof pillarsHeading?.heading2 === "string") patch["pillarsHeading.heading2"] = strToBC(pillarsHeading.heading2);

    if (Array.isArray(doc.pillars)) {
      const pillars = doc.pillars as Doc[];
      patch["pillars"] = pillars.map((p) => ({
        ...p,
        title: typeof p.title === "string" ? strToBC(p.title) : p.title,
        body:  typeof p.body  === "string" ? strToBC(p.body)  : p.body,
      }));
    }

    if (typeof areasHeading?.heading1 === "string") patch["areasHeading.heading1"] = strToBC(areasHeading.heading1);
    if (typeof areasHeading?.heading2 === "string") patch["areasHeading.heading2"] = strToBC(areasHeading.heading2);

    if (typeof apply?.heading1 === "string") patch["apply.heading1"] = strToBC(apply.heading1);
    if (typeof apply?.heading2 === "string") patch["apply.heading2"] = strToBC(apply.heading2);
    if (typeof apply?.body     === "string") patch["apply.body"]     = strToBC(apply.body);

    return patch;
  });

  // ── contactPage ───────────────────────────────────────────────────────────
  await migrateDoc("contactPage", (doc) => {
    const patch: Doc = {};
    const form = doc.form as Doc | undefined;

    if (typeof form?.heading1 === "string") patch["form.heading1"] = strToBC(form.heading1);
    if (typeof form?.heading2 === "string") patch["form.heading2"] = strToBC(form.heading2);
    if (typeof form?.consent  === "string") patch["form.consent"]  = strToBC(form.consent);

    return patch;
  });

  console.log("Migration complete.");
}

main().catch(console.error);
