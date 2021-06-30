import { createJtdTypeGuard } from "../../jtd-helpers";
import { loginOptsSchema } from "./schema";
import { LoginOpts } from "./types";

export const isLoginOpts = createJtdTypeGuard<LoginOpts>(loginOptsSchema);
