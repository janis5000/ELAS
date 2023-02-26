import Backend from "../../../../../assets/functions/Backend";


export const authenticatedGet = (url, executeFunc, authConfig) => {
    Backend.get('/studentconnector/' + url, authConfig).then((res) => {
        let resData = res.data;
        executeFunc(resData);
    })
}

export const authenticatedPost = (url, data, executeFuncSuccess, executeFuncError, authConfig) => {
    Backend.post('/studentconnector/' + url, data, authConfig).then((res) => {
        let resData = res.data;
        executeFuncSuccess(resData)
    })
        .catch((err) => {
            executeFuncError(err);
        })
}

export const defaultGet = (url, executeFunc) => {
    Backend.get('/studentconnector/' + url).then((res) => {
        let resData = res.data;
        executeFunc(resData);
    })
}

export const defaultPost = (url, data, executeFuncSuccess, executeFuncError) => {
    Backend.post('/studentconnector/' + url, data).then((res) => {
        let resData = res.data
        executeFuncSuccess(resData)
    })
        .catch((err) => {
            executeFuncError(err);
        })
}