import { initBotId } from "botid/client/core";

// Every route the public forms POST to (src/app/api/forms, src/app/api/careers)
// needs to be listed here — checkBotId() on the server fails for any route
// not registered in this protect list.
initBotId({
  protect: [
    { path: "/api/forms", method: "POST" },
    { path: "/api/careers", method: "POST" },
  ],
});
