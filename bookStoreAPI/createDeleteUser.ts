import { APIRequest, APIRequestContext, request } from "@playwright/test"
import { environment } from "../environment";
import * as APITestData from "../testdatajsons/APITestData.json";

export default class CreateDeleteUser {

    async createUser(request: APIRequestContext) {
        //const request = await this.apiRequest.newContext();
        const createUserResponse = await request.post(environment.baseurl + "Account/v1/User", {
            data: {
                "userName": APITestData.userName,
                "password": APITestData.password
            }
        })
        const responsebody = await createUserResponse.json();
        console.log(responsebody);
        return createUserResponse;
    }

    async deleteUser(request: APIRequestContext, userid:any) {
        const basicAuth = Buffer.from(APITestData.userName + ':' + APITestData.password).toString('base64');
        const uri = "Account/v1/User/UUID";
        const finaluri = uri.replace("UUID",userid);

        const deleteUserResponse = await request.delete(environment.baseurl + finaluri, {         
            headers: {
                'Accept': 'application/json',
                'authorization': `Basic ${basicAuth}`
            }
        })
        return deleteUserResponse;
    }

}