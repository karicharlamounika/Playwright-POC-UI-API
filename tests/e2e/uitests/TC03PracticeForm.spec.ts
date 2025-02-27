import { test, expect, Page} from '@playwright/test';
import Basepage from '../../../pages/base.page';
import * as data from "../../../testdatajsons/practiceFormTestData.json";
import FormSection from '../../../pages/forms.page';
import PracticeForm from "../../../pages/practiceForm.page"

test.describe("Verify user interaction with form", ()=>{
  let page1: Page;
  let basepage: Basepage;
  let form: FormSection;
  let practiceForm: PracticeForm;

  test.beforeEach(async () => {
    basepage = new Basepage(page1);
    page1 = await basepage.navigate();
  });

  test("TC03- Verify user can submit the form", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc03);
    form = new FormSection(page1);
    await form.navigateToMenuOption(data.MenuItemTobeSelectedTc03);
    practiceForm = new PracticeForm(page1);
    await practiceForm.registerStudent(data.PracticeForm.NewRecordValues);
    expect(await practiceForm.verifyConfirmationText()).toBe(data.ExpectedConfirmationMsg);
    expect(await practiceForm.validateExpectedAndActualStudentRegistered()).toBeTruthy();
    await practiceForm.closeConfirmationModal();
  });

  test.afterEach(async () => {
    await basepage.closeBrowser();
  })
});