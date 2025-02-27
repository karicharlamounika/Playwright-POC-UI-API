import { Page } from 'playwright';
import * as data from "../testdatajsons/practiceFormTestData.json";
import CommonWaits from "../utils/commonWait";
import CommonReusableFunctions from "../utils/commonReusableFunctions";

export default class PracticeForm {
    private page: Page;
    private waits: CommonWaits;
    private reusableFunctions: CommonReusableFunctions;
    private addBtn = "#addNewRecordButton";
    private firstName = "#firstName";
    private lastName = "#lastName";
    private email = "#userEmail";
    private maleRadioBtn = "label[for='gender-radio-1']";
    private femaleRadioBtn = "label[for='gender-radio-2']";
    private otherRadioBtn = "label[for='gender-radio-3']";
    private mobile = "#userNumber";
    private dateField = "#dateOfBirthInput";
    private yearDropdown = ".react-datepicker__year-select";
    private monthDropdown = ".react-datepicker__month-select";
    private dateValue = ".react-datepicker__month div div";
    private subject = "#subjectsContainer";
    private sportsCheckBox = "label[for='hobbies-checkbox-1']";
    private readingCheckBox = "label[for='hobbies-checkbox-2']";
    private musicCheckBox = "label[for='hobbies-checkbox-3']";
    private fileupload = "Select picture";
    private currentAddress = "#currentAddress";
    private state = "#state";
    private city = "#city";
    private submitBtn = "#submit";
    private modalSuccessMsg = "#example-modal-sizes-title-lg";
    private modalCloseBtn = "#closeLargeModal";
    private expectedList: any[];
    private actualList: any[];
    
    
    constructor(page: Page) {
        this.page = page;
        this.waits = new CommonWaits(page);
        this.reusableFunctions = new CommonReusableFunctions(page);
        this.actualList = [];
        this.expectedList = [];
    }

    public async registerStudent(record: string[]) {
        await this.reusableFunctions.fillText(this.firstName, record[0]);
        await this.reusableFunctions.fillText(this.lastName, record[1]);
        await this.reusableFunctions.fillText(this.email, record[2]);
        await this.selectGender(data.PracticeForm.Gender);
        await this.reusableFunctions.fillText(this.mobile, record[3]);
        await this.reusableFunctions.clickOn(this.dateField);
        await this.page.selectOption(this.yearDropdown, data.PracticeForm.Year);
        await this.page.selectOption(this.monthDropdown, data.PracticeForm.Month);
        await this.page.locator(this.dateValue).filter({hasText: data.PracticeForm.Day}).click();
        await this.reusableFunctions.typeAndEnterText(this.subject, record[4]);
        await this.selectHobby(data.PracticeForm.Hobby);
        await this.reusableFunctions.uploadFile(this.fileupload, record[5], data.PracticeForm.fileName);
        await this.reusableFunctions.fillText(this.currentAddress, record[6]);
        await this.reusableFunctions.typeAndEnterText(this.state, record[7]);
        await this.reusableFunctions.typeAndEnterText(this.city, record[8]);
        await this.reusableFunctions.clickOn(this.submitBtn);
        await this.waits.waitforLoadState();
    }

    public async selectGender(gender: string) {
        switch(gender) {
            case "Male":
                await this.reusableFunctions.checkField(this.maleRadioBtn);
                break;
            case "Female":
                await this.reusableFunctions.checkField(this.femaleRadioBtn);
                break;
            case "Other":
                await this.reusableFunctions.checkField(this.otherRadioBtn);
                break;
            default:
                throw new Error(`Unsupported gender: ${gender}`);
        }
    }

    public async selectHobby(hobby: string) {
        switch(hobby) {
            case "Sports":
                await this.reusableFunctions.checkField(this.sportsCheckBox);
                break;
            case "Reading":
                await this.reusableFunctions.checkField(this.readingCheckBox);
                break;
            case "Music":
                await this.reusableFunctions.checkField(this.musicCheckBox);
                break;
            default:
                throw new Error(`Unsupported gender: ${hobby}`);
        }
    }

    public async verifyConfirmationText() {
        let confirmationMsg = "";
        await this.waits.waitforElementVisible(this.modalSuccessMsg);
        const flag = await this.page.isVisible(this.modalSuccessMsg);
        if(flag) {
            confirmationMsg = await this.page.innerText(this.modalSuccessMsg);
        }
        return confirmationMsg;
    }

    public async closeConfirmationModal() {
        await this.reusableFunctions.clickOn(this.modalCloseBtn);
        await this.waits.waitforLoadState();
    }

    public async getActualRegisteredStudentDetails() {
        const rows = await this.page.locator(".modal-body tr").elementHandles();
        if(rows.length > 0) {
            for(let i=0; i<rows.length; i++) {
                const elementText = await(await rows[i].$("td:nth-child(2)"))?.innerText();
                if(elementText != undefined) {
                    this.actualList.push(elementText);
                }
            }
        }
        return this.actualList;
    }

    public async getExpectedRegisteredStudentDetails() {
        this.expectedList.push(data.PracticeForm.NewRecordValues[0] + " " +data.PracticeForm.NewRecordValues[1]);
        this.expectedList.push(data.PracticeForm.NewRecordValues[2]);
        this.expectedList.push(data.PracticeForm.Gender);
        this.expectedList.push(data.PracticeForm.NewRecordValues[3]);
        this.expectedList.push(data.PracticeForm.Day + " " + data.PracticeForm.Month + "," + data.PracticeForm.Year);
        this.expectedList.push(data.PracticeForm.NewRecordValues[4]);
        this.expectedList.push(data.PracticeForm.Hobby);
        this.expectedList.push(data.PracticeForm.fileName);
        this.expectedList.push(data.PracticeForm.NewRecordValues[6]);
        this.expectedList.push(data.PracticeForm.NewRecordValues[7] + " " + data.PracticeForm.NewRecordValues[8]);
        return this.expectedList;
    }

    public async validateExpectedAndActualStudentRegistered() {
        const flag = await this.reusableFunctions.compareArrays(await this.getActualRegisteredStudentDetails(), await this.getExpectedRegisteredStudentDetails());
        return flag;
    }
}