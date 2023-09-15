import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { imp_uid, merchant_uid } = await request.json();
    console.log(`imp_uid : ${imp_uid}`)
    console.log(`merchant_uid : ${merchant_uid}`)
    try {
        const getTokenResponse = await fetch('https://api.iamport.kr/users/getToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imp_key: process.env.IAMPORT_API_KEY,
                imp_secret: process.env.IAMPORT_API_SECRET
            })
        });

        const getTokenResult = await getTokenResponse.json();
        if (!getTokenResponse.ok) {
            throw new Error(getTokenResult.message || 'Token retrieval failed');
        }

        const { access_token } = getTokenResult.response;
        const getPaymentDataResponse = await fetch(`https://api.iamport.kr/payments/${imp_uid}`, {
            method: 'GET',
            headers: {
                Authorization: access_token
            }
        });

        const paymentDataResult = await getPaymentDataResponse.json();
        if (!getPaymentDataResponse.ok) {
            throw new Error(paymentDataResult.message || 'Payment data retrieval failed');
        }

        const paymentData = paymentDataResult.response;
        console.log('paymentData : ', paymentData);

        return NextResponse.json({ paymentData });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error processing payment: ', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}
