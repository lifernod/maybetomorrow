// import { type Handle } from "@sveltejs/kit";
// import { sequence } from "@sveltejs/kit/hooks";

// const PROTECTED = [
//     "/home"
// ] as const;

// const authMiddleware: Handle = async ({ event, resolve }) => {
//     if (!PROTECTED.find((it) => it === event.route.id)) {
//         const response = await resolve(event);
//         return response;
//     }

//     // TODO: api call !event.cookies.get("userId")
//     if (true) {
//         return Response.redirect("http://localhost:3000/", 303);
//     }
//     const response = await resolve(event);
//     return response;
// };

// export const handle = sequence(authMiddleware);