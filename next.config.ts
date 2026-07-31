import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
