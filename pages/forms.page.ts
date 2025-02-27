import { Browser, BrowserContext, chromium, firefox, Page } from 'playwright';
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";

export default class FormSection {
    public page: Page;
    public static browser: Browser;
    public context: BrowserContext;
    private reusableFunctions: CommonReusableFunctions;
    constructor(page: Page) {
        this.page = page;
        this.reusableFunctions = new CommonReusableFunctions(page);
    }

    public async navigateToMenuOption(menuItem: string) {
        await this.reusableFunctions.navigateTo(menuItem);
    }
}