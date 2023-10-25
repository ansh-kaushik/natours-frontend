import Image from "next/image";
import Footer from "../Footer";
import Header from "../Header";
import axios from "axios";
import Link from "next/link";

type Request = {
  searchParams: object;
};

export default async function Page(req: Request) {
  const searchParams: any = req.searchParams;
  // console.log(searchParams);

  const id = searchParams.tourId;
  const url = `https://drab-jade-bunny-sari.cyclic.app/api/v1/tours/${id}`;
  const res = await axios({
    method: "get",
    url,
  });
  const tour = res.data.data.data;
  const date = new Date(tour.startDates[0]).toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });
  const user = null;
  const overviewBox = function (label: string, text: string, icon: string) {
    return (
      <>
        <div className="overview-box__detail">
          <svg className="overview-box__icon">
            <use xlinkHref={`/icons.svg#icon-${icon}`}></use>
          </svg>
          <span className="overview-box__label">{label}</span>
          <span className="overview-box__text">{text}</span>
        </div>
      </>
    );
  };

  const reviewCard = function (review: any) {
    const arr = [1, 2, 3, 4, 5];

    return (
      <>
        <div className="reviews__card">
          <div className="reviews__avatar">
            <Image
              className="reviews__avatar-img"
              src={`/users/${review.ratedBy.photo}`}
              alt={review.ratedBy.name}
              width={45}
              height={104}
            />
            <h6 className="reviews__user">{review.ratedBy.name}</h6>
          </div>
          <p className="reviews__text">{review.review}</p>
          <div className="reviews__rating">
            {arr.map((el: any, index: number) => (
              <svg
                key={index}
                className={`reviews__star reviews__star--${
                  review.rating >= el ? "active" : "inactive"
                }`}
              >
                <use xlinkHref="/icons.svg#icon-star"></use>
              </svg>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Header />
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <Image
            className="header__hero-img"
            src={`/tours/${tour.imageCover}`}
            alt={tour.name}
            width={500}
            height={500}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref={`/icons.svg#icon-clock`}></use>
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
              {overviewBox("Next Date", date, "calendar")}
              {overviewBox("Difficulty", tour.difficulty, "trending-up")}
              {overviewBox("Participants", `${tour.maxGroupSize} people`, "user")}
              {overviewBox("Rating", `${tour.ratingsAverage} / 5`, "star")}
            </div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {tour.guides.map((el: any, index: number) => (
                <div key={index} className="overview-box__detail">
                  <Image
                    className="overview-box__img"
                    src={`/users/${el.photo}`}
                    alt={el.image}
                    width={40}
                    height={110}
                  />
                  {el.role === "lead-guide" && (
                    <span className="overview-box__label">Lead Guide</span>
                  )}
                  {el.role === "guide" && <span className="overview-box__label">Tour Guide</span>}
                  <span className="overview-box__text">{el.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-lt-bg">{`About ${tour.name} tour`}</h2>
          {tour.description.split("\n").map((el: any, index: number) => (
            <p key={index} className="description__text">
              {el}
            </p>
          ))}
        </div>
      </section>
      <section className="section-pictures">
        {tour.images.map((el: any, index: number) => (
          <div key={index} className="picture-box">
            <Image
              src={`/tours/${el}`}
              alt="tour-image"
              className={`picture-box__img--${index + 1} picture-box__img`}
              width={422}
              height={533}
            />
          </div>
        ))}
      </section>
      <section className="section-map">
        <div id="map" data-locations={`${JSON.stringify(tour.locations)}`}></div>
      </section>
      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((el: any, index: number) => (
            <>{reviewCard(el)}</>
          ))}
        </div>
      </section>
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <Image src={`/logo-white.png`} alt="Natours logo" width={100} height={100} />
          </div>
          <Image
            className="cta__img cta__img--1"
            src={`/tours/${tour.images[1]}`}
            alt="Tour Picture"
            width={100}
            height={100}
          />
          <Image
            className="cta__img cta__img--2"
            src={`/tours/${tour.images[2]}`}
            alt="Tour Picture"
            width={100}
            height={100}
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">{`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>
            {user && (
              <button
                className="btn btn--green span-all-rows"
                id="book-tour"
                data-tour-id={tour.id}
              >
                Book tour now!
              </button>
            )}
            {!user && (
              <Link className="btn btn--green span-all-rows" href="/login">
                Log in to book Tour{" "}
              </Link>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
