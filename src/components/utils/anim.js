import { cubicBezier } from "framer-motion";

export default function anim(variants) {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
}

export const customEase = cubicBezier(0.18, 0.43, 0.55, 0.99);
