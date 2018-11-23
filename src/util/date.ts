import _ from "lodash";

/**
 * Return current datetime in RFC3339 format.
 * @return {!String}
 */
export function rfc3339() {
  const date = new Date();
  const [H, M, s] = [_.padStart(date.getHours().toString(), 2, "0"), _.padStart(date.getMinutes().toString(), 2, "0"), _.padStart(date.getSeconds().toString(), 2, "0")];
  const [d, m, y] = [_.padStart(date.getDay().toString(), 2, "0"), _.padStart(date.getMonth().toString(), 2, "0"), date.getFullYear().toString()];
  return `${y}-${m}-${d}T${H}:${M}:${s}`;
}