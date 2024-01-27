import "https://deno.land/x/dotenv/load.ts";
import { parse } from "https://deno.land/std@0.207.0/csv/mod.ts";
import { QslApi } from './utils/qsl-api.ts';
import logger from "./utils/logger.ts";
import {csvPayment} from './models/posting.ts';

// Main Driver Program
(async () => {

    logger.info('BEGIN: Payment Posting Application');
    
    const csVContent = await Deno.readTextFile("./payment_input.csv");

    const csvParse = await parse(csVContent, {
        columns: ["headerId", "amount", "instrumentNumber", "paymentDate"],
    });

    logger.info(`Read ${csvParse.length} payments from file`);

    // Instantiate API 
    // Class will automatically log us in
    const a = new QslApi();
    await a.Login();

    for(const payment  of csvParse) {
        // Lets re-format date and re-assign
        const dtArr = payment.paymentDate.split('/');
        payment.paymentDate = `${dtArr[2]}-${dtArr[1]}-${dtArr[0]}`;

        // Here we call the API class to post payment
        const res = await a.postPayment({
            headerId: payment.headerId,
            paymentDate: payment.paymentDate,
            amount: +payment.amount,
            instrumentNumber: payment.instrumentNumber
        });
    }

    logger.info('END: Payment Posting Application');
})();