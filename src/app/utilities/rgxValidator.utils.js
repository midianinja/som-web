export const validateNumber = n => /^[0-9]+$/gm.test(n);
export const validateEmail = e => /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/gm.test(e);
export const validateDescription = e => `${e}`.length > 3;
export const validateCommonString = e => !!e;
export const validatePhoneString = e => /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(e);
export const validateYoutubeUrl = e => /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/gm.test(e);
export const validateTwitterUrl = e => /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z0-9_]+\/?/gm.test(e);
export const validateInstagramUrl = e => /https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/gm.test(e);
export const validateFacebookUrl = e => /http(s)?:\/\/(www\.)?(facebook|fb)\.com\/[A-z0-9_\-\.]+\/?/gm.test(e);
