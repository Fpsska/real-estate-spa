import {
    createSlice
    //  PayloadAction
} from '@reduxjs/toolkit';

// /. imports

// TODO: +cards state
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type CardsState = {
    // activeCardId: string | null;
};

// /. interfaces

const initialState: CardsState = {
    // activeCardId: null
};

// /. initialState

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        // setActiveCardId(state, action: PayloadAction<string | null>) {
        //     state.activeCardId = action.payload;
        // }
    }
});

// /. slice

// export const { setActiveCardId } = cardsSlice.actions;

export default cardsSlice.reducer;
