<p class="small"><b>disclaimer:</b> i'm a customer of vultr and when you
use this <a href="/vultr.html">referral link</a>. vultr adds few weeks
of hosting for this site. thank you.</p>
<p class="small">tested on <a href="/openbsd/">openbsd</a> 6.3 and 6.4</p>

# Install OpenBSD on Vultr

If you need a new OpenBSD server, make sure you have your [public
SSH key](/ssh.html) handy, then...

<a class="button" href="/vultr.html">register at Vultr</a>

Deploy an instance, for example:

1. Server Location: _pick your prefered location_
1. Server Type: 64 bit OS, **OpenBSD 6.3 x64**
1. Server Size:
   - _For IPv6 only_: **$2.50/mo** 20 GB SSD 512MB Memory
   - _IPv4 and IPv6_: **$3.50/mo** 20 GB SSD 512MB Memory
1. Additional Features: **None**
1. Start Script: **None**
1. SSH Keys: **Add new key**
1. Firewall Group: **No firewall**
1. Server Hostname & Label: **www**

In a minute your sever will be deployed. Login using the new IP address
and your private SSH key (assuming it's in the default location:
`~/.ssh/id_ed25519`):

	$ ssh root@XXX.XXX.XXX.XXX
	OpenBSD 6.3 (GENERIC) #349: Thu Oct 11 13:25:13 MDT 2018

	Welcome to OpenBSD: The proactively secure Unix-like operating system.

	Please use the sendbug(1) utility to report bugs in the system.
	Before reporting a bug, please try to reproduce it with the latest
	version of the code. With bug reports, please try to ensure that
	enough information to reproduce the problem is enclosed, and if a
	known fix for it exists, include that as well.

	www#

Read [afterboot(8)](https://man.openbsd.org/afterboot.8).

[Setup a web server](/openbsd/webserver.html).
