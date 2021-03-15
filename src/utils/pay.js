/* eslint-disable */
export function pay({amount, description, accountId, data ={} }) {
    const widget = new cp.CloudPayments()

    return new Promise((resolve, reject) => {
        widget.pay('charge',
            { //options
                publicId: 'test_api_00000000000000000000001', //id из личного кабинета
                currency: 'RUB', //валюта
                skin: "mini", //дизайн виджета (необязательно)
                description,
                amount,
                accountId,
                data
            },
            {
                onSuccess: function (options) { // success
                    //действие при успешной оплате
                    resolve(options)
                },
                onFail: function (reason, options) { // fail
                    //действие при неуспешной оплате
                    reject(options)
                },
            }
        )
    })
}