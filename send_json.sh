#!/usr/bin/env bash

curl -H "Content-Type: application/json" \
  -X POST \
  --data '{"email":"xyz@example.com","password":"xyz", "fb_id":"radoslaw.cymer", "tribute_body":"aaa"}' \
  http://localhost:8000/