import http from "k6/http";
import { check } from "k6";

export const options = {
    stages: [
        { duration: "1m", target: 50 }, // Sobe até 50 usuários
        { duration: "2m", target: 50 }, // Mantém 50 usuários
        { duration: "30s", target: 0 }, // Reduz a carga
    ],
    thresholds: {
        http_req_duration: ["p(95)<500"], // p95 < 500ms
        http_req_failed: ["rate<0.01"],   // erros < 1%
    },
};

export default function () {
    const res = http.post("http://localhost:3000/checkout/simple");
    check(res, {
        "status 201": (r) => r.status === 201,
    });
}
