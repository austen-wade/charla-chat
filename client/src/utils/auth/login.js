import LOGIN from "../../queries/";
import { useLazyQuery } from "@apollo/client";

const login = async (email, handle, password) => {
    const [authorizationQuery, { called, loading, data }] = useLazyQuery(
        LOGIN,
        {
            variables: { handle, email, password },
        }
    );
    const res = await authorizationQuery();
    console.log(res);
};

export default login;
