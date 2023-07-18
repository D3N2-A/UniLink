import { adminDB } from "$lib/server/admin";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
  const uid = locals.userId;
  if (!uid) {
    redirect(301, "/login");
  }
  const userDoc = await adminDB.collection("users").doc(uid!).get();
  const { username, bio } = userDoc.data()!;
  if (params.username !== username) {
    throw error(401, "The username does not belongs to you");
  }
  return { bio };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, request, params }) => {
    const uid = locals.userId;
    const data = await request.formData();
    const bio = data.get("bio");

    const userRef = adminDB.collection("users").doc(uid!);
    const { username } = (await userRef.get()).data()!;
    if (params.username !== username) {
      throw error(401, "That username does not belong to you");
    }
    if (bio!.length > 260) {
      return fail(400, { problem: "Bio should be less than 260 chars" });
    }

    await userRef.update({ bio });
  },
} satisfies Actions;
