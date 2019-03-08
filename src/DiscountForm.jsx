import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAsyncEndpoint from './API';

const organizationId = process.env.REACT_APP_MSR_ORGANIZATION_ID;
const username = process.env.REACT_APP_MSR_USERNAME;
const password = process.env.REACT_APP_MSR_PASSWORD;
const route = 'https://api.motorsportreg.com/rest/discounts.json';

export const Input = ({ name, value, label, type, onChange, helpText }) => (
  <div>
    { (label) &&
      <label>{label}</label>
    }
    <div className="wrap">
    <input
      id={name}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
    />
    { (helpText) &&
      <span className="formHelpText">{helpText}</span>
    }
    </div>
  </div>
)

function createDiscount() {
  console.log(organizationId, username, password);
  return useAsyncEndpoint(data => ({
    method: "POST",
    headers: {
      'X-Organization-Id' : organizationId
    },
    auth: {
      username,
      password
    },
    responseType: 'json',
    data: data,
    url: route
  }));
}


function DiscountForm({}) {

  // make a date object that is one year from now
  const oneYrFromNow = new Date().setFullYear(new Date().getFullYear() + 1);

  // first time using hooks!
  const [quantity, setQuantity] = useState(5);
  const [code, setCode] = useState('FOOBARBAZ');
  const [amount, setAmount] = useState(5);
  const [description, setDescription ] = useState('Dev Purposes');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date(oneYrFromNow));
  const [discount, postNewDiscount] = createDiscount();

  /**
   * Submits a post request to MSR
   * @return {[type]} [description]
   */
  function newDiscount() {
    postNewDiscount({
      code: code,
      amount: amount,
      description: description,
      eventId: '',
      membertypes: ["Annual","Attendee","Instructor","Chief","Radio Control","Tech","Registration","Grid","Starter","Timing","Safety"],
      quantity: ' 1',
      sntMaxRedemptions: '1', // what is this in api talk ??
      minimum: '0.00',
      maximum: ' 5.00',
      start: start,
      end: end,
    })
  }


  return (
    <div>
        <Input
          name="code"
          value={code}
          type="text"
          onChange={e => setCode(e.target.value)}
          label="Code"
          helpText="the discount code"
        />
        <Input
          name="quantity"
          value={quantity}
          type="number"
          onChange={e => setQuantity(e.target.value)}
          label="Quantity"
          helpText="The amount of discount codes to create"
        />
        <Input
          name="amount"
          value={amount}
          type="number"
          onChange={e => setAmount(e.target.value)}
          label="Discount Value"
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
        <div>
        <label>Valid From</label>
        <DatePicker
          selected={start}
          onChange={date => setStart(date)}
        />
        </div>
        <div>
        <label>Valid To</label>
        <DatePicker
          selected={end}
          onChange={date => setEnd(date)}
        />
        </div>

        <div>
        <button onClick={newDiscount}>Submit Form</button>
        </div>
    </div>
  )
}

export default DiscountForm;
