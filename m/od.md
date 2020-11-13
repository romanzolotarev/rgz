# Run a program as a daemon on OpenBSD

<pre>
# <b>user add -m /var/<em>server</em> -g <em>_server</em> -s /sbin/nologin <em>_server</em></b>
# <b>chown -R <em>_server</em>:daemon /var/<em>server</em></b>
# <b>echo '</b>
<i></i>#!/bin/ksh
<i></i>
<i></i>daemon="/usr/local/bin/node /var/<em>server</em>/app.js"
<i></i>daemon_user="<em>_server</em>"
<i></i>
<i></i>. /etc/rc.d/rc.subr
<i></i>rc_bg=YES
<i></i>rc_cmd $1
<i></i>' &gt; /etc/rc.d/<em>server</em></b>
# <b>chmod +x /etc/rc.d/<em>server</em></b>
# <b>chown root:daemon /etc/rc.d/<em>server</em></b>
# <b>rcctl start <em>server</em></b>
server(ok)
# <b>rcctl restart <em>server</em></b>
server(ok)
server(ok)
# <b>rcctl stop <em>server</em></b>
server(ok)
#
</pre>
