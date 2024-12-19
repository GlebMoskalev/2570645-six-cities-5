import { Offer } from '../../types/offer.ts';
import PlaceCard from '../place-card/place-card.tsx';
import { memo } from 'react';

type NearbyOffersListProps = {
  offers: Offer[];
};

function NearbyOffersList({offers}: NearbyOffersListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">
        Other places in the neighbourhood
      </h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            isNearby
          />
        ))}
      </div>
    </section>
  );
}

const MemoizedNearbyOffersList = memo(NearbyOffersList);
export default MemoizedNearbyOffersList;
