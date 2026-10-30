import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.clear());
});

test("creates, updates, assigns, and comments on a ticket", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Good morning, Sara" })).toBeVisible();
  await page.getByRole("button", { name: "New ticket" }).click();

  await page.getByLabel("Subject").fill("Playwright ticket workflow");
  await page.getByLabel("Description").fill("A complete end-to-end ticket workflow validation.");
  await page.getByLabel("Customer").selectOption("c-2");
  await page.getByLabel("Assignee").selectOption("sara");
  await page.getByRole("button", { name: "Create ticket" }).click();

  await expect(page.getByRole("heading", { name: "Playwright ticket workflow" })).toBeVisible();
  await page.getByLabel("Status").selectOption("In progress");
  await page.getByLabel("Priority").selectOption("Urgent");
  await page.getByLabel("Assignee").selectOption("aisha");
  await page.getByLabel("Add a comment").fill("I am investigating this request.");
  await page.getByRole("button", { name: "Add reply" }).click();
  await expect(page.getByText("I am investigating this request.")).toBeVisible();

  await page.getByRole("button", { name: "Edit ticket" }).click();
  await page.getByLabel("Subject").fill("Updated Playwright ticket workflow");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.getByRole("button", { name: /Tickets/ }).click();
  await page.getByPlaceholder("Search tickets…").fill("Updated Playwright");
  await expect(page.getByRole("button", { name: /Updated Playwright ticket workflow/ })).toBeVisible();
  await expect(page.getByRole("table").getByText("In progress")).toBeVisible();
  await expect(page.getByRole("table").getByText("Urgent")).toBeVisible();
});

test("filters tickets and responds to browser back and forward", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Tickets/ }).click();
  await page.getByPlaceholder("Search tickets…").fill("SF-1048");
  await page.getByLabel("Status").selectOption("Open");
  await expect(page.getByRole("button", { name: /Unable to export monthly report/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Invite link expired too soon/ })).toHaveCount(0);

  await page.getByRole("button", { name: /Customers/ }).click();
  await page.goBack();
  await expect(page.getByPlaceholder("Search tickets…")).toHaveValue("SF-1048");
  await expect(page.getByLabel("Status")).toHaveValue("Open");
  await page.goForward();
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
});

test("uses a compact bottom navigation on narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const customers = page.getByRole("button", { name: /Customers/ });
  await expect(customers).toBeVisible();
  await customers.click();
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
  await expect(page.locator(".sf-sidebar")).toHaveCSS("position", "fixed");
});
