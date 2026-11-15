#!/usr/bin/env bash
# Seeds a throwaway jt database with fictional companies for the profile GIF.
# Usage: JT_DB=/tmp/x.db JT_REPO=~/Developer/jt bash seed.sh
set -euo pipefail
jt() { python3 "$JT_REPO/jt.py" "$@"; }
rm -f "$JT_DB"
jt add "Northwind Labs" "Product Engineer" --lane swe --on 2026-10-26 --contact talent@northwind.example >/dev/null
jt add "Globex" "Backend Engineer" --lane swe --on 2026-10-20 >/dev/null
jt add "Initech" "Frontend Engineer" --lane swe --on 2026-10-15 >/dev/null
jt add "Umbrella Health" "Full Stack Engineer" --lane swe --on 2026-10-29 >/dev/null
jt add "Globex" "Platform Engineer" --lane swe --on 2026-10-21 >/dev/null
jt log 1 confirmed --on 2026-10-27 >/dev/null
jt log 2 confirmed --on 2026-10-21 >/dev/null
jt log 2 screen --on 2026-10-30 --note "30 min w/ recruiter" >/dev/null
jt log 3 rejected --on 2026-10-28 >/dev/null
# A synthetic email the model reads confidently and wrongly: an onsite for a rejected application.
(cd "$JT_REPO" && python3 - <<'PY'
import json, classify, jt
with jt.connect() as conn:
    conn.execute("""INSERT INTO raw_messages (gmail_msg_id, received_on, subject, body)
                    VALUES ('demo-email', '2026-11-12', 'Initech: onsite schedule', 'Sharing the onsite agenda for next Tuesday.')""")
    conn.commit()
    msgs = classify.load_unprocessed(conn, 1)
    proposal = {"gmail_msg_id": "demo-email", "company": "Initech", "role_hint": "Frontend Engineer", "kind": "onsite",
                "occurred_on": "2026-11-12", "confidence": 0.97, "evidence": "onsite agenda for next Tuesday"}
    classify.apply_verdicts(conn, classify.verdicts_for(conn, msgs, json.dumps([proposal])))
PY
)
