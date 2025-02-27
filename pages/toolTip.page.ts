import { Browser, BrowserContext, chromium, firefox, Page } from 'playwright';
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";

export default class ToolTip {
    public page: Page;
    public static browser: Browser;
    public context: BrowserContext;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private toolTipBtn = "#toolTipButton";
    private toolTipText = "#buttonToolTip";
    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
    }

    public async hoverAndGetToolTipText() {
        await this.page.locator(this.toolTipBtn).hover();
        await this.waits.waitforLoadState();
        const toolTipTxt = await this.page.innerText(this.toolTipText);
        return toolTipTxt;
    }
}