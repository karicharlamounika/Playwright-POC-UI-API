import { Browser, BrowserContext, Page } from 'playwright';
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";
import { ElementHandle } from '@playwright/test';
import { environment } from '../environment';

export default class BrokenImage {
    public page: Page;
    public static browser: Browser;
    public context: BrowserContext;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private images = "img";

    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
    }

    public async getBrokenImages() {
        const imagesOnPage = await this.page.locator(this.images).elementHandles();
        const brokenImages: ElementHandle[] = [];
        for (const image of imagesOnPage) {
            const isBroken = await image.evaluate((element: HTMLImageElement) => {
                return element.naturalWidth === 0;
            });
            if(isBroken) {
                brokenImages.push(image);
            }
        }
        return brokenImages;
    }

    public async validateBrokenImage(i: number) {
        const brokenImages = await this.getBrokenImages();
        //Using placeholder attribute as src attribute has value for all images both valid and invalid
        const placeholder = await brokenImages[i].getAttribute("placeholder");
        return placeholder;
    }

    public async validateBrokenImageUrl(i: number) {
        const brokenImages = await this.getBrokenImages();
        const imgSrc =  await brokenImages[i].getAttribute("src");
        const resp = await this.page.request.get(environment.baseurl + imgSrc);
        return resp.status();
    }
}