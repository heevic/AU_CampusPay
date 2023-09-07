'use client'
import { ChangeEventHandler, useEffect, useState } from "react";
import { PaypalRequestPayParams, RequestPayResponse } from "@/portone";
import { useRouter } from "next/navigation";

export default function Page() {
    const [value, setValue] = useState(0);
    const router = useRouter();

    // 2. Define a submit handler.
    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(+e.target.value);

        if (!window.IMP) return;

        const { IMP } = window;
        IMP.updateLoadUIRequest("paypal-spb", {
            pg: "paypal_v2.{MIIiasTest}",                // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
            pay_method: "paypal",                        // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: +e.target.value,                     // 결제금액
            name: "PRODUCT",                             // 주문명
            buyer_name: "홍길동",                          // 구매자 이름
            buyer_email: 'www@ansan.ac.kr',              // 구매자 이메일
            buyer_tel: '01012341234',                    // 구매자 전화번호
            products: [
                {
                    name: "PRODUCT",
                    code: "abcdefg",
                    unitPrice: +e.target.value,
                    quantity: 1,
                },
            ],
            m_redirect_url: "/payment/done",
        });
    };

    /* 3. 콜백 함수 정의하기 */
    async function callback(response: RequestPayResponse) {
        const { imp_uid, merchant_uid } = response;

        // 결제 후 분기처리
    }

    useEffect(() => {
        if (!window.IMP) return;

        const { IMP } = window;

        const data: PaypalRequestPayParams = {
            pg: "paypal_v2.{MIIiasTest}",                // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
            pay_method: "paypal",                        // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
            amount: 10,                                  // 결제금액
            name: "PRODUCT",                             // 주문명
            buyer_first_name: "길동",
            buyer_last_name: "홍",
            products: [
                {
                    name: "PRODUCT",
                    code: "abcdefg",
                    unitPrice: 10,
                    quantity: 1,
                },
            ],
            m_redirect_url: "/payment/done",
        };

        IMP.init("imp********"); // 가맹점 식별코드
        IMP.loadUI("paypal-spb", data, callback);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <input
                type="number"
                placeholder="value"
                onChange={onInputChange}
                value={value}
                className="mb-4 w-[200px]"
            />

            <div
                className="portone-ui-container"
                data-portone-ui-type="paypal-spb"
            >
                {/* <!-- 3. 여기에 페이팔 버튼이 생성됩니다. --> */}
            </div>
        </main>
    );
}