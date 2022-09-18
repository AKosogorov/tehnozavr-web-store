import { GETRequest } from "@/http";

const URL_COLORS = "colors";

function GETColorsList() {
  return GETRequest(URL_COLORS);
}

export { GETColorsList };
