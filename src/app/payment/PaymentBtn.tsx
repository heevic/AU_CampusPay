'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import {RequestPayParams, RequestPayResponse} from "@/types/portone";
import {useSession} from "next-auth/react";

type PaymentContainerProps = {
    props: {
        name: string,
        amount: number
    }
}

const PaymentBtn = ({props}: PaymentContainerProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    const paymentHandler = () => {
        if (!window.IMP) return;

        /* 1. 가맹점 식별 */
        const { IMP } = window;
        IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP as string);    // IMP.init("imp67011510"); 임시값

        /* 2. 결제 데이터 정의 */
        const data: RequestPayParams = {
            pg: "html5_inicis",               // PG사 코드표 참조
            pay_method: "card",                          // 결제수
            // 주문번호는 결제창 요청 시 항상 고유 값으로 채번 되어야 합니다.
            // 결제 완료 이후 결제 위변조 대사 작업시 주문번호를 이용하여 검증이 필요하므로 주문번호는 가맹점 서버에서 고유하게(unique)채번하여 DB 상에 저장해주세요
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            name: props.name,                               // 주문명
            amount: props.amount,                                 // 결제금액
            buyer_name: "UserName",                          // 구매자 이름
            buyer_tel: "01012341234",                    // 구매자 전화번호
            buyer_email: "example@example.com",          // 구매자 이메일
            // notice_url: "http//localhost:3002/api/payments/webhook",
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
    };

    async function callback(rsp: RequestPayResponse) {
        const { success, error_msg, merchant_uid, imp_uid } = rsp;

        if (success) {
            const res = await fetch("ENDPOINT", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imp_uid: imp_uid,
                    merchant_uid: merchant_uid,
                }),
            });

            const data = await res.json();
            console.log("data : ", data);

            /** ### 결제 성공시 리다이렉트 경로 */
            router.replace(`${process.env.SITE_URL}/confirmation/${session?.user?.name}`);
        } else {
            alert(`결제 실패: ${error_msg}`);
            /** ### 결제 실패시 리다이렉트 경로 */
            router.replace(`/payment/${session?.user?.name}`);
        }
    }

    return (
        <button onClick={paymentHandler}>결제하기</button>
    );
};

export default PaymentBtn;