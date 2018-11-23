"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Post /
 * Execute a tribute.
 */
exports.postTribute = (req, res) => {
    req.assert("fb_id", "FB id cannot be blank").notEmpty();
    req.assert("tribute_body", "Message cannot be blank").notEmpty();
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Pasword cannot be blank").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/");
    }
    else {
        req.flash("success", { msg: "Tribute has been paid successfully!" });
        res.redirect("/");
    }
};
//# sourceMappingURL=tribute.js.map