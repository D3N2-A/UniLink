import { adminAuth } from "$lib/server/admin";

export async function handle({ event, resolve }) {
  try {
    const sessionCookies = event.cookies.get("__session");
    //Verify cookies and get claims
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookies!);
    event.locals.userId = decodedClaims?.uid;
    console.log("found User");
  } catch (error) {
    console.log(error);
    event.locals.userId = null;
    return resolve(event);
  }
  return resolve(event);
}
