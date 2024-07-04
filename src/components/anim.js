export default function anim(variants) {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
}

export const customEase = [0.65, 0.05, 0.36, 1];
