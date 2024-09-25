"use client";

import { useContext, useEffect, useState } from "react";
import MapSVG from "./mapSVG";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  CakeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { nohemi } from "@/components/nohemi";
import { experiences } from "@/data/experiences";
import { CurrentExperienceContext } from "../utils/currentExperienceContext";
import { customEase } from "@/utils/anim";

const Map = () => {
  const calculateYearsAndMonths = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let result = "";
    if (years > 0) {
      result += `${years} yrs `;
    }
    result += `${months} months`;

    return result;
  };

  const formattedExperiences = experiences.map((experience, index) => ({
    title: experience.title,
    subtitle: `${experience.start} - ${
      experience.end
    } (${calculateYearsAndMonths(experience.start, experience.end)})`,
    type: "work",
    location: experience.location,
    id: index,
  }));

  const cards = {
    atlanta: [
      {
        id: -1,
        title: "Emory University",
        subtitle: "AUG 2023 - MAY 2026",
        type: "school",
      },
      ...formattedExperiences.filter((experience) =>
        experience.location.includes("Atlanta")
      ),
    ],
    seoul: [
      {
        id: -1,
        title: "OCT 2003",
        subtitle: calculateYearsAndMonths("2003-10-21"),
        type: "birth",
      },
    ],
  };

  return (
    <div className="flex-[0_0_60%] overflow-hidden">
      <MapSVG />
      {Object.entries(cards).map(([key, value]) => (
        <CardStack key={key} city={key} items={value} />
      ))}
    </div>
  );
};

const CardStack = ({ city, items }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    setLocation(document.getElementById(city));
  }, []);

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
        <div
          style={{ top: y - 20, left: x - 10 }}
          className="fixed flex gap-sm items-center"
        >
          <MapPinIcon className="size-5 fill-neutral-400" />
          <small className="text-neutral-400 font-semibold">
            {city.toUpperCase().replace("-", " ")}
          </small>
        </div>

        {/* CARDS */}
        <motion.div
          style={{ top: y + 10, left: x + 15 }}
          className="fixed flex flex-col gap-s z-20"
        >
          {items.map((item, index) => (
            <LocationCard key={index} {...item} />
          ))}
        </motion.div>
      </div>
    )
  );
};

const LocationCard = ({ title, subtitle, type, id }) => {
  const { currentExperience, setCurrentExperience } = useContext(
    CurrentExperienceContext
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(currentExperience === id);
  }, [currentExperience]);

  const icons = {
    school: <AcademicCapIcon className="size-5" stroke="#9f9c9c" />,
    birth: <CakeIcon className="size-5" stroke="#9f9c9c" />,
    work: <BriefcaseIcon className="size-5" stroke="#9f9c9c" />,
  };

  return (
    <div>
      <motion.div
        whileHover={{ borderColor: "#9f9c9c" }}
        transition={{ duration: 0.5 }}
        onClick={() => setCurrentExperience(id)}
        className="flex flex-col p-m backdrop-blur-2xl rounded-md border border-neutral-700 cursor-pointer overflow-hidden"
      >
        <div className="flex gap-sm items-center">
          {icons[type]}
          <motion.p
            animate={{ color: isActive ? "#FAFAFA" : "#9F9C9C" }}
            className={nohemi.className + " h-fit mt-1"}
          >
            {title}
          </motion.p>
        </div>

        <motion.div
          animate={{
            height: isActive ? 24 : 0,
            opacity: isActive ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: customEase }}
          className={nohemi.className + " ml-[30px]"}
        >
          <small className="text-neutral-400 h-fit mt-2 block text-nowrap">
            {subtitle}
          </small>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Map;
