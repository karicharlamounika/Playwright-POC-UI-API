import { Browser, BrowserContext, chromium, firefox, Page } from 'playwright';
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";

export default class Dropable {
    public page: Page;
    public static browser: Browser;
    public context: BrowserContext;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private dropbox = "#simpleDropContainer #droppable";
    private dragbox = "#simpleDropContainer #draggable";
    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
    }

    public async getDropBoxText() {
        const dropboxText = await this.page.locator(this.dropbox).innerText();
        return dropboxText;
    }

    public async dragAndDropObject() {
        await this.page.locator(this.dragbox).hover();
        await this.page.mouse.down();
        await this.page.locator(this.dropbox).hover();
        await this.page.mouse.up();
        await this.waits.waitforLoadState();
    }
}