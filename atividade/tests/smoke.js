import { check, sleep } from "k6"
import http from "k6/http"

export const options = {
  vus: 1,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate==0"],
    checks: ["rate==1"],
  },
}

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
  // Make a GET request to the target URL
  const res = http.get("http://localhost:3000/health")
  check(res, { "status 200": (r) => r.status === 200 })

  // Sleep for 1 second to simulate real-world usage
  sleep(1)
}
