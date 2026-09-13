# Conversation Mapping Integration and Lead Detail

## Goal
Make each reviewed Conversation Library decision operational: linked leads receive the reviewed rule’s stage, blocker, and next action, and operators can inspect the full evidence trail and safely start the recommended work.

## Build
1. **Mapping-to-state integration**
   - Resolve each observation’s normalized message against the reviewed Conversation Library mapping.
   - Apply the mapped active rule’s canonical event, stage, blocker, next action, owner, priority, deadline, and momentum effect when compiling new or edited evidence.
   - Store the selected rule and version on the compilation so every state remains explainable.
   - When an admin maps or remaps a variant, reconcile linked historical observations and refresh only the affected leads’ latest compiled state.

2. **Lead execution synchronization**
   - Synchronize the latest reviewed compilation into the lead’s current stage, mission, and blocker.
   - Create or refresh one open compiler-generated next action instead of producing duplicates.
   - Preserve original screenshot evidence and prior compilations/transitions as history.
   - Record mapping-driven state changes in the lead timeline.

3. **Lead detail page**
   - Add a dedicated Flow OS lead URL and link lead cards/workspaces to it.
   - Show customer identity, current compiled state, waiting-on party, blocker, next action, SLA, confidence, evidence quality, and momentum.
   - Show chronological chat observations with direction, labels, OCR confidence, screenshots, compiler decisions, and state transitions.
   - Include clear loading, empty, error, and mobile layouts.

4. **Do Now**
   - Claim the lead through the existing collision-safe claim flow.
   - Mark the compiled next action as in progress, refresh its deadline, update the current mission, and append a timeline event.
   - Prevent execution when another operator owns the active claim and show the reason without changing state.

5. **Verification**
   - Apply the database migration and regenerate database types.
   - Test new evidence, remapping/backfill, idempotent next actions, permission boundaries, and claim conflicts.
   - Exercise Conversation Library mapping and the lead detail page in the browser at desktop and mobile sizes.

## Technical details
- Use authenticated server functions for lead reads and state-changing actions; role validation remains server-side.
- Keep the existing deterministic compiler as fallback when no reviewed mapping exists.
- Use the existing `conversation_rules`, `conversation_pattern_clusters`, `conversation_compilations`, `conversation_states`, `conversation_transitions`, `next_actions`, `work_claims`, and `lead_timeline` records rather than creating a parallel workflow.
- “Do Now” starts work; it does not mark the recommended action complete or advance to a guessed outcome.
