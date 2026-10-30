import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { supportRepository } from "../src/features/supportflow/data/repository";
import { afterEach, beforeEach } from "vitest";

beforeEach(() => {
  window.history.replaceState(null, "", "/");
  window.localStorage.clear();
  supportRepository.refresh();
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
