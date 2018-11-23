import { Request, Response } from "express";

/**
 * Post /
 * Execute a tribute.
 */
export let postTribute = (req: Request, res: Response) => {
  req.assert("fb_id", "FB id cannot be blank").notEmpty();
  req.assert("tribute_body", "Message cannot be blank").notEmpty();
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Pasword cannot be blank").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/");
  } else {
    req.flash("success", { msg: "Tribute has been paid successfully!" });
    res.redirect("/");
  }
};