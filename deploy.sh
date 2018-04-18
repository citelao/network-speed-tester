# update security?
sudo apt update
sudo apt full-upgrade -y

# install Node
echo "install node"
# https://github.com/audstanley/NodeJs-Raspberry-Pi/
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

npm install
