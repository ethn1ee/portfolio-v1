"use client";

import { motion } from "framer-motion";
import StickyWrapper from "@/components/stickyWrapper";

const Tag = ({ item, highlight = false }) => {
  return (
    <StickyWrapper>
      <motion.div
        style={{
          backgroundColor: highlight ? "#FAFAFA" : "#0A0A0B",
          color: highlight ? "#0A0A0B" : "#FAFAFA",
        }}
        whileHover={{
          backgroundColor: "#0A0A0B",
          color: "#FAFAFA",
          borderColor: "#0A0A0B00",
        }}
        className="flex items-center justify-center py-s px-sm shrink-0 border border-neutral-900 rounded-md"
      >
        <p className="font-medium text-inherit">{item}</p>
      </motion.div>
    </StickyWrapper>
  );
};

export default Tag;
