const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const db = require('../../../helpers/db');
const config = require('../../../helpers/config');
const path = require('path');
const mkdirp = require('mkdirp');
var base64ToImage = require('base64-to-image');
var rp = require('request-promise');
const User = db.User;
const Language = db.Language;
const UserSetting = db.UserSetting;

module.exports = {
    authenticate,
    loginWallet,
    getAll,
    getById,
    jwtToken,
    getByToken,
    register,
    update,
    delete: _delete,
    socialLogin
};

async function authenticate({ userName, password }) {
    let user = await User.findOne({ userName });
    if (user && bCrypt.compareSync(password, user.hash)) {
        const { hash, goldBlood, ...userWithoutHash } = user.toObject();
        user = await User.findOneAndUpdate({ userName: user.userName }, { $set: { updatedDate: new Date() } }, { new: true });
        const token = jwt.sign({ sub: user.id, date: user.updatedDate, name: user.userName }, config.secret, {expiresIn: 7*24*60*60});
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function loginWallet(req, res) {
    if (req.body.token) {
        res.clearCookie("_id", { httpOnly: true });
        res.clearCookie("userName", { httpOnly: true });
        res.clearCookie("firstName", { httpOnly: true });
        res.clearCookie("lastName", { httpOnly: true });
        res.clearCookie("email", { httpOnly: true });
        res.clearCookie("wToken", { httpOnly: true });
        res.clearCookie("wName", { httpOnly: true });
        res.clearCookie("wId", { httpOnly: true });
        res.clearCookie("wSns", { httpOnly: true });
        res.clearCookie("wBlood", { httpOnly: true });
        res.clearCookie("token", { httpOnly: true });
        res.clearCookie("role", { httpOnly: true });

        var wToken = req.body.token;
        var email = '';
        var wName = '';
        var wId = '';
        var wSns = '';
        var wBlood = 0;

        await rp({
            method: 'POST',
            uri: 'https://api.wallet.blood.land/api/me',
            body: {
                appId: config.bloodAppId,
                token: wToken,
            },
            json: true
        })
            .then(function (parsedBody) {
                email = typeof parsedBody.user.email !== 'undefined'?parsedBody.user.email:'';
                wName = typeof parsedBody.user.name !== 'undefined'?parsedBody.user.name:'';
                wId = typeof parsedBody.user.sid !== 'undefined'?parsedBody.user.sid:'';
                wSns = typeof parsedBody.user.sns !== 'undefined'?parsedBody.user.sns:'';
            }, error => {
                console.error('Api Profile Error: ' + error.message);
            });

        await rp({
            method: 'POST',
            uri: 'https://api.wallet.blood.land/api/wallet',
            body: {
                appId: config.bloodAppId,
                token: wToken,
            },
            json: true
        })
            .then(function (parsedBody) {
                wBlood = parseFloat(parsedBody.balance);
            }, error => {
                console.error('Api Wallet Error: ' + error.message);
            });

        if (typeof email !== 'undefined') {
            let user = await User.findOne({ email: email });
            if (user && bCrypt.compareSync('Abc123#', user.hash)) {
                const { hash, goldBlood, ...userWithoutHash } = user.toObject();
                user = await User.findOneAndUpdate({ userName: user.userName }, { $set: { updatedDate: new Date(), wSns: wSns } }, { new: true });
                const token = jwt.sign({ sub: user.id, date: user.updatedDate, name: user.userName }, config.secret, {expiresIn: 7*24*60*60});
                res.cookie('token', token);

                if (userWithoutHash) {
                    res.cookie('_id', JSON.stringify(userWithoutHash._id));
                    if (typeof userWithoutHash.userName !== 'undefined' && typeof wId !== 'undefined' && wId && wId != null && wId !== userWithoutHash.userName) {
                        await User.findOneAndUpdate({ email: email }, { $set: { userName: wId, wId: wId } });
                        res.cookie('userName', wId);
                        res.cookie('wId', wId);
                    }
                    else {
                        res.cookie('userName', userWithoutHash.userName);
                        res.cookie('wId', userWithoutHash.wId);
                    }

                    await User.findOneAndUpdate({ email: email }, { $set: { wBlood: wBlood, wToken: wToken, wName: wName } });
                    res.cookie('firstName', userWithoutHash.firstName);
                    res.cookie('lastName', userWithoutHash.lastName);
                    res.cookie('email', userWithoutHash.email);
                    res.cookie('role', userWithoutHash.role);
                    res.cookie('wToken', wToken);
                    res.cookie('wName', wName);
                    res.cookie('wSns', wSns);
                    res.cookie('wBlood', wBlood);
                }
                return {
                    ...userWithoutHash,
                    token
                };
            } else {
                const newUser = new User();
                newUser.email = email;
                newUser.userName = typeof wId !== 'undefined' && wId ? wId : email;
                newUser.lastName = wName;
                newUser.firstName = wName;
                newUser.wName = wName;
                newUser.wSns = wSns;
                newUser.wId = typeof wId !== 'undefined' && wId && wId != null ? wId : '';
                newUser.wBlood = wBlood > 0 ? wBlood : 0;
                newUser.wToken = wToken;
                newUser.hash = bCrypt.hashSync('Abc123#', 10);
                let savedUser = await newUser.save();

                if (savedUser && bCrypt.compareSync('Abc123#', savedUser.hash)) {
                    const { hash, goldBLood, ...userWithoutHash } = savedUser.toObject();
                    savedUser = await User.findOneAndUpdate({ userName: savedUser.userName }, { $set: { updatedDate: new Date() } }, { new: true });
                    const token = jwt.sign({ sub: savedUser.id, date: savedUser.updatedDate, name: savedUser.userName }, config.secret, {expiresIn: 7*24*60*60});
                    res.cookie('token', token);

                    let userSetting = new UserSetting();
                    userSetting.userId = savedUser._id;
                    await userSetting.save();

                    if (userWithoutHash) {
                        res.cookie('_id', JSON.stringify(userWithoutHash._id));
                        res.cookie('userName', userWithoutHash.userName);
                        res.cookie('firstName', userWithoutHash.firstName);
                        res.cookie('lastName', userWithoutHash.lastName);
                        res.cookie('email', userWithoutHash.email);
                        res.cookie('wToken', userWithoutHash.wToken);
                        res.cookie('wName', userWithoutHash.wName);
                        res.cookie('wSns', userWithoutHash.wSns);
                        res.cookie('wId', userWithoutHash.wId);
                        res.cookie('wBlood', userWithoutHash.wBlood);
                        res.cookie('role', userWithoutHash.role);
                    }
                    return {
                        ...userWithoutHash,
                        token
                    };
                }
                else
                    throw new Error("Error to login Wallet");
            }
        }
        else
            throw new Error("Error to login Wallet");
    }
    return false
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function jwtToken(param) {
    return await User.findOne(param);
}

async function getByToken(param) {
    if (typeof param.token === 'undefined' || !param.token)
        return { token: '' };

    let decoded = await verifyToken(param);
    if (typeof decoded.sub !== 'undefined' && decoded.sub !== '' && decoded.sub && typeof decoded.name !== 'undefined' && decoded.name !== '' && decoded.name) {
        let user = await User.findOneAndUpdate({ _id: decoded.sub, userName: decoded.name }, { $set: { updatedDate: new Date() } }, { new: true });
        if (user) {
            const token = jwt.sign({ sub: user.id, date: user.updatedDate, name: user.userName }, config.secret, {expiresIn: 7*24*60*60});
            const { hash, goldBlood, ...userWithoutHash } = user.toObject();
            return {
                ...userWithoutHash,
                token
            };
        }
        else
            return { token: '' };
    }
    return { token: '' };
}

function verifyToken(param) {
    return new Promise((resolve, reject) => {
        jwt.verify(param.token, config.secret, async function (err, decoded) {
            if (err) resolve({});
            resolve(decoded);
        });
    })
}

async function register(param) {
    if (param.userName !== '' && await User.findOne({ userName: param.userName })) {
        throw new Error('Username "' + param.userName + '" is already taken');
    }
    if (param.email !== '' && await User.findOne({ email: param.email })) {
        throw new Error('Email "' + param.email + '" is already taken');
    }

    const user = new User();
    user.userName = param.userName;
    user.firstName = param.firstName;
    user.lastName = param.lastName;
    user.email = param.email;

    // if (param.email.length > 0) {    //
    //     const message = {
    //         from: 'Blood Land',
    //         to: param.email,
    //         subject: 'Blood land notification',
    //         text: 'thanks for use our app',
    //     };
    //     config.sendEmail(message);
    // }
    if (param.password)
        user.hash = bCrypt.hashSync(param.password, 10);

    let savedUser = await user.save();
    if (savedUser) {
        let userSetting = new UserSetting();
        userSetting.userId = savedUser._id;
        await userSetting.save();

        let userLanguage = new Language();
        userLanguage.userId = savedUser._id;
        userLanguage.languages = 'us';
        await userLanguage.save();
    }
    return savedUser;
}

async function update(param) {
    const user = await User.findById(param._id);

    await new Promise ((resolve) => {
        mkdirp(path.join(process.cwd(), '/images/users/', param._id), async function(err){
            if (err) {
                return console.error(err);
            } else {
                let dir = './images/users/' + param._id + '/';
                let base64Str = param.avatar;
                await base64ToImage(base64Str,dir,{'fileName': param.userName, 'type':'png'});
                param.path = param._id + '/' + param.userName + '.png';
                resolve(true)
            }
        });
    })

    let updateObj = Object.assign(user, param);

    // if (param.email.length > 0) {
    //     const message = {
    //         to: param.email,
    //         subject: 'Blood land notification',
    //         html: '<h1>Test</h1><p>Your profile was updated!</p>',
    //     };
    //     config.sendEmail(message);
    // }

    return await User.findByIdAndUpdate(param._id, updateObj, {new: true});
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function socialLogin(user) {
    let userName = user.userName;
    const userCheck = await User.findOne({ userName: userName });
    return (userCheck) ? { result: true, user: userCheck } : { result: false, user: null };
}
