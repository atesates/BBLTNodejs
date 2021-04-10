#!/bin/bash
ulimit -n 64000
DURATION=300
TYPE="create"

date +"Timestamp before tests start, %s" > id.txt

for USER_COUNT in 1 #2 5 10 20 50 100 200 500 1000 
do
	echo "========================================"
	echo "====== Test for $USER_COUNT users ==========="
	if [ $USER_COUNT -gt 100 ]
	then
		HATCH_RATE=100
	elif [ $USER_COUNT -gt 20 ]
	then
		HATCH_RATE=20
	elif [ $USER_COUNT -gt 5 ]
	then
		HATCH_RATE=5
	else
		HATCH_RATE=1
	fi
	echo "====== hatch rate $HATCH_RATE ==============="
	echo "====== duration $DURATION secs $TYPE test ==="
	echo "========================================"

	date +"Timestamp before tests for $USER_COUNT users, %s" >> id.txt

	locust -f locustfile.py --headless --host http://127.0.0.1:4000 -u $USER_COUNT -r $HATCH_RATE -t${DURATION}s --csv=${USER_COUNT}_users_${TYPE}

	date +"Timestamp after tests for $USER_COUNT users, %s" >> id.txt

	sleep 10

done

date +"Timestamp after tests end, %s" >> id.txt
