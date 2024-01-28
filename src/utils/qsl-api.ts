import { csvPayment } from "../models/posting.ts";
import {PostingPaymentRequest} from '../models/posting.ts';

export const QSL_API = 'https://qpfc-uat.vergentlms.com/api/api';

// All QSL APIs go here
export class QslApi {
    private token: string;

    constructor() {
        //this.Login();
        this.token = '';
    }

    async Login(): Promise<void> {
        const loginResp = await fetch(`${QSL_API}/authenticate`,{
            method: 'POST',
            body: JSON.stringify({
                "LogonName": Deno.env.get('LOGIN_API_USER'),
                "password": Deno.env.get('LOGIN_API_PASSWORD')
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(err => {
            throw new Error('API login Failed with err: ' + JSON.stringify(err));
        })

        if(loginResp && (await loginResp.ok)) {
            const resp = await loginResp.json();
            this.token = resp.Token;
        }
    }

    async postPayment(csvData: csvPayment, retries = 0) {
        // Ensure token is present
        if(!this.token) {
            throw new Error('Token must be provided');
        }

        // construct posting payment request
        const paymentRequest = new PostingPaymentRequest(csvData);

        const payment = await fetch(`${QSL_API}/V1/PostCustomerLoanPayment`,{
            method: 'POST',
            body: JSON.stringify(paymentRequest),
            headers: {
                'Token': this.token,
                'Content-Type': 'application/json',
            },
        }).catch(async (err) => {
            // Assuming an error is thrown once a token is expired, Let's try to re-issue
            // We will retry once, recursively. If the error persists then it's likely not auth related
            await this.Login();
            if(retries < 1) {
                await this.postPayment(csvData, retries++);
            } else {
                throw Error('Something went wrong: Failed with Error: \n' + JSON.stringify(err));
            }
            
        });

        if(payment && (await payment.ok)) {
            return await payment.json();
        }
        return null;
    }

    async persistSessionToken() {

    }
}