import { getServerSession } from "next-auth";
import { authConfig } from "./auth";

export default async function IsAuth() {
    const session = await getServerSession(authConfig);

    if(session) return true;
    else return false;
}