import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    postListData : []
}

const postSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setPostListData: (state, action) => {
            state.postListData = action.payload;
        }
    }
});

export const setPostListData = postSlice.actions.setPostListData;

export const selectPostList = (state) => state.postSlice.postListData;

export default postSlice.reducer;
