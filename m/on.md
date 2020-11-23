_Tested with Intel network adapters on [OpenBSD](/openbsd/) 6.4_

# Connect to Wi-Fi and Ethernet networks from OpenBSD


Configure your local network (enable Wi-Fi access point in WPA2
mode, DHCP server, and router).

[Install OpenBSD](/openbsd/install.html) on your computer.

## Connect to Ethernet network

It should works out of the box.

OpenBSD has [em(4)] driver for Intel Ethernet network adapter and
as in case with [many other network
drivers](https://man.openbsd.org/?query=ethernet&apropos=1&sec=4)
_em0_ network interface should be configured by OpenBSD installer.
You can change the configuration anytime.

<pre>
<i></i><b>echo 'dhcp
up' &gt; /etc/hostname.em0</b>
#
# <b>chown root:wheel /etc/hostname.em0</b>
# <b>chmod 0640 /etc/hostname.em0</b>
#
# <b>sh /etc/netstart</b>
em0: no link... got link
em0: bound to 192.168.1.2 from 192.168.1.1 (yy:yy:yy:yy:yy:yy)
#
</pre>


## Connect to Wi-Fi network

OpenBSD has [iwm(4)] driver for Intel Wireless network adapter, but
it requires firmware files as [most of wireless
drivers](https://man.openbsd.org/?query=wireless&apropos=1).

OpenBSD runs [fw_update(1)] to install a prepackaged version of the
firmware on the first boot, but you can run `fw_update` anytime,
make sure your Ethernet network is up.

<pre>
# <b>fw_update</b>
iwm-firmware-0.20170105: ok
#
</pre>

Write your network configuration (incl. password) to [hostname.if(5)]
and run [netstart(8)] to start up network.

<pre>
# <b>echo</b> 'join <em>Home</em> wpakey <em>p@ssw0rd</em>
<i>dhcp</i>
<i>up</i>' <b>&gt; /etc/hostname.iwm0</b>
#
# <b>chown root:wheel /etc/hostname.iwm0</b>
# <b>chmod 0640 /etc/hostname.iwm0</b>
#
# <b>sh /etc/netstart</b>
iwm0: no link... got link
iwm0: bound to 192.168.1.2 from 192.168.1.1 (yy:yy:yy:yy:yy:yy)
#
</pre>


## Connect to another Wi-Fi network

Scan to find Wi-Fi networks near you with [ifconfig(8)]. Update
your network configuration and start up network.

<!-- cut -->
<pre>
#
# <b>ifconfig iwm0 up</b>
# <b>ifconfig iwm0 scan</b>
iwm0: flags=8843 mtu 1500
        lladdr xx:xx:xx:xx:xx:xx
        ...
        status: no network
        ieee80211: nwid ""
                nwid <em>Work</em> chan 2 bssid yy:yy:yy:yy:yy:yy 85% HT-MCS23 privacy,short_preamble,short_slottime,radio_measurement,wpa2
#
# <b>echo</b> 'join <em>Home</em> wpakey <em>p@ssw0rd</em>
<i>join <em>Work</em> wpakey <em>@n0th3r0n3</em></i>
<i>dhcp</i>
<i>up</i>' <b>&gt; /etc/hostname.iwm0</b>
#
# <b>sh /etc/netstart</b>
iwm0: no link... got link
iwm0: bound to 10.0.1.2 from 10.0.1.1 (zz:zz:zz:zz:zz:zz)
#
</pre>

## Roam between wired and wireless

For computers with two or more Ethernet and Wi-Fi network adapters
you can configure [trunk(4)] pseudo-device to create a link failover
interface.

With this configuration when Ethernet is connected OpenBSD uses
_em0_ interface, otherwise it tries to connect to one of Wi-Fi
networks via _iwm0_.

<pre>
# <b>echo</b> 'up' <b>&gt; /etc/hostname.em0</b>
#
# <b>echo</b> 'join <em>Home</em> wpakey <em>p@ssw0rd</em>
<i>join <em>Work</em> wpakey <em>@n0th3r0n3</em></i>
<i>up</i>' <b>&gt; /etc/hostname.iwm0</b>
#
# <b>echo</b> 'trunkproto failover trunkport <em>em0</em> trunkport <em>iwm0</em>
<i>dhcp</i>
<i>up</i>' <b>&gt; /etc/hostname.trunk0</b>
#
# <b>chown root:wheel /etc/hostname.*</b>
# <b>chmod 0640 /etc/hostname.*</b>
#
# <b>sh /etc/netstart</b>
trunk0: no link... got link
trunk0: bound to <em>192.168.1.2</em> from <em>192.168.1.1</em> (yy:yy:yy:yy:yy:yy)
#
</pre>

## Troubleshooting

Shout down all network interfaces: _em0_, _iwm0_, and remove _trunk0_.
Reset the routing tables.

<pre>
# <b>ifconfig em0 down</b>
# <b>ifconfig iwm0 down</b>
# <b>ifconfig trunk0 destroy</b>
# <b>route -n flush</b>
#
</pre>

Check your `/etc/hostname.*` files as described in [the previous
section](#Roam%20between%20wired%20and%20wireless).

Then start up the network, check the statuses of all the network
interfaces with [ifconfig(8)], check address resolution protocol
(ARP) entries with [arp(8)], check the routing tables with [route(8)],
and [ping(8)] your default gateway.

<pre>
# <b>sh /etc/netstart</b>
trunk0: no link.... got link
trunk0: bound to <em title="local address">192.168.1.2</em> from <em title="DHCP server">192.168.1.1</em> (yy:yy:yy:yy:yy:yy)
#
#
# <b>ifconfig</b>
...
em0: flags=8b43<UP,BROADCAST,RUNNING,PROMISC,ALLMULTI,SIMPLEX,MULTICAST> mtu 1500
        lladdr xx:xx:xx:xx:xx:xx
        index 2 priority 0 llprio 3
        trunk: trunkdev trunk0
        media: Ethernet autoselect (1000baseT full-duplex,rxpause,txpause)
        status: <em>active</em>
iwm0: flags=8943<UP,BROADCAST,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500
        lladdr xx:xx:xx:xx:xx:xx
        index 1 priority 4 llprio 3
        trunk: trunkdev trunk0
        groups: wlan
        media: IEEE802.11 autoselect (HT-MCS0 mode 11n)
        status: <em>active</em>
        ieee80211: join <em>Home</em> chan 40 bssid zz:zz:zz:zz:zz:zz 67% wpakey wpaprotos wpa2 wpaakms psk wpaciphers ccmp wpagroupcipher ccmp
trunk0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
        lladdr xx:xx:xx:xx:xx:xx
        index 33 priority 0 llprio 3
        trunk: trunkproto failover
                trunkport <em>iwm0</em>
                trunkport <em>em0</em> master,active
        groups: trunk egress
        media: Ethernet autoselect
        status: <em>active</em>
        inet <em>192.168.1.2</em> netmask 0xffff0000 broadcast 192.168.255.255
#
#
# <b>arp -a</b>
Host                  Ethernet Address    Netif Expire    Flags
192.168.1.1           yy:yy:yy:yy:yy:yy  trunk0 19m59s
<em>192.168.1.2</em>           xx:xx:xx:xx:xx:xx  trunk0 permanent l
#
#
# <b>route -n show -inet</b>
Routing tables

Internet:
Destination        Gateway            Flags   Refs      Use   Mtu  Prio Iface
default            <em title="default gateway">192.168.1.1</em>        UGS        4        8     -     8 trunk0
...
192.168/16         192.168.1.2        UCn        1   104371     -     4 trunk0
192.168.1.1        yy:yy:yy:yy:yy:yy  UHLch      1   103533     -     3 trunk0
192.168.1.2        xx:xx:xx:xx:xx:xx  UHLl       0      113     -     1 trunk0
192.168.255.255    192.168.1.2        UHb        0       30     -     1 trunk0
#
#
# <b>ping -c 2 -I <em title="local address">192.168.1.2</em> <em title="gateway">192.168.1.1</em></b>
PING 192.168.1.1 (192.168.1.1): 56 data bytes
64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.443 ms
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.398 ms

--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/std-dev = 0.398/0.421/0.443/0.023 ms
#
</pre>

[arp(8)]: https://man.openbsd.org/arp.8
[em(4)]: https://man.openbsd.org/em.4
[fw_update(1)]: https://man.openbsd.org/fw_update.1
[hostname.if(5)]: https://man.openbsd.org/hostname.5
[ifconfig(8)]: https://man.openbsd.org/ifconfig.8
[iwm(4)]: https://man.openbsd.org/iwm.4
[netstart(8)]: https://man.openbsd.org/netstart.8
[ping(8)]: https://man.openbsd.org/ping.8
[route(8)]: https://man.openbsd.org/route.8
[trunk(4)]: https://man.openbsd.org/trunk.4
