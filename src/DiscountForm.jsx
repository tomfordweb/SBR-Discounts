import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {makeid} from './helpers';
import axios from "axios";
import auth from './Auth';

const route = 'https://api.motorsportreg.com/rest/discounts.json';

export const Input = ({ name, prefix, max, min, value, label, type, onChange, helpText }) => (
  <div className="inputWrap">
    { (label) &&
      <label>{label}</label>
    }
    <div className="wrap">

    <input
      id={name}
      type={type}
      onChange={onChange}
      name={name}
      max={max}
      min={min}
      value={value}
    />
    { (helpText) &&
      <span className="formHelpText">{helpText}</span>
    }
    </div>
  </div>
)

async function createDiscounts(data, quantity) {
  const ops = [];
  for (let i = 1; i <= quantity; i += 1) {

    const post = {
      ...data,
      code: makeid(),
    };
    let op = axios({
      method: "POST",
      ...auth,
      responseType: 'json',
      data: post,
      url: route
    })
    ops.push(op);
  }

  let res = await axios.all(ops);
  return res;
}





export const DiscountResponses = ({data}) => {
  console.log('data', data);

  const success = data.filter(n => n.status === 201).length;
  const total = data.length;

  return (
    <div className="discountResponses">
        { total > 0 &&
        <p>{`${success}/${total} discounts created!`}</p>
      }
    </div>
  )
}

DiscountResponses.defaultProps = {
  data: []
}
function DiscountForm({ addCoupon }) {

  // make a date object that is one year from now
  const oneYrFromNow = new Date().setFullYear(new Date().getFullYear() + 1);

  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(5);
  const [description, setDescription ] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(oneYrFromNow));
  const [response, setResponse] = useState();
  const [busy, setBusy] = useState(false);
  /**
   * Submits a post request to MSR
   * @return {[type]} [description]
   */
  function newDiscount() {
    setBusy(true);
    createDiscounts({
        eventId: '',
        membertypes: ["Annual","Attendee","Instructor","Chief","Radio Control","Tech","Registration","Grid","Starter","Timing","Safety"],
        quantity: ' 1',
        each: '1', // what is this in api talk ??
        minimum: '0.00',
        maximum: ' 5.00',
        start: start.toLocaleDateString(),
        end: end.toLocaleDateString(),
        amount,
        description,
      }, quantity).then(responses => {
        setResponse(responses);
        setBusy(false);
      });
  }

  return (
    <div className="form-wrap">
        <DiscountResponses data={response} />

        <Input
          name="quantity"
          value={quantity}
          type="number"
          max={50}
          min={1}
          onChange={e => {
            const v = (e.target.value) < 51 ? e.target.value : 50;
            return setQuantity(v);
          }}
          label="Quantity"
          helpText="The amount of discount codes to create. Limit of 50."
        />
        <Input
          name="amount"
          value={amount}
          type="number"
          min={1}
          onChange={e => setAmount(e.target.value)}
          label="Discount Value ($)"
          helpText="The value of the discount code"
        />
        <Input
          name="description"
          value={description}
          type="text"
          onChange={e => setDescription(e.target.value)}
          label="Description"
          helpText="A description for the discount code."
        />
        <div className="inputWrap">
        <label>Valid From</label>
        <DatePicker
          selected={start}
          onChange={date => setStart(date)}
        />
        </div>
        <div className="inputWrap">
        <label>Valid To</label>
        <DatePicker
          selected={end}
          onChange={date => setEnd(date)}
        />
        </div>

        <footer>
          <button disabled={busy} onClick={newDiscount}>
          { (busy)
              ? 'Wait'
              : `Create ${quantity} codes`
          }</button>
        </footer>

    </div>
  )
}

export default DiscountForm;
