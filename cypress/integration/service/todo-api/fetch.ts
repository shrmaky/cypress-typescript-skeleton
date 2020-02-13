/// <reference types='Cypress' />

import {OK, NOT_FOUND} from 'http-status-codes';
import {generateRandomPincode} from "../../../utils/common"; //@Todo - Use the Paths - @utils from tsconfig

describe('ToDo', () => {

    let baseUrl = Cypress.env('toDoApiUrl');

    interface todoType {
        userId: string,
        id: number,
        title: string,
        completed: boolean,
        test: boolean
    }

    let todosIdsArray: todoType[];

    //pincode = generateRandomPincode(); //This is how to use the global variable

    it('Get : should be able to fetch all Todo', () => {
        cy.request({
            method: 'GET',
            url: baseUrl + '/todos',
            headers: {
                'accept': 'application/json'
            },
            body: {}
        }).then(async (response: any) => {
            let todosIds: any[] = [];
            todosIdsArray = [todosIdsArray, ...todosIds]; //This is a hack to instatiate the global variable to be used inside foreach
            assert.equal(response.status, OK);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
            let responseBody: Array<todoType> = response.body;
            expect(responseBody).to.not.be.null;
            expect(responseBody).to.have.length(200);

            await responseBody.forEach(function (toDo: any) {
                todosIdsArray.push(toDo.id)
            });

        })
    });

    it('Get : should be able to fetch a single Todo', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/todos/${todosIdsArray[5]}`,
            headers: {
                'accept': 'application/json'
            },
            body: {}
        }).then(async (response: any) => {
            assert.equal(response.status, OK);
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
            let responseBody: todoType = response.body;
            expect(response.body).to.have.property('userId');
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('completed');
        });
    });
});







