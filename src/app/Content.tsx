import axios from "axios";

import Image from "next/image";
import Link from "next/link";
export default async function Content() {
  const url = `https://drab-jade-bunny-sari.cyclic.app/api/v1/tours`;
  const res = await axios({
    method: "get",
    url,
  });
  const tours = res.data.data.data;
  // console.log(tours);

  return (
    // <div className="content">
    //   {tours.map((el: object, index: number) => (
    //     <TempContent key={index} tour={el} />
    //   ))}
    // </div>
    <main className="main">
      <div className="card-container">
        {tours.map((tour: any, index: number) => (
          <div key={index} className="card">
            <div className="card__header">
              <div className="card__picture">
                <div className="card__picture-overlay">&nbsp;</div>
                <Image
                  className="card__picture-img"
                  src={`/tours/${tour.imageCover}`}
                  alt={tours.name}
                  width={1000}
                  height={1000}
                />
              </div>
              <h3 className="heading-tertirary">
                <span>{tour.name}</span>
              </h3>
            </div>
            <div className="card__details">
              <h4 className="card__sub-heading">{`${tour.difficulty}-day tour`}</h4>
              <p className="card__text">{tour.summary}</p>
              {/*  */}
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/icons.svg#icon-map-pin"></use>
                </svg>
                <span>{tour.startLocation.description}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/icons.svg#icon-calendar"></use>
                </svg>
                <span>
                  {new Date(tour.startDates[0]).toLocaleString("en-us", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/icons.svg#icon-flag"></use>
                </svg>
                <span>{`${tour.locations.length} stops`}</span>
              </div>
              <div className="card__data">
                <svg className="card__icon">
                  <use xlinkHref="/icons.svg#icon-user"></use>
                </svg>
                <span>{`${tour.maxGroupSize} people`}</span>
              </div>
            </div>
            <div className="card__footer">
              <p>
                <span className="card__footer-value">{`$${tour.price}`}</span>
                <span className="card__footer-text">per person</span>
              </p>
              <p className="card__ratings">
                <span className="card__footer-value">{tour.ratingsAverage}</span>
                <span className="card__footer-text">{`rating (${tour.ratingsQuantity})`}</span>
              </p>
              <Link
                href={{ pathname: "/tour", query: { tourId: tour.id } }}
                className="btn btn--green btn--small"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
