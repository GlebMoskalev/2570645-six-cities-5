import {Offer} from '../../types/offer.ts';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FavouriteStatus} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeFavouriteStatusAction } from '../../store/api-actions.ts';
import { updateOffers } from '../../store/offers-data/offers-data';
import { updateNearbyOffer } from '../../store/current-offer-data/current-offer-data';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import {memo, useCallback} from 'react';

type PlaceCardProps = {
  offer: Offer;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  isNearby?: boolean;
}

function PlaceCard({offer, onMouseEnter, onMouseLeave, isNearby = false}: PlaceCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type, isFavorite } = offer;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkClick = useCallback(() => {
    (async () => {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        navigate(AppRoute.Login);
      } else {
        const newStatus = isFavorite ? FavouriteStatus.Remove : FavouriteStatus.Add;
        const updatedOffer = { ...offer, isFavorite: !isFavorite };

        dispatch(updateOffers(updatedOffer));
        if (isNearby) {
          dispatch(updateNearbyOffer(updatedOffer));
        }

        await dispatch(changeFavouriteStatusAction({ offerId: id, status: newStatus }));
      }
    })();
  }, [authorizationStatus, navigate, isFavorite, offer, dispatch, id, isNearby]);

  return (
    <article
      className="cities__card place-card"
      onMouseOver={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer.replace(':id', id)}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              authorizationStatus === AuthorizationStatus.Auth && isFavorite
                ? 'place-card__bookmark-button--active'
                : ''
            }`}
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(rating / 5) * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer.replace(':id', id)}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard,
  (prevProps, nextProps) =>
    prevProps.offer.id === nextProps.offer.id &&
    prevProps.offer.isFavorite === nextProps.offer.isFavorite &&
    prevProps.isNearby === nextProps.isNearby
);

export default MemoizedPlaceCard;
