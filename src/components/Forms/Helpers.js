export const isEmpty = value => value.trim() === '';
export const isPhoneNumber = value => value.trim().length !== 10;
export const isEmail = value => value.trim().includes('@') && value.trim().includes('.');


