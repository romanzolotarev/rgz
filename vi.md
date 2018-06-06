# Switch from Vim to vi(1)

Before I [switched to OpenBSD](/setup.html), I had used [Vim](/vim.html)
as my default text editor and used [vi(1)](https://man.openbsd.org/vi.1)
only on servers. Recently I decided to switch to vi(1) fulltime.

On major BSD systems (OpenBSD, FreeBSD, and NetBSD) vi(1) is actually
[nvi](https://sites.google.com/a/bostic.com/keithbostic/vi) (new vi).
It was written by Keith Bostic and currently seems to be frozen at
version 1.79.

## Why did I switch back to nvi?

- nvi is lighter and faster than Vim,
- nvi is in OpenBSD base,
- almost all missing Vim features I care about can be replaced with
  POSIX commands and utilities,
- nvi forces me to learn OpenBSD and POSIX tools.

## What's missing?

For few Vim features I couldn't find any workarounds yet and really miss
them:

Insert-mode completion,
text objects,
viminfo (save command history, marks, registers between Vim sessions),
searching for words under cursor.

For some features I've managed to find workarounds.

For example, for rare cases when I need Unicode, I use
[nvi2](https://github.com/lichray/nvi2):

    # pkg_add nvi

Instead of syntax highlighting I use cleaner formatting and linters, but
I understand this can be a deal breaker for ~~hipsters~~ modern software
developers.

For many other features there are POSIX utilities and shell scripts:

Vim feature                  | nvi 1.79
:--                          | :--
sort                         | `/usr/bin/sort`
spell checking               | `/usr/bin/spell`
diff mode                    | `/usr/bin/diff`
text formatting (`gqap`)     | `/usr/bin/fmt`
extended search patterns     | `/usr/bin/sed -E`
vimgrep                      | `/usr/bin/grep`
plugins                      | `/bin/sh`
macros                       | `/bin/sh`
automatic commands           | `/bin/sh`
scripts and expressions      | `/bin/sh`

Finally, there are Vim features I didn't use, so I haven't check for
alternatives:

folding,
printing,
mouse support,
editing binary files,
netrw,
virtualedit.

## nvi tricks

Undo and redo: Press `u` to undo previous edit, then press `.` (dot)
to undo further, to redo press `u` again.

Increment a number: place cursor at the first digit and press `#`.

To redraw the screen press `^L`.

If you miss _Visual_ mode, try marks. They are useful. For example, mark
the line by pressing `mm`, then move to the line you need, then delete
from the current line to the marked one with `d'm`.

Break lines at column 72 in _Insert_ and _Append_ modes.

    :set wraplen=72

Format a paragraph with goal line length 72, allow indented paragraphs.

    :?^$?,//!fmt -pw 72

Sort lines in a paragraph (in _Command_ mode):

    !}sort

To remove trailing spaces:

    :%s/[[:space:]]\{1,\}/


To edit command-history:

    :set cedit=^[

To read help:

    :help

_Tested on OpenBSD 6.3_

## See also

[.exrc](/openbsd/exrc),
[`.profile`](/openbsd/profile),
[.tmux.conf](/openbsd/tmux.conf)