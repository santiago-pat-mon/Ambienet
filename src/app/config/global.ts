export const GlobalVariable = Object.freeze({
    /* Here all the BackEnd routes that will be 
       used for communication are declared */

    // PHP
    //BASE_API_URL_PHP: "http://localhost/php/",
    BASE_API_URL_PHP: "http://13.58.8.74/php/",
    PROFILE_PICTURE_PHP: "attachFile.php",
    POST_PICTURE_PHP: "attachFile.php",

    // DJANGO
    //BASE_SERVER_URL: "http://localhost:8000/",
    BASE_SERVER_URL: "https://ambienetuq.xyz/",
    REGISTER_USER: "users/signup/",
    LOGIN_USER: "users/login/",
    READ_USERS: "users/",
    UPDATE_USER: "users/",
    REGISTER_POST: "posts/publicate/",
    READ_POSTS: "posts/",
    DELETE_POST: "posts/",
    SEND_VALIDATOR_POST: "posts/validator/",
    INCREASE_POST_VALIDATION: "posts/", /* id del post */
    ROLREQUEST_SEND: "users/make_request/",
    READ_ROL_REQUEST: "staffs/pending_role_requests/",
    ACCEPT_OR_REJECT_ROL_REQUEST: "staffs/answer_role_requests/",
    REPORT_POST: "posts/",
    BLOCK_USER: "staffs/ban_users/",
})