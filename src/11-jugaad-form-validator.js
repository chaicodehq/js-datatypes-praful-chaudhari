/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } } /^[a-z\s]+$/i.test(name)
 */
export function validateForm(formData) {
    // Your code here

    // name validation
    const name = formData.name.trim();
    let isNameValid = false;
    if (name.length >= 2 && name.length <= 50) isNameValid = true;

    // email validation
    const email = formData.email.trim();
    let isEmailValid = false;
    const emailCheck1 = email.includes("@") && email.split("@").length === 2;
    const emailCheck2 =
        emailCheck1 &&
        email.split("@")[1].includes(".") &&
        email.split("@")[1].split(".").length >= 1;
    if (emailCheck1 && emailCheck2) isEmailValid = true;

    // phone validation
    const phone = formData.phone;
    let isPhoneValid = false;
    const phoneCheck1 =
        typeof phone === "string" && phone.length === 10 && /^\d+$/.test(phone);
    const phoneCheck2 =
        phoneCheck1 && ["6", "7", "8", "9"].includes(phone.charAt());
    if (phoneCheck1 && phoneCheck2) isPhoneValid = true;

    // age validation
    let age = formData.age;
    let isAgeValid = false;
    if (typeof age === "string") age = parseInt(age);
    const ageCheck1 = Number.isInteger(age);
    const ageCheck2 = age >= 16 && age <= 100;
    if (ageCheck1 && ageCheck2) isAgeValid = true;

    // pincode validation
    const pincode = formData.pincode;
    let isPincodeValid = false;
    const pincodeCheck1 =
        typeof pincode === "string" &&
        pincode.length === 6 &&
        pincode.charAt() !== "0" &&
        /^\d+$/.test(pincode);
    if (pincodeCheck1) isPincodeValid = true;

    // state validation
    const state = formData.state;
    let isStateValid = false;
    const stateCheck1 = state && state.length > 0;
    if (stateCheck1) isStateValid = true;

    // agree terms validation
    const terms = formData.agreeTerms;
    let isTermsValid = false;
    if (terms) isTermsValid = true;

    // errors object
    const errors = {};
    if (!isNameValid) {
        errors.name = "Name must be 2-50 characters";
    }
    if (!isEmailValid) {
        errors.email = "Invalid email format";
    }
    if (!isPhoneValid) {
        errors.phone = "Invalid Indian phone number";
    }
    if (!isAgeValid) {
        errors.age = "Age must be an integer between 16 and 100";
    }
    if (!isPincodeValid) {
        errors.pincode = "Invalid Indian pincode";
    }
    if (!isStateValid) {
        errors.state = "State is required";
    }
    if (!isTermsValid) {
        errors.agreeTerms = "Must agree to terms";
    }

    return {
        isValid:
            isNameValid &&
            isEmailValid &&
            isPhoneValid &&
            isAgeValid &&
            isPincodeValid &&
            isStateValid &&
            isTermsValid,
        errors,
    };
}
