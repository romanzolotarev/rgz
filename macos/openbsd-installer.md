<p class="small">tested on <a href="/macos/">macos</a> 11 and
<a href="/openbsd/">openbsd</a> 6.9</p>

# prepare bootable usb drive with openbsd installer on macos

download and verify the installer:

<pre>
$ <b>cd /tmp</b>
$ <b>export URL=https://cdn.openbsd.org/pub/OpenBSD</b>
$ <b>curl -Os $URL/6.9/amd64/SHA256</b>
$ <b>curl -Os $URL/6.9/amd64/install69.img</b>
$ <b>shasum -c SHA256 --ignore-missing</b>
install69.img: OK
</pre>

plug in an empty usb flash drive and find its identifier:

<pre>
$ <b>sudo diskutil list</b>
...
/dev/disk4 (external, physical):
   #:                    TYPE NAME   SIZE       IDENTIFIER
   0:  FDisk_partition_scheme        8.0 GB     disk4
...
                  (free space)       7.3 GB     -
$
</pre>

replace `/dev/diskX` with the identifier of the drive.<br>
**all data on `/dev/diskX` will be erased!**

<pre>
$ <b>sudo diskutil unmountDisk /dev/diskX</b>
Unmount of all volumes on disk4 was successful
$ <b>sudo dd if=install69.img of=/dev/diskX bs=1m</b>
<i>664+1 records in</i>
664+1 records out
696745984 bytes transferred in 168.646802 secs (4131392 bytes/sec)
$
</pre>

[install openbsd](/openbsd/install.html)
