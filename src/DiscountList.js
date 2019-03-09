import React, {useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import './App.scss';
import sample from './sampleresponse.json';
import auth from './Auth';

const route = 'https://api.motorsportreg.com/rest/discounts.json';

export const DiscountCard = ({id, amount, end, description, code, onDelete}) => (
 <div className="discountCard">
    <p className="title">${ amount } SBR Discount Code</p>
    <p className="code"><strong>{ code }</strong></p>
    <p className="description">{ description }</p>
    <p className="end">{ end && 'Valid Until:' } {end}</p>

    <span className="delete" onClick={() => onDelete(id) }>X</span>
 </div>
)

export default function DiscountList() {

  const [data, setData] = useState([]);
  const componentRef = useRef();

  useEffect( () => {
    // setData(sample.response.discounts); for testing
    axios({
      method: "GET",
      ...auth,
      responseType: 'json',
      url: route
    }).then(res => setData(res.data.response.discounts)
    )
  }, []) // no deps, call on mount only

  function deleteDiscount(id) {
    axios({
      method: "DELETE",
      ...auth,
      responseType: 'json',
      url: `https://api.motorsportreg.com/rest/discounts/${id}`
    }).then(res => setData(
        data.filter(item => item.id !== id)
    ))

  }

  return (
    <div >
      <p>When cutting the coupons, make sure multiple pages are lined up properly. You can do this by lining the grid-lines up under a light.</p>
      <p>The "delete" button will not be visible on the printed coupon</p>
      { (data.length > 0)
          ? (<div>
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
              pageStyle=".delete {display: none}"
            />
            <div ref={componentRef} className="discountCardContainer">
              { data.filter(item => {
                  return item.end == '' || new Date(item.end) >= new Date() // only discounts that haven't expired
                }).map((item, index) => <DiscountCard onDelete={deleteDiscount} key={index} {...item} />)
              }
            </div></div>)
          : <p>Fetching Discounts</p>
      }

    </div>
  )
}