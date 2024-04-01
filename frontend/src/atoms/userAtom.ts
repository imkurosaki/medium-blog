import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";

const isLoadingAtom = atom({
    key: 'flagAtom',
    default: false
});

const userInfoSelector = selector({
    key: 'userInfoSelector',
    get: (): User | undefined => {
        const userInfoString: string | null = localStorage.getItem('user-info');
        if (userInfoString) {
            return JSON.parse(userInfoString);
        }
    }
});

const postsSelector = selector({
    key: "postsSelector",
    get: async() => {
        const { data } = await axios({
            method: 'get',
            url: 'https://medium-backend.keandelaserna22.workers.dev/api/v1/blog/bulk'
        });
        return data.blogs;
    }
})

const postSelectorFamily = selectorFamily({
    key: "postSelectorFamily",
    get: (id: string) => async () => {
        const cookie: string = document.cookie.split("access_token=")[1];
        try {
            const { data } = await axios<Post>({
                method: 'get',
                url: `https://medium-backend.keandelaserna22.workers.dev/api/v1/blog/${id}`,
                headers: {
                    'Auth-token': cookie,
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } catch(error: any) {
            return error;
        }
    }
}) 

export {
    isLoadingAtom,
    userInfoSelector,
    postsSelector,
    postSelectorFamily
}