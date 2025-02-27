import { BrowserContext, Page } from "playwright";
import Basepage from "../pages/base.page";
import CommonWaits from "../utils/commonWait";
import path from "path";

export default class CommonReusableFunctions {
    private page: Page;
    private waits: CommonWaits;
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
    }

    public async compareArrays(array1: any[], array2: any[]) {
        var flag = false;
        if (array1.length != array2.length) {
            flag = false;
        }
        else {
            for (let i = 0; i < array1.length; i++) {
                if (array1[i] === array2[i]) {
                    flag = true;
                }
                else {
                    flag = false;
                    console.log(array1[i] + " doesn't match with expected " + array2[i]);
                    break;
                }
            }
        }
        return flag;
    }

    public async checkField(selector: string) {
        try {
            await this.waits.waitforElementVisible(selector);
            await this.page.check(selector);
        } catch (error) {
            console.log("The element is not visible/unable to check " + error);
        }
    }

    public async fillText(selector: string, text: string) {
        try {
            await this.waits.waitforElementVisible(selector);
            await this.page.locator(selector).clear();
            await this.page.fill(selector, text);
        } catch (error) {
            console.log("The " + selector + " is not visible to enter the text " + error);
        }
    }

    public async clickOn(selector: string) {
        try {
            await this.waits.waitforElementVisible(selector);
            await this.page.click(selector);
        } catch (error) {
            console.log("The expected element is not visible/unable to click " + error);
        }
    }

    public async typeAndEnterText(selector: string, value: string) {
        await this.clickOn(selector);
        await this.page.keyboard.type(value, {delay: 100});
        await this.waits.waitforSpecifiedTime(10);
        await this.page.keyboard.press("Enter");
    }

    public async uploadFile(selector: string, filepath: string, filename: string) {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.getByLabel(selector).click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles(path.join(filepath, filename));
    }

    public async navigateTo(menuItem: string) {
        const menuOption = this.page.getByText(menuItem);
        await menuOption.click();
        await this.waits.waitforLoadState();
    }
}