// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { authenticate } from "../auth/api-auth";
import { getValueByKey, getValueByID, updateValueByKeyId, insertNewValueByKey, deleteValueById, deleteEntireKey } from "../database/kv-handler";
import { returnJson, serverError, badEntity, badRequest, serverRoot, notFound } from "./res-handler";

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

    // For all get requests
    if (is_get) {

        if (path === '/faculty') { // To get all faculty members details
            const faculties = await getValueByKey('faculties');

            if (faculties) {
                return returnJson(faculties);
            }
            return notFound();
        }

        else if (path.startsWith('/faculty/')) { // To get single faculty member details

            // Get the name from the URL path
            const facultyID = path.split('/')[2]

            const response = await getValueByID(facultyID, 'faculties');
            return response;
        }

        else {
            return notFound();
        }

    }

    // For all put requests
    else if (is_put) {

        if (path.startsWith('/faculty/')) {

            const facultyID = path.split('/')[2]
            let facultyData;

            try {
                facultyData = await req.json()
                const { name, role, image, mobile } = facultyData;

                if (!name && !role && !image && !mobile) { // If No field is provided
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }

            // Update faculty data in the KV store
            const response = await updateValueByKeyId(facultyID, facultyData, 'faculties')
            return response;
        }

        else {
            return badRequest();
        }
    }

    // For all post requests
    else if (is_post) {

        if (path === '/faculty') {

            let facultyData;

            try {
                facultyData = await req.json()
                const { name, role, image, mobile } = facultyData;

                if (!name || !role || !image || !mobile) { // If any field is missing
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }

            // Insert new faculty data in the KV store
            const response = await insertNewValueByKey(facultyData, 'faculties');
            return response;
        }

        else {
            return badRequest();
        }
    }

    // For all delete requests
    else if (is_delete) {

        if (path === '/faculty') {
            const response = await deleteEntireKey('faculties');
            return response;
        }

        else if (path.startsWith('/faculty/')) {
            const facultyID = path.split('/')[2]
            const response = await deleteValueById(facultyID, 'faculties');
            return response;
        }
    }

    return notFound();
}