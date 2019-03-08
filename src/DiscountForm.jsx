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
    method: "GET",
    headers: {
      'X-Organization-Id' : organizationId
    },
    auth: {
      username,
      password
    },
    responseType: 'json',
    // data: data,
    url: route
  }));
}


function DiscountForm({}) {

  // make a date object that is one year from now
  const oneYrFromNow = new Date().setFullYear(new Date().getFullYear() + 1);

  // first time using hooks!
  const [quantity, setQuantity] = useState(5);
  const [decDiscount, setDecDiscount] = useState(5);
  const [vchDiscountDescription, setVchDiscountDescription ] = useState('Dev Purposes');
  const [dteStart, setDteStart] = useState(new Date());
  const [dteEnd, setDteEnd] = useState(new Date(oneYrFromNow));
  const [discount, postNewDiscount] = createDiscount();

  function newDiscount() {
    postNewDiscount({
      uidDiscount: '00000000-0000-0000-0000000000000000',
      vchDiscountCode: 'deleteme',
      decDiscount: decDiscount,
      booPercentage: '0',
      vchDiscountDescription: vchDiscountDescription,
      uidEvent: '',
      uidEventType: 'E45E2796-A916-6BD8-97619EBFDF81E3D6',
      intClubMemberType: [
        1024, 1, 2, 256, 512, 128, 64, 32, 16, 8, 4
      ],
      booRestrictFirstEvent: '0',
      sntQuantityAvailable: ' 1',
      sntMaxRedemptions: '1',
      mnyThresholdMin: '0.00',
      mnyDiscountMax: ' 5.00',
      dteStart: dteStart,
      dteEnd: dteEnd,
    })
  }
  return (
    <div>
        <Input
          name="quantity"
          value={quantity}
          type="number"
          onChange={e => setQuantity(e.target.value)}
          label="Quantity"
          helpText="The amount of discount codes to create"
        />
        <Input
          name="decDiscount"
          value={decDiscount}
          type="number"
          onChange={e => setDecDiscount(e.target.value)}
          label="Discount Value"
          helpText="The value of the discount code"
        />
        <Input
          name="vchDiscountDescription"
          value={vchDiscountDescription}
          type="text"
          onChange={e => setVchDiscountDescription(e.target.value)}
          label="Description"
          helpText="A description for the discount code."
        />
        <div>
        <label>Valid From</label>
        <DatePicker
          selected={dteStart}
          onChange={date => setDteStart(date)}
        />
        </div>
        <div>
        <label>Valid To</label>
        <DatePicker
          selected={dteEnd}
          onChange={date => setDteEnd(date)}
        />
        </div>

        <div>
        <button onClick={newDiscount}>Submit Form</button>
        </div>
    </div>
  )
}

export default DiscountForm;
