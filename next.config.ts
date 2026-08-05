import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The old owner landing page. Superseded by /full-fee-patients — nobody
        // should reach it, including anyone holding an old link.
        source: "/biz",
        destination: "/full-fee-patients",
        // 301 explicitly: `permanent: true` emits 308, which Google treats the
        // same but which reads less predictably in older analytics and tooling.
        statusCode: 301,
      },
      {
        source: "/treatments/demo-skin-treatment-01",
        destination: "/treatments/acne-treatment",
        permanent: true,
      },
      {
        source: "/treatments/demo-skin-treatment-02",
        destination: "/treatments/pigmentation-treatment",
        permanent: true,
      },
      {
        source: "/treatments/demo-skin-treatment-03",
        destination: "/treatments/jaw-chin-contouring",
        permanent: true,
      },
      {
        source: "/treatments/demo-skin-treatment-04",
        destination: "/treatments/acne-treatment",
        permanent: true,
      },
      {
        source: "/treatments/demo-lip-treatment-01",
        destination: "/treatments/lip-filler",
        permanent: true,
      },
      {
        source: "/treatments/demo-lip-treatment-02",
        destination: "/treatments/lip-filler",
        permanent: true,
      },
      {
        source: "/treatments/demo-laser-treatment",
        destination: "/treatments/excessive-sweating",
        permanent: true,
      },
      {
        source: "/treatments/demo-treatment-package",
        destination: "/treatments/weight-loss-programme",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
