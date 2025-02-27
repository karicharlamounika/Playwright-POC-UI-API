import { test, expect, Page} from '@playwright/test';
import Basepage from '../../../pages/base.page';
import * as data from "../../../testdatajsons/interactionTestData.json";
import InteractionsSection from '../../../pages/interactions.page';
import Dropable from '../../../pages/droppable.page';

test.describe("Interactions section validations", ()=>{
  let page1: Page;
  let basepage: Basepage;
  let interactions: InteractionsSection;
  let drgNdrop: Dropable;

  test.beforeEach(async () => {
    basepage = new Basepage(page1);
    page1 = await basepage.navigate();
  });

  test("TC06- Verify user can drag and drop", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc06);
    interactions = new InteractionsSection(page1);
    await interactions.navigateToMenuOption(data.MenuItemTobeSelectedTc06);
    drgNdrop = new Dropable(page1);
    //Verify current text in dropbox before drag drop
    expect(await drgNdrop.getDropBoxText()).toBe(data.DragAndDrop.ExpectedDropBoxTestBeforeDrop);
    await drgNdrop.dragAndDropObject();
    //Verify current text in dropbox after drag drop
    expect(await drgNdrop.getDropBoxText()).toBe(data.DragAndDrop.ExpectedDropBoxTestAfterDrop);
  });

  test.afterEach(async () => {
    await basepage.closeBrowser();
  })
});