# Conversation Library and OCR Seed

## Goal
Turn the uploaded 107-screenshot, 931-row OCR corpus into a usable Conversation Library where admins can review canonical families, inspect real variants, and make the final family assignment.

## Build
1. **Corpus seed**
   - Parse the uploaded workbook into deterministic, repeatable seed SQL.
   - Store all usable message variants with occurrence counts, representative text, OCR confidence, labels, source screenshot references, and suggested family.
   - Preserve low-confidence and context-only text for review instead of forcing a classification.
   - Make the seed idempotent so reruns do not duplicate variants.

2. **Admin mapping model**
   - Extend the conversation pattern library with an explicit admin-assigned family, review state, reviewer, and review timestamp.
   - Keep machine suggestions separate from admin decisions.
   - Add a secure database function that validates the signed-in admin/control-tower role before saving a mapping.

3. **Conversation Library page**
   - Add an admin page linked from the Founder Admin navigation.
   - Show corpus totals, mapped/unmapped counts, and family coverage.
   - Provide searchable family navigation and a dense variant list with frequency, confidence, labels, source evidence, and current mapping.
   - Let an authorized admin assign or change a family from each variant row; clearly distinguish suggested and confirmed mappings.
   - Include useful empty, loading, error, and mobile states.

4. **Compiler alignment**
   - Centralize the canonical family list so the compiler, seed suggestions, and admin selector use the same vocabulary.
   - Keep existing deterministic rules active; admin mappings enrich the review library without silently rewriting historical interpretations.

5. **Verification**
   - Apply the database migration and seed, then verify row totals and family distributions.
   - Test permission boundaries and mapping persistence.
   - Run focused compiler tests for dominant phrases, modifiers, short replies, drafts, and unknown patterns.
   - Exercise the page in the browser at desktop and mobile widths, including search, filtering, and assignment.

## Technical details
- Reuse `conversation_rules` as the source of canonical families and `conversation_pattern_clusters` as the variant library.
- Add only the mapping/evidence fields required for this page; no destructive schema changes.
- The uploaded workbook remains source evidence; generated SQL contains normalized text and metadata, not the binary workbook.
- Database access continues through existing authenticated browser access and role-protected database functions.
