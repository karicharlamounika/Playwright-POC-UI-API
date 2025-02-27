import { defineConfig} from '@playwright/test';

export const testConfig = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  timeout: 60000,
  use: {
    headless: false,
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },

  // /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: "chromium",
  //     use: {viewport:null, 
  //       launchOptions:{
  //       args: ["--start-maximized"],
  //     }},
  //     timeout: 60000,
  //   },
  // ],
});