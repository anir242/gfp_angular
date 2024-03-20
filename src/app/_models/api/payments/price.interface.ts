export interface PriceInterface {
    id: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    frequency: string;
    stripeId: string;
    recurring: boolean;
    tax_included: boolean;
}

export interface SubscriptionPriceInterface {
    price_ptr_id: string;
    subscriptionTypeId: string;
    price: PriceInterface
}