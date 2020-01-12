_Tested on [OpenBSD](/openbsd/) 6.3_

# Configure login(1) and sshd(8) for YubiKey on OpenBSD

The [login_yubikey(8)](http://man.openbsd.com/login_yubikey.8)
utility is called by [login(1)](https://man.openbsd.org/login.1)
and others to authenticate the user with
[YubiKey](https://www.yubico.com/store/) authentication.

## Prepare YubiKey

Install and start [YubiKey Personalization
GUI](https://github.com/Yubico/yubikey-personalization-gui):

<pre>
# <b>pkg_add yubikey-personalization-gui</b>
...
yubikey-personalization-gui-3.1.25: ok
# <b>yubikey-personalization-gui</b>
</pre>

Insert your YubiKey into USB port, select _Yubico OTP > Quick_,
select **Configuration Slot 1** or **2**, click **Write
Configuration**, save the log into `/tmp/yubikey.csv`, click
**Exit**.

Extract _uid_ and _key_ from the log, verify `/var/db/yubikey/*`
files, and remove `yubikey.csv` file.

<pre>
# <b>cd /var/db/yubikey</b>
# <b>touch romanzolotarev.{uid,key}</b>
# <b>chown root:auth *</b>
# <b>chmod 440 *</b>
# <b>grep Yubico /tmp/yubikey.csv | cut -f5 -d, > romanzolotarev.uid</b>
# <b>grep Yubico /tmp/yubikey.csv | cut -f6 -d, > romanzolotarev.key</b>
# <b>cat *</b>
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxx
# <b>rm /tmp/yubikey.csv</b>
# <b>ls -l</b>
-r--r-----  1 root  auth  33 May  1 15:22 romanzolotarev.key
-r--r-----  1 root  auth  13 May  1 15:22 romanzolotarev.uid
#
</pre>

You can uninstall **yubikey-personalization-gui**

<pre>
# <b>pkg_delete yubikey-personalization-gui</b>
yubikey-personalization-gui-3.1.25: ok
Read shared items: ok
# <b>pkg_delete -a</b>
...
Read shared items: ok
#
</pre>

## Configure login(1) and sshd(8)

Back up [login.conf(5)](https://man.openbsd.org/login.conf.5) and
[sshd_config(5)](https://man.openbsd.org/sshd_config.5) to be able to
revert changes.

<pre>
# <b>cp /etc/login.conf /etc/login.conf.bak</b>
# <b>cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak</b>
#
</pre>

Change `auth-defaults` in `/etc/login.conf`:

    auth-defaults:auth=yubikey:

Add this line to `etc/ssh/sshd_config`:

    AuthenticationMethods publickey,password

Restart `sshd` and verify: when ssh asks for a password&mdash;instead
of entering your regular password&mdash;touch YubiKey, if you
have used slot&nbsp;1 (or touch and hold it for 2-3 seconds for
slot&nbsp;2)...

<pre>
# <b>rcctl restart sshd</b>
# <b>ssh root@localhost</b>
root@localhost's password:
Last login: Wed May  2 17:11:06 2018 OpenBSD 6.3
(GENERIC.MP) #1: Sat Apr 21 14:26:25 CEST 2018

Welcome to OpenBSD: The proactively secure Unix-like
operating system.

Please use the sendbug(1) utility to report bugs in the system.
Before reporting a bug, please try to reproduce it with the
latest version of the code. With bug reports, please try to
ensure that enough information to reproduce the problem is
enclosed, and if a known fix for it exists, include that as well.
# exit
</pre>
