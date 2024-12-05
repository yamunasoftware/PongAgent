#!/bin/bash

trap 'echo "Duration: $SECONDS seconds"; exit 1' SIGINT
echo "Started."
cd src

npm install --quiet
npx tsc -p ./main
node ./main/test.js
TEST_EXIT_CODE=$?

if [ $TEST_EXIT_CODE -ne 0 ]; then
  exit $TEST_EXIT_CODE
fi

npm start
echo "Duration: $SECONDS seconds"