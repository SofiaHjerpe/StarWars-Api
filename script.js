import { hideLoader, showLoader } from "./utilities.js";
export async function fetchCharacters(url) {
  showLoader();
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch {
    (error) => console.error("Error:", error);
  } finally {
    hideLoader();
  }
}
