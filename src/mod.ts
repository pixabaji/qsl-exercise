import "https://deno.land/x/dotenv/load.ts";
import { parse } from "https://deno.land/std@0.207.0/csv/mod.ts";
import { existsSync } from "https://deno.land/std@0.213.0/fs/mod.ts";
import { QslApi } from './utils/qsl-api.ts';
import logger from "./utils/logger.ts";

// Main Driver Program
(async () => {

    const filePath = './data/payment_input.csv';

    const start = confirm('Do you wish to run application?');

    if (!start) {
        logger.info('Goodbye....exiting application :(');
        alert();
        return;
    }

    logger.info('BEGIN: Payment Posting Application');

    if(!existsSync(filePath)) {
        logger.error('Invalid file path');
        alert();
        return;
    }

    try {
        const csVContent = await Deno.readTextFile(filePath);

        const csvParse = await parse(csVContent, {
            columns: ["headerId", "amount", "instrumentNumber", "paymentDate"],
        });

        logger.info(`Read ${csvParse.length} payments from file`);

        // Instantiate API. Must perform login to call other API endpoints
        const api = new QslApi();
        await api.Login();

        for(const payment  of csvParse) {
            // Lets re-format date and re-assign
            const dtArr = payment.paymentDate.split('/');
            payment.paymentDate = `${dtArr[2]}-${dtArr[1]}-${dtArr[0]}`;

            logger.info('Processing payment with header id: ' + payment.headerId + ' and payment date: ' + payment.paymentDate);
            // Here we call the API class to post payment
            const resp = await api.postPayment({
                headerId: payment.headerId,
                paymentDate: payment.paymentDate,
                amount: +payment.amount,
                instrumentNumber: payment.instrumentNumber
            }).catch(e => {
                // Let's not halt application if 1 payment fails, rather just log.
                logger.error(`Error processing payment with error: ${e?.message}`)
            })

            resp ? logger.info(`Posting API call successful: ${JSON.stringify(resp)}` ) :
                logger.info('Could not properly post payment: '+ JSON.stringify(payment));
        }

        Deno.renameSync(filePath, `./data/${Date.now()}_processed_payment_input.csv`);
    } catch (err) {
        // Capture any error and log
        logger.error('Something went wrong. Error:\n', JSON.stringify(err));
    }

    logger.info('END: Payment Posting Application');

    alert('Process complete.....');
})();