import { seedData } from "../domain/seed";
import { supportDataSchema } from "../domain/schemas";
import type { SupportData } from "../domain/types";

const storageKey = "supportflow-demo-data-v1";
const dataChangedEvent = "supportflow:datachange";

export type RepositorySnapshot = {
  data: SupportData;
  error: string;
};

const serverSnapshot: RepositorySnapshot = { data: seedData, error: "" };
let browserSnapshot: RepositorySnapshot | null = null;

export class DemoStorageError extends Error {
  constructor(message = "Your browser could not access local demo storage. Your changes were not saved.") {
    super(message);
    this.name = "DemoStorageError";
  }
}

export const supportRepository = {
  getSnapshot(): RepositorySnapshot {
    if (typeof window === "undefined") return serverSnapshot;
    if (browserSnapshot) return browserSnapshot;
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) {
        window.localStorage.setItem(storageKey, JSON.stringify(seedData));
        browserSnapshot = { data: seedData, error: "" };
        return browserSnapshot;
      }
      let parsed: unknown;
      try {
        parsed = JSON.parse(saved);
      } catch {
        throw new DemoStorageError("Saved demo data could not be read. Restore the sample dataset to continue.");
      }
      const validated = supportDataSchema.safeParse(parsed);
      if (!validated.success) throw new DemoStorageError("Saved demo data has an unexpected format. Clear local demo data to restore the sample workspace.");
      browserSnapshot = { data: validated.data, error: "" };
      return browserSnapshot;
    } catch (error) {
      browserSnapshot = {
        data: seedData,
        error: error instanceof DemoStorageError ? error.message : new DemoStorageError().message,
      };
      return browserSnapshot;
    }
  },

  getServerSnapshot(): RepositorySnapshot {
    return serverSnapshot;
  },

  refresh(): void {
    browserSnapshot = null;
    if (typeof window !== "undefined") window.dispatchEvent(new Event(dataChangedEvent));
  },

  subscribe(listener: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== storageKey) return;
      browserSnapshot = null;
      listener();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener(dataChangedEvent, listener);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(dataChangedEvent, listener);
    };
  },

  save(data: SupportData): void {
    if (typeof window === "undefined") throw new DemoStorageError("Local demo data can only be saved in a browser.");
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      throw new DemoStorageError();
    }
    browserSnapshot = { data, error: "" };
    window.dispatchEvent(new Event(dataChangedEvent));
  },

  reset(): void {
    if (typeof window === "undefined") throw new DemoStorageError("Local demo data can only be reset in a browser.");
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      throw new DemoStorageError();
    }
    browserSnapshot = null;
    const snapshot = this.getSnapshot();
    if (snapshot.error) throw new DemoStorageError(snapshot.error);
    window.dispatchEvent(new Event(dataChangedEvent));
  },
};
