# Worked Contrast — Stale Test vs Current Truth

Load this example when an existing regression test conflicts with newly approved behavior and pressure exists to preserve both through fallback logic.

## Situation

Current approved behavior changes `A -> B` into `A -> C`. An older regression test still asserts `B`. Making both green would require a production branch that returns `B` only for the old fixture.

## Weak transfer

```text
old test fails
-> old behavior must still be supported
-> add compatibility/fallback branch
```

The test is treated as permanent product authority.

## Strong transfer

1. Bind the current requirement/contract revision that authorizes `C`.
2. State the semantic claim the historical test actually protects.
3. Classify it:
   - `PRESERVE` if that invariant remains valid;
   - `UPDATE` if the invariant remains but expected data/oracle changed;
   - `REPLACE` if the old probe exercises the wrong mechanism;
   - `DELETE` if it encodes superseded behavior or redundant/weaker proof;
   - `UNRESOLVED` if authority is genuinely unclear.
4. Never add production legacy solely to preserve stale green.
5. Add/revise current proof for `C` and challenge fixture-shaped implementation with another valid instance.
