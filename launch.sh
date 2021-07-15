#!/bin/bash
root=`pwd`
sudo pip install -r requirements.txt
cd
if [ -e "/home/pi/autogrow/data/choice.txt" ];then
	echo "plant already choosed"
else
	python3 /home/pi/autogrow/back/plant_chooser.py
fi
#python3 /home/pi/autogrow/back/serial_test.py
cd /autogrow/front
electron .