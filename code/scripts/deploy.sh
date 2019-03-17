# !/bin/bash
ssh root@185.143.172.250 mkdir -p /root/computerization-landing/build;
rsync -av --delete build/ root@185.143.172.250:/root/computerization-landing/build;
