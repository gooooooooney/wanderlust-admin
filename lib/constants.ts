
import bcrypt from "bcryptjs";

export const SALT = bcrypt.genSaltSync(Number(process.env.HASH_SALT));
