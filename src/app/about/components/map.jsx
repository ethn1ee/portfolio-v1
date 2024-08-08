"use client";

import { useEffect, useState } from "react";
import MapSVG from "./mapSVG";
import { motion } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";

const Map = () => {
  const [atlanta, setAtlanta] = useState(null);
  const [seoul, setSeoul] = useState(null);

  useEffect(() => {
    setAtlanta(document.getElementById("Atlanta"));
    setSeoul(document.getElementById("Seoul"));
  }, []);

  return (
    <div className="flex-[2_2_0%] overflow-hidden">
      <MapSVG />
      <LocationCard
        title="Emory University"
        subtitle="Class of 2026"
        location={atlanta}
      />
      <LocationCard
        title="Seoul, KR"
        subtitle="OCT 2003"
        location={seoul}
      />
    </div>
  );
};

const LocationCard = ({ title, subtitle, location }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const updateLocation = () => {
    if (location) {
      const rect = location.getBoundingClientRect();
      setX(rect.x);
      setY(rect.y);

      location.style.fill = "none";
    }
  };

  useEffect(() => {
    updateLocation();
    window.addEventListener("resize", updateLocation);
    return () => window.removeEventListener("resize", updateLocation);
  }, [location]);

  return (
    location && (
      <div>
        {/* PIN */}
        <MapPinIcon
          style={{ top: y, left: x }}
          className="fixed -translate-x-1/2 -translate-y-full size-5 fill-base-white"
        />

        {/* CARD */}
        <motion.div
          style={{ top: y + 10, left: x + 10 }}
          whileHover={{ borderColor: "#9f9c9c" }}
          transition={{ duration: 0.5 }}
          className="fixed flex flex-col items-end gap-s p-m backdrop-blur-xl rounded-md border border-neutral-900 z-20 cursor-pointer"
        >
          <div className="flex gap-sm items-center">
            <AcademicCapIcon className="size-5" stroke="#9f9c9c" />
            <p className="mt-[1px]">{title}</p>
          </div>

          <small className="text-neutral-400">{subtitle.toUpperCase()}</small>
        </motion.div>
      </div>
    )
  );
};

export default Map;
