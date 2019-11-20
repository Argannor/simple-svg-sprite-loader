
let callbacks = [];
module.exports = (callback) => {
    callbacks.push(callback);
};

executeAll = () => {
    callbacks.forEach(callback => callback());
    callbacks = [];
};

module.exports.call = executeAll;
