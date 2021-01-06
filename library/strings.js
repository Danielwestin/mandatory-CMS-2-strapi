export function pluralize(str) {
  const lastCharacter = str.slice(-1);

  switch (lastCharacter) {
    case "e":
      return str.slice(-2, -1) === "f" ? str.slice(0, -2) + "ves" : str + "s";
    case "f":
      return str.slice(0, -1) + "ves";
    case "s":
      return str.slice(-2, -1) === "e" ? str : str + "es";
    case "y":
      return str.slice(0, -1) + "ies";
    case "x":
      return str + "es";
    default:
      return str + "s";
  }
}

export function titleize(str) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function desnakeify(str) {
  return str.replace("_", " ");
}
