import { test, expect, APIRequest, request } from '@playwright/test';
import addDeleteBooks from '../../../bookStoreAPI/addDeleteBooks';
import CreateDeleteUser from '../../../bookStoreAPI/createDeleteUser';
import * as APITestData from '../../../testdatajsons/APITestData.json'

test.describe("Book Store API Test Cases", () => {

    let createDeleteUser: CreateDeleteUser;
    let adddeletebooks: addDeleteBooks;
    let userid : String;

    test.beforeAll(async () => {
        createDeleteUser = new CreateDeleteUser();
        adddeletebooks = new addDeleteBooks();
      });

    test("Create user for Book store", async ({ request }) => {
        const response = (await createDeleteUser.createUser(request));
        const responsebody = await response.json();
        expect(response.status()).toBe(201);
        expect(responsebody.username).toEqual(APITestData.userName);
        userid = responsebody.userID; 
    })

    test("Validate user creation fails with error not acceptable if same user id nad password are used ", async ({ request }) => {
        const response = (await createDeleteUser.createUser(request));
        const responsebody = await response.json();
        expect(response.status()).toBe(406);   
        expect(responsebody.message).toEqual("User exists!");     
    })

    test("Add books to profile", async ({request}) => {
        const response = adddeletebooks.addBooks(request,userid);
        const responsebody = await (await response).json();
        expect((await response).status()).toBe(201);
        expect(responsebody.books[0].isbn).toEqual( APITestData.isbn);
    })

    test("Validate request fails if same book is added again", async ({request}) => {
        const response = adddeletebooks.addBooks(request,userid);
        const responsebody = await (await response).json();
        expect((await response).status()).toBe(400);
        expect(responsebody.message).toEqual("ISBN already present in the User's Collection!");
    })

    test("Delete books from user profile", async ({request}) => {
        const response = adddeletebooks.deleteBooks(request,userid);
        expect((await response).status()).toBe(204);
    })

    test("Validate request fails if same book is deleted again", async ({request}) => {
        const response = adddeletebooks.deleteBooks(request,userid);
        const responsebody = await (await response).json();
        expect((await response).status()).toBe(400);
        expect(responsebody.message).toEqual("ISBN supplied is not available in User's Collection!");
    })

    test.afterAll(async ({request}) => {
        const response = (await createDeleteUser.deleteUser(request,userid));
        request.dispose();
      });
})