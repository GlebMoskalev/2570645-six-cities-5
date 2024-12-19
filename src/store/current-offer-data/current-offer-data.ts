import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CurrentOfferData } from '../../types/state.ts';
import { OfferDetail } from '../../types/offer-detail';
import { Review } from '../../types/review';
import { Offer } from '../../types/offer.ts';

const initialState: CurrentOfferData = {
  offerDetail: null,
  nearbyOffers: [],
  reviews: [],
  isLoading: false,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    loadOfferDetails: (state, action: PayloadAction<{ offerInfo: OfferDetail; nearestOffers: Offer[]; reviews: Review[] }>) => {
      state.offerDetail = action.payload.offerInfo;
      state.nearbyOffers = action.payload.nearestOffers;
      state.reviews = action.payload.reviews;
    },
    sendReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setOfferDetailsLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateNearbyOffer: (state, action: PayloadAction<Offer>) => {
      const index = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.nearbyOffers[index] = action.payload;
      }
    }
  },
});

export const { loadOfferDetails, sendReview, setOfferDetailsLoadingStatus, updateNearbyOffer } = currentOfferData.actions;
