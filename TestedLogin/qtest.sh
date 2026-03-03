#!/bin/bash

if npm run lint -- --fix; then
  if npm run cpd; then
    npm test
  fi
fi

