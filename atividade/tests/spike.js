import { check, sleep } from "k6"
import http from "k6/http"

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "10s", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "1s", target: 10 },
  ],
}

export default function () {
  const res = http.post(
    "http://localhost:3000/checkout/simple",
    JSON.stringify({ amount: 100, currency: "BRL" }),
    { headers: { "Content-Type": "application/json" } }
  )
  check(res, { "status 201": (r) => r.status === 201 })
  sleep(1)
}