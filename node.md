# Node.js

## Install

Node package manger [puts various
things](https://docs.npmjs.com/files/folders) on your computer. On
OpenBSD it stores everything under `/usr/local` and that directory is
owned by `root`. If you install modules globally (for example,
`prettier` or `eslint`) I suggest you set npm prefix to `~/.node` and
add update `PATH` accordingly.

<pre>
# <b>pkg_add node</b>
quirks-3.16 signed on 2018-10-12T15:26:25Z
node-8.12.0:flock-20110525p1: ok
node-8.12.0:gmake-4.2.1: ok
node-8.12.0: ok
...
#
</pre>

<pre>
$ <b>npm set prefix "$HOME/.node"</b>
$ <b>npm install --global prettier</b>
$ <b>echo '</b>
<i>export PATH="$HOME/.node/bin:$PATH"</i>
<i><b>' >> "$HOME/.profile"</b></i>
$
</pre>

[Create an HTTP server with Express](express.html)

```
unit testing
diagnostics (basics, debugging, performance)
http(s)/tcp
events
child processes (basics, no ipc/fork)
buffer and streams
error handling
file system
control flow (async tasks, callbacks)
cli (-e, -r, etc)
package.json
javascript prerequisites (closures, prototypes, var/let/const)
security
module system (scope)
process/operating system (no ipc)
```
