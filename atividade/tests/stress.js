import { check } from "k6"
import http from "k6/http"

export const options = {
  stages: [
    { duration: "2m", target: 200 },
    { duration: "2m", target: 500 },
    { duration: "2m", target: 1000 },
  ],
  discardResponseBodies: true,
}

export default function () {
  const res = http.post(
    "http://localhost:3000/checkout/crypto",
    JSON.stringify({ userId: 1 }),
    { headers: { "Content-Type": "application/json" } }
  )
  check(res, { "status 201": (r) => r.status === 201 })
}