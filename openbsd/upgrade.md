_Tested on [OpenBSD](/openbsd/) 6.3 and 6.4_

# Upgrade OpenBSD on bare metal

If you have [OpenBSD installed](install.html) and want to upgrate
it, then backup your data first.

## Prepare

Download and verify `install64.fs`:

<pre>
# <b>ftp -V https://cdn.openbsd.org/pub/OpenBSD/6.4/amd64/install64.fs</b>
install64.fs 100% |*******************************|  360 MB     00:34
# <b>ftp -V https://cdn.openbsd.org/pub/OpenBSD/6.4/amd64/SHA256.sig</b>
SHA256.sig   100% |*******************************|  2141       00:00
# <b>signify -C -p /etc/signify/openbsd-64-base.pub -x SHA256.sig install64.fs</b>
Signature Verified
install64.fs: OK
#
</pre>

[Read the official FAQ](https://www.openbsd.org/faq/upgrade64.html).

Update your configuration files, if needed for 6.4.

## Create bootable USB drive

Plug in a USB drive:

<pre>
# <b>dmesg | grep removable | tail -n1</b>
sd3 at scsibus5 targ 1 lun 0: ... removable serial.12345...
#
</pre>

In this case it appears as _sd3_.
Copy the installer image to the USB flash drive
(**be extremely cautious**):

<pre>
# <b>dd if=install64.fs of=/dev/rsd3c bs=1m</b>
...

</pre>

## Upgrade

Boot from that USB drive, then choose the `(S)hell` option to mount
the encrypted drive.

<pre>
# <b>bioctl -c C -l /dev/sd0a softraid0</b>
passphrase:
<strong>scsibus1 at softraid0: 1 targets
sd3 at scsibus2 targ 0 lun 0: &lt;OPENBSD, SR RAID 1, 005&gt; SCSI2 0/direct fixed</strong>
sd3: 10244MB, 512 bytes/sec, 20980362 sec total
# <b>exit</b>
</pre>

Choose `(U)pgrade` and answer the questions.

<pre>
Which disk is the root disk = <b>sd3</b>
Location of sets = <b>disk</b>
</pre>

## Update packages

Login and update the installed packages:

<pre>
# <b>pkg_add -uv</b>
...
#
</pre>
