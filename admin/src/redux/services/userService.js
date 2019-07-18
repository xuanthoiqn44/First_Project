import { apiUrl } from '../../helpers/config';
import { authHeader } from '../../helpers/authHeader';
export const userService = {
    login,
    register,
    getAll,
    getById,
    getWalletInfo,
    transferBlood,
    purchaseLands,
    update,
    getFriendListBlockList,
    addFriend,
    unFriend,
    blockFriend,
    unBlockFriend,
    getAllMails,
    checkStatusByUserName,
    sendMail,
    readMail,
    deleteSentMail,
    deleteReceivedMail,
    getLandShowInfo,
    setLandShowInfo,
    getBgMusic,
    setBgMusic,
    getEffMusic,
    setEffMusic,
    getSetting,
    setSetting,
    delete: _delete,
    socialLoginRequest,
    getByToken
};

export function login(userName, password)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (typeof user.token !== 'undefined' && (user.token) && (user.token) !== '') {
                localStorage.setItem('token',user.token);
            }
            return user;
        });
}

export function getAll()
{
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getWalletInfo(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };
    return fetch(`${apiUrl}/users/trades/getWalletInfo`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function transferBlood(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/trades/transferBlood`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function purchaseLands(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/trades/purchaseLands`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getById(id)
{
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getByToken(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };
    return fetch(`${apiUrl}/users/getByToken`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (typeof user.token !== 'undefined' && (user.token) && (user.token) !== '') {
                localStorage.setItem('token',user.token);
            }
            return user;
        });
}

export function register(user)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function update(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/update`, requestOptions).then(handleResponse);
}

export function getFriendListBlockList(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/friends/getFriendListBlockList`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}
export function checkStatusByUserName(param){
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };
    return fetch(`${apiUrl}/users/friends/checkStatusByUserName`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function addFriend(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/friends/add`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function unFriend(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/friends/unFriend`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function blockFriend(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/friends/block`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function unBlockFriend(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/friends/unBlock`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getAllMails(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };
    return fetch(`${apiUrl}/users/mails/getAll`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function sendMail(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/mails/send`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function readMail(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/mails/read`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function deleteReceivedMail(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/mails/deleteReceivedMail`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function deleteSentMail(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/mails/deleteSentMail`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getLandShowInfo(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/getLandShowInfo`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function setLandShowInfo(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/setLandShowInfo`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getBgMusic(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/getBgMusic`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function setBgMusic(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/setBgMusic`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getEffMusic(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/getEffMusic`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function setEffMusic(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/setEffMusic`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function getSetting(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/get`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function setSetting(param)
{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(param)
    };

    return fetch(`${apiUrl}/users/settings/set`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function _delete(id)
{
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function socialLoginRequest(user)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${apiUrl}/users/socialLogin`, requestOptions).then(handleResponse).catch(() => window.location.reload(true));
}

export function handleResponse(response)
{
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok)
        {
            if (response.status === 401)
                window.location.reload(true);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}