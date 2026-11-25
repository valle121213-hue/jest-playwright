import { test, expect } from "@playwright/test";
import user from "../user.js";

test("successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.screenshot({ path: "screenshots/01-home.png" });
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();
  await page.screenshot({ path: "screenshots/02-home.png" });

  await page.getByRole("textbox", { name: "Email" }).fill(user.email);
  await page.getByRole("textbox", { name: "Пароль" }).fill(user.password);
  await page.screenshot({ path: "screenshots/03-home.png" });

  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL(/\/profile/);
  await expect(
    page.getByRole("heading", { name: /^Здравствуйте,/  }),
  ).toBeVisible();
  await page.screenshot({ path: "screenshots/04-home.png" });
});

test("unsuccessful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByText("Другие способы входа").click();
  await page.getByText("Войти по почте").click();

  await page.getByRole("textbox", { name: "Email" }).fill("qwer");
  await page.getByRole("textbox", { name: "Пароль" }).fill("12323");

  await page.getByTestId("login-submit-btn").click();

  await expect(page.getByText("Неверный email")).toBeVisible();
  await page.screenshot({ path: "screenshots/05-home.png" });
});
