_Tested on [OpenBSD](/openbsd/) 6.3 and 6.4_

# Install OpenBSD on a desktop

Prepare an USB drive with OpenBSD installer.<br>
For example, [on macOS](/macos/openbsd-installer.html).

Backup everything.

Check BIOS: _Secure Boot_ disabled, _UEFI Boot_ enabled.<br>
For example, [on ThinkPad X1C5](/openbsd/lenovo-thinkpad-x1c5.html).

Boot the installer.

Select **(S)hell** to create encrypt the drive.

<pre>
# <b>sysctl hw.disknames</b>
hw.disknames=sd0:xxxxxxxxxxx,rd0:xxxxxxxxxxx,sd1:xxxxxxxxxxx
</pre>

In this case _sd0_ is the target drive.<br>
_rd0_ is ramdisk for installer kernel.<br>
_sd1_ is USB drive with OpenBSD installer.

**Erase all data on _sd0_.** Create GUID Partition Table (GPT) and
a partition layout.

<pre>
# <b>dd if=/dev/urandom of=/dev/rsd0c bs=1m</b>
# <b>fdisk -iy -g -b 960 sd0</b>
# <b>disklabel -E sd0</b>
Label editor (enter '?' for help at any prompt)
<i><b>a a</b></i>
offset: [1024]
size: [500117105]
FS type: [4.2BSD] <b>RAID</b>
<i><b>w</b></i>
<i><b>q</b></i>
No label changes.
#
</pre>

Generate a strong passphrase.
Use [diceware](/diceware.html), for example.

<pre>
# <b>bioctl -c C -l sd0a softraid0</b>
New passphrase:
Re-type passphrase:
<strong>sd2 at scsibus2 targ 1 lun 0: &lt;OPENBSD, SR CRYPTO, 006&gt; SCSI2 0/direct fixed
sd2: 244190MB, 512 bytes/sector, 500102858 sectors</strong>
softraid0: CRYPTO volume attached as sd2
# <b>cd /dev && sh MAKEDEV sd2</b>
# <b>dd if=/dev/zero of=/dev/rsd2c bs=1m count=1</b>
1+0 records in
1+0 records out
1048576 bytes transferred in 0.003 secs (265557618 bytes/sec)
# <b>exit</b>
</pre>

Select `(I)nstall` and answer questions.

<pre>
System hostname? = <b>foo</b>
Which network interface do you wish to configure? = <b>em0</b>
DNS domain name? = <em>doman</em>
Password for root account? = <em>**************************</em>
Do you want the X Window System to be started by xenodm(1)? = <b>yes</b>
Setup a user? = <em>username</em>
Full name for user <u>username</u>? = <em>full name</em>
Password for user <u>username</u>? = <em>*******************</em>
What timezone are you in? = <b>UTC</b>
Which disk is the root disk? = <b>sd2</b>
Use (W)hole disk MBR, whole disk (G)PT or (E)dit? = <b>gpt</b>
Location of sets? = <b>disk</b>
Is the disk partition already mounted? = <b>no</b>
Which disk contains the install media? = <b>sd1</b>
Continue without verification? = <b>yes</b>
</pre>

Unplug USB drive with the installer and boot OpenBSD from the target
drive. Login as a regular user and run this command in [xterm(1)](https://man.openbsd.org/xterm.1)
to switch to _root_.

<pre>
$ <b>su -</b>
Password:
#
</pre>

run [syspatch(8)](https://man.openbsd.org/syspatch.8):

<pre>
# <b>syspatch</b>
...
Relinking to create unique kernel... done.
#
</pre>

Update [fstab(5)](https://man.openbsd.org/fstab.5) to add _noatime_:

<pre>
# <b>cp /etc/fstab /etc/fstab.bak</b>
# <b>sed -i 's/rw/rw,noatime/' /etc/fstab</b>
#
</pre>

Update [login.conf(5)](https://man.openbsd.org/login.conf.5) to
increase memory limits:

<pre>
# <b>cp /etc/login.conf /etc/login.conf.bak</b>
# sed -i 's/datasize-cur=768M/datasize-cur=4096M/' /etc/login.conf</b>
# sed -i 's/datasize-max=768M/datasize-max=4096M/' /etc/login.conf</b>
#
</pre>

Enable [apmd(8)](https://man.openbsd.org/apmd.8):

<pre>
# <b>rcctl enable apmd</b>
# <b>rcctl set apmd flags -A -z 7</b>
# <b>rcctl start apmd</b>
ampd (ok)
#
</pre>

Add your _username_ `/etc/doas.conf`:

<pre>
# <b>echo 'permit <em>username</em>' > /etc/doas.conf</b>
#
</pre>

Reboot and login as a regular user.
