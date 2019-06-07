const Validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = function validateInput(data) {
    const errors = {};

    const {
        content = '',
        tag = '',
        title = '',
    } = data;

    if (Validator.isEmpty(content)) {
        errors.country = 'Content cannot be empty';
    }

    if (Validator.isEmpty(tag)) {
        errors.password = 'Include at least a tag';
    }

    if (Validator.isEmpty(title)) {
        errors.password = 'Title cannot be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};
