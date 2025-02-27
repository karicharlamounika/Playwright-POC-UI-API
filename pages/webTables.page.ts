import { Page } from 'playwright';
import * as data from "../testdatajsons/elementsTestData.json";
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";

export default class WebTables {
    private page: Page;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private addBtn = "#addNewRecordButton";
    private firstName = "#firstName";
    private lastName = "#lastName";
    private email = "#userEmail";
    private age = "#age";
    private salary = "#salary";
    private department = "#department";
    private submitBtn = "#submit";
    private firstNameFieldLabel = "#firstName-label";
    private lastNameFieldLabel = "#lastName-label";
    private emailFieldLabel = "#userEmail-label";
    private ageFieldLabel = "#age-label";
    private salaryFieldLabel = "#salary-label";
    private departmentFieldLabel = "#department-label";
    private searchBox = "#searchBox";
    private firstNameInTable = ".rt-td:nth-child(1)";
    private lastNameInTable = ".rt-td:nth-child(2)";
    private ageInTable = ".rt-td:nth-child(3)";
    private emailInTable = ".rt-td:nth-child(4)";
    private salaryInTable = ".rt-td:nth-child(5)";
    private departmentInTable = ".rt-td:nth-child(6)";
    private editBtnInTable = ".rt-td:last-child .action-buttons span[title='Edit']";
    private expectedList: any[];
    private actualList: any[];
    
    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
        this.actualList = [];
        this.expectedList = [];
    }

    public async openAddRecordForm() {
        await this.reusableFunctions.clickOn(this.addBtn);
        await this.waits.waitforLoadState();
    }

    public async addNewRecord(record: string[]) {
        await this.reusableFunctions.fillText(this.firstName, record[0]);
        await this.reusableFunctions.fillText(this.lastName, record[1]);
        await this.reusableFunctions.fillText(this.email, record[2]);
        await this.reusableFunctions.fillText(this.age, record[3]);
        await this.reusableFunctions.fillText(this.salary, record[4]);
        await this.reusableFunctions.fillText(this.department, record[5]);
    }

    public async verifyFieldLabelsDisplayed() {
        this.actualList.push(await this.page.textContent(this.firstNameFieldLabel));
        this.actualList.push(await this.page.textContent(this.lastNameFieldLabel));
        this.actualList.push(await this.page.textContent(this.emailFieldLabel));
        this.actualList.push(await this.page.textContent(this.ageFieldLabel));
        this.actualList.push(await this.page.textContent(this.salaryFieldLabel));
        this.actualList.push(await this.page.textContent(this.departmentFieldLabel));

        return this.actualList;
    }

    public async clickOnEditForRecord(searchParameter: string) {
        const rows =  await this.page.getByRole("row").elementHandles();
        for(const row of rows) {
            const firstNmCol = await row.$(this.firstNameInTable);
            const firstNm = await firstNmCol?.innerText();

            if(firstNm === searchParameter){
                try{
                    const editButton = await row.$(this.editBtnInTable);
                    await editButton?.click();
                    break;
                }
                catch(error) {
                    console.log("The element is not visible/unable to click " + error);
                }
            }
        }
    }

    public async updateField(fieldName: string, value: string) {
        switch (fieldName) {
            case "first name":
                await this.reusableFunctions.fillText(this.firstName, value);
                break;
            case "last name":
                await this.reusableFunctions.fillText(this.lastName, value);
                break;
            case "email":
                await this.reusableFunctions.fillText(this.email, value);
                break;
            case "age":
                await this.reusableFunctions.fillText(this.age, value);
                break;
            case "salary":
                await this.reusableFunctions.fillText(this.salary, value);
                break;
            case "department":
                await this.reusableFunctions.fillText(this.department, value);
                break;
        }
    }

    public async submitRegistrationForm() {
        await this.reusableFunctions.clickOn(this.submitBtn);
        await this.waits.waitforLoadState();
    }

    public async getRowCount() {
        const rows =  await this.page.locator(".rt-tbody .rt-tr").elementHandles();
        const rowCount = rows.length;
        return rowCount;
    }

    public async validateNewlyInsertedRecord() {
        this.actualList = [];
        this.expectedList = [];
        this.expectedList = data.WebTables.NewRecordValues;
        await this.reusableFunctions.fillText(this.searchBox, data.WebTables.NewRecordValues[2]);
        const rows =  await this.page.getByRole("row").elementHandles();

        for(const row of rows) {
            const elementText = await (await row.$(this.firstNameInTable))?.innerText();
            if(elementText === '  ' || elementText === undefined || elementText === "" || elementText.length === 0) {
                continue;
            }
            this.actualList.push(await (await row.$(this.firstNameInTable))?.innerText());
            this.actualList.push(await (await row.$(this.lastNameInTable))?.innerText());
            this.actualList.push(await (await row.$(this.emailInTable))?.innerText());
            this.actualList.push(await (await row.$(this.ageInTable))?.innerText());
            this.actualList.push(await (await row.$(this.salaryInTable))?.innerText());
            this.actualList.push(await (await row.$(this.departmentInTable))?.innerText());
            if(this.actualList.length === 6) {
                break;
            }
        }

        const flag = await this.reusableFunctions.compareArrays(this.actualList, this.expectedList);
        return flag;
    }

    public async validateUpdatedRecord() {
        this.actualList = [];
        this.expectedList = [];
        //Expected List
        this.expectedList.push(data.WebTables.UpdatedFirstNameValue);
        this.expectedList.push(data.WebTables.UpdatedLastNameValue);
        await this.reusableFunctions.fillText(this.searchBox, data.WebTables.UpdatedFirstNameValue);
        const rows =  await this.page.getByRole("row").elementHandles();

        //Actual List
        for(const row of rows) {
            const elementText = await (await row.$(this.firstNameInTable))?.innerText();
            if(elementText === '  ' || elementText === undefined || elementText === "" || elementText.length === 0) {
                continue;
            }

            this.actualList.push(await (await row.$(this.firstNameInTable))?.innerText());
            this.actualList.push(await (await row.$(this.lastNameInTable))?.innerText());

            if(this.actualList.length === 2) {
                break;
            }
        }

        const flag = await this.reusableFunctions.compareArrays(this.actualList, this.expectedList);
        return flag;
    }
}