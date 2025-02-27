import { APIRequestContext  }  from "@playwright/test"
import { environment } from "../environment";
import * as APITestData from "../testdatajsons/APITestData.json";

export default class addDeleteBooks {  
    
    

    async addBooks(request:APIRequestContext,userid:String){

        const basicAuth = Buffer.from(APITestData.userName + ':' + APITestData.password).toString('base64');
        const addBooksResponse = await request.post(environment.baseurl+"BookStore/v1/Books",{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Basic ${basicAuth}`                },
            data:{
                "userId": userid,
                "collectionOfIsbns": [
                  {
                    "isbn": APITestData.isbn
                  }
                ]
            }
        })
        const responsebody = await addBooksResponse.json();
        console.log(responsebody);
        return addBooksResponse;
    }

    async deleteBooks(request:APIRequestContext,userid:String){
        const basicAuth = Buffer.from(APITestData.userName + ':' + APITestData.password).toString('base64');
        const deleteBooksResponse = await request.delete(environment.baseurl+"BookStore/v1/Book",{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': `Basic ${basicAuth}`
                },
            data:{
                "isbn": APITestData.isbn,
                "userId": userid
            }
        })
        // const responsebody = await deleteBooksResponse.text();
        // console.log(responsebody);
        return deleteBooksResponse;
    }

}