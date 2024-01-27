export type csvPayment = {
    headerId: string;
    amount: number;
    instrumentNumber: string;
    paymentDate: string;
}

export class PostingPaymentRequest {
    CompanyId: number;
    StoreId: number;
    UserId: number;
    HeaderId: string;
    PaymentDate: string;
    PaymentAmount: number;
    ChangeDue: number;
    SelectedCoupon: number;
    CouponAmount: number;
    PaymentMethod: number;
    PartnerUserId: number;
    PartnerLocationId: number;
    IsRescind: boolean;
    RescindAba: string;
    RescindAcctNumber: string;
    RescindPmtType: number;
    RescindCheckNumber: string;
    InstrumentNumber: string;
    CciCheckNumber: string;
    CciCheckAmt: string;
    CardId: number;
    CardCCV: number;
    ManualCardLast4Digits: string;
    ManualCardCardType: string;
    ManualCardNameOnCard: string;
    ManualCardExpireDate: string;
    ManualCardAuthCode: string;
    ConvenienceFee: number;
    BankId: number;
    Notes: string;
    IsRefi: boolean;
    RefiLoanModelId: number;
    RefiTermFrequencyId: number;
    ChannelId: number;
    InheritOptionalFeesOnRefi: boolean;
    IntentionId: number;
    DisbursementType: number;
    IsOnlineEsign: boolean;
    AlternateDisbursement: {
        Card: {
        CardID: number;
        CardRef: string;
        }
    };
    RefiOptionalSelectedFeeIds: number[];
    Errors: any[];
    CancelRepo: boolean;
      
    constructor(csvParams: csvPayment) {
        this.CompanyId = 318;
        this.StoreId = 7;
        this.UserId = 4283;
        this.HeaderId = csvParams.headerId;
        this.PaymentDate = csvParams.paymentDate;
        this.PaymentAmount = csvParams.amount;
        this.ChangeDue = 0;
        this.SelectedCoupon = 0;
        this.CouponAmount = 0;
        this.PaymentMethod = 2;
        this.PartnerUserId = 0;
        this.PartnerLocationId = 0;
        this.IsRescind = false;
        this.RescindAba = "";
        this.RescindAcctNumber = "";
        this.RescindPmtType = 0;
        this.RescindCheckNumber = "";
        this.InstrumentNumber = csvParams.instrumentNumber;
        this.CciCheckNumber = "";
        this.CciCheckAmt = "";
        this.CardId = 0;
        this.CardCCV = 0;
        this.ManualCardLast4Digits = "";
        this.ManualCardCardType = "";
        this.ManualCardNameOnCard = "";
        this.ManualCardExpireDate = "";
        this.ManualCardAuthCode = "";
        this.ConvenienceFee = 0;
        this.BankId = 0;
        this.Notes = "";
        this.IsRefi = false;
        this.RefiLoanModelId = 0;
        this.RefiTermFrequencyId = 0;
        this.ChannelId = 0;
        this.InheritOptionalFeesOnRefi = true;
        this.IntentionId = 0;
        this.DisbursementType = 1;
        this.IsOnlineEsign = true;
        this.AlternateDisbursement = {
            Card: {
                CardID: 0,
                CardRef: "",
            }
        };
        this.RefiOptionalSelectedFeeIds = [0];
        this.Errors = [];
        this.CancelRepo = true;
    }
}