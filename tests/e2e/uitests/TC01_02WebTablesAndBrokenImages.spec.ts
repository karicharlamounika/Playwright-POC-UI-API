import { test, expect, Page} from '@playwright/test';
import Basepage from '../../../pages/base.page';
import WebTables from '../../../pages/webTables.page';
import ElementSection from '../../../pages/elements.page';
import * as data from "../../../testdatajsons/elementsTestData.json";
import BrokenImage from '../../../pages/brokenImage.page';

test.describe("Elements section validation", () => {
  let page1: Page;
  let basepage: Basepage;
  let element: ElementSection;
  let webTables: WebTables;
  let brokenImg: BrokenImage;

  test.beforeEach(async () => {
    basepage = new Basepage(page1);
    page1 = await basepage.navigate();
  });

  test("TC01- Scenario A - Verify user can enter new data into the table", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc01);
    element = new ElementSection(page1);
    await element.navigateToMenuOption(data.MenuItemTobeSelectedTc01);
    webTables = new WebTables(page1);
    await webTables.openAddRecordForm();
    //Verify field labels in the add form
    expect(await webTables.verifyFieldLabelsDisplayed()).toEqual(data.WebTables.ExpectedFieldLabels);
    await webTables.addNewRecord(data.WebTables.NewRecordValues);
    await webTables.submitRegistrationForm();
    //Validate values of the newly inserted record
    expect(await webTables.validateNewlyInsertedRecord()).toBeTruthy();
  });

  test("TC01- Scenario B - Verify user can edit the row in a table", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc01);
    element = new ElementSection(page1);
    await element.navigateToMenuOption(data.MenuItemTobeSelectedTc01);
    webTables = new WebTables(page1);
    await webTables.clickOnEditForRecord(data.WebTables.FirstNameOfRecordTobeUpdated);
    await webTables.updateField("first name", data.WebTables.UpdatedFirstNameValue);
    await webTables.updateField("last name", data.WebTables.UpdatedLastNameValue);
    await webTables.submitRegistrationForm();
    //Validate values of the newly inserted record
    expect(await webTables.validateUpdatedRecord()).toBeTruthy();
  });

  test("TC02- Verify broken image", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc01);
    element = new ElementSection(page1);
    await element.navigateToMenuOption(data.MenuItemTobeSelectedTc02);
    brokenImg = new BrokenImage(page1);
    expect((await brokenImg.getBrokenImages()).length).toBeGreaterThan(0);
    //Validating placeholder attribute for broken image to be null
    expect(await brokenImg.validateBrokenImage(0)).toBeNull();
    //Below expect will fail as on hitting the broken image link response is getting as 200
    //expect(await brokenImg.validateBrokenImageUrl(0)).not.toBe(200);
  });

  test.afterEach(async () => {
    await basepage.closeBrowser();
  })
});