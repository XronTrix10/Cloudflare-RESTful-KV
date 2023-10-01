// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { authenticate } from "../auth/api-auth";
import { returnJson, badEntity, badRequest, serverRoot, notFound, notAllowed } from "./res-handler";
import { getValueByKey, getValueByID, updateValueByKeyId, insertNewValueByKey, deleteValueById, deleteEntireKey } from "../database/kv-handler";

export async function respondRequest(req, path, is_post, is_get, is_put, is_delete) {

    if (is_get && path === '/') {
        return serverRoot();
    }

    // ====== Check For Authorization ====== //
    const authResult = authenticate(req)
    if (authResult) {
        return authResult
    }

    // ====== If authorized, then continue the request ====== //

    if (path === '/faculty' || path === '/member') {

        const key = (path === '/faculty') ? "faculties" : "members";

        if (is_post) {

            let reqData;
            try {
                reqData = await req.json()
                const { name, role, image, mobile } = reqData;

                if (!name || !role || !image || !mobile) { // If any field is missing
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Insert new data in the KV store
            const response = await insertNewValueByKey(reqData, key);
            return response;
        }

        else if (is_get) {

            const details = await getValueByKey(key);
            if (details) { return returnJson(details); }
            return notFound();
        }

        else if (is_delete) {

            const response = await deleteEntireKey(key);
            return response;
        }

        else {
            return notAllowed();
        }
    }

    else if (path.startsWith('/faculty/') || path.startsWith('/member/')) {

        const key = (path.startsWith('/faculty/')) ? "faculties" : "members";
        const dataID = path.split('/')[2];  // Get the id from the URL path

        if (is_get) {

            const response = await getValueByID(dataID, key);
            return response;
        }

        else if (is_put) {

            let newData;
            try {
                newData = await req.json()
                const { name, role, image, mobile } = newData;

                if (!name && !role && !image && !mobile) { // If No field is provided
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Update data in the KV store
            const response = await updateValueByKeyId(dataID, newData, key)
            return response;
        }

        else if (is_delete) {

            const response = await deleteValueById(dataID, key);
            return response;
        }

        else {
            return notAllowed();
        }
    }

    else {
        return badRequest();
    }
}