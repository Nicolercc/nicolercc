# Terminal demo for jt, recorded with vhs (https://github.com/charmbracelet/vhs).
# Uses a throwaway database seeded with fictional companies (seed.sh).
# Run from this folder:  JT_REPO=~/Developer/jt vhs jt.tape

Output ../out/jt.gif
Output ../out/jt.mp4

Set Shell "bash"
Set FontSize 20
Set Width 1580
Set Height 500
Set Padding 28
Set Theme "Catppuccin Mocha"
Set WindowBar Colorful
Set BorderRadius 10
Set Margin 18
Set MarginFill "#11111b"
Set TypingSpeed 40ms
Set CursorBlink false

Hide
Type 'export JT_REPO="${JT_REPO:-$HOME/Developer/jt}" JT_DB="$(mktemp -d)/jobs.db" JT_NOTIFY=0 PS1="\[\e[38;5;147m\]$ \[\e[0m\]"'
Enter
Type 'jt() { python3 "$JT_REPO/jt.py" "$@"; }; bash seed.sh && clear'
Enter
Sleep 2s
Show

Type "# Who needs a follow-up today?"
Enter
Sleep 300ms
Type "jt stale"
Sleep 400ms
Enter
Sleep 4s

Ctrl+L
Type "# The model reads an Initech email as an onsite invite, 97% confident..."
Enter
Sleep 300ms
Type "jt review"
Sleep 400ms
Enter
Sleep 4s

Type "# ...but that application is already rejected. So it waits for me."
Enter
Sleep 1.5s

Ctrl+L
Type "# The same legality check applies to me, too:"
Enter
Sleep 300ms
Type "jt log 3 screen"
Sleep 400ms
Enter
Sleep 3.5s
Type "# The LLM proposes. Only legal events get committed."
Enter
Sleep 3s
