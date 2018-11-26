import { Request, Response } from "express";
import logger from "../util/logger";

// author is aware that they will share cookies and everything
// but author also would like to notice that he will be sole user of this software

/**
 * GET /page/:sessionId
 * Open a new page for a new session, then redirect to that specific instance.
 */
export let getPage = (req: Request, res: Response) => {
  const sessionId = req.param("sessionId");

  if (!sessionId) {
    // requesting new session to be created
  }

};

/**
 * POST /page/:sessionId
 * Send a directive to the browser (click, close, idk).
 */
export let postPage = (req: Request, res: Response) => {

};