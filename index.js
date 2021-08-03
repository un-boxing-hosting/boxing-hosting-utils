/**
 * @module  boxing-hosting-utils
 * @copyright un boxing man 2021
 * @license MIT
 */
const wump = require('wumpfetch');
const parser = require(`body-parser`)

module.exports = class Client {

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


};