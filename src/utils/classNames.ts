import isPlainObject from "./isPlainObject";

function classNames(...classes: any[]) {
  if (!classes || classes.length === 0) return undefined;
  const classesSet = classes.reduce<Set<string>>((prev, className) => {
    if (!className) return prev;
    if (typeof className === "string") return prev.add(className);
    if (Array.isArray(className)) {
      for (const cls of className) {
        if (cls) {
          if (typeof cls === "string") prev.add(cls);
          if (isPlainObject(cls)) {
            for (const key in cls) {
              if (cls[key]) prev.add(key);
            }
            return prev;
          }
        }
      }
      return prev;
    }
    if (isPlainObject(className)) {
      for (const key in className) {
        if (className[key]) prev.add(key);
      }
      return prev;
    }
    return prev;
  }, new Set());
  return classesSet.size > 0 ? Array.from(classesSet).join(" ") : undefined;
}

export default classNames;
