
// CHAT.INIT Инициализация чата

export const initURL = 'https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.init';

export const initRequest = {
    uuid: '772c9859-4dd3-4a0d-b87d-d76b9f43cfa4',
    cuid: '',
    context: {}
}

export const initParams = {
    // mode: 'no-cors',
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain'
    },
    body: JSON.stringify(initRequest)
};

export const fetchData = async (url, initParams) => {
    try {
        const response = await fetch(url, initParams);
        const data = await response.json();

    } catch (error) {
        console.log(error);
        throw error;
    }

};