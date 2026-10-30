import { readdir, readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const skillsRoot = resolve(workspaceRoot, ".agents/skills");
const registryPath = resolve(skillsRoot, "SKILL_ROUTING.md");

async function loadSkill(skillId: string) {
  const file = resolve(skillsRoot, skillId, "SKILL.md");
  const content = (await readFile(file, "utf8")).replace(/^\uFEFF/, "");
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  expect(frontmatter, `${skillId}/SKILL.md must start with YAML frontmatter`).not.toBeNull();
  const name = frontmatter?.[1].match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
  const description = frontmatter?.[1].match(/^description:\s*>-?\r?\n((?:  .*(?:\r?\n|$))+)/m)?.[1].trim();
  return { file, content, name, description };
}

describe("workspace skill discovery", () => {
  it("uses the native SKILL.md convention and registers each discoverable skill", async () => {
    const folders = (await Promise.all((await readdir(skillsRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map(async (entry) => {
        const files = await readdir(resolve(skillsRoot, entry.name));
        return files.includes("SKILL.md") ? entry.name : null;
      })))
      .filter((skillId): skillId is string => skillId !== null)
      .sort();
    const registry = await readFile(registryPath, "utf8");
    const registryPaths = [...registry.matchAll(/\|\s*`([a-z0-9-]+\/SKILL\.md)`\s*\|/g)]
      .map((match) => match[1]?.replace(/\/SKILL\.md$/, ""))
      .filter((skillId): skillId is string => Boolean(skillId))
      .sort();

    expect(registryPaths).toHaveLength(17);
    expect(registryPaths).toEqual(folders);

    for (const skillId of folders) {
      const skill = await loadSkill(skillId);
      expect(skill.name).toBe(skillId);
      expect(skill.description?.length, `${skillId} needs a useful description`).toBeGreaterThan(20);
      expect(skill.content).not.toContain("name: " + skillId + " description:");
    }

    const discoveryInstructions = await readFile(resolve(workspaceRoot, ".github/copilot-instructions.md"), "utf8");
    expect(discoveryInstructions).toContain(".agents/skills/<skill-name>/SKILL.md");
    expect(discoveryInstructions).toContain("SKILL_ROUTING.md");

    const repositoryArchitecture = await loadSkill("waypoint-repository-architecture-conventions");
    const repositoryDesign = await loadSkill("waypoint-design-system-governance");
    const architectureGuide = resolve(dirname(repositoryArchitecture.file), "../repositories/waypoint/repository-architecture-conventions.md");
    const designGuide = resolve(dirname(repositoryDesign.file), "../repositories/waypoint/repository-design-system-governance.md");
    await expect(readFile(architectureGuide, "utf8")).resolves.toContain("Waypoint Repository Architecture Conventions");
    await expect(readFile(designGuide, "utf8")).resolves.toContain("Waypoint Design System Governance");
    expect(repositoryArchitecture.content).toContain("../repositories/waypoint/repository-architecture-conventions.md");
    expect(repositoryDesign.content).toContain("../repositories/waypoint/repository-design-system-governance.md");
  });

  it.each([
    ["Build or refactor a React component", ["react-component-engineering"]],
    ["Implement a custom React Hook", ["react-hooks-engineering"]],
    ["Design shared or URL-persisted React state", ["react-state-management"]],
    ["Implement a Next.js App Router route", ["nextjs-app-router"]],
    ["Model runtime-validated TypeScript data", ["typescript-engineering"]],
    ["Investigate a slow frontend", ["frontend-performance"]],
    ["Review keyboard and screen-reader behavior", ["frontend-accessibility"]],
    ["Add frontend unit or browser tests", ["frontend-testing"]],
    ["Implement responsive styling", ["frontend-design-engineering", "waypoint-design-system-governance"]],
    ["Restructure application modules", ["project-structure-architect"]],
    ["Add or replace a package", ["dependency-governance"]],
    ["Design or change an HTTP API contract", ["api-contract-engineering"]],
    ["Implement persistence or backend business logic", ["backend-engineering"]],
    ["Implement authentication or authorization", ["security-engineering"]],
    ["Change Waypoint-specific architecture", ["waypoint-repository-architecture-conventions"]],
    ["Change Waypoint-specific styles", ["waypoint-design-system-governance"]],
  ])("routes the representative task: %s", async (task, expectedSkills) => {
    const registry = await readFile(registryPath, "utf8");
    const routeSection = registry.split("## Representative activation routes")[1]?.split("## Registry rules")[0] ?? "";
    const escapedTask = task.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matchingRow = routeSection.split(/\r?\n/).find((line) => new RegExp(`^\\| ${escapedTask} \\|`).test(line));

    expect(matchingRow, `Add an activation route for "${task}"`).toBeDefined();
    for (const skillId of expectedSkills) {
      expect(matchingRow).toContain(`\`${skillId}\``);
      await expect(loadSkill(skillId)).resolves.toMatchObject({ name: skillId });
    }
  });
});
