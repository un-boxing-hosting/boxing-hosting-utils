/**
 * @module  boxing-hosting-utils
 * @copyright un boxing man 2021
 * @license MIT
 */
const wump = require('wumpfetch');
//const parser = require(`body-parser`)

module.exports = class Client {

    constructor(DStoken, toptoken, ) {
        this.DStoken = DStoken;
        this.toptoken = toptoken;


    }

    /**
     * get idlist.
     * 
     */
    async getIDList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/util/idlist.json`, {
                    method: 'GET'
                }).send();
                var json = await res.json()

                resolve(json);
            } catch (err) {
                reject(new Error(err));
            }
        });
    }
    /**
     * get Stafflist.
     * 
     */
    async getStaffList() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/util/StaffList.json`, {
                    method: 'GET'
                }).send();
                var json = await res.json()

                resolve(json);
            } catch (err) {
                reject(new Error(err));
            }
        });
    }

    async postServers(clientID, servers) {
        if (typeof servers !== 'number') throw new TypeError('Server count must be a number');
        if (typeof clientID !== 'string') throw new TypeError('Bot ID must be a string');
        var Top = "";
        var ds = "";
        if (this.DStoken) ds = this.DStoken;
        if (this.toptoken) Top = this.toptoken;
        console.log(ds, Top);
        return new Promise(async (resolve, reject) => {
            try {
                const res = await wump(`https://bots.unboxingman.com/api/post/servers?id=${clientID}`, {
                    method: 'POST',
                    data: {
                        'Servers': servers,
                        "DSToken": ds.toString(),
                        "TopToken": top
                    }
                }).send();
                var json = await res.json()
                var ds = ""
                var top = ""
                var status = json.status;
                ds = json.ds
                top = json.top
                var send = ds + top + status
                console.log(json);
                // console.log(res);
                console.log(send);
                resolve(send);
            } catch (err) {
                console.log(err)
                reject(new Error(err));
            }

        });
    }


};