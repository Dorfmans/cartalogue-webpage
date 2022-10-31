const validateName = (name) => {
    return name?.toString().length > 1;
};
const validateBrand = (brand) => {
    return brand?.toString().length > 2;
};
const validatePrice = (price) => {
    return /^[+-]?\d+(\.\d+)?$/.test(price);
};

const validateEmail = (email) => {
    const emailStr = email.toString();
    return emailStr.length > 5 && emailStr.includes('@') && emailStr.includes('.');
};

export {
    validateName,
    validateEmail,
    validateBrand,
    validatePrice
}