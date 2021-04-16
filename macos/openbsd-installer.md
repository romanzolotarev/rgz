<p class="small">tested on <a href="/macos/">macos</a> 11 and
<a href="/openbsd/">openbsd</a> 6.8</p>

# prepare bootable usb drive with openbsd installer on macos

download the installer and verify its checksum:

<pre>
$ <b>cd /tmp</b>
$ <b>export URL=https://cloudflare.cdn.openbsd.org/pub/OpenBSD</b>
$ <b>curl -Os $URL/6.8/amd64/SHA256</b>
$ <b>curl -O  $URL/6.8/amd64/install68.img</b>
...
$ <b>grep install68.img SHA256|cut -f4 -d' '</b>
14ea602583030b33e91ee8fde8dd76113984e9fac6598f9f609f408137c4cff2
$ <b>shasum -a 256 install68.img|cut -f1 -d' '</b>
14ea602583030b33e91ee8fde8dd76113984e9fac6598f9f609f408137c4cff2
$
</pre>

plug in an empty usb drive. its size should be at least 400 mb.
find an identifier of the flash drive:

<pre>
$ <b>sudo diskutil list</b>
...
/dev/disk4 (external, physical):
   #:                    TYPE NAME   SIZE       IDENTIFIER
   0:  FDisk_partition_scheme        8.0 GB     disk4
   1:                    0xEF ⁨⁩       491.5 KB   disk4s1
   2:                 OpenBSD ⁨⁩       695.7 MB   disk4s4
                  (free space)       7.3 GB     -
$
</pre>

replace `/dev/diskX` with the identifier of the flash drive.<br>
**all data on `/dev/diskX` will be erased!**

<pre>
$ <b>sudo diskutil unmountDisk /dev/diskX</b>
Unmount of all volumes on disk4 was successful
$ <b>sudo dd if=install68.img of=/dev/diskX bs=1m</b>
<i>664+1 records in</i>
664+1 records out
696745984 bytes transferred in 172.728421 secs (4033766 bytes/sec)
$
</pre>

[install openbsd](/openbsd/install.html)
