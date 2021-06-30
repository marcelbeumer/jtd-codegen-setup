import { createJtdTypeGuard } from "../../jtd-helpers";
import { loginResultSchema } from "./schema";
import { LoginResult } from "./types";

export const isLoginResult = createJtdTypeGuard<LoginResult>(loginResultSchema);
