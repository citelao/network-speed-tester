# Install

- Install Raspbian with Etcher.io
- touch ssh on boot vol
- plugin; connect to network; find IP via `arp -i en0 -a` or `arp -i bridge100 -a` if using bridge
- update hostname (`/etc/hosts`)
- update hostname file (`/etc/hostname`)
- `sudo reboot`
- `sudo apt-get update && sudo apt-get upgrade`
- Install Node (`sudo apt-get install nodejs npm`; you may need to add the nodesource builds: `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`)
- Install Avahi (bonjour: `sudo apt-get install avahi-daemon`)
- Forward port 80 to 3000: `sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
` (via https://stackoverflow.com/questions/16573668/best-practices-when-running-node-js-with-port-80-ubuntu-linode and https://coderwall.com/p/plejka/forward-port-80-to-port-3000). You may want to add this without the sudo to `/etc/rc.local` to happen on boot.
- `npm start`

# Set up wifi

https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

1. Find networks: `sudo iwlist wlan0 scan | grep ESSID`
2. Generate PSK: `wpa_passphrase "ssid" "pass"`
3. Add wifi info: `sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`:
    ```
    network={
	    ssid="testing"
	    psk=thepsk
	}
	```
4. Reconfigure interface: `wpa_cli -i wlan0 reconfigure`
5. Successful iff `ifconfig wlan0` has an IP.

# Auto-start

I use a custom `rc.local` (see `rc.local.deployme`).
