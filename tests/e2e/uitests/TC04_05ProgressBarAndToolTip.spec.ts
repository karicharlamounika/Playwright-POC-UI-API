import { test, expect, Page} from '@playwright/test';
import Basepage from '../../../pages/base.page';
import * as data from "../../../testdatajsons/widgetTestData.json";
import WidgetSection from '../../../pages/widgets.page';
import ProgressBar from '../../../pages/progressBar.page';
import ToolTip from '../../../pages/toolTip.page';

test.describe("Widget section validations", ()=>{
  let page1: Page;
  let basepage: Basepage;
  let widget: WidgetSection;
  let progressBar: ProgressBar;
  let toolTip: ToolTip;

  test.beforeEach(async () => {
    basepage = new Basepage(page1);
    page1 = await basepage.navigate();
  });

  test("TC04- Verify the progress bar", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc04);
    widget = new WidgetSection(page1);
    await widget.navigateToMenuOption(data.MenuItemTobeSelectedTc04);
    progressBar = new ProgressBar(page1);
    //Verify current value before starting progress
    expect(await progressBar.verifyProgressBarStatus()).toBe(data.ProgressBar.MinPercentageValue);
    await progressBar.startStopProgressBar();
    await progressBar.waitTillProgressStarts();
    //Verify current value after starting progress
    expect(await progressBar.verifyProgressBarValue()).toBeGreaterThan(data.ProgressBar.MinValue);
    expect(await progressBar.verifyProgressBarValue()).toBeLessThan(data.ProgressBar.MaxValue);
    expect(await progressBar.getStartStopBtnText()).toBe(data.ProgressBar.buttonTextPostStart);
    //Verify start button visibility on click of Stop
    await progressBar.startStopProgressBar();
    expect(await progressBar.getStartStopBtnText()).toBe(data.ProgressBar.buttonTextPostStop);
    //Verify reset button visibility on progress completion
    await progressBar.startStopProgressBar();
    await progressBar.waitTillProgressCompleted();
    expect(await progressBar.getResetBtnIfProgressCompleted()).toBeVisible();
  });
  
  test("TC05- Verify the tooltip", async () => {
    await basepage.navigateToSection(data.SectionTobeSelectedTc04);
    widget = new WidgetSection(page1);
    await widget.navigateToMenuOption(data.MenuItemTobeSelectedTc05);
    toolTip = new ToolTip(page1);
    //Verify tool tip text
    expect(await toolTip.hoverAndGetToolTipText()).toBe(data.ExpectedToolTipText);
  });

  test.afterEach(async () => {
    await basepage.closeBrowser();
  })
});