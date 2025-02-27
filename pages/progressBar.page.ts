import { Page } from 'playwright';
import * as data from "../testdatajsons/practiceFormTestData.json";
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";
import { stat } from 'fs';

export default class ProgressBar {
    private page: Page;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private startStopBtn = "#startStopButton";
    private resetBtn = "#resetButton";
    private progressBar = "#progressBar div";
    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
    }

    public async verifyProgressBarStatus() {
        const status = await this.page.innerText(this.progressBar);
        return status;
    }

    public async verifyProgressBarValue() {
        const value = Number(await this.page.getAttribute(this.progressBar, "aria-valuenow"));
        return value;
    }

    public async startStopProgressBar() {
        await this.reusableFunctions.clickOn(this.startStopBtn);
        await this.waits.waitforLoadState();
        await this.waits.waitforSpecifiedTime(5);
    }

    public async getStartStopBtnText() {
        const btnName = await this.page.innerText(this.startStopBtn);
        return btnName;
    }

    public async getResetBtnIfProgressCompleted() {
        const reset = this.page.locator(this.resetBtn);
        return reset;
    }

    public async waitTillProgressStarts() {
        let progress = 0;
        while (progress === 0) {
            await this.page.waitForTimeout(1000);
            progress = await this.verifyProgressBarValue();
        }
    }

    public async waitTillProgressCompleted() {
        let progress = "0%";
        while(progress != "100%") {
            await this.page.waitForTimeout(1000);
            progress = await this.verifyProgressBarStatus();
        }
    }
}