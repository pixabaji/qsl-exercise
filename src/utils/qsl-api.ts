import { csvPayment } from "../models/posting.ts";
import {PostingPaymentRequest} from '../models/posting.ts';

export const QSL_API = 'https://qpfc-uat.vergentlms.com/api/api';

// All QSL APIs go here
export class QslApi {
    private token: string = '';

    constructor() {
        console.log(Deno.env.get('LOGIN_API_USER'));
        //const paymentRequest = new PostingPaymentRequest({headerId: "sdfdsf", paymentDate: "2023-09-09", amount: 100, instrumentNumber: "sdfklhsdfklh"});
        //console.log(JSON.stringify(paymentRequest));
        // Initiate session for class instance
        //this.Login();
    }

    async Login(): Promise<void> {
        const login = await fetch(`${QSL_API}/authenticate`,{
            method: 'POST',
            body: JSON.stringify({
                "LogonName": Deno.env.get('LOGIN_API_USER'),
                "password": Deno.env.get('LOGIN_API_PASSWORD')
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const resp = await login.json();
        this.token = resp.Token;
    }

    async postPayment(csvData: csvPayment) {
        console.log('calling posting endpoint toke is : ' + this.token);
        // construct posting payment request
        const paymentRequest = new PostingPaymentRequest(csvData);
        console.log(JSON.stringify(paymentRequest));
        const payment = await fetch(`${QSL_API}/V1/PostCustomerLoanPayment`,{
            method: 'POST',
            body: JSON.stringify(paymentRequest),
            headers: {
                'Token': this.token,
                'Content-Type': 'application/json',
            },
        })

        if(await payment.ok) {
            return await payment.json();
        }
        return null;
    }

    async persistSessionToken() {

    }
}